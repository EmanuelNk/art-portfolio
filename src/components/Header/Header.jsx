import React from 'react';
import { FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Header.css';

function Header() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo">
          <h2>Devorah Morrison Nafcha</h2>
        </div>
        <nav className="main-nav">
          <ul>
            <li><button onClick={() => scrollToSection('title')}>Gallery</button></li>
            <li><button onClick={() => scrollToSection('about-me')}>About Me</button></li>
            <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
          </ul>
        </nav>
        <div className="contact-icons">
          <a href="tel:+972533464716" title="Call me">
            <FaPhone className="contact-icon" />
          </a>
          <a href="mailto:Ariellamorrison03@gmail.com" title="Email me">
            <FaEnvelope className="contact-icon" />
          </a>
          <a href="https://www.instagram.com/mad_sketched_" target="_blank" rel="noopener noreferrer" title="Follow me on Instagram">
            <FaInstagram className="contact-icon" />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header; 