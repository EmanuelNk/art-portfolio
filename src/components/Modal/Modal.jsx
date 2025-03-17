import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, imageUrl, title, description }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={imageUrl} alt="Art Piece" className="modal-image" />
        <div className="modal-description">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;