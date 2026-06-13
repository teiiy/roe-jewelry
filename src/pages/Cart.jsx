import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import './Cart.css';

const Cart = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useApp();

  return (
    <div className="cart-page container">
      <header className="cart-page-header">
        <h1 className="cart-page-title">Your Shopping Bag</h1>
        <p className="cart-page-subtitle">Review your selected pieces and proceed to delivery options.</p>
      </header>

      {cart.length === 0 ? (
        <div className="empty-cart-view">
          <p>Your bag is empty.</p>
          <Link to="/shop" className="continue-btn">
            <ArrowLeft size={16} />
            <span>Discover Fine Jewelry</span>
          </Link>
        </div>
      ) : (
        <div className="cart-layout-grid">
          {/* Items Column */}
          <div className="cart-items-col">
            <div className="items-header">
              <span>PRODUCT</span>
              <span>QUANTITY</span>
              <span>TOTAL</span>
            </div>
            
            <div className="items-list">
              {cart.map((item) => (
                <div key={item.id} className="cart-page-item">
                  {/* Image & Main Info */}
                  <div className="item-main-details">
                    <div className="item-img-container">
                      <img src={item.image.split(' (')[0]} alt={item.title} />
                    </div>
                    <div className="item-text-details">
                      <h4>{item.title}</h4>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="item-remove-btn"
                      >
                        <Trash2 size={14} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Quantity modifier */}
                  <div className="item-qty-container">
                    <div className="qty-picker">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-picker-btn"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="qty-picker-val">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-picker-btn"
                        aria-label="Increase quantity"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>

                  {/* Total price for item */}
                  <div className="item-total-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-actions-row">
              <Link to="/shop" className="back-to-shop">
                <ArrowLeft size={14} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Summary Column */}
          <div className="cart-summary-col">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-divider" />
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">Complimentary</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>Calculated in checkout</span>
                </div>
              </div>

              <div className="summary-divider" />
              
              <div className="summary-total-row">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="checkout-page-btn">
                Proceed to Checkout
              </Link>

              <div className="summary-guarantees">
                <p>✓ Secured Payment & SSL Encryption</p>
                <p>✓ Insured Shipping & Return Guarantee</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
