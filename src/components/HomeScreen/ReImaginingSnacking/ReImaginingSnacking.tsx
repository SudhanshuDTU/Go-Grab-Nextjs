// src/components/HomeScreen/ReImaginingSnacking/ReImaginingSnacking.jsx
// ─────────────────────────────────────────────────────────────
//  SPLIT into two parts for maximum SEO:
//
//  1. ReImaginingSnacking (this file) — SERVER COMPONENT
//     The full keyword-rich text content is rendered on the server.
//     Google crawls every word: "vending machine", "smart vending",
//     "snack vending machine India" etc. — without waiting for JS.
//
//  2. ReImaginingSnackingClient — CLIENT COMPONENT
//     Only the expand/collapse toggle logic is client-side.
//     The TEXT itself is always in the HTML regardless of toggle state
//     (using CSS visibility, not conditional rendering) so Google
//     always sees the full content.
// ─────────────────────────────────────────────────────────────

import ReImaginingSnackingClient from './ReImaginingSnackingClient';

// ── All the SEO content lives here as a plain constant ──
// This makes it easy to update copy without touching component logic.
const SECTIONS = [
  {
    heading: 'Reimagining Snacking with Smart Vending Technology',
    paragraphs: [
      'The way we grab a snack is evolving. At Go-Grab, we\'re building a smarter, more connected world where access to your favorite treats, drinks, and essentials is just a tap away. From college campuses and tech parks to retail outlets and residential communities, our network of intelligent smart vending machines is redefining convenience through automation, innovation, and accessibility.',
      'Whether you\'re hunting for a chocolate vending machine, looking to expand your vending machine business, or just searching "vending machines near me" on your phone, Go-Grab is there, right when and where you need it.',
      'But we\'re not just placing machines — we\'re building a movement.',
    ],
  },
  {
    heading: 'The Go‑Grab Advantage: More Than Just Vending',
    paragraphs: [
      'We go beyond traditional snack machines or basic vending machines. Go‑Grab is leading the charge in smart vending, bringing a fresh, intuitive experience to the way people interact with machines. Each vending machine is stocked with popular snacks, curated products, and even healthy food vending machine options — perfect for workplaces, malls, hostels, and public spaces.',
      'Dreaming of getting into the vending business? Whether you\'re just starting out or scaling up, Go‑Grab is the ultimate launchpad. Our solutions are perfect for anyone searching "vending machine business near me," "I want to buy a vending machine," or "rent vending machine". We help set up your snack machine business and guide you from strategy to restocking.',
      'We make the process seamless with easy onboarding, backend analytics, and nationwide servicing. Our machines are modular, and support everything from vending chocolate and drinks to healthy snacks in a vending machine and even IT vending machine components.',
    ],
  },
  {
    heading: 'Smart Kiosks for Smarter Locations',
    paragraphs: [
      'Whether you\'re setting up a kiosk machine in a metro station or deploying a retail vending machine inside your office complex, we make sure the tech adapts to your needs. Our vending kiosk solutions integrate smart vending machine technology with sleek UI, cashless payments, and real-time tracking for optimal control.',
      'Running a corporate pantry? Our corporate vending machines are designed for high traffic with minimal management. Need vending machines for offices or schools? We handle delivery, installation, and stocking. With Go-Grab, every snack dispenser becomes a smart node in your ecosystem — serving people effortlessly with vending machines with snacks and beverage vending options that keep them coming back.',
    ],
  },
  {
    heading: 'Built for Growth: From a Snack to a Business',
    paragraphs: [
      'The real power of Go‑Grab lies in its flexibility. We serve everyone from entrepreneurs investing in a snack vending machine business for sale to global companies deploying vending machine smart fleets across cities. Whether you\'re interested in buying a snack machine, chip vending machine for sale, or even setting up a smart food vending machine, Go-Grab can power your journey.',
      'With support for retail kiosks, vending machine payment systems, QR code integration, and app-based tracking, our platform is built for scale. You don\'t just operate a vending machine — you build a tech-enabled, data-rich vending machine business with insights that help you grow.',
    ],
  },
  {
    heading: 'Why Now? Because the Future is Automated Retail',
    paragraphs: [
      'In a world where convenience is king, automatic vending is the silent revolution reshaping retail. People are no longer limited by store hours or shelf space. With a Go‑Grab snack vending machine in India, you bring products directly to where they\'re needed most — without the overhead of traditional retail.',
      'Whether you\'re stocking chips in vending machines, running a potato chip vending machine, or exploring healthy food vending machine business opportunities, Go‑Grab is your strategic partner. And if you\'re searching online for "vending near me," "vendo snack machine," or "vending machine with food," chances are we\'re already nearby.',
    ],
  },
  {
    heading: 'Join the Go‑Grab Network',
    paragraphs: [
      'We believe in a future where access to quality products is seamless, instant, and smart. Our mission is to democratize vending through design, service, and technology. And we\'re not alone — hundreds of partners, from startups to institutions, are tapping into our ecosystem to kickstart their vending mission.',
      'With full-service support, nationwide coverage, and constant innovation, Go‑Grab is more than just a vending machine company — we\'re a smart retail movement, helping individuals and businesses scale through automation.',
      'So, whether you\'re a property manager looking to install a snack vending machine for home, a college seeking a vending machine for chocolate, or an entrepreneur ready to buy vending machines and locations, Go-Grab is your launchpad into the future of retail.',
    ],
  },
];

export default function ReImaginingSnacking() {
  return (
    /*
      ReImaginingSnackingClient handles the expand/collapse UI.
      We pass the content as a prop so the SERVER renders all the
      text into the HTML — Google reads it regardless of toggle state.
    */
    <ReImaginingSnackingClient sections={SECTIONS} />
  );
}