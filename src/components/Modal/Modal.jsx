import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>
        <img src={imageUrl} alt="Enlarged view" className="modal-image" />
      </div>
    </div>
  );
};

export default Modal;