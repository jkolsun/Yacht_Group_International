'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { services, Service, yachts, privateJets, villas, exoticCars } from '@/lib/data'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
}

// Collection URL mapping
const collectionUrls: Record<string, string> = {
  'yacht-charters': '/yachts',
  'private-jets': '/jets',
  'villas': '/villas',
  'exotic-cars': '/exotic-cars',
}

// Animated Section Component
function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============ YACHT CHARTERS LAYOUT ============
function YachtChartersLayout({ service }: { service: Service }) {
  const featuredYachts = yachts.slice(0, 4)

  return (
    <>
      {/* Split Intro */}
      <section className="sp-split-intro">
        <div className="sp-split-left">
          <AnimatedSection>
            <div className="section-label">The Experience</div>
            <h2 className="sp-split-title">{service.tagline}</h2>
            <p className="sp-split-text">{service.longDescription}</p>
            <Link href="/yachts" className="sp-view-collection">
              <span>View Our Fleet</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </AnimatedSection>
        </div>
        <motion.div
          className="sp-split-right"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={service.featureBlocks[0].image}
            alt="Yacht experience"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="sp-split-overlay" />
        </motion.div>
      </section>

      {/* Stats Row */}
      <section className="sp-stats-row">
        {service.highlights.map((h, i) => (
          <motion.div
            key={h.label}
            className="sp-stat-box"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <span className="sp-stat-value">{h.number}</span>
            <span className="sp-stat-label">{h.label}</span>
          </motion.div>
        ))}
      </section>

      {/* Fleet Preview Grid */}
      <section className="sp-fleet-preview">
        <AnimatedSection className="sp-fleet-header">
          <div className="section-label">Featured Vessels</div>
          <h2 className="sp-section-title">Our Charter <em>Fleet</em></h2>
        </AnimatedSection>

        <motion.div
          className="sp-fleet-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredYachts.map((yacht) => (
            <motion.div key={yacht.id} variants={scaleIn}>
              <Link href={`/fleet/${yacht.slug}`} className="sp-fleet-card">
                <div className="sp-fleet-image">
                  <Image
                    src={yacht.images[0]}
                    alt={yacht.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="sp-fleet-badge">{yacht.length}'</div>
                </div>
                <div className="sp-fleet-info">
                  <span className="sp-fleet-builder">{yacht.builder}</span>
                  <h3 className="sp-fleet-name">{yacht.name}</h3>
                  <div className="sp-fleet-meta">
                    <span>{yacht.guests} Guests</span>
                    <span>{yacht.cabins} Cabins</span>
                  </div>
                  <div className="sp-fleet-price">From ${yacht.dailyRate.toLocaleString()}/day</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="sp-fleet-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/yachts" className="sp-browse-all">
            Browse All {yachts.length} Yachts
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* Services Checklist */}
      <section className="sp-checklist">
        <div className="sp-checklist-image">
          <Image
            src={service.featureBlocks[1].image}
            alt="Yacht service"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="sp-checklist-content">
          <AnimatedSection>
            <div className="section-label">What's Included</div>
            <h2 className="sp-section-title">Charter <em>Services</em></h2>
            <ul className="sp-check-list">
              {service.features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{f}</span>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

// ============ PRIVATE JETS LAYOUT ============
function PrivateJetsLayout({ service }: { service: Service }) {
  const featuredJets = privateJets.filter(j => j.featured).slice(0, 3)
  const categories = ['Light Jets', 'Midsize', 'Super Midsize', 'Heavy Jets', 'Ultra Long Range']

  return (
    <>
      {/* Hero Split with Video-style */}
      <section className="sp-jets-intro">
        <motion.div
          className="sp-jets-visual"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <Image
            src={service.featureBlocks[0].image}
            alt="Private jet"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="sp-jets-visual-overlay" />
          <div className="sp-jets-stats-overlay">
            {service.highlights.map((h, i) => (
              <motion.div
                key={h.label}
                className="sp-jets-stat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15 }}
              >
                <span className="sp-jets-stat-value">{h.number}</span>
                <span className="sp-jets-stat-label">{h.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Categories Grid */}
      <section className="sp-categories">
        <AnimatedSection className="sp-categories-header">
          <div className="section-label">Aircraft Categories</div>
          <h2 className="sp-section-title">Find Your <em>Perfect Fit</em></h2>
          <p className="sp-categories-subtitle">From quick regional hops to transcontinental journeys</p>
        </AnimatedSection>

        <div className="sp-categories-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat}
              className="sp-category-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="sp-category-number">0{i + 1}</span>
              <h3 className="sp-category-name">{cat}</h3>
              <Link href="/jets" className="sp-category-link">
                View Aircraft
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Aircraft Showcase */}
      <section className="sp-showcase">
        <div className="sp-showcase-header">
          <AnimatedSection>
            <div className="section-label">Featured Aircraft</div>
            <h2 className="sp-section-title">Premier <em>Selection</em></h2>
          </AnimatedSection>
        </div>

        <div className="sp-showcase-list">
          {featuredJets.map((jet, i) => (
            <motion.div
              key={jet.id}
              className="sp-showcase-item"
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="sp-showcase-image">
                <Image
                  src={jet.image}
                  alt={jet.name}
                  fill
                  sizes="60vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="sp-showcase-content">
                <span className="sp-showcase-brand">{jet.manufacturer}</span>
                <h3 className="sp-showcase-name">{jet.name}</h3>
                <div className="sp-showcase-specs">
                  <div className="sp-showcase-spec">
                    <span className="spec-value">{jet.passengers}</span>
                    <span className="spec-label">Passengers</span>
                  </div>
                  <div className="sp-showcase-spec">
                    <span className="spec-value">{jet.range.toLocaleString()}</span>
                    <span className="spec-label">nm Range</span>
                  </div>
                  <div className="sp-showcase-spec">
                    <span className="spec-value">${jet.hourlyRate.toLocaleString()}</span>
                    <span className="spec-label">Per Hour</span>
                  </div>
                </div>
                <Link href={`/jets/${jet.slug}`} className="sp-showcase-link">
                  View Details
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="sp-showcase-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/jets" className="sp-browse-all">
            View All {privateJets.length} Aircraft
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* Services Horizontal */}
      <section className="sp-services-horizontal">
        <AnimatedSection>
          <div className="section-label">Our Services</div>
          <h2 className="sp-section-title">Complete Aviation <em>Solutions</em></h2>
        </AnimatedSection>
        <div className="sp-services-scroll">
          {service.features.map((f, i) => (
            <motion.div
              key={f}
              className="sp-service-card-h"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="sp-service-num">0{i + 1}</span>
              <p className="sp-service-name">{f}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}

// ============ VILLAS LAYOUT ============
function VillasLayout({ service }: { service: Service }) {
  const featuredVillas = villas.filter(v => v.featured).slice(0, 6)
  const regions = ['Caribbean', 'Mediterranean', 'Americas', 'Asia Pacific', 'Middle East']

  return (
    <>
      {/* Masonry Intro */}
      <section className="sp-villas-intro">
        <div className="sp-villas-text">
          <AnimatedSection>
            <p className="sp-villas-lead">{service.longDescription}</p>
            <div className="sp-villas-highlights">
              {service.highlights.map((h) => (
                <div key={h.label} className="sp-villa-highlight">
                  <span className="sp-vh-number">{h.number}</span>
                  <span className="sp-vh-label">{h.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
        <motion.div
          className="sp-villas-mosaic"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {service.gallery.slice(0, 3).map((img, i) => (
            <motion.div
              key={i}
              className={`sp-mosaic-item item-${i + 1}`}
              variants={scaleIn}
            >
              <Image src={img} alt="Villa" fill sizes="33vw" style={{ objectFit: 'cover' }} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Region Explorer */}
      <section className="sp-regions">
        <AnimatedSection className="sp-regions-header">
          <div className="section-label">Destinations</div>
          <h2 className="sp-section-title">Explore by <em>Region</em></h2>
        </AnimatedSection>

        <div className="sp-regions-list">
          {regions.map((region, i) => (
            <motion.div
              key={region}
              className="sp-region-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="sp-region-num">0{i + 1}</span>
              <h3 className="sp-region-name">{region}</h3>
              <span className="sp-region-count">
                {villas.filter(v => v.region === region.toLowerCase().replace(' ', '-')).length} Properties
              </span>
              <Link href="/villas" className="sp-region-link">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Villa Cards */}
      <section className="sp-villa-cards">
        <AnimatedSection className="sp-villa-cards-header">
          <div className="section-label">Featured Properties</div>
          <h2 className="sp-section-title">Exceptional <em>Estates</em></h2>
        </AnimatedSection>

        <motion.div
          className="sp-villa-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredVillas.map((villa) => (
            <motion.div key={villa.id} variants={scaleIn}>
              <Link href={`/villas/${villa.slug}`} className="sp-villa-card">
                <div className="sp-villa-img">
                  <Image
                    src={villa.image}
                    alt={villa.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="sp-villa-location">{villa.location}</div>
                </div>
                <div className="sp-villa-info">
                  <h3 className="sp-villa-name">{villa.name}</h3>
                  <div className="sp-villa-details">
                    <span>{villa.bedrooms} BR</span>
                    <span>{villa.maxGuests} Guests</span>
                  </div>
                  <div className="sp-villa-price">${villa.dailyRate.toLocaleString()}/night</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="sp-villa-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/villas" className="sp-browse-all">
            View All {villas.length} Villas
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* Amenities Showcase */}
      <section className="sp-amenities">
        <div className="sp-amenities-bg">
          <Image
            src={service.featureBlocks[1].image}
            alt="Villa amenities"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', filter: 'brightness(0.3)' }}
          />
        </div>
        <div className="sp-amenities-content">
          <AnimatedSection>
            <div className="section-label">What's Included</div>
            <h2 className="sp-section-title">5-Star <em>Service</em></h2>
            <div className="sp-amenities-grid">
              {service.features.map((f, i) => (
                <motion.div
                  key={f}
                  className="sp-amenity"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>{f}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

// ============ EXOTIC CARS LAYOUT ============
function ExoticCarsLayout({ service }: { service: Service }) {
  const featuredCars = exoticCars.filter(c => c.featured).slice(0, 4)
  const brands = Array.from(new Set(exoticCars.map(c => c.brand)))

  return (
    <>
      {/* Brand Showcase */}
      <section className="sp-brands">
        <AnimatedSection className="sp-brands-header">
          <div className="section-label">The Marques</div>
          <h2 className="sp-section-title">World-Class <em>Brands</em></h2>
        </AnimatedSection>

        <motion.div
          className="sp-brands-list"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {brands.slice(0, 8).map((brand) => (
            <motion.div key={brand} className="sp-brand-item" variants={scaleIn}>
              <span className="sp-brand-name">{brand}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Hero Car Feature */}
      <section className="sp-hero-car">
        <motion.div
          className="sp-hero-car-image"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Image
            src={featuredCars[0]?.image || service.featureBlocks[0].image}
            alt="Featured supercar"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="sp-hero-car-overlay" />
        </motion.div>
        <div className="sp-hero-car-content">
          <AnimatedSection>
            <span className="sp-hero-car-brand">{featuredCars[0]?.brand}</span>
            <h2 className="sp-hero-car-name">{featuredCars[0]?.name}</h2>
            <div className="sp-hero-car-specs">
              <div className="sp-spec">
                <span className="sp-spec-value">{featuredCars[0]?.specs.horsepower}</span>
                <span className="sp-spec-label">Power</span>
              </div>
              <div className="sp-spec">
                <span className="sp-spec-value">{featuredCars[0]?.specs.acceleration}</span>
                <span className="sp-spec-label">0-60 mph</span>
              </div>
              <div className="sp-spec">
                <span className="sp-spec-value">{featuredCars[0]?.specs.topSpeed}</span>
                <span className="sp-spec-label">Top Speed</span>
              </div>
            </div>
            <Link href={`/exotic-cars/${featuredCars[0]?.slug}`} className="sp-hero-car-link">
              View Details
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="sp-stats-bar">
        {service.highlights.map((h, i) => (
          <motion.div
            key={h.label}
            className="sp-stats-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="sp-stats-value">{h.number}</span>
            <span className="sp-stats-label">{h.label}</span>
            <span className="sp-stats-desc">{h.description}</span>
          </motion.div>
        ))}
      </section>

      {/* Car Grid */}
      <section className="sp-car-collection">
        <AnimatedSection className="sp-car-header">
          <div className="section-label">Featured Collection</div>
          <h2 className="sp-section-title">Drive the <em>Dream</em></h2>
        </AnimatedSection>

        <motion.div
          className="sp-car-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredCars.slice(1).map((car) => (
            <motion.div key={car.id} variants={scaleIn}>
              <Link href={`/exotic-cars/${car.slug}`} className="sp-car-card">
                <div className="sp-car-img">
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="sp-car-category">{car.category}</div>
                </div>
                <div className="sp-car-info">
                  <span className="sp-car-brand">{car.brand}</span>
                  <h3 className="sp-car-name">{car.name}</h3>
                  <p className="sp-car-power">{car.specs.horsepower} • {car.specs.acceleration}</p>
                  <div className="sp-car-price">${car.dailyRate.toLocaleString()}/day</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="sp-car-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/exotic-cars" className="sp-browse-all">
            View All {exoticCars.length} Vehicles
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* Services */}
      <section className="sp-car-services">
        <div className="sp-car-services-image">
          <Image
            src={service.featureBlocks[2]?.image || service.gallery[0]}
            alt="Exotic car service"
            fill
            sizes="50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="sp-car-services-content">
          <AnimatedSection>
            <div className="section-label">Concierge Services</div>
            <h2 className="sp-section-title">White Glove <em>Delivery</em></h2>
            <ul className="sp-car-service-list">
              {service.features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="sp-cs-num">0{i + 1}</span>
                  <span className="sp-cs-text">{f}</span>
                </motion.li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}

// ============ DEFAULT LAYOUT ============
function DefaultLayout({ service }: { service: Service }) {
  return (
    <>
      <section className="sp-intro">
        <div className="sp-intro-container">
          <AnimatedSection className="sp-intro-content">
            <p className="sp-intro-lead">{service.description}</p>
            <p className="sp-intro-text">{service.longDescription}</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="sp-highlights">
        <div className="sp-highlights-inner">
          {service.highlights.map((h) => (
            <div key={h.label} className="sp-highlight-item">
              <span className="sp-highlight-number">{h.number}</span>
              <span className="sp-highlight-label">{h.label}</span>
              <span className="sp-highlight-desc">{h.description}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

// ============ MAIN COMPONENT ============
export default function ServicePageClient({ service }: { service: Service }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const collectionUrl = collectionUrls[service.slug]

  // Render layout based on service type
  const renderLayout = () => {
    switch (service.slug) {
      case 'yacht-charters':
        return <YachtChartersLayout service={service} />
      case 'private-jets':
        return <PrivateJetsLayout service={service} />
      case 'villas':
        return <VillasLayout service={service} />
      case 'exotic-cars':
        return <ExoticCarsLayout service={service} />
      default:
        return <DefaultLayout service={service} />
    }
  }

  return (
    <>
      {/* ======================== CINEMATIC HERO ======================== */}
      <section ref={heroRef} className="sp-hero">
        <motion.div className="sp-hero-bg" style={{ y: heroY, scale: heroScale }}>
          <Image
            src={service.heroImage}
            alt={service.name}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
        <div className="sp-hero-overlay" />
        <div className="sp-hero-gradient" />

        <motion.div className="sp-hero-content" style={{ opacity: heroOpacity }}>
          <motion.div
            className="sp-hero-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {service.number} — {service.label}
          </motion.div>

          <motion.h1
            className="sp-hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {service.name}
          </motion.h1>

          <motion.p
            className="sp-hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {service.tagline}
          </motion.p>

          {collectionUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link href={collectionUrl} className="sp-hero-cta">
                <span>View Collection</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          )}

          <motion.div
            className="sp-hero-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <span>Discover</span>
            <div className="sp-scroll-line">
              <div className="sp-scroll-dot" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Render unique layout based on service */}
      {renderLayout()}

      {/* ======================== CTA SECTION ======================== */}
      <section className="sp-cta">
        <motion.div
          className="sp-cta-bg"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={service.heroImage}
            alt={service.name}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', filter: 'brightness(0.2)' }}
          />
        </motion.div>
        <div className="sp-cta-overlay" />

        <div className="sp-cta-content">
          <AnimatedSection>
            <div className="section-label">Get Started</div>
            <h2 className="sp-cta-heading">Ready to Begin?</h2>
            <p className="sp-cta-text">{service.ctaDescription}</p>

            <div className="sp-cta-buttons">
              <Link href="/contact" className="sp-cta-primary">
                <span>Contact Us</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              {collectionUrl && (
                <Link href={collectionUrl} className="sp-cta-secondary">
                  <span>Browse Collection</span>
                </Link>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ======================== OTHER SERVICES ======================== */}
      <section className="sp-other">
        <AnimatedSection className="sp-other-header">
          <div className="section-label">Explore More</div>
          <h2 className="sp-other-heading">Other Services</h2>
        </AnimatedSection>

        <motion.div
          className="sp-other-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services
            .filter(s => s.slug !== service.slug)
            .slice(0, 4)
            .map((otherService) => (
              <motion.div key={otherService.id} variants={scaleIn}>
                <Link href={`/services/${otherService.slug}`} className="sp-other-card">
                  <div className="sp-other-image">
                    <Image
                      src={otherService.image}
                      alt={otherService.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="sp-other-overlay" />
                  </div>
                  <div className="sp-other-content">
                    <span className="sp-other-number">{otherService.number}</span>
                    <h3 className="sp-other-title">{otherService.name}</h3>
                    <span className="sp-other-arrow">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
        </motion.div>
      </section>
    </>
  )
}
