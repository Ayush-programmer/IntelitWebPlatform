import React, { useEffect, useState } from 'react';
import {
  FaPlay,
  FaPause,
  FaCheck,
  FaChevronDown,
  FaLock
} from 'react-icons/fa';

const LessonProgressIcon = ({ progress }) => {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const safeProgress = Math.min(100, Math.max(0, progress || 0));
  const offset = circumference - (safeProgress / 100) * circumference;

  return (
    <div className="lesson-progress-icon">
      <svg className="lesson-progress-ring" width="30" height="30" viewBox="0 0 30 30">
        <circle className="progress-ring-bg" cx="15" cy="15" r={radius} />
        <circle
          className="progress-ring-fill"
          cx="15"
          cy="15"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <FaPause className="lesson-pause-icon" />
    </div>
  );
};

const CourseContents = ({
  courseModules,
  indices,
  setIndices,
  user,
  studentEnrolled,
  getLessonProgress,
  getModuleProgress,
  liveProgress
}) => {
  const [openModule, setOpenModule] = useState(null);

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  useEffect(() => {
    if (indices?.[0] !== undefined && indices?.[0] !== null) {
      setOpenModule(indices[0]);
    }
  }, [indices]);

  const formatToMinSec = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    let result = "";
    if (minutes > 0) result += `${minutes}m `;
    result += `${seconds}s`;

    return result.trim();
  };

  const getModuleDuration = (module) => {
    const totalSeconds = module.lessons.reduce(
      (sum, lesson) => sum + (Number(lesson.videoDuration) || 0),
      0
    );

    return formatToMinSec(totalSeconds);
  };

  const handleVideoChange = (moduleIndex, lessonIndex) => {
    if (!studentEnrolled) return;
    setIndices([moduleIndex, lessonIndex]);
  };

  return (
    <div className="course-content">
      <h2>Course content</h2>

      {courseModules.map((module, index) => {
        const moduleProgress = studentEnrolled ? getModuleProgress(module) : 0;

        return (
          <div key={index} className="module">
            <div className="module-header" onClick={() => toggleModule(index)}>
              <div className="module-header-main">
                <span className="module-title">
                  0{index + 1} : {module.moduleTitle}
                </span>
                <span className="module-duration">
                  {getModuleDuration(module)}
                </span>
              </div>

              <div className="module-header-right">
                <div className="module-chevron">
                  <FaChevronDown
                    className={`chevron-icon ${openModule === index ? "rotate" : ""}`}
                  />
                </div>
              </div>
            </div>

            {studentEnrolled && (
              <div className="module-progress-container">
                <div className="module-progress-track">
                  <div
                    className="module-progress-fill"
                    style={{ width: `${moduleProgress}%` }}
                  />
                </div>
              </div>
            )}

            {openModule === index && (
              <ul className="lesson-list">
                {module.lessons.map((lesson, i) => {
                  const isActive = indices[0] === index && indices[1] === i;
                  const backendProgress = getLessonProgress(lesson._id);

                  const isCurrentLesson =
                    liveProgress?.lessonId?.toString() === lesson._id?.toString();

                  const lessonProgress = isCurrentLesson
                    ? {
                      ...backendProgress,
                      watchedSeconds: liveProgress.watchedSeconds,
                      progress:
                        liveProgress.duration > 0
                          ? Math.floor(
                            (liveProgress.watchedSeconds / liveProgress.duration) * 100
                          )
                          : 0
                    }
                    : backendProgress;

                  const isCompleted = lessonProgress.completed;
                  const isStarted = !isCompleted && lessonProgress.watchedSeconds > 0;
                  const isLocked = !studentEnrolled && (index !== 0 || i !== 0);

                  return (
                    <li
                      key={i}
                      className={`lesson ${isActive ? "active-lesson" : ""} ${isLocked ? "locked" : ""
                        }`}
                      onClick={() => handleVideoChange(index, i)}
                      style={{
                        cursor:
                          studentEnrolled || (i === 0 && index === 0)
                            ? "pointer"
                            : "not-allowed",
                        opacity:
                          studentEnrolled || (i === 0 && index === 0) ? 1 : 0.6
                      }}
                    >
                      <div className="lesson-state-icon">
                        {isLocked ? (
                          <FaLock className="icon" />
                        ) : isCompleted ? (
                          <FaCheck className="icon lesson-completed-icon" />
                        ) : isStarted ? (
                          <LessonProgressIcon progress={lessonProgress.progress} />
                        ) : (
                          <FaPlay className="icon lesson-play-icon" />
                        )}
                      </div>

                      <span className="lesson-title">{lesson.lessonTitle}</span>

                      <div className="lesson-meta">
                        <span>{formatToMinSec(lesson.videoDuration)}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContents;