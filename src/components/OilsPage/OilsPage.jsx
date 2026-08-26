import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import viennaData from '../../data/vienna.json';
import portraitsData from '../../data/portraits.json';
import fallData from '../../data/fall.json';
import oilLargeData from '../../data/oil-large.json';
import oilMinisData from '../../data/oil-minis.json';
import './OilsPage.css';

const CATEGORIES = [
  { slug: 'vienna', title: 'Scenes from Vienna', data: viennaData },
  { slug: 'portraits', title: 'Portraits', data: portraitsData },
  { slug: 'fall', title: 'Fall series', data: fallData },
  { slug: 'large', title: 'Large paintings', data: oilLargeData },
  { slug: 'minis', title: 'Mini still lifes', data: oilMinisData },
];

function OilsPage() {
  return (
    <div className="oils-page">
      <Header />

      <div className="oils-hero">
        <h1 className="oils-page-title">Oil paintings</h1>
        <p className="oils-page-subtitle">Still life · Portraits · Scenery</p>
      </div>

      <div className="oils-categories">
        {CATEGORIES.map(({ slug, title, data }) => (
          <Link to={`/oils/${slug}`} className="oils-card" key={slug}>
            {data.length > 0 ? (
              <div className="oils-card-image">
                <img src={data[0].url} alt={title} />
              </div>
            ) : (
              <div className="oils-card-image--placeholder" />
            )}
            <div className="oils-card-body">
              <h2 className="oils-card-title">{title}</h2>
              <p className="oils-card-sub">
                {data.length} {data.length === 1 ? 'work' : 'works'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default OilsPage;
