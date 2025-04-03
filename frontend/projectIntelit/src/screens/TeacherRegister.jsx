import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios.js'
import { TeacherContext } from '../context/Teacher.context.jsx'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { teacher, setTeacher } = useContext(TeacherContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/teachers/register', { name, email, password }).then((res) => {
      console.log(res.data);

      localStorage.setItem('token', res.data.token);
      setTeacher(res.data.teacher);

      navigate('/teacherdashboard');
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="signUpApp">
      <div className="container">
        <div className="left">
        </div>
        <div className="right">
          <h2>SignUp On Intelit</h2>
          <form onSubmit={handleSubmit}>
            <label for="username" className="text-mute" >Name</label>
            <input type="text" id="username" name="name" value={name}
             onChange={(e) => setName(e.target.value)} required />

            <label for="email" className="text-mute">Email</label>
            <input type="email" id="email" name="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />

            <label for="password" className="text-mute">Password</label>
            <input type="password" id="password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit" className="btn-primary-col">Sign Up</button>

            <p className="login-link text-mute">Already have an account?<Link to='/teacherlogin' className='links'>Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register