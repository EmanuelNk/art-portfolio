import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import viennaData from '../../data/vienna.json';
import portraitsData from '../../data/portraits.json';
import fallData from '../../data/fall.json';
import coffeeData from '../../data/coffee.json';
import oilMediumData from '../../data/oil-medium.json';
import oilMinisData from '../../data/oil-minis.json';
import './OilsPage.css';

// Anti-moiré chain for the canvas-textured photos: supersample to 2x the
// final size, blur away the weave frequency, then halve to the card size.
const cardThumb = (url) =>
  url.replace(
    '/upload/',
    '/upload/w_960,h_1280,c_fill/e_blur:130/w_480,h_640,c_scale,f_auto,q_auto/'
  );

const CATEGORIES = [
  { slug: 'vienna', title: 'Scenes from Vienna', data: viennaData },
  { slug: 'portraits', title: 'Portraits', data: portraitsData },
  { slug: 'fall', title: 'Fall series', data: fallData },
  { slug: 'coffee', title: 'Coffee collection', data: coffeeData },
  { slug: 'medium', title: 'Medium size oils', data: oilMediumData },
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
                <img src={cardThumb(data[0].url)} alt={title} />
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
