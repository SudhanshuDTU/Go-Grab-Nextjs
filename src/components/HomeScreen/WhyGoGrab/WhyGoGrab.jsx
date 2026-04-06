// src/components/HomeScreen/WhyGoGrab/WhyGoGrab.jsx
// ─────────────────────────────────────────────────────────────
//  "use client" — needs openModal + isMobile state for video
//
//  Changes from original:
//  1. <img> → next/image for all feature images
//  2. isMobile detection preserved for video autoplay
//  3. Video file imported directly (Next.js handles mp4 assets)
//  4. Feature cards + video description data moved to arrays
//  5. Semantic <section>, <article>, <h2>, <h3> for SEO
//  6. JSON-LD Product schema for the 3 key features
//  7. @/ alias imports
// ─────────────────────────────────────────────────────────────
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import './WhyGoGrab.module.css';

import image1      from '@/assets/why-gograb/8205e36b883d1b9904411974101d7b446fa4d725.png';
import image2      from '@/assets/why-gograb/14c72926c0e5e6dce89e0b3bb6cc106fd17ddfb7.png';
import image3      from '@/assets/why-gograb/3c6850f0a0a0f871b2b165c891507a537f505e2e.png';
import gograbReel  from '@/assets/go-grab_reel.mp4';
import { useModal } from '@/context/ModalContext';

// ── Feature cards data ──
const FEATURES = [
  {
    img:         image1,
    alt:         'AI stock monitoring in Go-Grab smart vending machines — always stocked',
    title:       'AI Stock Monitoring in Smart Vending Machines',
    heading:     'AI-Smart, Always Stocked',
    description: 'Predictive analytics keep shelves full, so users always find their favorite snack.',
  },
  {
    img:         image2,
    alt:         'Personalized vending machine solutions for offices and campuses by Go-Grab',
    title:       'Personalized Vending Solutions for Every Business',
    heading:     'Personalized for Your Space',
    description: 'Product mix and features tailored to your unique crowd.',
  },
  {
    img:         image3,
    alt:         "Go-Grab vending machines trusted by India's top institutions — IITs, IIMs, NITs",
    title:       "India's Top Institutions Trust Go-Grab Vending Machines",
    heading:     "Chosen by India's Elite",
    description: 'Trusted by IITs, IIMs, NITs — plus other premier campuses of excellence.',
  },
];

// ── JSON-LD — Product features schema ──
const featuresSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Go-Grab Smart Vending Machine',
  description:
    'AI-powered, cashless smart vending machines for offices, campuses, and public spaces across India.',
  brand: { '@type': 'Brand', name: 'Go-Grab' },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    areaServed: 'IN',
    url: 'https://www.go-grab.in',
  },
  additionalProperty: FEATURES.map(({ heading, description }) => ({
    '@type': 'PropertyValue',
    name: heading,
    value: description,
  })),
};

export default function WhyGoGrab({ openModal }) {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="why-go-grab" aria-label="Why choose Go-Grab vending machines">

      {/* Product features schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featuresSchema) }}
      />

      {/*
        <h2> with keyword — "Always Stocked", "Zero-Hassle",
        "Smart Vending" — all relevant search terms.
      */}
      <h2 className="subtitle">Always Stocked, Zero-Hassle Smart Vending</h2>

      {/* ── Feature cards ── */}
      <div className="features">
        {FEATURES.map(({ img, alt, title, heading, description }) => (
          <article className="feature" key={heading}>
            <Image
              src={img}
              alt={alt}
              title={title}
              width={170}
              height={170}
              loading="lazy"
              sizes="170px"
            />
            {/* h3 for each feature — proper heading hierarchy */}
            <h3 className="pHeading">{heading}</h3>
            <p className="description">{description}</p>
          </article>
        ))}
      </div>

      {/* ── Video section heading ── */}
      <div className="video-heading">
        <p>Smart Vending, Effortlessly</p>
      </div>

      {/* ── Video + description ── */}
      <div className="video-section">
        <div className="video-container">
          <video
            controls
            controlsList="nodownload"
            autoPlay={!isMobile}
            muted
            playsInline        /* required for autoplay on iOS */
            aria-label="Go-Grab smart vending machine product video"
          >
            <source src={gograbReel} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="video-description">
          <p>
            At Go-Grab, we believe modern problems deserve modern solutions —
            starting with how India accesses everyday essentials.
          </p>
          <p>
            Our vending machines in India aren't just hardware; they're
            thoughtfully designed experiences that fit seamlessly into the way
            we live, work, and move.
          </p>
          <button className="partner-button3" onClick={openModal}>
            Partner With Us
          </button>
        </div>
      </div>

    </section>
  );
}