// src/app/blog/page.jsx
// ─────────────────────────────────────────────────────────────
//  SERVER COMPONENT — fetches first page of blogs on the server.
//  Google sees all blog titles + descriptions pre-rendered.
//  Pagination is handled client-side via BlogClient.
// ─────────────────────────────────────────────────────────────

import { Client, Databases, Query } from 'appwrite';
import Image from 'next/image';
import BlogClient from './BlogClient';
import blogImage from '@/assets/blogs.png';
import './BlogScreen.css';

// ── SEO Metadata (replaces <Helmet>) ──
export const metadata = {
  title: 'Go-Grab Blog | Vending Machine Insights & Innovations',
  description:
    'Explore the Go-Grab blog for the latest trends, technology, and success stories in smart vending machines, campus snacking, and automated retail in India.',
  alternates: { canonical: 'https://www.go-grab.in/blog' },
  openGraph: {
    title: 'Go-Grab Blog | Vending Machine Insights & Innovations',
    description:
      'Latest news, updates, and insights on smart vending machines in India from Go-Grab.',
    url: 'https://www.go-grab.in/blog',
  },
};

const BLOGS_PER_PAGE = 10;
const DATABASE_ID    = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID  = '6825c8b6002b40cda13f';

// ── Server-side blog fetch ──
async function getBlogs(page = 1) {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

    const databases = new Databases(client);
    const offset    = (page - 1) * BLOGS_PER_PAGE;

    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.limit(BLOGS_PER_PAGE),
        Query.offset(offset),
        Query.orderDesc('$createdAt'),
        Query.select([
          'title', 'content', 'image', 'author',
          'slug', 'featured', '$createdAt', 'slug_route', 'alt',
        ]),
      ]
    );

    return {
      blogs:      response.documents.map(doc => JSON.parse(JSON.stringify(doc))),
      total:      response.total || 0,
      totalPages: Math.ceil((response.total || 0) / BLOGS_PER_PAGE),
    };
  } catch (err) {
    console.error('[BlogScreen] fetch error:', err.message);
    return { blogs: [], total: 0, totalPages: 1 };
  }
}

// ── Blog list schema for Google ──
function buildBlogListSchema(blogs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Go-Grab Blog',
    description: 'Smart vending machine insights, campus snacking trends, and company updates.',
    url: 'https://www.go-grab.in/blog',
    blogPost: blogs.map((blog) => ({
      '@type': 'BlogPosting',
      headline: blog.title,
      description: blog.slug,
      datePublished: blog.$createdAt,
      author: { '@type': 'Organization', name: blog.author || 'Go-Grab' },
      url: `https://www.go-grab.in/blog/${blog.slug_route || blog.$createdAt}`,
      image: blog.image || '',
    })),
  };
}

export default async function BlogPage() {
  const { blogs, total, totalPages } = await getBlogs(1);

  return (
    <>
      {/* Blog list schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBlogListSchema(blogs)) }}
      />

      <div className="blog-screen">

        {/* ── Hero section ── */}
        <div className="contact-hero-section">
          <div className="contact-header">
            <h1>
              Go-Grab Insights &amp;{' '}
              <span className="highlight-text">Ideas</span>
            </h1>
            <p>
              Discover how we're transforming vending across campuses with
              innovation, real stories, and smart product thinking.
            </p>
          </div>
          <div className="contact-image-container">
            <Image
              src={blogImage}
              alt="Go-Grab vending machine blog — insights and innovations"
              className="contact-image"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* ── Blog list header ── */}
        <div className="blog-header">
          <h2>Our Blog</h2>
          <p>Latest news, updates, and insights on smart vending in India</p>
        </div>

        {/*
          BlogClient handles:
          - Rendering blog cards (passed initial data as props)
          - Client-side pagination (fetches new pages via Appwrite)
          - navigate() on card click
          Initial blogs are pre-rendered server-side for Google.
        */}
        <BlogClient
          initialBlogs={blogs}
          initialTotalPages={totalPages}
          blogsPerPage={BLOGS_PER_PAGE}
          databaseId={DATABASE_ID}
          collectionId={COLLECTION_ID}
        />

      </div>
    </>
  );
}