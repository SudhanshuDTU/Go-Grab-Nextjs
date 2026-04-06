// src/components/HomeScreen/HeroSection/HeroSection.jsx
// ─────────────────────────────────────────────────────────────
//  "use client" — needs openModal (button click handler)
//
//  Changes from original:
//  1. <Helmet> removed — SEO handled by src/app/page.jsx metadata export
//  2. <img> → next/image with priority (hero = LCP element, affects SEO)
//  3. Asset imports use @/ alias
//  4. Added structured data alt + title preserved for Google Image Search
// ─────────────────────────────────────────────────────────────
'use client';

import Image from 'next/image';
import './HeroSection.css';
import heroImage from '@/assets/Hero_Section_Image.webp';

const HeroSection = ({ openModal }) => {
  return (
    <div className="hero-section">

      {/* ── Left: Text content ── */}
      <div className="hero-content">
        {/*
          h1 is the most important on-page SEO element.
          Metadata in page.jsx sets the <title> tag.
          This h1 is what Google reads as the main page topic.
          Keywords: "smart vending machine", "snacking", "India"
        */}
        <h1 style={{ textAlign: 'left' }}>
          <span className="line">Instant</span>
          <span className="line">Snacking,</span>
          <span className="line">Smarter Living</span>
        </h1>

        <p className="description">
          Fresh snacks, anytime, anywhere. Discover seamless vending in India
          for smarter living.
        </p>

        {/* Desktop button */}
        <div className="buttons desktop-button">
          <button className="buy-button" onClick={openModal}>
            Start Your Vending Journey
          </button>
        </div>
      </div>

      {/* ── Right: Hero image ── */}
      <div className="hero-image">
        {/*
          priority={true} — tells Next.js to preload this image.
          The hero image is the LCP (Largest Contentful Paint) element.
          Faster LCP = better Core Web Vitals = better Google ranking.

          alt and title are keyword-rich for Google Image Search.
        */}
        <Image
          src={heroImage}
          alt="Vending Machine by Go-Grab — cashless snack vending for offices and campuses in India"
          title="Smart Snack and Chocolate Vending Machine for Offices & Campuses"
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            marginTop: '100px',
            width: '100%',
            height: '90vh',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Mobile button */}
      <div className="buttons mobile-button">
        <button className="buy-button" onClick={openModal}>
          Start Your Vending Journey
        </button>
      </div>

    </div>
  );
};

export default HeroSection;