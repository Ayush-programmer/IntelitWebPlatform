import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">

      <div className="flex-div">

        <div className="logo-box box">
          <h3 className="header logo">Intelit</h3>
          <p className="description text-mute">
            Intelit is a modern e-learning platform where students can learn
            through structured courses and educators can create, manage, and
            publish quality learning content from anywhere.
          </p>
        </div>

        <div className="box">
          <h3 className="header">Quick Links</h3>

          <Link to="/" className="description text-mute">Home</Link>
          <Link to="/browsecourses" className="description text-mute">Browse Courses</Link>
          <Link to="/login" className="description text-mute">Student Login</Link>
          <Link to="/teacherlogin" className="description text-mute">Teacher Login</Link>
          <Link to="/about" className="description text-mute">About</Link>
        </div>

        <div className="box">
          <h3 className="header">Address</h3>

          <p className="description text-mute">
            Modipada<br />
            Sambalpur, Odisha - 768002<br />
            India
          </p>
        </div>

        <div className="box">
          <h3 className="header">Contact</h3>

          <p className="description text-mute">
            +91 9090170384
          </p>

          <p className="description text-mute">
            666ayushman@gmail.com
          </p>
        </div>

      </div>

      <hr className="text-mute" />

      <div className="footer-bottom">

        <div className="social-media">
          <a href="www.github.com/Ayush-programmer" rel="noreferrer">
            <i className="fa-brands fa-github"></i>
          </a>

          <a href="www.linkedin.com/in/ayushman-mahana-2a211625b/" rel="noreferrer">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>

          <a href="/">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>

        <p>
          &copy; 2026 <strong>Intelit</strong>. All Rights Reserved.
        </p>

      </div>

    </footer>
  )
}

export default Footer