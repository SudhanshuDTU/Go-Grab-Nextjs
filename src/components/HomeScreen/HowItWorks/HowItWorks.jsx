// src/components/HomeScreen/HowItWorks/HowItWorks.jsx
// ─────────────────────────────────────────────────────────────
//  SERVER COMPONENT — pure display, zero interactivity.
//  No "use client" → fully SSR'd → Google reads every word.
//
//  Changes from original:
//  1. <img> → next/image for performance (LCP/CLS improvement)
//  2. Steps data moved to array — clean and easy to update
//  3. Semantic <section> + <ol> instead of <div> + <div>
//     Google understands ordered steps better than generic divs
//  4. HowTo JSON-LD schema — Google can show this as a
//     rich result ("How to use a vending machine") in search
// ─────────────────────────────────────────────────────────────

import Image from 'next/image';
import './HowItWorks.css';

import tapAndBrowseImage from '@/assets/tap-and-browse.png';
import payCashlessImage  from '@/assets/pay-cashless.png';
import grabAndEnjoyImage from '@/assets/grab-and-enjoy.png';

// ── Steps data ──
const STEPS = [
  {
    img:         tapAndBrowseImage,
    alt:         'Tap and browse snacks on a Go-Grab smart vending machine touchscreen',
    title:       'Tap and Browse Snacks on a Smart Vending Machine',
    label:       'Tap & Browse',
    description: 'Scroll, swipe, and find what you\'re craving.',
  },
  {
    img:         payCashlessImage,
    alt:         'Pay cashless via UPI on a Go-Grab smart vending machine',
    title:       'Pay Instantly via UPI on a Smart Vending Machine',
    label:       'Pay Cashless',
    description: 'Choose your item(s) and pay instantly via UPI.',
  },
  {
    img:         grabAndEnjoyImage,
    alt:         'Grab snacks from a Go-Grab vending machine near you',
    title:       'Grab Snacks Easily from a Vending Machine Nearby',
    label:       'Grab & Enjoy',
    description: 'Grab the snack, and you\'re good to go.',
  },
];

// ── HowTo structured data ──
// Google can show this as a rich result in search:
// "How to use a Go-Grab vending machine — 3 steps"
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Use a Go-Grab Smart Vending Machine',
  description:
    'A simple 3-step guide to buying snacks and drinks from a Go-Grab cashless vending machine.',
  totalTime: 'PT2M',
  step: STEPS.map(({ label, description }, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: label,
    text: description,
  })),
};

export default function HowItWorks() {
  return (
    <section className="how-it-works" aria-label="How to use a Go-Grab vending machine">

      {/* HowTo rich result schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* h2 keyword: "snacking", "simple" — pairs with h1 "Instant Snacking" */}
      <h2 style={{ color: '#0F78E4' }}>Snacking Made Simple</h2>

      {/*
        <ol> instead of <div> — ordered list is semantically correct
        for a sequence of steps. Google understands numbered steps
        and may display them as a featured snippet.
      */}
      <ol className="steps">
        {STEPS.map(({ img, alt, title, label, description }, index) => (
          <li className="step" key={label}>
            <Image
              src={img}
              alt={alt}
              title={title}
              width={250}
              height={250}
              loading="lazy"
              className="imgStep"
              sizes="(max-width: 768px) 200px, 250px"
            />
            {/* <h3> for each step — proper heading hierarchy for Google */}
            <h3 className="step-label">{label}</h3>
            <p className="description">{description}</p>
          </li>
        ))}
      </ol>

    </section>
  );
}