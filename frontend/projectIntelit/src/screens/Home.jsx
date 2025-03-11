import React from 'react'

const Home = () => {
  return (
    <div>
      <div classNameName="app">
        <nav className="navbar">
          <div className="container">
            <a className="brand-logo" href="#">
              Intelit
            </a>
            <div className="side-wrapper">
              <i className="fa-solid fa-close"></i>
              <div className="navbar-links">
                <a className="navbar-link active" href="/home">Home</a>
                <a className="navbar-link" href="/about">About</a>
                <a className="navbar-link" href="/courses">Courses</a>
                <a className="navbar-link" href="/contact">Contact Us</a>
              </div>
            </div>
            <div className="right">
              <div className="navbar-auth">
                <a href="logInPage.html" className="login">LogIn</a>
                <a href="signUpPage.html"><button className="register btn-primary-col">Register</button></a>
              </div>
              <div className="sidebar-btn">
                <i className="fa-solid fa-bars-staggered"></i>
              </div>
            </div>
          </div>
        </nav>
        <section className="hero">
          <div className="container">
            <div className="hero-bg">
              <img src="./images/heroBg.svg" alt="" />
            </div>
            <div className="hero-texts">
              <div className="hero-header">
                <h1>Unlock Your Learning Potential With Intelit</h1>
                <div className="diagram" data-aos="fade-out">
                  <div className="ellipse">
                    <div className="split-circle"></div>
                  </div>
                </div>
              </div>
              <div className="hero-bottom">
                <div className="left">
                  <div className="texts">
                    <h3 className="active">UI UX Design</h3>
                    <h3 className="text-mute">WEB DEVELOPEMENT</h3>
                    <h3 className="text-mute">DIGITAL MARKETTING</h3>
                    <h3 className="text-mute">PRACTICAL LEARNING</h3>
                  </div>
                  <div className="explore-btn">
                    <button className="btn-primary-col">Explore More</button>
                  </div>
                </div>
                <div className="right">
                  <div className="right-box">
                    <i className="fa-regular fa-star"></i>
                    <div className="text">
                      <h4>4.7</h4>
                      <p className="text-mute">Overall rating</p>
                    </div>
                  </div>
                  <div className="right-box">
                    <i className="fa-solid fa-graduation-cap"></i>
                    <div className="text">
                      <h4>4.7M+</h4>
                      <p className="text-mute">Students</p>
                    </div>
                  </div>
                  <div className="right-box">
                    <i className="fa-solid fa-chalkboard-user"></i>
                    <div className="text">
                      <h4>123</h4>
                      <p className="text-mute">Instructors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="collaborations">
          <div className="header">
            <h2>Over 100 Companies Collaborate With Us</h2>
          </div>
          <div className="logos">
            <div className="logo" data-aos="fade-in">
              <img src="./images/apple-logo.webp" alt="" />
            </div>
            <div className="logo" data-aos="fade-in">
              <img src="./images/facebook-logo.webp" alt="" />
            </div>
            <div className="logo" data-aos="fade-in">
              <img src="./images/zarla-chanel-combination-logo.webp" alt="" />
            </div>
            <div className="logo" data-aos="fade-in">
              <img src="./images/google-logo.webp" alt="" />
            </div>
            <div className="logo" data-aos="fade-in">
              <img src="./images/microsoft-logo.webp" alt="" />
            </div>
            <div className="logo" data-aos="fade-in">
              <img src="./images/ibm-logo.webp" alt="" />
            </div>
          </div>
        </section>

        <section className="smart-edu">
          <div className="container">
            <div className="description" data-aos="fade-right">
              <h2>Our Education Is Smart And Effective</h2>
              <p className="text-mute">Online education can be a covenient and flexible option for student who are
                unbar and attend
                traditional
                in-person classNamees due to their location, schedule.</p>
              <button className="btn-primary-col">Let's Get Started</button>
            </div>
            <div className="image" data-aos="fade-left">
              <img src="./images/smartEdu.svg" alt="" />
            </div>
          </div>
        </section>

        <section className="why-choose">
          <div className="container">
            <div className="main-box" data-aos="zoom-in">
              <div className="content-box">
                <h2>Why You Choose Our Platform</h2>
                <p className="text-mute">I was designed to assist user with a wide range of tasks and answer
                  questions to the best of
                  my ability.</p>
                <button className="btn-primary-col">Learn More</button>
              </div>
              <div className="image-box">
                <img src="./images/book-with-brain.png" alt="Program Image" />
              </div>
            </div>

            <div className="features-grid">
              <div className="feature-box" data-aos="zoom-in-right" data-aos-duration="1000">
                <div className="icon">
                  <i className="fa-solid fa-diamond"></i>
                </div>
                <h3>Access Anywhere</h3>
                <p className="text-mute">Flexible access to courses anywhere, anytime.</p>
              </div>
              <div className="feature-box" data-aos="zoom-in-right" data-aos-duration="1000">
                <div className="icon">
                  <i className="fa-solid fa-stopwatch"></i>
                </div>
                <h3>Flexible Time</h3>
                <p className="text-mute">Study at your own pace with a flexible schedule.</p>
              </div>
              <div className="feature-box" data-aos="zoom-in-left" data-aos-duration="1000">
                <div className="icon">
                  <i className="fa-solid fa-layer-group"></i>
                </div>
                <h3>Organized Program</h3>
                <p className="text-mute">Structured and well-organized courses.</p>
              </div>
              <div className="feature-box" data-aos="zoom-in-left" data-aos-duration="1000">
                <div className="icon">
                  <i className="fa-solid fa-award"></i>
                </div>
                <h3>Certificate</h3>
                <p className="text-mute">Receive a certificate upon course completion.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="teacher-section">
          <div className="container">
            <div className="teacher-content" data-aos="fade-right">
              <h2>Join Intelit as a Teacher</h2>
              <p>Share your expertise with eager learners. Create, list, and manage your courses on our platform.
                Inspire students globally and build your teaching portfolio.</p>
              <button className="btn-primary-col">Start Teaching</button>
            </div>
            <div className="teacher-visual" data-aos="fade-left">
              <img src="./images/teacherSec.svg" alt="Teacher Illustration" />
            </div>
          </div>
        </section>

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

        <footer className="footer">
          <div className="flex-div">
            <div className="logo-box box">
              <h3 className="header logo" href="#">Intelit</h3>
              <p className="description text-mute">About pages are perfect spaces to talk about where you started,
                how you've grown, and the ideals that have helped your organization mature.</p>
            </div>
            <div className="box">
              <h3 className="header">Address</h3>
              <p className="description text-mute">1090 A/01 Richmond Avenue, Houston, NY 7704, USA</p>
            </div>
            <div className="box">
              <h3 className="header">Contact</h3>
              <p className="description text-mute">+123 456 789 147</p>
              <p className="description text-mute">example@gmail.com</p>
            </div>
            <div className="box">
              <h3 className="header">Office</h3>
              <p className="description text-mute">Monday - Saturday</p>
              <p className="description text-mute">9AM - 10PM</p>
            </div>
          </div>
          <hr className="text-mute" />
            <div className="footer-bottom">
              <div className="social-media">
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                <a href="#"><i className="fas fa-paper-plane"></i></a>
                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                <a href="#"><i className="fa-brands fa-twitter"></i></a>
              </div>
              <p>&copy; 2024 Copyright. <a href="#">Intelit</a></p>
            </div>
        </footer>

      </div>
    </div>
  )
}
export default Home