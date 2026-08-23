# Raghav — Builder Portfolio

> A minimal personal portfolio exploring what I build, what I work with, and how I evolve as a builder.

**Live Site → https://raghav.live/**

---

## 🧭 Concept

This portfolio is intentionally minimal.

Instead of presenting a conventional résumé-style experience with long sections, timelines, skill ratings, and exhaustive project archives, it creates a small surface with optional layers of depth.

The core idea is:

> **Minimal space → maximum curiosity.**

The first viewport communicates three things quickly:

- **Who I am**
- **What I build**
- **How I think**

Additional information is progressively revealed through small interactive controls.

---

## ✦ Experience

The portfolio is organized around a few intentionally restrained interaction points:

### ◈ Hands-on

> Things I've actually built with. Not an expertise claim.

Shows the range of programming languages, frameworks, data technologies, AI tools, systems technologies, and development tooling I've worked with.

The emphasis is on **practical exposure and variation**, not proficiency ratings.

---

### Selected Work

The primary portfolio surface highlights three current systems:

- **Aryntra Anveksha**
- **Aryntra Aayaam**
- **Aryntra Tarka**

These represent the work currently given the most visual attention.

Additional projects remain discoverable through:

> **+ more work**

which opens a compact project explorer without adding a large archive section to the main page.

---

### ◇ Builder Evolution

A conceptual progression describing how my approach to building has evolved:

```text
Making things
      ↓
Understanding how they work
      ↓
Designing systems
      ↓
Thinking in products
      ↓
Building with intent
This is deliberately not a résumé timeline.

There are no dates, job titles, proficiency levels, or fabricated milestones.

It represents a direction of thinking rather than a completed destination.

🏗 Architecture
The current application is intentionally small and component-driven.

text

App.jsx
│
├── PortfolioShell
│
├── HandsOnTrigger
│   └── HandsOnPanel
│
├── EvolutionTrigger
│   └── EvolutionPanel
│
├── main
│   ├── MinimalHero
│   ├── SelectedWork
│   ├── AryntraLink
│   └── ContactFooter
│
└── MoreWorkPanel
Overlay Model
Interactive depth layers use a centralized overlay state:

text

null
│
├── tools
├── evolution
└── moreWork
Only one overlay is active at a time.

When an overlay opens:

background content becomes visually subdued
backdrop blur is applied
body scrolling is locked where appropriate
focus is moved into the active panel
Escape closes the panel
focus is restored to the originating trigger
This keeps the interaction model predictable and accessible.

🧠 Design Principles
Minimal surface
The main page should remain quiet.

Additional information should be discovered rather than forced upon the visitor.

Evidence over claims
Technology metadata should represent things that have actually been built with.

Actual repository → current implementation → portfolio metadata

Never inflate a technology stack or claim expertise without evidence.

Depth on demand
The homepage should establish credibility quickly while allowing curious visitors to explore further.

Selected work over exhaustive work
The strongest current projects receive primary attention.

Older and secondary projects remain available without dominating the first viewport.

No artificial narrative
The old simulated operating-system / boot-sequence concept has been retired.

The portfolio no longer forces visitors through:

boot sequences
sequential unlocks
terminal animations
excessive scrolling
narrative gatekeepers
🛠 Tech Stack
Application
React
Vite
JavaScript / JSX
Styling
Tailwind CSS
Custom CSS where required
Inline SVG
Architecture
Component-driven React architecture
Data-driven content modules
Local state for isolated interactions
Centralized overlay coordination
Deployment
Vercel
Production domain: https://raghav.live/
No backend or external CMS is currently required.

📦 Selected Work
Aryntra Anveksha
Aryntra system focused on its current product direction and implementation.

Aryntra Aayaam
Aryntra system exploring desktop/system-oriented capabilities.

Aryntra Tarka
Aryntra AI-oriented system and local AI infrastructure work.

🗂 Other Work
Additional projects are intentionally kept behind the + more work interaction.

Current portfolio data includes projects such as:

Syaahi
Dev-Vault
Aryntra Backtrace
GradeFlow
The project catalogue is data-driven through:

text

src/data/projects.js
Project metadata should always be verified against the actual project implementation.

📁 Project Structure
text

src/
├── components/
│   ├── HandsOnPanel.jsx
│   ├── HandsOnTrigger.jsx
│   ├── EvolutionPanel.jsx
│   ├── EvolutionTrigger.jsx
│   ├── MoreWorkPanel.jsx
│   ├── SelectedWork.jsx
│   ├── MinimalHero.jsx
│   ├── AryntraLink.jsx
│   └── ContactFooter.jsx
│
├── data/
│   ├── projects.js
│   ├── handsOn.js
│   └── evolution.js
│
├── App.jsx
├── index.css
└── main.jsx
The exact structure may evolve as the portfolio develops.

🖥 Local Development
Clone the repository:

Bash

git clone https://github.com/raghavendrashivam474/evolution-portfolio.git
cd evolution-portfolio
Install dependencies:

Bash

npm install
Run the development server:

Bash

npm run dev
Build for production:

Bash

npm run build
Run lint:

Bash

npm run lint
🚀 Deployment
The portfolio is deployed through Vercel.

Production deployments are triggered from the main branch.

Live:

https://raghav.live/

🔐 Content Accuracy
Portfolio metadata follows a strict rule:

text

Actual Repository
       ↓
Current README
       ↓
Current Implementation
       ↓
Portfolio Metadata
The portfolio should never:

inflate technology stacks
claim unsupported expertise
invent project capabilities
use outdated project information as current truth
If something was built simply, it should be represented simply.

🔮 Future Direction
Potential future work includes:

Content administration / CMS
Admin-only content editing
Dynamic project metadata
More refined interaction patterns
Analytics
Additional evidence relationships between technologies and projects
These should be introduced only when they provide clear value.

The portfolio should remain intentionally lightweight.

📬 Contact
Email
raghavendrashivam474@gmail.com

LinkedIn
https://www.linkedin.com/in/raghavendra-singh-2335292ab/

GitHub
https://github.com/raghavendrashivam474

Instagram
https://www.instagram.com/raghavendra.builds

🌐 Continuation
The portfolio connects to the broader work through:

aryntra ↗

https://arynta.com

📌 Status
Active development

The portfolio is currently evolving alongside the builder behind it.

Build what deserves to exist.
