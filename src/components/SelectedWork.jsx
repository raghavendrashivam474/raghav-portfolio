import { useState, useRef, useCallback } from 'react'
import { activeMissions } from '../data/projects'
import MoreWorkPanel from './MoreWorkPanel'

export default function SelectedWork() {
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const triggerRef = useRef(null)

  const handleOpen = useCallback(() => {
    setIsMoreOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsMoreOpen(false)
    requestAnimationFrame(() => {
      triggerRef.current?.focus()
    })
  }, [])

  return (
    <section className="content-frame py-section">
      <h2 className="text-micro text-center mb-block">
        Selected Work
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {activeMissions.map((project) => (
          <a
            key={project.id}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet text-title interactive"
          >
            {project.title.replace('Aryntra ', '')}
          </a>
        ))}
      </div>

      <div className="mt-5 text-center">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleOpen}
          aria-haspopup="dialog"
          aria-expanded={isMoreOpen}
          aria-controls="more-work-panel"
          className="text-micro text-stone/70 hover:text-oxide focus-visible:text-oxide transition-colors duration-200 tracking-wider inline-flex items-center gap-1 cursor-pointer"
        >
          <span>+ more work</span>
        </button>
      </div>

      <MoreWorkPanel isOpen={isMoreOpen} onClose={handleClose} />
    </section>
  )
}
