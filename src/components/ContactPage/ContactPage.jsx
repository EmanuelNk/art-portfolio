import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaInstagram, FaTiktok, FaFacebook } from 'react-icons/fa';
import Header from '../Header/Header';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <Header />
      <section className="contact-page-section">
        <img
          className="contact-artwork"
          src="https://res.cloudinary.com/djm9plswu/image/upload/w_700,f_auto,q_auto,c_limit/v1787744814/BCA00785-2_ygkfb5.jpg"
          alt="Wallet Man — oil painting"
        />
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
          <a
            href="https://www.tiktok.com/@mad_sketched_"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow me on TikTok"
          >
            <FaTiktok className="contact-icon" />
          </a>
          <a
            href="https://www.facebook.com/devorah.madeline.morrison.nk"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow me on Facebook"
          >
            <FaFacebook className="contact-icon" />
          </a>
        </div>
        <Link to="/" className="contact-home-btn">Explore the gallery</Link>
      </section>
    </div>
  );
}

export default ContactPage;
