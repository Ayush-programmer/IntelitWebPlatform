import React, { useState } from 'react';
import { FaPlayCircle, FaChevronDown, FaLock } from 'react-icons/fa';

const CourseContents = ({ courseModules, setIndices }) => {
  const [openModule, setOpenModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState([null, null]); // [moduleIndex, lessonIndex]

  const toggleModule = (index) => {
    setOpenModule(openModule === index ? null : index);
  };

  const handleVideoChange = (moduleIndex, lessonIndex) => {
    setIndices([moduleIndex, lessonIndex]);
    setActiveLesson([moduleIndex, lessonIndex]); // Set active lesson
  };

  return (
    <div className="course-content">
      <h2>Course content</h2>
      {courseModules.map((module, index) => (
        <div key={index} className="module">
          <div className="module-header" onClick={() => toggleModule(index)}>
            <span>0{index + 1} : {module.moduleTitle}</span>
            <div className="icon">
              <FaChevronDown
                className={`chevron-icon ${openModule === index ? 'rotate' : ''}`}
              />
            </div>
          </div>
          {openModule === index && (
            <ul className="lesson-list">
              {module.lessons.map((lesson, i) => {
                const isActive = activeLesson[0] === index && activeLesson[1] === i;

                return (
                  <li
                    key={i}
                    className={`lesson ${isActive ? 'active-lesson' : ''}`}
                    onClick={() => handleVideoChange(index, i)}
                  >
                    <FaPlayCircle className="icon" />
                    <span>{lesson.lessonTitle}</span>
                    <div className="lesson-meta">
                      <span>{lesson.videoDuration}</span>
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
