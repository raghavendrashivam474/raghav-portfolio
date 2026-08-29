import { useState, useCallback } from 'react'
import PortfolioShell from './components/PortfolioShell'
import HandsOnTrigger from './components/HandsOnTrigger'
import EvolutionTrigger from './components/EvolutionTrigger'
import MinimalHero from './components/MinimalHero'
import SelectedWork from './components/SelectedWork'
import OngoingMissionsPanel from './components/OngoingMissionsPanel'
import MoreWorkPanel from './components/MoreWorkPanel'
import ResearchPanel from './components/ResearchPanel'
import AryntraLink from './components/AryntraLink'
import ContactFooter from './components/ContactFooter'
import CommandLayer from './components/CommandLayer'

function App() {
  const [activeOverlay, setActiveOverlay] = useState(null)

  const handleToggleTools = useCallback(() => {
    setActiveOverlay((prev) => (prev === 'tools' ? null : 'tools'))
  }, [])

  const handleToggleEvolution = useCallback(() => {
    setActiveOverlay((prev) => (prev === 'evolution' ? null : 'evolution'))
  }, [])

  const handleOpenOngoing = useCallback(() => {
    setActiveOverlay('ongoing')
  }, [])

  const handleOpenMoreWork = useCallback(() => {
    setActiveOverlay('moreWork')
  }, [])

  const handleOpenResearch = useCallback(() => {
    setActiveOverlay('research')
  }, [])

  const handleCloseOverlay = useCallback(() => {
    setActiveOverlay(null)
  }, [])

  const isAnyOpen = Boolean(activeOverlay)

  return (
    <PortfolioShell>
      <HandsOnTrigger
        isOpen={activeOverlay === 'tools'}
        onToggle={handleToggleTools}
        onClose={handleCloseOverlay}
      />
      <EvolutionTrigger
        isOpen={activeOverlay === 'evolution'}
        onToggle={handleToggleEvolution}
        onClose={handleCloseOverlay}
      />

      <CommandLayer
        onOpenOngoing={handleOpenOngoing}
        onOpenTools={handleToggleTools}
        onOpenEvolution={handleToggleEvolution}
        onOpenMoreWork={handleOpenMoreWork}
        onOpenResearch={handleOpenResearch}
      />

      <main className={`w-full max-w-2xl px-6 py-12 flex flex-col items-center justify-center text-center space-y-10 sm:space-y-12 transition-all duration-300 ease-out ${isAnyOpen ? 'blur-sm opacity-30 select-none' : ''}`}>
        <MinimalHero />
        <SelectedWork
          onOpenOngoing={handleOpenOngoing}
          onOpenMoreWork={handleOpenMoreWork}
          onOpenResearch={handleOpenResearch}
        />
        <div className="w-full flex flex-col items-center justify-center gap-7 pt-8 border-t border-border/40">
          <AryntraLink />
          <ContactFooter />
        </div>
      </main>

      <OngoingMissionsPanel
        isOpen={activeOverlay === 'ongoing'}
        onClose={handleCloseOverlay}
      />

      <MoreWorkPanel
        isOpen={activeOverlay === 'moreWork'}
        onClose={handleCloseOverlay}
      />

      <ResearchPanel
        isOpen={activeOverlay === 'research'}
        onClose={handleCloseOverlay}
      />
    </PortfolioShell>
  )
}

export default App
