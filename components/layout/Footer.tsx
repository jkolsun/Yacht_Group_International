'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { contactInfo } from '@/lib/data'

const footerLinks = {
  services: [
    { href: '/services/yacht-charters', label: 'Yacht Charters' },
    { href: '/services/yacht-sales', label: 'Yacht Sales' },
    { href: '/services/private-jets', label: 'Private Jets' },
    { href: '/services/exotic-cars', label: 'Exotic Cars' },
    { href: '/services/villas', label: 'Villa Rentals' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/fleet', label: 'Our Fleet' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/contact', label: 'Contact' },
  ],
}

const socialLinks = [
  { href: 'https://instagram.com', label: 'Instagram', icon: 'IG' },
  { href: 'https://facebook.com', label: 'Facebook', icon: 'FB' },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'IN' },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

export default function Footer() {
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, margin: "-50px" })

  return (
    <footer className="footer-new" ref={footerRef}>
      {/* Top Section */}
      <div className="footer-top">
        <motion.div
          className="footer-grid"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Brand Column */}
          <motion.div className="footer-brand" variants={fadeInUp} transition={{ duration: 0.6 }}>
            <Link href="/" className="footer-logo">
              <span className="footer-logo-text">Yacht Group</span>
              <span className="footer-logo-accent">International</span>
            </Link>
            <p className="footer-tagline">
              Curating extraordinary maritime experiences since establishment.
              Your voyage begins with a single conversation.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services Column */}
          <motion.div className="footer-column" variants={fadeInUp} transition={{ duration: 0.6 }}>
            <h4 className="footer-column-title">Services</h4>
            <ul className="footer-list">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                >
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div className="footer-column" variants={fadeInUp} transition={{ duration: 0.6 }}>
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-list">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                >
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div className="footer-column" variants={fadeInUp} transition={{ duration: 0.6 }}>
            <h4 className="footer-column-title">Get in Touch</h4>
            <div className="footer-contact">
              <motion.div
                className="footer-contact-item"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <span className="footer-contact-label">Call Us</span>
                <a href={`tel:${contactInfo.phone}`} className="footer-contact-value">
                  {contactInfo.phone}
                </a>
              </motion.div>
              <motion.div
                className="footer-contact-item"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <span className="footer-contact-label">Email</span>
                <a href={`mailto:${contactInfo.email}`} className="footer-contact-value">
                  {contactInfo.email}
                </a>
              </motion.div>
              <motion.div
                className="footer-contact-item"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <span className="footer-contact-label">Headquarters</span>
                <span className="footer-contact-value">{contactInfo.address}</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Locations Bar */}
      <motion.div
        className="footer-locations"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="locations-label">Our Locations</div>
        <div className="locations-list">
          {contactInfo.locations.map((location, index) => (
            <motion.span
              key={location}
              className="location-item"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
            >
              {location}
              {index < contactInfo.locations.length - 1 && <span className="location-dot">·</span>}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="footer-bottom-content">
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} Yacht Group International. All Rights Reserved.
          </div>
          <div className="footer-legal">
            <Link href="/privacy" className="footer-legal-link">Privacy Policy</Link>
            <span className="footer-legal-divider">|</span>
            <Link href="/terms" className="footer-legal-link">Terms of Service</Link>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
