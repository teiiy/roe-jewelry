import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ArrowLeft, CreditCard, Truck, CheckCircle, ShieldCheck } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useApp();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  // Form states
  const [shippingForm, setShippingForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
  });

  const [paymentForm, setPaymentForm] = useState({
    cardNum: '',
    cardExp: '',
    cardCvv: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderId] = useState(() => `ROE-${Math.floor(100000 + Math.random() * 900000)}`);

  const handleShippingChange = (e) => {
    setShippingForm({ ...shippingForm, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateShipping = () => {
    const tempErrors = {};
    if (!shippingForm.email.includes('@')) tempErrors.email = 'Valid email is required.';
    if (!shippingForm.firstName) tempErrors.firstName = 'First name is required.';
    if (!shippingForm.lastName) tempErrors.lastName = 'Last name is required.';
    if (!shippingForm.address) tempErrors.address = 'Address is required.';
    if (!shippingForm.city) tempErrors.city = 'City is required.';
    if (!shippingForm.zip) tempErrors.zip = 'Postal code is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const validatePayment = () => {
    const tempErrors = {};
    if (paymentForm.cardNum.replace(/\s+/g, '').length < 16) {
      tempErrors.cardNum = 'Valid 16-digit card number is required.';
    }
    if (!paymentForm.cardExp.includes('/')) tempErrors.cardExp = 'Expiry (MM/YY) is required.';
    if (paymentForm.cardCvv.length < 3) tempErrors.cardCvv = 'CVV is required.';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const proceedToPayment = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep(2);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validatePayment()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(3);
        clearCart(); // Clear cart state on order completion
      }, 2000);
    }
  };

  if (step === 3) {
    return (
      <div className="checkout-success-page container">
        <div className="success-card">
          <CheckCircle size={64} className="success-icon" />
          <span className="success-tag">ORDER CONFIRMED</span>
          <h1>Thank you for your order</h1>
          <p className="order-number">Order ID: <strong>{orderId}</strong></p>
          <div className="success-divider" />
          <p className="success-msg">
            A confirmation email has been sent to <strong>{shippingForm.email}</strong>. Our logistics partners are preparing your shipment in our signature tarnish-free wrapping.
          </p>
          <Link to="/shop" className="back-to-catalog-btn">Continue Exploring Collections</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-empty container">
        <h2>Checkout Unavailable</h2>
        <p>Your shopping bag is empty. Please select pieces before checking out.</p>
        <Link to="/shop" className="back-to-catalog-btn">Return to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      {/* Back button */}
      <div className="checkout-back-nav">
        {step === 1 ? (
          <Link to="/cart" className="checkout-back-link">
            <ArrowLeft size={16} />
            <span>Return to Bag</span>
          </Link>
        ) : (
          <button onClick={() => setStep(1)} className="checkout-back-link">
            <ArrowLeft size={16} />
            <span>Back to Shipping</span>
          </button>
        )}
      </div>

      <div className="checkout-layout-grid">
        {/* Form Column */}
        <div className="checkout-form-col">
          {/* Steps Breadcrumbs */}
          <div className="checkout-steps">
            <span className={`checkout-step-badge ${step === 1 ? 'active' : ''}`}>1. SHIPPING</span>
            <span className="step-divider">⟶</span>
            <span className={`checkout-step-badge ${step === 2 ? 'active' : ''}`}>2. BILLING & PAYMENT</span>
          </div>

          {step === 1 ? (
            <form onSubmit={proceedToPayment} className="checkout-form">
              <h3>Shipping & Contact</h3>
              
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={shippingForm.email} 
                  onChange={handleShippingChange} 
                  className={errors.email ? 'error' : ''}
                  placeholder="name@example.com" 
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    name="firstName" 
                    value={shippingForm.firstName} 
                    onChange={handleShippingChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="field-error">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    name="lastName" 
                    value={shippingForm.lastName} 
                    onChange={handleShippingChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="field-error">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={shippingForm.address} 
                  onChange={handleShippingChange}
                  className={errors.address ? 'error' : ''}
                  placeholder="Street Address, Apt or Suite"
                />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    name="city" 
                    value={shippingForm.city} 
                    onChange={handleShippingChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="field-error">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input 
                    type="text" 
                    name="zip" 
                    value={shippingForm.zip} 
                    onChange={handleShippingChange}
                    className={errors.zip ? 'error' : ''}
                  />
                  {errors.zip && <span className="field-error">{errors.zip}</span>}
                </div>
              </div>

              <button type="submit" className="checkout-next-btn">
                <Truck size={16} />
                <span>Continue to Payment</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handlePlaceOrder} className="checkout-form">
              <h3>Secure Payment</h3>
              
              <div className="form-group">
                <label>Cardholder Name</label>
                <input 
                  type="text" 
                  placeholder={`${shippingForm.firstName} ${shippingForm.lastName}`}
                  disabled 
                  className="disabled-input"
                />
              </div>

              <div className="form-group">
                <label>Card Number</label>
                <input 
                  type="text" 
                  name="cardNum" 
                  maxLength={16}
                  value={paymentForm.cardNum} 
                  onChange={handlePaymentChange}
                  className={errors.cardNum ? 'error' : ''}
                  placeholder="4000 1234 5678 9010" 
                />
                {errors.cardNum && <span className="field-error">{errors.cardNum}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiration Date</label>
                  <input 
                    type="text" 
                    name="cardExp" 
                    maxLength={5}
                    value={paymentForm.cardExp} 
                    onChange={handlePaymentChange}
                    className={errors.cardExp ? 'error' : ''}
                    placeholder="MM/YY" 
                  />
                  {errors.cardExp && <span className="field-error">{errors.cardExp}</span>}
                </div>
                <div className="form-group">
                  <label>Security Code (CVV)</label>
                  <input 
                    type="password" 
                    name="cardCvv" 
                    maxLength={4}
                    value={paymentForm.cardCvv} 
                    onChange={handlePaymentChange}
                    className={errors.cardCvv ? 'error' : ''}
                    placeholder="123" 
                  />
                  {errors.cardCvv && <span className="field-error">{errors.cardCvv}</span>}
                </div>
              </div>

              <button type="submit" disabled={loading} className="checkout-place-btn">
                <CreditCard size={16} />
                <span>
                  {loading ? 'Processing Transaction...' : `Pay $${totalPrice.toFixed(2)}`}
                </span>
              </button>
            </form>
          )}
        </div>

        {/* Summary Column */}
        <div className="checkout-summary-col">
          <div className="checkout-summary-card">
            <h3>Your Order</h3>
            <div className="checkout-summary-divider" />
            
            <div className="checkout-items-preview">
              {cart.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <div className="item-img-frame">
                    <img src={item.image.split(' (')[0]} alt={item.title} />
                    <span className="item-qty-badge">{item.quantity}</span>
                  </div>
                  <div className="item-meta">
                    <h4>{item.title}</h4>
                    <p className="item-meta-price">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="checkout-summary-divider" />
            
            <div className="summary-price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span className="shipping-complimentary">Complimentary</span>
              </div>
            </div>

            <div className="checkout-summary-divider" />
            
            <div className="total-order-row">
              <span>Total Due</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="checkout-guarantee">
              <ShieldCheck size={18} />
              <span>100% Encrypted Connection. Fully Insured Delivery.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
