import React from "react";
import { Link } from "react-router-dom";

const SmartEduSection = () => {
    return (
        <section className="smart-edu">
            <div className="container">
                <div className="description" data-aos="fade-right">
                    <h2>Our Education Is Smart And Effective</h2>
                    <p className="text-mute">Online education can be a covenient and flexible option for student who are
                        unbar and attend
                        traditional
                        in-person classNamees due to their location, schedule.</p>
                    <Link to='/browsecourses' className='btn-primary-col'>Let's Get Started</Link>
                </div>
                <div className="image" data-aos="fade-left">
                    <img src="./images/smartEdu.svg" alt="" />
                </div>
            </div>
        </section>
    )
}

export default SmartEduSection;