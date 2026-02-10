'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from './ScrollReveal'
import { Destination } from '@/lib/data/destinations'

interface DestinationsCarouselProps {
  destinations: Destination[]
}

export default function DestinationsCarousel({ destinations }: DestinationsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  useEffect(() => {
    const handleMouseLeave = () => setIsDragging(false)
    document.addEventListener('mouseup', handleMouseLeave)
    return () => document.removeEventListener('mouseup', handleMouseLeave)
  }, [])

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto scrollbar-hide px-6 md:px-10 cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex gap-[2px] w-max">
        {destinations.map((destination, index) => (
          <Link
            href={`/destinations/${destination.slug}`}
            key={destination.id}
            className="w-[260px] md:w-[340px] h-[380px] md:h-[480px] relative overflow-hidden flex-shrink-0 group"
          >
            <ScrollReveal animation="clip" delay={Math.min(index + 1, 6)} className="h-full">
              <Image
                src={destination.image}
                alt={destination.name}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 768px) 260px, 340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                <h3 className="font-display text-xl md:text-2xl font-normal text-white">
                  {destination.name}
                </h3>
                <div className="font-sans text-[0.55rem] tracking-[0.4em] uppercase text-gold mt-1">
                  {destination.region}
                </div>
              </div>
            </ScrollReveal>
          </Link>
        ))}
      </div>
    </div>
  )
}
