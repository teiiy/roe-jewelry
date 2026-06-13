import React, { useState } from 'react';
import { Mail, Phone, Clock, Calendar, CheckCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: 'Bespoke Design Commission',
    message: '',
    date: '',
    timeSlot: '11:00 AM'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const selectTimeSlot = (slot) => {
    setFormData({ ...formData, timeSlot: slot });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const timeSlots = ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];

  return (
    <div className="contact-page container">
      <header className="contact-header">
        <span className="contact-eyebrow">PRIVATE CONCIERGE</span>
        <h1 className="contact-title">Connect With Our Atelier</h1>
        <p className="contact-description">
          Whether you desire a custom bespoke commission, a private showing, or have inquiries regarding your order, our concierge is here to assist.
        </p>
      </header>

      {submitted ? (
        <div className="contact-success-card">
          <CheckCircle size={48} className="contact-success-icon" />
          <h2>Booking Registered</h2>
          <p className="contact-success-sub">Thank you, <strong>{formData.name}</strong>.</p>
          <div className="contact-success-divider" />
          <p className="contact-success-msg">
            Our atelier concierge will review your inquiry regarding <strong>{formData.inquiry}</strong> and contact you within 12 hours at <strong>{formData.email}</strong>.
            {formData.date && (
              <span> We have penciled in a private consultation for you on <strong>{formData.date}</strong> at <strong>{formData.timeSlot}</strong>.</span>
            )}
          </p>
          <button onClick={() => setSubmitted(false)} className="contact-reset-btn">
            Send Another Inquiry
          </button>
        </div>
      ) : (
        <div className="contact-layout-grid">
          {/* Contact Details & Info */}
          <div className="contact-info-col">
            <div className="atelier-details-card">
              <h3>The Atelier Boutique</h3>
              <p className="atelier-location-desc">
                Located in the heart of the historic luxury district. Personal viewings are arranged strictly by appointment.
              </p>
              
              <div className="info-detail-list">
                <div className="info-detail-item">
                  <Mail size={18} className="info-detail-icon" />
                  <div>
                    <h5>Digital Concierge</h5>
                    <a href="mailto:concierge@roe-jewelry.com">concierge@roe-jewelry.com</a>
                  </div>
                </div>
                
                <div className="info-detail-item">
                  <Phone size={18} className="info-detail-icon" />
                  <div>
                    <h5>Tele-Atelier Direct</h5>
                    <a href="tel:+18007635393">+1 (800) ROE-JEWELRY</a>
                  </div>
                </div>

                <div className="info-detail-item">
                  <Clock size={18} className="info-detail-icon" />
                  <div>
                    <h5>Atelier Hours</h5>
                    <p>Mon - Fri: 10:00 AM - 6:00 PM EST<br />Sat: 11:00 AM - 4:00 PM EST</p>
                  </div>
                </div>
              </div>

              <div className="concierge-guarantee">
                <h4>✦ The Heirloom Guarantee ✦</h4>
                <p>Every custom piece commissions comes with professional 3D layout renders, direct materials selection, and insured overnight delivery.</p>
              </div>
            </div>
          </div>

          {/* Form & Appointment Scheduling */}
          <div className="contact-form-col">
            <form onSubmit={handleSubmit} className="contact-form">
              <h3>Inquiry & Consultation Form</h3>
              
              <div className="form-group">
                <label htmlFor="name-input">Full Name</label>
                <input 
                  type="text" 
                  id="name-input"
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email-input">Email Address</label>
                <input 
                  type="email" 
                  id="email-input"
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required
                  placeholder="name@domain.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="inquiry-select">Inquiry Subject</label>
                <select 
                  id="inquiry-select"
                  name="inquiry" 
                  value={formData.inquiry} 
                  onChange={handleChange}
                >
                  <option value="Bespoke Design Commission">Bespoke Design Commission</option>
                  <option value="Private Viewing Request">Private Viewing Request</option>
                  <option value="Order & Delivery Query">Order & Delivery Query</option>
                  <option value="General Brand Inquiry">General Brand Inquiry</option>
                </select>
              </div>

              {/* Consultation Scheduling Segment */}
              <div className="scheduling-segment">
                <span className="segment-label">
                  <Calendar size={14} />
                  <span>Request Private Consultation (Optional)</span>
                </span>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date-input">Select Date</label>
                    <input 
                      type="date" 
                      id="date-input"
                      name="date" 
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date} 
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {formData.date && (
                  <div className="time-slots-group">
                    <label>Preferred Time Slot</label>
                    <div className="time-slots-grid">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => selectTimeSlot(slot)}
                          className={`time-slot-btn ${formData.timeSlot === slot ? 'active' : ''}`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message-textarea">Details or Customization Notes</label>
                <textarea 
                  id="message-textarea"
                  name="message" 
                  rows="4"
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                  placeholder="Describe your design criteria or order notes..."
                />
              </div>

              <button type="submit" className="contact-submit-btn" disabled={loading}>
                {loading ? 'Sending to Atelier...' : 'Submit Inquiry'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
