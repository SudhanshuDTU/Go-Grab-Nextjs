// src/components/CollaborationScreen/Collaborations.jsx
// ─────────────────────────────────────────────────────────────
//  "use client" — needs openModal (interactive buttons throughout)
//  SEO metadata is handled by src/app/collaborations/page.jsx
//  (the metadata export there replaces react-helmet completely)
//
//  Changes from original:
//  1. Removed <Helmet> — Next.js metadata export handles this
//  2. All <img> → next/image for performance + Core Web Vitals
//  3. Local asset imports use @/ alias
// ─────────────────────────────────────────────────────────────
'use client';

import Image from 'next/image';
import './Collaborations.css';

import CollabImg  from '@/assets/collaborations/first-Photoroom.png';
import Img1       from '@/assets/collaborations/2-1.png';
import Img2       from '@/assets/collaborations/2-2.png';
import Img3       from '@/assets/collaborations/2-3.png';
import Img4       from '@/assets/collaborations/2-4.png';
import StepImg1   from '@/assets/collaborations/3-1.png';
import StepImg2   from '@/assets/collaborations/3-2.png';
import StepImg3   from '@/assets/collaborations/3-3.png';
import StepImg4   from '@/assets/collaborations/3-4.png';

// ── Benefits data ──
const BENEFITS = [
  {
    img: Img1,
    alt: 'Direct access to customers through Go-Grab vending machines',
    heading: 'Direct Access to Customers',
    text: 'Get your products directly into the hands of your target audience. No middlemen, just seamless and convenient access.',
  },
  {
    img: Img2,
    alt: 'Choice of shelf placement in Go-Grab smart vending machines',
    heading: 'Choice of Shelf Placement',
    text: 'Strategically position your products by selecting specific shelves, locations, and target audiences.',
  },
  {
    img: Img3,
    alt: 'Actionable sales insights from Go-Grab vending machine analytics',
    heading: 'Actionable Sales Insights',
    text: 'Access detailed analytics including sales trends, repeat purchase patterns, demographics, and customer feedback.',
  },
  {
    img: Img4,
    alt: 'Seamless integration with Go-Grab vending machine platform',
    heading: 'Seamless Integration',
    text: "Onboard your products easily with Go-Grab's tailored setup process. Our technology ensures a smooth listing experience.",
  },
];

// ── Steps data ──
const STEPS = [
  { img: StepImg1, alt: 'List your product on Go-Grab vending machine',   text: 'List Your Product'        },
  { img: StepImg2, alt: 'Choose vending machine location with Go-Grab',    text: 'Choose Your Location'     },
  { img: StepImg3, alt: 'Monitor vending machine performance analytics',   text: 'Monitor Your Performance' },
  { img: StepImg4, alt: 'Grow your brand with Go-Grab vending machines',   text: 'Grow with us'             },
];

const Collaborations = ({ openModal }) => {
  return (
    <>
      {/* ── Section 1: Hero ── */}
      <section className="collab-section">
        <div className="collab-content">
          {/*
            h1 here is important — this is the only h1 on the /collaborations page.
            Keyword: "vending machine partnerships"
          */}
          <h1 className="collab-title">Making Every Connection Count</h1>

          <p className="collab-subtext">
            Join leading brands using Go-Grab to reach{' '}
            <span className="highlight">100k+</span> users.
          </p>

          <button className="collab-btn lp-bt" onClick={openModal}>
            Partner with us
          </button>
        </div>

        <div className="collab-image-container">
          <Image
            src={CollabImg}
            alt="Go-Grab vending machine partnership collaboration illustration"
            className="collab-img"
            priority          // above-the-fold image — load immediately
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>

        <button className="collab-btn mb-bt" onClick={openModal}>
          Partner with us
        </button>
      </section>

      {/* ── Section 2: Benefits ── */}
      <section className="benefits-section">
        <h2 className="benefits-title">
          No Middlemen, Just Maximum Brand Exposure
        </h2>

        <div className="benefits-grid">
          {BENEFITS.map(({ img, alt, heading, text }) => (
            <div className="benefit-card" key={heading}>
              <Image
                src={img}
                alt={alt}
                className="benefit-img"
                loading="lazy"
                sizes="(max-width: 900px) 230px, 220px"
              />
              <div className="benefit-content">
                <h3 className="benefit-heading">{heading}</h3>
                <p className="benefit-text">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Steps ── */}
      <section className="steps-section">
        <h2 className="steps-title">
          Your Product, Our Machine – A Perfect Match!
        </h2>

        <div className="steps-grid">
          {STEPS.map(({ img, alt, text }) => (
            <div className="step-card" key={text}>
              <Image
                src={img}
                alt={alt}
                className="step-icon"
                loading="lazy"
                sizes="120px"
              />
              <p className="step-text">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 4: CTA ── */}
      <section className="get-started-section">
        <div className="get-started-left">
          <h2 className="get-started-title">Get Started in Minutes</h2>
          <p className="get-started-desc">
            Collaborating with Go-Grab is simple. Fill out our quick
            application form to kickstart your journey.
          </p>
        </div>

        <div className="get-started-right">
          <button className="get-started-btn" onClick={openModal}>
            Join Now
          </button>
        </div>
      </section>
    </>
  );
};

export default Collaborations;