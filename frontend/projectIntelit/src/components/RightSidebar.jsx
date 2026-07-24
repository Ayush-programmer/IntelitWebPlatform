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
      <div className='flex align-center'>
        <div className="greeting">
          <div className="profile-image">
            <img src={profilePic} alt="profile" />
          </div>
          <h3>Good Morning, {user?.profile.fullName?.split(' ')[0] || user?.username}!</h3>
        </div>
        <span className='down-btn'>
          {!isRightSidebarVisible ? (
            <FaChevronUp
              size={20}
              className="dropdown-icon"
              onClick={() => setIsRightSidebarVisible(true)}
            />
          ) : (
            <FaChevronDown
              size={20}
              className="dropdown-icon"
              onClick={() => setIsRightSidebarVisible(false)}
            />
          )}

        </span>
      </div>
      <p className='bio'><strong>Bio : </strong> {user.profile.bio}</p>

      {isProfileIncomplete && (
        <div className="complete-profile-card">
          <h4>Complete Your Profile</h4>
          <p>Complete your profile to unlock personalized recommendations and more.</p>
          <Link className="complete-profile-btn" to='/completeprofile'>Complete Now</Link>
        </div>
      )}

      {/*  Note : Here I gave a condition to show the edit profile card only if the profile is complete and also i have given the classname same as complete-profile to avoid writing css for same button again and again */}
      {!isProfileIncomplete && (
        <div className="complete-profile-card">
          <h4>Edit Your Profile</h4>
          <Link className="complete-profile-btn" to='/updateprofile'>Edit Profile</Link>
        </div>
      )}

      <div className="dummy-graph">
        <h4>Learning Progress</h4>
        <div className="graph-placeholder">
          {/* Dummy Graph */}
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
          <div className="bar bar4"></div>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;