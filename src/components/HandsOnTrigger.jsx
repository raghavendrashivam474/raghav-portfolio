import { useState, useRef, useCallback } from 'react'
import HandsOnPanel from './HandsOnPanel'

export default function HandsOnTrigger() {
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
        aria-label={isOpen ? "Close hands-on tools" : "Open hands-on tools"}
        aria-expanded={isOpen}
        aria-controls="hands-on-panel"
        className="fixed top-5 left-5 z-50 p-3 group flex items-center gap-2"
      >
        <span
          className={`text-lg leading-none transition-colors duration-200 ${
            isOpen
              ? 'text-oxide'
              : 'text-stone group-hover:text-oxide group-focus-visible:text-oxide group-active:text-copper'
          }`}
          aria-hidden="true"
        >
          ◈
        </span>
        <span
          className={`text-micro transition-opacity duration-200 ${
            isOpen
              ? 'text-oxide opacity-100'
              : 'text-stone opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
          }`}
        >
          tools
        </span>
      </button>

      <HandsOnPanel isOpen={isOpen} onClose={handleClose} />
    </>
  )
}
