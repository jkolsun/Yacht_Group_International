'use client'

import Link from 'next/link'
import { useState } from 'react'

interface MenuOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const serviceLinks = [
  { href: '/services/yacht-charters', label: 'Yacht Charters' },
  { href: '/services/yacht-sales', label: 'Yacht Sales' },
  { href: '/services/private-jets', label: 'Private Jets' },
  { href: '/services/exotic-cars', label: 'Exotic Cars' },
  { href: '/services/villas', label: 'Villa Rentals' },
]

const menuLinks = [
  { href: '/', label: 'Home' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  const [servicesOpen, setServicesOpen] = useState(false)

  const handleClose = () => {
    setServicesOpen(false)
    onClose()
  }

  return (
    <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
      <div className="menu-content">
        <ul className="menu-nav">
          <li>
            <Link href="/" onClick={handleClose}>Home</Link>
          </li>
          <li className="menu-dropdown">
            <button
              className="menu-dropdown-toggle"
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services
              <svg
                className={`menu-dropdown-arrow ${servicesOpen ? 'open' : ''}`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <ul className={`menu-dropdown-items ${servicesOpen ? 'open' : ''}`}>
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={handleClose}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {menuLinks.slice(1).map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={handleClose}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
