import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h3>
            <Link to="/" className="footer-logo-link">
              <img src="/src/assets/images/logo_stag_white.jpeg" alt="ROE Logo" className="footer-logo-image" />
              <span className="footer-logo-text">ROE</span>
            </Link>
          </h3>
        </div>
        
        <div className="footer-links-inline">
          <Link to="/shop">Shop</Link>
          <Link to="/liked">Liked Pieces</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/atelier-admin">Atelier Portal</Link>
        </div>
        
        <div className="footer-social">
          <a href="mailto:concierge@roe-jewelry.com" aria-label="Email"><Mail size={18} /></a>
          <a href="tel:+18007635393" aria-label="Phone"><Phone size={18} /></a>
          <a href="https://maps.google.com/?q=5th+Avenue+New+York+Luxury+Jewelry" target="_blank" rel="noopener noreferrer" aria-label="Location"><MapPin size={18} /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ROE Accessories. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
