import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h3>ROE</h3>
        </div>
        
        <div className="footer-links-inline">
          <a href="#">Shop</a>
          <a href="#">FAQ</a>
          <a href="#">Contact</a>
        </div>
        
        <div className="footer-social">
          <a href="#" aria-label="Email"><Mail size={18} /></a>
          <a href="#" aria-label="Phone"><Phone size={18} /></a>
          <a href="#" aria-label="Location"><MapPin size={18} /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ROE Jewelry. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
