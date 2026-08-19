// Dashboard.jsx
import { useState, useEffect } from "react";
import axios from '../config/axios.js'
import LeftSidebar from "../components/UserDashboardSidebar.jsx";
import MainContent from "../components/MainContent.jsx";
import RightSidebar from "../components/RightSidebar.jsx";
import { Menu } from "lucide-react";
import { useAuth } from "../hooks/useAuth.js";
import DashboardSkeleton from "../components/Loaders/DashboardSkeleton.jsx";

const Dashboard = () => {
  // const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      setLoading(false);
      return;
    }

    if (!user.enrolledCourses.length) {
      setLoading(false);
      return;
    }
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("/users/enrolledCourses");
        setCourses(data.enrolledCourses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user, isLoading]);

  if (loading || isLoading) return <DashboardSkeleton />;

  return (
    <div className="dashboard-wrapper">
      {!isSidebarOpen &&
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