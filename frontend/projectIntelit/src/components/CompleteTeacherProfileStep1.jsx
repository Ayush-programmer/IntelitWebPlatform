import React from 'react';

const CompleteTeacherProfileStep1 = ({ formData, handleChange, nextStep, errors }) => {
  return (
    <div className="step-form teacher-profile-card">
      <h2 className='teacher-profile-title'>Personal Details</h2>

      <div className="input-group">
        <label>Full Name</label>
        <input
          type="text"
          name='fullName'
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
        {errors.fullName &&
          <p className='error'>{errors.fullName}</p>}
      </div>

      <div className="input-group">
        <label>Phone Number</label>
        <input
          type="tel"
          name='phoneNumber'
          min={10}
          max={10}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
        {errors.phoneNumber &&
          <p className='error'>{errors.phoneNumber}</p>}
      </div>

      <div className="input-group">
        <label>Gender</label>
        <select
          value={formData.gender}
          name='gender'
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="nonbinary">Non-Binary</option>
          <option value="preferNotToSay">Prefer not to say</option>
        </select>
      </div>

      <div className="input-group">
        <label>Date of Birth</label>
        <input
          type="date"
          name='dateOfBirth'
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>

      <div className="button-group one-btn">
        <button onClick={nextStep} className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default CompleteTeacherProfileStep1;
