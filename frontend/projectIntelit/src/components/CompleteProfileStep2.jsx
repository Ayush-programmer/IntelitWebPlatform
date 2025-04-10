// components/CompleteProfile/StepTwo.jsx

import React from 'react';

const CompleteProfileStep2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="step-container">
      <h2>Step 2: Personal Details</h2>

      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth || ''}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Bio</label>
        <textarea
          name="bio"
          rows="6"
          value={formData.bio || ''}
          onChange={handleChange}
          placeholder="Tell us something about yourself"
          required
        />
      </div>

      <div className="button-group">
        <button onClick={prevStep} className="prev-btn">
          Previous
        </button>
        <button onClick={nextStep} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default CompleteProfileStep2;