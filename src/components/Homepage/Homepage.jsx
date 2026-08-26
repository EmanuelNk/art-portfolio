import React, { useRef, useEffect, useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import heroImage from '../../assets/images/profile6.jpg';
import './Homepage.css';

// Inserts Cloudinary transformation params into an upload URL
const thumb = (url, w = 520) =>
  url.replace('/upload/', `/upload/w_${w},f_auto,q_auto,c_limit/`);

// Cloudinary URLs (full resolution — used for modals)
const GRAPHITE = {
  art1: 'https://res.cloudinary.com/djm9plswu/image/upload/v1776158749/art1_ultmoh.jpg',
  art2: 'https://res.cloudinary.com/djm9plswu/image/upload/v1776158748/art2_fnm7l6.jpg',
  art4: 'https://res.cloudinary.com/djm9plswu/image/upload/v1776158743/art4_alo7td.jpg',
  art5: 'https://res.cloudinary.com/djm9plswu/image/upload/v1776158742/art5_obj5ra.jpg',
  art6: 'https://res.cloudinary.com/djm9plswu/image/upload/v1776158741/art6_fksbcf.jpg',
  art7: 'https://res.cloudinary.com/djm9plswu/image/upload/v1776159121/art7_y0t29m.jpg',
  art8: 'https://res.cloudinary.com/djm9plswu/image/upload/v1776158740/art8_ktadb8.jpg',
};
const OIL = {
  walletMan:        'https://res.cloudinary.com/djm9plswu/image/upload/v1787744814/BCA00785-2_ygkfb5.jpg',
  viennaRestaurant: 'https://res.cloudinary.com/djm9plswu/image/upload/v1787744815/BCA00653_vha16l.jpg',
  selfPortrait2026: 'https://res.cloudinary.com/djm9plswu/image/upload/v1787744889/BCA00713_aaxbbj.jpg',
  emanuel2026:      'https://res.cloudinary.com/djm9plswu/image/upload/v1776158693/BCA00567-3_baunfa.jpg',
  amicalolaFalls:   'https://res.cloudinary.com/djm9plswu/image/upload/v1787744609/BCA00754_on3wne.jpg',
  ashevilleFall:    'https://res.cloudinary.com/djm9plswu/image/upload/v1787744609/BCA00736_qgckg6.jpg',
  georgiaHouse:     'https://res.cloudinary.com/djm9plswu/image/upload/v1787744609/BCA00733_hif1dk.jpg',
  pinkFlowers:      'https://res.cloudinary.com/djm9plswu/image/upload/v1787744916/BCA00694_lkihad.jpg',
};

// Split-section preview cards (medium size)
const graphite1 = thumb(GRAPHITE.art2, 700);
const graphite2 = thumb(GRAPHITE.art1, 700);
const oil1 = thumb(OIL.walletMan, 700);
const oil2 = thumb(OIL.viennaRestaurant, 700);


const graphitePieces = [
  { src: GRAPHITE.art5, thumbSrc: thumb(GRAPHITE.art5), alt: 'Avi & Olivia' },
  { src: GRAPHITE.art7, thumbSrc: thumb(GRAPHITE.art7), alt: 'Lily' },
  { src: GRAPHITE.art1, thumbSrc: thumb(GRAPHITE.art1), alt: 'The Mourner' },
  { src: GRAPHITE.art2, thumbSrc: thumb(GRAPHITE.art2), alt: 'The Rebbe' },
  { src: GRAPHITE.art6, thumbSrc: thumb(GRAPHITE.art6), alt: 'Yacov & Emunah' },
  { src: GRAPHITE.art8, thumbSrc: thumb(GRAPHITE.art8), alt: 'Tefillin' },
  { src: GRAPHITE.art4, thumbSrc: thumb(GRAPHITE.art4), alt: 'Anniversary' },
];

// The carousel centers on the middle item (index floor(count/2)) at load,
// so Wallet Man sits there; cyclic order from it: Vienna → portraits → fall → Pink Flowers.
const oilPieces = [
  { src: OIL.amicalolaFalls,   thumbSrc: thumb(OIL.amicalolaFalls),   alt: 'Amicalola Falls' },
  { src: OIL.ashevilleFall,    thumbSrc: thumb(OIL.ashevilleFall),    alt: 'Asheville Fall' },
  { src: OIL.georgiaHouse,     thumbSrc: thumb(OIL.georgiaHouse),     alt: 'Georgia House' },
  { src: OIL.pinkFlowers,      thumbSrc: thumb(OIL.pinkFlowers),      alt: 'Pink Flowers' },
  { src: OIL.walletMan,        thumbSrc: thumb(OIL.walletMan),        alt: 'Wallet Man' },
  { src: OIL.viennaRestaurant, thumbSrc: thumb(OIL.viennaRestaurant), alt: 'Vienna Restaurant' },
  { src: OIL.selfPortrait2026, thumbSrc: thumb(OIL.selfPortrait2026), alt: 'Self Portrait 2026' },
  { src: OIL.emanuel2026,      thumbSrc: thumb(OIL.emanuel2026),      alt: 'Emanuel 2026' },
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
              <img src={img.thumbSrc || img.src} alt={img.alt} draggable="false" loading="eager" />
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
          images={oilPieces}
          label="Oil paintings"
          onItemClick={(i) => openModal(oilPieces, i)}
        />
        <FocusCarousel
          images={graphitePieces}
          label="Graphite"
          onItemClick={(i) => openModal(graphitePieces, i)}
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
