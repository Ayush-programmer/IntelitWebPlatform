import React, { useState } from 'react';
import { uploadThumbnailToCloudinary } from '../utils/cloudinaryUtils';


const CompleteTeacherProfileStep3 = ({ formData, handleChange, setFormData, prevStep, handleSubmit, errors }) => {
    const [uploading, setUploading] = useState(false);
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file) return;
            setUploading(true);
            const url = await uploadThumbnailToCloudinary(file);
            console.log('Image URL:', url);
            if (!url) return;
            setFormData({ ...formData, profilePic: url });
            setUploading(false);
        }
    };

    return (
        <div className="step-form teacher-profile-card">
            <h2 className='teacher-profile-title'>Finish Your Profile</h2>

            <div className="input-group">
                <label>Upload Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {uploading && <div className="loader">Uploading...</div>}
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
                    type="url"
                    name='github'
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
                {errors.github &&
                    <p className='error'>{errors.github}</p>}
            </div>

            <div className="input-group">
                <label>LinkedIn</label>
                <input
                    type="url"
                    name='linkedin'
                    value={formData.socialLinks.linkedIn}
                    onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: {
                            ...formData.socialLinks,
                            linkedIn: e.target.value,
                        }
                    })}
                    placeholder="https://linkedin.com/in/username"
                />
                {errors.linkedin &&
                    <p className='error'>{errors.linkedin}</p>}
            </div>

            <div className="input-group">
                <label>Twitter</label>
                <input
                    type="url"
                    name='twitter'
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
                {errors.twitter &&
                    <p className='error'>{errors.twitter}</p>}
            </div>

            <div className="button-group">
                <button onClick={prevStep} className="prev-btn">Previous</button>
                <button onClick={handleSubmit} className="submit-btn" disabled={uploading}>{uploading ? "Submitting..." : "Submit"}</button>
            </div>
        </div>
    );
};

export default CompleteTeacherProfileStep3;