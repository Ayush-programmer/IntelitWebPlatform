import React from 'react'
import Navbar from '../components/common/Navbar.jsx';
import Footer from '../components/common/Footer.jsx';
import WhyChooseSection from '../components/Home/WhyChooseSection.jsx';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about">

        {/* Hero Header */}
        <section className="about-hero">
          <div className="container">
            <span className="about-badge">About Intelit</span>
            <h1>Empowering Learners Through Practical Education</h1>
            <p>
              Intelit is built for students who want real skills and instructors who
              want to create meaningful learning experiences.
            </p>
          </div>
        </section>

        {/* Main About Section */}
        <section className="about-content section-p1">
          <div className="container about-grid">

            <div className="about-image" data-aos="fade-left">
              <img src="./images/smartEdu.svg" alt="Intelit Learning" />
            </div>

            <div className="about-text" data-aos="fade-left">

              <h2>Who We Are</h2>

              <p>
                Intelit is a modern e-learning platform designed to make quality
                education accessible, practical, and engaging. Whether you're a
                student looking to build in-demand skills or an instructor ready to
                share your expertise, Intelit provides a seamless learning experience.
              </p>

              <p>
                Our mission is to bridge the gap between theory and real-world
                application through structured courses, hands-on learning, and a
                platform powered by modern technologies.
              </p>

              <div className="about-highlights">
                <div className="highlight-card">
                  <span>🎯</span>
                  <p>Practical Learning</p>
                </div>

                <div className="highlight-card">
                  <span>📚</span>
                  <p>Industry-Relevant Courses</p>
                </div>

                <div className="highlight-card">
                  <span>👨‍🏫</span>
                  <p>Expert Instructors</p>
                </div>

                <div className="highlight-card">
                  <span>🚀</span>
                  <p>Learn Anytime, Anywhere</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Vision Section */}
        <section className="about-vision">
          <div className="container">
            <div className="vision-card">
              <i className="fa-solid fa-quote-left"></i>
              <h3>Our Vision</h3>
              <p>
                To create a learning ecosystem where anyone can gain practical
                knowledge, build confidence, and unlock new career opportunities
                through accessible and high-quality education.
              </p>
            </div>
          </div>
        </section>

        <WhyChooseSection />

      </div>
      <Footer />
    </div>
  )
}

export default About