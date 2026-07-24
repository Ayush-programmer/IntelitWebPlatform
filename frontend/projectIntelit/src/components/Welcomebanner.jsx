// WelcomeBanner.jsx
import React from 'react';

const WelcomeBanner = ({ user }) => {
  const name = user?.profile?.fullName || user.username;
  const bannerGradient = 'linear-gradient(to right, var(--lavender-1), var(--lavender-2))';

  return (
    <div className="welcome-banner" style={{ background: bannerGradient }}>
      <h2>Welcome back, {name}!</h2>
      <p>Let’s continue your learning journey today.</p>
    </div>
  );
};

export default WelcomeBanner;