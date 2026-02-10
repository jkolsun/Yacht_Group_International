'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExoticCar, exoticCars } from '@/lib/data'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function CarDetailClient({ car }: { car: ExoticCar }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const otherCars = exoticCars.filter(c => c.id !== car.id).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="car-hero">
        <motion.div className="car-hero-bg" style={{ y: heroY }}>
          <Image
            src={car.image}
            alt={`${car.brand} ${car.name}`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
        <div className="car-hero-overlay" />
        <div className="car-hero-gradient" />

        <motion.div className="car-hero-content" style={{ opacity: heroOpacity }}>
          <motion.span
            className="car-hero-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {car.brand}
          </motion.span>
          <motion.h1
            className="car-hero-name"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {car.name}
          </motion.h1>
          <motion.div
            className="car-hero-specs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span>{car.specs.horsepower}</span>
            <span className="car-spec-dot"></span>
            <span>{car.specs.topSpeed}</span>
            <span className="car-spec-dot"></span>
            <span>{car.specs.acceleration}</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="car-details">
        <div className="car-details-grid">
          <AnimatedSection className="car-details-left">
            <div className="section-label">{car.category}</div>
            <h2 className="car-details-title">About This <em>Vehicle</em></h2>
            <p className="car-details-text">{car.description}</p>

            <div className="car-specs-grid">
              <div className="car-spec-item">
                <span className="car-spec-value">{car.specs.horsepower}</span>
                <span className="car-spec-label">Power</span>
              </div>
              <div className="car-spec-item">
                <span className="car-spec-value">{car.specs.topSpeed}</span>
                <span className="car-spec-label">Top Speed</span>
              </div>
              <div className="car-spec-item">
                <span className="car-spec-value">{car.specs.acceleration}</span>
                <span className="car-spec-label">0-60 mph</span>
              </div>
              <div className="car-spec-item">
                <span className="car-spec-value">{car.specs.transmission}</span>
                <span className="car-spec-label">Transmission</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection className="car-details-right">
            <div className="car-booking-card">
              <div className="car-booking-header">
                <span className="car-booking-label">Starting from</span>
                <div className="car-booking-price">
                  <span className="car-booking-amount">${car.dailyRate.toLocaleString()}</span>
                  <span className="car-booking-period">/ day</span>
                </div>
                <div className="car-booking-weekly">
                  ${car.weeklyRate.toLocaleString()} / week
                </div>
              </div>

              <div className="car-booking-features">
                <h4>Included</h4>
                <ul>
                  {car.features.map((feature) => (
                    <li key={feature}>
                      <span className="check-icon">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="car-booking-locations">
                <h4>Available In</h4>
                <div className="car-locations-list">
                  {car.available.map((location) => (
                    <span key={location} className="car-location-tag">{location}</span>
                  ))}
                </div>
              </div>

              <Link href="/contact" className="car-booking-btn">
                <span>Reserve This Vehicle</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Other Vehicles */}
      <section className="car-others">
        <AnimatedSection className="car-others-header">
          <div className="section-label">Explore More</div>
          <h2 className="car-others-title">Other Vehicles</h2>
        </AnimatedSection>

        <motion.div
          className="car-others-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {otherCars.map((otherCar) => (
            <motion.div key={otherCar.id} variants={fadeInUp}>
              <Link href={`/exotic-cars/${otherCar.slug}`} className="ec-card">
                <div className="ec-card-image">
                  <Image
                    src={otherCar.image}
                    alt={`${otherCar.brand} ${otherCar.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="ec-card-overlay" />
                </div>
                <div className="ec-card-content">
                  <span className="ec-card-brand">{otherCar.brand}</span>
                  <h3 className="ec-card-name">{otherCar.name}</h3>
                  <div className="ec-card-price">
                    <span className="ec-card-rate">${otherCar.dailyRate.toLocaleString()}</span>
                    <span className="ec-card-period">/ day</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="car-others-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/exotic-cars" className="cta-line">
            View All Vehicles <span className="cta-line-bar"></span>
          </Link>
        </motion.div>
      </section>
    </>
  )
}
