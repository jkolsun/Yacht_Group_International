'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Hero } from '@/components/sections'
import { ContactForm, LeadCaptureForm } from '@/components/sections'
import { contactInfo } from '@/lib/data'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
}

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 }
}

export default function ContactPageClient() {
  const contentRef = useRef(null)
  const contentInView = useInView(contentRef, { once: true, margin: "-50px" })
  const mapRef = useRef(null)
  const mapInView = useInView(mapRef, { once: true, margin: "-50px" })

  return (
    <>
      <Hero
        tagline="Get In Touch"
        headline="Contact Us"
        image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=90"
        showScroll={false}
      />

      <section className="page-section" ref={contentRef}>
        <div className="page-container">
          <div className="contact-grid">
            {/* Contact Info */}
            <motion.div
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={fadeInLeft}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="section-label"
                style={{ marginBottom: '2rem' }}
                initial={{ opacity: 0, y: 15 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Private Inquiries
              </motion.div>
              <motion.h2
                className="section-heading"
                style={{ marginBottom: '1.5rem' }}
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Begin Your Voyage
              </motion.h2>
              <motion.p
                className="intro-text"
                style={{ textAlign: 'left', marginBottom: '3rem' }}
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Every journey begins with a conversation. Our concierge team will craft
                an experience to your exact specifications.
              </motion.p>

              <motion.div
                className="contact-info-block"
                initial={{ opacity: 0, x: -20 }}
                animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="contact-info-label">Phone</div>
                <a href={`tel:${contactInfo.phone}`} className="contact-info-value">
                  {contactInfo.phone}
                </a>
              </motion.div>

              <motion.div
                className="contact-info-block"
                initial={{ opacity: 0, x: -20 }}
                animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="contact-info-label">Email</div>
                <a href={`mailto:${contactInfo.email}`} className="contact-info-value">
                  {contactInfo.email}
                </a>
              </motion.div>

              <motion.div
                className="contact-info-block"
                initial={{ opacity: 0, x: -20 }}
                animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="contact-info-label">Address</div>
                <p className="contact-info-value">{contactInfo.address}</p>
              </motion.div>

              <motion.div
                className="contact-info-block"
                initial={{ opacity: 0, x: -20 }}
                animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ x: 5, transition: { duration: 0.2 } }}
              >
                <div className="contact-info-label">Locations</div>
                <p className="contact-info-value">{contactInfo.locations.join(' · ')}</p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="contact-form-container"
              initial="hidden"
              animate={contentInView ? "visible" : "hidden"}
              variants={fadeInRight}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Charter Inquiry */}
      <section className="lead-capture-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>Quick Inquiry</div>
          <h2 className="section-heading" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>Charter Request</h2>
          <p style={{ textAlign: 'center', color: '#9e978c', marginBottom: '2.5rem', fontFamily: "'Cormorant Garamond', serif" }}>
            Skip the details — just share your name and phone, and our team will handle the rest.
          </p>
          <LeadCaptureForm />
        </motion.div>
      </section>

      {/* Map placeholder */}
      <motion.section
        className="map-section"
        ref={mapRef}
        initial={{ opacity: 0 }}
        animate={mapInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={mapInView ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=1920&q=80"
            alt="Miami"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
        <div className="map-overlay-content">
          <motion.div
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="section-label" style={{ marginBottom: '1rem' }}>Headquarters</div>
            <h3 className="section-heading">Miami, Florida</h3>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}
