import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import heroImage from '../../assets/images/profile6.jpg';
import graphite1 from '../../assets/images/art/art2.JPG';
import graphite2 from '../../assets/images/art/art1.JPG';
import oil1 from '../../assets/images/art/oil-large/Emanuel-in-oil.jpg';
import oil2 from '../../assets/images/art/oil/blood-orange.jpg';
import oil3 from '../../assets/images/art/oil-large/couple-in-rome.jpg';
import './Homepage.css';

import cArt1 from '../../assets/images/art/art1.JPG';
import cArt2 from '../../assets/images/art/art2.JPG';
import cArt4 from '../../assets/images/art/art4.jpg';
import cArt5 from '../../assets/images/art/art5.jpg';
import cArt6 from '../../assets/images/art/art6.jpg';
import cArt7 from '../../assets/images/art/art7.jpg';
import cArt8 from '../../assets/images/art/art8.jpg';
import oLargeCoupleInRome from '../../assets/images/art/oil-large/couple-in-rome.jpg';
import oLargeEmanuelInOil from '../../assets/images/art/oil-large/Emanuel-in-oil.jpg';
import oMini1 from '../../assets/images/art/oil/blood-orange.jpg';
import oMini2 from '../../assets/images/art/oil/bottles.jpg';
import oMini3 from '../../assets/images/art/oil/flowers-1.jpg';
import oMini4 from '../../assets/images/art/oil/fruits.jpg';
import oMini5 from '../../assets/images/art/oil/lemons.jpeg';
import oMini6 from '../../assets/images/art/oil/pumpkins.jpg';


const graphitePieces = [
  { src: cArt5, alt: 'Avi & Olivia' },
  { src: cArt7, alt: 'Lily' },
  { src: cArt1, alt: 'The Mourner' },
  { src: cArt2, alt: 'The Rebbe' }, // First focus carousel piece
  { src: cArt6, alt: 'Yacov & Emunah' }, // Second featured piece
  { src: cArt8, alt: 'Tefillin' }, // Third featured piece
  { src: cArt4, alt: 'Anniversary' }, // Fourth featured piece
];

const oilPieces = [
  { src: oMini2, alt: 'Bottles' },
  { src: oMini3, alt: 'Flowers' },
  { src: oMini1, alt: 'Blood Orange' },
  { src: oMini4, alt: 'Fruits' }, 
  { src: oLargeEmanuelInOil, alt: 'Emanuel in Oil' }, // First focus carousel piece
  { src: oLargeCoupleInRome, alt: 'Couple in Rome' }, // Second focus carousel piece
  { src: oMini5, alt: 'Lemons' }, // Third focus carousel piece
  { src: oMini6, alt: 'Pumpkins' }, // Fourth focus carousel piece
];

function FocusCarousel({ images, label, onItemClick }) {
  const trackRef = useRef(null);
  const jumping = useRef(false);
  const setWRef = useRef(0);
  const count = images.length;
  const tripled = useMemo(() => [...images, ...images, ...images], [images]);

  const updateFocus = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.offsetWidth / 2;
    track.querySelectorAll('.fc-item').forEach((item) => {
      const itemCenter = item.offsetLeft + item.offsetWidth / 2;
      const dist = Math.abs(center - itemCenter);
      const maxDist = track.offsetWidth * 0.28;
      const ratio = Math.min(dist / maxDist, 1);
      item.style.setProperty('--fc-scale', 1 - ratio * 0.18);
      item.style.setProperty('--fc-opacity', 1 - ratio * 0.85);
      item.style.setProperty('--fc-blur', `${ratio * 6}px`);
    });
  }, []);

  const initCarousel = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const items = Array.from(track.querySelectorAll('.fc-item'));
    if (items.length < count * 3) return;
    const setW = items[count].offsetLeft - items[0].offsetLeft;
    if (setW === 0) return;
    setWRef.current = setW;
    const centerOn = items[count + Math.floor(count / 2)];
    track.style.scrollSnapType = 'none';
    track.scrollLeft =
      centerOn.offsetLeft - track.offsetWidth / 2 + centerOn.offsetWidth / 2;
    updateFocus();
    requestAnimationFrame(() => { track.style.scrollSnapType = ''; });
  }, [count, updateFocus]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    initCarousel();

    // Re-init once images have loaded — scroll-snap can silently reposition
    // the track when image heights resolve, leaving blur/scale stale and
    // breaking the infinite-loop jump thresholds.
    const imgs = Array.from(track.querySelectorAll('img'));
    const onImageLoad = () => {
      if (imgs.every(img => img.complete)) initCarousel();
    };
    imgs.forEach(img => { if (!img.complete) img.addEventListener('load', onImageLoad); });

    const onScroll = () => {
      if (jumping.current) return;
      updateFocus();
      const setW = setWRef.current;
      if (!setW) return;
      if (track.scrollLeft < setW * 0.4) {
        jumping.current = true;
        track.style.scrollSnapType = 'none';
        track.scrollLeft += setW;
        updateFocus();
        requestAnimationFrame(() => { track.style.scrollSnapType = ''; jumping.current = false; });
      } else if (track.scrollLeft > setW * 1.6) {
        jumping.current = true;
        track.style.scrollSnapType = 'none';
        track.scrollLeft -= setW;
        updateFocus();
        requestAnimationFrame(() => { track.style.scrollSnapType = ''; jumping.current = false; });
      }
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', initCarousel);
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', initCarousel);
      imgs.forEach(img => img.removeEventListener('load', onImageLoad));
    };
  }, [count, updateFocus, initCarousel]);

  const scrollLeft = () => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: -(260 + 24), behavior: 'smooth' });
  };

  const scrollRight = () => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: 260 + 24, behavior: 'smooth' });
  };

  return (
    <div className="fc-row">
      <p className="fc-label">{label}</p>
      <div className="fc-track-wrapper">
        <button className="fc-arrow fc-arrow--left" onClick={scrollLeft} aria-label="Scroll left">
          ‹
        </button>
        <div className="fc-track" ref={trackRef}>
          {tripled.map((img, i) => (
            <button
              key={i}
              className="fc-item"
              onClick={() => onItemClick(i % count)}
              aria-label={`View ${img.alt}`}
            >
              <img src={img.src} alt={img.alt} draggable="false" loading="eager" />
            </button>
          ))}
        </div>
        <button className="fc-arrow fc-arrow--right" onClick={scrollRight} aria-label="Scroll right">
          ›
        </button>
      </div>
    </div>
  );
}

function Homepage() {
  const [modal, setModal] = useState(null);

  const openModal = (images, index) => setModal({ images, index });
  const closeModal = () => setModal(null);
  const goPrev = () =>
    setModal((m) => ({ ...m, index: (m.index - 1 + m.images.length) % m.images.length }));
  const goNext = () =>
    setModal((m) => ({ ...m, index: (m.index + 1) % m.images.length }));

  // Scroll progress bar
  useEffect(() => {
    const bar = document.querySelector('.scroll-progress');
    const onScroll = () => {
      const top = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? top / max : 0})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="homepage">
      <Header />
      <div className="scroll-progress" aria-hidden="true" />

      {/* ── HERO ── */}
      <section className="hero">
        <img className="hero-bg" src={heroImage} alt="" aria-hidden="true" />
        <div className="hero-fade-left" aria-hidden="true" />
        <div className="hero-fade-bottom" aria-hidden="true" />
        <div className="hero-fade-top" aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-name">
            <span>Madeline</span>
            <span>Claire</span>
            <span>Nafcha</span>
          </h1>
          <p className="hero-subtitle">Portrait Artist</p>
          <p className="hero-location">Jerusalem, Israel</p>
          <div className="hero-buttons">
            <Link to="/graphite" className="hero-btn hero-btn--default">Graphite works</Link>
            <Link to="/oils" className="hero-btn hero-btn--oil">Oil paintings</Link>
            <Link to="/contact" className="hero-btn hero-btn--default">Contact</Link>
          </div>
        </div>
      </section>

      {/* ── FOCUS CAROUSELS ── */}
      <section className="fc-section">
        <FocusCarousel
          images={graphitePieces}
          label="Graphite"
          onItemClick={(i) => openModal(graphitePieces, i)}
        />
        <FocusCarousel
          images={oilPieces}
          label="Oil paintings"
          onItemClick={(i) => openModal(oilPieces, i)}
        />
      </section>

      {/* ── MEDIUM SPLIT ── */}
      <section className="medium-split">
        <Link to="/graphite" className="split-half split-half--graphite">
          <div className="split-hover-overlay" />
          <div className="split-cards">
            <div className="split-card"><img src={graphite1} alt="Graphite work" /></div>
            <div className="split-card"><img src={graphite2} alt="Graphite work" /></div>
          </div>
          <div className="split-vignette" />
          <div className="split-label">
            <h2 className="split-title">Graphite</h2>
            <p className="split-sub">Portraits &amp; figures</p>
            <p className="split-cta">View gallery&nbsp;→</p>
          </div>
        </Link>
        <div className="split-divider" />
        <Link to="/oils" className="split-half split-half--oils">
          <div className="split-hover-overlay" />
          <div className="split-cards">
            <div className="split-card"><img src={oil1} alt="Oil painting" /></div>
            <div className="split-card"><img src={oil2} alt="Oil painting" /></div>
          </div>
          <div className="split-vignette" />
          <div className="split-label">
            <h2 className="split-title">Oil paintings</h2>
            <p className="split-sub">Still life · Portraits · Scenery</p>
            <p className="split-cta">View gallery&nbsp;→</p>
          </div>
        </Link>
      </section>

      {/* ── CAROUSEL MODAL ── */}
      {modal && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          imageUrl={modal.images[modal.index].src}
          title={modal.images[modal.index].alt}
          description=""
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}

export default Homepage;
