import React, { useState } from 'react';
import { FaInstagram, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToSection = (sectionId) => {
    if (location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const goToCharcoal = () => {
    setGalleryOpen(false);
    goToSection('gallery');
  };

  const goToOils = () => {
    setGalleryOpen(false);
    navigate('/oils');
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo">
          <h2>Devorah Morrison Nafcha</h2>
        </div>
        <nav className="main-nav">
          <ul>
            <li
              className="nav-dropdown"
              onMouseEnter={() => setGalleryOpen(true)}
              onMouseLeave={() => setGalleryOpen(false)}
            >
              <button className={galleryOpen ? 'dropdown-active' : ''}>
                Gallery <span className="dropdown-arrow">▾</span>
              </button>
              {galleryOpen && (
                <ul className="dropdown-menu">
                  <li><button onClick={goToCharcoal}>Charcoal</button></li>
                  <li><button onClick={goToOils}>Oil paintings</button></li>
                </ul>
              )}
            </li>
            <li><button onClick={() => goToSection('about-me')}>About Me</button></li>
            <li><button onClick={() => goToSection('contact')}>Contact</button></li>
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
