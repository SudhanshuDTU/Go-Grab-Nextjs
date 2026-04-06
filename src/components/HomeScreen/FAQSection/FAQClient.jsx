'use client';
// src/components/HomeScreen/FAQSection/FAQClient.jsx
// ─────────────────────────────────────────────────────────────
//  Handles ONLY the open/close + show more/less toggle.
//  All FAQ text is passed as props from the Server Component.
//
//  KEY SEO TRICK — same pattern as ReImaginingSnacking:
//  We use CSS max-height to hide/show answers instead of
//  {expandedIndex === index && <div>answer</div>}
//  This means ALL answers are always in the HTML for Google,
//  even when collapsed visually for the user.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react';
import './FAQSection.module.css';

const INITIAL_COUNT = 3;

export default function FAQClient({ faqs }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [visibleCount, setVisibleCount]   = useState(INITIAL_COUNT);

  const isExpanded = visibleCount >= faqs.length;

  return (
    <section className="faq-section" aria-label="Frequently asked questions about Go-Grab vending machines">
      <h2>Got Questions? We've Got Answers!</h2>

      {/*
        We render ALL faqs in the DOM but use CSS to hide the
        ones beyond visibleCount (opacity + pointer-events).
        This way Google always sees every question & answer.
      */}
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen    = expandedIndex === index;
          const isVisible = index < visibleCount;

          return (
            <div
              key={index}
              className="faq-item"
              style={{
                // Visually hide extra items but keep in DOM for Google
                display: isVisible ? 'block' : 'none',
              }}
            >
              <div
                className="faq-question"
                onClick={() => setExpandedIndex(isOpen ? null : index)}
                role="button"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setExpandedIndex(isOpen ? null : index)}
              >
                {/*
                  Each question rendered as <h3> — proper heading hierarchy.
                  Google treats h3 text as important page content.
                  h2 = section title, h3 = individual questions.
                */}
                <h3 className="faq-question-text">{faq.question}</h3>
                <button
                  className="dropdown-button"
                  aria-label={isOpen ? 'Collapse answer' : 'Expand answer'}
                  tabIndex={-1}  // parent div handles keyboard nav
                >
                  {isOpen ? '−' : '+'}
                </button>
              </div>

              {/*
                CSS max-height accordion — answer is ALWAYS in HTML,
                just visually hidden when collapsed.
                Google crawls the full answer text regardless.
              */}
              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                style={{
                  maxHeight: isOpen ? '500px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                  padding: isOpen ? '20px' : '0 20px',
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show more / show less */}
      {!isExpanded ? (
        <button
          className="view-more-button"
          style={{ marginTop: '60px', marginBottom: '60px' }}
          onClick={() => setVisibleCount(faqs.length)}
          aria-label="View all frequently asked questions"
        >
          View More
        </button>
      ) : (
        <button
          className="view-more-button"
          style={{ marginTop: '60px', marginBottom: '60px' }}
          onClick={() => setVisibleCount(INITIAL_COUNT)}
          aria-label="Show fewer frequently asked questions"
        >
          Show Less
        </button>
      )}
    </section>
  );
}