import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; 
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import img from '../assets/img.png';
import FAQ from './FAQ';
class Home extends Component {
  // Initialize AOS on mount
  componentDidMount() {
    window.addEventListener('load', () => {
      
      AOS.init();
    });
  }

  render() {
    return (     

      <main>
        <div className='page-content'>
        <section className="hero" data-aos="fade-up">
          <h1>Book Smarter. Learn Better.</h1>
          <p>Connect students and teachers with ease. Schedule appointments anytime, anywhere.</p>
          <div className="cta-buttons">

          <Link to="/student_register" className="btn primary">Get Started</Link>
          <Link to="/login" className="btn">Login</Link>
          </div>
        </section>

        <section className="why-use">
          <div className="why-left">
            <img src={img} alt="img" />
          </div>
          <div className="why-right">
            <h2>What's PingMyProf for?</h2>
            <p>
              Booking time with a teacher shouldn't be complicated. 
              <b> PingMyProf</b> makes it super easy to request a meeting, leave a quick message, and hear back when it's approved.  </p>            
            <p> 
              No emails. No confusion. Just a clean, simple way to connect when you need help.  </p>
          </div>
        </section>

        <section className="features">
          <h2>Features</h2>
          <div className="feature-list">
            <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">📅 Easy Appointment Booking</div>
            <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">✅ Approval System for Teachers</div>
            <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">💬 Message Sharing</div>
            <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">🔐 Secure Login & Dashboard</div>
          </div>
        </section>

        <FAQ />
        </div>
      </main>
      
    );
  }
}

export default Home;
