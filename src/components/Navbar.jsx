import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Navbar.css';

const Navbar = () => {
  const { totalItems, setIsCartOpen } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom scroll to anchor helper
  const handleAboutClick = () => {
    if (location.pathname === '/') {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If on another page, let the navigation occur, and then scroll can happen
      setTimeout(() => {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">ROE</Link>
        </div>
        
        <ul className="navbar-links">
          <li><Link to="/shop">SHOP ALL</Link></li>
          <li><Link to="/shop?category=necklaces">NECKLACES</Link></li>
          <li><Link to="/shop?category=bracelets">BRACELETS</Link></li>
          <li><Link to="/shop?category=fine-jewelry">FINE JEWELRY</Link></li>
          <li><Link to="/" onClick={handleAboutClick}>ABOUT</Link></li>
        </ul>

        <div className="navbar-icons">
          <button aria-label="Search">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button aria-label="Shopping Bag" onClick={() => setIsCartOpen(true)} className="cart-btn">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
    </nav>
  );
};

export default Navbar;
