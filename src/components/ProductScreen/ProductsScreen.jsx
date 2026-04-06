// src/components/ProductScreen/ProductsScreen.jsx
// ─────────────────────────────────────────────────────────────
//  "use client" — needs openModal + showAll toggle
//
//  Changes from original:
//  1. <Helmet> removed — SEO handled by src/app/products/page.jsx
//  2. All <img> → next/image with keyword-rich alt text per brand
//  3. Brand names in alt text (Lays, Nestlé etc.) — helps Google
//     Image Search rank Go-Grab for "[Brand] vending machine"
//  4. Semantic <section> tags, h2/h3 hierarchy preserved
//  5. @/ alias imports
// ─────────────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import Image from 'next/image';
import './ProductsScreen.module.css';

import vendingIllustration from '@/assets/product-screen/1.png';
import Image2              from '@/assets/product-screen/2.png';
import Image3              from '@/assets/product-screen/3.png';
import Lays                from '@/assets/product-screen/lays_800.png';
import ITC                 from '@/assets/product-screen/ITC_Limited.png';
import Britania            from '@/assets/product-screen/Britannia_2.png';
import Haldiram            from '@/assets/product-screen/Haldirams_Logo_og.png';
import CocoCola            from '@/assets/product-screen/cococola_n.png';
import Nestle              from '@/assets/product-screen/nestle.png';
import ParleAgro           from '@/assets/product-screen/parle-agro-Photoroom.png';
import Redbull             from '@/assets/product-screen/Logo-red-bull-vector-transparent-PNG.png';
import Cadbury             from '@/assets/product-screen/Cadbury-Logo.wine.png';
import Amul                from '@/assets/product-screen/amul_800.png';
import TooYum              from '@/assets/product-screen/tooyum.jpeg';
import BeyondSnack         from '@/assets/product-screen/beyondSnack_800.png';
import Bicano              from '@/assets/product-screen/bicano_800.jpg';
import Doritos             from '@/assets/product-screen/18.png';
import MinuteMaid          from '@/assets/product-screen/minuteMaid__800_1080.png';
import NeoPop              from '@/assets/product-screen/neopop_800_1080.png';
import Pepsico             from '@/assets/product-screen/pepisco.png';
import RealJuice           from '@/assets/product-screen/real_juice_1080_1080.png';
import Tropicana           from '@/assets/product-screen/tropicana-Photoroom.png';
import Unibic              from '@/assets/product-screen/unibic_n.png';
import YogaBar             from '@/assets/product-screen/yogaBar_800N.png';
import pvr                 from '@/assets/product-screen/4700bc.png';
import maxProtein          from '@/assets/product-screen/max-protein.png';

// ── Products data ──
const PRODUCTS = [
  {
    img:   Image2,
    alt:   'Go-Grab combo snacks and beverages vending machine for offices and campuses',
    title: 'Combo Snacks & Beverages Machine',
    desc:  'A single solution that offers both tasty snacks and refreshing drinks.',
  },
  {
    img:   Image3,
    alt:   'Go-Grab combo vending machine with snacks, beverages, hot coffee and tea',
    title: 'Combo Snacks + Beverages + Hot Coffee & Tea',
    desc:  'Our combo machine serves snacks, cold drinks, and freshly brewed hot tea & coffee, all in one.',
  },
];

// ── Brand logos with keyword-rich alt text ──
// "[Brand] products in Go-Grab vending machine" = Google Image SEO
const BRANDS = [
  { img: Lays,       alt: "Lays chips available in Go-Grab vending machine"                  },
  { img: ITC,        alt: "ITC products in Go-Grab smart vending machine"                    },
  { img: Nestle,     alt: "Nestlé products in Go-Grab vending machine India"                 },
  { img: Pepsico,    alt: "PepsiCo beverages in Go-Grab cashless vending machine"            },
  { img: CocoCola,   alt: "Coca-Cola drinks in Go-Grab automated vending machine"            },
  { img: Cadbury,    alt: "Cadbury chocolates in Go-Grab smart vending machine"              },
  { img: Britania,   alt: "Britannia snacks in Go-Grab vending machine for campuses"         },
  { img: ParleAgro,  alt: "Parle Agro drinks in Go-Grab vending machine"                    },
  { img: Haldiram,   alt: "Haldiram snacks in Go-Grab campus vending machine"               },
  { img: Redbull,    alt: "Red Bull energy drinks in Go-Grab office vending machine"         },
  { img: Tropicana,  alt: "Tropicana juices in Go-Grab smart vending machine"               },
  { img: Unibic,     alt: "Unibic cookies in Go-Grab vending machine"                       },
  { img: YogaBar,    alt: "YogaBar healthy snacks in Go-Grab vending machine"               },
  { img: pvr,        alt: "4700BC popcorn in Go-Grab smart vending machine"                 },
  { img: maxProtein, alt: "Max Protein bars in Go-Grab health vending machine"              },
];

const INITIAL_BRAND_COUNT = 10;

// ── JSON-LD for products ──
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Go-Grab Smart Vending Machine Products',
  description: 'Range of smart vending machines by Go-Grab for snacks, beverages, and hot drinks.',
  itemListElement: PRODUCTS.map(({ title, desc }, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Product',
      name: title,
      description: desc,
      brand: { '@type': 'Brand', name: 'Go-Grab' },
    },
  })),
};

export default function ProductsScreen({ openModal }) {
  const [showAll, setShowAll] = useState(false);
  const visibleBrands = showAll ? BRANDS : BRANDS.slice(0, INITIAL_BRAND_COUNT);

  return (
    <>
      {/* Product schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* ── Section 1: Hero ── */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="line">Zero Hassle,</span>
            <span className="line">Full Access</span>
          </h1>
          <p className="hero-subtext">
            Seamless snacking with zero effort, anytime you need it.
          </p>
          <button className="hero-btn lp-bt" onClick={openModal}>
            Collaborate With Us
          </button>
        </div>

        <div className="hero-image-container">
          <Image
            src={vendingIllustration}
            alt="Go-Grab smart vending machine — zero hassle cashless snacking solution"
            className="hero-img"
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>

        {/* <button className="hero-btn mb-bt" onClick={openModal}>
          Collaborate With Us
        </button> */}
      </div>

      {/* ── Section 2: Products ── */}
      <section className="products-section">
        <h2 className="section-title">
          Smart Vending Solutions – Designed for Every Need
        </h2>
        <div className="product-cards">
          {PRODUCTS.map(({ img, alt, title, desc }) => (
            <article className="product-card" key={title}>
              <Image
                src={img}
                alt={alt}
                className="product-image"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Section 3: Brands ── */}
      <section className="brands-section">
        <h2 className="brands-title">Brands You Love, All in One Machine</h2>
        <div className="brands-grid">
          {visibleBrands.map(({ img, alt }) => (
            <div className="brand-item" key={alt}>
              <Image
                src={img}
                alt={alt}
                loading="lazy"
                sizes="140px"
                style={{ maxHeight: '100px', maxWidth: '140px', objectFit: 'contain', width: '100%' }}
              />
            </div>
          ))}
        </div>
        <button
          className="view-more-btn"
          onClick={() => setShowAll(!showAll)}
          aria-label={showAll ? 'View fewer brands' : 'View all brands in Go-Grab vending machines'}
        >
          {showAll ? 'View Less' : 'View More'}
        </button>
      </section>

      {/* ── Section 4: CTA ── */}
      <section className="cta-section">
        <h2>Start Your Vending Business Today</h2>
        <p>
          Our smart vending machines bring the ultimate convenience to your
          customers while ensuring maximum profits for your brand. With
          cutting-edge technology and seamless automation, we make it easier
          than ever to deliver products anytime, anywhere. Discover how our
          smart vending machine solutions can transform your business. Contact
          us today to learn more.
        </p>
        <button className="cta-button" onClick={openModal}>
          Enquire Now
        </button>
      </section>
    </>
  );
}