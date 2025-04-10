import React, { useState } from 'react';
import { FaPlayCircle, FaChevronDown, FaLock } from 'react-icons/fa';

const CourseContents = ({ courseModules, setIndices, user, courseId }) => {
  const [openModule, setOpenModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState([null, null]); // [moduleIndex, lessonIndex]
  console.log(user);
  console.log(courseId);

  const studentEnrolled = user?.enrolledCourses
    ?.flat()
    ?.some(id => id.toString() === courseId);


  console.log("Student enrolled:", studentEnrolled);


  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  const formatToMinSec = (durationInSeconds) => {
    console.log("Duration in seconds:", durationInSeconds);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    let result = "";
    if (minutes > 0) result += `${minutes}m `;
    result += `${seconds}s`;
    return result.trim();
  };

  const handleVideoChange = (moduleIndex, lessonIndex) => {
    if (!studentEnrolled) return; // 🔒 Block access if not enrolled
    setIndices([moduleIndex, lessonIndex]);
    setActiveLesson([moduleIndex, lessonIndex]);
  };

  return (
    <div className="course-content">
      <h2>Course content</h2>
      {courseModules.map((module, index) => (
        <div key={index} className="module">
          <div className="module-header" onClick={() => toggleModule(index)}>
            <span>0{index + 1} : {module.moduleTitle}</span>
            <div className="icon">
              <FaChevronDown className={`chevron-icon ${openModule === index ? 'rotate' : ''}`} />
            </div>
          </div>
          {openModule === index && (
            <ul className="lesson-list">
              {module.lessons.map((lesson, i) => {
                const isActive = activeLesson[0] === index && activeLesson[1] === i;

                return (
                  <li
                    key={i}
                    className={`lesson ${isActive ? 'active-lesson' : ''} ${!studentEnrolled && (i != 0 && index != 0) ? 'locked' : ''}`}
                    onClick={() => handleVideoChange(index, i)}
                    style={{ cursor: studentEnrolled || (i == 0 && index == 0) ? 'pointer' : 'not-allowed', opacity: studentEnrolled || (i == 0 && index == 0) ? 1 : 0.6 }}
                  >
                    {!studentEnrolled && (index != 0 || i != 0) ? (
                      <FaLock className="icon" />
                    ) : (
                      <FaPlayCircle className="icon" />
                    )}
                    <span>{lesson.lessonTitle}</span>
                    <div className="lesson-meta">
                      <span>{formatToMinSec(lesson.videoDuration)}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseContents;