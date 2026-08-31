import { useEffect, useRef, useCallback, useState } from 'react'
import { researchSystems, researchMeta } from '../data/research'

export default function ResearchPanel({ isOpen, onClose }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  const [activeResearchId, setActiveResearchId] = useState('synapse')

  const handleClose = useCallback(() => {
    setActiveResearchId('synapse')
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
      if (e.key === 'Escape' && isOpen) {
        e.stopPropagation()
        handleClose()
      }
    },
    [isOpen, handleClose]
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

      {/* Spacious Architectural Overlay Frame */}
      <section
        ref={panelRef}
        id="research-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Active Research Lab"
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-1.5rem)] max-w-5xl h-[90dvh] flex flex-col rounded-xl border border-border/80 bg-graphite/95 shadow-[0_0_0_1px_rgba(200,126,74,0.1),0_24px_90px_rgba(0,0,0,0.65)] max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:h-[92dvh] overflow-hidden"
      >
        {/* Top Accent Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-copper to-transparent shrink-0" />

        {/* 1. FIXED HEADER */}
        <header className="shrink-0 p-6 sm:p-8 pb-5 border-b border-border/60 bg-graphite/90 relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-copper/40 bg-copper/10 text-copper text-xs font-mono">
                  ◈
                </span>
                <span className="text-micro font-mono tracking-[0.22em] uppercase text-copper">
                  {researchMeta.heading}
                </span>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-ivory tracking-tight">
                    Active System Investigations
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-stone leading-relaxed max-w-xl">
                    {researchMeta.framing} What I am exploring before conclusions are finalized.
                  </p>
                </div>

                <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ash">
                    Status
                  </span>
                  <span className="text-sm font-mono text-copper">
                    {researchMeta.direction}
                  </span>
                </div>
              </div>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={handleClose}
              aria-label="Close research lab panel"
              className="shrink-0 h-10 w-10 inline-flex items-center justify-center rounded-lg border border-border bg-slate/50 text-stone hover:text-ivory hover:border-copper/50 hover:bg-slate transition-all cursor-pointer"
            >
              ×
            </button>
          </div>
        </header>

        {/* 2. SCROLLABLE CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 relative">
          {/* Ambient Glow */}
          <div
            className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-copper/10 blur-3xl"
            aria-hidden="true"
          />

          {/* Research Meta Strip */}
          <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-ash">
              <span className="w-1.5 h-1.5 rounded-full bg-copper animate-ping" />
              <span>Exploratory Systems</span>
              <span className="text-border">·</span>
              <span>Non-Commercial Layer</span>
            </div>
            <span className="text-[11px] font-mono text-copper">
              03 Active
            </span>
          </div>

          {/* Research Systems Grid */}
          <div className="relative z-10 grid grid-cols-1 gap-4 sm:gap-6">
            {researchSystems.map((system) => {
              const isSelected = activeResearchId === system.id

              return (
                <a href={system.link || "#"} target="_blank" rel="noopener noreferrer"
                  key={system.id}
                  onClick={() => setActiveResearchId(system.id)}
                  className={`group relative overflow-hidden rounded-xl border p-5 sm:p-6 text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-copper/80 bg-gradient-to-br from-slate/80 to-obsidian/60 shadow-[0_0_0_1px_rgba(200,126,74,0.15)]'
                      : 'border-border/70 bg-gradient-to-br from-slate/50 to-obsidian/30 hover:border-copper/40 hover:bg-slate/40'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-copper/90 font-semibold tracking-wider">
                        {system.number} /
                      </span>
                      <h4 className="text-lg sm:text-2xl font-semibold text-ivory tracking-tight group-hover:text-oxide transition-colors flex items-center gap-2">
                        {system.name}
                        {system.link && (
                          <span className="text-[0.9em] font-sans text-copper/60 group-hover:text-copper transition-all duration-300 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                            ↗
                          </span>
                        )}
                      </h4>
                    </div>

                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-copper/30 bg-copper/10 text-[10px] font-mono uppercase tracking-wider text-copper">
                      {system.status}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base font-medium text-copper/90 mb-2">
                    {system.tagline}
                  </p>

                  <p className="text-sm text-stone leading-relaxed max-w-3xl mb-4 font-sans">
                    {system.description}
                  </p>

                  {/* Research Focus Tags */}
                  <div className="pt-3 border-t border-border/50 flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ash mr-1">
                      Focus:
                    </span>
                    {system.focus.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-[11px] font-mono px-2.5 py-0.5 rounded bg-obsidian/60 text-stone border border-border/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover Left Accent Indicator */}
                  <span
                    className={`pointer-events-none absolute left-0 top-3 bottom-3 w-[2px] transition-all duration-200 ${
                      isSelected ? 'bg-copper' : 'bg-copper/0 group-hover:bg-copper/40'
                    }`}
                    aria-hidden="true" />`n                </a>
              )
            })}
          </div>
        </div>

        {/* 3. FIXED FOOTER */}
        <footer className="shrink-0 px-6 sm:px-8 py-4 border-t border-border/60 bg-graphite/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-stone">
            <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
            <span>{researchMeta.subtitle}</span>
          </div>
          <span className="text-copper/90 font-medium uppercase tracking-wider">
            {researchMeta.footerNote}
          </span>
        </footer>
      </section>
    </>
  )
}
