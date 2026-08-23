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

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isOpen) {
      e.stopPropagation()
      onClose()
    }
  }, [isOpen, onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = original }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-obsidian/80 backdrop-blur-xl"
        onClick={onClose}
        aria-hidden="true"
      />

      <section
        ref={panelRef}
        id="more-work-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Other work and projects"
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-1.5rem)] max-w-4xl max-h-[88dvh] overflow-hidden rounded-xl border border-border/80 bg-graphite/95 shadow-[0_0_0_1px_rgba(200,126,74,0.08),0_24px_80px_rgba(0,0,0,0.55)] max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:max-h-[90dvh]"
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-copper to-transparent" />

        <div className="relative p-6 sm:p-8 overflow-y-auto max-h-[calc(88dvh-2px)]">
          <div
            className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-copper/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex items-start justify-between gap-4 mb-8">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-copper/40 bg-copper/10 text-copper text-sm font-mono">
                  +
                </span>
                <span className="text-micro font-mono tracking-[0.22em] uppercase text-copper">
                  Additional Work
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-ivory tracking-tight">
                Supporting Systems
              </h3>
              <p className="mt-2 text-sm sm:text-base text-stone leading-relaxed max-w-2xl">
                Previous architectures, experimental tools, and supporting builds.
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

          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherSystems.map((project, idx) => (
              <a
                key={project.id}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-slate/60 to-obsidian/40 p-5 text-left transition-all duration-200 hover:border-copper/45 hover:shadow-[0_0_0_1px_rgba(200,126,74,0.12)] focus:outline-none focus-visible:border-copper"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono text-ash tracking-widest">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full border border-border bg-graphite text-[10px] font-mono uppercase tracking-wider text-copper">
                        {project.status}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-ivory tracking-tight group-hover:text-oxide transition-colors inline-flex items-center gap-2">
                      <span>{project.title}</span>
                      <span
                        className="text-copper text-sm opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </h4>
                  </div>
                </div>

                <p className="text-sm text-stone leading-relaxed mb-4">
                  {project.tagline}
                </p>

                <div className="pt-3 border-t border-border/50">
                  <span className="text-[11px] font-mono text-ash/90 leading-relaxed">
                    {project.tech}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-7 pt-4 border-t border-border/50 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ash">
              Archive & experiments
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-copper/80">
              {otherSystems.length} systems
            </span>
          </div>
        </div>
      </section>
    </>
  )
}