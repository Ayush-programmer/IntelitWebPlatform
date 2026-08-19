import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../config/axios.js";

import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import CourseCardSkeleton from "../components/Loaders/CourseCardSkeleton";

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/courses/allcourses");
        setCourses(res.data.courses);
      } catch (err) {
        console.error(err);
        setError("Unable to load courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const displayedCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [courses, searchQuery]);

  return (
    <>
      <Navbar />

      <main className="browse-courses">
        {/* Hero */}

        <section className="browse-hero">
          <div className="container">
            <span className="browse-tag">Learn. Build. Grow.</span>

            <h1>Browse Our Courses</h1>

            <p>
              Discover practical, industry-focused courses designed to help you
              learn faster and build real-world skills.
            </p>

            <div className="course-search">
              <i className="fa-solid fa-magnifying-glass"></i>

              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Courses */}

        <section className="courses-section">
          <div className="courses-container">
            {loading ? (
              <>
                {/* Skeleton Cards Later */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              </>
            ) : error ? (
              <div className="courses-error">
                <h3>{error}</h3>
              </div>
            ) : displayedCourses.length === 0 ? (
              <div className="empty-courses">
                <i className="fa-solid fa-book-open"></i>

                <h3>No Courses Found</h3>

                <p>Try searching with another keyword.</p>
              </div>
            ) : (
              displayedCourses.map((course) => (
                <Link
                  key={course._id}
                  to={`/course/${course._id}`}
                  className="course-link"
                >
                  <article className="course-card">
                    <div className="course-image">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        loading="lazy"
                      />
                    </div>

                    <div className="course-details">
                      <div className="course-category">
                        {course.category || "General"}
                      </div>
                      <h3 className="course-title">{course.title}</h3>

                      <p className="course-author">
                        By{" "}
                        {course.teacher.profile?.fullName ||
                          course.teacher?.name}
                      </p>

                      <p className="course-description">{course.description}</p>

                      <div className="course-footer">
                        <div className="course-price">
                          ₹{course.price || "Free"}
                        </div>

                        <button className="btn-primary-col">View Course</button>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BrowseCourses;
