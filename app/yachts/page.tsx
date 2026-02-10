'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { yachts, Yacht } from '@/lib/data'

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

type SizeFilter = 'all' | 'under-100' | '100-150' | '150-200' | 'over-200'

export default function YachtsPage() {
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000])
  const [guestFilter, setGuestFilter] = useState<number>(0)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Get min/max prices for slider
  const priceStats = useMemo(() => {
    const rates = yachts.map(y => y.dailyRate)
    return { min: Math.min(...rates), max: Math.max(...rates) }
  }, [])

  const filteredYachts = useMemo(() => {
    return yachts.filter(yacht => {
      // Size filter
      if (sizeFilter !== 'all') {
        if (sizeFilter === 'under-100' && yacht.length >= 100) return false
        if (sizeFilter === '100-150' && (yacht.length < 100 || yacht.length >= 150)) return false
        if (sizeFilter === '150-200' && (yacht.length < 150 || yacht.length >= 200)) return false
        if (sizeFilter === 'over-200' && yacht.length < 200) return false
      }
      // Price filter
      if (yacht.dailyRate < priceRange[0] || yacht.dailyRate > priceRange[1]) return false
      // Guest filter
      if (guestFilter > 0 && yacht.guests < guestFilter) return false
      return true
    })
  }, [sizeFilter, priceRange, guestFilter])

  const sizeCategories: { key: SizeFilter; label: string }[] = [
    { key: 'all', label: 'All Sizes' },
    { key: 'under-100', label: 'Under 100\'' },
    { key: '100-150', label: '100\' - 150\'' },
    { key: '150-200', label: '150\' - 200\'' },
    { key: 'over-200', label: 'Over 200\'' },
  ]

  const guestOptions = [0, 6, 8, 10, 12]

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="ec-hero">
        <motion.div className="ec-hero-bg" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=90"
            alt="Luxury Yacht Fleet"
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
            Charter Fleet
          </motion.div>
          <motion.h1
            className="ec-hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            The Yachts
          </motion.h1>
          <motion.p
            className="ec-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {yachts.length} magnificent vessels from the world's finest shipyards
          </motion.p>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="ec-stats">
        <div className="ec-stats-inner">
          <div className="ec-stat">
            <span className="ec-stat-number">{yachts.length}</span>
            <span className="ec-stat-label">Yachts</span>
          </div>
          <div className="ec-stat">
            <span className="ec-stat-number">75-222</span>
            <span className="ec-stat-label">Feet</span>
          </div>
          <div className="ec-stat">
            <span className="ec-stat-number">9</span>
            <span className="ec-stat-label">Destinations</span>
          </div>
          <div className="ec-stat">
            <span className="ec-stat-number">24/7</span>
            <span className="ec-stat-label">Support</span>
          </div>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="ec-collection">
        <div className="ec-collection-header">
          <AnimatedSection>
            <div className="section-label">Browse Fleet</div>
            <h2 className="ec-collection-title">Select Your <em>Yacht</em></h2>
          </AnimatedSection>
        </div>

        {/* Filters */}
        <motion.div
          className="collection-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Size Filter */}
          <div className="filter-group">
            <label className="filter-label">Size</label>
            <div className="ec-filters">
              {sizeCategories.map((cat) => (
                <button
                  key={cat.key}
                  className={`ec-filter-btn ${sizeFilter === cat.key ? 'active' : ''}`}
                  onClick={() => setSizeFilter(cat.key)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Filter */}
          <div className="filter-group">
            <label className="filter-label">Minimum Guests</label>
            <div className="ec-filters">
              {guestOptions.map((num) => (
                <button
                  key={num}
                  className={`ec-filter-btn ${guestFilter === num ? 'active' : ''}`}
                  onClick={() => setGuestFilter(num)}
                >
                  {num === 0 ? 'Any' : `${num}+`}
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
                onChange={(e) => setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 1000), priceRange[1]])}
                className="price-slider"
              />
              <input
                type="range"
                min={priceStats.min}
                max={priceStats.max}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 1000)])}
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
          <span>{filteredYachts.length} yacht{filteredYachts.length !== 1 ? 's' : ''} found</span>
          {(sizeFilter !== 'all' || guestFilter > 0 || priceRange[0] > priceStats.min || priceRange[1] < priceStats.max) && (
            <button
              className="filter-clear"
              onClick={() => {
                setSizeFilter('all')
                setGuestFilter(0)
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
          key={`${sizeFilter}-${priceRange.join('-')}-${guestFilter}`}
        >
          {filteredYachts.map((yacht) => (
            <motion.div key={yacht.id} variants={scaleIn}>
              <Link href={`/fleet/${yacht.slug}`} className="ec-card">
                <div className="ec-card-image">
                  <Image
                    src={yacht.images[0]}
                    alt={yacht.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="ec-card-overlay" />
                  <div className="ec-card-badge">{yacht.length}'</div>
                </div>
                <div className="ec-card-content">
                  <span className="ec-card-brand">{yacht.builder}</span>
                  <h3 className="ec-card-name">{yacht.name}</h3>
                  <div className="ec-card-specs">
                    <span>{yacht.guests} Guests</span>
                    <span className="ec-card-dot"></span>
                    <span>{yacht.cabins} Cabins</span>
                    <span className="ec-card-dot"></span>
                    <span>{yacht.year}</span>
                  </div>
                  <div className="ec-card-price">
                    <span className="ec-card-rate">${yacht.dailyRate.toLocaleString()}</span>
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

        {filteredYachts.length === 0 && (
          <div className="filter-no-results">
            <p>No yachts match your current filters.</p>
            <button
              className="filter-clear"
              onClick={() => {
                setSizeFilter('all')
                setGuestFilter(0)
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
            src="https://images.unsplash.com/photo-1559599238-308793637427?w=1920&q=80"
            alt="Luxury yacht"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', filter: 'brightness(0.2)' }}
          />
        </div>
        <div className="ec-cta-content">
          <AnimatedSection>
            <div className="section-label">Get Started</div>
            <h2 className="ec-cta-title">Ready to Charter?</h2>
            <p className="ec-cta-text">
              Contact our charter specialists to plan your perfect voyage. We handle every detail from itinerary to crew.
            </p>
            <div className="ec-cta-buttons">
              <Link href="/contact" className="ec-cta-primary">
                <span>Inquire Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/services/yacht-charters" className="ec-cta-secondary">
                <span>Learn More</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
