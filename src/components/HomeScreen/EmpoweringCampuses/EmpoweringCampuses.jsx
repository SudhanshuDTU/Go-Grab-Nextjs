// src/components/HomeScreen/EmpoweringCampuses/EmpoweringCampuses.jsx
// ─────────────────────────────────────────────────────────────
//  "use client" — needs useState for show more/less toggle.
//
//  Changes from original:
//  1. Removed duplicate React code (your file had both versions)
//  2. All <img> → next/image with proper per-campus alt text
//  3. Named campus array — specific alt text per logo is much
//     better for SEO than generic "College 1", "College 2"
//  4. JSON-LD structured data for partner institutions
//  5. @/ alias imports
// ─────────────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import Image from 'next/image';
import './EmpoweringCampuses.module.css';

import image1  from '@/assets/campuses/66e9b6cd7013609025eecccaec8e7f519a49a766.webp';
import image2  from '@/assets/campuses/6d52f9781dc5fe13ebbe9ef30844161c81654125.webp';
import image3  from '@/assets/campuses/1f276a17670c5ec511f79730688891862899000b.webp';
import image4  from '@/assets/campuses/a0646e25839ab0dfc1c7d0071687232bab44c927.webp';
import image5  from '@/assets/campuses/5fe293ac78fcbf46dd2eb7d97fb83ae4e1672887.webp';
import image6  from '@/assets/campuses/2e0e50d78e2b5e10545a16e26390381c809c4b68.webp';
import image7  from '@/assets/campuses/a8b54314529e4bb009632eafd01b8a3d2c7d1c8a.webp';
import image8  from '@/assets/campuses/2ab4626b302aa93dc30f861525da1cc993ab3645.webp';
import image9  from '@/assets/campuses/2e38bf8873ab780fcc929d326aed3a96dbec014f.webp';
import image10 from '@/assets/campuses/9df1b6efa360dbb5977596ff80b81620d7fecb91.webp';
import image11 from '@/assets/campuses/94552bb9c4a204ff367c273cc62834885c730b02.webp';
import image12 from '@/assets/campuses/319ea602a8967d7ea8681f6547009536fb21cdc9.webp';
import image13 from '@/assets/campuses/71573d3293fa550daede488f1d4d653424724b51.webp';
import image14 from '@/assets/campuses/c40b7fbcd0a17fe44eea27b420122b8a7b49ce70.webp';
import image15 from '@/assets/campuses/5df0284854666c01cd2721833391ca94ddb7d232.webp';
import image16 from '@/assets/campuses/83da7c259a09997c61e924af0e5e8ca6d889e54e.webp';
import image17 from '@/assets/campuses/91432832472dbaaafe0d19ed98870b591628b295.webp';
import image18 from '@/assets/campuses/185811bcdf2aa582602d0089420509ea0823fc7e.webp';
import image19 from '@/assets/campuses/isb.webp';
import image20 from '@/assets/campuses/iilm-Photoroom.webp';
import image21 from '@/assets/campuses/sharda-Photoroom.webp';

// ── Named campus list ──
// Replace "Partner Campus X" with real names as you expand.
// Specific names in alt text = better Google Image Search ranking.
const CAMPUSES = [
  { src: image1,  alt: 'Go-Grab smart vending machine at partner campus',              name: 'Partner Campus 1'  },
  { src: image2,  alt: 'Go-Grab vending machine installed at college campus India',   name: 'Partner Campus 2'  },
  { src: image3,  alt: 'Smart snack vending machine at university campus',             name: 'Partner Campus 3'  },
  { src: image4,  alt: 'Go-Grab cashless vending machine at educational institution', name: 'Partner Campus 4'  },
  { src: image5,  alt: 'Automated vending machine for campus canteen by Go-Grab',     name: 'Partner Campus 5'  },
  { src: image6,  alt: 'Go-Grab vending machine at engineering college India',        name: 'Partner Campus 6'  },
  { src: image7,  alt: 'Smart vending machine installed at management institute',     name: 'Partner Campus 7'  },
  { src: image21, alt: 'Sharda University smart vending machine by Go-Grab',          name: 'Sharda University' },
  { src: image19, alt: 'ISB campus smart vending machine by Go-Grab',                 name: 'ISB'               },
  { src: image10, alt: 'Go-Grab vending machine at premier institution campus',       name: 'Partner Campus 10' },
  { src: image11, alt: 'Smart snack dispenser at campus hostel by Go-Grab',           name: 'Partner Campus 11' },
  { src: image12, alt: 'Go-Grab 24/7 vending machine at university library',          name: 'Partner Campus 12' },
  { src: image13, alt: 'Cashless vending machine at college food court',              name: 'Partner Campus 13' },
  { src: image14, alt: 'Go-Grab smart vending kiosk at business school',              name: 'Partner Campus 14' },
  { src: image15, alt: 'Automated snack machine at technology campus',                name: 'Partner Campus 15' },
  { src: image16, alt: 'Go-Grab vending machine at residential university campus',    name: 'Partner Campus 16' },
  { src: image17, alt: 'Smart vending machine for campus convenience store',          name: 'Partner Campus 17' },
  { src: image18, alt: 'Go-Grab beverage vending machine at college cafeteria',       name: 'Partner Campus 18' },
  { src: image9,  alt: 'Vending machine solution for college campus by Go-Grab',      name: 'Partner Campus 19' },
  { src: image20, alt: 'IILM campus smart vending machine by Go-Grab',                name: 'IILM'              },
];

const INITIAL_COUNT = 10;

// ── JSON-LD schema ──
const campusSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Educational Institutions with Go-Grab Vending Machines',
  description:
    'Premier campuses and universities across India using Go-Grab smart vending machines for 24/7 cashless snacking.',
  numberOfItems: CAMPUSES.length,
  itemListElement: CAMPUSES.map(({ name }, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'CollegeOrUniversity',
      name,
      description:
        'Go-Grab smart vending machine installed for 24/7 cashless snack and beverage access.',
    },
  })),
};

export default function EmpoweringCampuses() {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const isExpanded = visibleCount >= CAMPUSES.length;

  return (
    <section className="empowering-campuses" aria-label="Campuses partnered with Go-Grab vending machines">

      {/* Structured data for partner institutions */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(campusSchema) }}
      />

      <h2>Loved Across Campuses</h2>
      <p className="campus-subtitle">
        Trusted by 20+ premier institutions across India
      </p>

      <div className="college-images">
        {CAMPUSES.slice(0, visibleCount).map(({ src, alt, name }, index) => (
          <div key={name} className="campus-image-wrapper">
            <Image
              src={src}
              alt={alt}
              title={`${name} — Go-Grab Smart Vending Machine`}
              width={150}
              height={150}            
              className="campus-logo"
              loading={'lazy'}
              placeholder="blur"
              sizes="150px"
              style={{ backgroundColor: 'transparent', objectFit: 'scale-down' }}
            />
          </div>
        ))}
      </div>

      <div className="campus-btn-wrapper">
        {!isExpanded ? (
          <button
            className="view-more-button"
            onClick={() => setVisibleCount(CAMPUSES.length)}
            aria-label="View all partner campuses"
          >
            View More
          </button>
        ) : (
          <button
            className="view-more-button"
            onClick={() => setVisibleCount(INITIAL_COUNT)}
            aria-label="Show fewer campuses"
          >
            Show Less
          </button>
        )}
      </div>
    </section>
  );
}