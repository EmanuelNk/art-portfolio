import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import oilMinisData from '../../data/oil-minis.json';
import oilLargeData from '../../data/oil-large.json';
import '../ArtPortfolio.css';
import './OilsGallery.css';

const thumb = (url, w = 900) =>
  url.replace('/upload/', `/upload/w_${w},f_auto,q_auto,c_limit/`);

const oilMiniPieces = oilMinisData.map(({ url, title, description, size }) => ({
  url,
  title,
  description,
  sizeText: size || '',
}));

const oilLargePieces = oilLargeData.map(({ url, title, description, size }) => ({
  url,
  title,
  description,
  sizeText: size || '',
}));

function OilsGallery({ category }) {
  const isMinis = category === 'minis';
  const pieces = isMinis ? oilMiniPieces : oilLargePieces;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalAt = (i) => {
    setSelectedIndex(i);
    setIsModalOpen(true);
  };

  const goPrev = () =>
    setSelectedIndex((p) => (p - 1 + pieces.length) % pieces.length);
  const goNext = () =>
    setSelectedIndex((p) => (p + 1) % pieces.length);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view');
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.masonry-item'));
    const enter = (e) => e.currentTarget.style.setProperty('--elev', '1');
    const move = (e) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty('--rx', `${(0.5 - py) * 6}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * 8}deg`);
    };
    const leave = (e) => {
      const el = e.currentTarget;
      el.style.removeProperty('--rx');
      el.style.removeProperty('--ry');
      el.style.setProperty('--elev', '0');
    };
    cards.forEach((c) => {
      c.addEventListener('mouseenter', enter);
      c.addEventListener('mousemove', move);
      c.addEventListener('mouseleave', leave);
    });
    return () => {
      cards.forEach((c) => {
        c.removeEventListener('mouseenter', enter);
        c.removeEventListener('mousemove', move);
        c.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <div className="oils-gallery-page">
      <Header />
      <div className="oils-gallery-header">
        <Link to="/oils" className="oils-back-link">← Oil paintings</Link>
      </div>

      <section className="gallery-section oils-gallery-section">
        <div className="masonry-grid">
          {pieces.map((piece, index) => (
            <button
              key={piece.title + index}
              className="masonry-item reveal"
              onClick={() => openModalAt(index)}
              aria-label={`Open ${piece.title}`}
            >
              <img
                src={thumb(piece.url)}
                alt={piece.title}
                style={{ opacity: 0, transition: 'opacity 0.4s ease' }}
                onLoad={(e) => { e.target.style.opacity = 1; }}
              />
              {piece.sizeText && (
                <span className="masonry-size" aria-hidden="true">
                  {piece.sizeText}
                </span>
              )}
              <span className="masonry-caption">{piece.title}</span>
            </button>
          ))}
        </div>
      </section>

      {pieces.length > 0 && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={pieces[selectedIndex]?.url}
          title={pieces[selectedIndex]?.title}
          description={pieces[selectedIndex]?.description}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}

export default OilsGallery;
