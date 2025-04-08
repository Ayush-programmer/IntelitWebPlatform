import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../config/axios.js'
import Sidebar from '../components/Sidebar.jsx';
import { UserContext } from '../context/user.context.jsx';
import ReactPlayer from 'react-player'
import CourseTabs from '../components/CourseTabs.jsx';
import CourseContents from '../components/CourseContents.jsx';
import { FaBars, FaTimes } from 'react-icons/fa'

const Course = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState({});
    const [indices, setIndices] = useState([0, 0]);
    const [url, setUrl] = useState('');
    const [studentEnrolled, setStudentEnrolled] = useState(false);

    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(prev => !prev);
    };


    const { user, isLoading, fetchUserData } = useContext(UserContext);

    useEffect(() => {
        axios.get(`/courses/${courseId}`)
            .then((res) => {
                console.log(res.data);
                console.log(res.data.course);
                setCourse(res.data.course);
            })
            .catch((error) => {
                console.log("Error fetching course", error);
            })
    }, [courseId])

    useEffect(() => {
        if (
            course?.courseContents?.[indices[0]] &&
            course.courseContents[indices[0]].lessons?.[indices[1]]
        ) {
            const videoUrl = course.courseContents[indices[0]].lessons[indices[1]].videoURL;
            setUrl(videoUrl);
            console.log("Video URL:", videoUrl);
        }
    }, [course, indices]);


    useEffect(() => {
        if (!user) {
            fetchUserData();
        }
        if (user) {
            setStudentEnrolled(user.enrolledCourses.includes(courseId));
        }
    }, [user, fetchUserData])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        // Main container for the course page
        <div className='coursePageContainer'>
            <div className="responsive-sidebar-container">
                <div className="flexdiv">

                    {showSidebar && <div className="overlay" onClick={toggleSidebar} />}
                    {/* Mobile Menu Button */}
                    {user && <div className="mobile-menu-toggle" onClick={toggleSidebar}>
                        {showSidebar ? (
                            <FaTimes size={24} />
                        ) : (
                            <FaBars size={24} />
                        )}
                    </div>}

                    {/* Sidebar */}
                    <div className={`sidebar-div ${showSidebar ? "show" : ""} ${user ? "" : "hide"}`}>
                        {user && <Sidebar user={user} />}
                    </div>


                    {/* Main course content section */}
                    <div className="course-div">
                        {/* Top bar displaying course navigation and details */}
                        <div className='top-bar'>
                            <div className="up-div">
                                <i className="fa-solid fa-user-graduate icon"></i>
                                <span>&nbsp;&nbsp;Courses&nbsp; /&nbsp; </span>
                                <span>{course.category}&nbsp; /&nbsp; </span>
                                <span>{course.title}</span>
                            </div>
                            <div className="down-div">
                                <div className="left">
                                    <div className="up">
                                        {/* Course title and category */}
                                        <span className="course-title">{course.title}</span>
                                        <span className="course-category">{course.category}</span>
                                    </div>
                                    <div className="down">
                                        {/* Course details: number of lessons, duration, and rating */}
                                        <span className="dur">
                                            <i class="fa-regular fa-circle-play"></i>
                                            <p className='dur-text'>38 lessons</p>
                                        </span>
                                        <span className="dur">
                                            <i class="fa-regular fa-clock"></i>
                                            <p className='dur-text'>4h 30min</p>
                                        </span>
                                        <span className="dur">
                                            <i class="fa-regular fa-star"></i>
                                            <p className='dur-text'>4.5(123 reviews)</p>
                                        </span>
                                    </div>
                                </div>
                                <div className="right">
                                    {/* Enroll button */}
                                    {
                                        studentEnrolled ?
                                            <Link to={`/enroll/${course._id}`} className="btn-primary-col enroll-btn">Enroll Now</Link> : ''
                                    }
                                </div>
                            </div>
                        </div>
                        {/* Down bar containing video player and course description */}
                        <div className={`down-bar ${user ? "hide" : ""}`}>
                            <div className="video-div">
                                <div className="video">
                                    {/* Video player for course lessons */}
                                    <ReactPlayer url={url} controls={true} width="100%" height="100%" />
                                </div>
                                <div className="course-desc-div">
                                    {/* Tabs for course description and additional details */}
                                    <CourseTabs course={course} />
                                </div>
                            </div>
                            <div className="content-div">
                                {/* Course contents and modules */}
                                {course.courseContents && <CourseContents courseModules={course.courseContents} setIndices={setIndices} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course