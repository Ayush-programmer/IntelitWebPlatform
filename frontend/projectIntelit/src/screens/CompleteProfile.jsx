import React, { useState } from 'react';
import StepOne from '../components/CompleteProfileStep1.jsx';
import StepTwo from '../components/CompleteProfileStep2.jsx';
import StepThree from '../components/CompleteProfileStep3.jsx';
import axios from '../config/axios.js';
import { useNavigate } from 'react-router-dom';

const CompleteProfile = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    bio: '',
    profilePic: '',
    linkedin: '',
    github: '',
    twitter: '',
    interest: '',
    currentStatus: ''
  });

  const navigate = useNavigate();

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/users/complete-profile', formData);

      if (res.status === 200) {
        alert('Profile completed successfully!');
        navigate('/userdashboard');
      } else {
        alert(res.data.message || 'Something went wrong!');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Server error!');
    }
  };

  return (
    <div className="complete-profile-wrapper">
    <div className="complete-profile-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 3) * 100}%` }} />
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <StepOne
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        )}
        {step === 2 && (
          <StepTwo
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {step === 3 && (
          <StepThree
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )}
      </form>
    </div>
    </div>
  );
};

export default CompleteProfile;
