// src/app/layout.jsx
// ─────────────────────────────────────────────────────────────
//  ROOT LAYOUT — runs on the SERVER (no "use client" here!)
//  This is where all SEO metadata, fonts, and GA script live.
//  Next.js injects <head> automatically from the `metadata` export.
// ─────────────────────────────────────────────────────────────

import Script from 'next/script';
import ClientLayout from './ClientLayout';

import '@/styles/App.css';
import '@/styles/index.css';

// ── Canonical domain — change to your real domain ──
const SITE_URL = 'https://www.go-grab.in';

// ────────────────────────────────────────────────────────────
//  METADATA — Next.js reads this and injects the <head> tags.
//  This is the #1 SEO lever. Every word here is crafted to
//  rank for "vending machine" and related queries in India.
// ────────────────────────────────────────────────────────────
export const metadata = {
  // ── Primary title tag (most important ranking factor) ──
  title: {
    // Default title shown on the home page
    default: 'Go-Grab | Smart Vending Machine Company in India',
    // Other pages use: "Products | Go-Grab" etc.
    template: '%s | Go-Grab Vending Machines',
  },

  // ── Meta description (shown in Google search results) ──
  description:
    'Go-Grab is India\'s leading smart vending machine company. Install cashless, 24/7 automated vending machines on campuses, offices & malls. Get a machine today!',

  // ── Keywords (not a direct ranking factor but good practice) ──
  keywords: [
    'vending machine',
    'vending machine company India',
    'smart vending machine',
    'cashless vending machine',
    'automated vending machine',
    'vending machine for campus',
    'vending machine for office',
    'Go-Grab vending machine',
    'snack vending machine India',
    'beverage vending machine India',
    'vending machine business India',
    'install vending machine',
  ],

  // ── Canonical URL — prevents duplicate content issues ──
  alternates: {
    canonical: SITE_URL,
  },

  // ── Author / Publisher ──
  authors: [{ name: 'Go-Grab', url: SITE_URL }],
  creator: 'Go-Grab',
  publisher: 'Go-Grab',

  // ── Open Graph — controls how links look on WhatsApp, LinkedIn etc ──
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Go-Grab',
    title: 'Go-Grab | Smart Vending Machine Company in India',
    description:
      'Install smart, cashless vending machines on your campus or office with Go-Grab. 24/7 automated snacking, zero hassle.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,  // Put a 1200x630 image in /public/og-image.png
        width: 1200,
        height: 630,
        alt: 'Go-Grab Smart Vending Machines',
      },
    ],
  },

  // ── Twitter card ──
  twitter: {
    card: 'summary_large_image',
    title: 'Go-Grab | Smart Vending Machine Company in India',
    description:
      'Install smart, cashless vending machines on your campus or office with Go-Grab.',
    images: [`${SITE_URL}/og-image.png`],
  },

  // ── Robots — tells Google to index & follow all links ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Verification (add your Google Search Console code here) ──
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },

  // ── Icons ──
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

// ────────────────────────────────────────────────────────────
//  JSON-LD STRUCTURED DATA
//  This is what makes Google show rich results (star ratings,
//  FAQs, business info) directly in the search page.
//  Schema: Organization + LocalBusiness
// ────────────────────────────────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'Go-Grab',
  alternateName: 'GoGrab Vending Machines',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'Go-Grab is a smart vending machine company in India offering cashless, automated vending solutions for campuses, offices, and malls.',
  foundingDate: '2023',
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  serviceType: [
    'Vending Machine Installation',
    'Smart Vending Machine',
    'Cashless Vending',
    'Campus Vending',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [
    // Add your real social media URLs here
    'https://www.instagram.com/gograb.in',
    'https://www.linkedin.com/company/go-grab',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Go-Grab',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/blog?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

// ────────────────────────────────────────────────────────────
//  ROOT LAYOUT COMPONENT
// ────────────────────────────────────────────────────────────
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ── JSON-LD Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* ── Preload custom fonts for performance ── */}
        <link
          rel="preload"
          href="/fonts/Manrope-Regular.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Manrope-Bold.ttf"
          as="font"
          type="font/truetype"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* ── Google Analytics 4 ── */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* ── Client layout handles navbar + modal + footer ── */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}