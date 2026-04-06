'use client';
// src/app/blog/BlogClient.jsx
// ─────────────────────────────────────────────────────────────
//  Handles pagination + blog card clicks.
//  Page 1 data comes pre-rendered from the server.
//  Pages 2+ are fetched client-side via Appwrite.
// ─────────────────────────────────────────────────────────────

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Client, Databases, Query } from 'appwrite';

export default function BlogClient({
  initialBlogs,
  initialTotalPages,
  blogsPerPage,
  databaseId,
  collectionId,
}) {
  const router = useRouter();
  const [blogs,       setBlogs]       = useState(initialBlogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,  setTotalPages]  = useState(initialTotalPages);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);

  const fetchPage = async (page) => {
    try {
      setLoading(true);
      setError(null);

      const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

      const databases = new Databases(client);
      const offset    = (page - 1) * blogsPerPage;

      const response = await databases.listDocuments(
        databaseId,
        collectionId,
        [
          Query.limit(blogsPerPage),
          Query.offset(offset),
          Query.orderDesc('$createdAt'),
          Query.select([
            'title', 'content', 'image', 'author',
            'slug', 'featured', '$createdAt', 'slug_route', 'alt',
          ]),
        ]
      );

      setBlogs(response.documents);
      setTotalPages(Math.ceil((response.total || 0) / blogsPerPage));
      setCurrentPage(page);
      // Scroll to top of blog list
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      fetchPage(page);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric', month: 'short', year: 'numeric',
    });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading blogs</h2>
        <p>{error}</p>
        <button onClick={() => fetchPage(currentPage)}>Retry</button>
      </div>
    );
  }

  return (
    <>
      <div className="blog-section">
        <div className="blog-cards">
          {blogs.map((blog) => {
            const slug = blog.slug_route || blog.$createdAt;
            return (
              /*
                Whole card is a <Link> — crawlable by Google.
                Replaces onClick={() => navigate(...)}
              */
              <Link
                href={`/blog/${slug}`}
                key={blog.$createdAt}
                className="blog-card"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="blog-image">
                  <img
                    src={blog.image || 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png'}
                    alt={blog.alt || blog.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <p className="blog-title">{blog.title}</p>
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
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-arrow"
            aria-label="Previous page"
          >
            &lt;
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5)              pageNum = i + 1;
            else if (currentPage <= 3)        pageNum = i + 1;
            else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
            else                              pageNum = currentPage - 2 + i;

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`pagination-number ${currentPage === pageNum ? 'active' : ''}`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="pagination-ellipsis">...</span>
          )}
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`pagination-number ${currentPage === totalPages ? 'active' : ''}`}
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-arrow"
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      )}
    </>
  );
}