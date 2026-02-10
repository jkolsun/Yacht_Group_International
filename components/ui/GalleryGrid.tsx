'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Yacht } from '@/lib/data/yachts'

interface GalleryGridProps {
  yachts: Yacht[]
  showAll?: boolean
}

export default function GalleryGrid({ yachts, showAll = false }: GalleryGridProps) {
  const displayYachts = showAll ? yachts : yachts.slice(0, 6)

  return (
    <div className="yacht-gallery">
      {displayYachts.map((yacht) => (
        <Link
          href={`/fleet/${yacht.slug}`}
          key={yacht.id}
          className="yacht-card"
        >
          <Image
            src={yacht.images[0]}
            alt={yacht.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="yacht-card-overlay">
            <h3 className="yacht-card-name">{yacht.name}</h3>
            <span className="yacht-card-price">
              From ${yacht.dailyRate.toLocaleString()} / day
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
