import Image from 'next/image'
import Link from 'next/link'
import { Hero } from '@/components/sections'
import { yachts } from '@/lib/data'

export const metadata = {
  title: 'Fleet | Yacht Group International',
  description: 'Explore our curated collection of luxury yachts available for charter and purchase. From intimate coastal cruisers to magnificent superyachts.',
}

export default function FleetPage() {
  return (
    <>
      <Hero
        tagline="Our Collection"
        headline="The Fleet"
        image="https://images.unsplash.com/photo-1559599238-308793637427?w=1920&q=90"
        showScroll={false}
      />

      <section className="page-section">
        <div className="page-container-wide">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="intro-text">
              Each vessel in our fleet has been personally selected for its exceptional quality,
              distinctive character, and ability to deliver unforgettable experiences.
            </p>
          </div>

          <div className="yacht-gallery">
            {yachts.map((yacht) => (
              <Link href={`/fleet/${yacht.slug}`} key={yacht.id} className="yacht-card">
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
        </div>
      </section>
    </>
  )
}
