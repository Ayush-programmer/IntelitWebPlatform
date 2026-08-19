import React from "react";

const SkeletonBlock = ({ className = "" }) => {
    return <div className={`skeleton-block ${className}`} />;
};

const CourseSkeleton = ({ showSidebar }) => {
    const hasSidebar = showSidebar === true;

    return (
        <div className={`course-skeleton ${hasSidebar ? "with-sidebar" : "without-sidebar"}`}>

            {hasSidebar && (
                <aside className="course-skeleton-sidebar">

                    <SkeletonBlock className="skeleton-logo" />

                    <div className="skeleton-profile">
                        <SkeletonBlock className="skeleton-avatar" />

                        <div className="skeleton-profile-text">
                            <SkeletonBlock className="skeleton-name" />
                            <SkeletonBlock className="skeleton-email" />
                        </div>
                    </div>

                    <div className="skeleton-nav">
                        <SkeletonBlock />
                        <SkeletonBlock />
                        <SkeletonBlock />
                        <SkeletonBlock />
                        <SkeletonBlock />
                    </div>

                </aside>
            )}

            <main className="course-skeleton-main">

                {/* Breadcrumb */}
                <SkeletonBlock className="skeleton-breadcrumb" />

                {/* Course Header */}
                <section className="course-skeleton-header">

                    <div className="skeleton-title-row">
                        <SkeletonBlock className="skeleton-course-title" />
                        <SkeletonBlock className="skeleton-category" />
                    </div>

                    <div className="skeleton-stats">
                        <SkeletonBlock />
                        <SkeletonBlock />
                        <SkeletonBlock />
                    </div>

                    <SkeletonBlock className="skeleton-enroll" />

                </section>

                {/* Main content */}
                <section className="course-skeleton-content">

                    <div className="course-skeleton-video-area">

                        <SkeletonBlock className="skeleton-video" />

                        <div className="skeleton-tabs">
                            <SkeletonBlock />
                            <SkeletonBlock />
                            <SkeletonBlock />
                            <SkeletonBlock />
                        </div>

                        <SkeletonBlock className="skeleton-description" />

                    </div>

                    <div className="course-skeleton-modules">

                        <SkeletonBlock className="skeleton-module-title" />

                        <SkeletonBlock />
                        <SkeletonBlock />
                        <SkeletonBlock />
                        <SkeletonBlock />
                        <SkeletonBlock />

                    </div>

                </section>

            </main>
        </div>
    );
};

export default CourseSkeleton;