import React, { useEffect, useState } from 'react';
import './ArtPortfolio.css';
import Modal from './Modal/Modal';
import AboutMe from './AboutMe/AboutMe';
import Header from './Header/Header';
import heroPortrait from '../assets/images/profile5.jpg';
import artworks from '../data/artworks.json';
import { FaPhone, FaEnvelope, FaInstagram } from 'react-icons/fa';

// Build image map from filenames using require.context for bundlers
const imageContext = require.context('../assets/images/art', false, /\.(png|jpe?g|JPG)$/);
const artPieces = artworks.map(({ file, title, description }) => ({
  url: imageContext(`./${file}`),
  title,
  description,
}));

function ArtPortfolio() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const openModalAt = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const goPrev = () => {
    setSelectedIndex((prev) => (prev - 1 + artPieces.length) % artPieces.length);
  };

  const goNext = () => {
    setSelectedIndex((prev) => (prev + 1) % artPieces.length);
  };

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

  // Parallax backdrop and scroll progress + back-to-top
  useEffect(() => {
    const hero = document.querySelector('.hero');
    const backdrop = document.querySelector('.hero-backdrop');
    const progressBar = document.querySelector('.scroll-progress');

    const handleMouseMove = (e) => {
      if (!hero || !backdrop) return;
      const rect = hero.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      backdrop.style.transform = `translate3d(${cx * 24}px, ${cy * 18}px, 0)`;
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
      setShowBackToTop(scrollTop > 500);
    };

    hero?.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      hero?.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Mouse tilt for cards
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.masonry-item'));
    const enter = (e) => {
      const el = e.currentTarget;
      el.style.setProperty('--elev', '1');
    };
    const move = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotX = (0.5 - py) * 6; // max 6deg
      const rotY = (px - 0.5) * 8; // max 8deg
      el.style.setProperty('--rx', `${rotX}deg`);
      el.style.setProperty('--ry', `${rotY}deg`);
      el.style.setProperty('--mx', `${px}`);
      el.style.setProperty('--my', `${py}`);
    };
    const leave = (e) => {
      const el = e.currentTarget;
      el.style.removeProperty('--rx');
      el.style.removeProperty('--ry');
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
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
  }, [artPieces.length]);

  return (
    <div className="art-portfolio">
      <Header />

      <section id="title" className="hero">
        <img className="hero-bg" src={heroPortrait} alt="" aria-hidden="true" />
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-fade-left" aria-hidden="true" />
        <div className="hero-fade-right" aria-hidden="true" />
        <div className="hero-inner reveal">
          <div className="hero-copy">
            <h1 className="hero-title">
              <span>Devorah</span>
              <span>Morrison</span>
              <span>Nafcha</span>
            </h1>
            <p className="hero-subtitle">portrait artist</p>
            <div className="hero-ctas">
              <a href="#gallery" className="btn btn-primary">View Gallery</a>
              <a href="#contact" className="btn btn-ghost">Contact</a>
            </div>
          </div>
        </div>
      </section>

      <div className="scroll-progress" aria-hidden="true" />

      <section id="gallery" className="gallery-section">
        <h2 className="section-title reveal">Gallery</h2>
        <div className="masonry-grid">
          {artPieces.map((artPiece, index) => (
            <button
              key={artPiece.title + index}
              className="masonry-item reveal"
              onClick={() => openModalAt(index)}
              aria-label={`Open ${artPiece.title}`}
            >
              <img src={artPiece.url} alt={artPiece.title} />
              <span className="masonry-caption">{artPiece.title}</span>
            </button>
          ))}
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageUrl={artPieces[selectedIndex].url}
        title={artPieces[selectedIndex].title}
        description={artPieces[selectedIndex].description}
        onPrev={goPrev}
        onNext={goNext}
      />

      <div id="about-me" className="reveal">
        <AboutMe />
      </div>

      <section id="contact" className="contact-section reveal">
        <h2>Contact</h2>
        <div className="contact-icons">
          <a href="tel:+972533464716" title="Call me">
            <FaPhone className="contact-icon" />
          </a>
          <a href="mailto:Ariellamorrison03@gmail.com" title="Email me">
            <FaEnvelope className="contact-icon" />
          </a>
          <a
            href="https://www.instagram.com/mad_sketched_"
            target="_blank"
            rel="noopener noreferrer"
            title="Follow me on Instagram"
          >
            <FaInstagram className="contact-icon" />
          </a>
        </div>
      </section>

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

export default ArtPortfolio;