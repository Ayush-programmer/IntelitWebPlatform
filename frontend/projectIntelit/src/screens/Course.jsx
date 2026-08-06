import React, { use, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../config/axios.js'
import Sidebar from '../components/Sidebar.jsx';
import { UserContext } from '../context/user.context.jsx';
import CourseTabs from '../components/CourseTabs.jsx';
import CourseContents from '../components/CourseContents.jsx';
import { FaBars, FaTimes } from 'react-icons/fa'
import CoursePlayer from '../components/coursePlayer.jsx';
import toast from 'react-hot-toast';

const Course = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState({});
    const [indices, setIndices] = useState([0, 0]);
    const [url, setUrl] = useState('');
    const [studentEnrolled, setStudentEnrolled] = useState(false);
    const [courseLoading, setCourseLoading] = useState(true);
    const [totalLessons, setTotalLessons] = useState(0);
    const [duration, setDuration] = useState({
        hours: 0,
        minutes: 0
    });
    const [averageRating, setAverageRating] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(prev => !prev);
    };

    const { user, role, isLoading, fetchUserData } = useContext(UserContext);

    useEffect(() => {
        setCourseLoading(true);
        axios.get(`/courses/${courseId}`)
            .then((res) => {
                setCourse(res.data.course);
            })
            .catch((error) => {
                toast.error("Error loading course");
            })
        setCourseLoading(false);
    }, [courseId]);



    useEffect(() => {
        if (
            course?.courseContents?.[indices[0]] &&
            course.courseContents[indices[0]].lessons?.[indices[1]]
        ) {
            const videoUrl = course.courseContents[indices[0]].lessons[indices[1]].videoURL;
            setUrl(videoUrl);
        }
    }, [course, indices]);

    useEffect(() => {
        if (!course?.courseContents) return;

        const total = course.courseContents.reduce(
            (total, module) => total + module.lessons.length,
            0
        );

        setTotalLessons(total);


        const totalDurationInSeconds = course.courseContents.reduce(
            (total, module) =>
                total +
                module.lessons.reduce(
                    (sum, lesson) => sum + lesson.videoDuration,
                    0
                ),
            0
        );


        setDuration({
            hours: Math.floor(totalDurationInSeconds / 3600),
            minutes: Math.floor((totalDurationInSeconds % 3600) / 60)
        });


        if (course.reviews?.length > 0) {
            const rating =
                course.reviews.reduce(
                    (sum, review) => sum + review.rating,
                    0
                ) / course.reviews.length;

            setAverageRating(rating.toFixed(1));
        }

    }, [course]);

    useEffect(() => {
        if (!user) {
            fetchUserData();
        }
    }, [user, fetchUserData])

    useEffect(() => {
        if (course && user) {
            setStudentEnrolled(
                user?.enrolledCourses?.some(
                    (course) => course?._id?.toString() === courseId
                )
            );
            console.log(studentEnrolled);

        }
    }, [user, courseId]);

    if (isLoading && courseLoading && !user) {
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
                                <Link to='/browsecourses'><span>&nbsp;&nbsp;Courses</span>/</Link>
                                <Link to=''><span>{course.category}</span>/</Link>
                                <Link to=''><span>{course.title}</span></Link>
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
                                            <i className="fa-regular fa-circle-play"></i>
                                            <p className='dur-text'>{totalLessons} Lessons</p>
                                        </span>
                                        <span className="dur">
                                            <i className="fa-regular fa-clock"></i>
                                            <p className='dur-text'>{duration.hours}h {duration.minutes}min</p>
                                        </span>
                                        <span className="dur">
                                            <i className="fa-regular fa-star"></i>
                                            <p className='dur-text'>{averageRating
                                                ? `${averageRating} (${course.reviews.length})`
                                                : "No Reviews"}</p>
                                        </span>
                                    </div>
                                </div>
                                <div className="right">
                                    {/* Enroll button */}
                                    {
                                        role !== "teacher" && !studentEnrolled &&
                                        <Link to={`/enroll/${course._id}`} className="btn-primary-col enroll-btn">Enroll Now</Link>
                                    }
                                </div>
                            </div>
                        </div>
                        {/* Down bar containing video player and course description */}
                        <div className={`down-bar ${user ? "hide" : ""}`}>
                            <div className="video-div">
                                <div className="video">
                                    {/* Video player for course lessons */}
                                    <CoursePlayer
                                        videoUrl={url}
                                        onContextMenu={(e) => e.preventDefault()}
                                    />
                                </div>
                                <div className="course-desc-div">
                                    {/* Tabs for course description and additional details */}
                                    <CourseTabs user={user} course={course} studentEnrolled={studentEnrolled} />
                                </div>
                            </div>
                            <div className="content-div">
                                {/* Course contents and modules */}
                                {course.courseContents && <CourseContents courseModules={course.courseContents} setIndices={setIndices} user={user} studentEnrolled={studentEnrolled} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course