'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface SubmenuItem {
  href: string
  label: string
}

interface DropdownItem {
  href: string
  label: string
  submenu?: SubmenuItem[]
}

interface NavLink {
  href: string
  label: string
  dropdown?: DropdownItem[]
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  {
    href: '/services',
    label: 'Services',
    dropdown: [
      {
        href: '/services/yacht-charters',
        label: 'Yacht Charters',
        submenu: [
          { href: '/services/yacht-charters', label: 'Overview' },
          { href: '/yachts', label: 'View Fleet' },
        ]
      },
      {
        href: '/services/private-jets',
        label: 'Private Jets',
        submenu: [
          { href: '/services/private-jets', label: 'Overview' },
          { href: '/jets', label: 'View Fleet' },
        ]
      },
      {
        href: '/services/villas',
        label: 'Villa Rentals',
        submenu: [
          { href: '/services/villas', label: 'Overview' },
          { href: '/villas', label: 'View Collection' },
        ]
      },
      {
        href: '/services/exotic-cars',
        label: 'Super Cars',
        submenu: [
          { href: '/services/exotic-cars', label: 'Overview' },
          { href: '/exotic-cars', label: 'View Collection' },
        ]
      },
    ]
  },
  { href: '/destinations', label: 'Destinations' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
      setActiveSubmenu(null)
    }, 150)
  }

  const handleSubmenuEnter = (label: string) => {
    if (submenuTimeoutRef.current) {
      clearTimeout(submenuTimeoutRef.current)
    }
    setActiveSubmenu(label)
  }

  const handleSubmenuLeave = () => {
    submenuTimeoutRef.current = setTimeout(() => {
      setActiveSubmenu(null)
    }, 100)
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <span className="logo-text">Yacht Group</span>
            <span className="logo-accent">International</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="nav-item"
                onMouseEnter={() => link.dropdown && handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={link.href} className="nav-link">
                  {link.label}
                  {link.dropdown && (
                    <svg
                      className={`dropdown-arrow ${activeDropdown === link.label ? 'open' : ''}`}
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                    >
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div
                      className="dropdown-menu"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <div className="dropdown-content">
                        {link.dropdown.map((item, index) => (
                          <motion.div
                            key={item.href + item.label}
                            className={`dropdown-item-wrapper ${item.submenu ? 'has-submenu' : ''}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            onMouseEnter={() => item.submenu && handleSubmenuEnter(item.label)}
                            onMouseLeave={handleSubmenuLeave}
                          >
                            <Link href={item.href} className="dropdown-link">
                              <span className="dropdown-number">0{index + 1}</span>
                              <span className="dropdown-label">{item.label}</span>
                              {item.submenu && (
                                <svg
                                  className="submenu-arrow"
                                  width="6"
                                  height="10"
                                  viewBox="0 0 6 10"
                                  fill="none"
                                >
                                  <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </Link>

                            {/* Submenu */}
                            <AnimatePresence>
                              {item.submenu && activeSubmenu === item.label && (
                                <motion.div
                                  className="submenu"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.15, ease: 'easeOut' }}
                                >
                                  {item.submenu.map((subItem, subIndex) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className="submenu-link"
                                    >
                                      <span className="submenu-number">0{subIndex + 1}</span>
                                      <span className="submenu-label">{subItem.label}</span>
                                    </Link>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/contact" className="navbar-cta">
            <span>Inquire</span>
            <div className="cta-shine"></div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="mobile-menu-content"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mobile-menu-inner">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    {link.dropdown ? (
                      <div className="mobile-nav-group">
                        <Link
                          href={link.href}
                          className="mobile-nav-link"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                        <div className="mobile-dropdown">
                          {link.dropdown.map((item) => (
                            <div key={item.href + item.label}>
                              <Link
                                href={item.href}
                                className="mobile-dropdown-link"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.label}
                              </Link>
                              {item.submenu && (
                                <div className="mobile-submenu">
                                  {item.submenu.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className="mobile-submenu-link"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="mobile-nav-link"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="mobile-menu-footer"
                >
                  <Link
                    href="/contact"
                    className="mobile-cta"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Start Your Journey
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
