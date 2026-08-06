import { Link } from 'react-router-dom'
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { useState } from 'react';

// RightSidebar.jsx
const RightSidebar = ({ user }) => {

  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(false);

  const isProfileIncomplete = !user?.isProfileComplete;
  const profilePic = user?.profile.profilePic || 'dummy-profile.jpg';

  return (
    <aside className={`right-sidebar ${isRightSidebarVisible ? "show" : ""}`}>

      {/* Sticky Header */}
      <div className="right-sidebar-header">

        <div className="greeting">

          <div className="profile-image">
            <img src={profilePic} alt="profile" />
          </div>

          <h3>
            Good Morning,{" "}
            {user?.profile.fullName?.split(" ")[0] || user?.username}!
          </h3>

        </div>

        <button
          className="sidebar-toggle-btn"
          onClick={() =>
            setIsRightSidebarVisible(!isRightSidebarVisible)
          }
        >
          {isRightSidebarVisible ? (
            <FaChevronDown
              className="dropdown-icon"
              size={20}
            />
          ) : (
            <FaChevronUp
              className="dropdown-icon"
              size={20}
            />
          )}
        </button>

      </div>

      {/* Scrollable Content */}
      <div className="right-sidebar-content">

        <p className="bio">
          <strong>Bio :</strong> {user.profile.bio}
        </p>

        {isProfileIncomplete ? (
          <div className="complete-profile-card">
            <h4>Complete Your Profile</h4>

            <p>
              Complete your profile to unlock personalized
              recommendations and more.
            </p>

            <Link
              className="complete-profile-btn"
              to="/completeprofile"
            >
              Complete Now
            </Link>
          </div>
        ) : (
          <div className="complete-profile-card">
            <h4>Edit Your Profile</h4>

            <Link
              className="complete-profile-btn"
              to="/updateprofile"
            >
              Edit Profile
            </Link>
          </div>
        )}

      </div>

    </aside>
  );
};

export default RightSidebar;