import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './BrandStory.css';

const BrandStory = () => {
  const containerRef = useRef(null);

  // Subtle parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], [-60, -10]);

  return (
    <section ref={containerRef} className="brand-story container" id="about">
      <div className="brand-story-grid">

        {/* Column 1: Visual Composition */}
        <div className="story-visuals">
          <div className="main-image-frame">
            <img
              src="/src/assets/images/brand_story.png"
              alt="Luxury finished jewelry close-up"
              className="main-story-image"
            />
          </div>

          {/* Overlapping Parallax Inset */}
          <motion.div
            style={{ y: yOffset }}
            className="floating-inset-frame"
          >
            <img
              src="/src/assets/images/bs_mosaic_1.png"
              alt="Craftsmanship concept sketch"
              className="inset-story-image"
            />
            <div className="inset-caption">01 / CONCEPT SKETCH</div>
          </motion.div>
        </div>

        {/* Column 2: Structured Editorial Content */}
        <div className="story-content">
          <span className="story-eyebrow">OUR PHILOSOPHY</span>
          <h2 className="story-heading">Timeless Form &<br />Structural Balance</h2>

          <div className="story-paragraphs">
            <p>
              ROE Accessories is born from a desire to blend flawless classicism and high-end craftsmanship with specialty fine jewelry. We reject mass production to focus entirely on rarity, structural balance, and the captivating play of light against precious metals.
            </p>
            <p className="secondary-p">
              Each piece is meticulously designed in-house, focusing on the weight, drape, and light reflection of 18K tarnish-free gold plating.
            </p>
          </div>

          {/* Key Design Pillars */}
          <div className="story-pillars">
            <div className="pillar-item">
              <span className="pillar-bullet">✦</span>
              <div>
                <h4>Rarity & Intention</h4>
                <p>Limited batch releases ensuring your heirloom remains truly unique.</p>
              </div>
            </div>
            <div className="pillar-item">
              <span className="pillar-bullet">✦</span>
              <div>
                <h4>Ethical Metals</h4>
                <p>Conflict-free gemstones set in responsibly-refined tarnish-free gold.</p>
              </div>
            </div>
          </div>

          <blockquote className="story-blockquote">
            "Every piece is designed to be an heirloom, crafted to command a room."
          </blockquote>
        </div>

      </div>
    </section>
  );
};

export default BrandStory;
