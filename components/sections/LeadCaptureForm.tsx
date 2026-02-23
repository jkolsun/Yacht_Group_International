'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUTMParams } from '@/hooks/useUTMParams'

interface LeadCaptureFormProps {
  prefilledInterest?: string
}

const interestOptions = [
  { value: 'day-charter', label: 'Day Charter', desc: 'A single day on the water' },
  { value: 'overnight', label: 'Overnight Charter', desc: 'Multi-night maritime escape' },
  { value: 'multi-day', label: 'Multi-Day Voyage', desc: 'Extended luxury expedition' },
  { value: 'event', label: 'Event / Party', desc: 'Celebrate on the water' },
  { value: 'purchase', label: 'Yacht Purchase', desc: 'Acquire your own vessel' },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
}

export default function LeadCaptureForm({ prefilledInterest }: LeadCaptureFormProps) {
  const utm = useUTMParams()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    rentalType: prefilledInterest || '',
    preferredDate: '',
    guestCount: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const selectInterest = (value: string) => {
    setFormData((prev) => ({ ...prev, rentalType: value }))
    goNext()
  }

  const goNext = () => {
    setDirection(1)
    setStep((s) => s + 1)
  }

  const goBack = () => {
    setDirection(-1)
    setStep((s) => s - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          rentalType: formData.rentalType,
          source: 'LANDING',
          utmSource: utm.utmSource,
          utmMedium: utm.utmMedium,
          utmCampaign: utm.utmCampaign,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      goNext()
    } catch {
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceedStep1 = formData.name.trim() && formData.phone.trim()
  const canProceedStep3 = true // date and guests are optional but encouraged

  return (
    <div className="lead-capture-form">
      {/* Progress indicator */}
      {step < 4 && (
        <div className="lead-capture-progress">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`lead-capture-progress-dot ${s === step ? 'active' : ''} ${s < step ? 'completed' : ''}`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait" custom={direction}>
        {step === 1 && (
          <motion.div
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lead-capture-step"
          >
            <h3 className="lead-capture-title">Plan Your Charter</h3>
            <p className="lead-capture-subtitle">Tell us a bit about yourself</p>

            <div className="lead-capture-fields">
              <div className="lead-capture-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>
              <div className="lead-capture-field">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  autoComplete="tel"
                />
              </div>
              <div className="lead-capture-field">
                <label>Email <span className="lead-capture-optional">optional</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <button
              onClick={goNext}
              disabled={!canProceedStep1}
              className="lead-capture-btn"
            >
              Continue
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lead-capture-step"
          >
            <h3 className="lead-capture-title">What interests you?</h3>
            <p className="lead-capture-subtitle">Select your experience</p>

            <div className="lead-capture-cards">
              {interestOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => selectInterest(option.value)}
                  className={`lead-capture-card ${formData.rentalType === option.value ? 'selected' : ''}`}
                >
                  <span className="lead-capture-card-label">{option.label}</span>
                  <span className="lead-capture-card-desc">{option.desc}</span>
                </button>
              ))}
            </div>

            <button onClick={goBack} className="lead-capture-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lead-capture-step"
          >
            <h3 className="lead-capture-title">Almost there</h3>
            <p className="lead-capture-subtitle">When are you planning and how many guests?</p>

            <div className="lead-capture-fields">
              <div className="lead-capture-field">
                <label>Preferred Date</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleChange}
                />
              </div>
              <div className="lead-capture-field">
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
            </div>

            {error && <p className="lead-capture-error">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="lead-capture-btn"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>

            <button onClick={goBack} className="lead-capture-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lead-capture-step lead-capture-success"
          >
            <div className="lead-capture-success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="lead-capture-title">Thank You</h3>
            <p className="lead-capture-subtitle">
              Our concierge team will reach out shortly to craft your perfect experience.
            </p>
            <p className="lead-capture-response-time">
              Typical response time: under 15 minutes
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
