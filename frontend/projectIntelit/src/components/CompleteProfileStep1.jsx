// components/CompleteProfile/StepOne.jsx

import React from 'react';

const CompleteProfileStep1 = ({ formData, handleChange, nextStep, errors }) => {

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
        {errors.fullName &&
          <p className='error'>{errors.fullName}</p>}
        {/* <input
          {...register("fullName", {
            required: "Full name is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Only letters and spaces are allowed"
            }
          })}
          {...errors.fullName && (
            <p className="input-error">{errors.fullName.message}</p>
          )} */}

        {/* /> */}
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          min={10}
          max={10}
          value={formData.phone || ''}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
        />
        {errors.phone &&
          <p className='error'>{errors.phone}</p>}
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
        {
          errors.gender && <p className="error">{errors.gender}</p>
        }
      </div>

      <div className="button-group">
        <button type='button' onClick={nextStep} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default CompleteProfileStep1;
