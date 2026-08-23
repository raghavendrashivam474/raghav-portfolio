import { useEffect, useRef, useCallback } from 'react'
import { evolutionStages, evolutionMeta } from '../data/evolution'

export default function EvolutionPanel({ isOpen, onClose }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      const timer = requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
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
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 z-40 bg-obsidian/70 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Evolution Floating Panel */}
      <section
        ref={panelRef}
        id="evolution-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Builder evolution stages"
        className="fixed z-50 top-16 right-5 max-w-[360px] w-[calc(100vw-2.5rem)] sm:w-[360px] bg-graphite/95 backdrop-blur-xl border border-ash/60 p-6 sm:p-7 shadow-2xl rounded-sm max-h-[calc(100dvh-5rem)] overflow-y-auto max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-md max-sm:max-h-[80dvh] max-sm:border-x-0 max-sm:border-b-0 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <span className="text-micro text-oxide font-medium tracking-widest uppercase block mb-1">
              {evolutionMeta.heading}
            </span>
            <p className="text-meta text-stone leading-snug">
              {evolutionMeta.framing}
            </p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close evolution panel"
            className="text-stone hover:text-ivory focus-visible:text-oxide p-1.5 leading-none transition-colors text-lg cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Progression Stages */}
        <div className="space-y-4">
          {evolutionStages.map((stage, index) => (
            <div key={stage.id} className="group/stage flex flex-col items-center">
              <div className="w-full text-left">
                <span className="text-meta font-semibold text-ivory block mb-0.5">
                  {stage.title}
                </span>
                <span className="text-meta text-stone/85 leading-relaxed block font-sans">
                  {stage.description}
                </span>
              </div>
              {index < evolutionStages.length - 1 && (
                <div className="text-stone/40 my-3 text-[11px] select-none font-mono" aria-hidden="true">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-ash/30 flex justify-end">
          <span className="text-[10px] tracking-wider font-mono text-stone/50 uppercase">
            {evolutionMeta.direction}
          </span>
        </div>
      </section>
    </>
  )
}
