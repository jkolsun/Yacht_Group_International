'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { villas, Villa } from '@/lib/data'

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

type RegionFilter = 'all' | Villa['region']
type PriceFilter = 'all' | 'under-8000' | '8000-12000' | 'over-12000'

export default function VillasPage() {
  const [regionFilter, setRegionFilter] = useState<RegionFilter>('all')
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all')
  const [bedroomFilter, setBedroomFilter] = useState<number>(0)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const filteredVillas = useMemo(() => {
    return villas.filter(villa => {
      if (regionFilter !== 'all' && villa.region !== regionFilter) return false
      if (priceFilter === 'under-8000' && villa.dailyRate >= 8000) return false
      if (priceFilter === '8000-12000' && (villa.dailyRate < 8000 || villa.dailyRate > 12000)) return false
      if (priceFilter === 'over-12000' && villa.dailyRate <= 12000) return false
      if (bedroomFilter > 0 && villa.bedrooms < bedroomFilter) return false
      return true
    })
  }, [regionFilter, priceFilter, bedroomFilter])

  const regions: { key: RegionFilter; label: string }[] = [
    { key: 'all', label: 'All Regions' },
    { key: 'caribbean', label: 'Caribbean' },
    { key: 'mediterranean', label: 'Mediterranean' },
    { key: 'americas', label: 'Americas' },
    { key: 'asia-pacific', label: 'Asia Pacific' },
    { key: 'middle-east', label: 'Middle East' },
  ]

  const priceRanges: { key: PriceFilter; label: string }[] = [
    { key: 'all', label: 'Any Price' },
    { key: 'under-8000', label: 'Under $8K' },
    { key: '8000-12000', label: '$8K - $12K' },
    { key: 'over-12000', label: 'Over $12K' },
  ]

  const bedroomOptions = [0, 5, 6, 7, 8]

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="ec-hero">
        <motion.div className="ec-hero-bg" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90"
            alt="Luxury Villa Collection"
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
            Villa Collection
          </motion.div>
          <motion.h1
            className="ec-hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Luxury Villas
          </motion.h1>
          <motion.p
            className="ec-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {villas.length} extraordinary properties in the world's most coveted destinations
          </motion.p>
        </motion.div>
      </section>

      {/* Filter & Grid */}
      <section className="ec-collection">
        <div className="ec-collection-header">
          <AnimatedSection>
            <div className="section-label">Browse Collection</div>
            <h2 className="ec-collection-title">Select Your <em>Villa</em></h2>
          </AnimatedSection>
        </div>

        {/* Filters */}
        <motion.div
          className="collection-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Region Filter */}
          <div className="filter-group">
            <label className="filter-label">Region</label>
            <div className="ec-filters ec-filters-wrap">
              {regions.map((region) => (
                <button
                  key={region.key}
                  className={`ec-filter-btn ${regionFilter === region.key ? 'active' : ''}`}
                  onClick={() => setRegionFilter(region.key)}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bedroom Filter */}
          <div className="filter-group">
            <label className="filter-label">Minimum Bedrooms</label>
            <div className="ec-filters">
              {bedroomOptions.map((num) => (
                <button
                  key={num}
                  className={`ec-filter-btn ${bedroomFilter === num ? 'active' : ''}`}
                  onClick={() => setBedroomFilter(num)}
                >
                  {num === 0 ? 'Any' : `${num}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <label className="filter-label">Nightly Rate</label>
            <div className="ec-filters">
              {priceRanges.map((range) => (
                <button
                  key={range.key}
                  className={`ec-filter-btn ${priceFilter === range.key ? 'active' : ''}`}
                  onClick={() => setPriceFilter(range.key)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="filter-results">
          <span>{filteredVillas.length} villa{filteredVillas.length !== 1 ? 's' : ''} found</span>
          {(regionFilter !== 'all' || bedroomFilter > 0 || priceFilter !== 'all') && (
            <button
              className="filter-clear"
              onClick={() => {
                setRegionFilter('all')
                setBedroomFilter(0)
                setPriceFilter('all')
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
          key={`${regionFilter}-${priceFilter}-${bedroomFilter}`}
        >
          {filteredVillas.map((villa) => (
            <motion.div key={villa.id} variants={scaleIn}>
              <Link href={`/villas/${villa.slug}`} className="ec-card">
                <div className="ec-card-image">
                  <Image
                    src={villa.image}
                    alt={villa.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="ec-card-overlay" />
                  <div className="ec-card-badge">{villa.region.replace('-', ' ')}</div>
                </div>
                <div className="ec-card-content">
                  <span className="ec-card-brand">{villa.location}</span>
                  <h3 className="ec-card-name">{villa.name}</h3>
                  <div className="ec-card-specs">
                    <span>{villa.bedrooms} Bedrooms</span>
                    <span className="ec-card-dot"></span>
                    <span>{villa.maxGuests} Guests</span>
                    <span className="ec-card-dot"></span>
                    <span>{villa.sqft.toLocaleString()} sqft</span>
                  </div>
                  <div className="ec-card-price">
                    <span className="ec-card-rate">${villa.dailyRate.toLocaleString()}</span>
                    <span className="ec-card-period">/ night</span>
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

        {filteredVillas.length === 0 && (
          <div className="filter-no-results">
            <p>No villas match your current filters.</p>
            <button
              className="filter-clear"
              onClick={() => {
                setRegionFilter('all')
                setBedroomFilter(0)
                setPriceFilter('all')
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
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
            alt="Luxury villa"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', filter: 'brightness(0.2)' }}
          />
        </div>
        <div className="ec-cta-content">
          <AnimatedSection>
            <div className="section-label">Get Started</div>
            <h2 className="ec-cta-title">Ready to Stay?</h2>
            <p className="ec-cta-text">
              Contact our villa specialists to reserve your private retreat. Full staff and concierge services included.
            </p>
            <div className="ec-cta-buttons">
              <Link href="/contact" className="ec-cta-primary">
                <span>Reserve Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/services/villas" className="ec-cta-secondary">
                <span>Learn More</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
