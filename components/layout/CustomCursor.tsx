'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const positionRef = useRef({ x: -100, y: -100 })
  const isHoveringRef = useRef(false)
  const isOnScreenRef = useRef(true)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Only enable custom cursor on desktop with fine pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const isDesktop = window.innerWidth > 768

    if (!isFinePointer || !isDesktop) {
      // Ensure default cursor shows on non-desktop
      document.body.style.cursor = 'auto'
      return
    }

    setIsVisible(true)

    const updateCursorStyle = () => {
      const outer = outerRef.current
      const inner = innerRef.current
      if (!outer || !inner) return

      const { x, y } = positionRef.current
      const isHovering = isHoveringRef.current
      const isOnScreen = isOnScreenRef.current
      const showCursor = isOnScreen && x >= 0 && y >= 0

      // Update position directly on DOM for smooth performance
      outer.style.left = `${x}px`
      outer.style.top = `${y}px`
      outer.style.width = isHovering ? '60px' : '40px'
      outer.style.height = isHovering ? '60px' : '40px'
      outer.style.borderColor = isHovering ? '#c9a96e' : 'rgba(201, 169, 110, 0.5)'
      outer.style.backgroundColor = isHovering ? 'rgba(201, 169, 110, 0.08)' : 'transparent'
      outer.style.opacity = showCursor ? '1' : '0'

      inner.style.left = `${x}px`
      inner.style.top = `${y}px`
      inner.style.transform = `translate(-50%, -50%) scale(${isHovering ? 0 : 1})`
      inner.style.opacity = showCursor && !isHovering ? '1' : '0'
    }

    const handleMouseMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY }
      isOnScreenRef.current = true

      // Cancel previous frame and schedule new update
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      rafRef.current = requestAnimationFrame(updateCursorStyle)
    }

    const handleMouseEnter = () => {
      isHoveringRef.current = true
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateCursorStyle)
    }

    const handleMouseLeave = () => {
      isHoveringRef.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateCursorStyle)
    }

    // Handle mouse leaving/entering the window
    const handleDocumentLeave = () => {
      isOnScreenRef.current = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateCursorStyle)
    }

    const handleDocumentEnter = (e: MouseEvent) => {
      isOnScreenRef.current = true
      positionRef.current = { x: e.clientX, y: e.clientY }
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateCursorStyle)
    }

    // Track mouse movement
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleDocumentLeave)
    document.addEventListener('mouseenter', handleDocumentEnter)

    // Setup hover detection - using event delegation for better performance
    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (!target) return

      const isInteractive = target.closest(
        'a, button, [data-cursor-hover], input, select, textarea, .gallery-item, .dest-item, .yacht-card, .grid-card, .nav-link, .dropdown-link, .submenu-link, .navbar-cta, .cta-line, .btn-submit, .hero-cta-btn, .why-card, .service-card, .ec-card, .testimonial-nav, .testimonial-dot'
      )

      const wasHovering = isHoveringRef.current
      isHoveringRef.current = !!isInteractive

      if (wasHovering !== isHoveringRef.current) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(updateCursorStyle)
      }
    }

    document.addEventListener('mouseover', handleGlobalMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleDocumentLeave)
      document.removeEventListener('mouseenter', handleDocumentEnter)
      document.removeEventListener('mouseover', handleGlobalMouseOver)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          left: -100,
          top: -100,
          width: '40px',
          height: '40px',
          border: '1px solid rgba(201, 169, 110, 0.5)',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transition: 'width 0.15s ease-out, height 0.15s ease-out, border-color 0.15s ease-out, background-color 0.15s ease-out, opacity 0.1s ease-out',
          willChange: 'left, top, width, height, opacity',
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          left: -100,
          top: -100,
          width: '6px',
          height: '6px',
          backgroundColor: '#c9a96e',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          pointerEvents: 'none',
          zIndex: 100000,
          opacity: 0,
          transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
          willChange: 'left, top, transform, opacity',
        }}
      />
    </>
  )
}
