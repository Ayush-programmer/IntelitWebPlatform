import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios.js'
import { UserContext } from '../context/User.context.jsx'
import { validateUsername, validateEmail, validatePassword } from '../utils/formValidation.js'
import toast from 'react-hot-toast'
import {
  GraduationCap,
  BookOpen,
  Users
} from "lucide-react";

const Register = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let error = "";

    if (name === 'username') {
      error = validateUsername(value);
    }

    if (name === 'email') {
      error = validateEmail(value);
    }
    if (name === 'password') {
      error = validatePassword(value);
    }

    setErrors(prev => ({
      ...prev, [name]: error
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/users/register', formData).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      setUser(res.data.user);

      toast.success('Registration Successful');

      navigate('/userdashboard');
    }).catch((err) => {
      toast.error(err.response?.data?.errors || "Something went wrong.");
      console.log(err);
    })
  }

  return (
    <div className="signUpApp">

      <div className="register-left">

        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>

        <div className="register-content">

          <span className="register-tag">
            WELCOME TO INTELIT
          </span>

          <h1>
            Start your learning
            <br />
            journey today.
          </h1>

          <p className="register-description">
            Create your Intelit account and begin exploring interactive
            courses, practical learning, and a community built to help
            you grow every day.
          </p>

          <div className="register-features">

            <div className="feature-card">
              <div className="feature-icon">
                <GraduationCap size={22} />
              </div>

              <div>
                <h4>Interactive Learning</h4>
                <p>Learn with practical courses.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <BookOpen size={22} />
              </div>

              <div>
                <h4>Organized Content</h4>
                <p>Everything structured for easy learning.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Users size={22} />
              </div>

              <div>
                <h4>Community Driven</h4>
                <p>Learn together with students and teachers.</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      <div className="register-right">

        <div className="register-card">

          <span className="register-badge">
            Student Registration
          </span>

          <h2>Create Account</h2>

          <p className="subtitle">
            Join Intelit and begin learning smarter.
          </p>

          <form onSubmit={handleSubmit}>

            <label htmlFor="username">
              Username
            </label>

            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />

            {errors.username &&
              <p className="error">
                {errors.username}
              </p>
            }

            <label htmlFor="email">
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            {errors.email &&
              <p className="error">
                {errors.email}
              </p>
            }

            <label htmlFor="password">
              Password
            </label>

            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              required
            />

            {errors.password &&
              <p className="error">
                {errors.password}
              </p>
            }

            <button
              type="submit"
              className="btn-primary-col"
            >
              Create Account
            </button>

          </form>

          <p className="login-link">
            Already have an account?
            <Link to="/login" className="links">
              Login
            </Link>
          </p>

          <div className="divider"></div>

          <p className="teacher-register">
            Want to teach on Intelit?

            <Link
              to="/teacherregister"
              className="links"
            >
              Register as Teacher
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Register