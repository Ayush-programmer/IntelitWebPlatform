import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios.js'
import { UserContext } from '../context/user.context.jsx'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/users/register', { username, email, password }).then((res) => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      
      setUser(res.data.user);

      navigate('/userdashboard');
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
            <label for="username" className="text-mute" >Username</label>
            <input type="text" id="username" name="username" value={username}
             onChange={(e) => setUsername(e.target.value)} required />

            <label for="email" className="text-mute">Email</label>
            <input type="email" id="email" name="email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />

            <label for="password" className="text-mute">Password</label>
            <input type="password" id="password" name="password" value={password}
              onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit" className="btn-primary-col">Sign Up</button>

            <p className="login-link text-mute">Already have an account?<Link to='/login' className='links'>Login</Link></p>
          </form>
          <p className='link2 register-teacher text-mute'>Register as a teacher...<Link to='/teacherregister' className='links'>Register</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register