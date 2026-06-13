import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Lightbox.css';

const galleryImages = [
  "/src/assets/images/gallery_1.png",
  "/src/assets/images/gallery_2.png",
  "/src/assets/images/gallery_3.png",
  "/src/assets/images/product_bangle.png",
  "/src/assets/images/product_ring.png",
  "/src/assets/images/product_studs.png"
];

const Lightbox = () => {
  const { activeLightboxImage, setActiveLightboxImage } = useApp();

  useEffect(() => {
    if (activeLightboxImage) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [activeLightboxImage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeLightboxImage) return;
      if (e.key === 'Escape') setActiveLightboxImage(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxImage]);

  if (!activeLightboxImage) return null;

  const currentIndex = galleryImages.indexOf(activeLightboxImage);

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setActiveLightboxImage(galleryImages[nextIndex]);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setActiveLightboxImage(galleryImages[prevIndex]);
  };

  return (
    <AnimatePresence>
      <div className="lightbox-wrapper" onClick={() => setActiveLightboxImage(null)}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lightbox-backdrop"
        />

        <button
          onClick={() => setActiveLightboxImage(null)}
          className="lightbox-close-btn"
          aria-label="Close preview"
        >
          <X size={24} strokeWidth={1.5} />
        </button>

        {/* Prev Arrow */}
        <button
          onClick={handlePrev}
          className="lightbox-nav-btn prev-btn"
          aria-label="Previous image"
        >
          <ChevronLeft size={36} strokeWidth={1} />
        </button>

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lightbox-image-container"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={activeLightboxImage}
            alt="Gallery Preview"
            className="lightbox-image"
          />
        </motion.div>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="lightbox-nav-btn next-btn"
          aria-label="Next image"
        >
          <ChevronRight size={36} strokeWidth={1} />
        </button>

        {/* Counter */}
        <div className="lightbox-counter" onClick={(e) => e.stopPropagation()}>
          {currentIndex + 1} / {galleryImages.length}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Lightbox;
