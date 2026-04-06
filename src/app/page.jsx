// src/app/page.jsx
// ─────────────────────────────────────────────────────────────
//  HOME PAGE — Server Component (no "use client")
//  Runs on the server → HTML is pre-rendered → Google can read it
//  This is the most important page for "vending machine" ranking
// ─────────────────────────────────────────────────────────────

// ── Page-level SEO metadata (overrides layout defaults for this page) ──
export const metadata = {
  title: "Go-Grab | Vending Machine Company in India",
  description:
    "Go-Grab installs smart, cashless vending machines across campuses, offices & malls in India. 24/7 automated snacking with zero hassle. Get a machine today!",
  alternates: {
    canonical: "https://www.go-grab.in",
  },
  openGraph: {
    title: "Go-Grab | Vending Machine Company in India",
    description:
      "India's smartest vending machine company. Cashless, 24/7, automated. Install a Go-Grab vending machine at your campus or office.",
    url: "https://www.go-grab.in",
    images: [
      {
        url: "https://www.go-grab.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "Go-Grab Smart Vending Machines in India",
      },
    ],
  },
};

// ── Import all your existing home sections (no changes needed inside them yet) ──
import HeroSection from "@/components/HomeScreen/HeroSection/HeroSection";
import HowItWorks from "@/components/HomeScreen/HowItWorks/HowItWorks";
import TrustedByUsers from "@/components/HomeScreen/TrustedByUsers/TrustedByUsers";
import EmpoweringCampuses from "@/components/HomeScreen/EmpoweringCampuses/EmpoweringCampuses";
import WhyGoGrab from "@/components/HomeScreen/WhyGoGrab/WhyGoGrab";
import CampusFeedback from "@/components/HomeScreen/CampusFeedback/CampusFeedback";
import BlogSection from "@/components/HomeScreen/BlogSection/BlogSection";
import FAQSection from "@/components/HomeScreen/FAQSection/FAQSection";
import ReImaginingSnacking from "@/components/HomeScreen/ReImaginingSnacking/ReImaginingSnacking";
import Footer from "@/components/HomeScreen/Footer/Footer";
import HomeClient from "./HomeClient";
import { useModal } from "@/context/ModalContext";

// ── JSON-LD for Home page: FAQ schema boosts Google rich results ──
// Replace these with your real FAQs from FAQSection
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Go-Grab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go-Grab is a smart vending machine company in India that installs cashless, automated vending machines on campuses, offices, and public spaces.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get a Go-Grab vending machine installed?",
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Simply click "Get A Go-Grab Machine" on our website and fill out the partnership form. Our team will contact you within 24 hours.',
      },
    },
    {
      "@type": "Question",
      name: "What products are available in Go-Grab vending machines?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go-Grab vending machines stock a wide range of snacks, beverages, and daily essentials suited for campus and office environments.",
      },
    },
    {
      "@type": "Question",
      name: "Is Go-Grab vending machine cashless?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Go-Grab vending machines support UPI, cards, and other digital payment methods for a fully cashless experience.",
      },
    },
    {
      "@type": "Question",
      name: "In which cities does Go-Grab operate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Go-Grab currently operates across multiple cities in India including Delhi NCR, Bangalore, Mumbai, and is rapidly expanding.",
      },
    },
  ],
};

export default function HomePage() {
  
  return (
    <>
      {/* FAQ Rich Result structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/*
        HomeClient is a thin "use client" wrapper that passes openModal
        down to sections that need it (HeroSection, WhyGoGrab, Footer).
        Pure display sections (HowItWorks, TrustedByUsers etc.) stay server-rendered.
      */}
      <HomeClient />
   
      {/* Pure server-rendered sections — Google reads these directly */}
      
    
     
      <CampusFeedback />
      <BlogSection />
      <FAQSection />
      <ReImaginingSnacking />
    </>
  );
}
