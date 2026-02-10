'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { PrivateJet, privateJets } from '@/lib/data'

interface Props {
  jet: PrivateJet
}

export default function JetDetailClient({ jet }: Props) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const otherJets = privateJets.filter(j => j.id !== jet.id).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="car-hero">
        <motion.div className="car-hero-bg" style={{ y: heroY }}>
          <Image
            src={jet.image}
            alt={`${jet.manufacturer} ${jet.name}`}
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
            {jet.manufacturer}
          </motion.span>
          <motion.h1
            className="car-hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {jet.name}
          </motion.h1>
          <motion.div
            className="car-hero-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <span className="car-hero-category">{jet.category.replace(/-/g, ' ')}</span>
            <span className="car-hero-divider">|</span>
            <span className="car-hero-rate">${jet.hourlyRate.toLocaleString()}/hr</span>
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
                <span className="car-spec-label">Passengers</span>
                <span className="car-spec-value">{jet.passengers}</span>
              </div>
              <div className="car-spec-item">
                <span className="car-spec-label">Range</span>
                <span className="car-spec-value">{jet.range.toLocaleString()} nm</span>
              </div>
              <div className="car-spec-item">
                <span className="car-spec-label">Speed</span>
                <span className="car-spec-value">{jet.speed} ktas</span>
              </div>
              <div className="car-spec-item">
                <span className="car-spec-label">Category</span>
                <span className="car-spec-value">{jet.category.replace(/-/g, ' ')}</span>
              </div>
            </motion.div>

            {/* Cabin Specs */}
            <motion.div
              className="car-description"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="section-title-sm">Cabin Specifications</h2>
              <div className="car-specs-grid" style={{ marginTop: '1.5rem' }}>
                <div className="car-spec-item">
                  <span className="car-spec-label">Height</span>
                  <span className="car-spec-value">{jet.specs.cabinHeight}</span>
                </div>
                <div className="car-spec-item">
                  <span className="car-spec-label">Width</span>
                  <span className="car-spec-value">{jet.specs.cabinWidth}</span>
                </div>
                <div className="car-spec-item">
                  <span className="car-spec-label">Length</span>
                  <span className="car-spec-value">{jet.specs.cabinLength}</span>
                </div>
                <div className="car-spec-item">
                  <span className="car-spec-label">Baggage</span>
                  <span className="car-spec-value">{jet.specs.baggageCapacity}</span>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="car-description"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="section-title-sm">Overview</h2>
              <p>{jet.description}</p>
            </motion.div>

            {/* Amenities */}
            <motion.div
              className="car-features"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="section-title-sm">Amenities</h2>
              <ul className="car-features-list">
                {jet.amenities.map((amenity, index) => (
                  <li key={index}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Availability */}
            <motion.div
              className="car-availability"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="section-title-sm">Availability</h2>
              <div className="car-locations">
                {jet.available.map((location, index) => (
                  <span key={index} className="car-location-tag">{location}</span>
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
              <span className="car-booking-label">Hourly Rate</span>
              <div className="car-booking-price">
                <span className="car-booking-amount">${jet.hourlyRate.toLocaleString()}</span>
                <span className="car-booking-period">/ hour</span>
              </div>
            </div>

            <div className="car-booking-divider" />

            <div className="car-booking-details">
              <div className="car-booking-detail">
                <span>Category</span>
                <span>{jet.category.replace(/-/g, ' ')}</span>
              </div>
              <div className="car-booking-detail">
                <span>Passengers</span>
                <span>{jet.passengers}</span>
              </div>
              <div className="car-booking-detail">
                <span>Range</span>
                <span>{jet.range.toLocaleString()} nm</span>
              </div>
              <div className="car-booking-detail">
                <span>Manufacturer</span>
                <span>{jet.manufacturer}</span>
              </div>
            </div>

            <Link href="/contact" className="car-booking-btn">
              <span>Request Quote</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <p className="car-booking-note">
              Contact our aviation team for custom quotes and multi-leg discounts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Other Aircraft */}
      <section className="car-related">
        <div className="car-related-header">
          <span className="section-label">More Aircraft</span>
          <h2 className="section-title-sm">Explore Our Fleet</h2>
        </div>
        <div className="car-related-grid">
          {otherJets.map((otherJet) => (
            <Link key={otherJet.id} href={`/jets/${otherJet.slug}`} className="ec-card">
              <div className="ec-card-image">
                <Image
                  src={otherJet.image}
                  alt={otherJet.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className="ec-card-overlay" />
                <div className="ec-card-badge">{otherJet.category.replace(/-/g, ' ')}</div>
              </div>
              <div className="ec-card-content">
                <span className="ec-card-brand">{otherJet.manufacturer}</span>
                <h3 className="ec-card-name">{otherJet.name}</h3>
                <div className="ec-card-price">
                  <span className="ec-card-rate">${otherJet.hourlyRate.toLocaleString()}</span>
                  <span className="ec-card-period">/ hour</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="car-related-cta">
          <Link href="/jets" className="car-view-all">
            View All Aircraft
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
