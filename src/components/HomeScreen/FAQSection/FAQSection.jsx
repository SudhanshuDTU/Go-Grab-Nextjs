// src/components/HomeScreen/FAQSection/FAQSection.jsx
// ─────────────────────────────────────────────────────────────
//  SERVER COMPONENT — passes FAQ data to FAQClient.
//
//  SEO strategy:
//  The FAQ data lives here (server) so ALL questions and answers
//  are in the HTML Google crawls — even collapsed ones.
//  FAQClient handles only the open/close toggle UI.
//
//  The FAQPage JSON-LD schema is added in src/app/page.jsx
//  (already done earlier). This component just renders the
//  visible HTML which Google also reads directly.
// ─────────────────────────────────────────────────────────────

import FAQClient from './FAQClient';

// ── All FAQ data lives here on the server ──
// Every question and answer is rendered into HTML by the server.
// Google reads all of them regardless of which ones are "open".
export const FAQS = [
  {
    question: 'What are the benefits of partnering with Go-Grab vending machines?',
    answer:
      'You get a fully automated, contactless vending solution installed at your location — no setup, no hassle. We manage everything from stocking to tech while improving user convenience and footfall experience.',
  },
  {
    question: 'What types of locations work best for Go-Grab machines?',
    answer:
      'Our machines thrive in high-footfall areas like colleges, hostels, offices, hospitals, gyms, metro stations, and shared living/workspaces.',
  },
  {
    question: 'How much space is needed for a vending machine?',
    answer:
      "Go-Grab machines typically require about 2.5 ft (width) × 4 ft (depth) of floor space, roughly 1 square meter. We'll help you choose the most visible and accessible spot.",
  },
  {
    question: 'What kind of products are available in Go-Grab machines?',
    answer:
      'A curated mix of branded snacks, drinks, and healthy options — updated regularly based on customer preferences and location type.',
  },
  {
    question: 'Who takes care of restocking the machine?',
    answer:
      'Our local ops team handles all inventory and restocking. You never have to manage stock or logistics.',
  },
  {
    question: 'What happens if the machine has a technical issue?',
    answer:
      'We resolve most issues remotely. If on-site service is needed, a technician is dispatched within 24 hours to minimize downtime.',
  },
  {
    question: 'What kind of technology powers Go-Grab machines?',
    answer:
      'Our machines feature touchscreen displays, UPI & contactless payments, real-time stock monitoring, remote diagnostics, and energy-efficient operation.',
  },
  {
    question: 'What is the uptime or reliability of Go-Grab machines?',
    answer:
      "Our machines operate with 99%+ uptime. They're remotely monitored 24/7 and supported by proactive maintenance and alerts.",
  },
  {
    question: "Can we have exclusive machines with just our brand's products?",
    answer:
      'Yes. We offer branded machines dedicated entirely to your product line — ideal for sampling, awareness campaigns, or high-impact visibility.',
  },
  {
    question: 'Do you offer vending machines for purchase?',
    answer:
      'Yes. We offer machines for entrepreneurs or businesses that want to operate independently, along with training and maintenance options.',
  },
  {
    question: 'Where can I find a vending machine near me?',
    answer:
      'You can find a Go-Grab vending machine in offices, colleges, malls, metro stations, and gyms across India — offering quick access to snacks and beverages.',
  },
  {
    question: 'Which is the best vending machine in India?',
    answer:
      'Go-Grab offers some of the best smart vending machines in India — featuring UPI payments, real-time monitoring, and a wide range of snacks and beverages suited for offices and campuses.',
  },
  {
    question: 'How much does a vending machine cost in India?',
    answer:
      'A vending machine in India can cost anywhere between ₹1.5 lakh to ₹5 lakh, depending on size, features, and capacity. Go-Grab also offers a zero-investment installation model for location partners.',
  },
  {
    question: 'Do vending machines in India accept UPI payments?',
    answer:
      'Yes, all Go-Grab vending machines support UPI, debit/credit cards, and digital wallets for a fully cashless transaction experience.',
  },
  {
    question: 'What products can a vending machine in India sell?',
    answer:
      'A vending machine in India can sell snacks, drinks, tea/coffee, personal care items, and more. Go-Grab machines stock a curated selection updated based on location demand.',
  },
];

export default function FAQSection() {
  return <FAQClient faqs={FAQS} />;
}