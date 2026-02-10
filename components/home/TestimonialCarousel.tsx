'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    quote: "From the moment we stepped aboard, every detail was flawlessly executed. The crew anticipated our every need, and the itinerary was perfectly curated. This wasn't just a charter—it was the trip of a lifetime.",
    name: "Michael & Sarah Richardson",
    detail: "Mediterranean Charter, Summer 2024"
  },
  {
    id: 2,
    quote: "Yacht Group International made our anniversary celebration absolutely unforgettable. The attention to detail, from the Michelin-quality dining to the hidden cove anchorages, exceeded all expectations.",
    name: "James Thornton",
    detail: "Caribbean Charter, Winter 2024"
  },
  {
    id: 3,
    quote: "We've chartered with many companies over the years, but none compare to the level of service and exclusivity that YGI provides. Their relationships open doors that simply aren't available elsewhere.",
    name: "The Wellington Family",
    detail: "Greek Islands Charter, Summer 2023"
  },
  {
    id: 4,
    quote: "The team went above and beyond to accommodate our last-minute requests. Private helicopter transfers, exclusive restaurant reservations, and a crew that felt like family. Simply exceptional.",
    name: "David & Elena Martinez",
    detail: "French Riviera Charter, July 2024"
  }
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextTestimonial, 6000)
    return () => clearInterval(interval)
  }, [isPaused, nextTestimonial])

  return (
    <div
      className="testimonial-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="testimonial-carousel-inner">
        <button
          className="testimonial-nav testimonial-nav-prev"
          onClick={prevTestimonial}
          aria-label="Previous testimonial"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="testimonial-carousel-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="testimonial-carousel-item"
            >
              <span className="testimonial-carousel-quote">"</span>
              <blockquote className="testimonial-carousel-text">
                {testimonials[currentIndex].quote}
              </blockquote>
              <div className="testimonial-carousel-author">
                <span className="testimonial-carousel-name">{testimonials[currentIndex].name}</span>
                <span className="testimonial-carousel-detail">{testimonials[currentIndex].detail}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="testimonial-nav testimonial-nav-next"
          onClick={nextTestimonial}
          aria-label="Next testimonial"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="testimonial-carousel-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`testimonial-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
