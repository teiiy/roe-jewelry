import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  // Animation variants for staggering text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-content"
        >
          <motion.div variants={itemVariants} className="hero-eyebrow">
            COLLECTION ÉTOILE
          </motion.div>
          <motion.h1 variants={itemVariants} className="hero-title">
            ROE — <br/>
            <span className="serif-italic">Affordable Luxury</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="hero-description">
            Sculpted in tarnish-free 18K gold and adorned with brilliant emerald-cut accents. Designed to blend timeless classicism with modern structure.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-actions">
            <Link to="/shop" className="hero-cta-btn">
              Explore Collection
              <span className="btn-line"></span>
            </Link>
          </motion.div>
        </motion.div>

        <div className="hero-image-wrapper">
          <motion.div 
            className="hero-image-frame"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.img
              style={{ y }}
              src="/src/assets/images/hero_banner.png"
              alt="ROE Luxury Jewelry"
              className="hero-image"
            />
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hero-scroll-indicator"
      >
        <span className="scroll-text">SCROLL TO EXPLORE</span>
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
