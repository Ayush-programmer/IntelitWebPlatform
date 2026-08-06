import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { validateTitle } from '../utils/formValidation';
import ReactPlayer from 'react-player';

const Step4CourseContent = ({
    formData,
    setFormData,
    addModule,
    addLesson,
    handleVideoUpload,
    prevStep,
    nextStep,
    loading,
    errors,
    setErrors,
    deletedPublicIds
}) => {

    const hasUploading = formData.courseContents.some(module =>
        module.lessons.some(lesson => lesson.isUploading)
    );

    const handleModuleTitleChange = (index, value) => {
        const updatedContent = [...formData.courseContents];
        updatedContent[index].moduleTitle = value;
        setFormData({
            ...formData,
            courseContents: updatedContent
        });

        const error = validateTitle(value, "Module Title");

        setErrors(prev => ({
            ...prev,
            [`moduleTitle-${index}`]: error
        }));
    };

    const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
        const updatedContent = [...formData.courseContents];
        updatedContent[moduleIndex].lessons[lessonIndex][field] = value;

        setFormData({
            ...formData,
            courseContents: updatedContent
        });

        if (field === "lessonTitle") {
            const error = validateTitle(value, "Lesson Title");

            setErrors(prev => ({
                ...prev,
                [`lessonTitle-${moduleIndex}-${lessonIndex}`]: error
            }));
        }
    };

    const handleVideoChange = (e, moduleIndex, lessonIndex) => {
        const file = e.target.files[0];
        if (file) {
            handleVideoUpload(file, moduleIndex, lessonIndex);
        }
    };

    const removeModule = (moduleIndex) => {
        const module = formData.courseContents[moduleIndex];

        module.lessons.forEach(lesson => {
            if (lesson.videoPublicId && !deletedPublicIds.current.includes(lesson.videoPublicId)) {
                deletedPublicIds.current.push(lesson.videoPublicId);
            }
        });

        const updatedContent = formData.courseContents.filter(
            (_, index) => index !== moduleIndex
        );

        setFormData(prev => ({
            ...prev,
            courseContents: updatedContent
        }));

        setErrors(prev => {
            const updatedErrors = { ...prev };
            delete updatedErrors[`moduleTitle-${moduleIndex}`];
            Object.keys(updatedErrors).forEach(key => {
                if (
                    key.startsWith(`lessonTitle-${moduleIndex}-`) ||
                    key.startsWith(`lessonVideo-${moduleIndex}-`)
                ) {
                    delete updatedErrors[key];
                }
            });
            return updatedErrors;
        });
    };

    const removeLesson = (moduleIndex, lessonIndex) => {
        const updatedContent = [...formData.courseContents];

        const { videoPublicId } = updatedContent[moduleIndex].lessons[lessonIndex];

        deletedPublicIds.current.push(videoPublicId);

        updatedContent[moduleIndex].lessons = updatedContent[moduleIndex].lessons.filter(
            (_, index) => index !== lessonIndex
        );

        setFormData(prev => ({
            ...prev,
            courseContents: updatedContent
        }));

        setErrors(prev => {
            const updatedErrors = { ...prev };
            delete updatedErrors[`lessonTitle-${moduleIndex}-${lessonIndex}`];
            return updatedErrors;
        });
    };

    return (
        <div className="step-container">
            <h2 className="step-title">Step 4: Course Content</h2>

            <AnimatePresence>
                {formData.courseContents.map((module, moduleIndex) => (

                <motion.div
                    key={moduleIndex}
                    className="module-section"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="input-row">
                        <input
                            type="text"
                            placeholder={`Module ${moduleIndex + 1} Title`}
                            value={module.moduleTitle || ''}
                            onChange={(e) => handleModuleTitleChange(moduleIndex, e.target.value)}
                        />

                        {formData.courseContents.length > 1 && (
                            <button
                                type="button"
                                className="remove-btn"
                                disabled={module.lessons.some(
                                    lesson => lesson.isUploading
                                )}
                                onClick={() => removeModule(moduleIndex)}
                            >
                                <IoMdClose color="#333" className="icon" />
                            </button>
                        )}

                        {errors[`moduleTitle-${moduleIndex}`] && (
                            <p className="error">{errors[`moduleTitle-${moduleIndex}`]}</p>
                        )}
                    </div>

                    <div className="lesson-list">
                        <AnimatePresence>
                            {module.lessons.map((lesson, lessonIndex) => (
                                <motion.div
                                    key={lessonIndex}
                                    className="lesson-item"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="input-row">
                                        <input
                                            type="text"
                                            placeholder={`Lesson ${lessonIndex + 1} Title`}
                                            value={lesson.lessonTitle || ''}
                                            onChange={(e) =>
                                                handleLessonChange(
                                                    moduleIndex,
                                                    lessonIndex,
                                                    'lessonTitle',
                                                    e.target.value
                                                )
                                            }
                                        />

                                        {module.lessons.length > 1 && (
                                            <button
                                                type="button"
                                                className="remove-btn"
                                                disabled={lesson.isUploading}
                                                onClick={() => removeLesson(moduleIndex, lessonIndex)}
                                            >
                                                <IoMdClose color="#333" className="icon" />
                                            </button>
                                        )}

                                        {errors[`lessonTitle-${moduleIndex}-${lessonIndex}`] && (
                                            <p className="error">
                                                {errors[`lessonTitle-${moduleIndex}-${lessonIndex}`]}
                                            </p>
                                        )}
                                    </div>

                                    <input
                                        type="file"
                                        accept="video/*"
                                        disabled={lesson.isUploading}
                                        onChange={(e) =>
                                            handleVideoChange(e, moduleIndex, lessonIndex)
                                        }
                                    />
                                    {errors[`lessonVideo-${moduleIndex}-${lessonIndex}`] && (
                                        <p className="error">
                                            {errors[`lessonVideo-${moduleIndex}-${lessonIndex}`]}
                                        </p>
                                    )}

                                    {lesson.videoURL && (
                                        <div className="video-preview">
                                            <ReactPlayer
                                                url={lesson.videoURL}
                                                controls
                                                width="100%"
                                                height="100%"
                                                config={{
                                                    file: {
                                                        attributes: {
                                                            controlsList: "nodownload"
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}

                                    {lesson.isUploading && (
                                        <div className="upload-progress">

                                            <p>Uploading... {lesson.uploadProgress}%</p>

                                            <progress
                                                value={lesson.uploadProgress}
                                                max="100"
                                            />

                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <button
                            type="button"
                            onClick={() => addLesson(moduleIndex)}
                            className="add-btn"
                        >
                            + Add Lesson
                        </button>
                    </div>
                </motion.div>
                ))}
            </AnimatePresence>

            <button type="button" onClick={addModule} className="add-btn">
                + Add Module
            </button>

            <div className="navigation-buttons">
                <button type="button" onClick={prevStep} className="nav-btn back-btn">
                    Back
                </button>
                <button
                    type="button"
                    className="nav-btn next-btn"
                    disabled={hasUploading}
                    onClick={nextStep}
                >
                    {hasUploading ? "Uploading..." : "Next"}
                </button>
            </div>
        </div>
    );
};

export default Step4CourseContent;