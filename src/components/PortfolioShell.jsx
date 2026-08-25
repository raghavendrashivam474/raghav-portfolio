import MaterialEvolutionCanvas from './MaterialEvolutionCanvas'

export default function PortfolioShell({ children }) {
  return (
    <div className="min-h-dvh w-full bg-obsidian relative flex flex-col items-center justify-center overflow-x-hidden selection:bg-copper/30 selection:text-ivory">
      {/* Living Material Evolution Canvas Layer */}
      <MaterialEvolutionCanvas />

      {/* Central Quiet Zone Atmosphere (Smoothly attenuates center noise for pristine readability) */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(19, 22, 24, 0.82) 0%, rgba(19, 22, 24, 0.45) 55%, transparent 100%)'
        }}
        aria-hidden="true"
      />

      {/* Main UI Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}