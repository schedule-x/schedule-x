import React from 'react'
import Link from 'next/link'
import './blog.scss'

// This would typically come from a CMS or file system
const blogPosts = [
  {
    id: 'getting-started-with-schedule-x',
    title: 'Getting Started with Schedule-X: A Complete Guide',
    excerpt: 'Learn how to integrate Schedule-X into your React application and create beautiful, interactive calendars with ease.',
    date: '2024-01-15',
    author: 'Schedule-X Team',
    tags: ['tutorial', 'react', 'calendar'],
    readTime: '8 min read'
  },
  {
    id: 'advanced-calendar-features',
    title: 'Advanced Calendar Features: Drag & Drop, Recurring Events, and More',
    excerpt: 'Explore the powerful features of Schedule-X including drag and drop functionality, recurring events, and timezone support.',
    date: '2024-01-10',
    author: 'Schedule-X Team',
    tags: ['features', 'drag-drop', 'recurring'],
    readTime: '12 min read'
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
              <div className="blog-tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
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
