import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Heart, Truck, ArrowLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, products } = useApp();
  const [selectedGold, setSelectedGold] = useState('Yellow Gold');
  const [selectedSize, setSelectedSize] = useState('Medium');

  const product = products.find((p) => p.id === id);

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="product-not-found container">
        <h2>Piece Not Found</h2>
        <p>The structural design you are looking for is unavailable or has been archived.</p>
        <Link to="/shop" className="back-to-shop-btn">Return to Catalog</Link>
      </div>
    );
  }

  const handleAddToBag = () => {
    const productWithPrefs = {
      ...product,
      title: `${product.title} (${selectedGold} / ${selectedSize})`,
      id: `${product.id}-${selectedGold.replace(/\s+/g, '-').toLowerCase()}-${selectedSize.toLowerCase()}`,
    };
    addToCart(productWithPrefs);
  };

  // Get 3 recommendation products (excluding current)
  const recommendations = products
    .filter((p) => p.id !== id)
    .slice(0, 3);

  return (
    <div className="product-detail-page container">
      {/* Back link */}
      <div className="back-navigation">
        <Link to="/shop" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Collections</span>
        </Link>
      </div>

      <div className="detail-layout">
        {/* Gallery Visual Column */}
        <div className="detail-image-col">
          <div className="detail-image-wrapper">
            <img src={product.image} alt={product.title} className="detail-main-image" />
          </div>
        </div>

        {/* Purchase Options Column */}
        <div className="detail-info-col">
          <span className="detail-brand">ROE ATELIER</span>
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          
          <div className="detail-divider" />
          
          <p className="detail-description">{product.description}</p>

          {/* Preferences */}
          <div className="selector-group">
            <span className="selector-label">Material & Finish</span>
            <div className="gold-selector-options">
              {['Yellow Gold', 'Rose Gold', 'White Gold'].map((gold) => (
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
              {['Small', 'Medium', 'Large'].map((size) => (
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

          {/* Buttons */}
          <div className="detail-actions-row">
            <button onClick={handleAddToBag} className="detail-add-btn">
              Add to Shopping Bag
            </button>
            <button className="detail-wishlist-btn" aria-label="Add to wishlist">
              <Heart size={20} />
            </button>
          </div>

          <div className="detail-divider" />

          {/* Guarantees */}
          <div className="detail-badges-list">
            <div className="detail-badge-item">
              <ShieldCheck size={20} className="detail-badge-icon" />
              <div>
                <h5>Lifetime Warranty</h5>
                <p>ROE pieces are crafted to never tarnish, finished in premium 18K gold plating.</p>
              </div>
            </div>
            <div className="detail-badge-item">
              <Truck size={20} className="detail-badge-icon" />
              <div>
                <h5>Complimentary Insured Delivery</h5>
                <p>Every shipment is fully insured and delivered in signature ROE packaging.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Carousel */}
      <section className="recommendations-section">
        <h3 className="rec-title">Complete The Look</h3>
        <div className="rec-grid">
          {recommendations.map((rec) => (
            <ProductCard key={rec.id} product={rec} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
