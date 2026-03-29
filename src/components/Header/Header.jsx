import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaInstagram, FaEnvelope, FaPhone, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const close = () => setMenuOpen(false);

  return (
    <header className={`site-header${isHome ? ' site-header--home' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="header-name" onClick={close}>
          Devorah Morrison Nafcha
        </Link>

        <button
          className="header-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`header-nav${menuOpen ? ' header-nav--open' : ''}`}>
          <Link to="/charcoal" className="header-link" onClick={close}>Charcoal</Link>
          <Link to="/oils" className="header-link" onClick={close}>Oil paintings</Link>
          <Link to="/about" className="header-link" onClick={close}>About</Link>
          <Link to="/contact" className="header-link" onClick={close}>Contact</Link>

          <div className="header-icons">
            <a href="tel:+972533464716" title="Call me"><FaPhone /></a>
            <a href="mailto:Ariellamorrison03@gmail.com" title="Email me"><FaEnvelope /></a>
            <a
              href="https://www.instagram.com/mad_sketched_"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
