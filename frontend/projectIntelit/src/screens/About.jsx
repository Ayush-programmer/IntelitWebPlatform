import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const About = () => {
  return (
    <div>
      <Navbar />
      <div className='about'>
        <div className="page-header page-header-about">
          <h2>#KnowUs</h2>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
        </div>

        <div className="about about-head section-p1">
          <img src="./images/smartEdu.svg" alt="" />
          <div>
            <h2>Who We Are?</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab vero autem voluptatum odit quod? Quis
              repellat laboriosam, natus assumenda aut ad fugiat nulla quibusdam magnam sunt adipisci dolore quisquam
              amet similique quidem sed. Ipsum et ipsa repudiandae, fugit voluptate ad nemo soluta distinctio eveniet
              dolores cupiditate natus vel ullam architecto adipisci, amet tenetur. Amet, excepturi debitis,
              repellendus recusandae natus pariatur accusamus unde mollitia, eum quod quae architecto hic? Dolorum
              voluptas eveniet, laborum dolore modi repellat. Magnam repellat laboriosam aliquid omnis quam! Alias
              accusamus quis quae. Nesciunt in soluta consequuntur, cumque quibusdam incidunt odio, sint, obcaecati
              voluptatem vitae natus itaque nemo?</p>
            <abbr title="">Create stunning images with as much as or as little control as you like thanks to a choice of
              Basic and Creative modes.</abbr>
            <br /><br />
            <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">Create stunning images with as much as or as
              little control as you like
              thanks to a choice of
              Basic and Creative modes.</marquee>
          </div>
        </div>
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
      </div>
      <Footer />
    </div>
  )
}

export default About