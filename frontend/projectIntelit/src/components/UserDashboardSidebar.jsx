// LeftSidebar.jsx
import { Menu, LogOut, Settings } from "lucide-react";
import { FiUsers } from 'react-icons/fi';
import { IoMdMail } from 'react-icons/io';
import { FaBook } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { X } from "lucide-react";
import { Home } from "lucide-react";

const UserDashboardSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <aside className={`left-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <a className="brand-logo" href="/">
          Intelit
        </a>
        {isSidebarOpen && <X className="close-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} size={23} />}
      </div>

      <nav className="sidebar-links">
        <a href="/" className="sidebar-link"><span className="nav-links-ico"><Home size={23} /></span>Home</a>
        <a href="/userdashboard" className="sidebar-link active"><span className="nav-links-icon"><MdDashboard size={23} /></span>Dashboard</a>
        <a href="/userdashboard" className="sidebar-link"><span className="nav-links-icon"><FaBook size={23} /></span>Courses</a>
        <div className="sidebar-link coming-soon-link">
          <span className="nav-links-icon"><IoMdMail size={23} /></span>
          Community
          <span className="coming-soon-badge">Coming Soon</span>
        </div>

        <div className="sidebar-link coming-soon-link">
          <span className="nav-links-icon"><FiUsers size={23} /></span>
          Messages
          <span className="coming-soon-badge">Coming Soon</span>
        </div>
      </nav>

      <div className="sidebar-bottom">
        {/* <a href="/settings" className="sidebar-link">
          <span className="nav-links-icon"><Settings size={20} /></span> Settings
        </a> */}
        <a href="/logout" className="sidebar-link">
          <span className="nav-links-icon"><LogOut size={20} /></span> Logout
        </a>
      </div>
    </aside>
  );
};

export default UserDashboardSidebar;