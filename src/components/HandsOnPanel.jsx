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
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-1.5rem)] max-w-5xl h-[90dvh] flex flex-col rounded-xl border border-border/80 bg-graphite/95 shadow-[0_0_0_1px_rgba(200,126,74,0.1),0_24px_90px_rgba(0,0,0,0.65)] max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:h-[92dvh] overflow-hidden"
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

          {/* Typographic Stream Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 relative z-10">
            {currentStack.map((group) => {
              const hasActiveInGroup = group.items.some(i => i.name === activeTech)

              return (
                <div key={group.category} className="flex flex-col">
                  {/* Structural Category Header */}
                  <div className="flex items-center gap-3 border-b border-border/60 pb-2 mb-4">
                    <span className="text-[10px] font-mono text-copper/70">
                      {group.id} //
                    </span>
                    <h4 className="text-micro font-mono tracking-widest uppercase text-ash">
                      {group.category}
                    </h4>
                  </div>
                  
                  {/* Inline Typographic Nodes Separated by Dots */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    {group.items.map((item, idx) => {
                      const isSelected = activeTech === item.name

                      return (
                        <div key={item.name} className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setActiveTech(isSelected ? null : item.name)}
                            className={`text-[1.1rem] sm:text-[1.25rem] font-medium tracking-tight transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-copper/50 rounded-sm px-1.5 -mx-1.5 ${
                              isSelected
                                ? 'text-oxide bg-slate/70'
                                : 'text-ivory hover:text-copper hover:bg-slate/30'
                            }`}
                          >
                            {item.name}
                          </button>
                          
                          {/* Separator Dot (Hidden for the last item in the array) */}
                          {idx < group.items.length - 1 && (
                            <span className="text-border/80 select-none text-lg" aria-hidden="true">
                              ·
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Inset Evidence Drawer (Renders below the whole paragraph if a child is active) */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      hasActiveInGroup ? 'max-h-48 opacity-100 mt-5' : 'max-h-0 opacity-0 mt-0'
                    }`}
                  >
                    {group.items
                      .filter((i) => i.name === activeTech)
                      .map((activeItem) => (
                        <div key={activeItem.name + "-evidence"} className="pl-4 border-l-[1.5px] border-copper/50 bg-obsidian/30 py-3.5 pr-4 rounded-r-md shadow-inner">
                          <div className="flex items-center justify-between mb-3">
                            <span className="block text-[10px] font-mono uppercase tracking-widest text-ash">
                              Currently used in
                            </span>
                            <span className="text-[10px] font-mono text-copper/80 bg-copper/10 px-2 py-0.5 rounded border border-copper/30">
                              {activeItem.evidence.length} {activeItem.evidence.length === 1 ? 'repo' : 'repos'}
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {activeItem.evidence.map((repo) => (
                              <li key={repo} className="text-sm text-stone font-sans flex items-center gap-2.5">
                                <span className="w-1 h-1 rounded-full bg-border" aria-hidden="true" />
                                {repo}
                              </li>
                            ))}
                          </ul>
                        </div>
                    ))}
                  </div>

                </div>
              )
            })}
          </div>
        </div>

        {/* 3. FIXED FOOTER */}
        <footer className="shrink-0 px-6 sm:px-10 py-5 border-t border-border/60 bg-graphite/90 text-center sm:text-left">
          <p className="text-xs sm:text-sm font-mono tracking-wide text-ash flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>A working stack, not a list of everything I&apos;ve ever touched.</span>
            <span className="text-copper/60 text-[10px] uppercase tracking-widest">S10 Architecture</span>
          </p>
        </footer>
      </section>
    </>
  )
}