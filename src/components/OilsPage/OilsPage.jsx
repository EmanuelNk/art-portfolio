import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './OilsPage.css';

// Load all oil images; use the first as the minis card thumbnail
const oilContext = require.context('../../assets/images/art/oil', false, /\.(png|jpe?g|jpg)$/i);
const oilImages = oilContext.keys().sort().map((key) => oilContext(key));
const minisThumbnail = oilImages[0];

function OilsPage() {
  return (
    <div className="oils-page">
      <Header />

      <div className="oils-hero">
        <Link to="/" className="oils-back-link">← Back</Link>
        <h1 className="oils-page-title">Oil Paintings</h1>
        <p className="oils-page-subtitle">Still life · Landscape</p>
      </div>

      <div className="oils-categories">
        <Link to="/oils/minis" className="oils-card">
          <div className="oils-card-image">
            <img src={minisThumbnail} alt="Mini still lifes" />
          </div>
          <div className="oils-card-label">
            <h2>Mini still lifes</h2>
          </div>
        </Link>

        <Link to="/oils/large" className="oils-card">
          <div className="oils-card-image oils-card-image--empty">
            <span className="oils-card-plus">+</span>
          </div>
          <div className="oils-card-label">
            <h2>Large paintings</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default OilsPage;
