// src/app/blog/[id]/page.jsx
// ─────────────────────────────────────────────────────────────
//  SERVER COMPONENT — fetches blog post on the server.
//  Google gets the full blog content pre-rendered in HTML.
//
//  generateMetadata() — creates unique title + description
//  for every blog post dynamically from Appwrite data.
//  This replaces <Helmet> entirely.
// ─────────────────────────────────────────────────────────────

import { Client, Databases, Query } from 'appwrite';
import Link from 'next/link';
import './BlogDetail.css';

const DATABASE_ID   = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = '6825c8b6002b40cda13f';

// ── Shared fetch function ──
async function getBlog(id) {
  try {
    const client = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

    const databases = new Databases(client);

    // First try: match by slug_route
    let response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal('slug_route', id), Query.limit(1)]
    );

    // Fallback: match by $createdAt
    if (response.documents.length === 0) {
      response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal('$createdAt', id), Query.limit(1)]
      );
    }

    return response.documents[0] || null;
  } catch (err) {
    console.error('[BlogDetail] fetch error:', err.message);
    return null;
  }
}

// ── Dynamic metadata — unique per blog post ──
// Next.js calls this before rendering, injects into <head>.
// Replaces <Helmet> with actual server-side metadata.
export async function generateMetadata({ params }) {
  const { id } = await params; 
  const blog = await getBlog(id);

  if (!blog) {
    return {
      title: 'Blog Post Not Found | Go-Grab',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  // Strip HTML tags from content for meta description
  const plainContent = blog.content
    ? blog.content.replace(/<[^>]+>/g, '').slice(0, 160)
    : 'Read our latest blog post about smart vending innovation.';

  return {
    title: `${blog.title} | Go-Grab Blog`,
    description: blog.slug || plainContent,
    alternates: {
      canonical: `https://www.go-grab.in/blog/${params.id}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.slug || plainContent,
      url: `https://www.go-grab.in/blog/${params.id}`,
      type: 'article',
      publishedTime: blog.$createdAt,
      authors: [blog.author || 'Go-Grab'],
      images: blog.image
        ? [{ url: blog.image, alt: blog.alt || blog.title }]
        : [{ url: 'https://www.go-grab.in/og-image.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.slug || plainContent,
      images: blog.image ? [blog.image] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  // ── Not found ──
  if (!blog) {
    return (
      <div className="error-container">
        <h1>Blog post not found</h1>
        <Link href="/blog">← Back to Blog</Link>
      </div>
    );
  }

  // ── BlogPosting JSON-LD schema ──
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.slug || '',
    datePublished: blog.$createdAt,
    dateModified: blog.$updatedAt || blog.$createdAt,
    author: {
      '@type': 'Organization',
      name: blog.author || 'Go-Grab',
      url: 'https://www.go-grab.in',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Go-Grab',
      url: 'https://www.go-grab.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.go-grab.in/logo.png',
      },
    },
    image: blog.image || 'https://www.go-grab.in/og-image.png',
    url: `https://www.go-grab.in/blog/${params.id}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.go-grab.in/blog/${params.id}`,
    },
  };

  return (
    <>
      {/* BlogPosting rich result schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Back link */}
      <div style={{ display: 'flex', width: '100%' }}>
        <Link
          href="/blog"
          style={{
            justifySelf: 'flex-start',
            marginLeft: '5%',
            marginTop: '3%',
          }}
          aria-label="Back to blog list"
        >
          ← Back
        </Link>
      </div>

      <article className="blog-detail">
        {/* h1 = blog post title — most important SEO element */}
        <h1>{blog.title}</h1>

        <p>
          <em>
            By {blog.author || 'Admin'} |{' '}
            {new Date(blog.$createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </em>
        </p>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.alt || blog.title}
            loading="lazy"
            style={{ maxWidth: '100%' }}
          />
        )}

        {/*
          dangerouslySetInnerHTML preserved — your blog content
          is stored as HTML in Appwrite. This is correct usage.
          Google can read HTML content rendered this way.
        */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </>
  );
}