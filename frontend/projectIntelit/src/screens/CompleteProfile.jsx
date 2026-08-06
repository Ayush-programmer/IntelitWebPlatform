import React, { useEffect, useState } from 'react';
import StepOne from '../components/CompleteProfileStep1.jsx';
import StepTwo from '../components/CompleteProfileStep2.jsx';
import StepThree from '../components/CompleteProfileStep3.jsx';
import axios from '../config/axios.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateName, validateTextField, validatePhone, validateLinkedIn, validateGithub, validateTwitter } from '../utils/formValidation.js';

import toast from 'react-hot-toast';

const CompleteProfile = () => {
  const [step, setStep] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
      toast.error("Error loading profile.");
    }
  };

  const validateStep1 = () => {
    const newErrors = {
      fullName: validateName(formData.fullName),
      phone: validatePhone(formData.phone),
      gender: !formData.gender ? "Please select a gender." : ""
    };

    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));

    return Object.values(newErrors).every(error => error === "");
  };

  const validateStep2 = () => {
    const newErrors = {
      bio: validateTextField(formData.bio)
    };

    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));
    return Object.values(newErrors).every(error => error === "");
  }

  const validateStep3 = () => {
    const newErrors = {
      linkedIn: validateLinkedIn(formData.socialLinks.linkedIn),
      github: validateGithub(formData.socialLinks.github),
      twitter: validateTwitter(formData.socialLinks.twitter),
      interests: validateTextField(formData.interests)
    }

    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));

    return Object.values(newErrors).every(error => error === "");
  }

  const nextStep = () => {
    if (step == 1 && !validateStep1()) {
      toast.error('some validation failed')
      return;
    }
    if (step == 2 && !validateStep2()) {
      toast.error('some validation failed')
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3))
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    let error = "";

    if (name === "fullName") {
      error = validateName(value);
    }

    if (name === "phone") {
      error = validatePhone(value);
    }

    if (name === 'bio') {
      error = validateTextField(value);
    }

    if (name === 'linkedin') {
      error = validateLinkedIn(value);
    }

    if (name === 'github') {
      error = validateGithub(value);
    }

    if (name === 'twitter') {
      error = validateTwitter(value);
    }

    if (name === 'interests') {
      error = validateTextField(value);
    }

    setErrors(prev => ({
      ...prev, [name]: error
    }));
  };

  const validateForm = () => {
    return (
      validateStep1() &&
      validateStep2() &&
      validateStep3()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('some validation failed');
      return;
    }

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
        toast.success(isEditMode ? 'Profile updated!' : 'Profile completed!');
        navigate('/userdashboard');
      } else {
        toast.error(res.data.message || 'Something went wrong!');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Server error!');
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
              errors={errors}
            />
          )}
          {step === 2 && (
            <StepTwo
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              nextStep={nextStep}
              prevStep={prevStep}
              errors={errors}
            />
          )}
          {step === 3 && (
            <StepThree
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
              errors={errors}
              loading={loading}
              setLoading={setLoading}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;