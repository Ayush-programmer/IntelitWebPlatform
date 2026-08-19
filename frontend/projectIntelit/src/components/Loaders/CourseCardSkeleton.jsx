const CourseCardSkeleton = () => {
    return (
        <article className="course-card-skeleton">

            <div className="skeleton skeleton-image"></div>

            <div className="skeleton-details">

                <div className="skeleton skeleton-category"></div>

                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-title short"></div>

                <div className="skeleton skeleton-author"></div>

                <div className="skeleton skeleton-description"></div>
                <div className="skeleton skeleton-description"></div>
                <div className="skeleton skeleton-description short"></div>

                <div className="skeleton-footer">
                    <div className="skeleton skeleton-price"></div>
                    <div className="skeleton skeleton-button"></div>
                </div>

            </div>

        </article>
    );
};

export default CourseCardSkeleton;