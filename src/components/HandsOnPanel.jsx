import { useEffect, useRef, useCallback, useState } from 'react'
import { handsOn } from '../data/handsOn'

export default function HandsOnPanel({ isOpen, onClose }) {
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeTech, setActiveTech] = useState(null)

  const handleClose = useCallback(() => {
    setActiveTech(null)
    setSelectedCategory('all')
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

  // Filter categories if user clicks category filter pill
  const visibleCategories =
    selectedCategory === 'all'
      ? handsOn
      : handsOn.filter((cat) => cat.id === selectedCategory)

  const totalTools = handsOn.reduce(
    (acc, cat) => acc + cat.technologies.length,
    0
  )

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-obsidian/85 backdrop-blur-xl transition-opacity duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Full-Height Exploration Overlay Frame */}
      <section
        ref={panelRef}
        id="hands-on-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Hands-on technology exploration layer"
        className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-1.5rem)] max-w-5xl h-[90dvh] flex flex-col rounded-xl border border-border/80 bg-graphite/95 shadow-[0_0_0_1px_rgba(200,126,74,0.1),0_24px_90px_rgba(0,0,0,0.65)] max-sm:bottom-0 max-sm:top-auto max-sm:left-0 max-sm:translate-x-0 max-sm:translate-y-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-t-2xl max-sm:rounded-b-none max-sm:h-[92dvh] overflow-hidden"
      >
        {/* Top Accent Line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-copper to-transparent shrink-0" />

        {/* 1. FIXED HEADER */}
        <header className="shrink-0 p-6 sm:p-8 pb-5 border-b border-border/60 bg-graphite/90 relative z-10">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-copper/40 bg-copper/10 text-copper text-xs">
                  ◈
                </span>
                <span className="text-micro font-mono tracking-[0.22em] uppercase text-copper">
                  Hands-on Layer
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-ivory tracking-tight">
                Technologies & Systems
              </h3>
              <p className="mt-1 text-sm sm:text-base text-stone leading-relaxed">
                Tools and frameworks I&apos;ve built with in actual repositories.{' '}
                <span className="text-ash font-mono">(Evidence-backed · Not an expertise claim)</span>
              </p>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={handleClose}
              aria-label="Close hands-on panel"
              className="shrink-0 h-9 w-9 inline-flex items-center justify-center rounded-lg border border-border bg-slate/50 text-stone hover:text-ivory hover:border-copper/50 hover:bg-slate transition-all cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Category Quick Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none text-xs font-mono">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-md border transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'border-copper bg-copper/15 text-copper font-medium'
                  : 'border-border/80 bg-slate/40 text-stone hover:text-ivory hover:border-border'
              }`}
            >
              All ({totalTools})
            </button>
            {handsOn.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-md border transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'border-copper bg-copper/15 text-copper font-medium'
                    : 'border-border/80 bg-slate/40 text-stone hover:text-ivory hover:border-border'
                }`}
              >
                {cat.category} ({cat.technologies.length})
              </button>
            ))}
          </div>
        </header>

        {/* 2. SCROLLABLE CONTENT BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 relative">
          {/* Background Ambient Glow */}
          <div
            className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-copper/10 blur-3xl"
            aria-hidden="true"
          />

          {visibleCategories.map((group, idx) => (
            <div
              key={group.id}
              className="space-y-4 p-5 sm:p-6 rounded-xl border border-border/70 bg-gradient-to-br from-slate/50 to-obsidian/40 relative overflow-hidden"
            >
              {/* Category Header */}
              <div className="flex items-start justify-between gap-4 border-b border-border/40 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-copper/80">
                      0{idx + 1} /
                    </span>
                    <h4 className="text-micro font-mono tracking-[0.2em] uppercase text-copper font-semibold">
                      {group.category}
                    </h4>
                  </div>
                  <p className="text-xs text-stone">{group.description}</p>
                </div>
                <span className="text-xs font-mono text-ash/80 px-2 py-0.5 rounded bg-graphite border border-border">
                  {group.technologies.length} items
                </span>
              </div>

              {/* Technologies Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                {group.technologies.map((item) => {
                  const isSelected = activeTech === item.name

                  return (
                    <div
                      key={item.name}
                      onClick={() =>
                        setActiveTech(isSelected ? null : item.name)
                      }
                      className={`p-3.5 rounded-lg border transition-all cursor-pointer group flex flex-col justify-between ${
                        isSelected
                          ? 'border-copper bg-slate text-ivory ring-1 ring-copper/30 shadow-lg'
                          : 'border-border/80 bg-graphite/80 hover:border-copper/50 hover:bg-slate/70 text-stone hover:text-ivory'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-sm font-semibold font-mono text-ivory group-hover:text-oxide transition-colors">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-mono text-copper/80 bg-copper/10 px-1.5 py-0.5 rounded border border-copper/30">
                            {item.evidence.length} {item.evidence.length === 1 ? 'repo' : 'repos'}
                          </span>
                        </div>
                        <p className="text-xs text-stone/90 line-clamp-2 leading-relaxed font-sans">
                          {item.detail}
                        </p>
                      </div>

                      {/* Evidence Repository Badges */}
                      <div className="mt-3 pt-2 border-t border-border/40 flex flex-wrap gap-1">
                        {item.evidence.map((repo) => (
                          <span
                            key={repo}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-obsidian/60 text-ash group-hover:text-stone border border-border/50"
                          >
                            {repo}
                          </span>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 3. FIXED FOOTER */}
        <footer className="shrink-0 px-6 py-4 border-t border-border/60 bg-graphite/90 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-stone">
            <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
            <span>Click any technology to inspect repository evidence</span>
          </div>
          <span className="text-copper/90 font-medium">
            {totalTools} Verified Capabilities
          </span>
        </footer>
      </section>
    </>
  )
}