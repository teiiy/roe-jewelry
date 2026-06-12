import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">ROE</a>
        </div>
        
        <ul className="navbar-links">
          <li><a href="#new-in">NEW IN</a></li>
          <li><a href="#necklaces">NECKLACES</a></li>
          <li><a href="#bracelets">BRACELETS</a></li>
          <li><a href="#fine-jewelry">FINE JEWELRY</a></li>
          <li><a href="#about">ABOUT</a></li>
        </ul>

        <div className="navbar-icons">
          <button aria-label="Search">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Shopping Bag">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
