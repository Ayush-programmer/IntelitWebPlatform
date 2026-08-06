import { Link } from "react-router-dom";

// MainContent.jsx
const MainContent = ({ user, courses }) => {
  return (
    <main className="main-content">
      <section className="welcome-banner">
        <h2>Welcome back, {user?.username}!</h2>
        <p>Let's continue learning and growing.</p>
      </section>

      <section className="your-courses">
        <h3>Your Enrolled Courses</h3>
        <div className="courses-grid">
          {courses.length ? (
            courses.map((course) => (
              <Link key={course._id} to={`/course/${course._id}`} className="course-card">
                {/* <div className="course-card" key={course._id}> */}
                  <img src={course.thumbnail} alt={course.title} className="course-thumbnail" />
                  <div className="course-info">
                    <h4>{course.title}</h4>
                    <p>{course.category}</p>
                  </div>
                {/* </div> */}
              </Link>
            ))
          ) : (
            <p className="no-courses">You haven't enrolled in any courses yet.</p>
          )}
        </div>
      </section>

      <section className="extras-section">
        <h3>Continue Your Journey</h3>

        <p>
          Explore new topics, strengthen your skills, and stay consistent.
          Every lesson completed brings you one step closer to your goals.
        </p>

        <span className="journey-badge">
          🚀 Keep Learning Every Day
        </span>
      </section>
    </main>
  );
};

export default MainContent;