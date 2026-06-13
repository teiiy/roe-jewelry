import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const Shop = () => {
  const { products } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('relevance');

  // Sync category state when URL query param changes
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  // Map product title/description to standard categories
  const getProductCategory = (product) => {
    const title = product.title.toLowerCase();
    if (title.includes('bangle')) return 'bracelets';
    if (title.includes('pendant') || title.includes('necklace')) return 'necklaces';
    if (title.includes('studs') || title.includes('earring')) return 'fine-jewelry';
    if (title.includes('ring')) return 'rings';
    return 'fine-jewelry';
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (activeCategory === 'all') return true;
    const cat = product.category || getProductCategory(product);
    return cat === activeCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // relevance / default order
  });

  const categories = [
    { id: 'all', label: 'ALL COLLECTIONS' },
    { id: 'necklaces', label: 'NECKLACES' },
    { id: 'bracelets', label: 'BRACELETS' },
    { id: 'fine-jewelry', label: 'FINE JEWELRY' },
    { id: 'rings', label: 'RINGS' },
  ];

  return (
    <div className="shop-page container">
      {/* Editorial Header */}
      <header className="shop-header">
        <span className="shop-eyebrow">FINE JEWELRY</span>
        <h1 className="shop-title">The Collections</h1>
        <p className="shop-description">
          Explore our complete collection of signature jewelry. Sculpted in conflict-free 18K gold and tarnish-free finishes.
        </p>
      </header>

      {/* Catalog Controls */}
      <div className="shop-controls">
        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="sort-dropdown-container">
          <label htmlFor="sort-select" className="sort-label">SORT BY:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="relevance">RELEVANCE</option>
            <option value="price-low">PRICE: LOW TO HIGH</option>
            <option value="price-high">PRICE: HIGH TO LOW</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length === 0 ? (
        <div className="no-products-found">
          <p>No pieces found in this collection.</p>
          <button onClick={() => handleCategoryChange('all')} className="clear-filters-btn">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="shop-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
