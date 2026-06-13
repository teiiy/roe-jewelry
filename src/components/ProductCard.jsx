import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { setSelectedProduct, addToCart } = useApp();

  // Custom materials tag based on product ID
  const getMaterialTag = (id) => {
    switch(id) {
      case '1': return '18K Gold / Gemstones';
      case '2': return '18K Yellow Gold / Diamond-cut';
      case '3': return '18K Gold Plated / Emeralds';
      case '4': return '18K Solid Gold / Solitaire';
      default: return 'Fine Jewelry Collection';
    }
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-image" />
          <div className="product-hover-overlay">
            <button className="quick-view-badge" onClick={handleQuickView}>
              Quick View
            </button>
          </div>
        </div>
        <div className="product-info">
          <span className="product-tag">{getMaterialTag(product.id)}</span>
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button className="add-to-bag-btn" onClick={handleAddClick}>
        ADD TO BAG
      </button>
    </div>
  );
};

export default ProductCard;
