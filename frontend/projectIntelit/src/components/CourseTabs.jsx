import React, { useState } from 'react';
import { FaUser, FaQuestionCircle, FaBook, FaStar, FaInfoCircle, FaListUl, FaCheckCircle, FaUserCircle, FaChalkboardTeacher, FaChevronDown, FaChevronUp, FaLink } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

const CourseTabs = ({ course }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [openFAQ, setOpenFAQ] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="overview-section">
            <h2><FaInfoCircle /> Course Overview</h2>
            <p className="course-category"><MdCategory /> <strong>Category : </strong> &nbsp;{course.category}</p>
            <p className="course-desc">{course.description}</p>

            {course.topicsToLearn && course.topicsToLearn.length > 0 && (
              <div className="topics-list">
                <div><FaListUl /> What you'll learn:</div>
                <ul>
                  {course.topicsToLearn && course.topicsToLearn.map((topic, idx) => (
                    <li key={idx}><FaCheckCircle /> {topic}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case "author":
        return (
          <div className="author-section">
            <h2><FaUserCircle /> Instructor</h2>
            <div className="author-info">
              <div className="author-icon">
                <FaChalkboardTeacher />
              </div>
              <div className="author-details">
                <p><strong>Name:</strong> {course.teacher.name}</p>
                <p><strong>Email:</strong> <a href={`mailto:${course.teacher.email}`}>{course.teacher.email}</a></p>
              </div>
            </div>
          </div>
        );

      case "faq":
        return (
          <div className="faq-section">
            <h2><FaQuestionCircle className="faq-icon" /> Frequently Asked Questions</h2>
            {Array.isArray(course.faq) && course.faq.length > 0 ? (
              <div className="faq-list">
                {course.faq.map((item, index) => (
                  <div key={index} className={`faq-item ${openFAQ === index ? 'open' : ''}`}>
                    <div
                      className="faq-question"
                      onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    >
                      <span>Question : {item.question}?</span>
                      {openFAQ === index
                        ? <FaChevronUp className="chevron-icon" />
                        : <FaChevronDown className="chevron-icon" />}
                    </div>
                    {openFAQ === index && (
                      <div className="faq-answer">Answer : {item.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-faq">No FAQs available for this course.</p>
            )}
          </div>
        );

      case "references":
        return (
          <div className="references-section">
            <h3><FaBook /> Materials</h3>
            {course.materials && course.materials.length > 0 ? (
              <ul className="material-list">
                {course.materials.map((mat, index) => (
                  <li key={index} className="material-item">
                    <p>0{index + 1} . {mat.desc}</p>
                    <a href={mat.fileURL} target="_blank" rel="noopener noreferrer">
                      {mat.fileURL}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No materials available.</p>
            )}

            <h3><FaLink /> References</h3>
            {course.references && course.references.length > 0 ? (
              <ul className="reference-list">
                {course.references.map((ref, index) => (
                  <li key={index}>
                    <a href={ref} target="_blank" rel="noopener noreferrer">
                      {ref}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No references available.</p>
            )}
          </div>
        );

      case "reviews":
        return (
          <div className="review-section">
            <h3><FaStar color="#785cf4" /> Reviews</h3>
            {course.reviews && course.reviews.length > 0 ? (
              course.reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-header">
                    <FaUserCircle size={24} color="#785cf4" />
                    <span className="reviewer-name">{review.name || "Anonymous"}</span>
                  </div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        color={i < review.rating ? "#785cf4" : "#ccc"}
                        size={16}
                      />
                    ))}
                  </div>
                  {review.text && <p className="review-text">{review.text}</p>}
                </div>
              ))
            ) : (
              <p className="no-reviews">No reviews yet.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="tabs-wrapper">
      <div className="tabs">
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>
          <FaInfoCircle /> Overview
        </button>
        <button className={activeTab === "author" ? "active" : ""} onClick={() => setActiveTab("author")}>
          <FaUser /> Author
        </button>
        <button className={activeTab === "faq" ? "active" : ""} onClick={() => setActiveTab("faq")}>
          <FaQuestionCircle /> FAQ
        </button>
        <button className={activeTab === "references" ? "active" : ""} onClick={() => setActiveTab("references")}>
          <FaBook /> References
        </button>
        <button className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>
          <FaStar /> Reviews
        </button>
      </div>

      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default CourseTabs;
