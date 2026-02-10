'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Hero, Statement } from '@/components/sections'
import { team, contactInfo } from '@/lib/data'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
}

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

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

export default function AboutPageClient() {
  const teamRef = useRef(null)
  const teamInView = useInView(teamRef, { once: true, margin: "-50px" })
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" })

  return (
    <>
      <Hero
        tagline="Our Story"
        headline="About Us"
        image="https://images.unsplash.com/photo-1559599238-308793637427?w=1920&q=90"
        showScroll={false}
      />

      <Statement
        text="Where Luxury and Freedom Converge: Your Yacht, Your Journey, Your Group, Internationally."
        highlightedText="Your Yacht, Your Journey"
      />

      {/* Philosophy */}
      <section className="page-section-panel">
        <div className="page-container" style={{ textAlign: 'center' }}>
          <AnimatedSection>
            <motion.div
              className="section-label"
              style={{ marginBottom: '2rem' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Philosophy
            </motion.div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="intro-text" style={{ marginBottom: '2rem' }}>
              Yacht Group International operates as a comprehensive luxury lifestyle company specializing
              in yacht brokerage, charters, and premium experiential services. We distinguish ourselves
              through personalized service delivery across multiple luxury sectors.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="intro-text">
              The art of luxury curation, where expertise in yacht brokerage combines with dedicated
              personalization, transforming adventures into opulent experiences.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Team Section */}
      <section className="page-section" ref={teamRef}>
        <div className="page-container">
          <AnimatedSection className="section-header">
            <div style={{ marginBottom: '5rem' }}>
              <div className="section-label">Leadership</div>
              <h2 className="section-heading">Our Team</h2>
            </div>
          </AnimatedSection>

          <motion.div
            className="team-grid"
            variants={staggerContainer}
            initial="hidden"
            animate={teamInView ? "visible" : "hidden"}
          >
            {team.map((member, index) => (
              <motion.div
                key={member.id}
                className="team-member"
                variants={scaleIn}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="team-member-image"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={teamInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="160px"
                    style={{ objectFit: 'cover' }}
                  />
                </motion.div>
                <motion.h3
                  className="team-member-name"
                  initial={{ opacity: 0, y: 10 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {member.name}
                </motion.h3>
                <motion.div
                  className="team-member-role"
                  initial={{ opacity: 0 }}
                  animate={teamInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  {member.role}
                </motion.div>
                <motion.p
                  className="team-member-bio"
                  initial={{ opacity: 0 }}
                  animate={teamInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  {member.bio}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className="page-section-panel">
        <div className="page-container" style={{ textAlign: 'center' }}>
          <AnimatedSection>
            <div className="section-label" style={{ marginBottom: '2rem' }}>Our Locations</div>
          </AnimatedSection>
          <motion.p
            className="section-heading"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {contactInfo.locations.join(' · ')}
          </motion.p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="cta-section" ref={ctaRef}>
        <div className="page-container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Begin Your Journey?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/contact" className="btn-cta">
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
