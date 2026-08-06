import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios.js'
import { TeacherContext } from '../context/Teacher.context.jsx'
import toast from 'react-hot-toast'
import { validateEmail, validateName, validatePassword } from '../utils/formValidation.js'
import {
  BookOpen,
  UploadCloud,
  LayoutDashboard,
  ShieldCheck
} from "lucide-react";

const Register = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { teacher, setTeacher } = useContext(TeacherContext);

  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let error = "";

    if (name === 'name') {
      error = validateName(value);
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

    axios.post('/teachers/register', formData).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      setTeacher(res.data.teacher);

      toast.success('Registration Successful');
      navigate('/teacherdashboard');
    }).catch((err) => {
      toast.error(err.response?.data?.errors || "Something went wrong.");
      console.log(err);
    })
  }

  return (
    <div className="teacherRegister">

      <div className="teacher-register-left">

        <div className="teacher-overlay"></div>

        <div className="teacher-register-content">

          <span className="teacher-tag">
            INTELIT • INSTRUCTOR
          </span>

          <h1>
            Share your
            <br />
            knowledge with
            <br />
            the world.
          </h1>

          <p className="teacher-description">
            Create your instructor account and start building engaging
            courses, managing students, and growing your teaching journey.
          </p>

          <div className="teacher-feature-list">

            <div className="teacher-feature feature-card">
              <BookOpen size={22} />
              <span>Create Professional Courses</span>
            </div>

            <div className="teacher-feature feature-card">
              <UploadCloud size={22} />
              <span>Upload Videos & Resources</span>
            </div>

            <div className="teacher-feature feature-card">
              <LayoutDashboard size={22} />
              <span>Manage Everything Easily</span>
            </div>

            <div className="teacher-feature feature-card">
              <ShieldCheck size={22} />
              <span>Secure Instructor Workspace</span>
            </div>

          </div>

        </div>

      </div>

      <div className="teacher-register-right">

        <div className="teacher-register-card">

          <span className="register-badge">
            Teacher Registration
          </span>

          <h2>Become an Instructor</h2>

          <p className="subtitle">
            Create your Intelit instructor account.
          </p>

          <form onSubmit={handleSubmit}>

            <label htmlFor="name">
              Full Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            {errors.name &&
              <p className="error">
                {errors.name}
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
              placeholder="Create a secure password"
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
              Create Instructor Account
            </button>

          </form>

          <p className="login-link">
            Already an instructor?

            <Link
              to="/teacherlogin"
              className="links"
            >
              Login
            </Link>

          </p>

          <div className="divider"></div>

          <p className="student-link">
            Looking for student registration?

            <Link
              to="/register"
              className="links"
            >
              Student Signup
            </Link>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Register