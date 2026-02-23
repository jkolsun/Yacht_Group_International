'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const charterTypes = [
  { value: 'day-charter', label: 'Day Charter' },
  { value: 'overnight', label: 'Overnight Charter' },
  { value: 'multi-day', label: 'Multi-Day Voyage' },
  { value: 'event', label: 'Event / Party' },
  { value: 'purchase', label: 'Yacht Purchase' },
]

const budgetRanges = [
  { value: 'Under $5,000', label: 'Under $5,000' },
  { value: '$5,000 - $10,000', label: '$5,000 – $10,000' },
  { value: '$10,000 - $25,000', label: '$10,000 – $25,000' },
  { value: '$25,000 - $50,000', label: '$25,000 – $50,000' },
  { value: '$50,000 - $100,000', label: '$50,000 – $100,000' },
  { value: '$100,000+', label: '$100,000+' },
]

const destinations = [
  { value: 'Miami / Fort Lauderdale', label: 'Miami / Fort Lauderdale' },
  { value: 'Bahamas', label: 'Bahamas' },
  { value: 'Caribbean', label: 'Caribbean' },
  { value: 'Mediterranean', label: 'Mediterranean' },
  { value: 'Other', label: 'Other' },
]

function QualificationFormInner() {
  const searchParams = useSearchParams()
  const leadId = searchParams.get('lid')

  const [formData, setFormData] = useState({
    rentalType: '',
    timeline: '',
    budget: '',
    location: '',
    guestCount: '',
    specialRequests: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState('')
  const hasTrackedOpen = useRef(false)
  const hasTrackedStart = useRef(false)

  // Track link opened on mount
  useEffect(() => {
    if (leadId && !hasTrackedOpen.current) {
      hasTrackedOpen.current = true
      fetch('/api/webhooks/link-opened', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId }),
      }).catch(console.error)
    }
  }, [leadId])

  const trackStart = () => {
    if (leadId && !hasTrackedStart.current) {
      hasTrackedStart.current = true
      fetch('/api/webhooks/qualification-started', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead_id: leadId }),
      }).catch(console.error)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    trackStart()
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadId) return

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/webhooks/qualification-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: leadId,
          rental_type: formData.rentalType,
          timeline: formData.timeline,
          budget: formData.budget,
          location: formData.location,
          guest_count: formData.guestCount,
          special_requests: formData.specialRequests,
        }),
      })

      if (!response.ok) throw new Error('Failed to submit')

      setIsComplete(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!leadId) {
    return (
      <div className="qualify-page">
        <div className="qualify-container">
          <h1 className="qualify-title">Invalid Link</h1>
          <p className="qualify-subtitle">This qualification link appears to be invalid or expired.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="qualify-page">
      {/* Background */}
      <div className="qualify-bg">
        <Image
          src="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1920&q=80"
          alt="Luxury yacht"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', filter: 'brightness(0.2)' }}
        />
      </div>

      <div className="qualify-container">
        {/* Header */}
        <div className="qualify-header">
          <h2 className="qualify-brand">YACHT GROUP INTERNATIONAL</h2>
          <p className="qualify-brand-sub">Where Luxury Meets the Horizon</p>
        </div>

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="qualify-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="qualify-title">Complete Your Charter Request</h1>
              <p className="qualify-subtitle">
                Help us understand your ideal experience so we can curate the perfect options for you.
              </p>

              {/* Charter Type */}
              <div className="qualify-field">
                <label>Type of Experience *</label>
                <div className="qualify-options">
                  {charterTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      className={`qualify-option ${formData.rentalType === type.value ? 'selected' : ''}`}
                      onClick={() => {
                        trackStart()
                        setFormData((prev) => ({ ...prev, rentalType: type.value }))
                      }}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="qualify-field">
                <label>When are you looking to go? *</label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  placeholder="e.g., Next weekend, March 2026, Within 2 weeks"
                  required
                />
              </div>

              {/* Budget */}
              <div className="qualify-field">
                <label>Budget Range *</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your budget</option>
                  {budgetRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Destination */}
              <div className="qualify-field">
                <label>Preferred Destination</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                >
                  <option value="">Select destination</option>
                  {destinations.map((dest) => (
                    <option key={dest.value} value={dest.value}>
                      {dest.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Guest Count */}
              <div className="qualify-field">
                <label>Number of Guests</label>
                <select
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="1-4">1–4 Guests</option>
                  <option value="5-8">5–8 Guests</option>
                  <option value="9-12">9–12 Guests</option>
                  <option value="13-20">13–20 Guests</option>
                  <option value="20+">20+ Guests</option>
                </select>
              </div>

              {/* Special Requests */}
              <div className="qualify-field">
                <label>Special Requests or Notes</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Anything specific you'd like us to know..."
                  rows={3}
                />
              </div>

              {error && <p className="qualify-error">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting || !formData.rentalType || !formData.timeline || !formData.budget}
                className="qualify-submit"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Charter Request'}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="qualify-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="qualify-success-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="qualify-title">Thank You!</h2>
              <p className="qualify-subtitle">
                Our yacht concierge team will be in touch shortly with personalized charter options tailored to your preferences.
              </p>
              <p className="qualify-response-time">
                Typical response time: under 15 minutes
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function QualifyPage() {
  return (
    <Suspense fallback={
      <div className="qualify-page">
        <div className="qualify-container">
          <div className="qualify-header">
            <h2 className="qualify-brand">YACHT GROUP INTERNATIONAL</h2>
            <p className="qualify-brand-sub">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <QualificationFormInner />
    </Suspense>
  )
}
