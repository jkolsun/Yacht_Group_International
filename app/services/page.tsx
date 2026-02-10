import Image from 'next/image'
import Link from 'next/link'
import { Hero } from '@/components/sections'
import { services } from '@/lib/data'

export const metadata = {
  title: 'Services | Yacht Group International',
  description: 'Comprehensive luxury services including yacht charters, yacht sales, private jets, exotic cars, and villa rentals.',
}

export default function ServicesPage() {
  return (
    <>
      <Hero
        tagline="What We Offer"
        headline="Our Services"
        image="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1920&q=90"
        showScroll={false}
      />

      <section className="page-section">
        <div className="page-container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p className="intro-text">
              The art of luxury curation, where expertise combines with dedicated personalization
              to transform adventures into opulent experiences.
            </p>
          </div>

          <div className="grid-cards">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="grid-card"
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className="grid-card-overlay"></div>
                <div className="grid-card-content">
                  <div className="grid-card-label">{service.number} — {service.label}</div>
                  <h3 className="grid-card-title">{service.name}</h3>
                  <p className="grid-card-desc">{service.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
