import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios.js';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadThumbnailToCloudinary, uploadVideoToCloudinary } from '../utils/cloudinaryUtils.js';
import Step1BasicInfo from '../components/Step1BasicInfo.jsx';
import Step2Resources from '../components/Step2Resources.jsx'
import Step3FAQs from '../components/Step3FAQs.jsx';
import Step4CourseContent from '../components/Step4CourseContent.jsx';
import Step5ReviewSubmit from '../components/Step5ReviewSubmit.jsx';

const CourseUpload = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
            lessons: [{ lessonTitle: '', videoURL: '', videoDuration: 0 }]
        }],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleThumbnailUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const url = await uploadThumbnailToCloudinary(file);
            setFormData({ ...formData, thumbnail: url });
        } catch (err) {
            console.error('Thumbnail upload error:', err);
        }
        setLoading(false);
    };

    const handleVideoUpload = async (file, moduleIndex, lessonIndex) => {
        setLoading(true);
        try {
            const data = await uploadVideoToCloudinary(file);
            const updatedContent = [...formData.courseContents];
            updatedContent[moduleIndex].lessons[lessonIndex].videoURL = data.url;
            updatedContent[moduleIndex].lessons[lessonIndex].videoDuration = data.duration;
            setFormData({ ...formData, courseContents: updatedContent });
        } catch (err) {
            console.error('Video upload error:', err);
        }
        setLoading(false);
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const addTopic = () => {
        setFormData({ ...formData, topicsToLearn: [...formData.topicsToLearn, '']})
    }

    const addMaterial = () => {
        setFormData({ ...formData, materials: [...formData.materials, { desc: '', fileURL: ''}] });
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
        const updatedContent = [...formData.content];
        updatedContent[moduleIndex].lessons.push({ title: '', videoUrl: '', videoDuration: 0 });
        setFormData({ ...formData, content: updatedContent });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await axios.post('/courses/create', formData);
            alert('Course uploaded successfully!');
            navigate('/teacherdashboard')
        } catch (err) {
            console.error('Submission error:', err);
        }
        setLoading(false);
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