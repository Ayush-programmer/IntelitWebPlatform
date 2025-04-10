// CompleteTeacherProfile.jsx
import React, { useState } from 'react';
import StepOne from '../components/CompleteProfileStep1.jsx';
import StepTwo from '../components/CompleteProfileStep2.jsx';
import StepThree from '../components/CompleteProfileStep3.jsx';

const CompleteTeacherProfile = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    bio: '',
    profilePic: '',
    expertise: '',
    currentPosition: '',
    techStack: '',
    socialLinks: {
      linkedIn: '',
      github: '',
      twitter: ''
    }
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting profile:', formData);
  };

  return (
    <div className="teacher-profile-wrapper">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>
      {step === 1 && (
        <StepOne formData={formData} handleChange={handleChange} nextStep={nextStep} />
      )}
      {step === 2 && (
        <StepTwo formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 3 && (
        <StepThree
          formData={formData}
          handleChange={handleChange}
          handleSocialChange={handleSocialChange}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CompleteTeacherProfile;
