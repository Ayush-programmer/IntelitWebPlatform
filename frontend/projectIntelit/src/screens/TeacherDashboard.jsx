import { useState, useEffect } from 'react';
import axios from '../config/axios.js';
import { Menu, LogOut, Settings } from "lucide-react";
import { FiUser } from 'react-icons/fi';
import { IoMdMail } from 'react-icons/io';
import { FaBook } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { MdHome } from 'react-icons/md';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(false);

  const isProfileIncomplete = !teacher?.isProfileComplete;
  const profilePic = teacher?.profile.profilePic || 'dummy-profile.jpg';

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const res = await axios.get('/teachers/profile');
        setTeacher(res.data.teacher);
        console.log(teacher);

        if (res.data.teacher.createdCourses.length) {
          const coursesRes = await axios.get('/teachers/createdcourses');
          setCourses(coursesRes.data.courses);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);
  useEffect(() => {
    console.log(teacher?.isProfileComplete);
    setIsProfileComplete(teacher?.isProfileComplete);
  }, [teacher]);

  const handleDelete = async (courseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`/courses/${courseId}`);
      alert("Course deleted!");
      // Optional: refetch courses or remove it from state
    } catch (err) {
      console.error(err);
      alert("Failed to delete course.");
    }
  };

  if (loading) return <div className="teacher-loading">Loading...</div>;

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className={`left-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          {!isSidebarOpen && <Menu className="menu-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
          <a className="brand-logo" href="#">
            Intelit
          </a>
        </div>

        <nav className="sidebar-links">
          <a href="/" className='sidebar-link'><span className='nav-links-icon'><MdHome size={24} /></span>Home</a>
          <a href="/teacherdashboard" className="sidebar-link active"><span className="nav-links-icon"><MdDashboard size={23} /></span>Dashboard</a>
          <a href="/courses" className="sidebar-link"><span className="nav-links-icon"><FaBook size={23} /></span>Courses</a>
          <a href="/community" className="sidebar-link"><span className="nav-links-icon"><IoMdMail size={23} /></span>Community</a>
          <a href="/messages" className="sidebar-link"><span className="nav-links-icon"><FiUser size={23} /></span>Messages</a>
        </nav>

        <div className="sidebar-bottom">
          <a href="/settings" className="sidebar-link">
            <span className="nav-links-icon"><Settings size={20} /></span> Settings
          </a>
          <a href="/logout" className="sidebar-link">
            <span className="nav-links-icon"><LogOut size={20} /></span> Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="teacher-main-content">
        <header className="mobile-header">
          <button className="hamburger" onClick={() => setIsSidebarOpen(true)}>☰</button>
        </header>

        {/* Welcome Banner */}
        <section className="welcome-banner">
          <h1>Welcome back, {teacher?.profile?.fullName || teacher?.name}</h1>
          <p>Let's inspire the world with your knowledge!</p>
        </section>

        {/* Quick Stats */}
        <section className="quick-stats">
          <div className="stat-card">
            <h3>{courses.length}</h3>
            <p>Courses Created</p>
          </div>
          {/* Add more quick stats later if needed */}
        </section>

        {/* Created Courses */}
        <section className="courses-section">
          <h2>Your Created Courses</h2>

          <div className="courses-grid">
            {courses.length ? (
              courses.map((course) => (
                <div key={course._id} className="course-card">
                  <Link to={`/course/${course._id}`} className="thumbnail-link">
                    <img src={course.thumbnail} alt={course.title} />
                    <h4>{course.title}</h4>
                    <p>{course.category}</p>
                  </Link>

                  <div className="course-actions">
                    <Link to={`/editcourse/${course._id}`} className="course-link btn-edit">Edit</Link>
                    <button onClick={() => handleDelete(course._id)} className="course-link btn-delete">Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No courses created yet.</p>
            )}
          </div>
        </section>

        {/* Explore More (Optional motivational quote) */}
        <section className="explore-more">
          <p>"One child, one teacher, one book, one pen can change the world." – Malala</p>
        </section>
      </main>

      {/* Right Sidebar */}
      {/* <aside className="teacher-right-sidebar"> */}
      <aside className={`right-sidebar ${isRightSidebarVisible ? "show" : ""}`}>
        <div className='flex align-center'>
          <div className="greeting">
            <div className="profile-image">
              <img src={profilePic} alt="profile" />
            </div>
            <h3>Good Morning, {teacher?.profile.fullName?.split(' ')[0] || teacher?.fullName}!</h3>
          </div>
          <span className='down-btn'>
            {!isRightSidebarVisible ? (
              <FaChevronUp
                size={20}
                className="dropdown-icon"
                onClick={() => setIsRightSidebarVisible(true)}
              />
            ) : (
              <FaChevronDown
                size={20}
                className="dropdown-icon"
                onClick={() => setIsRightSidebarVisible(false)}
              />
            )}
          </span>
        </div>
        <p className='bio'><strong>Bio : </strong> {teacher.profile.bio}</p>

        {isProfileIncomplete && (
          <div className="complete-profile-card">
            <h4>Complete Your Profile</h4>
            <p>Complete your profile to unlock personalized recommendations and more.</p>
            <Link className="complete-profile-btn" to='/completeteacherprofile'>Complete Now</Link>
          </div>
        )}

        {/*  Note : Here I gave a condition to show the edit profile card only if the profile is complete and also i have given the classname same as complete-profile to avoid writing css for same button again and again */}
        {!isProfileIncomplete && (
          <div className="complete-profile-card">
            <h4>Edit Your Profile</h4>
            <Link className="complete-profile-btn" to='/updateteacherprofile'>Edit Profile</Link>
          </div>
        )}

        <div className="dummy-graph">
          <h4>Learning Progress</h4>
          <div className="graph-placeholder">
            {/* Dummy Graph */}
            <div className="bar bar1"></div>
            <div className="bar bar2"></div>
            <div className="bar bar3"></div>
            <div className="bar bar4"></div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default TeacherDashboard;