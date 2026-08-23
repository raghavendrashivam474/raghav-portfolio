import { useEffect, useRef, useCallback } from 'react'
import { evolutionStages, evolutionMeta } from '../data/evolution'

export default function EvolutionPanel({ isOpen, onClose }) {
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
        id="evolution-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Builder evolution stages"
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-1.5rem)] max-w-3xl max-h-[88dvh] overflow-hidden rounded-xl border border-border/80 bg-graphite/95 shadow-[0_0_0_1px_rgba(200,126,74,0.08),0_24px_80px_rgba(0,0,0,0.55)] max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:max-h-[90dvh]"
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-copper to-transparent" />

        <div className="relative p-6 sm:p-8 overflow-y-auto max-h-[calc(88dvh-2px)]">
          <div
            className="pointer-events-none absolute -top-20 -left-10 h-52 w-52 rounded-full bg-copper/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative flex items-start justify-between gap-4 mb-8">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-copper/40 bg-copper/10 text-copper text-sm">
                  ◇
                </span>
                <span className="text-micro font-mono tracking-[0.22em] uppercase text-copper">
                  {evolutionMeta.heading}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-ivory tracking-tight">
                Builder Progression
              </h3>
              <p className="mt-2 text-sm sm:text-base text-stone leading-relaxed max-w-xl">
                {evolutionMeta.framing}
              </p>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              aria-label="Close evolution panel"
              className="shrink-0 h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-slate/50 text-stone hover:text-ivory hover:border-copper/50 hover:bg-slate transition-all cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Vertical timeline */}
          <div className="relative pl-2 sm:pl-3">
            <div
              className="absolute left-[21px] sm:left-[25px] top-3 bottom-3 w-px bg-gradient-to-b from-copper/70 via-border to-copper/20"
              aria-hidden="true"
            />

            <div className="space-y-3">
              {evolutionStages.map((stage, index) => (
                <div key={stage.id} className="relative flex gap-4 sm:gap-5">
                  <div className="relative z-10 shrink-0 mt-4">
                    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-copper/50 bg-graphite flex items-center justify-center shadow-[0_0_20px_rgba(200,126,74,0.15)]">
                      <span className="text-[11px] font-mono text-copper">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 rounded-xl border border-border/70 bg-gradient-to-br from-slate/55 to-obsidian/35 p-4 sm:p-5 transition-all duration-200 hover:border-copper/40">
                    <h4 className="text-base sm:text-lg font-semibold text-ivory tracking-tight mb-1.5">
                      {stage.title}
                    </h4>
                    <p className="text-sm text-stone leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 pt-4 border-t border-border/50 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ash">
              Mental models
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-copper/80">
              {evolutionMeta.direction}
            </span>
          </div>
        </div>
      </section>
    </>
  )
}