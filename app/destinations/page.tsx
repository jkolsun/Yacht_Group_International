import Image from 'next/image'
import Link from 'next/link'
import { Hero } from '@/components/sections'
import { destinations } from '@/lib/data'

export const metadata = {
  title: 'Destinations | Yacht Group International',
  description: 'Explore the world\'s most coveted yachting destinations. From the Mediterranean to the Caribbean, discover your next voyage.',
}

export default function DestinationsPage() {
  return (
    <>
      <Hero
        tagline="Worldwide"
        headline="Destinations"
        image="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=90"
        showScroll={false}
      />

      <section className="page-section">
        <div className="page-container-wide">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p className="intro-text">
              From the sun-drenched Mediterranean to the crystal waters of the Caribbean,
              we operate in the world&apos;s most exceptional yachting destinations.
            </p>
          </div>

          <div className="grid-cards">
            {destinations.map((destination) => (
              <Link
                key={destination.id}
                href={`/destinations/${destination.slug}`}
                className="grid-card"
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className="grid-card-overlay"></div>
                <div className="grid-card-content">
                  <h3 className="grid-card-title">{destination.name}</h3>
                  <div className="grid-card-label">{destination.region}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
