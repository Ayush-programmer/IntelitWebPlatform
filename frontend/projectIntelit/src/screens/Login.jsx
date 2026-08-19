import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios.js'
import { validateEmail, validatePassword } from '../utils/formValidation.js'
import toast from 'react-hot-toast'
import {
    BookOpen,
    GraduationCap,
    MonitorPlay,
    Eye,
    EyeOff
} from "lucide-react";
import { useAuth } from '../hooks/useAuth.js'

const Login = () => {
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const { loginStudent, setIsLoading, setError } = useAuth();
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        let error = "";

        if (name === 'email') {
            error = validateEmail(value);
        }
        setErrors(prev => ({
            ...prev, [name]: error
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            const { data } = await axios.post("/users/login", formData);

            await loginStudent({
                user: data.user,
                token: data.token
            });
            toast.success("Logged In");
            navigate("/userdashboard");
        } catch (err) {
            toast.error("Invalid email or password");
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="loginApp">

            {/* LEFT PANEL */}

            <div className="branding-side">

                <div className="branding-content">

                    <h1 className="brand-name">
                        Intelit
                    </h1>

                    <h2>
                        Learn.
                        <br />
                        Build.
                        <br />
                        Grow.
                    </h2>

                    <p className="brand-description">
                        A modern eLearning platform designed to help students learn,
                        practice and achieve their goals through engaging courses and
                        interactive learning.
                    </p>
                    <div className="feature-list">

                        <div className="feature-card">
                            <div className="feature-icon">
                                <BookOpen size={26} strokeWidth={2.2} />
                            </div>

                            <div>
                                <h4>Interactive Video Courses</h4>
                                <p>Learn through structured video lessons designed for practical understanding.</p>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <GraduationCap size={26} strokeWidth={2.2} />
                            </div>

                            <div>
                                <h4>Learn from Expert Teachers</h4>
                                <p>Access courses created by passionate educators across different subjects.</p>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <MonitorPlay size={26} strokeWidth={2.2} />
                            </div>

                            <div>
                                <h4>Learn Anytime, Anywhere</h4>
                                <p>Continue your learning journey seamlessly from any device.</p>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Decorative floating blobs */}

                <div className="blob blob1"></div>
                <div className="blob blob2"></div>
                <div className="blob blob3"></div>

            </div>



            {/* RIGHT PANEL */}

            <div className="form-side">

                <div className="form-container">

                    <h2>Welcome Back 👋</h2>

                    <p className="subtitle">
                        Login to continue your learning journey.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">

                            <label>Email</label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />

                            {errors.email && (
                                <p className="error">{errors.email}</p>
                            )}

                        </div>

                        <div className="input-group">
                            <label>Password</label>

                            <div    
                            htmlFor='password' className="password-field">

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
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn-primary-col login-btn"
                        >
                            Login
                        </button>

                    </form>

                    <div className="auth-links">

                        <p>
                            Don't have an account?
                            <Link to="/register">
                                Sign Up
                            </Link>
                        </p>

                        <p>
                            Teacher?
                            <Link to="/teacherlogin">
                                Login Here
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login