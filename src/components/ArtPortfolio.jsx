import React, { useState, useEffect } from 'react';
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

const artPieces = [
  {
    url: art1,
    description: 'Kotel Man'
  },
  {
    url: art2,
    description: 'The Rebbe'
  },
  {
    url: art4,
    description: 'Anniversary'
  }
];

function ArtPortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aboutMeText, setAboutMeText] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        className="custom-arrow custom-arrow-prev"
        aria-label={label}
      >
        &#10094; {/* Left arrow symbol */}
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
        &#10095; {/* Right arrow symbol */}
      </button>
    );


  return (
    <div className="art-portfolio">
      <Header />
      <div id="title" className="content-wrapper">
        <div className="description" style={{ textAlign: 'center' }}>
          <h1>Devorah Morrison Nafcha</h1>
          <p>Swipe or use the arrows to explore the gallery.</p>
        </div>
        <div id="gallery" className="carousel-container">
          <Carousel
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
            swipeable={true}
            emulateTouch={true}
            autoPlay={true}
            interval={7000}
            centerMode={true}
            centerSlidePercentage={isMobile ? 85 : 50}
            verticalSwipe={'natural'}
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
          <p className="legend">{artPieces[currentIndex].description}</p>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          imageUrl={artPieces[currentIndex].url}
        />
        <div id="about-me">
          <AboutMe text={aboutMeText} />
        </div>
      </div>
    </div>
  );
}

export default ArtPortfolio;