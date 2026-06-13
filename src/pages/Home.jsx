import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import BrandStory from '../components/BrandStory';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <>
      <Hero />
      <ProductGrid />
      <BrandStory />
      <Testimonials />
    </>
  );
};

export default Home;
