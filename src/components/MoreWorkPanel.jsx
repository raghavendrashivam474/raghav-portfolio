import { useEffect, useRef, useCallback } from 'react'
import { otherSystems } from '../data/projects'

export default function MoreWorkPanel({ isOpen, onClose }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)

  // Focus management: focus close button when panel opens
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

  // Lock body scroll when open
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

      {/* More Work Dialog */}
      <section
        ref={panelRef}
        id="more-work-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Other work and projects"
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[440px] w-[calc(100vw-2.5rem)] sm:w-[440px] bg-graphite border border-ash/60 p-6 sm:p-7 shadow-2xl rounded-sm max-h-[calc(100dvh-5rem)] overflow-y-auto max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-md max-sm:max-h-[85dvh] max-sm:border-x-0 max-sm:border-b-0"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <span className="text-micro text-oxide font-medium tracking-widest uppercase block mb-1">
              OTHER WORK
            </span>
            <p className="text-meta text-stone leading-snug">
              Previous, experimental, and supporting systems.
            </p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close other work panel"
            className="text-stone hover:text-ivory focus-visible:text-oxide p-1.5 leading-none transition-colors text-lg"
          >
            ×
          </button>
        </div>

        {/* Project List */}
        <div className="divide-y divide-ash/30">
          {otherSystems.map((project) => (
            <div key={project.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-meta font-semibold text-ivory hover:text-oxide focus-visible:text-oxide transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>{project.title}</span>
                  <span
                    className="text-stone group-hover:text-oxide text-[12px] transition-transform duration-150 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone/60">
                  {project.status}
                </span>
              </div>
              <p className="text-meta text-stone/85 leading-relaxed font-sans mb-1.5">
                {project.tagline}
              </p>
              <p className="text-[11px] font-mono text-stone/60">
                {project.tech}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
