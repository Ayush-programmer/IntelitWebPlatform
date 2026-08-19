import React, { use, useContext, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../config/axios.js'
import Sidebar from '../components/Sidebar.jsx';
import CourseTabs from '../components/CourseTabs.jsx';
import CourseContents from '../components/CourseContents.jsx';
import { FaBars, FaTimes } from 'react-icons/fa'
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth.js';
import CourseSkeleton from '../components/Loaders/CourseSkeleton.jsx';
import CoursePlayer from '../components/coursePlayer.jsx';

const Course = () => {
    const { user, role, isLoading, fetchProfile } = useAuth();

    const { courseId } = useParams();
    const [course, setCourse] = useState({});
    const [indices, setIndices] = useState([0, 0]);
    // const [url, setUrl] = useState('');
    const [studentEnrolled, setStudentEnrolled] = useState(false);
    const [courseLoading, setCourseLoading] = useState(true);
    const [totalLessons, setTotalLessons] = useState(0);
    const [duration, setDuration] = useState({
        hours: 0,
        minutes: 0
    });
    const [averageRating, setAverageRating] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    const [courseProgress, setCourseProgress] = useState(null);
    const [progressLoading, setprogressLoading] = useState(true);
    const [totalCourseProgress, setTotalCourseProgress] = useState(0);
    const [liveProgress, setLiveProgress] = useState({
        lessonId: null,
        watchedSeconds: 0,
        currentTime: 0,
        duration: 0
    });

    const [nextLessonState, setNextLessonState] = useState({
        show: false,
        countdown: 3,
        nextLesson: null,
        autoNavigate: true
    });

    const countdownIntervalRef = useRef(null);

    const latestProgressRef = useRef({
        lessonId: null,
        currentTime: 0,
        duration: 0,
        watchedSeconds: 0
    });

    const syncIntervalRef = useRef(null);
    const syncingRef = useRef(false);
    const lastSyncedProgressRef = useRef({
        lessonId: null,
        watchedSeconds: 0
    });

    const coursePlayerRef = useRef(null);

    const hasResumedInitialLessonRef = useRef(false);

    const toggleSidebar = () => {
        setShowSidebar(prev => !prev);
    };

    useEffect(() => {
        const fetchCourse = async () => {
            setCourseLoading(true);
            try {
                const res = await axios.get(`/courses/${courseId}`);
                setCourse(res.data.course);

                // const enrolled = user?.enrolledCourses?.some(
                //     enrolledCourse =>
                //         enrolledCourse =>
                //             enrolledCourse?.toString() === courseId
                // );

                const enrolled = user?.enrolledCourses?.some(
                    enrolledCourse =>
                        enrolledCourse?._id?.toString() === courseId
                );
                setStudentEnrolled(enrolled);

                if (enrolled) {
                    setprogressLoading(true);
                    const progressRes = await axios.get(`/course-progress/${courseId}`);
                    setCourseProgress(progressRes.data.courseProgress);
                } else {
                    setCourseProgress(null);
                }
            } catch (error) {
                console.error(error);
                toast.error("Error loading course");
            } finally {
                setCourseLoading(false);
                setprogressLoading(false);
            }
        };

        if (courseId) {
            fetchCourse();
        }
    }, [courseId, user]);

    // useEffect(() => {
    //     if (
    //         course?.courseContents?.[indices[0]] &&
    //         course.courseContents[indices[0]].lessons?.[indices[1]]
    //     ) {
    //         const videoUrl = course.courseContents[indices[0]].lessons[indices[1]].videoURL;
    //         setUrl(videoUrl);
    //     }
    // }, [course, indices]);

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

    const getLessonProgress = (lessonId) => {
        const lessonProgress = courseProgress?.lessons?.find(
            lesson => lesson.lessonId?.toString() === lessonId?.toString()
        );
        return lessonProgress || {
            progress: 0,
            watchedSeconds: 0,
            completed: false
        };
    }

    const getDisplayedLessonProgress = (lessonId) => {
        const backendProgress = getLessonProgress(lessonId);

        const isCurrentLesson =
            liveProgress?.lessonId?.toString() ===
            lessonId?.toString();

        if (!isCurrentLesson) {
            return backendProgress;
        }

        return {
            ...backendProgress,
            watchedSeconds: liveProgress.watchedSeconds,
            progress:
                liveProgress.duration > 0
                    ? Math.floor(
                        (liveProgress.watchedSeconds /
                            liveProgress.duration) * 100
                    )
                    : 0
        };
    };

    const getModuleProgress = (module) => {
        if (!module?.lessons?.length) {
            return 0;
        }
        const totalProgress = module.lessons.reduce((sum, lesson) => {
            return sum + getDisplayedLessonProgress(lesson._id).progress;
        }, 0);
        return Math.round(totalProgress / module.lessons.length);
    }

    const getTotalCourseProgress = () => {
        if (!course?.courseContents?.length) {
            return 0;
        }
        let totalProgress = 0, totalLessons = 0;

        course.courseContents.forEach(module => {
            module.lessons.forEach(lesson => {
                totalProgress += getDisplayedLessonProgress(
                    lesson._id
                ).progress;

                totalLessons++;
            });
        });

        if (!totalLessons) {
            return 0;
        }

        return Math.round(totalProgress / totalLessons);
    }

    useEffect(() => {
        if (
            !course?.courseContents?.length ||
            !courseProgress?.lessons?.length
        ) {
            setTotalCourseProgress(0);
            return;
        }

        const progress = getTotalCourseProgress();

        setTotalCourseProgress(progress);
    }, [course, courseProgress]);

    const getResumeLesson = () => {
        if (!courseProgress?.lessons?.length) {
            return null;
        }

        const incompleteLessons = courseProgress.lessons
            .filter(lesson => !lesson.completed && lesson.lastWatchedAt)
            .sort((a, b) =>
                new Date(b.lastWatchedAt) - new Date(a.lastWatchedAt));

        return incompleteLessons[0] || null;
    }

    const findToBeResumeLessonIndices = (lessonId) => {
        for (let moduleIndex = 0; moduleIndex < course.courseContents.length; moduleIndex++) {
            const lessons = course.courseContents[moduleIndex].lessons;
            for (let lessonIndex = 0; lessonIndex < lessons.length; lessonIndex++) {
                if (lessons[lessonIndex]._id.toString() === lessonId.toString()) {
                    return [moduleIndex, lessonIndex];
                }
            }
        }
    }

    useEffect(() => {
        if (hasResumedInitialLessonRef.current || !course?.courseContents?.length || !courseProgress?.lessons?.length) {
            return;
        }

        hasResumedInitialLessonRef.current = true;

        const resumeLesson = getResumeLesson();

        if (!resumeLesson) {
            setIndices([0, 0]);
            return;
        }

        const lessonIndices = findToBeResumeLessonIndices(resumeLesson.lessonId);
        if (lessonIndices) {
            setIndices(lessonIndices);
        }
    }, [course, courseProgress]);

    const currentLesson =
        course?.courseContents?.[indices[0]]?.lessons?.[indices[1]];

    const currentVideoUrl = currentLesson?.videoURL || '';

    const currentLessonId = currentLesson?._id;

    const currentLessonProgress = currentLessonId
        ? getLessonProgress(currentLessonId)
        : null;

    const shouldWaitForProgress =
        studentEnrolled && progressLoading;

    // Course Progress Backend Sync Logic
    const syncProgress = async () => {
        console.log("💾 SYNC PROGRESS");

        const progress = latestProgressRef.current;
        if (!progress.lessonId) {
            return;
        }

        console.log("latestProgressRef", latestProgressRef.current, "progress.lessonId", progress.lessonId);

        console.log("lastSyncedProgressRef.current", lastSyncedProgressRef.current, "progress.watchedSeconds", progress.watchedSeconds);


        // Not sending the same progress repeatedly
        if (latestProgressRef.current.lessonId === progress.lessonId && lastSyncedProgressRef.current.watchedSeconds === progress.watchedSeconds) {
            console.log("same returning");
            return;
        }

        console.log(syncingRef.current);

        if (syncingRef.current) {
            console.log("syncingRef calle");

            return;
        }
        syncingRef.current = true;

        try {
            console.log("Calling patch");

            const res = await axios.patch(`course-progress/${courseId}/lessons/${progress.lessonId}`, {
                watchedSeconds: progress.watchedSeconds,
                duration: progress.duration
            });
            setCourseProgress(res.data.updatedProgress);

            lastSyncedProgressRef.current = {
                lessonId: progress.lessonId,
                watchedSeconds: progress.watchedSeconds
            };

            return res.data.updatedProgress;
        } catch (error) {
            console.error("Progress sync failed", error);
            return null;
        } finally {
            syncingRef.current = false;
        }
    }

    const stopProgressSync = () => {
        if (syncIntervalRef.current) {
            clearInterval(syncIntervalRef.current);
            syncIntervalRef.current = null;
        }
    }

    const startProgressSync = () => {
        stopProgressSync();

        syncIntervalRef.current = setInterval(() => {
            syncProgress();
        }, 5000);
    }

    // Handle lesson switching

    useEffect(() => {
        stopProgressSync();

        latestProgressRef.current = {
            lessonId: currentLessonId,
            currentTime: currentLessonProgress?.watchedSeconds ?? 0,
            duration: currentLesson?.videoDuration ?? 0,
            watchedSeconds: currentLessonProgress?.watchedSeconds ?? 0
        };

        lastSyncedProgressRef.current = {
            lessonId: currentLessonId,
            watchedSeconds: currentLessonProgress?.watchedSeconds ?? 0
        };
    }, [currentLessonId]);

    // Now courseProgress can update 100 times and this effect won't move the current lesson again.
    // useEffect(() => {
    //     if (hasResumedInitialLessonRef.current || !course?.courseContents?.length || !courseProgress?.lessons?.length) {
    //         return;
    //     }

    //     hasResumedInitialLessonRef.current = true;

    //     const resumeLesson = getResumeLesson();
    //     if (!resumeLesson) {
    //         setIndices([0, 0]);
    //         return;
    //     }

    //     const lessonIndices = findToBeResumeLessonIndices(resumeLesson.lessonId);

    //     if (lessonIndices) {
    //         setIndices(lessonIndices);
    //     }
    // }, [course, courseProgress]);

    // Making next play lesson logic

    const getNextLesson = () => {
        const allLessons =
            course?.courseContents?.flatMap(module => module.lessons) || [];

        const currentIndex = allLessons.findIndex(
            lesson => lesson._id.toString() === currentLessonId?.toString()
        );

        if (currentIndex === -1) {
            return null;
        }

        return allLessons[currentIndex + 1] || null;
    };

    const stopCountdown = () => {
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }
    };

    const playNextLesson = (lesson) => {
        if (!lesson) return;

        stopCountdown();

        const newIndices = findToBeResumeLessonIndices(lesson._id);

        if (newIndices) {
            setNextLessonState({
                show: false,
                countdown: 3,
                nextLesson: null,
                autoNavigate: false
            });

            setIndices(newIndices);
        }
    };

    const startNextLessonCountdown = (nextLesson) => {
        if (!nextLesson) return;

        stopCountdown();

        setNextLessonState({
            show: true,
            countdown: 3,
            nextLesson,
            autoNavigate: true
        });

        let count = 3;

        countdownIntervalRef.current = setInterval(() => {
            count -= 1;

            if (count <= 0) {
                stopCountdown();
                playNextLesson(nextLesson);
                return;
            }

            setNextLessonState(prev => ({
                ...prev,
                countdown: count
            }));
        }, 1000);
    };

    const replayLesson = () => {
        stopCountdown();

        setNextLessonState(prev => ({
            show: false,
            countdown: 3,
            nextLesson: null,
            autoNavigate: false
        }));
        coursePlayerRef.current?.replay();
    };

    const cancelNextLesson = () => {
        stopCountdown();

        setNextLessonState(prev => ({
            ...prev,
            show: false,
            autoNavigate: false
        }));
    };

    useEffect(() => {
        return () => {
            stopCountdown();
        };
    }, []);

    if (isLoading || courseLoading || shouldWaitForProgress) {
        return (
            <CourseSkeleton
                showSidebar={isLoading ? null : Boolean(user)}
            />
        );
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
                                    {role !== "teacher" && !studentEnrolled ? (
                                        <Link
                                            to={`/enroll/${course._id}`}
                                            className="btn-primary-col enroll-btn"
                                        >
                                            Enroll Now
                                        </Link>
                                    ) : (
                                        studentEnrolled && (
                                            <div className="course-progress-card">
                                                <div className="course-progress-info">
                                                    <span className="course-progress-label">
                                                        Course Progress
                                                    </span>

                                                    <span className="course-progress-percentage">
                                                        {totalCourseProgress}%
                                                    </span>
                                                </div>

                                                <div className="course-progress-track">
                                                    <div
                                                        className="course-progress-fill"
                                                        style={{
                                                            width: `${totalCourseProgress}%`
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Down bar containing video player and course description */}
                        <div className={`down-bar ${user ? "hide" : ""}`}>
                            <div className="video-div">
                                <div className="video">
                                    {nextLessonState.show && (
                                        <div className="next-lesson-overlay">
                                            <h3>Lesson completed ✓</h3>

                                            <p>
                                                Next lesson in {nextLessonState.countdown}...
                                            </p>

                                            <div className="lesson-actions">

                                                <button
                                                    onClick={() =>
                                                        playNextLesson(nextLessonState.nextLesson)
                                                    }
                                                >
                                                    ▶ Next Lesson
                                                </button>

                                                <button onClick={replayLesson}>
                                                    ↻ Replay Lesson
                                                </button>

                                                {nextLessonState.autoNavigate && (
                                                    <button onClick={cancelNextLesson}>
                                                        Cancel
                                                    </button>
                                                )}

                                            </div>
                                        </div>
                                    )}
                                    {/* Video player for course lessons */
                                    }
                                    <CoursePlayer
                                        videoUrl={currentVideoUrl}
                                        ref={coursePlayerRef}
                                        initialWatchedSeconds={currentLessonProgress?.watchedSeconds ?? 0}
                                        onProgress={(progress) => {
                                            const backendProgress = getLessonProgress(currentLessonId);

                                            const watchedSeconds = backendProgress.completed
                                                ? backendProgress.watchedSeconds
                                                : progress.watchedSeconds;

                                            latestProgressRef.current = {
                                                lessonId: currentLessonId,
                                                ...progress,
                                                watchedSeconds
                                            };

                                            setLiveProgress({
                                                lessonId: currentLessonId,
                                                ...progress,
                                                watchedSeconds
                                            });
                                        }}
                                        onPlay={() => {
                                            startProgressSync();
                                        }}
                                        onPause={() => {
                                            stopProgressSync();

                                            // save the latest progress once when pausing
                                            syncProgress();
                                        }}

                                        // onEnded={() => {
                                        //     stopProgressSync();

                                        //     // final progress was already placed into latestprogressref by courseplayer
                                        //     syncProgress();

                                        //     // setting next lesson 
                                        //     const nextLesson = getNextIncompleteLesson();

                                        //     console.log(nextLesson);

                                        //     const newIndices = findToBeResumeLessonIndices(nextLesson?._id);

                                        //     setIndices(newIndices);
                                        // }}

                                        onEnded={async () => {
                                            stopProgressSync();

                                            await syncProgress();

                                            const nextLesson = getNextLesson();

                                            if (nextLesson) {
                                                startNextLessonCountdown(nextLesson);
                                            }
                                        }}
                                    />
                                </div>
                                <div className="course-desc-div">
                                    {/* Tabs for course description and additional details */}
                                    <CourseTabs user={user} course={course} studentEnrolled={studentEnrolled} />
                                </div>
                            </div>
                            <div className="content-div">
                                {/* Course contents and modules */}
                                {course.courseContents && <CourseContents courseModules={course.courseContents} indices={indices} setIndices={setIndices} user={user} studentEnrolled={studentEnrolled} getLessonProgress={getLessonProgress} getModuleProgress={getModuleProgress} liveProgress={liveProgress}
                                />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Course