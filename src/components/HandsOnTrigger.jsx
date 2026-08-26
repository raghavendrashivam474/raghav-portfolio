import HandsOnPanel from './HandsOnPanel'

export default function HandsOnTrigger({ isOpen, onToggle, onClose }) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Close hands-on tools" : "Open hands-on tools"}
        aria-expanded={isOpen}
        aria-controls="hands-on-panel"
        className={`fixed top-4 left-4 sm:top-6 sm:left-6 z-50 min-h-[44px] px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-md border transition-all duration-200 group flex items-center gap-2.5 cursor-pointer select-none shadow-md backdrop-blur-md outline-none focus-visible:ring-1 focus-visible:ring-copper ${
          isOpen
            ? 'border-copper bg-slate text-oxide shadow-[0_0_12px_rgba(200,126,74,0.25)] ring-1 ring-copper/40'
            : 'border-border/90 bg-graphite/95 hover:border-copper/70 hover:bg-slate/80 active:bg-slate text-stone hover:text-ivory'
        }`}
      >
        <span
          className={`text-base sm:text-lg leading-none transition-colors duration-200 ${
            isOpen ? 'text-oxide' : 'text-copper group-hover:text-oxide'
          }`}
          aria-hidden="true"
        >
          ◈
        </span>
        <span
          className={`text-xs font-mono tracking-[0.15em] uppercase transition-colors duration-200 ${
            isOpen ? 'text-oxide font-medium' : 'text-stone group-hover:text-ivory'
          }`}
        >
          hands-on
        </span>
      </button>

      <HandsOnPanel isOpen={isOpen} onClose={onClose} />
    </>
  )
}