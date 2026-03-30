import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import heroImage from '../../assets/images/profile5.jpg';
import charcoal1 from '../../assets/images/art/art1.JPG';
import charcoal2 from '../../assets/images/art/art7.jpg';
import oil1 from '../../assets/images/art/oil/mini1.jpeg';
import oil2 from '../../assets/images/art/oil/mini2.jpg';
import './Homepage.css';

import cArt1 from '../../assets/images/art/art1.JPG';
import cArt2 from '../../assets/images/art/art2.JPG';
import cArt4 from '../../assets/images/art/art4.jpg';
import cArt5 from '../../assets/images/art/art5.jpg';
import cArt6 from '../../assets/images/art/art6.jpg';
import cArt7 from '../../assets/images/art/art7.jpg';
import cArt8 from '../../assets/images/art/art8.jpg';
import oMini1 from '../../assets/images/art/oil/mini1.jpeg';
import oMini2 from '../../assets/images/art/oil/mini2.jpg';
import oMini3 from '../../assets/images/art/oil/mini3.jpeg';
import oMini4 from '../../assets/images/art/oil/mini4.jpeg';
import oMini5 from '../../assets/images/art/oil/mini5.jpeg';

const mixedGallery = [
  { src: cArt1, alt: 'The Mourner' },
  { src: oMini1, alt: 'Oil mini 1' },
  { src: cArt5, alt: 'Avi & Olivia' },
  { src: oMini3, alt: 'Oil mini 3' },
  { src: cArt7, alt: 'Lily' },
  { src: oMini2, alt: 'Oil mini 2' },
  { src: cArt6, alt: 'Yacov & Emunah' },
  { src: oMini4, alt: 'Oil mini 4' },
  { src: cArt2, alt: 'The Rebbe' },
  { src: oMini5, alt: 'Oil mini 5' },
  { src: cArt8, alt: 'Tefillin' },
  { src: cArt4, alt: 'Anniversary' },
];

function Homepage() {
  return (
    <div className="homepage">
      <Header />

      {/* ── HERO ── */}
      <section className="hero">
        <img
          className="hero-bg"
          src={heroImage}
          alt=""
          aria-hidden="true"
        />
        <div className="hero-fade-left" aria-hidden="true" />
        <div className="hero-fade-bottom" aria-hidden="true" />

        <div className="hero-content">
          <h1 className="hero-name">
            <span>Devorah</span>
            <span>Morrison</span>
            <span>Nafcha</span>
          </h1>
          <p className="hero-subtitle">Portrait Artist</p>
          <p className="hero-location">Jerusalem, Israel</p>
          <div className="hero-buttons">
            <Link to="/charcoal" className="hero-btn hero-btn--default">
              Charcoal works
            </Link>
            <Link to="/oils" className="hero-btn hero-btn--oil">
              Oil paintings
            </Link>
            <Link to="/contact" className="hero-btn hero-btn--default">
              Contact
            </Link>
          </div>
        </div>
      </section>

      {/* ── MIXED GRID ── */}
      <section className="mixed-grid-section">
        <h2 className="mixed-grid-heading">Portfolio</h2>
        <div className="mixed-grid">
          {mixedGallery.map((img, i) => (
            <div className="mixed-grid-item" key={i}>
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </section>

      {/* ── MEDIUM SPLIT ── */}
      <section className="medium-split">
        <Link to="/charcoal" className="split-half split-half--charcoal">
          <div className="split-hover-overlay" />
          <div className="split-cards">
            <div className="split-card">
              <img src={charcoal1} alt="Charcoal work" />
            </div>
            <div className="split-card">
              <img src={charcoal2} alt="Charcoal work" />
            </div>
          </div>
          <div className="split-vignette" />
          <div className="split-label">
            <h2 className="split-title">Charcoal</h2>
            <p className="split-sub">Portraits &amp; figures</p>
            <p className="split-cta">View gallery&nbsp;→</p>
          </div>
        </Link>

        <div className="split-divider" />

        <Link to="/oils" className="split-half split-half--oils">
          <div className="split-hover-overlay" />
          <div className="split-cards">
            <div className="split-card">
              <img src={oil1} alt="Oil painting" />
            </div>
            <div className="split-card">
              <img src={oil2} alt="Oil painting" />
            </div>
          </div>
          <div className="split-vignette" />
          <div className="split-label">
            <h2 className="split-title">Oil paintings</h2>
            <p className="split-sub">Still life · Landscape</p>
            <p className="split-cta">View gallery&nbsp;→</p>
          </div>
        </Link>
      </section>
    </div>
  );
}

export default Homepage;
