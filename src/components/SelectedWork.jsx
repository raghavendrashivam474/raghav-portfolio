import { activeMissions } from '../data/projects'

export default function SelectedWork({ onOpenMoreWork }) {
  return (
    <section className="w-full flex flex-col items-center justify-center text-center">
      <h2 className="text-micro text-stone/50 tracking-[0.25em] uppercase mb-6 select-none font-mono text-center">
        Selected Work
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 w-full">
        {activeMissions.map((project, idx) => (
          <div key={project.id} className="inline-flex items-center gap-6 sm:gap-10">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl sm:text-2xl font-medium text-ivory/90 hover:text-oxide focus-visible:text-oxide transition-colors duration-200 tracking-tight"
            >
              {project.title.replace('Aryntra ', '')}
            </a>
            {idx < activeMissions.length - 1 && (
              <span className="text-stone/30 font-mono text-sm select-none" aria-hidden="true">·</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={onOpenMoreWork}
          aria-haspopup="dialog"
          aria-controls="more-work-panel"
          className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm border border-ash/60 hover:border-oxide/60 text-micro text-stone/80 hover:text-oxide focus-visible:text-oxide transition-all duration-200 tracking-wider cursor-pointer bg-graphite/40"
        >
          <span className="text-stone/50 group-hover:text-oxide transition-colors">+</span>
          <span>more work</span>
        </button>
      </div>
    </section>
  )
}
