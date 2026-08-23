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
        className="fixed top-5 right-5 z-50 p-2 group flex items-center gap-2 cursor-pointer"
      >
        <span
          className={`text-xs font-mono tracking-wider transition-opacity duration-200 ${
            isOpen
              ? 'text-oxide opacity-100'
              : 'text-stone opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100'
          }`}
        >
          evolution
        </span>
        <span
          className={`text-2xl sm:text-3xl leading-none transition-all duration-200 ${
            isOpen
              ? 'text-oxide scale-110'
              : 'text-stone group-hover:text-oxide group-focus-visible:text-oxide group-active:text-copper group-hover:scale-105'
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
