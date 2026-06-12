import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import BrandStory from './components/BrandStory';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductGrid />
        <BrandStory />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}

export default App;
