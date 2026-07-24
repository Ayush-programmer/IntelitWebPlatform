import React, { useState } from 'react';

const CompleteTeacherProfileStep2 = ({ formData, setFormData, nextStep, prevStep }) => {
    const [showOtherInput, setShowOtherInput] = useState(formData.currentPosition === 'Other');

    const handlePositionChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, currentPosition: value });
        // setShowOtherInput(value === 'Other');
    };

    const handleTechStackChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData({
                ...formData,
                techStack: [...formData.techStack, value],
            });
        } else {
            setFormData({
                ...formData,
                techStack: formData.techStack.filter((tech) => tech !== value),
            });
        }
    };
    
    return (
        <div className="step-form teacher-profile-card">
            <h2 className='teacher-profile-title'>Professional Details</h2>

            <div className="input-group">
                <label>Bio</label>
                <textarea
                    rows="4"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                ></textarea>
            </div>

            <div className="input-group">
                <label>Education</label>
                <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                    placeholder="e.g. Bsc, BTech, Msc, ME, PhD, etc."
                />
            </div>

            <div className="input-group">
                <label>Current Position</label>
                <select value={formData.currentPosition} onChange={handlePositionChange}>
                    <option value="">Select</option>
                    <option value="Industry Professional">Industry Professional</option>
                    <option value="Educator">Educator</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Other">Other</option>
                </select>
                {/* {showOtherInput && (
                    <input
                        type="text"
                        placeholder="Enter your position"
                        value={formData.currentPositionOther || ''}
                        onChange={(e) =>
                            setFormData({ ...formData, currentPositionOther: e.target.value })
                        }
                    />
                )} */}
            </div>

            <div className="input-group">
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

            <div className="button-group">
                <button onClick={prevStep} className="prev-btn">Previous</button>
                <button onClick={nextStep} className="next-btn">Next</button>
            </div>
        </div>
    );
};

export default CompleteTeacherProfileStep2;