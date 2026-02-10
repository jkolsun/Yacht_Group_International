'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: 'up' | 'clip' | 'fade' | 'line'
  delay?: number
  threshold?: number
}

export default function ScrollReveal({
  children,
  className = '',
  animation = 'up',
  delay = 0,
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('in-view')
            observer.unobserve(el)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [threshold])

  const animationClass = {
    up: 'reveal-up',
    clip: 'reveal-clip',
    fade: 'reveal-fade',
    line: 'reveal-line',
  }[animation]

  const delayClass = delay > 0 ? `d${delay}` : ''

  return (
    <div ref={ref} className={`${animationClass} ${delayClass} ${className}`}>
      {children}
    </div>
  )
}
