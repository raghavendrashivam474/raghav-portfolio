import { useEffect, useRef, useCallback, useState } from 'react'
import { evolutionStages, evolutionMeta } from '../data/evolution'

/**
 * Subtle stage topology glyph — communicates system state without becoming a diagram showcase.
 */
function StageTopology({ stageIndex }) {
  const topologies = [
    // 01 Making — scattered nodes
    (
      <svg viewBox="0 0 120 48" className="w-full h-12 text-copper/70" aria-hidden="true">
        <circle cx="18" cy="14" r="2.5" fill="currentColor" opacity="0.9" />
        <circle cx="42" cy="28" r="2" fill="currentColor" opacity="0.55" />
        <circle cx="68" cy="12" r="2.2" fill="currentColor" opacity="0.7" />
        <circle cx="88" cy="30" r="2" fill="currentColor" opacity="0.5" />
        <circle cx="104" cy="16" r="2.4" fill="currentColor" opacity="0.8" />
        <circle cx="30" cy="38" r="1.8" fill="currentColor" opacity="0.4" />
        <circle cx="78" cy="40" r="2" fill="currentColor" opacity="0.45" />
      </svg>
    ),
    // 02 Understanding — early connections
    (
      <svg viewBox="0 0 120 48" className="w-full h-12 text-copper/80" aria-hidden="true">
        <circle cx="28" cy="16" r="2.5" fill="currentColor" />
        <circle cx="52" cy="32" r="2.5" fill="currentColor" />
        <circle cx="78" cy="14" r="2.5" fill="currentColor" />
        <circle cx="96" cy="34" r="2.2" fill="currentColor" opacity="0.7" />
        <line x1="28" y1="16" x2="52" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.55" />
        <line x1="52" y1="32" x2="78" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.55" />
        <line x1="78" y1="14" x2="96" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      </svg>
    ),
    // 03 Designing systems — structured network
    (
      <svg viewBox="0 0 120 48" className="w-full h-12 text-copper" aria-hidden="true">
        <rect x="14" y="10" width="22" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="84" y="10" width="22" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <rect x="49" y="28" width="22" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <line x1="36" y1="17" x2="84" y2="17" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <line x1="25" y1="24" x2="55" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.55" />
        <line x1="95" y1="24" x2="65" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      </svg>
    ),
    // 04 Thinking in products — purposeful flow
    (
      <svg viewBox="0 0 120 48" className="w-full h-12 text-copper" aria-hidden="true">
        <circle cx="24" cy="24" r="3" fill="currentColor" />
        <circle cx="60" cy="24" r="3" fill="currentColor" />
        <circle cx="96" cy="24" r="3" fill="currentColor" />
        <line x1="27" y1="24" x2="57" y2="24" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <line x1="63" y1="24" x2="93" y2="24" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <path d="M52 20 L60 24 L52 28" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.8" />
        <path d="M88 20 L96 24 L88 28" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.8" />
        <text x="18" y="12" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.7">P</text>
        <text x="54" y="12" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.7">U</text>
        <text x="90" y="12" fill="currentColor" fontSize="7" fontFamily="monospace" opacity="0.7">S</text>
      </svg>
    ),
    // 05 Building with intent — coherent topology
    (
      <svg viewBox="0 0 120 48" className="w-full h-12 text-copper" aria-hidden="true">
        <circle cx="60" cy="10" r="2.8" fill="currentColor" />
        <circle cx="28" cy="36" r="2.5" fill="currentColor" />
        <circle cx="60" cy="36" r="2.5" fill="currentColor" />
        <circle cx="92" cy="36" r="2.5" fill="currentColor" />
        <line x1="60" y1="13" x2="28" y2="33" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
        <line x1="60" y1="13" x2="60" y2="33" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
        <line x1="60" y1="13" x2="92" y2="33" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
        <line x1="28" y1="36" x2="60" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="60" y1="36" x2="92" y2="36" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  ]

  return (
    <div className="w-full max-w-[180px] mx-auto opacity-90 transition-opacity duration-300">
      {topologies[stageIndex] || topologies[0]}
    </div>
  )
}

export default function EvolutionPanel({ isOpen, onClose }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const stage = evolutionStages[activeIndex]
  const total = evolutionStages.length

  const goTo = useCallback((index) => {
    if (index < 0 || index >= total) return
    setActiveIndex(index)
  }, [total])

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  const handleClose = useCallback(() => {
    setActiveIndex(0)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      const timer = requestAnimationFrame(() => closeBtnRef.current?.focus())
      return () => cancelAnimationFrame(timer)
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        e.stopPropagation()
        handleClose()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goNext()
      }
    },
    [isOpen, handleClose, goPrev, goNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-obsidian/85 backdrop-blur-xl transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Architectural Overlay */}
      <section
        ref={panelRef}
        id="evolution-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Builder evolution progression"
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-1.5rem)] max-w-4xl h-[90dvh] flex flex-col rounded-xl border border-border/80 bg-graphite/95 shadow-[0_0_0_1px_rgba(200,126,74,0.1),0_24px_90px_rgba(0,0,0,0.65)] max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:h-[92dvh] overflow-hidden"
      >
        {/* Top Accent Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-copper to-transparent shrink-0" />

        {/* 1. FIXED HEADER */}
        <header className="shrink-0 p-6 sm:p-8 pb-5 border-b border-border/60 bg-graphite/90 relative z-10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-copper/40 bg-copper/10 text-copper text-xs">
                  ◇
                </span>
                <span className="text-micro font-mono tracking-[0.22em] uppercase text-copper">
                  {evolutionMeta.heading}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-ivory tracking-tight">
                How I build has changed
              </h3>
              <p className="mt-1.5 text-sm sm:text-base text-stone leading-relaxed max-w-xl">
                {evolutionMeta.subtitle}
              </p>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={handleClose}
              aria-label="Close evolution panel"
              className="shrink-0 h-10 w-10 inline-flex items-center justify-center rounded-lg border border-border bg-slate/50 text-stone hover:text-ivory hover:border-copper/50 hover:bg-slate transition-all cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Progression Spine */}
          <div
            className="relative flex items-center justify-between gap-1 sm:gap-2 px-1 sm:px-4"
            role="tablist"
            aria-label="Evolution stages"
          >
            {/* Connecting line */}
            <div
              className="absolute left-6 right-6 sm:left-10 sm:right-10 top-1/2 -translate-y-1/2 h-px bg-border"
              aria-hidden="true"
            />
            <div
              className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 h-px bg-copper/70 transition-all duration-500 ease-out"
              style={{
                width: `calc(${(activeIndex / (total - 1)) * 100}% - ${activeIndex === 0 ? '0px' : '0px'})`,
                maxWidth: 'calc(100% - 3rem)'
              }}
              aria-hidden="true"
            />

            {evolutionStages.map((s, index) => {
              const isActive = index === activeIndex
              const isPast = index < activeIndex

              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Stage ${s.number}: ${s.title}`}
                  onClick={() => goTo(index)}
                  className={`relative z-10 flex flex-col items-center gap-1.5 group outline-none focus-visible:ring-2 focus-visible:ring-copper/50 rounded-full cursor-pointer`}
                >
                  <span
                    className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full border flex items-center justify-center text-[11px] font-mono font-semibold transition-all duration-300 ${
                      isActive
                        ? 'border-copper bg-copper text-obsidian shadow-[0_0_20px_rgba(200,126,74,0.35)] scale-110'
                        : isPast
                        ? 'border-copper/70 bg-copper/15 text-copper'
                        : 'border-border bg-graphite text-ash group-hover:border-copper/50 group-hover:text-stone'
                    }`}
                  >
                    {s.number}
                  </span>
                  <span
                    className={`hidden sm:block text-[9px] font-mono uppercase tracking-wider transition-colors ${
                      isActive ? 'text-copper' : isPast ? 'text-stone/70' : 'text-ash/50'
                    }`}
                  >
                    {s.title.split(' ')[0]}
                  </span>
                </button>
              )
            })}
          </div>
        </header>

        {/* 2. SCROLLABLE STAGE FOCUS */}
        <div className="flex-1 overflow-y-auto relative">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-copper/10 blur-3xl"
            aria-hidden="true"
          />

          <div
            key={stage.id}
            className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-12 py-8 sm:py-10 animate-in fade-in duration-300"
          >
            {/* Stage counter */}
            <div className="text-[11px] font-mono tracking-[0.25em] uppercase text-ash mb-5">
              {stage.number} / 0{total}
            </div>

            {/* Subtle topology glyph */}
            <div className="mb-6 opacity-80">
              <StageTopology stageIndex={activeIndex} />
            </div>

            {/* Title */}
            <h4 className="text-2xl sm:text-4xl font-semibold text-ivory tracking-tight mb-3 max-w-lg">
              {stage.title}
            </h4>

            {/* Headline */}
            <p className="text-base sm:text-lg text-copper font-medium mb-5 max-w-md">
              {stage.headline}
            </p>

            {/* Description */}
            <p className="text-sm sm:text-base text-stone leading-relaxed max-w-lg mb-7">
              {stage.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {stage.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-md border border-border/70 bg-obsidian/40 text-ash tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* System orientation detail */}
            <div className="w-full max-w-sm border border-border/50 rounded-lg bg-obsidian/30 px-4 py-3 text-left">
              <div className="flex items-center justify-between gap-3 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ash">
                  System State
                </span>
                <span className="text-[10px] font-mono text-copper/80">
                  {stage.number} / 0{total}
                </span>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-stone">
                {stage.orientation}
              </div>
            </div>
          </div>
        </div>

        {/* 3. FIXED FOOTER — Prev / Next + philosophy */}
        <footer className="shrink-0 px-5 sm:px-8 py-4 border-t border-border/60 bg-graphite/90">
          <div className="flex items-center justify-between gap-4 mb-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                activeIndex === 0
                  ? 'border-border/40 text-ash/40 cursor-not-allowed'
                  : 'border-border text-stone hover:text-ivory hover:border-copper/50 hover:bg-slate/40'
              }`}
            >
              <span aria-hidden="true">←</span>
              Previous
            </button>

            <div className="hidden sm:flex items-center gap-1.5" aria-hidden="true">
              {evolutionStages.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-5 bg-copper' : i < activeIndex ? 'w-2 bg-copper/40' : 'w-2 bg-border'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === total - 1}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                activeIndex === total - 1
                  ? 'border-border/40 text-ash/40 cursor-not-allowed'
                  : 'border-border text-stone hover:text-ivory hover:border-copper/50 hover:bg-slate/40'
              }`}
            >
              Next
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-ash">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-copper animate-pulse" />
              Continuous iteration
            </span>
            <span className="text-copper/70 uppercase tracking-wider">
              {evolutionMeta.direction}
            </span>
          </div>
        </footer>
      </section>
    </>
  )
}