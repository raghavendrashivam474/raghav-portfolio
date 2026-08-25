import { useEffect, useRef, useCallback, useState } from 'react'
import { currentStack } from '../data/handsOn'

export default function HandsOnPanel({ isOpen, onClose }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  
  // Tracks which technology is currently expanded to show evidence
  const [activeTech, setActiveTech] = useState(null)

  const handleClose = useCallback(() => {
    setActiveTech(null)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      const timer = requestAnimationFrame(() => closeBtnRef.current?.focus())
      return () => cancelAnimationFrame(timer)
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) {
        e.stopPropagation()
        if (activeTech) {
          setActiveTech(null)
        } else {
          handleClose()
        }
      }
    },
    [isOpen, activeTech, handleClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-obsidian/85 backdrop-blur-xl transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Spacious Architectural Overlay Frame */}
      <section
        ref={panelRef}
        id="hands-on-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Hands-on current working stack"
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-1.5rem)] max-w-[1000px] h-[90dvh] flex flex-col rounded-xl border border-border/80 bg-graphite/95 shadow-[0_0_0_1px_rgba(200,126,74,0.1),0_24px_90px_rgba(0,0,0,0.65)] max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:h-[92dvh] overflow-hidden"
      >
        {/* Top Accent Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-copper to-transparent shrink-0" />

        {/* 1. FIXED HEADER */}
        <header className="shrink-0 p-6 sm:p-10 pb-6 border-b border-border/60 bg-graphite/90 relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-copper/40 bg-copper/10 text-copper text-xs font-mono">
                  ◈
                </span>
                <span className="text-micro font-mono tracking-[0.22em] uppercase text-copper">
                  Hands-on
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-semibold text-ivory tracking-tight mb-2">
                What I&apos;m building with
              </h3>
              <p className="text-sm sm:text-base text-stone leading-relaxed">
                My current working stack.
              </p>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={handleClose}
              aria-label="Close hands-on panel"
              className="shrink-0 h-10 w-10 inline-flex items-center justify-center rounded-lg border border-border bg-slate/50 text-stone hover:text-ivory hover:border-copper/50 hover:bg-slate transition-all cursor-pointer"
            >
              ×
            </button>
          </div>
        </header>

        {/* 2. SCROLLABLE CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 relative">
          {/* Ambient Glow */}
          <div
            className="pointer-events-none absolute -top-32 -right-20 h-72 w-72 rounded-full bg-copper/10 blur-[100px]"
            aria-hidden="true"
          />

          {/* Typographic Node Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 relative z-10">
            {currentStack.map((group) => (
              <div key={group.category} className="space-y-5">
                <h4 className="text-micro font-mono tracking-[0.2em] uppercase text-ash border-b border-border/40 pb-2">
                  {group.category}
                </h4>
                
                <ul className="space-y-4">
                  {group.items.map((item) => {
                    const isSelected = activeTech === item.name

                    return (
                      <li key={item.name} className="flex flex-col">
                        <button
                          type="button"
                          onClick={() => setActiveTech(isSelected ? null : item.name)}
                          className={`text-left text-lg sm:text-xl font-medium tracking-tight transition-all duration-200 outline-none focus-visible:text-oxide ${
                            isSelected
                              ? 'text-oxide'
                              : 'text-ivory hover:text-copper'
                          }`}
                        >
                          {item.name}
                        </button>

                        {/* Expandable Evidence Detail */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isSelected ? 'max-h-48 opacity-100 mt-3' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="pl-3 border-l-[1.5px] border-copper/40 py-0.5 flex flex-col gap-1.5">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-ash">
                              Currently used in
                            </span>
                            {item.evidence.map((repo) => (
                              <span key={repo} className="text-sm text-stone font-sans">
                                {repo}
                              </span>
                            ))}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 3. FIXED FOOTER */}
        <footer className="shrink-0 px-6 sm:px-10 py-5 border-t border-border/60 bg-graphite/90 text-center sm:text-left">
          <p className="text-xs sm:text-sm font-mono tracking-wide text-ash">
            A working stack, not a list of everything I&apos;ve ever touched.
          </p>
        </footer>
      </section>
    </>
  )
}