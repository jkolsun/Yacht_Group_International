'use client'

import Image from 'next/image'
import { ScrollReveal } from '@/components/ui'

interface CinematicPanelProps {
  image: string
  text: string
  highlightedText?: string
  height?: string
}

export default function CinematicPanel({
  image,
  text,
  highlightedText,
  height = '70vh',
}: CinematicPanelProps) {
  const parts = highlightedText ? text.split(highlightedText) : [text]

  return (
    <section className="relative overflow-hidden" style={{ height }}>
      {/* Background with Ken Burns */}
      <div className="absolute inset-[-30px] z-0">
        <Image
          src={image}
          alt="Background"
          fill
          className="object-cover ken-burns"
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/55" />

      {/* Content */}
      <div className="relative z-[2] h-full flex items-center justify-center text-center px-6 md:px-10">
        <ScrollReveal>
          <p className="font-display text-xl md:text-2xl lg:text-4xl font-normal leading-relaxed text-white max-w-4xl">
            {highlightedText ? (
              <>
                {parts[0]}
                <em className="italic text-gold">{highlightedText}</em>
                {parts[1]}
              </>
            ) : (
              text
            )}
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
