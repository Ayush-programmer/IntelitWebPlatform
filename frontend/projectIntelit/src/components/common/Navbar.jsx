import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import UserAuth from '../../auth/UserAuth';

const Navbar = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dashbordLink, setDashboardLink] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [isTeacher, setIsTecher] = useState(false);

  console.log(showSidebar);


  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token) {
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true);
    }
    if (role === 'teacher') {
      setDashboardLink('/teacherdashboard');
      setIsTecher(true);
    } else if (role === 'student') {
      setDashboardLink('/userdashboard');
      setIsTecher(false);
    } else {
      setDashboardLink('');
    }
  });

  return (
    <nav className="navbar">
      <div className="container">

        <Link className="brand-logo" to="/">
          Intelit
        </Link>

        <div className={`side-wrapper ${showSidebar ? "show" : ""}`}>

          <i
            className="fa-solid fa-close"
            onClick={() => setShowSidebar(false)}
          ></i>

          <div className="navbar-links">

            <NavLink
              onClick={() => setShowSidebar(false)}
              className="navbar-link"
              to="/"
            >
              Home
            </NavLink>

            <NavLink
              onClick={() => setShowSidebar(false)}
              className="navbar-link"
              to="/browsecourses"
            >
              Browse Courses
            </NavLink>

            <NavLink
              onClick={() => setShowSidebar(false)}
              className="navbar-link"
              to="/about"
            >
              About
            </NavLink>

            <NavLink
              onClick={() => setShowSidebar(false)}
              className="navbar-link"
              to="/contact"
            >
              Contact
            </NavLink>

            {
              !isTeacher &&
              <NavLink
                onClick={() => setShowSidebar(false)}
                className="navbar-link instructor-link"
                to="/teacherlogin"
              >
                Become Instructor
              </NavLink>
            }

            {
              isAuthenticated &&
              <NavLink
                onClick={() => setShowSidebar(false)}
                className="navbar-link"
                to={dashbordLink}
              >
                Dashboard
              </NavLink>
            }

          </div>

        </div>

        <div className="right">

          {
            !isAuthenticated ?

              <div className="navbar-auth">

                <Link
                  className="navbar-link login"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="register-link"
                  to="/register"
                >
                  <button className="register btn-primary-col">
                    Register
                  </button>
                </Link>

              </div>

              :

              <div className="navbar-auth">

                <Link
                  className="navbar-link login"
                  to="/logout"
                >
                  Logout
                </Link>

              </div>
          }

          {
            !showSidebar &&
            <div
              className="sidebar-btn"
              onClick={() => setShowSidebar(true)}
            >
              <i className="fa-solid fa-bars-staggered"></i>
            </div>
          }

        </div>

      </div>
    </nav>
  )
}

export default Navbar;