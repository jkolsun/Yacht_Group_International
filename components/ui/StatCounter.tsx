'use client'

import { useEffect, useRef, useState } from 'react'
import ScrollReveal from './ScrollReveal'

interface Stat {
  value: number
  label: string
  suffix?: string
}

interface StatCounterProps {
  stats: Stat[]
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasAnimated.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            const duration = 2200
            const start = performance.now()

            const animate = (now: number) => {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              // Ease out expo
              const eased = 1 - Math.pow(2, -10 * progress)
              setDisplayValue(Math.round(value * eased))

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setDisplayValue(value)
              }
            }

            requestAnimationFrame(animate)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="font-display text-4xl md:text-5xl lg:text-6xl font-normal text-gold leading-none mb-2">
      {displayValue}{suffix}
    </div>
  )
}

export default function StatCounter({ stats }: StatCounterProps) {
  return (
    <section className="py-20 md:py-32 px-6 md:px-10 bg-black relative">
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent to-gold" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-t from-transparent to-gold" />

      <div className="flex flex-wrap justify-center gap-16 md:gap-24 max-w-5xl mx-auto">
        {stats.map((stat, index) => (
          <ScrollReveal key={stat.label} delay={index + 1} className="text-center">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            <div className="font-sans text-[0.6rem] font-light tracking-[0.45em] uppercase text-cream-dim">
              {stat.label}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
