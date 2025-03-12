import React from 'react';
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
            <li><button onClick={() => scrollToSection('gallery')}>Gallery</button></li>
            <li><button onClick={() => scrollToSection('about-me')}>About Me</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header; 