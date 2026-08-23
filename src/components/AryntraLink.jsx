export default function AryntraLink() {
  return (
    <div className="text-center flex flex-col items-center">
      <a
        href="https://arynta.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit aryntra.com (opens in a new tab)"
        className="group inline-flex items-center gap-2.5 text-stone/90 hover:text-ivory text-base sm:text-lg font-mono tracking-widest uppercase transition-colors duration-200"
      >
        <span>aryntra</span>
        <span
          className="text-stone/60 group-hover:text-oxide transition-colors duration-200 inline-block transform group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
    </div>
  )
}
