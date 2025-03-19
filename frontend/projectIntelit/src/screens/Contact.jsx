import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className='contactPage'>
          <div className="page-header page-header-about">
            <h2>#let's_talk</h2>
            <p>LEAVE A MESSAGE, We love to hear from you!</p>
          </div>

          <div className="contact-details div-p1">
            <div className="details">
              <span>GET IN TOUCH</span>
              <h2>Visit one of our agency locations or contact us today</h2>
              <h3>Head Office</h3>
              <div className="location">
                <li>
                  <i className="fa-solid fa-location-dot"></i>
                  <p>56 Glassford Street Glasgow G1 1UL New Work</p>
                </li>
                <li>
                  <i className="far fa-envelope"></i>
                  <p>contactus@gmail.com</p>
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i>
                  <p>+01 9876 4532</p>
                </li>
                <li>
                  <i className="far fa-clock"></i>
                  <p>Monday to Saturday: 9.00am to 16.00pm</p>
                </li>
              </div>
            </div>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2469.687034842525!2d-1.2570928238564907!3d51.757046192435915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876c6a9ef8c485b%3A0xd2ff1883a001afed!2sUniversity%20of%20Oxford!5e0!3m2!1sen!2sin!4v1726408191523!5m2!1sen!2sin"
                width="600" height="450" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>

          <div className="form-details div-p1">
            <form action="">
              <span>LEAVE A MESSAGE</span>
              <h2>We love to hear from you</h2>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="E-mail" />
              <input type="text" placeholder="Subject" />
              <textarea cols="30" rows="10" placeholder="Your Message"></textarea>
              <button className="btn">Submit</button>
            </form>
            <div className="people">
              <div>
                <img src="./images/allison-griffith-Q76DPRQ3Ix0-unsplash.jpg" />
                <p><span>John Doe</span> Senior Marketing Manager <br /> Phone: + 000 123 000 77 88 <br />Email:
                  johndoe789@gmail.com</p>
              </div>
              <div>
                <img src="./images/allison-griffith-Q76DPRQ3Ix0-unsplash.jpg" />
                <p><span>William Smith</span> Senior Sales Manager <br /> Phone: + 000 123 456 45 88 <br />Email:
                  smithwilliam56@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Contact