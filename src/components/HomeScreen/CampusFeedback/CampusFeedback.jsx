// src/components/HomeScreen/CampusFeedback/CampusFeedback.jsx
// ─────────────────────────────────────────────────────────────
//  SERVER COMPONENT — no interactivity, pure display.
//  No "use client" needed → fully SSR'd → Google reads all
//  testimonial text directly from HTML.
//
//  SEO addition: Review structured data (JSON-LD) so Google
//  can show star ratings / testimonials in rich results.
// ─────────────────────────────────────────────────────────────

import './CampusFeedback.module.css';

// ── Testimonials data ──
// Easy to add more — just push to this array.
const TESTIMONIALS = [
  {
    text: "Go-Grab's 24/7 vending is a game-changer for my study nights. Love the variety and ease!",
    name: 'Priya',
    designation: 'University Student',
  },
  {
    text: 'Our office loves the Go-Grab machines! Always stocked and so convenient — a total hit!',
    name: 'Arjun',
    designation: 'Office Manager',
  },
  {
    text: 'Go-Grab machines make library snacking a breeze. Great selection, easy payments!',
    name: 'Meera',
    designation: 'Library Assistant',
  },
];

// ── Review structured data ──
// Google can show these as rich results in search —
// "4.9 ★ — Go-Grab Smart Vending Machines" under your listing.
const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Go-Grab Smart Vending Machine',
  description:
    'Cashless, 24/7 smart vending machines for campuses, offices, and public spaces across India.',
  brand: {
    '@type': 'Brand',
    name: 'Go-Grab',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: String(TESTIMONIALS.length),
    bestRating: '5',
    worstRating: '1',
  },
  review: TESTIMONIALS.map(({ text, name, designation }) => ({
    '@type': 'Review',
    reviewBody: text,
    author: {
      '@type': 'Person',
      name: `${name}, ${designation}`,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
    },
  })),
};

export default function CampusFeedback() {
  return (
    <section className="campus-feedback" aria-label="Customer testimonials for Go-Grab vending machines">

      {/* Review structured data — Google reads this for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <h2>What People Say</h2>

      <div className="feedback-cards">
        {TESTIMONIALS.map(({ text, name, designation }) => (
          <article className="feedback-card" key={name}>
            {/*
              <blockquote> is the semantic HTML for testimonials.
              Google understands this is a user review/quote.
            */}
            <blockquote className="feedback-text">
              <p>"{text}"</p>
            </blockquote>

            <div className="feedback-author">
              <div
                className="author-info"
                style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
              >
                <p className="author-name">{name},&nbsp;</p>
                <p className="author-designation">{designation}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}