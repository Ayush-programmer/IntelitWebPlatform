import React from "react";

const ReviewSection = () => {
    return (
        <section className="reviews" id="review">
            <div className="container">
                <h3 className="heading">Feedback</h3>
                <h2 className="title">What Our Student Say </h2>

                <div className="box-container">
                    <div className="box box-1" data-aos="fade-up" data-aos-duration="400">
                        <img src="./images/allison-griffith-Q76DPRQ3Ix0-unsplash.jpg" alt="student-1" />
                        <h3>Allision Griffith</h3>
                        <p>The instructors are knowledgable and engaging.</p>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                    <div className="box box-2" data-aos="fade-up" data-aos-duration="800">
                        <img src="./images/yingchou-han-IJrIeCs3D4g-unsplash.jpg" alt="student-2" />
                        <h3>Yingchou Han</h3>
                        <p>The best thing is there's no time limit to complete the course.</p>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                    <div className="box box-3" data-aos="fade-up" data-aos-duration="1200">
                        <img src="./images/martins-zemlickis-zbukvoF68UY-unsplash.jpg" alt="student-3" />
                        <h3>Martins Zemlickis</h3>
                        <p>I have got plenty of certificates, Thanks to Intelit. </p>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                    <div className="box box-4" data-aos="fade-up" data-aos-duration="1600">
                        <img src="./images/jin-nishichan-ktHk5U-WyV4-unsplash.jpg" alt="student-4" />
                        <h3>Jin Nishichan</h3>
                        <p>This platform is really good to learn through.</p>
                        <div className="stars">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReviewSection;