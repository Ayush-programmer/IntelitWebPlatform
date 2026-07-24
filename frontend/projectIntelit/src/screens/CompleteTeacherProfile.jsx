// CompleteTeacherProfile.jsx
import React, { useState, useEffect } from 'react';
import CompleteTeacherProfileStep1 from '../components/CompleteTeacherProfileStep1.jsx';
import CompleteTeacherProfileStep2 from '../components/CompleteTeacherProfileStep2.jsx';
import CompleteTeacherProfileStep3 from '../components/CompleteTeacherProfileStep3.jsx';
import axios from '../config/axios.js';
import { useLocation, useNavigate } from 'react-router-dom';

const CompleteTeacherProfile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [step, setStep] = useState(1);
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
        ? await axios.put('/teachers/updateprofile', payload)
        : await axios.post('/teachers/completeprofile', payload);

      if (res.status === 200) {
        alert(isEditMode ? 'Profile updated!' : 'Profile completed!');
        navigate('/teacherdashboard');
      } else {
        alert(res.data.message || 'Something went wrong!');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Server error!');
    }
  };

  return (
    <div className="teacher-profile-wrapper">
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>
      {step === 1 && (
        <CompleteTeacherProfileStep1 formData={formData} setFormData={setFormData} handleChange={handleChange} nextStep={nextStep} />
      )}
      {step === 2 && (
        <CompleteTeacherProfileStep2 formData={formData} setFormData={setFormData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />
      )}
      {step === 3 && (
        <CompleteTeacherProfileStep3
          formData={formData}
          setFormData={setFormData}
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