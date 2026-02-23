import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Hero } from '@/components/sections'
import { yachts, getYachtBySlug } from '@/lib/data'

export async function generateStaticParams() {
  return yachts.map((yacht) => ({
    slug: yacht.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const yacht = getYachtBySlug(slug)
  if (!yacht) return { title: 'Yacht Not Found' }

  return {
    title: `${yacht.name} | Yacht Group International`,
    description: yacht.description,
  }
}

export default async function YachtDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const yacht = getYachtBySlug(slug)

  if (!yacht) {
    notFound()
  }

  return (
    <>
      <Hero
        tagline={`${yacht.length}' ${yacht.builder}`}
        headline={yacht.name}
        image={yacht.images[0]}
        showScroll={false}
      />

      <section className="page-section">
        <div className="page-container">
          {/* Quick Stats */}
          <div className="detail-stats">
            <div className="detail-stat">
              <div className="detail-stat-value">{yacht.guests}</div>
              <div className="detail-stat-label">Guests</div>
            </div>
            <div className="detail-stat">
              <div className="detail-stat-value">{yacht.cabins}</div>
              <div className="detail-stat-label">Cabins</div>
            </div>
            <div className="detail-stat">
              <div className="detail-stat-value">{yacht.crew}</div>
              <div className="detail-stat-label">Crew</div>
            </div>
            <div className="detail-stat">
              <div className="detail-stat-value">{yacht.year}</div>
              <div className="detail-stat-label">Year</div>
            </div>
          </div>

          {/* Description & Amenities */}
          <div className="detail-content-grid">
            <div>
              <div className="section-label" style={{ marginBottom: '1rem' }}>Overview</div>
              <p className="detail-description">{yacht.description}</p>
            </div>
            <div>
              <div className="section-label" style={{ marginBottom: '1rem' }}>Amenities</div>
              <ul className="amenities-list">
                {yacht.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Rates */}
          <div className="rates-box">
            <div className="section-label" style={{ marginBottom: '2rem' }}>Charter Rates</div>
            <div className="rates-row">
              <div className="rate-item">
                <div className="rate-value">${yacht.dailyRate.toLocaleString()}</div>
                <div className="rate-label">Per Day</div>
              </div>
              <div className="rate-item">
                <div className="rate-value">${yacht.weeklyRate.toLocaleString()}</div>
                <div className="rate-label">Per Week</div>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {yacht.images.length > 1 && (
            <div className="detail-gallery">
              {yacht.images.slice(1).map((image, index) => (
                <div key={index} className="detail-gallery-item">
                  <Image
                    src={image}
                    alt={`${yacht.name} gallery ${index + 2}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="detail-cta">
            <Link href={`/contact?interest=${encodeURIComponent(yacht.name)}`} className="btn-cta">
              Inquire About This Yacht
            </Link>
            <Link href="/fleet" className="back-link">
              ← Back to Fleet
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
