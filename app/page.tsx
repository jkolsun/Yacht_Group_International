'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef } from 'react'
import { services, getFeaturedYachts, getFeaturedDestinations, contactInfo, getFeaturedJets, getFeaturedCars, getFeaturedVillas } from '@/lib/data'
import TestimonialCarousel from '@/components/home/TestimonialCarousel'
import LeadCaptureForm from '@/components/sections/LeadCaptureForm'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
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

export default function HomePage() {
  const featuredYachts = getFeaturedYachts()
  const featuredDestinations = getFeaturedDestinations()
  const featuredJets = getFeaturedJets()
  const featuredCars = getFeaturedCars()
  const featuredVillas = getFeaturedVillas()

  // Create premium collection with one item from each category
  const premiumCollection = [
    { type: 'yacht', item: featuredYachts[0], href: `/fleet/${featuredYachts[0]?.slug}`, label: 'Yacht' },
    { type: 'jet', item: featuredJets[0], href: `/jets/${featuredJets[0]?.slug}`, label: 'Private Jet' },
    { type: 'car', item: featuredCars[0], href: `/exotic-cars/${featuredCars[0]?.slug}`, label: 'Exotic Car' },
    { type: 'villa', item: featuredVillas[0], href: `/villas/${featuredVillas[0]?.slug}`, label: 'Luxury Villa' },
  ]

  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <>
      {/* ======================== HERO ======================== */}
      <section ref={heroRef} className="hero-section">
        <motion.div className="hero-bg ken-burns" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=90"
            alt="Luxury superyacht at golden hour"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
        <div className="hero-overlay"></div>
        <motion.div className="hero-content" style={{ opacity: heroOpacity }}>
          <motion.h1
            className="hero-headline"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Where Luxury Meets <em>the Horizon</em>
          </motion.h1>
          <motion.p
            className="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Premium yacht charters, sales, private aviation, and luxury lifestyle services across 9 global destinations.
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <Link href="/fleet" className="hero-cta-btn">
              <span>Explore Fleet</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/contact" className="hero-cta-outline">
              <span>Get in Touch</span>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </motion.div>
      </section>

      {/* ======================== SERVICES GRID ======================== */}
      <section className="services-grid-section">
        <AnimatedSection className="services-grid-header">
          <div className="section-label">What We Offer</div>
          <h2 className="section-heading">Our Services</h2>
          <p className="section-desc">Comprehensive luxury lifestyle solutions tailored to the most discerning clientele.</p>
        </AnimatedSection>

        <motion.div
          className="services-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div key={service.id} variants={scaleIn}>
              <Link href={`/services/${service.slug}`} className="service-card">
                <div className="service-card-image">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="service-card-overlay"></div>
                </div>
                <div className="service-card-content">
                  <span className="service-card-number">{service.number}</span>
                  <h3 className="service-card-title">{service.name}</h3>
                  <p className="service-card-tagline">{service.tagline}</p>
                  <span className="service-card-cta">
                    {service.cta}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ======================== WHY CHOOSE US ======================== */}
      <section className="why-section-v2">
        {/* Main Split Block */}
        <div className="why-main-block">
          <motion.div
            className="why-main-image"
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1200&q=90"
              alt="Luxury superyacht at sea"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="why-main-image-overlay" />
          </motion.div>
          <motion.div
            className="why-main-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="section-label">Why Choose Us</div>
            <h2 className="why-main-title">The Yacht Group <em>Difference</em></h2>
            <p className="why-main-text">
              With over a decade curating the world's finest maritime experiences, we've built relationships that open doors others simply cannot access. From off-market superyachts to private island anchorages, we transform ambitious visions into extraordinary realities.
            </p>
            <Link href="/about" className="why-main-btn">
              <span>Discover Our Story</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          className="why-cards-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div className="why-card" variants={scaleIn}>
            <div className="why-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="why-card-title">Exclusive Access</h3>
            <p className="why-card-text">Off-market vessels and VIP experiences unavailable through any other channel.</p>
          </motion.div>

          <motion.div className="why-card featured" variants={scaleIn}>
            <div className="why-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h3 className="why-card-title">24/7 Concierge</h3>
            <p className="why-card-text">Round-the-clock support ensuring every detail is flawlessly executed.</p>
            <span className="why-card-badge">Always Available</span>
          </motion.div>

          <motion.div className="why-card" variants={scaleIn}>
            <div className="why-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="why-card-title">Elite Professionals</h3>
            <p className="why-card-text">Vetted captains, Michelin-trained chefs, and expert crews worldwide.</p>
          </motion.div>

          <motion.div className="why-card" variants={scaleIn}>
            <div className="why-card-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3 className="why-card-title">Bespoke Itineraries</h3>
            <p className="why-card-text">Every journey custom-crafted to your exact preferences and desires.</p>
          </motion.div>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          className="why-testimonials"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <TestimonialCarousel />
        </motion.div>
      </section>

      {/* ======================== PREMIUM COLLECTION ======================== */}
      <section className="fleet-section">
        <AnimatedSection className="section-header">
          <div className="section-label">Curated Selection</div>
          <h2 className="section-heading">Premium Collection</h2>
        </AnimatedSection>
        <motion.div
          className="collection-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {premiumCollection.map((entry, index) => {
            const item = entry.item as { name: string; images?: string[]; image?: string } | undefined
            if (!item) return null
            const image = item.images ? item.images[0] : item.image || ''
            const name = item.name
            return (
              <motion.div key={entry.type} variants={scaleIn} custom={index}>
                <Link href={entry.href} className="collection-item">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="collection-caption">
                    <span className="collection-label">{entry.label}</span>
                    <h3>{name}</h3>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ======================== DESTINATIONS ======================== */}
      <section className="destinations-section">
        <AnimatedSection className="destinations-header">
          <div className="section-label">Worldwide</div>
          <h2 className="section-heading">Destinations</h2>
        </AnimatedSection>
        <div className="dest-scroll">
          <motion.div
            className="dest-track"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {featuredDestinations.map((dest, index) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/destinations/${dest.slug}`} className="dest-item">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    sizes="340px"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="dest-item-overlay">
                    <h3>{dest.name}</h3>
                    <div className="dest-region">{dest.region}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          style={{ textAlign: 'center', marginTop: '2.5rem', padding: '0 4rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/destinations" className="cta-btn-prominent">
            Explore All Destinations
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* ======================== TESTIMONIAL ======================== */}
      <section className="testimonial-section">
        <motion.div
          className="testimonial-content"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="testimonial-quote">"</div>
          <blockquote className="testimonial-text">
            The attention to detail was extraordinary. From the moment we stepped aboard, every aspect of our journey was flawlessly orchestrated. This wasn't just a charter—it was a transformative experience.
          </blockquote>
          <div className="testimonial-author">
            <span className="testimonial-name">Michael & Sarah Richardson</span>
            <span className="testimonial-trip">Mediterranean Charter, Summer 2024</span>
          </div>
        </motion.div>
      </section>

      {/* ======================== PROCESS ======================== */}
      <section className="process-section">
        <AnimatedSection className="process-header">
          <div className="section-label">How It Works</div>
          <h2 className="section-heading">Your Journey Begins</h2>
        </AnimatedSection>
        <motion.div
          className="process-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div className="process-step" variants={fadeInUp}>
            <span className="process-number">01</span>
            <h3 className="process-title">Consultation</h3>
            <p className="process-desc">Share your vision with our specialists. We'll understand your preferences, travel dates, and desired experiences.</p>
          </motion.div>
          <motion.div className="process-step" variants={fadeInUp}>
            <span className="process-number">02</span>
            <h3 className="process-title">Curation</h3>
            <p className="process-desc">We handpick the perfect vessel, destinations, and experiences tailored specifically to your requirements.</p>
          </motion.div>
          <motion.div className="process-step" variants={fadeInUp}>
            <span className="process-number">03</span>
            <h3 className="process-title">Experience</h3>
            <p className="process-desc">Embark on your journey with complete peace of mind. Our team remains available 24/7 throughout your voyage.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ======================== LEAD CAPTURE ======================== */}
      <section className="lead-capture-section">
        <AnimatedSection>
          <div className="section-label">Quick Inquiry</div>
          <h2 className="section-heading">Plan Your Charter</h2>
          <p className="section-desc">Share a few details and our concierge team will reach out with personalized options.</p>
        </AnimatedSection>
        <LeadCaptureForm />
      </section>

      {/* ======================== CONTACT CTA ======================== */}
      <section className="contact-panel">
        <motion.div
          className="contact-bg"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
            alt="Yacht at dusk"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', filter: 'brightness(0.25)' }}
          />
        </motion.div>
        <div className="contact-overlay"></div>
        <div className="contact-content">
          <AnimatedSection className="contact-inner">
            <div className="section-label">Private Inquiries</div>
            <h2>Begin Your Journey</h2>
            <p>Contact our team to begin planning your bespoke luxury experience.</p>
            <div className="contact-cta-row">
              <Link href="/contact" className="btn-submit" style={{ display: 'inline-block', textDecoration: 'none' }}>
                Contact Us
              </Link>
              <a href={`tel:${contactInfo.phone}`} className="contact-phone">
                Or call {contactInfo.phone}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
