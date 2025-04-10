// components/CompleteProfile/StepThree.jsx

import React, { useState } from 'react';
import { uploadThumbnailToCloudinary } from '../utils/cloudinaryUtils';

const StepThree = ({ formData, setFormData, prevStep, handleSubmit }) => {
    const [localImage, setLocalImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const url = await uploadThumbnailToCloudinary(file);
        console.log('Image URL:', url);
        if (!url) return;
        setFormData({ ...formData, profilePic: url });

    };

    const statusOptions = ['Studying', 'Berojgaar', 'Working Professional'];

    return (
        <div className="step-container">
            <h2>Step 3: Additional Info</h2>

            <div className="form-group">
                <label>Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {localImage && <img src={localImage} alt="preview" className="image-preview" />}
            </div>

            <div className="form-group">
                <label>LinkedIn</label>
                <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin || ''}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                />
            </div>

            <div className="form-group">
                <label>GitHub</label>
                <input
                    type="url"
                    name="github"
                    value={formData.github || ''}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                />
            </div>

            <div className="form-group">
                <label>Twitter</label>
                <input
                    type="url"
                    name="twitter"
                    value={formData.twitter || ''}
                    onChange={handleChange}
                    placeholder="https://twitter.com/username"
                />
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
            </div>

            <div className="button-group">
                <button onClick={prevStep} className="prev-btn">
                    Previous
                </button>
                <button onClick={handleSubmit} className="submit-btn">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default StepThree;