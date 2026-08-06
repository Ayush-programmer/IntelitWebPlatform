import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios.js'
import { TeacherContext } from '../context/Teacher.context.jsx'
import toast from 'react-hot-toast'
import {
    BookOpen,
    UploadCloud,
    LayoutDashboard,
    ShieldCheck
} from "lucide-react";

const TeacherLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setTeacher, setIsLoading, setError } = useContext(TeacherContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        axios.post('/teachers/login', { email, password }).then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            console.log(res.data.teacher);

            setTeacher(res.data.teacher);

            toast.success("Logged In")
            navigate('/teacherdashboard');
        }).catch((err) => {
            toast.error("Invalid email or password")
            setError('Invalid email or password')
        }).finally(() => {
            setIsLoading(false);
        })
    }
    return (
        <div className="loginApp teacherLogin">

            <div className="teacher-left">

                <div className="teacher-overlay"></div>

                <div className="teacher-content">

                    <p className="teacher-tag">
                        INTELIT • TEACHER PORTAL
                    </p>

                    <h1>
                        Build courses.<br />
                        Inspire students.
                    </h1>

                    <p className="teacher-desc">
                        Everything you need to create engaging learning experiences
                        from one modern workspace.
                    </p>

                    <div className="teacher-features">

                        <div className="teacher-feature feature-card">
                            <BookOpen size={22} />
                            <span>Create & Manage Courses</span>
                        </div>

                        <div className="teacher-feature feature-card">
                            <UploadCloud size={22} />
                            <span>Upload Lessons & Resources</span>
                        </div>

                        <div className="teacher-feature feature-card">
                            <LayoutDashboard size={22} />
                            <span>Simple Teaching Dashboard</span>
                        </div>

                        <div className="teacher-feature feature-card">
                            <ShieldCheck size={22} />
                            <span>Secure Teacher Workspace</span>
                        </div>

                    </div>

                </div>

            </div>

            <div className="teacher-right">

                <div className="form-container">

                    <div className="login-badge">
                        Teacher Login
                    </div>

                    <h2>Welcome Back 👋</h2>

                    <p className="subtitle">
                        Sign in to continue teaching on Intelit.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <label htmlFor="email">Email Address</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />

                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />

                        <button
                            type="submit"
                            className="btn-primary-col"
                        >
                            Login
                        </button>

                    </form>

                    <p className="register-link">
                        New Teacher?
                        <Link to="/teacherregister" className="links">
                            Create Account
                        </Link>
                    </p>

                    <p className="register-link">
                        Student?
                        <Link to="/login" className="links">
                            Student Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    )
}

export default TeacherLogin