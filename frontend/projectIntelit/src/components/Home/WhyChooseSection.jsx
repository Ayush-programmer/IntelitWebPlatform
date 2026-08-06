import React from "react";
import { Link } from "react-router-dom";
import {
    FaGlobeAmericas,
    FaClock,
    FaLayerGroup,
    FaWallet
} from "react-icons/fa";

const WhyChooseSection = () => {
    return (
        <section className="why-choose">
            <div className="container">
                <div className="main-box" data-aos="zoom-in">
                    <div className="content-box">
                        <h2>Why You Choose Our Platform</h2>
                        <p className="text-mute">I was designed to assist user with a wide range of tasks and answer
                            questions to the best of
                            my ability.</p>
                        <Link to='/about' className="btn-primary-col">Learn More</Link>
                    </div>
                    <div className="image-box">
                        <img src="./images/book-with-brain.png" alt="Program Image" />
                    </div>
                </div>

                <div className="features-grid">

                    <div
                        className="feature-box"
                        data-aos="zoom-in-right"
                        data-aos-duration="1000"
                    >
                        <div className="icon aqua">
                            <FaGlobeAmericas />
                        </div>

                        <h3>Access Anywhere</h3>

                        <p className="text-mute">
                            Flexible access to courses anywhere, anytime.
                        </p>
                    </div>

                    <div
                        className="feature-box"
                        data-aos="zoom-in-right"
                        data-aos-duration="1000"
                    >
                        <div className="icon primary">
                            <FaClock />
                        </div>

                        <h3>Flexible Time</h3>

                        <p className="text-mute">
                            Study at your own pace with a flexible schedule.
                        </p>
                    </div>

                    <div
                        className="feature-box"
                        data-aos="zoom-in-left"
                        data-aos-duration="1000"
                    >
                        <div className="icon pink">
                            <FaLayerGroup />
                        </div>

                        <h3>Organized Program</h3>

                        <p className="text-mute">
                            Structured and well-organized courses.
                        </p>
                    </div>

                    <div
                        className="feature-box"
                        data-aos="zoom-in-left"
                        data-aos-duration="1000"
                    >
                        <div className="icon yellow">
                            <FaWallet />
                        </div>

                        <h3>Affordable Learning</h3>

                        <p className="text-mute">
                            Access quality courses at student-friendly prices without compromising on learning.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default WhyChooseSection;