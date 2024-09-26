import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import './ArtPortfolio.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from './Modal/Modal';

const artPieces = [
  {
    url: 'https://picsum.photos/id/239/1000/700',
    description: 'This is a description for Art Piece 1'
  },
  {
    url: 'https://picsum.photos/id/240/1000/800',
    description: 'Art Piece 2 Description'
  },
  {
    url: 'https://picsum.photos/id/241/1200/600',
    description: 'A landscape painting'
  },
  {
    url: 'https://picsum.photos/id/242/1000',
    description: 'Some random art piece'
  },
  // Add more images as needed
];

function ArtPortfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    </div>
  );
}

export default ArtPortfolio;