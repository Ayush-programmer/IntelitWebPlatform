import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from '../config/axios.js';

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/courses/allcourses')
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => {
        console.error('Error fetching courses:', err);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="courses-container">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <img src={course.image} alt={course.title} className="course-image" />
            <div className="course-details">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <button className="btn-primary-col">Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default BrowseCourses;