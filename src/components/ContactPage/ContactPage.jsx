import React from 'react';
import { FaPhone, FaEnvelope, FaInstagram } from 'react-icons/fa';
import Header from '../Header/Header';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <Header />
      <section className="contact-page-section">
        <h2>Contact</h2>
        <div className="contact-icons">
          <a href="tel:+972533464716" title="Call me">
            <FaPhone className="contact-icon" />
          </a>
          <a href="mailto:Ariellamorrison03@gmail.com" title="Email me">
            <FaEnvelope className="contact-icon" />
          </a>
          <a
            href="https://www.instagram.com/mad_sketched_"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow me on Instagram"
          >
            <FaInstagram className="contact-icon" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
