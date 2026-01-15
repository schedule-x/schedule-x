import React from 'react'
import Link from 'next/link'

// This would typically come from a CMS or file system
const blogPosts = [
  {
    id: 'schedule-x-v4',
    title: "Schedule-X v4: What's New",
    excerpt: 'Schedule-X v4 brings a new Time Grid Resource View to Schedule-X Premium and moves @schedule-x/drag-and-drop and @schedule-x/resize to Premium as part of a clearer free vs premium split.',
    date: '2026-01-15',
    author: 'Tom Österlund',
    readTime: '4 min read'
  },
  {
    id: 'schedule-x-v3-temporal-api',
    title: 'Schedule-X v3: Embracing the Future with Temporal API',
    excerpt: 'Schedule-X is migrating to Temporal API, which brings with it some exciting new features and oppotunities for the library.',
    date: '2025-08-29',
    author: 'Tom Österlund',
    readTime: '5 min read'
  }
]

export default function BlogPage() {
  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1 className="blog-title">Schedule-X Blog</h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', margin: 0 }}>
          Latest updates, tutorials, and insights about calendar development
        </p>
      </div>
      
      <div className="blog-list">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-item">
            <h2 className="blog-item-title">
              <Link href={`/blog/${post.id}`}>
                {post.title}
              </Link>
            </h2>
            <p className="blog-item-excerpt">
              {post.excerpt}
            </p>
            <div className="blog-item-meta">
              <span className="blog-date">
                📅 {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="blog-author">
                👤 {post.author}
              </span>
              <span className="blog-read-time">
                ⏱️ {post.readTime}
              </span>
            </div>
          </article>
        ))}
      </div>
      
      <div style={{ marginTop: '3rem', textAlign: 'center', color: '#6b7280' }}>
        <p>More blog posts coming soon! 📝</p>
      </div>
    </div>
  )
}
