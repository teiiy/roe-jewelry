import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  { 
    id: 1, 
    name: "Eleanor V.", 
    text: "The craftsmanship is unparalleled. My bangle catches the light beautifully. Every piece is an heirloom crafted to command a room.",
    image: "/src/assets/images/gallery_scroll_1.png"
  },
  { 
    id: 2, 
    name: "Sophia M.", 
    text: "Absolutely stunning. Affordable luxury that truly feels premium. I am constantly asked about my jewelry whenever I wear it out.",
    image: "/src/assets/images/gallery_scroll_2.png"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials container">
      <h2 className="section-title">CUSTOMER REVIEWS & GALLERY</h2>
      <motion.div
        className="testimonials-wrapper"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="reviews-section">
          {testimonials.map((t) => (
            <div key={t.id} className="review-card">
              <div className="stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#B5935A" color="#B5935A" />)}
              </div>
              <p className="review-text">"{t.text}"</p>
              <img src={t.image} alt={t.name} className="review-image" />
            </div>
          ))}
        </div>
        
        <div className="gallery-section">
          <div className="gallery-scroll-container">
            <div className="gallery-item"><img src="/src/assets/images/gallery_1.png" alt="Gallery 1" /></div>
            <div className="gallery-item"><img src="/src/assets/images/gallery_2.png" alt="Gallery 2" /></div>
            <div className="gallery-item"><img src="/src/assets/images/gallery_3.png" alt="Gallery 3" /></div>
            <div className="gallery-item"><img src="/src/assets/images/product_bangle.png" alt="Gallery 4" /></div>
            <div className="gallery-item"><img src="/src/assets/images/product_ring.png" alt="Gallery 5" /></div>
            <div className="gallery-item"><img src="/src/assets/images/product_studs.png" alt="Gallery 6" /></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
