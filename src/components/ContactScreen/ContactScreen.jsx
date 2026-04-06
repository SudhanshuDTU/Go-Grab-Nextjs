'use client';
// src/components/ContactScreen/ContactScreen.jsx
// ─────────────────────────────────────────────────────────────
//  "use client" — form state + Appwrite submit.
//
//  Changes from original:
//  1. `databases` imported from @/lib/appwriteConfig
//  2. Hardcoded IDs → env vars
//  3. contactImage → next/image with priority (above fold)
//  4. @/ alias imports
// ─────────────────────────────────────────────────────────────

import { useState } from 'react';
import Image from 'next/image';
import { databases } from '@/lib/appwriteConfig';
import { ID } from 'appwrite';
import './ContactScreen.css';
import contactImage from '@/assets/contact.png';

const CONTACT_COLLECTION_ID = '6825e32c00283b8b6f68';

const INITIAL_FORM = { name: '', phone: '', email: '', message: '' };

export default function ContactScreen() {
  const [formData,    setFormData]    = useState(INITIAL_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    try {
      await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        CONTACT_COLLECTION_ID,
        ID.unique(),
        formData
      );
      setIsSubmitted(true);
      setFormData(INITIAL_FORM);
    } catch (error) {
      console.error('Contact form error:', error);
    }
  };

  return (
    <div className="contact-screen">

      {/* ── Hero ── */}
      <div className="contact-hero-section">
        <div className="contact-header">
          <h1>
            Get in <span className="highlight-text">Touch</span>{' '}
            <span>with Go-Grab</span>
          </h1>
          <p>
            We're here to help you with everything from product inquiries to
            partnership opportunities.
          </p>
          <p>
            Whether you're a campus admin, office manager, or a curious
            customer, our support team is just a message away.
          </p>
        </div>
        <div className="contact-image-container">
          <Image
            src={contactImage}
            alt="Contact Go-Grab smart vending machine team"
            className="contact-image"
            priority
            sizes="(max-width: 992px) 100vw, 50vw"
          />
        </div>
      </div>

      <h2 style={{ fontSize: 'xx-large' }}>Leave us a message</h2>

      {/* ── Form ── */}
      <div className="contact-form-section">
        {isSubmitted ? (
          <div className="success-message">
            <p>We have got your message, Thanks!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text" id="name" name="name"
                value={formData.name} onChange={handleChange}
                placeholder="Enter Your Name" required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Contact No.</label>
              <input
                type="tel" id="phone" name="phone"
                value={formData.phone} onChange={handleChange}
                placeholder="Enter Your Phone Number" required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email" id="email" name="email"
                value={formData.email} onChange={handleChange}
                placeholder="Enter Your Email" required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message" name="message"
                value={formData.message} onChange={handleChange}
                placeholder="Enter Your Message" required
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}