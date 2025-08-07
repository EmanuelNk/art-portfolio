import React, { useState } from 'react';
import './ArtPortfolio.css';
import Modal from './Modal/Modal';
import AboutMe from './AboutMe/AboutMe';
import Header from './Header/Header';
import art1 from '../assets/images/art/art1.JPG';
import art2 from '../assets/images/art/art2.JPG';
import art4 from '../assets/images/art/art4.jpg';
import art5 from '../assets/images/art/art5.jpg';
import art6 from '../assets/images/art/art6.jpg';
import art7 from '../assets/images/art/art7.jpg';
import { FaPhone, FaEnvelope, FaInstagram } from 'react-icons/fa';

const artPieces = [
  {
    url: art1,
    title: 'The Mourner',
    description: ''//"This portrait is of a man at the western wall during Tisha B'Av. It holds a special place in my heart. I started it on October 2nd 2024, working on it between bomb shelter runs. The reference for this piece is part of @_noamphotography's collection."
  },
  {
    url: art4,
    title: 'Anniversary',
    description: ''//"This portrait is a huge milestone for me as an artist, filled with sentimental value. It celebrates my parents’ love and marks several personal milestones—it’s my first portrait from my first apartment and the first where I really pushed my attention to detail. I know my 12-year-old self would be amazed by how far I’ve come."
  },
  {
    url: art5,
    title: 'Avi & Olivia',
    description: ''
  },
  {
    url: art7,
    title: 'Lily',
    description: ''//'This portrait is one of my favorites. I created it during a visit to my hometown in the States—where my art journey began. I was twenty when I drew this, and by then I had been drawing portraits for over 7 years. It captures a special moment in my growth as an artist.'
  },
  {
    url: art6,
    title: 'Yacov & Emunah',
    description: ''
  },
  {
    url: art2,
    title: 'The Rebbe',
    description: ''//'This portrait is one of my favorites. I created it during a visit to my hometown in the States—where my art journey began. I was twenty when I drew this, and by then I had been drawing portraits for over 7 years. It captures a special moment in my growth as an artist.'
  }

];

function ArtPortfolio() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalAt = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="art-portfolio">
      <Header />

      <section id="title" className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Devorah Morrison Nafcha</h1>
          <p className="hero-subtitle">portrait artist</p>
          <div className="hero-ctas">
            <a href="#gallery" className="btn btn-primary">View Gallery</a>
            <a href="#contact" className="btn btn-ghost">Contact</a>
          </div>
        </div>
        <div className="hero-backdrop" aria-hidden="true" />
      </section>

      <section id="gallery" className="gallery-section">
        <h2 className="section-title">Gallery</h2>
        <div className="masonry-grid">
          {artPieces.map((artPiece, index) => (
            <button
              key={artPiece.title + index}
              className="masonry-item"
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
      />

      <div id="about-me">
        <AboutMe />
      </div>

      <section id="contact" className="contact-section">
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
    </div>
  );
}

export default ArtPortfolio;