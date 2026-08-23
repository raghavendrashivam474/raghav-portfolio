export default function AryntraLink() {
  return (
    <div className="text-center flex flex-col items-center">
      <a
        href="https://aryntra.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit aryntra.com (opens in a new tab)"
        className="group inline-flex items-center gap-2.5 text-stone hover:text-ivory text-base sm:text-lg font-mono tracking-widest uppercase transition-colors duration-200 focus:outline-none focus-visible:text-oxide"
      >
        <span>aryntra</span>
        <span
          className="text-copper group-hover:text-oxide transition-colors duration-200 inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
    </div>
  )
}