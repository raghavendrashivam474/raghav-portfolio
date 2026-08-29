export default function SelectedWork({ onOpenOngoing, onOpenMoreWork, onOpenResearch }) {
  return (
    <section className="w-full max-w-xl mx-auto flex flex-col items-center justify-center text-center">
      <h2 className="text-micro text-stone tracking-[0.25em] uppercase mb-4 select-none font-mono text-center font-medium">
        Selected Work
      </h2>

      {/* Primary Mission Entry & Secondary Triggers */}
      <div className="w-full flex flex-col items-center gap-3">
        {/* Primary Action: Ongoing Missions */}
        <button
          type="button"
          onClick={onOpenOngoing}
          aria-haspopup="dialog"
          aria-controls="ongoing-missions-panel"
          className="group w-full sm:w-auto min-w-[280px] sm:min-w-[320px] min-h-[46px] px-6 py-2.5 rounded-lg border border-border/90 bg-gradient-to-r from-slate/70 to-obsidian/70 hover:border-copper/70 hover:bg-slate/90 text-ivory hover:text-white transition-all duration-200 shadow-md hover:shadow-[0_0_0_1px_rgba(200,126,74,0.25),0_8px_24px_rgba(0,0,0,0.35)] cursor-pointer flex items-center justify-between gap-4 outline-none focus-visible:ring-1 focus-visible:ring-copper/70"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-copper group-hover:scale-110 transition-transform duration-200 text-sm font-mono">
              ◇
            </span>
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.18em] font-semibold text-ivory group-hover:text-oxide transition-colors">
              Ongoing Missions
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ash border border-border/60 bg-graphite/90 px-1.5 py-0.5 rounded">
              04 Active
            </span>
            <span
              className="text-copper text-sm opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              aria-hidden="true"
            >
              ↗
            </span>
          </div>
        </button>

        {/* Dual Secondary Exploration Triggers */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-center">
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
      </div>
    </section>
  )
}
