import { activeMissions } from '../data/projects'

export default function SelectedWork({ onOpenMoreWork, onOpenResearch }) {
  return (
    <section className="w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center">
      <h2 className="text-micro text-stone tracking-[0.25em] uppercase mb-6 select-none font-mono text-center font-medium">
        Selected Work
      </h2>

      {/* Structured Vertical Selected Work List */}
      <div className="w-full flex flex-col gap-3 text-left mb-8">
        {activeMissions.map((project) => {
          const cleanTitle = project.title.replace('Aryntra ', '')

          return (
            <a
              key={project.id}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} repository`}
              className="group flex items-center justify-between p-3.5 sm:p-4 rounded-xl border border-border/70 bg-gradient-to-r from-slate/50 to-obsidian/40 hover:border-copper/50 hover:bg-slate/60 transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-copper/60 shadow-sm"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <span className="text-xs font-mono text-copper/80 shrink-0 font-semibold">
                  {project.id} /
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-medium text-ivory group-hover:text-oxide transition-colors tracking-tight truncate">
                      {cleanTitle}
                    </h3>
                  </div>
                  <p className="text-xs text-stone truncate font-sans mt-0.5">
                    {project.tagline}
                  </p>
                </div>
              </div>

              <span
                className="text-copper text-base sm:text-lg opacity-70 group-hover:opacity-100 group-hover:text-oxide transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 ml-3"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          )
        })}
      </div>

      {/* Dual Exploration Triggers */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center">
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