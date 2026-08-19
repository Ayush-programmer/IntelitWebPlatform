
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios.js';
import toast from 'react-hot-toast';
import {
    BookOpen,
    UploadCloud,
    LayoutDashboard,
    ShieldCheck,
    Eye,
    EyeOff
} from "lucide-react";
import { useAuth } from '../hooks/useAuth.js';

const TeacherLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const { loginTeacher, setIsLoading, setError } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            const { data } = await axios.post(
                "/teachers/login",
                formData
            );

            loginTeacher({
                teacher: data.teacher,
                token: data.token
            });

            toast.success("Logged In");

            navigate('/teacherdashboard');

        } catch (err) {
            console.log(err);

            toast.error("Invalid email or password");

            setError("Invalid Email or Password");

        } finally {
            setIsLoading(false);
        }
    };

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

                        <label htmlFor="email">
                            Email Address
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

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="password-field">

                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(prev => !prev)
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword
                                    ? <EyeOff size={20} />
                                    : <Eye size={20} />
                                }
                            </button>

                        </div>

                        <button
                            type="submit"
                            className="btn-primary-col"
                        >
                            Login
                        </button>

                    </form>

                    <p className="register-link">
                        New Teacher?
                        <Link
                            to="/teacherregister"
                            className="links"
                        >
                            Create Account
                        </Link>
                    </p>

                    <p className="register-link">
                        Student?
                        <Link
                            to="/login"
                            className="links"
                        >
                            Student Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default TeacherLogin;