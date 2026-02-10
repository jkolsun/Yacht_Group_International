'use client'

import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'

interface SplitPanelProps {
  label: string
  number: string
  heading: string
  body: string
  ctaText: string
  ctaHref: string
  image: string
  reversed?: boolean
}

export default function SplitPanel({
  label,
  number,
  heading,
  body,
  ctaText,
  ctaHref,
  image,
  reversed = false,
}: SplitPanelProps) {
  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 min-h-screen relative overflow-hidden ${
        reversed ? 'lg:[direction:rtl]' : ''
      }`}
    >
      {/* Image Side */}
      <div className="relative h-[55vh] lg:h-auto overflow-hidden lg:[direction:ltr]">
        <ScrollReveal animation="clip" className="h-full">
          <div className="relative w-full h-full group">
            <Image
              src={image}
              alt={heading}
              fill
              className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className={`absolute inset-0 ${
                reversed
                  ? 'bg-gradient-to-l from-black/20 to-transparent'
                  : 'bg-gradient-to-r from-black/20 to-transparent'
              }`}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Text Side */}
      <div className="flex flex-col justify-center p-10 md:p-14 lg:p-20 bg-black-panel relative lg:[direction:ltr]">
        {/* Gold accent line */}
        <div
          className={`absolute top-1/2 ${
            reversed ? 'right-0' : 'left-0'
          } w-12 h-px bg-gold -translate-y-1/2 hidden lg:block`}
        />

        <ScrollReveal delay={1}>
          <div className="font-sans text-[0.55rem] font-light tracking-[0.6em] uppercase text-gold mb-8">
            {number} — {label}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={2}>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-6 leading-tight">
            {heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={3}>
          <p className="font-body text-lg font-light text-cream-dim max-w-md mb-10 leading-relaxed">
            {body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={4}>
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-4 font-sans text-[0.6rem] font-normal tracking-[0.4em] uppercase text-gold group"
          >
            {ctaText}
            <span className="w-12 h-px bg-gold transition-all duration-500 ease-out group-hover:w-20" />
          </Link>
        </ScrollReveal>
      </div>
    </div>
  )
}
