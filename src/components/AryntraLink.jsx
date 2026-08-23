export default function AryntraLink() {
  return (
    <div className="mt-16 sm:mt-20 text-center">
      <a
        href="https://arynta.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit aryntra.com (opens in a new tab)"
        className="group inline-flex items-center gap-1.5 text-stone hover:text-ivory text-meta font-mono tracking-wider transition-colors duration-200"
      >
        <span>aryntra</span>
        <span
          className="text-stone group-hover:text-oxide transition-colors duration-200 inline-block transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
    </div>
  )
}
