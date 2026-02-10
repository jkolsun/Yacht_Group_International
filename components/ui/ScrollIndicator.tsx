'use client'

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 flex flex-col items-center gap-3 reveal-fade d5 in-view">
      <span className="font-sans text-[0.5rem] tracking-[0.35em] uppercase text-cream-dim [writing-mode:vertical-rl]">
        Scroll
      </span>
      <div className="w-px h-14 bg-gold/25 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gold animate-scroll-drop"
          style={{
            animation: 'scrollDrop 2.2s ease-in-out infinite'
          }}
        />
      </div>
    </div>
  )
}
