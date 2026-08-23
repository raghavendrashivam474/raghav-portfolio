export default function HandsOnTrigger() {
  return (
    <button
      type="button"
      aria-label="Open hands-on tools"
      className="fixed top-5 left-5 z-50 p-3 group flex items-center gap-2"
    >
      <span
        className="text-stone text-lg leading-none transition-colors duration-200 group-hover:text-oxide group-focus-visible:text-oxide group-active:text-copper"
        aria-hidden="true"
      >
        ◈
      </span>
      <span className="text-micro text-stone opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200">
        tools
      </span>
    </button>
  )
}
