import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import './Liked.css';

const Liked = () => {
  const { products, wishlist } = useApp();

  // Filter products that are currently in the wishlist
  const likedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="liked-page container">
      {/* Editorial Header */}
      <header className="liked-header">
        <span className="liked-eyebrow">YOUR FAVORITES</span>
        <h1 className="liked-title">Liked Pieces</h1>
        <p className="liked-description">
          A curated collection of your favorite signature designs. Hand-selected pieces saved for your wardrobe.
        </p>
      </header>

      {/* Grid of Liked Products */}
      {likedProducts.length === 0 ? (
        <div className="no-liked-found">
          <p>Your list of liked pieces is currently empty.</p>
          <Link to="/shop" className="discover-btn">
            Discover the Collection
          </Link>
        </div>
      ) : (
        <div className="liked-grid">
          {likedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Liked;
