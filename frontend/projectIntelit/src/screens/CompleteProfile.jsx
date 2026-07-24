import React, { useEffect, useState } from 'react';
import StepOne from '../components/CompleteProfileStep1.jsx';
import StepTwo from '../components/CompleteProfileStep2.jsx';
import StepThree from '../components/CompleteProfileStep3.jsx';
import axios from '../config/axios.js';
import { useNavigate, useLocation } from 'react-router-dom';

const CompleteProfile = () => {
  const [step, setStep] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    bio: '',
    profilePic: '',
    socialLinks: {
      linkedIn: '',
      github: '',
      twitter: ''
    },
    interests: '',
    currentStatus: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Detect Edit Mode
  useEffect(() => {
    if (location.pathname === '/updateprofile') {
      setIsEditMode(true);
      fetchUserProfile();
    }
  }, [location]);

  // Fetch existing user profile in edit mode
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get('/users/profile'); // Update route if different
      const user = res.data.user;
      setFormData({
        fullName: user.profile.fullName || '',
        phone: user.profile.phone || '',
        gender: user.profile.gender || '',
        dateOfBirth: user.profile.dateOfBirth || '',
        bio: user.profile.bio || '',
        profilePic: user.profile.profilePic || '',
        socialLinks: {
          linkedIn: user.profile.socialLinks?.linkedIn || '',
          github: user.profile.socialLinks?.github || '',
          twitter: user.profile.socialLinks?.twitter || '',
        },
        interests: user.profile.interests || '',
        currentStatus: user.profile.currentStatus || '',
      });
    } catch (err) {
      console.error("Failed to load user:", err);
      alert("Error loading profile.");
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      socialLinks: {
        linkedIn: formData.socialLinks.linkedIn,
        github: formData.socialLinks.github,
        twitter: formData.socialLinks.twitter,
      },
    };

    try {
      const res = isEditMode
        ? await axios.put('/users/update-profile', payload)
        : await axios.post('/users/complete-profile', payload);

      if (res.status === 200) {
        alert(isEditMode ? 'Profile updated!' : 'Profile completed!');
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
              handleChange={handleChange}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <StepTwo
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <StepThree
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
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