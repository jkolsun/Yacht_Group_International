import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Hero } from '@/components/sections'
import { destinations, getDestinationBySlug } from '@/lib/data'

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    slug: destination.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)
  if (!destination) return { title: 'Destination Not Found' }

  return {
    title: `${destination.name} | Yacht Group International`,
    description: destination.description,
  }
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const destination = getDestinationBySlug(slug)

  if (!destination) {
    notFound()
  }

  return (
    <>
      <Hero
        tagline={destination.region}
        headline={destination.name}
        image={destination.heroImage}
        showScroll={false}
      />

      <section className="page-section">
        <div className="page-container" style={{ maxWidth: '800px' }}>
          {/* Description */}
          <p className="detail-description" style={{ textAlign: 'center', marginBottom: '5rem', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}>
            {destination.description}
          </p>

          {/* Highlights */}
          <div className="rates-box">
            <div className="section-label" style={{ marginBottom: '2.5rem' }}>Highlights</div>
            <ul className="features-list">
              {destination.highlights.map((highlight) => (
                <li key={highlight}>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Best Season */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="section-label" style={{ marginBottom: '1rem' }}>Best Season</div>
            <p className="detail-description">{destination.bestSeason}</p>
          </div>

          {/* CTA */}
          <div className="detail-cta">
            <Link href="/contact" className="btn-cta">
              Plan Your Voyage
            </Link>
            <Link href="/destinations" className="back-link">
              ← All Destinations
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
