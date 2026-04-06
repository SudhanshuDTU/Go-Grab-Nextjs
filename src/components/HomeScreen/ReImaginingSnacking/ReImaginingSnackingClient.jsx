'use client';
// src/components/HomeScreen/ReImaginingSnacking/ReImaginingSnackingClient.jsx
// ─────────────────────────────────────────────────────────────
//  Handles ONLY the expand/collapse toggle.
//  Content is passed as props from the Server Component above.
//
//  KEY SEO TRICK:
//  We use CSS (max-height + overflow hidden) to hide/show content
//  instead of conditional rendering {isExpanded && <div>...}.
//  This means the full text is ALWAYS in the HTML that Google crawls,
//  even when the accordion is collapsed for the user.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function ReImaginingSnackingClient({ sections }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        width: '100%',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div
        style={{
          width: 'calc(100% - 40px)',
          maxWidth: '1200px',
          margin: '0 auto',
          backgroundColor: '#f9f9f9',
        }}
      >
        {/* ── Toggle row ── */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 16px 16px 10px',
            cursor: 'pointer',
          }}
          role="button"
          aria-expanded={isExpanded}
          aria-controls="reimagining-content"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsExpanded(!isExpanded)}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: 500,
              paddingLeft: '10px',
              marginLeft: '35px',
            }}
          >
            Know more about Go-Grab
          </h3>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {/*
          ── SEO-SAFE expandable content ──
          max-height transition instead of {isExpanded && ...}
          so Google always sees the full text in the HTML source.
        */}
        <div
          id="reimagining-content"
          style={{
            maxHeight: isExpanded ? '5000px' : '0px',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease',
            padding: isExpanded ? '0 16px 16px 20px' : '0 16px 0 20px',
            fontSize: '14px',
            lineHeight: '1.7',
            color: '#333',
            textAlign: 'left',
            marginLeft: '35px',
          }}
        >
          {sections.map((section, i) => (
            <div key={i} style={{ marginTop: i !== 0 ? '10px' : '0' }}>
              <p><strong>{section.heading}</strong></p>
              {section.paragraphs.map((para, j) => (
                <p key={j}>{para}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}