import React from 'react';

const Step5ReviewSubmit = ({ formData, prevStep, handleSubmit, loading }) => {
    return (
        <div className="step-container review-page">
            <h2 className="step-title">Step 5: Review & Submit</h2>

            <div className="review-section">
                <h3>Basic Info</h3>
                <div className="info-grid">
                    <p><strong>Title:</strong> {formData.title}</p>
                    <p><strong>Description:</strong> {formData.description}</p>
                    <p><strong>Category:</strong> {formData.category}</p>
                    <p><strong>Price:</strong> ₹{formData.price}</p>
                </div>

                {formData.thumbnail && (
                    <div className="thumbnail-preview">
                        <strong>Thumbnail:</strong>
                        <img src={formData.thumbnail} alt="Course Thumbnail" />
                    </div>
                )}
            </div>

            <div className="review-section">
                <h3>Learnings</h3>

                <div className="review-block">
                    <p className="label">Topics to learn:</p>
                    <ul className="review-list">
                        {formData.topicsToLearn.map((topic, idx) => (
                            <li key={idx}>{topic}</li>
                        ))}
                    </ul>
                </div>

                <div className="review-block">
                    <h3>Resources</h3>
                    <p className="label">Materials:</p>

                    <ul className="review-list material-list">
                        {formData.materials.map((material, idx) => (
                            <li key={idx} className="material-item">
                                <p>
                                    <strong>Material desc:</strong> {material.desc}
                                </p>
                                <p>
                                    <strong>Material URL:</strong> {material.fileURL}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="review-block">
                    <p className="label">References:</p>
                    <ul className="review-list">
                        {formData.references.map((ref, idx) => (
                            <li key={idx}>{ref}</li>
                        ))}
                    </ul>
                </div>
            </div>


            <div className="review-section">
                <h3>FAQs</h3>

                <div className="faq-container">
                    {formData.faq.map((faq, idx) => (
                        <div key={idx} className="faq-item">
                            <p><strong>Q:</strong> {faq.question}</p>
                            <p><strong>A:</strong> {faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>


            <div className="review-section">
                <h3>Course Content</h3>

                <div className="course-content">
                    {formData.courseContents.map((module, mIdx) => (
                        <div key={mIdx} className="module-card">

                            <h4>
                                Module {mIdx + 1}: {module.moduleTitle}
                            </h4>

                            {module.lessons.map((lesson, lIdx) => (
                                <div key={lIdx} className="lesson-card">

                                    <p>
                                        <strong>Lesson {lIdx + 1}:</strong> {lesson.lessonTitle}
                                    </p>

                                    {lesson.videoURL && (
                                        <video width="300" controls>
                                            <source src={lesson.videoURL} type="video/mp4" />
                                        </video>
                                    )}

                                    <p>
                                        <strong>Duration:</strong> {lesson.videoDuration}
                                    </p>

                                </div>
                            ))}

                        </div>
                    ))}
                </div>
            </div>


            <div className="navigation-buttons">
                <button onClick={prevStep}>Back</button>

                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="submit-btn"
                >
                    {loading ? 'Submitting...' : 'Submit Course'}
                </button>
            </div>

        </div>
    );
};

export default Step5ReviewSubmit;