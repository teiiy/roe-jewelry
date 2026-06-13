import React, { useEffect, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (hidden) setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const handleLinkHoverEvents = () => {
      const targets = document.querySelectorAll(
        'a, button, .product-card, .gallery-item, .add-to-bag-btn, .shop-all-btn, .navbar-logo'
      );
      targets.forEach((el) => {
        el.addEventListener('mouseover', () => setHovered(true));
        el.addEventListener('mouseout', () => setHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();

    // Re-bind hover events periodically for dynamically loaded components
    const interval = setInterval(handleLinkHoverEvents, 1500);

    return () => {
      removeEventListeners();
      clearInterval(interval);
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <>
      <div
        className={`custom-cursor-dot ${hovered ? 'hovered' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div
        className={`custom-cursor-ring ${hovered ? 'hovered' : ''}`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
};

export default CustomCursor;
