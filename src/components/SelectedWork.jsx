import { activeMissions } from '../data/projects'

export default function SelectedWork({ onOpenMoreWork, onOpenResearch }) {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center">
      <h2 className="text-micro text-stone tracking-[0.25em] uppercase mb-6 select-none font-mono text-center font-medium">
        Selected Work
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-4 w-full">
        {activeMissions.map((project, idx) => {
          const cleanTitle = project.title.replace('Aryntra ', '')

          return (
            <div key={project.id} className="inline-flex items-center gap-6 sm:gap-10">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} repository`}
                className="group inline-flex items-center gap-1.5 p-2 -m-2 sm:p-2.5 sm:-m-2.5 rounded-md text-xl sm:text-2xl font-medium text-ivory hover:text-oxide focus:outline-none focus-visible:ring-1 focus-visible:ring-copper/60 focus-visible:text-oxide transition-all duration-200 tracking-tight drop-shadow-sm hover:bg-slate/30"
              >
                <span>{cleanTitle}</span>
                <span
                  className="text-copper text-sm sm:text-base opacity-70 group-hover:opacity-100 group-hover:text-oxide transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
              {idx < activeMissions.length - 1 && (
                <span className="text-stone/60 font-mono text-sm select-none" aria-hidden="true">
                  ·
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Dual Exploration Triggers */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center">
        <button
          type="button"
          onClick={onOpenMoreWork}
          aria-haspopup="dialog"
          aria-controls="more-work-panel"
          className="group inline-flex items-center gap-1.5 min-h-[38px] px-4 py-2 rounded-md border border-border bg-graphite/90 hover:border-copper hover:bg-slate text-micro font-mono text-stone hover:text-ivory focus:outline-none focus-visible:ring-1 focus-visible:ring-copper focus-visible:text-oxide transition-all duration-200 tracking-wider cursor-pointer shadow-sm"
        >
          <span className="text-copper group-hover:text-oxide transition-colors">+</span>
          <span className="uppercase">project archive</span>
        </button>

        <button
          type="button"
          onClick={onOpenResearch}
          aria-haspopup="dialog"
          aria-controls="research-panel"
          className="group inline-flex items-center gap-1.5 min-h-[38px] px-4 py-2 rounded-md border border-border bg-graphite/90 hover:border-copper hover:bg-slate text-micro font-mono text-stone hover:text-ivory focus:outline-none focus-visible:ring-1 focus-visible:ring-copper focus-visible:text-oxide transition-all duration-200 tracking-wider cursor-pointer shadow-sm"
        >
          <span className="text-copper group-hover:text-oxide transition-colors">◈</span>
          <span className="uppercase">research lab</span>
        </button>
      </div>
    </section>
  )
}