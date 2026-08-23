import { useEffect, useRef, useCallback } from 'react'
import { otherSystems } from '../data/projects'

export default function MoreWorkPanel({ isOpen, onClose }) {
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-obsidian/75 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal */}
      <section
        ref={panelRef}
        id="more-work-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Other work and projects"
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[460px] w-[calc(100vw-2rem)] sm:w-[460px] bg-graphite border border-ash/70 p-6 sm:p-7 shadow-2xl rounded-sm max-h-[80dvh] overflow-y-auto max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-md max-sm:max-h-[85dvh] max-sm:border-x-0 max-sm:border-b-0"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-ash/40">
          <div>
            <span className="text-micro text-oxide font-medium tracking-widest uppercase block mb-1">
              OTHER WORK
            </span>
            <p className="text-meta text-stone/90 leading-snug">
              Previous, experimental, and supporting systems.
            </p>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close other work panel"
            className="text-stone hover:text-ivory focus-visible:text-oxide p-1 leading-none transition-colors text-lg cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Project List */}
        <div className="divide-y divide-ash/30">
          {otherSystems.map((project) => (
            <div key={project.id} className="py-4 first:pt-0 last:pb-0 text-left">
              <div className="flex items-baseline justify-between gap-3 mb-1">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-meta font-semibold text-ivory hover:text-oxide focus-visible:text-oxide transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>{project.title}</span>
                  <span
                    className="text-stone/60 group-hover:text-oxide text-[12px] transition-transform duration-150 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
              <p className="text-[11px] font-mono text-stone/50">
                {project.tech}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
