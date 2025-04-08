import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = ({ user }) => {
  return (
    <div className={`sidebar ${user ? "" : "hide"}`}>
      <div className="logo">
        <a className="brand-logo" href="#">
          Intelit
        </a>
      </div>
      <div className="profile">
        <img src="allison-griffith-Q76DPRQ3Ix0-unsplash.jpg" alt="" className='profile-image' />
        <div className="user-name">Scott M.</div>
      </div>
      <div className="sidebar-links">
        <div className="link">
          <i className="fa-solid fa-house icon"></i>
          <Link to="/" className='link-name'>Home</Link>
        </div>
        <div className="link">
          <i class="fa-solid fa-chart-simple icon"></i>
          <Link to="/userdashboard" className='link-name'>Dashboard</Link>
        </div>
        <div className="link">
          <i className="fa-solid fa-user-graduate icon"></i>
          <Link to="/userdashboard" className='link-name'>My Courses</Link>
        </div>
        <div className="link">
          <i class="fa-solid fa-message icon"></i>
          <Link to="/userdashboard" className='link-name'>Join Chat</Link>
        </div>
        <div className="link">
          <i className="fa-solid fa-book icon"></i>
          <Link to="/userdashboard" className='link-name'>Resources</Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar