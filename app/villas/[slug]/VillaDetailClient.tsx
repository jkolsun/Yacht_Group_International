'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Villa, villas } from '@/lib/data'

interface Props {
  villa: Villa
}

export default function VillaDetailClient({ villa }: Props) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const otherVillas = villas.filter(v => v.id !== villa.id).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="car-hero">
        <motion.div className="car-hero-bg" style={{ y: heroY }}>
          <Image
            src={villa.image}
            alt={villa.name}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
        <div className="car-hero-overlay" />

        <motion.div className="car-hero-content" style={{ opacity: heroOpacity }}>
          <motion.span
            className="car-hero-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {villa.location}
          </motion.span>
          <motion.h1
            className="car-hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {villa.name}
          </motion.h1>
          <motion.div
            className="car-hero-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <span className="car-hero-category">{villa.bedrooms} Bedrooms</span>
            <span className="car-hero-divider">|</span>
            <span className="car-hero-rate">${villa.dailyRate.toLocaleString()}/night</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="car-hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="car-details">
        <div className="car-details-grid">
          {/* Main Content */}
          <div className="car-details-main">
            {/* Specs Grid */}
            <motion.div
              className="car-specs-grid"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="car-spec-item">
                <span className="car-spec-label">Bedrooms</span>
                <span className="car-spec-value">{villa.bedrooms}</span>
              </div>
              <div className="car-spec-item">
                <span className="car-spec-label">Bathrooms</span>
                <span className="car-spec-value">{villa.bathrooms}</span>
              </div>
              <div className="car-spec-item">
                <span className="car-spec-label">Guests</span>
                <span className="car-spec-value">{villa.maxGuests}</span>
              </div>
              <div className="car-spec-item">
                <span className="car-spec-label">Size</span>
                <span className="car-spec-value">{villa.sqft.toLocaleString()} sqft</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="car-description"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="section-title-sm">Overview</h2>
              <p>{villa.description}</p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              className="car-features"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="section-title-sm">Amenities</h2>
              <ul className="car-features-list">
                {villa.amenities.map((amenity, index) => (
                  <li key={index}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Features */}
            <motion.div
              className="car-features"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="section-title-sm">Property Features</h2>
              <ul className="car-features-list">
                {villa.features.map((feature, index) => (
                  <li key={index}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Nearby Attractions */}
            <motion.div
              className="car-availability"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="section-title-sm">Nearby Attractions</h2>
              <div className="car-locations">
                {villa.nearbyAttractions.map((attraction, index) => (
                  <span key={index} className="car-location-tag">{attraction}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Booking Card */}
          <motion.div
            className="car-booking-card"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="car-booking-header">
              <span className="car-booking-label">Nightly Rate</span>
              <div className="car-booking-price">
                <span className="car-booking-amount">${villa.dailyRate.toLocaleString()}</span>
                <span className="car-booking-period">/ night</span>
              </div>
            </div>

            <div className="car-booking-divider" />

            <div className="car-booking-details">
              <div className="car-booking-detail">
                <span>Weekly Rate</span>
                <span>${villa.weeklyRate.toLocaleString()}</span>
              </div>
              <div className="car-booking-detail">
                <span>Bedrooms</span>
                <span>{villa.bedrooms}</span>
              </div>
              <div className="car-booking-detail">
                <span>Max Guests</span>
                <span>{villa.maxGuests}</span>
              </div>
              <div className="car-booking-detail">
                <span>Region</span>
                <span>{villa.region.replace(/-/g, ' ')}</span>
              </div>
            </div>

            <Link href="/contact" className="car-booking-btn">
              <span>Inquire Now</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <p className="car-booking-note">
              Full staff and concierge services included with all rentals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      {villa.images.length > 1 && (
        <section className="car-gallery">
          <div className="car-gallery-header">
            <span className="section-label">Gallery</span>
            <h2 className="section-title-sm">Property Images</h2>
          </div>
          <div className="car-gallery-grid">
            {villa.images.map((image, index) => (
              <motion.div
                key={index}
                className="car-gallery-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Image
                  src={image}
                  alt={`${villa.name} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Other Villas */}
      <section className="car-related">
        <div className="car-related-header">
          <span className="section-label">More Properties</span>
          <h2 className="section-title-sm">Explore Our Collection</h2>
        </div>
        <div className="car-related-grid">
          {otherVillas.map((otherVilla) => (
            <Link key={otherVilla.id} href={`/villas/${otherVilla.slug}`} className="ec-card">
              <div className="ec-card-image">
                <Image
                  src={otherVilla.image}
                  alt={otherVilla.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className="ec-card-overlay" />
                <div className="ec-card-badge">{otherVilla.region.replace(/-/g, ' ')}</div>
              </div>
              <div className="ec-card-content">
                <span className="ec-card-brand">{otherVilla.location}</span>
                <h3 className="ec-card-name">{otherVilla.name}</h3>
                <div className="ec-card-price">
                  <span className="ec-card-rate">${otherVilla.dailyRate.toLocaleString()}</span>
                  <span className="ec-card-period">/ night</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="car-related-cta">
          <Link href="/villas" className="car-view-all">
            View All Villas
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
