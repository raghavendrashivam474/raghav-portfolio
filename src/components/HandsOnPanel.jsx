import { useEffect, useRef, useCallback } from 'react'
import { handsOn } from '../data/handsOn'

export default function HandsOnPanel({ isOpen, onClose }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)

  // Focus management: when panel opens, focus the close button
  useEffect(() => {
    if (isOpen) {
      const timer = requestAnimationFrame(() => {
        closeBtnRef.current?.focus()
      })
      return () => cancelAnimationFrame(timer)
    }
  }, [isOpen])

  // Escape key closes panel
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

  // Body scroll lock on mobile when open
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-obsidian/60 transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Panel on desktop, Bottom/Modal sheet on mobile */}
      <section
        ref={panelRef}
        id="hands-on-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Hands-on technologies"
        className="fixed z-50 top-16 left-5 max-w-[360px] w-[calc(100vw-2.5rem)] sm:w-[360px] bg-graphite border border-ash/60 p-6 sm:p-7 shadow-2xl rounded-sm max-h-[calc(100dvh-5rem)] overflow-y-auto max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-md max-sm:max-h-[80dvh] max-sm:border-x-0 max-sm:border-b-0"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <span className="text-micro text-stone tracking-widest uppercase block mb-1">
              HANDS-ON
            </span>
            <p className="text-meta text-stone leading-snug">
              Things I&apos;ve actually built with.
              <br />
              <span className="text-stone/70">Not an expertise claim.</span>
            </p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close hands-on panel"
            className="text-stone hover:text-ivory focus-visible:text-oxide p-1.5 leading-none transition-colors text-lg"
          >
            ×
          </button>
        </div>

        {/* Categories & Technologies */}
        <div className="space-y-4">
          {handsOn.map((group) => (
            <div key={group.category} className="space-y-1">
              <span className="text-micro text-oxide font-medium tracking-wider uppercase block">
                {group.category}
              </span>
              <p className="text-meta text-ivory/90 leading-relaxed font-sans">
                {group.technologies.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
