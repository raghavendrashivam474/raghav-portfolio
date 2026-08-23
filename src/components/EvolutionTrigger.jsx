export default function EvolutionTrigger() {
  return (
    <button
      type="button"
      aria-label="Open builder evolution"
      className="fixed top-5 right-5 z-50 p-3 group flex items-center gap-2"
    >
      <span className="text-micro text-stone opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
        evolution
      </span>
      <span
        className="text-stone text-lg leading-none transition-colors duration-200 group-hover:text-oxide group-focus-visible:text-oxide group-active:text-copper"
        aria-hidden="true"
      >
        ◇
      </span>
    </button>
  )
}
