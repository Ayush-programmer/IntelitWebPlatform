import React from "react";

const TechStack = () => {
  return (
    <section className="tech-stack">
      <div className="header">
        <h2>Built With Modern Technologies</h2>
        <p>
          Intelit is powered by a modern MERN architecture and trusted developer
          tools to provide a fast, secure, and seamless learning experience.
        </p>
      </div>

      <div className="logos">
        <div className="logo react" data-aos="fade-up">
          <img src="/images/reactjs.png" alt="React" />
        </div>

        <div className="logo" data-aos="fade-up" data-aos-delay="100">
          <img src="/images/nodejs.webp" alt="Node.js" />
        </div>

        <div className="logo express" data-aos="fade-up" data-aos-delay="150">
          <img src="/images/expressjs.png" alt="Express.js" />
        </div>

        <div className="logo" data-aos="fade-up" data-aos-delay="200">
          <img src="/images/MongoDB_Logo.svg.webp" alt="MongoDB" />
        </div>

        <div className="logo" data-aos="fade-up" data-aos-delay="250">
          <img src="/images/cloudinarylogo.svg" alt="Cloudinary" />
        </div>

        <div className="logo" data-aos="fade-up" data-aos-delay="300">
          <img src="/images/razorpay-icon.webp" alt="Razorpay" />
        </div>

      </div>
    </section>
  )
}

export default TechStack;