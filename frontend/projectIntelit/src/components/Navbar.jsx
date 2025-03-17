import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <nav className="navbar">
          <div className="container">
            <a className="brand-logo" href="#">
              Intelit
            </a>
            <div className="side-wrapper">
              <i className="fa-solid fa-close"></i>
              <div className="navbar-links">
                <a className="navbar-link active" href="/">Home</a>
                <a className="navbar-link" href="/about">About</a>
                <a className="navbar-link" href="/browsecourses">Courses</a>
                <a className="navbar-link" href="/contact">Contact Us</a>
              </div>
            </div>
            <div className="right">
              <div className="navbar-auth">
                <Link to='/login' className='login'>LogIn</Link>
                <Link to='/register'><button className="register btn-primary-col">Register</button></Link>
              </div>
              <div className="sidebar-btn">
                <i className="fa-solid fa-bars-staggered"></i>
              </div>
            </div>
          </div>
        </nav>
    </div>
  )
}

export default Navbar