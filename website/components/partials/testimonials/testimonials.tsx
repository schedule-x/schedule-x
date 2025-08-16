import React from 'react'

interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  content: string
  avatar: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Vukadin Nedeljkovic',
    role: 'Team Lead',
    content: 'Schedule-X is great. Its flexibility and constant improvement distinguish it from similar community tools. Cudos to Tom who put in such effort and time to consider and discuss possible solutions.',
    avatar: 'https://d19hgxvhjb2new.cloudfront.net/website/vukadin-nedeljkovic.webp ',
    rating: 5
  },
  {
    id: '2',
    name: 'Mike',
    role: 'Co-Founder & CTO @ Zinya Global',
    content: 'We\'re using the premium version of Schedule-X and have nothing but good things to say. It meets all our needs for a resource scheduling component being both easy to work with, configurable, and extremely easy to integrate with the rest of our application. On top of this, customer support has been stellar.',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiM4QjVBQjAiLz4KPHN2ZyB4PSIxMiIgeT0iMTIiIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAxMmMyLjIxIDAgNC0xLjc5IDQtNHMtMS43OS00LTQtNC00IDEuNzktNCA0IDEuNzkgNCA0IDR6bTAgMmMtMi42NyAwLTggMS4zNC04IDR2MmgxNnYtMmMwLTIuNjYtNS4zMy00LTgtNHoiLz4KPC9zdmc+Cjwvc3ZnPgo=',
    rating: 5
  }
]

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={index < rating ? '#FFD700' : '#E5E7EB'}
          className="star"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <div className="testimonial-avatar">
          <img
            src={testimonial.avatar}
            alt={`${testimonial.name} avatar`}
            width={100}
            height={100}
            style={{ objectFit: 'cover', borderRadius: '50%' }}
            className="avatar-image"
          />
        </div>
        <div className="testimonial-info">
          <h4 className="testimonial-name">{testimonial.name}</h4>
          <p className="testimonial-role">{testimonial.role}</p>
          <p className="testimonial-company">{testimonial.company}</p>
        </div>
      </div>
      <StarRating rating={testimonial.rating} />
      <blockquote className="testimonial-content">
        {testimonial.content}
      </blockquote>
      <span className="testimonial-quote" aria-hidden="true"></span>
    </div>
  )
}

const Testimonials: React.FC = () => {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h3 className="testimonials-heading">What developers are saying</h3>
        <p className="testimonials-subtitle">
          Join thousands of developers who trust Schedule-X for their scheduling needs
        </p>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials 