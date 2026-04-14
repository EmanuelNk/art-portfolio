import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import oilMinisData from '../../data/oil-minis.json';
import oilLargeData from '../../data/oil-large.json';
import './OilsPage.css';

const minisThumbnail = oilMinisData[0].url;
const largeThumbnail = oilLargeData[0].url;

function OilsPage() {
  return (
    <div className="oils-page">
      <Header />

      <div className="oils-hero">
        <h1 className="oils-page-title">Oil paintings</h1>
        <p className="oils-page-subtitle">Still life · Portraits · Scenery§§</p>
      </div>

      <div className="oils-categories">
        <Link to="/oils/minis" className="oils-card">
          <div className="oils-card-image">
            <img src={minisThumbnail} alt="Mini still lifes" />
          </div>
          <div className="oils-card-body">
            <h2 className="oils-card-title">Mini still lifes</h2>
            <p className="oils-card-sub">{oilMinisData.length} works</p>
          </div>
        </Link>

        <Link to="/oils/large" className="oils-card">
          <div className="oils-card-image">
            <img src={largeThumbnail} alt="Large paintings" />
          </div>
          <div className="oils-card-body">
            <h2 className="oils-card-title">Large paintings</h2>
            <p className="oils-card-sub">{oilLargeData.length} {oilLargeData.length === 1 ? 'work' : 'works'}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default OilsPage;
