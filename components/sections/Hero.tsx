'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface HeroProps {
  tagline?: string
  headline: string
  highlightedText?: string
  image: string
  showScroll?: boolean
}

export default function Hero({
  tagline = 'Est. Miami, Florida',
  headline,
  highlightedText,
  image,
  showScroll = true,
}: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="hero-section">
      <div className="hero-bg ken-burns">
        <Image
          src={image}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div
          className={`reveal-up ${isLoaded ? 'in-view' : ''} d1`}
        >
          <div className="hero-tag">{tagline}</div>
        </div>

        <h1
          className={`hero-headline reveal-up ${isLoaded ? 'in-view' : ''} d2`}
        >
          {headline}{' '}
          {highlightedText && <em>{highlightedText}</em>}
        </h1>
      </div>

      {showScroll && (
        <div className={`scroll-indicator reveal-fade ${isLoaded ? 'in-view' : ''} d5`}>
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      )}
    </section>
  )
}
