import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'

const Sidebar = ({ user }) => {
  return (
    <div className={`sidebar ${user ? "" : "hide"}`}>
      <div className="logo">
        <a className="brand-logo" href="/">
          Intelit
        </a>
      </div>
      <div className="profile">
        <img src={user.profile?.profilePic} alt="" className='profile-image' />
        <div className="user-name">{user?.profile.fullName?.split(' ')[0] || user?.username}</div>
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
        <div className="link coming-soon-link">
          <i className="fa-solid fa-message icon"></i>
          <span className="link-name">Join Chat</span>
          <span className="coming-soon-badge">Coming Soon</span>
        </div>
        <div className="link coming-soon-link">
          <i className="fa-solid fa-book icon"></i>
          <span className="link-name">Resources</span>
          <span className="coming-soon-badge">Coming Soon</span>
        </div>
        <div className="link logout-link">
          <a href="/logout" className="sidebar-link">
            <span className="nav-links-icon"><LogOut size={20} /></span> <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar