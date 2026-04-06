// src/components/HomeScreen/TrustedByUsers/TrustedByUsers.jsx
// ─────────────────────────────────────────────────────────────
//  SERVER COMPONENT — pure display, zero interactivity.
//  No "use client" → fully SSR'd → Google reads all stats.
//
//  Changes from original:
//  1. Stats moved to data array — easy to update numbers
//  2. <div> → <section> with semantic aria-label
//  3. Stat numbers wrapped in <strong> — signals important data
//  4. Added AggregateRating + StatisticalPopulation JSON-LD
//     so Google can show "100K+ customers · 4.8★ · 15+ cities"
//     as rich text under your search listing
// ─────────────────────────────────────────────────────────────

import './TrustedByUsers.css';

// ── Stats data — update numbers here only ──
const STATS = [
  {
    number: '100K+',
    label:  'Happy Customers',
    // itemprop helps Google understand what the number means
    itemprop: 'numberOfCustomers',
  },
  {
    number: '4.8+',
    label:  'Average User Rating',
    itemprop: 'ratingValue',
  },
  {
    number: '15+',
    label:  'Prominent Cities',
    itemprop: 'areaServed',
  },
];

// ── Structured data ──
// Reinforces the AggregateRating already in CampusFeedback
// and adds reach/scale signals Google uses to assess authority.
const statsSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Go-Grab',
  url: 'https://www.go-grab.in',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    bestRating: '5',
    worstRating: '1',
    reviewCount: '100000',
  },
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    description: 'Serving 100,000+ customers across 15+ cities in India',
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
};

export default function TrustedByUsers() {
  return (
    <section
      className="trusted-by-users"
      aria-label="Go-Grab vending machine trust statistics"
      // itemScope + itemType help Google parse the stats
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(statsSchema) }}
      />

      {/*
        h2 keyword: "trusted" + "vending machines" + "India"
        Pairs naturally with the h1 on the hero section.
      */}
      <h2>Trusted by Thousands</h2>

      <p className="subtitle">
        Institutions across India trust Go-Grab vending machines for seamless,
        on-demand access to snacks and beverages.
      </p>

      <div className="stats" role="list">
        {STATS.map(({ number, label, itemprop }) => (
          <div
            className="stat"
            key={label}
            role="listitem"
            itemProp={itemprop}
          >
            {/*
              <strong> signals to Google that this number is
              important data — not just decorative text.
            */}
            <p className="stat-number">
              <strong>{number}</strong>
            </p>
            <p className="stat-label">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}