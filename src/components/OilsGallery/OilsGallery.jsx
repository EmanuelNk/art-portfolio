import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import '../ArtPortfolio.css';
import './OilsGallery.css';

// Load all oil images for the minis gallery
const oilContext = require.context('../../assets/images/art/oil', false, /\.(png|jpe?g|jpg)$/i);
const oilPieces = oilContext.keys().sort().map((key) => ({
  url: oilContext(key),
  title: key.replace(/^\.\//, '').replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
  description: '',
  sizeText: '',
}));

const LARGE_PLACEHOLDER_COUNT = 6;

function OilsGallery({ category }) {
  const isMinis = category === 'minis';
  const title = isMinis ? 'Mini still lifes' : 'Large paintings';
  const pieces = isMinis ? oilPieces : [];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalAt = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const goPrev = () =>
    setSelectedIndex((prev) => (prev - 1 + oilPieces.length) % oilPieces.length);
  const goNext = () =>
    setSelectedIndex((prev) => (prev + 1) % oilPieces.length);

  // Reveal on scroll
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Mouse tilt for cards
  useEffect(() => {
    if (!isMinis) return;
    const cards = Array.from(document.querySelectorAll('.masonry-item'));
    const enter = (e) => e.currentTarget.style.setProperty('--elev', '1');
    const move = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
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
  }, [isMinis]);

  return (
    <div className="oils-gallery-page">
      <Header />

      <div className="oils-gallery-header">
        <div className="oils-breadcrumb">
          <Link to="/oils">Oil paintings</Link>
          <span className="breadcrumb-sep"> → </span>
          <span>{title}</span>
        </div>
        <h1 className="section-title">{title}</h1>
      </div>

      <section className="gallery-section oils-gallery-section">
        <div className="masonry-grid">
          {isMinis
            ? pieces.map((piece, index) => (
                <button
                  key={piece.title + index}
                  className="masonry-item reveal"
                  onClick={() => openModalAt(index)}
                  aria-label={`Open ${piece.title}`}
                >
                  <img src={piece.url} alt={piece.title} />
                  <span className="masonry-caption">{piece.title}</span>
                </button>
              ))
            : Array.from({ length: LARGE_PLACEHOLDER_COUNT }).map((_, i) => (
                <div key={i} className="masonry-item oils-placeholder-item reveal">
                  <div className="oils-placeholder-img" />
                </div>
              ))}
        </div>
      </section>

      {isMinis && oilPieces.length > 0 && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageUrl={oilPieces[selectedIndex]?.url}
          title={oilPieces[selectedIndex]?.title}
          description={oilPieces[selectedIndex]?.description}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}

export default OilsGallery;
