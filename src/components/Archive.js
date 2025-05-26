'use client';

import { useEffect, useState } from 'react';
import { formatArchiveDate } from '@/helpers/formatDate';

export default function Archive({ posts }) {
  const [isOpen, setIsOpen] = useState(false);

  // Add/remove 'fixed' class on <body> to prevent scrolling
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('fixed');
    } else {
      document.documentElement.classList.remove('fixed');
    }

    // Clean up on unmount just in case
    return () => document.body.classList.remove('fixed');
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('blog-index')) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="blog-index-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle blog index"
      ></button>

      <div
        className={`blog-index ${isOpen ? 'is-visible' : ''}`}
        aria-hidden={!isOpen}
        onClick={handleOverlayClick}
      >
        <div className="blog-index-box">
          <ul className="blog-index-list">
            {posts.map((post) => (
              <li className="blog-index-list-item" key={post.slug}>
                <span className="blog-index-list-date">{formatArchiveDate(post.date)}</span>
                <a href={`/${post.slug}`}>
                  <span dangerouslySetInnerHTML={{ __html: post.title }} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}