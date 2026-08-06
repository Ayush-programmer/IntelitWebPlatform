import React from 'react'
import Navbar from '../components/common/Navbar.jsx';
import Footer from '../components/common/Footer.jsx';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="contactPage">

        {/* Hero */}

        <section className="contact-hero">

          <span className="contact-tag">
            CONTACT US
          </span>

          <h1>
            Let's Build Better Learning Together
          </h1>

          <p>
            Have a question, feedback, or partnership idea?
            We'd love to hear from you.
          </p>

        </section>


        {/* Main */}

        <section className="contact-section">

          {/* LEFT */}

          <div className="contact-card">

            <h2>Get in Touch</h2>

            <p>
              Whether you're a learner looking for help or an instructor
              interested in teaching, our team is here for you.
            </p>

            <div className="contact-items">

              <div className="contact-item">

                <i className="fa-solid fa-location-dot"></i>

                <div>

                  <h4>Address</h4>

                  <p>
                    Modipada,
                    Sambalpur,
                    Odisha - 768002
                  </p>

                </div>

              </div>

              <div className="contact-item">

                <i className="fa-solid fa-envelope"></i>

                <div>

                  <h4>Email</h4>

                  <p>
                    666ayushman@gmail.com
                  </p>

                </div>

              </div>

              <div className="contact-item">

                <i className="fa-solid fa-phone"></i>

                <div>

                  <h4>Phone</h4>

                  <p>
                    +91 9090170384
                  </p>

                </div>

              </div>

              <div className="contact-item">

                <i className="fa-regular fa-clock"></i>

                <div>

                  <h4>Support Hours</h4>

                  <p>
                    Monday – Saturday
                    <br />
                    9:00 AM – 7:00 PM
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* RIGHT */}

          <div className="contact-form-card">

            <h2>Send us a Message</h2>

            <form>

              <input
                type="text"
                placeholder="Full Name"
              />

              <input
                type="email"
                placeholder="Email Address"
              />

              <input
                type="text"
                placeholder="Subject"
              />

              <textarea
                rows="7"
                placeholder="Your Message"
              />

              <button
                className="btn-primary-col"
              >
                Send Message
              </button>

            </form>

          </div>

        </section>


        {/* MAP */}

        <section className="contact-map">

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14941.096480005807!2d83.981964!3d21.470964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1a5b4e3c7c4b2d%3A0x6a7b3e02aa527969!2sGangadhar%20Meher%20University!5e0!3m2!1sen!2sin!4v1726410000000!5m2!1sen!2sin"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

        </section>

      </div>
      <Footer />
    </div>
  )
}

export default Contact