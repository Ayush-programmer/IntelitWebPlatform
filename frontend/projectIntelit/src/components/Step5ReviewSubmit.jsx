import React from 'react';

const Step5ReviewSubmit = ({ formData, prevStep, handleSubmit, loading }) => {
    return (
        <div className="step-container">
            <h2>Step 5: Review & Submit</h2>

            <div className="review-section">
                <h3>Basic Info</h3>
                <p><strong>Title:</strong> {formData.title}</p>
                <p><strong>Description:</strong> {formData.description}</p>
                <p><strong>Category:</strong> {formData.category}</p>
                <p><strong>Price:</strong> ₹{formData.price}</p>
                {formData.thumbnail && (
                    <div>
                        <strong>Thumbnail:</strong>
                        <img src={formData.thumbnail} alt="Course Thumbnail" width="200" />
                    </div>
                )}
            </div>

            <div className="review-section">
                <h3>Learnings</h3>
                <p><strong>Topics to learn:</strong></p>
                <ul>
                    {formData.topicsToLearn.map((topic, idx) => (
                        <li key={idx}>{topic}</li>
                    ))}
                </ul>
                <h3>Resources</h3>
                <p><strong>Materials:</strong></p>
                <ul>
                    {formData.materials.map((material, idx) => (
                        <li key={idx}><strong>Material desc : </strong>{material.desc}<br /><strong>Material URL : </strong>{material.fileURL}</li>
                    ))}
                </ul>

                <p><strong>References:</strong></p>
                <ul>
                    {formData.references.map((ref, idx) => (
                        <li key={idx}>{ref}</li>
                    ))}
                </ul>
            </div>

            <div className="review-section">
                <h3>FAQs</h3>
                {formData.faq.map((faq, idx) => (
                    <div key={idx}>
                        <p><strong>Q:</strong> {faq.question}</p>
                        <p><strong>A:</strong> {faq.answer}</p>
                    </div>
                ))}
            </div>

            <div className="review-section">
                <h3>Course Content</h3>
                {formData.courseContents.map((module, mIdx) => (
                    <div key={mIdx}>
                        <h4>Module {mIdx + 1}: {module.moduleTitle}</h4>
                        {module.lessons.map((lesson, lIdx) => (
                            <div key={lIdx}>
                                <p><strong>Lesson {lIdx + 1}:</strong> {lesson.lessonTitle}</p>
                                {lesson.videoURL && (
                                    <video width="300" controls>
                                        <source src={lesson.videoURL} type="video/mp4" />
                                    </video>
                                )}
                                <p><strong>Duration : </strong>{lesson.videoDuration}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="navigation-buttons">
                <button onClick={prevStep}>Back</button>
                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Course'}
                </button>
            </div>
        </div>
    );
};

export default Step5ReviewSubmit;
