import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Heart, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './ProductDetailModal.css';

const ProductDetailModal = () => {
  const { selectedProduct, setSelectedProduct, addToCart, toggleWishlist, isInWishlist } = useApp();

  const availableFinishes = selectedProduct ? (selectedProduct.finishes || ['Yellow Gold', 'Rose Gold', 'White Gold']) : [];
  const availableSizes = selectedProduct ? (selectedProduct.sizes || ['Small', 'Medium', 'Large']) : [];

  const [selectedGold, setSelectedGold] = useState('Yellow Gold');
  const [selectedSize, setSelectedSize] = useState('Medium');

  useEffect(() => {
    if (selectedProduct) {
      setSelectedGold(selectedProduct.finishes && selectedProduct.finishes.length > 0 ? selectedProduct.finishes[0] : 'Yellow Gold');
      setSelectedSize(selectedProduct.sizes && selectedProduct.sizes.length > 0 ? selectedProduct.sizes[0] : 'Medium');
    }
  }, [selectedProduct]);

  // Lock scroll when open
  useEffect(() => {
    if (selectedProduct) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [selectedProduct]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProduct]);

  if (!selectedProduct) return null;

  const handleAddToBag = () => {
    // Add additional selection info to product
    const productWithPrefs = {
      ...selectedProduct,
      title: `${selectedProduct.title} (${selectedGold} / ${selectedSize})`,
      // Custom unique ID so different metal types are treated as separate items
      id: `${selectedProduct.id}-${selectedGold.replace(/\s+/g, '-').toLowerCase()}-${selectedSize.toLowerCase()}`,
    };
    addToCart(productWithPrefs);
    setSelectedProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="modal-wrapper">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProduct(null)}
          className="modal-backdrop"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="modal-panel"
        >
          <button
            onClick={() => setSelectedProduct(null)}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <div className="modal-content-grid">
            {/* Image Gallery Column */}
            <div className="modal-image-col">
              <div className="modal-image-wrapper">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="modal-main-image"
                />
              </div>
            </div>

            {/* Product Info Column */}
            <div className="modal-info-col">
              <span className="info-brand">ROE ACCESSORIES</span>
              <h2 className="info-title">{selectedProduct.title}</h2>
              <p className="info-price">${selectedProduct.price.toFixed(2)}</p>
              
              <div className="info-divider" />
              
              <p className="info-description">{selectedProduct.description}</p>

              {/* Preferences selectors */}
              <div className="selector-group">
                <span className="selector-label">Material & Finish</span>
                <div className="gold-selector-options">
                  {availableFinishes.map((gold) => (
                    <button
                      key={gold}
                      onClick={() => setSelectedGold(gold)}
                      className={`option-chip ${selectedGold === gold ? 'active' : ''}`}
                    >
                      {gold}
                    </button>
                  ))}
                </div>
              </div>

              <div className="selector-group">
                <span className="selector-label">Select Size</span>
                <div className="size-selector-options">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`size-chip ${selectedSize === size ? 'active' : ''}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Bag Button */}
              <div className="modal-actions-row">
                <button onClick={handleAddToBag} className="modal-add-btn">
                  Add to Shopping Bag
                </button>
                <button 
                  onClick={() => toggleWishlist(selectedProduct.id)} 
                  className={`wishlist-btn ${isInWishlist(selectedProduct.id) ? 'active' : ''}`}
                  aria-label="Add to wishlist"
                >
                  <Heart 
                    size={20} 
                    strokeWidth={1.5} 
                    fill={isInWishlist(selectedProduct.id) ? "#c93b3b" : "none"} 
                    color={isInWishlist(selectedProduct.id) ? "#c93b3b" : "currentColor"}
                  />
                </button>
              </div>

              <div className="info-divider" />

              {/* Guarantee badges */}
              <div className="modal-badges-grid">
                <div className="badge-item">
                  <ShieldCheck size={18} className="badge-icon" />
                  <div>
                    <h5>Lifetime Warranty</h5>
                    <p>Guaranteed tarnish-free, 18K solid gold plating.</p>
                  </div>
                </div>
                <div className="badge-item">
                  <Truck size={18} className="badge-icon" />
                  <div>
                    <h5>Complimentary Shipping</h5>
                    <p>Fully insured standard shipping on all purchases.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductDetailModal;
