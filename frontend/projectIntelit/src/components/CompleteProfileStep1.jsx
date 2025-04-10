// components/CompleteProfile/StepOne.jsx

import React from 'react';

const CompleteProfileStep1 = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="step-container">
      <h2>Step 1: Basic Information</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName || ''}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone || ''}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
        />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select
          name="gender"
          value={formData.gender || ''}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="non-binary">Non-binary</option>
          <option value="prefer-not-say">Prefer not to say</option>
        </select>
      </div>

      <div className="button-group">
        <button onClick={nextStep} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default CompleteProfileStep1;
