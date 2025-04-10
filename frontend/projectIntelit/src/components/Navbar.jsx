import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserAuth from '../Auth/Userauth';

const Navbar = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  console.log(showSidebar);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'student') {
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true);
    }
  });

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <a className="brand-logo" href="#">
            Intelit
          </a>
          <div className={`side-wrapper ${showSidebar ? "show" : ""}`}>
            <i className="fa-solid fa-close" onClick={() => setShowSidebar(false)}></i>
            <div className="navbar-links">
              <Link className="navbar-link active" to="/">Home</Link>
              <Link className="navbar-link" to="/about">About</Link>
              <Link className="navbar-link" to="/browsecourses">Courses</Link>
              <Link className="navbar-link" to="/contact">Contact Us</Link>
            </div>
          </div>

          <div className="right">
            {!isAuthenticated ? (
              <div className="navbar-auth">
                <Link className="navbar-link login" to="/login">LogIn</Link>
                <Link className="navbar-link" to="/register">
                  <button className="register btn-primary-col">Register</button>
                </Link>
              </div>) : (
              <div className='navbar-auth'>
                <Link className="navbar-link" to="/logout">Logout</Link>
              </div>
            )
            }

            {!showSidebar ? <div className="sidebar-btn" onClick={() => setShowSidebar(true)}> <i className="fa-solid fa-bars-staggered"></i></div> : ''}
          </div>

        </div>
      </nav>
    </div>
  )
}

export default Navbar