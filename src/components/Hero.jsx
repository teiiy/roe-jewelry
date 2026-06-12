import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="hero-text"
        >
          <h1>ROE — AFFORDABLE LUXURY.</h1>
          <h2>COLLECTION ÉTOILE.</h2>
        </motion.div>
      </div>
      <div className="hero-image-container">
        <motion.img 
          style={{ y }}
          src="/src/assets/images/hero_banner.png" 
          alt="ROE Luxury Collection" 
          className="hero-image"
        />
      </div>
    </section>
  );
};

export default Hero;
