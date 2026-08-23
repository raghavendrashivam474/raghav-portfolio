import { useEffect, useRef, useCallback } from 'react'
import { otherSystems } from '../data/projects'

export default function MoreWorkPanel({ isOpen, onClose }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)

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
        onClose()
      }
    },
    [isOpen, onClose]
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
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Full-Height Exploration Overlay Frame */}
      <section
        ref={panelRef}
        id="more-work-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Other work and projects"
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-1.5rem)] max-w-5xl h-[90dvh] flex flex-col rounded-xl border border-border/80 bg-graphite/95 shadow-[0_0_0_1px_rgba(200,126,74,0.1),0_24px_90px_rgba(0,0,0,0.65)] max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:h-[92dvh] overflow-hidden"
      >
        {/* Top Accent Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-copper to-transparent shrink-0" />

        {/* 1. FIXED HEADER */}
        <header className="shrink-0 p-6 sm:p-8 pb-5 border-b border-border/60 bg-graphite/90 relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-copper/40 bg-copper/10 text-copper text-xs font-mono">
                  +
                </span>
                <span className="text-micro font-mono tracking-[0.22em] uppercase text-copper">
                  Additional Work
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-ivory tracking-tight">
                Supporting & Experimental Systems
              </h3>
              <p className="mt-1 text-sm sm:text-base text-stone leading-relaxed">
                Previous architectures, local-first tools, and technical exploratory builds.
              </p>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close other work panel"
              className="shrink-0 h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-slate/50 text-stone hover:text-ivory hover:border-copper/50 hover:bg-slate transition-all cursor-pointer"
            >
              ×
            </button>
          </div>
        </header>

        {/* 2. SCROLLABLE CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 relative">
          {/* Ambient Glow */}
          <div
            className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-copper/10 blur-3xl"
            aria-hidden="true"
          />

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {otherSystems.map((project, idx) => (
              <a
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-slate/60 to-obsidian/40 p-5 sm:p-6 text-left transition-all duration-200 hover:border-copper/45 hover:shadow-[0_0_0_1px_rgba(200,126,74,0.12)] focus:outline-none focus-visible:border-copper flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-mono text-copper/80">
                      0{idx + 1} /
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full border border-border bg-graphite text-[10px] font-mono uppercase tracking-wider text-copper">
                      {project.status}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-semibold text-ivory tracking-tight group-hover:text-oxide transition-colors inline-flex items-center gap-2 mb-2">
                    <span>{project.title}</span>
                    <span
                      className="text-copper text-base opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </h4>

                  <p className="text-sm text-stone/90 leading-relaxed mb-4">
                    {project.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs font-mono">
                  <span className="text-ash/90">{project.tech}</span>
                  <span className="text-copper/80 group-hover:text-copper transition-colors">
                    Repository ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 3. FIXED FOOTER */}
        <footer className="shrink-0 px-6 py-4 border-t border-border/60 bg-graphite/90 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-stone">
            <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
            <span>Archive & Supporting Codebases</span>
          </div>
          <span className="text-copper/90 font-medium">
            {otherSystems.length} Public Systems
          </span>
        </footer>
      </section>
    </>
  )
}