import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Step4CourseContent = ({
    formData,
    setFormData,
    addModule,
    addLesson,
    handleVideoUpload,
    prevStep,
    nextStep,
    loading
}) => {
    const handleModuleTitleChange = (index, value) => {
        const updatedContent = [...formData.courseContents];
        updatedContent[index].moduleTitle = value;
        setFormData({ ...formData, content: updatedContent });
    };

    const handleLessonChange = (moduleIndex, lessonIndex, field, value) => {
        const updatedContent = [...formData.courseContents];
        updatedContent[moduleIndex].lessons[lessonIndex][field] = value;
        setFormData({ ...formData, courseContents: updatedContent });
    };

    const handleVideoChange = (e, moduleIndex, lessonIndex) => {
        const file = e.target.files[0];
        if (file) {
            handleVideoUpload(file, moduleIndex, lessonIndex);
        }
    };

    return (
        <div className="step-container">
            <h2>Step 4: Course Content</h2>

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
                        <input
                            type="text"
                            placeholder={`Module ${moduleIndex + 1} Title`}
                            value={module.moduleTitle}
                            onChange={(e) => handleModuleTitleChange(moduleIndex, e.target.value)}
                        />

                        <div className="lesson-list">
                            {module.lessons.map((lesson, lessonIndex) => (
                                <motion.div
                                    key={lessonIndex}
                                    className="lesson-item"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <input
                                        type="text"
                                        placeholder={`Lesson ${lessonIndex + 1} Title`}
                                        value={lesson.lessonTitle}
                                        onChange={(e) =>
                                            handleLessonChange(moduleIndex, lessonIndex, 'lessonTitle', e.target.value)
                                        }
                                    />

                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => handleVideoChange(e, moduleIndex, lessonIndex)}
                                    />

                                    {lesson.videoURL && (
                                        <video width="250" controls>
                                            <source src={lesson.videoURL} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}

                                    {loading && <p>Uploading video...</p>}
                                </motion.div>
                            ))}

                            <button onClick={() => addLesson(moduleIndex)} className="add-btn">
                                + Add Lesson
                            </button>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            <button onClick={addModule} className="add-btn">
                + Add Module
            </button>

            <div className="navigation-buttons">
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
            </div>
        </div>
    );
};

export default Step4CourseContent;
