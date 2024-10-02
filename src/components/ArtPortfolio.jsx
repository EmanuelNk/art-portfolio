import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import './ArtPortfolio.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from './Modal/Modal';
import aboutMeTextURL from '../assets/text/aboutMe.txt';
import AboutMe from './AboutMe/AboutMe';

const artPieces = [
  {
    url: 'https://picsum.photos/id/239/1000/700',
    description: 'This Is A Description For Art Piece 1'
  },
  {
    url: 'https://picsum.photos/id/240/1000/800',
    description: 'Art Piece 2 Description'
  },
  {
    url: 'https://picsum.photos/id/241/1200/600',
    description: 'A Landscape Painting'
  },
  {
    url: 'https://picsum.photos/id/242/1000',
    description: 'Some Random Art Piece'
  },
  // Add more images as needed
];

function ArtPortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aboutMeText, setAboutMeText] = useState('');

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
      <div className="description" style={{ textAlign: 'center' }}>
        <h1>Devorah Morrison Nafcha</h1>
        <p>Swipe or use the arrows to explore the gallery.</p>
      </div>
      <div className="carousel-container">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          useKeyboardArrows={true}
          dynamicHeight={true}
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
          centerSlidePercentage={50}
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
      <AboutMe text={aboutMeText} />
    </div>
  );
}

export default ArtPortfolio;