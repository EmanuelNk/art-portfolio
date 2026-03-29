import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import './OilsPage.css';

const oilContext = require.context(
  '../../assets/images/art/oil',
  false,
  /\.(png|jpe?g|jpg)$/i
);
const oilImages = oilContext.keys().sort().map((k) => oilContext(k));
const minisThumbnail = oilImages[0];

function OilsPage() {
  return (
    <div className="oils-page">
      <Header />

      <div className="oils-hero">
        <h1 className="oils-page-title">Oil paintings</h1>
        <p className="oils-page-subtitle">Still life · Landscape</p>
      </div>

      <div className="oils-categories">
        <Link to="/oils/minis" className="oils-card">
          <div className="oils-card-image">
            <img src={minisThumbnail} alt="Mini still lifes" />
          </div>
          <div className="oils-card-body">
            <h2 className="oils-card-title">Mini still lifes</h2>
            <p className="oils-card-sub">{oilImages.length} works</p>
          </div>
        </Link>

        <Link to="/oils/large" className="oils-card">
          <div className="oils-card-image oils-card-image--placeholder" />
          <div className="oils-card-body">
            <h2 className="oils-card-title">Large paintings</h2>
            <p className="oils-card-sub">Coming soon</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default OilsPage;
