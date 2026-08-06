// CompleteTeacherProfile.jsx
import React, { useState, useEffect } from 'react';
import CompleteTeacherProfileStep1 from '../components/CompleteTeacherProfileStep1.jsx';
import CompleteTeacherProfileStep2 from '../components/CompleteTeacherProfileStep2.jsx';
import CompleteTeacherProfileStep3 from '../components/CompleteTeacherProfileStep3.jsx';
import axios from '../config/axios.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateName, validateTextField, validatePhone, validateLinkedIn, validateGithub, validateTwitter } from '../utils/formValidation.js';

import toast from 'react-hot-toast';


const CompleteTeacherProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    bio: '',
    profilePic: '',
    education: '',
    currentPosition: '',
    techStack: [],
    socialLinks: {
      linkedIn: '',
      github: '',
      twitter: ''
    }
  });
  const navigate = useNavigate();
  const location = useLocation();

  const validateStep1 = () => {
    const newErrors = {
      fullName: validateName(formData.fullName),
      phoneNumber: validatePhone(formData.phoneNumber),
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
      bio: validateTextField(formData.bio),
      education: validateTextField(formData.education)
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
    }

    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));

    return Object.values(newErrors).every(error => error === "");
  }

  const nextStep = () => {
    if (step == 1 && !validateStep1()) {
      return;
    }
    if (step == 2 && !validateStep2()) {
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3))
  };
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let error = "";

    if (name === "fullName") {
      error = validateName(value);
    }

    if (name === "phoneNumber") {
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

    if (name === 'education') {
      error = validateTextField(value);
    }

    setErrors(prev => ({
      ...prev, [name]: error
    }));
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

  useEffect(() => {
    if (location.pathname === '/updateteacherprofile') {
      setIsEditMode(true);
      fetchTeacherProfile();
    }
  }, [location]);

  const fetchTeacherProfile = async () => {
    try {
      const res = await axios.get('/teachers/profile');
      const user = res.data.teacher;
      console.log(res);

      setFormData({
        fullName: user.profile.fullName || '',
        phoneNumber: user.profile.phoneNumber || '',
        gender: user.profile.gender || '',
        dateOfBirth: user.profile.dateOfBirth || '',
        bio: user.profile.bio || '',
        profilePic: user.profile.profilePic || '',
        socialLinks: {
          linkedIn: user.profile.socialLinks?.linkedIn || '',
          github: user.profile.socialLinks?.github || '',
          twitter: user.profile.socialLinks?.twitter || '',
        },
        techStack: user.profile.techStack || [],
        currentPosition: user.profile.currentPosition || '',
        education: user.profile.education || '',
      });
    } catch (err) {
      console.error("Failed to load user:", err);
      alert("Error loading profile.");
    }
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
        ? await axios.put('/teachers/updateprofile', payload)
        : await axios.post('/teachers/completeprofile', payload);

      if (res.status === 200) {
        toast.success(isEditMode ? 'Profile updated!' : 'Profile completed!');
        navigate('/teacherdashboard');
      } else {
        toast.error(res.data.message || 'Something went wrong!');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Server error!');
    }
  };

  return (
    <div className="teacher-profile-wrapper">
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>
      {step === 1 && (
        <CompleteTeacherProfileStep1 formData={formData} setFormData={setFormData} handleChange={handleChange} nextStep={nextStep} errors={errors} />
      )}
      {step === 2 && (
        <CompleteTeacherProfileStep2 formData={formData} setFormData={setFormData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={errors} />
      )}
      {step === 3 && (
        <CompleteTeacherProfileStep3
          formData={formData}
          setFormData={setFormData}
          handleChange={handleChange}
          handleSocialChange={handleSocialChange}
          prevStep={prevStep}
          handleSubmit={handleSubmit} errors={errors}
        />
      )}
    </div>
  );
};

export default CompleteTeacherProfile;