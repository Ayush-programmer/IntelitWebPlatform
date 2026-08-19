import { useState, useEffect } from 'react';
import axios from '../config/axios.js';
import { Menu, LogOut, Settings } from "lucide-react";
import { FiUser } from 'react-icons/fi';
import { IoMdMail } from 'react-icons/io';
import { FaBook, FaChalkboardTeacher } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { MdHome } from 'react-icons/md';
import { X } from "lucide-react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Swal from "sweetalert2";
import DashboardSkeleton from "../components/Loaders/DashboardSkeleton";

const TeacherDashboard = () => {
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(false);

  const isProfileIncomplete = !teacher?.isProfileComplete;

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setDashboardLoading(true);

        const [profileRes, coursesRes] = await Promise.all([
          axios.get("/teachers/profile"),
          axios.get("/teachers/createdcourses")
        ]);

        console.log("Hello", profileRes, coursesRes);


        setTeacher(profileRes.data.teacher);
        setCourses(coursesRes.data.courses);



      } catch (error) {
        toast.error("Failed to load dashboard");
      } finally {
        setDashboardLoading(false);
      }
    };

    loadDashboard();
  }, []);

  useEffect(() => {
    console.log(teacher?.isProfileComplete);
    setIsProfileComplete(teacher?.isProfileComplete);
  }, [teacher]);

  const deleteCourse = async (courseId) => {
    try {
      await axios.delete(`/courses/delete/${courseId}`);
      toast.success("Course deleted successfully."); setCourses(prev =>
        prev.filter(course => course._id !== courseId)
      );
    } catch (err) {
      toast.error("Failed to delete course.");
    }
  };

  const handleDelete = async (courseId) => {
    // const confirmDelete = window.confirm("Are you sure you want to delete this course?");
    // if (!confirmDelete) return;

    const result = await Swal.fire({
      title: "Delete this course?",
      html: `
    <p style="margin:0;color:#6b7280;">
      This will permanently remove the course, including all lessons, videos,
      and associated resources. This action cannot be reversed.
    </p>
  `,
      icon: "warning",
      showCancelButton: true,

      confirmButtonText: "Delete Course",
      cancelButtonText: "Keep Course",

      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#8b75ed",

      reverseButtons: true,
      focusCancel: true,

      allowOutsideClick: false,
      allowEscapeKey: true,

      width: 500,
      padding: "2rem",

      buttonsStyling: true,

      showClass: {
        popup: "animate__animated animate__zoomIn",
      },
      hideClass: {
        popup: "animate__animated animate__zoomOut",
      },
    });

    if (result.isConfirmed) {
      await deleteCourse(courseId);
      Swal.fire({
        icon: "success",
        title: "Course Deleted",
        text: "The course has been permanently removed.",
        confirmButtonColor: "#8b75ed",
        timer: 1800,
        showConfirmButton: false,
      });
    }
  };

  if (dashboardLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className={`left-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <a className="brand-logo" href="#">
            Intelit
          </a>
          {!isSidebarOpen && <Menu className="menu-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />}
          {isSidebarOpen && <X className="close-icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} size={23} />}
        </div>

        <nav className="sidebar-links">
          <a href="/" className="sidebar-link">
            <span className="nav-links-icon"><MdHome size={24} /></span>
            Home
          </a>

          <a href="/teacherdashboard" className="sidebar-link active">
            <span className="nav-links-icon"><MdDashboard size={23} /></span>
            Dashboard
          </a>

          <a href="/teacherdashboard" className="sidebar-link">
            <span className="nav-links-icon"><FaBook size={23} /></span>
            Courses
          </a>

          <div className="sidebar-link coming-soon-link">
            <span className="nav-links-icon"><IoMdMail size={23} /></span>
            Community
            <span className="coming-soon-badge">Coming Soon</span>
          </div>

          <div className="sidebar-link coming-soon-link">
            <span className="nav-links-icon"><FiUser size={23} /></span>
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

          <div className="courses-header">
            <h2>Your Created Courses</h2>
            <Link to="/uploadcourse" className="create-course-btn">+ Create Course</Link>
          </div>

          <div className="courses-grid">
            {courses.length ? (
              courses.map((course) => (
                <div key={course._id} className="course-card">
                  <Link to={`/course/${course._id}`} className="thumbnail-link">
                    <img src={course.thumbnail} alt={course.title} />
                    <div className="course-info">
                      <h4>{course.title}</h4>
                      <p>{course.category}</p>
                    </div>
                  </Link>

                  <div className="course-actions">
                    <Link to={`/editcourse/${course._id}`} className="course-link btn-edit">Edit</Link>
                    <button onClick={() => handleDelete(course._id)} className="course-link btn-delete">Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-course-state">
                <p>No courses created yet.</p>
              </div>
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

        {/* Sticky Header */}
        <div className="right-sidebar-header">

          <div className="greeting">

            <div className="profile-image">
              <img src={teacher?.profile?.profilePic || "./images/dummy-profile.jpg"}
                alt="profile" />
            </div>

            <h3>
              Good Morning,{" "}
              {teacher?.profile.fullName?.split(" ")[0] || teacher?.fullName}!
            </h3>

          </div>

          <button
            className="sidebar-toggle-btn"
            onClick={() =>
              setIsRightSidebarVisible(!isRightSidebarVisible)
            }
          >
            {isRightSidebarVisible ? (
              <FaChevronDown className="dropdown-icon" size={20} />
            ) : (
              <FaChevronUp className="dropdown-icon" size={20} />
            )}
          </button>

        </div>

        {/* Scrollable Content */}
        <div className="right-sidebar-content">

          {isProfileComplete && <p className="bio">
            <strong>Bio :</strong> {teacher.profile.bio}
          </p>
          }
          {isProfileIncomplete ? (
            <div className="complete-profile-card">
              <h4>Complete Your Profile</h4>
              <p>
                Complete your profile to unlock personalized
                recommendations and more.
              </p>

              <Link
                className="complete-profile-btn"
                to="/completeteacherprofile"
              >
                Complete Now
              </Link>
            </div>
          ) : (
            <div className="complete-profile-card">
              <h4>Edit Your Profile</h4>

              <Link
                className="complete-profile-btn"
                to="/updateteacherprofile"
              >
                Edit Profile
              </Link>
            </div>
          )}

        </div>

      </aside>
    </div>
  );
};

export default TeacherDashboard;