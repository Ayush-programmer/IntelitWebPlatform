import React from "react";

const DashboardSkeleton = () => {
    return (
        <div className="dashboard-skeleton">

            <aside className="dashboard-skeleton-left">

                <div className="skeleton skeleton-logo"></div>

                <div className="skeleton-nav">
                    <div className="skeleton skeleton-nav-item"></div>
                    <div className="skeleton skeleton-nav-item"></div>
                    <div className="skeleton skeleton-nav-item"></div>
                    <div className="skeleton skeleton-nav-item"></div>
                    <div className="skeleton skeleton-nav-item"></div>
                </div>

                <div className="skeleton skeleton-logout"></div>

            </aside>

            {/* Main Dashboard */}
            <main className="dashboard-skeleton-main">

                {/* Welcome Banner */}
                <div className="skeleton skeleton-welcome">
                    <div className="skeleton-line skeleton-welcome-title"></div>
                    <div className="skeleton-line skeleton-welcome-text"></div>
                </div>

                {/* Quick Stats */}
                <section className="skeleton-stats">
                    <div className="skeleton skeleton-stat"></div>
                    <div className="skeleton skeleton-stat"></div>
                </section>

                {/* Courses Header */}
                <div className="skeleton-courses-header">
                    <div className="skeleton skeleton-heading"></div>
                    <div className="skeleton skeleton-button"></div>
                </div>

                {/* Course Cards */}
                <div className="skeleton-courses-grid">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div className="skeleton-course-card" key={index}>

                            <div className="skeleton skeleton-course-image"></div>

                            <div className="skeleton-course-info">
                                <div className="skeleton skeleton-course-title"></div>
                                <div className="skeleton skeleton-course-category"></div>
                            </div>

                            <div className="skeleton-course-actions">
                                <div className="skeleton skeleton-action"></div>
                                <div className="skeleton skeleton-action"></div>
                            </div>

                        </div>
                    ))}
                </div>

            </main>

            {/* Right Sidebar */}
            <aside className="dashboard-skeleton-right">

                <div className="skeleton skeleton-profile-image"></div>

                <div className="skeleton skeleton-greeting"></div>

                <div className="skeleton skeleton-bio"></div>
                <div className="skeleton skeleton-bio short"></div>

                <div className="skeleton skeleton-profile-card">
                    <div className="skeleton skeleton-card-title"></div>
                    <div className="skeleton skeleton-card-text"></div>
                    <div className="skeleton skeleton-card-button"></div>
                </div>

            </aside>

        </div>
    );
};

export default DashboardSkeleton;