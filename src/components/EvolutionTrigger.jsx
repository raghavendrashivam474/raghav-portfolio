import { useState, useRef, useCallback } from 'react'
import EvolutionPanel from './EvolutionPanel'

export default function EvolutionTrigger() {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef(null)

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    requestAnimationFrame(() => {
      triggerRef.current?.focus()
    })
  }, [])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        aria-label={isOpen ? "Close builder evolution" : "Open builder evolution"}
        aria-expanded={isOpen}
        aria-controls="evolution-panel"
        className="fixed top-5 right-5 z-50 p-3 group flex items-center gap-2"
      >
        <span
          className={`text-micro transition-opacity duration-200 ${
            isOpen
              ? 'text-oxide opacity-100'
              : 'text-stone opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
          }`}
        >
          evolution
        </span>
        <span
          className={`text-lg leading-none transition-colors duration-200 ${
            isOpen
              ? 'text-oxide'
              : 'text-stone group-hover:text-oxide group-focus-visible:text-oxide group-active:text-copper'
          }`}
          aria-hidden="true"
        >
          ◇
        </span>
      </button>

      <EvolutionPanel isOpen={isOpen} onClose={handleClose} />
    </>
  )
}
