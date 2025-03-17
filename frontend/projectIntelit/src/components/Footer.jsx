import React from 'react'

const Footer = () => {
  return (
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
  )
}

export default Footer