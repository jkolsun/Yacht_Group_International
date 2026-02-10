'use client'

import Link from 'next/link'
import { contactInfo } from '@/lib/data'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const menuLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  return (
    <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
      {/* Left panel - Contact info */}
      <div className="menu-left">
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.5rem', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.6rem' }}>
            Charters & Sales
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 300, color: '#f0ebe3', lineHeight: 1.7 }}>
            <a href={`tel:${contactInfo.phone}`} style={{ transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#c9a96e'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#f0ebe3'}>
              {contactInfo.phone}
            </a>
          </div>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.5rem', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.6rem' }}>
            General Inquiries
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 300, color: '#f0ebe3', lineHeight: 1.7 }}>
            <a href={`mailto:${contactInfo.email}`} style={{ transition: 'color 0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#c9a96e'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#f0ebe3'}>
              {contactInfo.email}
            </a>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.5rem', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '0.6rem' }}>
            Locations
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontWeight: 300, color: '#f0ebe3', lineHeight: 1.7 }}>
            {contactInfo.locations.slice(0, 3).join(' · ')}
            <br />
            {contactInfo.locations.slice(3).join(' · ')}
          </div>
        </div>
      </div>

      {/* Right panel - Navigation links */}
      <div className="menu-right">
        <ul className="menu-nav">
          {menuLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={onClose}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
