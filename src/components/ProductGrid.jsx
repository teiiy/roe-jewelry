import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';
import './ProductGrid.css';

const ProductGrid = () => {
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
          {productsData.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="shop-all-wrapper">
          <a href="#shop" className="shop-all-btn">Shop All Collections</a>
        </div>
      </motion.div>
    </section>
  );
};

export default ProductGrid;
