import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios.js'
import { TeacherContext } from '../context/Teacher.context.jsx'

const TeacherLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { teacher, setTeacher } = useContext(TeacherContext);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/teachers/login', { email, password }).then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            console.log(res.data.teacher);

            setTeacher(res.data.teacher);

            navigate('/teacherdashboard');
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <div className="loginApp">
            <div className="container">
                <div className="form-container">
                    <h2>Login to Intelit</h2>
                    <form onSubmit={handleSubmit}>
                        <label for="email" className="text-mute">Email :</label>
                        <input type="email" id="email" name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} required />

                        <label for="password" className="text-mute">Password :</label>
                        <input type="password" id="password" name="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} required />

                        <button type="submit" className="btn-primary-col">Login</button>
                        <p className="link register-link text-mute">Don't have an account?<Link to='/teacherregister' className='links'>SignUp here</Link></p>
                    </form>
                </div>
                <div className="image-container">
                    <img src="./images/pexels-artempodrez-8512381.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default TeacherLogin