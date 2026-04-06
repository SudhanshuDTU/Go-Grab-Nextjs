// src/app/sitemap.js
// ─────────────────────────────────────────────────────────────
//  Next.js generates /sitemap.xml automatically from this file.
//  No package needed — built into Next.js 13.3+
//
//  Also fetches all blog post slugs from Appwrite so every
//  blog post URL is included in the sitemap.
//  Google uses the sitemap to discover and index all your pages.
// ─────────────────────────────────────────────────────────────

import { Client, Databases, Query } from 'appwrite';

const SITE_URL      = 'https://www.go-grab.in';
const DATABASE_ID   = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = '6825c8b6002b40cda13f';

// ── Fetch all blog slugs from Appwrite ──
async function getAllBlogSlugs() {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

    const databases = new Databases(client);
    const allSlugs  = [];
    let   offset    = 0;
    const limit     = 100;

    // Paginate through all blog posts
    while (true) {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc('$createdAt'),
          Query.select(['slug_route', '$createdAt', '$updatedAt']),
        ]
      );

      allSlugs.push(...response.documents);

      // Stop when we've fetched everything
      if (allSlugs.length >= response.total) break;
      offset += limit;
    }

    return allSlugs;
  } catch (err) {
    console.error('[sitemap] Failed to fetch blog slugs:', err.message);
    return [];
  }
}

// ── Static routes ──
// changeFrequency: how often Google should re-crawl
// priority: 0.0 – 1.0 (home = highest, legal = lowest)
const STATIC_ROUTES = [
  {
    url:             `${SITE_URL}`,
    lastModified:    new Date(),
    changeFrequency: 'weekly',
    priority:        1.0,          // Home page — highest priority
  },
  {
    url:             `${SITE_URL}/products`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.9,
  },
  {
    url:             `${SITE_URL}/collaborations`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.9,
  },
  {
    url:             `${SITE_URL}/blog`,
    lastModified:    new Date(),
    changeFrequency: 'daily',      // Blog index changes often — new posts
    priority:        0.8,
  },
  {
    url:             `${SITE_URL}/support`,
    lastModified:    new Date(),
    changeFrequency: 'monthly',
    priority:        0.6,
  },
  {
    url:             `${SITE_URL}/privacy-policy`,
    lastModified:    new Date(),
    changeFrequency: 'yearly',
    priority:        0.3,          // Legal page — low priority
  },
];

// ── Main sitemap export ──
export default async function sitemap() {
  const blogSlugs = await getAllBlogSlugs();

  // Build blog post URLs
  const blogRoutes = blogSlugs.map((blog) => ({
    url:             `${SITE_URL}/blog/${blog.slug_route || blog.$createdAt}`,
    lastModified:    new Date(blog.$updatedAt || blog.$createdAt),
    changeFrequency: 'monthly',
    priority:        0.7,          // Blog posts rank below main pages
  }));

  return [...STATIC_ROUTES, ...blogRoutes];
}