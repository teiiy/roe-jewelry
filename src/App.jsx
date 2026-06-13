import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AmbientBackground from './components/AmbientBackground';
import CartDrawer from './components/CartDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import Lightbox from './components/Lightbox';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import AtelierAdmin from './pages/AtelierAdmin';

function App() {
  return (
    <>
      <CustomCursor />
      <AmbientBackground />
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/atelier-admin" element={<AtelierAdmin />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <ProductDetailModal />
      <Lightbox />
    </>
  );
}
export default App;
