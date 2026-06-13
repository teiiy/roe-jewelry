import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './CartDrawer.css';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useApp();

  // Prevent scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [isCartOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCartOpen]);

  const [checkingOut, setCheckingOut] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="cart-backdrop"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="cart-drawer"
          >
            <div className="cart-header">
              <div className="cart-header-title">
                <ShoppingBag size={18} strokeWidth={1.5} />
                <h3>Shopping Bag</h3>
              </div>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  setSuccess(false);
                }} 
                className="close-btn"
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="cart-body">
              {success ? (
                <div className="checkout-success">
                  <div className="success-circle">✓</div>
                  <h4>Order Placed Successfully</h4>
                  <p>Thank you for choosing ROE. A confirmation email and tracking details will be sent to you shortly.</p>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setSuccess(false);
                    }} 
                    className="continue-shopping-btn"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : cart.length === 0 ? (
                <div className="empty-cart">
                  <p className="empty-title">Your shopping bag is empty.</p>
                  <p className="empty-subtitle">Explore our fine collections and discover timeless structural jewelry.</p>
                  <button onClick={() => setIsCartOpen(false)} className="continue-shopping-btn">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-image-wrapper">
                        <img src={item.image} alt={item.title} className="cart-item-image" />
                      </div>
                      <div className="cart-item-details">
                        <div className="cart-item-title-row">
                          <h4 className="cart-item-title">{item.title}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="delete-item-btn"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </div>
                        <p className="cart-item-price">${item.price.toFixed(2)}</p>
                        
                        <div className="quantity-selector">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="qty-btn"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} strokeWidth={1.5} />
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="qty-btn"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!success && cart.length > 0 && (
              <div className="cart-footer">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span className="summary-price">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row shipping">
                  <span>Shipping</span>
                  <span className="shipping-val">Complimentary</span>
                </div>
                <p className="shipping-note">Taxes and duties calculated at checkout.</p>
                <button 
                  onClick={handleCheckout} 
                  disabled={checkingOut}
                  className="checkout-btn"
                >
                  {checkingOut ? (
                    <span className="spinner">Processing Checkout...</span>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
