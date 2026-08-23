import PortfolioShell from './components/PortfolioShell'
import HandsOnTrigger from './components/HandsOnTrigger'
import EvolutionTrigger from './components/EvolutionTrigger'
import MinimalHero from './components/MinimalHero'
import SelectedWork from './components/SelectedWork'
import AryntraLink from './components/AryntraLink'
import ContactFooter from './components/ContactFooter'

function App() {
  return (
    <PortfolioShell>
      <HandsOnTrigger />
      <EvolutionTrigger />
      <main>
        <MinimalHero />
        <SelectedWork />
        <AryntraLink />
        <ContactFooter />
      </main>
    </PortfolioShell>
  )
}

export default App
