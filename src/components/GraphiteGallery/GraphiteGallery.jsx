import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import artworks from '../../data/artworks.json';
import '../ArtPortfolio.css';
import './GraphiteGallery.css';

const thumb = (url, w = 900) =>
  url.replace('/upload/', `/upload/w_${w},f_auto,q_auto,c_limit/`);

const artPieces = artworks.map(({ url, title, description, size }) => ({
  url,
  title,
  description,
  sizeText: size || '',
}));

function GraphiteGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const openModalAt = (i) => {
    setSelectedIndex(i);
    setIsModalOpen(true);
  };

  const goPrev = () =>
    setSelectedIndex((p) => (p - 1 + artPieces.length) % artPieces.length);
  const goNext = () =>
    setSelectedIndex((p) => (p + 1) % artPieces.length);

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
    const bar = document.querySelector('.scroll-progress');
    const onScroll = () => {
      const top = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? top / max : 0})`;
      setShowBackToTop(top > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
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
    <div className="graphite-page">
      <Header />
      <div className="scroll-progress" aria-hidden="true" />

      <section className="gallery-section">
        <h2 className="section-title reveal">Gallery</h2>
        <div className="masonry-grid">
          {artPieces.map((piece, index) => (
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={artPieces[selectedIndex].url}
        title={artPieces[selectedIndex].title}
        description={artPieces[selectedIndex].description}
        onPrev={goPrev}
        onNext={goNext}
      />

      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  );
}

export default GraphiteGallery;
