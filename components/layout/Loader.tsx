'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15 + 5
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsComplete(true), 400)
          setTimeout(() => setIsHidden(true), 1600)
          return 100
        }
        return next
      })
    }, 120)

    return () => clearInterval(interval)
  }, [])

  if (isHidden) return null

  return (
    <div
      className={`fixed inset-0 bg-black z-[10000] flex items-center justify-center flex-col gap-10 transition-all duration-[1200ms] ease-out ${
        isComplete ? 'clip-path-out' : ''
      }`}
      style={{
        clipPath: isComplete ? 'inset(0 0 100% 0)' : 'inset(0 0 0 0)',
      }}
    >
      <div
        className="font-sans text-[0.6rem] font-light tracking-[0.6em] uppercase text-cream-dim opacity-0 animate-[loaderFade_1s_0.3s_ease-out_forwards]"
      >
        Yacht Group International
      </div>

      <div className="w-40 h-px bg-gold/15 relative overflow-hidden opacity-0 animate-[loaderFade_0.6s_0.5s_ease-out_forwards]">
        <div
          className="h-full bg-gold transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
