import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from '../config/axios.js';
import { Link } from 'react-router-dom';

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    axios.get('/courses/allcourses')
      .then((res) => {
        setCourses(res.data.courses);
      })
      .catch((err) => {
        console.error('Error fetching courses:', err);
      });
  }, []);

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="course-search-bar">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchActive(true)}
          className="course-search-input"
        />
        {isSearchActive && searchQuery && (
          <>
            <div
              className="search-overlay"
              onClick={() => {
                setIsSearchActive(false);
                setSearchQuery('');
              }}
            />
            <div className="search-results-box">
              {filteredCourses.length > 0 ? (
                filteredCourses.map(course => (
                  <Link
                    key={course._id}
                    to={`/course/${course._id}`}
                    className="search-result-item"
                    onClick={() => setIsSearchActive(false)}
                  >
                    <img src={course.thumbnail} alt={course.title} />
                    <div className="result-details">
                      <h4>{course.title}</h4>
                      <p>{course.category || 'General'} | ₹{course.price || 'Free'}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="no-results">No courses found</div>
              )}
            </div>
          </>
        )}
      </div>

      <div className="courses-container">
        {courses.map((course) => (
          <Link key={course._id} to={`/course/${course._id}`}>
            <div className="course-card">
              <div className="course-image">
                <img src={course.thumbnail} alt={course.title} />
              </div>
              <div className="course-details">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-category">{course.category || 'General'}</p>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <span className="course-price">₹{course.price || 'Free'}</span>
                  <button className="btn-primary-col">Enroll Now</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default BrowseCourses;