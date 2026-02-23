'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { exoticCars, ExoticCar } from '@/lib/data'

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
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

type FilterCategory = 'all' | ExoticCar['category']

export default function ExoticCarsPage() {
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000])

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Get min/max prices for slider
  const priceStats = useMemo(() => {
    const rates = exoticCars.map(c => c.dailyRate)
    return { min: Math.min(...rates), max: Math.max(...rates) }
  }, [])

  const filteredCars = useMemo(() => {
    return exoticCars.filter(car => {
      // Category filter
      if (categoryFilter !== 'all' && car.category !== categoryFilter) return false
      // Price filter
      if (car.dailyRate < priceRange[0] || car.dailyRate > priceRange[1]) return false
      return true
    })
  }, [categoryFilter, priceRange])

  const categories: { key: FilterCategory; label: string }[] = [
    { key: 'all', label: 'All Vehicles' },
    { key: 'supercar', label: 'Supercars' },
    { key: 'convertible', label: 'Convertibles' },
    { key: 'luxury', label: 'Luxury' },
    { key: 'suv', label: 'SUVs' },
  ]

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="ec-hero">
        <motion.div className="ec-hero-bg" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=90"
            alt="Exotic Cars Collection"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
        <div className="ec-hero-overlay" />
        <div className="ec-hero-gradient" />

        <motion.div className="ec-hero-content" style={{ opacity: heroOpacity }}>
          <motion.div
            className="ec-hero-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Exotic Collection
          </motion.div>
          <motion.h1
            className="ec-hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            The Fleet
          </motion.h1>
          <motion.p
            className="ec-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {exoticCars.length} exceptional vehicles from the world's most prestigious marques
          </motion.p>
        </motion.div>
      </section>

      {/* Filter & Grid */}
      <section className="ec-collection">
        <div className="ec-collection-header">
          <AnimatedSection>
            <div className="section-label">Browse Collection</div>
            <h2 className="ec-collection-title">Select Your <em>Vehicle</em></h2>
          </AnimatedSection>
        </div>

        {/* Filters */}
        <motion.div
          className="collection-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Category Filter */}
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <div className="ec-filters">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  className={`ec-filter-btn ${categoryFilter === cat.key ? 'active' : ''}`}
                  onClick={() => setCategoryFilter(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Slider */}
          <div className="filter-group filter-group-slider">
            <label className="filter-label">
              Daily Rate: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
            </label>
            <div className="price-slider-container">
              <input
                type="range"
                min={priceStats.min}
                max={priceStats.max}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 200), priceRange[1]])}
                className="price-slider"
              />
              <input
                type="range"
                min={priceStats.min}
                max={priceStats.max}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 200)])}
                className="price-slider"
              />
              <div className="price-slider-track">
                <div
                  className="price-slider-range"
                  style={{
                    left: `${((priceRange[0] - priceStats.min) / (priceStats.max - priceStats.min)) * 100}%`,
                    right: `${100 - ((priceRange[1] - priceStats.min) / (priceStats.max - priceStats.min)) * 100}%`
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="filter-results">
          <span>{filteredCars.length} vehicle{filteredCars.length !== 1 ? 's' : ''} found</span>
          {(categoryFilter !== 'all' || priceRange[0] > priceStats.min || priceRange[1] < priceStats.max) && (
            <button
              className="filter-clear"
              onClick={() => {
                setCategoryFilter('all')
                setPriceRange([priceStats.min, priceStats.max])
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        <motion.div
          className="ec-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={`${categoryFilter}-${priceRange.join('-')}`}
        >
          {filteredCars.map((car) => (
            <motion.div key={car.id} variants={scaleIn}>
              <Link href={`/exotic-cars/${car.slug}`} className="ec-card">
                <div className="ec-card-image">
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="ec-card-overlay" />
                  <div className="ec-card-badge">{car.category}</div>
                </div>
                <div className="ec-card-content">
                  <span className="ec-card-brand">{car.brand}</span>
                  <h3 className="ec-card-name">{car.name}</h3>
                  <div className="ec-card-specs">
                    <span>{car.specs.horsepower}</span>
                    <span className="ec-card-dot"></span>
                    <span>{car.specs.acceleration}</span>
                  </div>
                  <div className="ec-card-price">
                    <span className="ec-card-rate">${car.dailyRate.toLocaleString()}</span>
                    <span className="ec-card-period">/ day</span>
                  </div>
                  <div className="ec-card-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredCars.length === 0 && (
          <div className="filter-no-results">
            <p>No vehicles match your current filters.</p>
            <button
              className="filter-clear"
              onClick={() => {
                setCategoryFilter('all')
                setPriceRange([priceStats.min, priceStats.max])
              }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="ec-cta">
        <div className="ec-cta-bg">
          <Image
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80"
            alt="Exotic car"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', filter: 'brightness(0.2)' }}
          />
        </div>
        <div className="ec-cta-content">
          <AnimatedSection>
            <div className="section-label">Get Started</div>
            <h2 className="ec-cta-title">Ready to Drive?</h2>
            <p className="ec-cta-text">
              Contact our team to reserve your vehicle. We offer delivery to yachts, airports, hotels, and private residences.
            </p>
            <div className="ec-cta-buttons">
              <Link href="/contact" className="ec-cta-primary">
                <span>Reserve Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/services/exotic-cars" className="ec-cta-secondary">
                <span>Learn More</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
