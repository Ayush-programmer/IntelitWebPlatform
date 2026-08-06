// components/CompleteProfile/StepThree.jsx

import React, { useState } from 'react';
import { uploadThumbnailToCloudinary } from '../utils/cloudinaryUtils';

const StepThree = ({ formData, setFormData, handleChange, prevStep, handleSubmit, errors, loading, setLoading }) => {
    const [localImage, setLocalImage] = useState(null);

    const handleImageChange = async (e) => {
        setLoading(true);
        const file = e.target.files[0];
        if (!file) return;
        const url = await uploadThumbnailToCloudinary(file);
        console.log('Image URL:', url);
        if (!url) return;
        setFormData({ ...formData, profilePic: url });
        setLoading(false);
    };

    const statusOptions = ['Studying', 'Berojgaar', 'Working Professional'];

    return (
        <div className="step-container">
            <h2>Step 3: Additional Info</h2>

            <div className="form-group">
                <label>Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {localImage && <img src={localImage} alt="preview" className="image-preview" />}
                {loading && <div className="loader">Uploading...</div>}
            </div>

            <div className="form-group">
                <label>LinkedIn</label>
                <input
                    type="url"
                    name="linkedin"
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
                {errors.linkedin &&
                    <p className='error'>{errors.linkedin}</p>}
            </div>

            <div className="form-group">
                <label>GitHub</label>
                <input
                    type="url"
                    name="github"
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

            <div className="form-group">
                <label>Twitter</label>
                <input
                    type="url"
                    name="twitter"
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

            <div className="form-group">
                <label>Current Status</label>
                <select
                    name="currentStatus"
                    value={formData.currentStatus || ''}
                    onChange={handleChange}
                >
                    <option value="">Select your current status</option>
                    {statusOptions.map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Interests</label>
                <input
                    type="text"
                    name="interests"
                    value={formData.interests || ''}
                    onChange={handleChange}
                    placeholder="e.g., Web Dev, AI, ML"
                />
                {errors.interests &&
                    <p className='error'>{errors.interests}</p>}
            </div>

            <div className="button-group">
                <button onClick={prevStep} className="prev-btn">
                    Previous
                </button>
                <button
                    onClick={handleSubmit}
                    className="submit-btn"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default StepThree;