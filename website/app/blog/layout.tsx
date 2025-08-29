import React from 'react'
import './blog.scss'

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="blog-container">
      {children}
    </div>
  )
}
