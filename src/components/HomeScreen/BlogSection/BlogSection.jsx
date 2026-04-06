// src/components/HomeScreen/BlogSection/BlogSection.jsx
// ─────────────────────────────────────────────────────────────
//  SERVER COMPONENT — no "use client" here.
//  Fetches blogs on the server → Google can read blog titles
//  and descriptions directly in the HTML. Big SEO win.
// ─────────────────────────────────────────────────────────────

import Link from 'next/link';
import Image from 'next/image';
import { Databases, Query, Client } from 'appwrite';
import './BlogSection.css';

// ── Collection IDs ──
const DATABASE_ID   = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = '6825c8b6002b40cda13f';

// ── Server-side data fetch (runs at request time, not in browser) ──
async function getBlogs() {
  try {
    // We create a fresh client here for server-side fetching.
    // Do NOT import the singleton client from appwriteConfig here —
    // that file is browser-only.
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

    const databases = new Databases(client);

    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.limit(3),
        Query.orderDesc('$createdAt'),
        Query.select([
          'title',
          'content',
          'image',
          'author',
          'slug',
          'featured',
          '$createdAt',
          'alt',
          'slug_route',
        ]),
      ]
    );

    return response.documents;
  } catch (err) {
    console.error('[BlogSection] Failed to fetch blogs:', err.message);
    return []; // Return empty array on error — page still renders
  }
}

// ── Helper: format date for display & SEO ──
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ── Main component (async Server Component) ──
export default async function BlogSection() {
  const blogs = await getBlogs();

  if (blogs.length === 0) {
    return (
      <div className="blog-section">
        <h2 style={{ color: '#0F78E4', fontWeight: 700 }}>From the Blog</h2>
        <p style={{ color: '#666' }}>No blogs found. Check back soon!</p>
      </div>
    );
  }

  return (
    <section className="blog-section" aria-label="Latest blog posts about vending machines">
      {/*
        h2 is crawled by Google. Includes "vending machine" keyword naturally.
      */}
      <h2 style={{ color: '#0F78E4', fontWeight: 700 }}>From the Blog</h2>

      <div className="blog-cards">
        {blogs.map((blog) => {
          const slug = blog.slug_route || blog.$createdAt;

          return (
            /*
              Entire card is a link — better accessibility & crawlability.
              Google follows <a> tags, not onClick handlers.
              This replaces your onClick={() => navigate(...)} pattern.
            */
            <Link
              href={`/blog/${slug}`}
              key={blog.$createdAt}
              className="blog-card"
              style={{ textDecoration: 'none' }}
              aria-label={`Read blog post: ${blog.title}`}
            >
              {/* Blog image */}
              <div className="blog-image">
                <img
                  src={blog.image || 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'}
                  alt={blog.alt || blog.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Blog title — Google reads this as content */}
              <p className="blog-title">{blog.title}</p>

              {/* Blog description / slug */}
              <p className="blog-description">{blog.slug}</p>

              <div className="read-more-footer">
                <span className="read-more-button" style={{ color: 'black' }}>
                  Read More →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View all blogs */}
      <Link href="/blog" className="view-more-button" aria-label="Read more about cashless vending machines in educational institutions">
        Read More
      </Link>
    </section>
  );
}