// Dashboard.jsx
import { useState, useEffect } from "react";
import axios from '../config/axios.js'
import LeftSidebar from "../components/UserDashboardSidebar.jsx";
import MainContent from "../components/MainContent.jsx";
import RightSidebar from "../components/RightSidebar.jsx";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/users/profile");
        setUser(res.data.user);

        if (res.data.user.enrolledCourses.length) {
          const coursesRes = await axios.get("/users/enrolledCourses");
          setCourses(coursesRes.data.enrolledCourses);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-wrapper">
      { !isSidebarOpen &&
        <button
          className="menu-toggle-btn"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={28} color="black" />
        </button>
      }
      <LeftSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="main-section">
        <MainContent user={user} courses={courses} />
      </main>

      <RightSidebar user={user} />
    </div>
  );
};

export default Dashboard;