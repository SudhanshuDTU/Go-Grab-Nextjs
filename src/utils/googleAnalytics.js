// src/utils/googleAnalytics.js
// ─────────────────────────────────────────────────────────────
//  Works in Next.js — safely checks for window (SSR guard)
// ─────────────────────────────────────────────────────────────
 
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-JH99BFC6V9';
 
export const trackPageView = (path) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  });
};
 
export const trackEvent = (eventName, params = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
};
 




