import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-responsive-carousel';
import './ArtPortfolio.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from './Modal/Modal';
import aboutMeTextURL from '../assets/text/aboutMe.txt';
import AboutMe from './AboutMe/AboutMe';
import Header from './Header/Header';
import art1 from '../assets/images/art/art1.JPG';
import art2 from '../assets/images/art/art2.JPG';
import art4 from '../assets/images/art/art4.jpg';
import { FaPhone, FaEnvelope, FaInstagram } from 'react-icons/fa';

const artPieces = [
  {
    url: art1,
    title: 'Temple Mourning',
    description: "This portrait is of a man at the western wall during Tisha B'Av. It holds a special place in my heart. I started it on October 2nd 2024, working on it between bomb shelter runs. The reference for this piece is part of @_noamphotography's collection."
  },
  {
    url: art2,
    title: 'The Rebbe',
    description: 'This portrait is one of my favorites. I created it during a visit to my hometown in the States—where my art journey began. I was twenty when I drew this, and by then I had been drawing portraits for over 7 years. It captures a special moment in my growth as an artist.'
  },
  {
    url: art4,
    title: 'Anniversary',
    description: "This portrait is a huge milestone for me as an artist, filled with sentimental value. It celebrates my parents’ love and marks several personal milestones—it’s my first portrait from my first apartment and the first where I really pushed my attention to detail. I know my 12-year-old self would be amazed by how far I’ve come."
  }
];

function ArtPortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aboutMeText, setAboutMeText] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);

  // Fetch the text file content when the component mounts
  useEffect(() => {
    fetch(aboutMeTextURL)
      .then((response) => response.text())
      .then((text) => {
        setAboutMeText(text);
      })
      .catch((error) => {
        console.error('Error fetching the about me text:', error);
      });
  }, []);

  // Add responsive listener for screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (index) => {
    setCurrentIndex(index);
  };

  const handleImageClick = () => {
    console.log(`Image at index ${currentIndex} clicked`);
    setIsModalOpen(true);
    // Stop the carousel autoplay when opening the modal
    setIsAutoPlaying(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Resume the carousel autoplay when closing the modal
    setIsAutoPlaying(true);
  };

  const renderArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        className="custom-arrow custom-arrow-prev"
        aria-label={label}
      >
        &#10094;
      </button>
    );

  const renderArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        className="custom-arrow custom-arrow-next"
        aria-label={label}
      >
        &#10095;
      </button>
    );

  return (
    <div className="art-portfolio">
      <Header />
      <div id="title" className="content-wrapper">
        <div className="description" style={{ textAlign: 'center' }}>
          <h1>Hi, I'm Devorah</h1>
          <h3>portrait artist</h3>
          <p>Swipe or use the arrows to explore the gallery.</p>
          <p> Click on an image to learn more about the piece.</p>
        </div>
        <div id="gallery" className="carousel-container">
          <Carousel
            ref={carouselRef}
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            useKeyboardArrows={true}
            dynamicHeight={!isMobile}
            selectedItem={currentIndex}
            onChange={handleChange}
            onClickItem={handleImageClick}
            transitionTime={2000}
            stopOnHover={true}
            swipeable={!isModalOpen}
            emulateTouch={!isModalOpen}
            autoPlay={isAutoPlaying}
            interval={7000}
            centerMode={true}
            centerSlidePercentage={isMobile ? 85 : 50}
            verticalSwipe={isModalOpen ? 'none' : 'natural'}
            labels={{ leftArrow: 'Previous', rightArrow: 'Next' }}
            renderArrowPrev={renderArrowPrev}
            renderArrowNext={renderArrowNext}
            showIndicators={false}
          >
            {artPieces.map((artPiece, index) => (
              <div key={index}>
                <img
                  src={artPiece.url}
                  alt={`Art Piece ${index + 1}`}
                  onClick={handleImageClick}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="description-container">
          <p className="legend">{artPieces[currentIndex].title}</p>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          imageUrl={artPieces[currentIndex].url}
          title={artPieces[currentIndex].title}
          description={artPieces[currentIndex].description}
        />
        <div id="about-me">
          <AboutMe text={aboutMeText} />
        </div>
        <div id="contact" className="contact-section">
          <h2>Contact</h2>
          <div className="contact-icons">
            <a href="tel:+1234567890" title="Call me">
              <FaPhone className="contact-icon" />
              <span>Call</span>
            </a>
            <a href="mailto:your.email@example.com" title="Email me">
              <FaEnvelope className="contact-icon" />
              <span>Email</span>
            </a>
            <a href="https://instagram.com/your-instagram" target="_blank" rel="noopener noreferrer" title="Follow me on Instagram">
              <FaInstagram className="contact-icon" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtPortfolio;