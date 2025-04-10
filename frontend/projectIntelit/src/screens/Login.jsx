import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios.js'
import { UserContext } from '../context/user.context.jsx'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUser, setIsLoading, setError } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        axios.post('/users/login', { email, password }).then((res) => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            
            setUser(res.data.user);

            navigate('/userdashboard');
        }).catch((err) => {
            console.log(err);
            setError('Invalid email or password')
        }).finally(() => {
            setIsLoading(false);
        })
    }
    return (
        <div className="loginApp">
            <div className="container">
                <div className="form-container">
                    <h2>Login to Intelit</h2>
                    <form onSubmit={handleSubmit}>
                        <label for="username" className="text-mute">Email :</label>
                        <input type="email" id="email" name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} required />

                        <label for="password" className="text-mute">Password :</label>
                        <input type="password" id="password" name="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required />

                        <button type="submit" className="btn-primary-col">Login</button>
                        <p className="link register-link text-mute">Don't have an account?<Link to='/register' className='links'>SignUp here</Link></p>
                    </form>
                    <p className='link link2 teacher-login text-mute'>Login as a teacher...<Link to='/teacherlogin' className='links'>Login</Link></p>
                </div>
                <div className="image-container">
                    <img src="./images/pexels-artempodrez-8512381.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login