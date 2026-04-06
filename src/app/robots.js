// src/app/robots.js
// ─────────────────────────────────────────────────────────────
//  Next.js generates /robots.txt automatically from this file.
//  No package needed — built into Next.js 13.3+
//
//  robots.txt tells search engine crawlers:
//  - Which pages TO crawl (Allow)
//  - Which pages NOT to crawl (Disallow)
//  - Where the sitemap is
// ─────────────────────────────────────────────────────────────

export default function robots() {
    return {
      rules: [
        {
          // ── Main rule for all crawlers ──
          userAgent: '*',
  
          // Pages Google SHOULD index
          allow: [
            '/',
            '/products',
            '/collaborations',
            '/blog',
            '/blog/',
            '/support',
          ],
  
          // Pages Google should NOT index
          // (saves crawl budget for pages that matter)
          disallow: [
            '/privacy-policy',   // Legal page — no SEO value
            '/api/',             // API routes — not for humans or bots
            '/_next/',           // Next.js internals
            '/static/',          // Static files
          ],
        },
  
        // ── Block AI training crawlers ──
        // Prevents your content being scraped for AI training datasets
        { userAgent: 'GPTBot',        disallow: ['/'] },
        { userAgent: 'ChatGPT-User',  disallow: ['/'] },
        { userAgent: 'Google-Extended', disallow: ['/'] },
        { userAgent: 'CCBot',         disallow: ['/'] },
        { userAgent: 'anthropic-ai',  disallow: ['/'] },
        { userAgent: 'Claude-Web',    disallow: ['/'] },
      ],
  
      // ── Sitemap location — tells Google where to find all your URLs ──
      sitemap: 'https://www.go-grab.in/sitemap.xml',
  
      // ── Crawl delay (optional) ──
      // Uncomment if your server gets hammered by bots:
      // crawlDelay: 1,
    };
  }