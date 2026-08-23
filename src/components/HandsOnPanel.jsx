import { useEffect, useRef, useCallback } from 'react'
import { handsOn } from '../data/handsOn'

export default function HandsOnPanel({ isOpen, onClose }) {
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
        id="hands-on-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Hands-on technologies"
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-1.5rem)] max-w-4xl max-h-[88dvh] overflow-hidden rounded-xl border border-border/80 bg-graphite/95 shadow-[0_0_0_1px_rgba(200,126,74,0.08),0_24px_80px_rgba(0,0,0,0.55)] max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:max-h-[90dvh]"
      >
        {/* Top copper accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-copper to-transparent" />

        <div className="relative p-6 sm:p-8 overflow-y-auto max-h-[calc(88dvh-2px)]">
          {/* Soft copper glow in corner */}
          <div
            className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-copper/10 blur-3xl"
            aria-hidden="true"
          />

          {/* Header */}
          <div className="relative flex items-start justify-between gap-4 mb-8">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-copper/40 bg-copper/10 text-copper text-sm">
                  ◈
                </span>
                <span className="text-micro font-mono tracking-[0.22em] uppercase text-copper">
                  Hands-on Layer
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-ivory tracking-tight">
                Technologies & Systems
              </h3>
              <p className="mt-2 text-sm sm:text-base text-stone leading-relaxed max-w-2xl">
                Tools and environments I&apos;ve actually built production software with.
                <span className="text-ash"> Not an expertise claim.</span>
              </p>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close hands-on panel"
              className="shrink-0 h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-slate/50 text-stone hover:text-ivory hover:border-copper/50 hover:bg-slate transition-all cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Category grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4">
            {handsOn.map((group, idx) => (
              <div
                key={group.category}
                className="group relative overflow-hidden rounded-xl border border-border/70 bg-gradient-to-br from-slate/60 to-obsidian/40 p-5 transition-all duration-200 hover:border-copper/40 hover:shadow-[0_0_0_1px_rgba(200,126,74,0.12)]"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-mono text-copper/80 tracking-widest">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h4 className="text-micro font-mono tracking-[0.18em] uppercase text-copper">
                      {group.category}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-ash">
                    {group.technologies.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2.5 py-1 rounded-md border border-border/80 bg-graphite/80 text-[12px] font-mono text-ivory/90 transition-colors group-hover:border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 pt-4 border-t border-border/50 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ash">
              Practical exposure
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-copper/80">
              {handsOn.reduce((n, g) => n + g.technologies.length, 0)} tools
            </span>
          </div>
        </div>
      </section>
    </>
  )
}