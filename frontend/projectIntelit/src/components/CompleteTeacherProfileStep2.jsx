import React, { useState } from 'react';

const CompleteTeacherProfileStep2 = ({ formData, setFormData, nextStep, prevStep }) => {
    const [showOtherInput, setShowOtherInput] = useState(formData.currentPosition === 'Other');

    const handlePositionChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, currentPosition: value });
        setShowOtherInput(value === 'Other');
    };

    const handleTechStackChange = (e) => {
        const value = e.target.value;
        let newStack = [...formData.techStack];
        if (newStack.includes(value)) {
            newStack = newStack.filter((item) => item !== value);
        } else {
            newStack.push(value);
        }
        setFormData({ ...formData, techStack: newStack });
    };

    return (
        <div className="teacher-step teacher-step-two">
            <h2>Professional Details</h2>

            <div className="form-group">
                <label>Bio</label>
                <textarea
                    rows="4"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                ></textarea>
            </div>

            <div className="form-group">
                <label>Expertise</label>
                <input
                    type="text"
                    value={formData.expertise}
                    onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                    placeholder="e.g. Full Stack, Machine Learning"
                />
            </div>

            <div className="form-group">
                <label>Current Position</label>
                <select value={formData.currentPosition} onChange={handlePositionChange}>
                    <option value="">Select</option>
                    <option value="Industry Professional">Industry Professional</option>
                    <option value="Educator">Educator</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Other">Other</option>
                </select>
                {showOtherInput && (
                    <input
                        type="text"
                        placeholder="Enter your position"
                        value={formData.currentPositionOther || ''}
                        onChange={(e) =>
                            setFormData({ ...formData, currentPositionOther: e.target.value })
                        }
                    />
                )}
            </div>

            <div className="form-group">
                <label>Tech Stack</label>
                <div className="checkbox-group">
                    {['React', 'Node.js', 'Python', 'Java', 'C++', 'MongoDB', 'AWS'].map((tech) => (
                        <label key={tech} className="checkbox">
                            <input
                                type="checkbox"
                                value={tech}
                                checked={formData.techStack.includes(tech)}
                                onChange={handleTechStackChange}
                            />
                            {tech}
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-navigation">
                <button onClick={prevStep} className="prev-btn">Previous</button>
                <button onClick={nextStep} className="next-btn">Next</button>
            </div>
        </div>
    );
};

export default CompleteTeacherProfileStep2;