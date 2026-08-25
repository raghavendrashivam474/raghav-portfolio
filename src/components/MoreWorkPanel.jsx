import { useEffect, useRef, useCallback } from 'react'
import { otherSystems } from '../data/projects'

function formatIndex(index) {
  return String(index + 1).padStart(2, '0')
}

export default function MoreWorkPanel({ isOpen, onClose }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  const count = otherSystems.length
  const countLabel = String(count).padStart(2, '0')

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

      {/* Project Archive Overlay */}
      <section
        ref={panelRef}
        id="more-work-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Project archive beyond selected work"
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
                  +
                </span>
                <span className="text-micro font-mono tracking-[0.22em] uppercase text-copper">
                  Project Archive
                </span>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-ivory tracking-tight">
                    Beyond the selected work
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-stone leading-relaxed max-w-xl">
                    Other systems, experiments, utilities, and ideas I&apos;ve built.
                    The three featured projects come first — this is the broader body of work underneath.
                  </p>
                </div>

                <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ash">
                    Archive
                  </span>
                  <span className="text-sm font-mono text-copper">
                    {countLabel} SYSTEMS
                  </span>
                </div>
              </div>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close project archive"
              className="shrink-0 h-10 w-10 inline-flex items-center justify-center rounded-lg border border-border bg-slate/50 text-stone hover:text-ivory hover:border-copper/50 hover:bg-slate transition-all cursor-pointer"
            >
              ×
            </button>
          </div>
        </header>

        {/* 2. SCROLLABLE ARCHIVE BODY */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 relative">
          <div
            className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-copper/10 blur-3xl"
            aria-hidden="true"
          />

          {/* Atlas meta strip */}
          <div className="relative z-10 mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-3">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.18em] text-ash">
              <span className="w-1.5 h-1.5 rounded-full bg-copper" />
              <span>Work Atlas</span>
              <span className="text-border">·</span>
              <span>Evidence-backed</span>
            </div>
            <span className="sm:hidden text-[11px] font-mono text-copper">
              {countLabel} systems
            </span>
          </div>

          {/* 2-column archive grid filling up the space balanced */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 content-start">
            {otherSystems.map((project, idx) => (
              <a
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between min-h-[148px] sm:min-h-[160px] rounded-xl border border-border/70 bg-gradient-to-br from-slate/55 to-obsidian/45 p-5 text-left transition-all duration-200 hover:border-copper/45 hover:bg-slate/40 hover:shadow-[0_0_0_1px_rgba(200,126,74,0.12)] focus:outline-none focus-visible:border-copper focus-visible:ring-1 focus-visible:ring-copper/40"
              >
                {/* Top row: index + status */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono text-copper/80 tracking-wider">
                      {formatIndex(idx)} /
                    </span>
                    {project.kind && (
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ash border border-border/60 px-1.5 py-0.5 rounded">
                        {project.kind}
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-border bg-graphite text-[10px] font-mono uppercase tracking-wider text-copper shrink-0">
                    {project.status}
                  </span>
                </div>

                {/* Title + arrow */}
                <div className="mb-3">
                  <h4 className="text-lg sm:text-xl font-semibold text-ivory tracking-tight inline-flex items-center gap-2 group-hover:text-oxide transition-colors">
                    <span>{project.title}</span>
                    <span
                      className="text-copper text-sm opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </h4>
                  <p className="mt-1 text-sm text-stone leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                {/* Footer meta */}
                <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-ash truncate">
                    {project.tech}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-copper/70 group-hover:text-copper transition-colors shrink-0">
                    Open repo
                  </span>
                </div>

                {/* Hover copper edge accent */}
                <span
                  className="pointer-events-none absolute left-0 top-4 bottom-4 w-px bg-copper/0 group-hover:bg-copper/50 transition-colors"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        </div>

        {/* 3. FIXED FOOTER */}
        <footer className="shrink-0 px-6 sm:px-8 py-4 border-t border-border/60 bg-graphite/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-stone">
            <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
            <span>Archive · verified public systems</span>
          </div>
          <span className="text-copper/90 font-medium uppercase tracking-wider">
            {countLabel} public systems
          </span>
        </footer>
      </section>
    </>
  )
}