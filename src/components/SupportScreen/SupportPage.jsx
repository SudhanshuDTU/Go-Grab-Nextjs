'use client';
// src/components/SupportScreen/SupportPage.jsx
// ─────────────────────────────────────────────────────────────
//  "use client" — form state, validation, Appwrite submit.
//
//  Changes from original:
//  1. `databases` imported from @/lib/appwriteConfig (not direct client)
//  2. All hardcoded IDs → env vars via APPWRITE_CONFIG
//  3. EmailJS keys → env vars
//  4. Semantic <section> tags for each block
//  5. Support page metadata in src/app/support/page.jsx
// ─────────────────────────────────────────────────────────────

import { useState } from 'react';
import { databases, APPWRITE_CONFIG } from '@/lib/appwriteConfig';
import { ID } from 'appwrite';
import emailjs from 'emailjs-com';
import './support.css';

const FAQS = [
  {
    question: 'How do I reset my password?',
    answer:
      "Go to three dots present on Home Screen > Logout > tap 'Reset Password'. You'll receive an email with instructions.",
  },
];

const CONTACT_METHODS = [
  {
    title:       'WhatsApp Support 💬',
    details:     'Our Chat Support will help you in resolving issues',
    description: 'Message us on +91 9179357955',
  },
];

const INITIAL_FORM = {
  name:     '',
  email:    '',
  subject:  '',
  message:  '',
  category: 'general',
};

export default function SupportPage() {
  const [formData,    setFormData]    = useState(INITIAL_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading,   setIsLoading]   = useState(false);
  const [errors,      setErrors]      = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim())    newErrors.name    = 'Name is required';
    if (!formData.email.trim())   newErrors.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      await databases.createDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collectionPartnerId,
        ID.unique(),
        {
          name:              formData.name,
          email:             formData.email,
          'what-brings-here': formData.subject,
          'other-info':       formData.message,
        }
      );

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name:      formData.name,
          email:     formData.email,
          subject:   formData.subject,
          message:   formData.message,
          category:  formData.category,
          timestamp: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
      setFormData(INITIAL_FORM);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Support form error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="support-container">

      {/* ── Hero ── */}
      <section className="support-hero">
        <h1 className="support-title">We're Here to Help</h1>
        <p className="support-subtitle">
          Get assistance with your account or any questions you may have about
          our app.
        </p>
      </section>

      {/* ── Contact methods ── */}
      <section className="contact-methods-section">
        <h2 className="section-title">Contact Support</h2>
        <div className="contact-methods-grid">
          {CONTACT_METHODS.map(({ title, details, description, link }) => (
            <div key={title} className="contact-method-card">
              <h3>{title}</h3>
              <p className="contact-details">{details}</p>
              <p className="contact-description">{description}</p>
              {link && (
                <a href={link} className="contact-link">
                  {title === 'Email Support' ? 'Send Email' : 'Call Now'}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-grid">
          {FAQS.map(({ question, answer }) => (
            <div key={question} className="faq-card">
              <h3 className="faq-question">{question}</h3>
              <p className="faq-answer">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact form ── */}
      <section className="contact-form-section">
        <h2 className="section-title">Send Us a Message</h2>
        <p className="section-subtitle">
          Can't find what you're looking for? Fill out the form below and our
          team will get back to you as soon as possible.
        </p>

        {isSubmitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Message Sent Successfully!</h3>
            <p>
              Thank you for contacting us. We'll respond to your inquiry within
              24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text" id="name" name="name"
                  value={formData.name} onChange={handleChange}
                  required placeholder="Enter your full name"
                  className={errors.name ? 'error-input' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email" id="email" name="email"
                  value={formData.email} onChange={handleChange}
                  required placeholder="Enter your email"
                  className={errors.email ? 'error-input' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="category">Issue Category *</label>
                <select
                  id="category" name="category"
                  value={formData.category} onChange={handleChange} required
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="billing">Billing &amp; Payments</option>
                  <option value="account">Account Issues</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Report a Bug</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text" id="subject" name="subject"
                  value={formData.subject} onChange={handleChange}
                  required placeholder="Brief description of your issue"
                  className={errors.subject ? 'error-input' : ''}
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message" name="message"
                  value={formData.message} onChange={handleChange}
                  required rows="6"
                  placeholder="Please describe your issue in detail..."
                  className={errors.message ? 'error-input' : ''}
                />
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
            <p className="form-note">
              * Required fields. We typically respond within 24 hours.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}