// src/components/HomeScreen/CampusFeedback/CampusFeedback.jsx
// SERVER COMPONENT — pure display, no interactivity needed.

import './CampusFeedback.css';

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

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Go-Grab Vending Machine',
  description: 'Cashless, 24/7 vending machines for campuses, offices, and public spaces across India.',
  brand: { '@type': 'Brand', name: 'Go-Grab' },
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
    author: { '@type': 'Person', name: `${name}, ${designation}` },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
  })),
};

export default function CampusFeedback() {
  return (
    <section className="campus-feedback" aria-label="Customer testimonials for Go-Grab vending machines">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <h2 className="cf-heading">What People Say</h2>
      <p className="cf-subtitle">
        Trusted by students, professionals, and institutions across India
      </p>

      <div className="cf-cards">
        {TESTIMONIALS.map(({ text, name, designation }) => (
          <article className="cf-card" key={name}>
            {/* Decorative large quote mark */}
            <span className="cf-quote-mark" aria-hidden="true">"</span>

            <blockquote className="cf-text">
              <p>{text}</p>
            </blockquote>

            {/* Blue accent divider */}
            <div className="cf-divider" />

            <div className="cf-author">
              {/* Avatar circle with first letter of name */}
              <div className="cf-avatar" aria-hidden="true">
                {name.charAt(0)}
              </div>
              <div className="cf-author-info">
                <p className="cf-name">{name}</p>
                <p className="cf-role">{designation}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}