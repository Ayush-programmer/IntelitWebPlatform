import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from '../config/axios.js';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadThumbnailToCloudinary, uploadVideoToCloudinary } from '../utils/cloudinaryUtils.js';
import Step1BasicInfo from '../components/Step1BasicInfo.jsx';
import Step2Resources from '../components/Step2Resources.jsx'
import Step3FAQs from '../components/Step3FAQs.jsx';
import Step4CourseContent from '../components/Step4CourseContent.jsx';
import Step5ReviewSubmit from '../components/Step5ReviewSubmit.jsx';
import { toast } from 'react-hot-toast'
import { validateCategory, validateTitle, validateDescription, validatePrice } from '../utils/formValidation.js';

const CourseUpload = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const deletedPublicIds = useRef([]);
    const { courseId } = useParams();
    const isEditMode = Boolean(courseId) // Track if editing an existing course

    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        price: '',
        thumbnail: '',
        topicsToLearn: [''],
        materials: [{
            desc: '', fileURL: ''
        }],
        references: [''],
        faq: [{ question: '', answer: '' }],
        courseContents: [{
            moduleTitle: '',
            lessons: [
                {
                    lessonTitle: "",
                    videoURL: "",
                    videoDuration: 0,
                    videoPublicId: "",
                    isUploading: false,
                    uploadProgress: 0
                }
            ]
        }],
    });

    useEffect(() => {
        // Check if we are in edit mode
        if (isEditMode) {
            fetchCourseData();
        }
    }, [location]);

    const fetchCourseData = async () => {
        try {
            const res = await axios.get(`/courses/${courseId}`);
            const course = res.data.course;
            setFormData({
                title: course.title,
                description: course.description,
                category: course.category,
                price: course.price,
                thumbnail: course.thumbnail,
                topicsToLearn: course.topicsToLearn || [''],
                materials: course.materials || [{ desc: '', fileURL: '' }],
                references: course.references || [''],
                faq: course.faq || [{ question: '', answer: '' }],
                courseContents: course.courseContents || [{
                    moduleTitle: '',
                    lessons: [{ lessonTitle: '', videoURL: '', videoDuration: 0 }]
                }],
            });
        } catch (err) {
            toast.error('Failed to load course data. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        let error = "";

        if (name === 'title') {
            error = validateTitle(value);
        }

        if (name === 'description') {
            error = validateDescription(value);
        }

        if (name === 'category') {
            error = validateCategory(value);
        }

        if (name === 'price') {
            error = validatePrice(value);
        }

        // if (name === materialDesc && !formData.materials.fileURL)
        //     error = "Material URL is required.";

        // if (name === materialUrl && !formData.materials.desc)
        //     error = "Material name is required.";

        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    const handleThumbnailUpload = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadThumbnailToCloudinary(file);

            setFormData({ ...formData, thumbnail: url });
        } catch (err) {
            toast.error('Thumbnail upload error:', err);
        }
        setLoading(false);
    };

    const handleVideoUpload = async (file, moduleIndex, lessonIndex) => {

        const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

        if (file.size > MAX_VIDEO_SIZE) {
            toast.error("Upload failed! Video size must be less than 100 MB.");
            return;
        }

        // Mark uploading
        setFormData(prev => {
            const updated = [...prev.courseContents];

            updated[moduleIndex].lessons[lessonIndex].isUploading = true;
            updated[moduleIndex].lessons[lessonIndex].uploadProgress = 0;

            return {
                ...prev,
                courseContents: updated
            };
        });

        try {

            const data = await uploadVideoToCloudinary(
                file,
                (progress) => {
                    setFormData(prev => {
                        const updated = [...prev.courseContents];

                        updated[moduleIndex]
                            .lessons[lessonIndex]
                            .uploadProgress = progress;

                        return {
                            ...prev,
                            courseContents: updated
                        };
                    });
                }
            );

            setFormData(prev => {

                const updated = [...prev.courseContents];

                updated[moduleIndex].lessons[lessonIndex] = {
                    ...updated[moduleIndex].lessons[lessonIndex],
                    videoURL: data.url,
                    videoDuration: data.duration,
                    videoPublicId: data.publicId,
                    uploadProgress: 100,
                    isUploading: false
                };

                return {
                    ...prev,
                    courseContents: updated
                };
            });

        } catch (err) {

            setFormData(prev => {

                const updated = [...prev.courseContents];

                updated[moduleIndex]
                    .lessons[lessonIndex]
                    .isUploading = false;

                updated[moduleIndex]
                    .lessons[lessonIndex]
                    .uploadProgress = 0;

                return {
                    ...prev,
                    courseContents: updated
                };
            });

            toast.error(err.message);
        }
    };
    const validateStep1 = () => {
        if (!formData.title || !formData.description || !formData.category || !formData.price || !formData.thumbnail) {
            return "Please Fill the required field as well as thumbnail";
        }
        return "";
    }

    const validateStep2 = () => {
        const hasMaterialError = formData.materials.some(material => {
            const hasDesc = material.desc.trim() !== "";
            const hasURL = material.fileURL.trim() !== "";

            return hasDesc !== hasURL; // one exists but the other doesn't
        });

        if (hasMaterialError) {
            return "Each material must have both description and file URL";
        }
        setFormData(prev => ({
            ...prev,
            topicsToLearn: prev.topicsToLearn.filter(topic => topic.trim() !== ""),
            references: prev.references.filter(reference => reference.trim() !== ""),
            materials: prev.materials.filter(material =>
                material.desc?.trim() !== "" &&
                material.fileURL?.trim() !== ""
            )
        }));
        return "";
    }

    const validateStep3 = () => {
        const hasFaqsError = formData.faq.some(faqq => {
            const hasQues = faqq.question.trim() !== "";
            const hasAns = faqq.answer.trim() !== "";

            return hasQues !== hasAns; // one exists but the other doesn't
        });

        if (hasFaqsError) {
            return "Each faq must have both it's question and answer";
        }
        setFormData(prev => ({
            ...prev,
            faq: prev.faq.filter(faqq =>
                faqq.question?.trim() !== "" &&
                faqq.answer?.trim() !== ""
            )
        }));
        return "";
    }

    const validateStep4 = () => {
        const newErrors = {};

        formData.courseContents.forEach((module, moduleIndex) => {

            console.log(module, moduleIndex);


            // Module Title Validation
            const moduleTitleError = validateTitle(module.moduleTitle, "Module Title");
            if (moduleTitleError) {
                newErrors[`moduleTitle-${moduleIndex}`] = moduleTitleError;
            }

            console.log(moduleTitleError);


            // Module must contain lesson
            if (!module.lessons || module.lessons.length === 0) {
                newErrors[`moduleLessons-${moduleIndex}`] =
                    "Please add at least one lesson.";
            }

            module.lessons.forEach((lesson, lessonIndex) => {

                // Lesson Title Validation
                const lessonTitleError = validateTitle(
                    lesson.lessonTitle,
                    "Lesson Title"
                );

                if (lessonTitleError) {
                    newErrors[
                        `lessonTitle-${moduleIndex}-${lessonIndex}`
                    ] = lessonTitleError;
                }

                // Support both old and new structure
                const hasVideo =
                    lesson.video?.url || lesson.videoURL;

                // Cross Validation

                // Lesson title but no video
                if (
                    lesson.lessonTitle.trim() &&
                    !hasVideo
                ) {
                    newErrors[
                        `lessonVideo-${moduleIndex}-${lessonIndex}`
                    ] = "Please upload a video.";
                }

                // Video but no lesson title
                if (
                    hasVideo &&
                    !lesson.lessonTitle.trim()
                ) {
                    newErrors[
                        `lessonTitle-${moduleIndex}-${lessonIndex}`
                    ] = "Lesson title is required.";
                }
            });
        });

        console.log(newErrors);


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (step === 1) {
            const error = validateStep1();

            if (error) {
                toast.error(error);
                return;
            }
        }
        if (step === 2) {
            const error = validateStep2();

            if (error) {
                toast.error(error);
                return;
            }
        }

        if (step === 3) {
            const error = validateStep3();
            if (error) {
                toast.error(error);
                return;
            }
        }

        if (step === 4) {
            const error = validateStep4();

            if (!error) {
                toast.error("Please fix the highlighted error");
                return;
            }
        }
        setStep(step + 1)
    };
    const prevStep = () => setStep(step - 1);

    const addTopic = () => {
        setFormData({ ...formData, topicsToLearn: [...formData.topicsToLearn, ''] })
    }

    const addMaterial = () => {
        setFormData({ ...formData, materials: [...formData.materials, { desc: '', fileURL: '' }] });
    };

    const addReference = () => {
        setFormData({ ...formData, references: [...formData.references, ''] });
    };

    const addFaq = () => {
        setFormData({ ...formData, faq: [...formData.faq, { question: '', answer: '' }] });
    };

    const addModule = () => {
        setFormData({
            ...formData,
            courseContents: [...formData.courseContents, { moduleTitle: '', lessons: [{ lessonTitle: '', videoURL: '', videoDuration: 0 }] }]
        });
    };

    const addLesson = (moduleIndex) => {
        const updatedContent = [...formData.courseContents];
        updatedContent[moduleIndex].lessons.push({
            lessonTitle: '',
            videoURL: '',
            videoDuration: 0
        });
        setFormData({ ...formData, courseContents: updatedContent });
    };

    const handleSubmit = async () => {
        setLoading(true);
        const cleanedFormData = {
            ...formData,
            materials: formData.materials.filter(
                material =>
                    material.desc.trim() &&
                    material.fileURL.trim()
            ),
            references: formData.references.filter(ref => ref.trim()),
            topicsToLearn: formData.topicsToLearn.filter(topic => topic.trim()),
            faq: formData.faq.filter(
                faq => faq.question.trim() && faq.answer.trim()
            )
        };
        console.log(cleanedFormData);
        
        try {
            console.log(formData);

            const res = isEditMode
                ? await axios.put(`/courses/update/${courseId}`, cleanedFormData)
                : await axios.post('/courses/create', cleanedFormData);

                console.log(res);
                
            if (deletedPublicIds.current.length > 0) {
                await axios.delete("/courses/cloudinary/videos", {
                    data: {
                        publicIds: deletedPublicIds.current
                    }
                });

                // Clear after successful deletion
                deletedPublicIds.current = [];
            }

            toast.success('Course saved successfully!');
            navigate('/teacherdashboard')
        } catch (err) {
            console.log(err);

            toast.error('Submission error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="course-upload-container">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Step1BasicInfo
                            formData={formData}
                            setFormData={setFormData}
                            handleChange={handleChange}
                            handleThumbnailUpload={handleThumbnailUpload}
                            nextStep={nextStep}
                            loading={loading}
                            errors={errors}
                        />
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Step2Resources
                            formData={formData}
                            setFormData={setFormData}
                            addMaterial={addMaterial}
                            addReference={addReference}
                            addTopic={addTopic}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Step3FAQs
                            formData={formData}
                            setFormData={setFormData}
                            addFaq={addFaq}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    </motion.div>
                )}

                {step === 4 && (
                    <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Step4CourseContent
                            formData={formData}
                            setFormData={setFormData}
                            addModule={addModule}
                            addLesson={addLesson}
                            handleVideoUpload={handleVideoUpload}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            loading={loading}
                            errors={errors}
                            setErrors={setErrors}
                            deletedPublicIds={deletedPublicIds}
                        />
                    </motion.div>
                )}

                {step === 5 && (
                    <motion.div key="step5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Step5ReviewSubmit
                            formData={formData}
                            prevStep={prevStep}
                            handleSubmit={handleSubmit}
                            loading={loading}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CourseUpload;