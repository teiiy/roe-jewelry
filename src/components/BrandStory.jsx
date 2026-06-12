import React from 'react';
import { motion } from 'framer-motion';
import './BrandStory.css';

const BrandStory = () => {
  return (
    <section className="brand-story container">
      <motion.div 
        className="brand-story-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="mosaic-item item-large">
          <img src="/src/assets/images/bs_mosaic_1.png" alt="Design Sketching" />
        </div>
        
        <div className="mosaic-item item-top">
          <img src="/src/assets/images/bs_mosaic_5.png" alt="Premium Packaging" />
        </div>
        
        <div className="brand-story-content">
          <h2>Brand Story &<br/>Craftsmanship</h2>
          <p>
            Our Story; ROE Accessories is born from a desire to blend flawless classicism and high-end craftsmanship to specialty jewelry. Our pieces are carefully designed and curated for sophistication. We reject mass production to focus entirely on rarity, structural balance, and the captivating play of light against precious metals.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default BrandStory;
