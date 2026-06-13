import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      category: "Materials & Fine Craftsmanship",
      items: [
        {
          q: "What materials are ROE pieces crafted from?",
          a: "All ROE pieces are constructed using a premium, hypoallergenic base metal heavily plated in 18K solid gold (using an advanced vacuum-ion process that is 5x thicker than standard plating). Our green gemstones are ethically sourced, hand-cut, premium emerald-hued crystals chosen for their depth of color and brilliant refraction."
        },
        {
          q: "Are the jewelry pieces tarnish-free?",
          a: "Yes. Every piece is sealed with a proprietary tarnish-resistant protective barrier. They are specifically designed to resist oxidation, water exposure, and daily wear, allowing you to wear them with complete confidence."
        },
        {
          q: "How should I clean and store my jewelry?",
          a: "To preserve the radiant gold luster, we recommend gently wiping your pieces with the complimentary micro-fiber cloth included in your signature ROE packaging. Store your jewelry in its original suede-lined box or drawer to avoid abrasions from other metals."
        }
      ]
    },
    {
      category: "Shipping & Insured Delivery",
      items: [
        {
          q: "Do you offer complimentary delivery?",
          a: "We provide complimentary fully insured standard delivery on all orders globally. For expedited delivery, we offer DHL Express shipping options at checkout."
        },
        {
          q: "Are shipments secure and insured?",
          a: "Absolutely. Every shipment is fully insured against theft, loss, or damage in transit. Your signature is required upon delivery to ensure your heirloom arrives safely in your hands."
        },
        {
          q: "What is the typical shipping timeline?",
          a: "Standard shipments take 3–5 business days within North America and Europe, and 5–9 business days internationally. Custom engraving or bespoke sizing requests require an additional 2 business days for atelier preparation."
        }
      ]
    },
    {
      category: "Lifetime Warranty & Returns",
      items: [
        {
          q: "What is covered under the ROE Lifetime Warranty?",
          a: "Our warranty covers any structural defects, accidental gold plating tarnish, or clasp failures arising from normal wear. If your piece experiences any issues, we will repair or replace it free of charge."
        },
        {
          q: "What is your return and exchange policy?",
          a: "We welcome returns and exchanges within 30 days of delivery. The item must be unworn, in its original signature packaging with all security tags intact. Return shipping is fully complimentary."
        }
      ]
    }
  ];

  const toggleAccordion = (globalIndex) => {
    setOpenIndex(openIndex === globalIndex ? null : globalIndex);
  };

  // Build sequential global indexes for state mapping
  let globalItemIndex = 0;

  return (
    <div className="faq-page container">
      {/* Editorial Header */}
      <header className="faq-header">
        <span className="faq-eyebrow">SUPPORT ATELIER</span>
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <p className="faq-description">
          Find detailed information regarding our artisanal materials, tarnish-free guarantees, insured shipping, and lifetime warranty.
        </p>
      </header>

      {/* Accordion List */}
      <div className="faq-accordion-container">
        {faqData.map((cat, catIdx) => (
          <div key={catIdx} className="faq-category-group">
            <h3 className="faq-category-title">{cat.category}</h3>
            <div className="faq-items-list">
              {cat.items.map((item) => {
                const currentIndex = globalItemIndex++;
                const isOpen = openIndex === currentIndex;

                return (
                  <div 
                    key={currentIndex} 
                    className={`faq-item-card ${isOpen ? 'active' : ''}`}
                  >
                    <button 
                      onClick={() => toggleAccordion(currentIndex)}
                      className="faq-question-btn"
                      aria-expanded={isOpen}
                    >
                      <span className="question-text">{item.q}</span>
                      <span className="chevron-icon-wrapper">
                        <ChevronDown size={18} strokeWidth={1.5} className="chevron-icon" />
                      </span>
                    </button>
                    <div className="faq-answer-pane">
                      <div className="faq-answer-content">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Luxury Footer Help CTA */}
      <section className="faq-footer-cta">
        <div className="faq-cta-card">
          <HelpCircle size={32} className="faq-cta-icon" />
          <h3>Still Need Assistance?</h3>
          <p>Our concierge service is available to guide you through sizing, styling, or custom bespoke commissions.</p>
          <Link to="/contact" className="faq-contact-btn">
            <span>Contact Private Concierge</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
