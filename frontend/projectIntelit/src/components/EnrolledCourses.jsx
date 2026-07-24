// EnrolledCourses.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const EnrolledCourses = ({ courses }) => {
    if (!courses.length) {
        return <div className="no-courses">You're not enrolled in any courses yet.</div>;
    }

    return (
        <div className="courses-section">
            <h3>Your Courses</h3>
            <div className="course-grid">
                {courses.map(course => (
                    <Link to={`/courses/${course._id}`} key={course._id} className="course-card">
                        <img src={course.thumbnail} alt={course.title} />
                        <h4>{course.title}</h4>
                        <span className="category">{course.category}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default EnrolledCourses;