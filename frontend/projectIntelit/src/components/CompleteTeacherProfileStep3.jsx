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
        <div className="step-form teacher-profile-card">
            <h2 className='teacher-profile-title'>Finish Your Profile</h2>

            <div className="input-group">
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

            <div className="input-group">
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

            <div className="input-group">
                <label>LinkedIn</label>
                <input
                    type="text"
                    value={formData.socialLinks.linkedIn}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            socialLinks: {
                                ...formData.socialLinks,
                                linkedIn: e.target.value,
                            },
                        })
                    }
                    placeholder="https://linkedin.com/in/username"
                />
            </div>

            <div className="input-group">
                <label>Twitter</label>
                <input
                    type="text"
                    value={formData.socialLinks.twitter}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            socialLinks: {
                                ...formData.socialLinks,
                                twitter: e.target.value,
                            },
                        })
                    }
                    placeholder="https://twitter.com/username"
                />
            </div>

            <div className="button-group">
                <button onClick={prevStep} className="prev-btn">Previous</button>
                <button onClick={handleSubmit} className="submit-btn">Submit</button>
            </div>
        </div>
    );
};

export default CompleteTeacherProfileStep3;
