import React from 'react';

const CompleteTeacherProfileStep1 = ({ formData, setFormData, nextStep }) => {
  return (
    <div className="teacher-step teacher-step-one">
      <h2>Personal Details</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="form-group">
        <label>Gender</label>
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="nonbinary">Non-Binary</option>
          <option value="preferNotToSay">Prefer not to say</option>
        </select>
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        />
      </div>

      <div className="form-navigation">
        <button onClick={nextStep} className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default CompleteTeacherProfileStep1;
