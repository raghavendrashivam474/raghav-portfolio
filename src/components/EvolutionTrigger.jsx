import EvolutionPanel from './EvolutionPanel'

export default function EvolutionTrigger({ isOpen, onToggle, onClose }) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        aria-label={isOpen ? "Close builder evolution" : "Open builder evolution"}
        aria-expanded={isOpen}
        aria-controls="evolution-panel"
        className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 px-3 py-1.5 rounded-sm border transition-all duration-200 group flex items-center gap-2 cursor-pointer select-none ${
          isOpen
            ? 'border-copper bg-graphite text-oxide shadow-sm'
            : 'border-border bg-graphite/90 hover:border-copper hover:bg-slate text-stone hover:text-ivory'
        }`}
      >
        <span
          className={`text-xs font-mono tracking-wider transition-colors duration-200 ${
            isOpen ? 'text-oxide font-medium' : 'text-stone group-hover:text-ivory'
          }`}
        >
          evolution
        </span>
        <span
          className={`text-base sm:text-lg leading-none transition-colors duration-200 ${
            isOpen ? 'text-oxide' : 'text-copper group-hover:text-oxide'
          }`}
          aria-hidden="true"
        >
          ◇
        </span>
      </button>

      <EvolutionPanel isOpen={isOpen} onClose={onClose} />
    </>
  )
}