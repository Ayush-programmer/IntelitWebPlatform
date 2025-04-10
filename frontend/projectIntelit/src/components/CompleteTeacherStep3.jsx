import React from 'react';

const CompleteTeacherProfileStep3 = ({ formData, setFormData, prevStep, handleSubmit }) => {
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // For demo purposes, convert to base64 (not for production)
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilePic: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="teacher-step teacher-step-three">
            <h2>Finish Your Profile</h2>

            <div className="form-group">
                <label>Upload Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {formData.profilePic && (
                    <img
                        src={formData.profilePic}
                        alt="Preview"
                        className="profile-preview"
                    />
                )}
            </div>

            <div className="form-group">
                <label>GitHub</label>
                <input
                    type="text"
                    value={formData.socialLinks.github}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            socialLinks: {
                                ...formData.socialLinks,
                                github: e.target.value,
                            },
                        })
                    }
                    placeholder="https://github.com/username"
                />
            </div>

            <div className="form-group">
                <label>LinkedIn</label>
                <input
                    type="text"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            socialLinks: {
                                ...formData.socialLinks,
                                linkedin: e.target.value,
                            },
                        })
                    }
                    placeholder="https://linkedin.com/in/username"
                />
            </div>

            <div className="form-group">
                <label>Portfolio</label>
                <input
                    type="text"
                    value={formData.socialLinks.portfolio}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            socialLinks: {
                                ...formData.socialLinks,
                                portfolio: e.target.value,
                            },
                        })
                    }
                    placeholder="https://yourportfolio.com"
                />
            </div>

            <div className="form-navigation">
                <button onClick={prevStep} className="prev-btn">Previous</button>
                <button onClick={handleSubmit} className="submit-btn">Submit</button>
            </div>
        </div>
    );
};

export default CompleteTeacherProfileStep3;
