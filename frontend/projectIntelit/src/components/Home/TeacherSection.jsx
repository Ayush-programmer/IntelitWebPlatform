import React from "react";
import { Link } from "react-router-dom";

const TeacherSection = () => {
    return (
        <section className="teacher-section">
            <div className="container">
                <div className="teacher-content" data-aos="fade-right">
                    <h2>Join Intelit as a Teacher</h2>
                    <p>Share your expertise with eager learners. Create, list, and manage your courses on our platform.
                        Inspire students globally and build your teaching portfolio.</p>
                    <Link to='/teacherlogin' className="btn-primary-col">Start Teaching</Link>
                </div>
                <div className="teacher-visual" data-aos="fade-left">
                    <img src="./images/teacherSec.svg" alt="Teacher Illustration" />
                </div>
            </div>
        </section>
    )
}

export default TeacherSection;