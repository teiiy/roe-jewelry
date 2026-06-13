import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = () => {
  const { products } = useApp();
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="product-section container">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">NEW ARRIVALS</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="shop-all-wrapper">
          <Link to="/shop" className="shop-all-btn">Shop All Collections</Link>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductGrid;
