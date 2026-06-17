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
          <h2 className="story-heading">Timeless Elegance &<br />Structural Balance</h2>

          <div className="story-paragraphs">
            <p>
              ROE Accessories is born from a desire to curate the finest modern classics and high-end jewelry. We partner with elite artisans to offer premium pieces, focusing entirely on design excellence, structural balance, and the captivating play of light against precious metals.
            </p>
            <p className="secondary-p">
              Each collection is meticulously hand-selected, focusing on the weight, drape, and light reflection of 18K tarnish-free gold plating.
            </p>
          </div>

          {/* Key Design Pillars */}
          <div className="story-pillars">
            <div className="pillar-item">
              <span className="pillar-bullet">✦</span>
              <div>
                <h4>Curated Selection</h4>
                <p>Limited boutique collections ensuring your selected piece remains truly unique.</p>
              </div>
            </div>
            <div className="pillar-item">
              <span className="pillar-bullet">✦</span>
              <div>
                <h4>Premium Sourcing</h4>
                <p>Hand-selected conflict-free gemstones set in tarnish-free, responsibly-plated gold.</p>
              </div>
            </div>
          </div>

          <blockquote className="story-blockquote">
            "Every piece in our boutique is hand-selected to be an heirloom, curated to command a room."
          </blockquote>
        </div>

      </div>
    </section>
  );
};

export default BrandStory;
