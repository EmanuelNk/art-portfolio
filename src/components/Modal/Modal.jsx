import React, { useEffect, useRef, useState } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, imageUrl, title, description, onPrev, onNext }) {
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPoint, setLastPoint] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
      if (e.key === 'ArrowLeft') onPrev?.();
      if (e.key === 'ArrowRight') onNext?.();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  // Zoom with wheel
  useEffect(() => {
    if (!isOpen) return;
    const el = containerRef.current;
    const onWheel = (e) => {
      e.preventDefault();
      const delta = -Math.sign(e.deltaY) * 0.15; // zoom step
      setTransform((prev) => {
        const nextScale = Math.min(4, Math.max(1, prev.scale + delta));
        return { ...prev, scale: nextScale };
      });
    };
    el?.addEventListener('wheel', onWheel, { passive: false });
    return () => el?.removeEventListener('wheel', onWheel);
  }, [isOpen]);

  // Drag to pan
  useEffect(() => {
    if (!isOpen) return;
    const el = containerRef.current;
    const onDown = (e) => {
      if (transform.scale === 1) return;
      setIsDragging(true);
      setLastPoint({ x: e.clientX, y: e.clientY });
    };
    const onMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastPoint.x;
      const dy = e.clientY - lastPoint.y;
      setLastPoint({ x: e.clientX, y: e.clientY });
      setTransform((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
    };
    const onUp = () => setIsDragging(false);

    el?.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      el?.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [isOpen, isDragging, lastPoint.x, lastPoint.y, transform.scale]);

  // Reset zoom when image changes or modal closes
  useEffect(() => {
    if (!isOpen) return;
    setTransform({ scale: 1, x: 0, y: 0 });
  }, [imageUrl, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <button className="modal-arrow modal-arrow-left" onClick={onPrev} aria-label="Previous">&#10094;</button>
        <div className="modal-image-wrap" ref={containerRef}>
          <img
            ref={imgRef}
            src={imageUrl}
            alt={title}
            className={`modal-image${isDragging ? ' dragging' : ''}`}
            style={{ transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})` }}
            onDoubleClick={() => setTransform((p) => ({ scale: p.scale === 1 ? 2 : 1, x: 0, y: 0 }))}
            onClick={() => transform.scale === 1 && onNext?.()}
          />
        </div>
        <button className="modal-arrow modal-arrow-right" onClick={onNext} aria-label="Next">&#10095;</button>
        <div className="modal-description">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;