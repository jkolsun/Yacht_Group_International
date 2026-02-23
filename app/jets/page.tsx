'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { privateJets, PrivateJet } from '@/lib/data'

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

type CategoryFilter = 'all' | PrivateJet['category']
type PriceFilter = 'all' | 'under-4000' | '4000-8000' | 'over-8000'

export default function JetsPage() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all')
  const [passengerFilter, setPassengerFilter] = useState<number>(0)

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const filteredJets = useMemo(() => {
    return privateJets.filter(jet => {
      if (categoryFilter !== 'all' && jet.category !== categoryFilter) return false
      if (priceFilter === 'under-4000' && jet.hourlyRate >= 4000) return false
      if (priceFilter === '4000-8000' && (jet.hourlyRate < 4000 || jet.hourlyRate > 8000)) return false
      if (priceFilter === 'over-8000' && jet.hourlyRate <= 8000) return false
      if (passengerFilter > 0 && jet.passengers < passengerFilter) return false
      return true
    })
  }, [categoryFilter, priceFilter, passengerFilter])

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All Aircraft' },
    { key: 'light', label: 'Light Jets' },
    { key: 'midsize', label: 'Midsize' },
    { key: 'super-midsize', label: 'Super Midsize' },
    { key: 'heavy', label: 'Heavy Jets' },
    { key: 'ultra-long-range', label: 'Ultra Long Range' },
  ]

  const priceRanges: { key: PriceFilter; label: string }[] = [
    { key: 'all', label: 'Any Price' },
    { key: 'under-4000', label: 'Under $4K' },
    { key: '4000-8000', label: '$4K - $8K' },
    { key: 'over-8000', label: 'Over $8K' },
  ]

  const passengerOptions = [0, 8, 10, 12, 14]

  return (
    <>
      {/* Hero Section */}
      <section ref={heroRef} className="ec-hero">
        <motion.div className="ec-hero-bg" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920&q=90"
            alt="Private Jet Fleet"
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
            Aviation Fleet
          </motion.div>
          <motion.h1
            className="ec-hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Private Jets
          </motion.h1>
          <motion.p
            className="ec-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {privateJets.length} aircraft from the world's premier manufacturers
          </motion.p>
        </motion.div>
      </section>

      {/* Filter & Grid */}
      <section className="ec-collection">
        <div className="ec-collection-header">
          <AnimatedSection>
            <div className="section-label">Browse Fleet</div>
            <h2 className="ec-collection-title">Select Your <em>Aircraft</em></h2>
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
            <label className="filter-label">Aircraft Category</label>
            <div className="ec-filters ec-filters-wrap">
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

          {/* Passenger Filter */}
          <div className="filter-group">
            <label className="filter-label">Minimum Passengers</label>
            <div className="ec-filters">
              {passengerOptions.map((num) => (
                <button
                  key={num}
                  className={`ec-filter-btn ${passengerFilter === num ? 'active' : ''}`}
                  onClick={() => setPassengerFilter(num)}
                >
                  {num === 0 ? 'Any' : `${num}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="filter-group">
            <label className="filter-label">Hourly Rate</label>
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
          <span>{filteredJets.length} aircraft found</span>
          {(categoryFilter !== 'all' || passengerFilter > 0 || priceFilter !== 'all') && (
            <button
              className="filter-clear"
              onClick={() => {
                setCategoryFilter('all')
                setPassengerFilter(0)
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
          key={`${categoryFilter}-${priceFilter}-${passengerFilter}`}
        >
          {filteredJets.map((jet) => (
            <motion.div key={jet.id} variants={scaleIn}>
              <Link href={`/jets/${jet.slug}`} className="ec-card">
                <div className="ec-card-image">
                  <Image
                    src={jet.image}
                    alt={jet.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="ec-card-overlay" />
                  <div className="ec-card-badge">{jet.category.replace('-', ' ')}</div>
                </div>
                <div className="ec-card-content">
                  <span className="ec-card-brand">{jet.manufacturer}</span>
                  <h3 className="ec-card-name">{jet.name}</h3>
                  <div className="ec-card-specs">
                    <span>{jet.passengers} Passengers</span>
                    <span className="ec-card-dot"></span>
                    <span>{jet.range.toLocaleString()} nm range</span>
                  </div>
                  <div className="ec-card-price">
                    <span className="ec-card-rate">${jet.hourlyRate.toLocaleString()}</span>
                    <span className="ec-card-period">/ hour</span>
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

        {filteredJets.length === 0 && (
          <div className="filter-no-results">
            <p>No aircraft match your current filters.</p>
            <button
              className="filter-clear"
              onClick={() => {
                setCategoryFilter('all')
                setPassengerFilter(0)
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
            src="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1920&q=80"
            alt="Private jet"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', filter: 'brightness(0.2)' }}
          />
        </div>
        <div className="ec-cta-content">
          <AnimatedSection>
            <div className="section-label">Get Started</div>
            <h2 className="ec-cta-title">Ready to Fly?</h2>
            <p className="ec-cta-text">
              Contact our aviation team to book your flight. We coordinate seamlessly with yacht itineraries.
            </p>
            <div className="ec-cta-buttons">
              <Link href="/contact" className="ec-cta-primary">
                <span>Book Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link href="/services/private-jets" className="ec-cta-secondary">
                <span>Learn More</span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
