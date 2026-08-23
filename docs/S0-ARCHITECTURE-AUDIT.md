# S0 — Architecture Audit & Transformation Blueprint

**Repository:** `evolution-portfolio`  
**Baseline Commit:** `49d008e` — *fix: correct Dev-Vault technology metadata*  
**Backup Repository:** `evolution-portfolio-backup` @ `96a051b`  
**Auditor Mode:** Passive / Blueprinting (Zero application modifications in S0)

---

## 1. Current Architecture Overview

The project is currently a single-page portfolio running on **React 19.2** and **Vite 8.0**, configured with **Tailwind CSS v4.2** and standard PostCSS.

### Key Technical Characteristics
1. **Single-Page Architecture:** There is no router. Section traversal is managed by standard DOM ID scroll targets (`#projects`, `#about`, `#contact`) activated via smooth-scroll window utilities in the main component.
2. **Data-Driven UI:** Content is decoupled from layouts, referencing statically declared JS payloads in `src/data/` (e.g., `projects.js`, `modules.js`, `operations.js`, and `bootSequence.js`).
3. **Styling Split:** The project uses Tailwind CSS utility classes alongside heavy, hard-coded inline JS `style` blocks. Interactive hover states are frequently generated programmatically via direct style updates on SyntheticEvents (e.g., `onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}`).
4. **No External Infrastructure:** The site relies on no backend database, authentication protocol, validation libraries, or CMS integrations.

---

## 2. Runtime Flow Analysis

The current `App.jsx` orchestrates rendering without any layout framework. The legacy boot-sequence loading state is present but commented out; the application loads all principal sections on initial viewport mount.

```text
index.html (Title, Meta Description, Root Target)
  └── main.jsx (React 19 Concurrent Root + StrictMode)
        └── App.jsx (Top-level shell, Skip-to-Section Handler, Shared Nav & Footer)
              ├── <nav> (Fixed inline navigation header)
              ├── Human.jsx (Interactive Hero Section with dynamic SVG noise & radial gradient)
              ├── Transformation.jsx (Active Missions Grid & Other Systems Archive)
              │     ├── MissionCard.jsx (Interactive self-expanding active mission container)
              │     └── OtherSystemCard (Compact layout cards for previous builds)
              ├── <div id="about">
              │     └── Humanoid.jsx (Core Capability modules, Operations logs, & email CTAs)
              └── <footer> (Copyright string, raw SVG Social Links for GitHub, LinkedIn, Email)
3. Component Inventory & Audit Decisions
This inventory captures the exact state of every component under src/components/ and establishes their target architecture.

Component-by-Component Analysis
Component File    Direct Dependencies    Props Received    State Managed    Style System    Target Decision    Refactor Reason
App.jsx    Human, Transformation, Humanoid    None    None (Legacy state commented out)    Inline style objects + fixed wrappers    TRANSFORM    Rewrite as a single-viewport composition using standard layout primitives. Eliminate hardcoded menu logic.
main.jsx    App.jsx, index.css    None    None    Root mount binding    RETAIN    Keep intact as the Vite/React mounting entry point.
AnimatedHeader.jsx    Typewriter    title, subtitle, mono    isVisible (IntersectionObserver)    Tailwind CSS utilities    REMOVE    Currently dead code (imported by nothing). Target design lacks a conventional centered text header.
Container.jsx    None    children, className    None    Tailwind CSS utilities    RETAIN    Keep as a standard layout primitive wrapper. Ensure all new layout files utilize it.
Human.jsx    None    skipToSection    None    Inline styling + SVG background filter    TRANSFORM    Transition to MinimalHero. Retain layout properties, replace layout graphics, shift inline properties to Tailwind v4.
Humanoid.jsx    None    None    None    Multi-nested inline objects + synthetic mouse handlers    TRANSFORM (SPLIT)    Split core tech lists into HandsOnPanel and current projects into SelectedWork. Eliminate inline hover overrides.
MissionCard.jsx    None    project    isExpanded    Inline styling + state toggles    TRANSFORM    Convert to ProjectDetail modal or restrained drawer layout. Replace green theme with Obsidian/Stone palettes.
MissionLaunch.jsx    Typewriter    shouldStart    showContent    Tailwind CSS utilities    REMOVE    Legacy typewriter trigger with DOM-mutating side effects. Not used in modern active layout flow.
Section.jsx    None    show, children, delay    None    Inline visibility/transform keys    REMOVE    Unused helper; current site renders continuously without animated section transitions.
SystemBoot.jsx    Typewriter, bootSequence.js    onComplete    currentLine, isVisible, hasPlayed    Pure inline styling    REMOVE    Commented out in active configuration. Target design avoids forced, gated boot procedures.
SystemLogs.jsx    Typewriter    None    currentLine    Tailwind CSS utilities    REMOVE    Narrative utility component. Incompatible with quiet, non-obstructive portfolio design.
Transformation.jsx    MissionCard, projects.js    None    None    Inline wrappers + grid layout    TRANSFORM    Re-architect into clean SelectedWork section. Integrate with the updated visual design tokens.
Transition.jsx    SystemLogs    None    isVisible    Tailwind CSS utilities    REMOVE    Container helper only used for rendering obsolete log consoles.
Typewriter.jsx    None    text, speed, onComplete, delay    displayText, isTyping, showCursor    Inline cursor styling    REMOVE    Transition text structures to instant rendering to support frictionless exploration.
typewriter/ScrollTrigger.jsx    None    children, threshold, className, fallback    isVisible    Standard HTML div wraps    REMOVE    Unused helper component.
typewriter/SequenceController.jsx    Typewriter    lines, speed, lineDelay, onComplete    currentIndex    Tailwind CSS utilities    REMOVE    Unused system sequencer.
4. Data Layer Architecture
The site keeps data independent of formatting in standard Javascript imports:

src/data/projects.js (RETAIN & MIGRATE): Declares active platforms (Aryntra Anveksha, Aryntra Aayaam, and Aryntra Tarka) as structured objects alongside historic archives (Syaahi, Dev-Vault, etc.). This remains the central operational record.
src/data/modules.js (TRANSFORM): Defines technical capability strings. These profiles will be aggregated directly into the categorized data array mapping to the HandsOnPanel (◈).
src/data/operations.js (REMOVE): Duplicates descriptions of active projects already recorded inside projects.js. Deleting this prevents content drift.
src/data/bootSequence.js (REMOVE): Houses sequence lines for SystemBoot.jsx. Redundant once loader logic is removed.
5. Styling & Visual System Audit
The existing styles are split between custom global targets, Tailwind configurations, and nested inline JS style overrides.

Color Tokens & Palette Configuration
The target visual system moves the website away from standard Emerald values (#34d399 / #00ff88) toward a muted, material-inspired scheme:
Layer Purpose    Target Token    Target Hex Code    Current Value    Action Required
Background    Obsidian    #0D0E0C    #0a0a0a / #000    Adjust deep-dark values to warm Obsidian
Primary Text    Warm Ivory    #E8E3D8    #fff / #fafafa    Replace harsh high-whites with warm tones
Secondary Text    Stone    #8D8A82    #9ca3af / #6b7280    Shift grey values to mineral Stone
Accent Signal    Oxide    #B85C38    #34d399 / #00ff88    Remove active green signals; use Oxide sparingly
Accent Glow    Burnished Copper    #D17A52    N/A    Provide warm glow points in place of green radial clouds
Surfaces    Graphite    #171916    #1a1a1a    Re-theme card surfaces to mineral Graphite
Borders    Ash    #2A2C28    rgba(255,255,255,0.1)    Replace transparent borders with distinct Ash boundaries
CSS Structure Evaluation (src/index.css & Tailwind)
Tailwind Version: Built on Tailwind v4.2. Custom themes must be extended within the PostCSS/v4 directive style or via tailwind.config.js.
Selection: Standardizes cursor select fields on #34d399. Needs transition to Oxide (#B85C38).
Animations: Clean out obsolete blinking cursors (@keyframes blink) and layout-fade animations during S2 refactoring.
6. Animation, Micro-Interactions, & State Machinery
Existing Interaction Layer
State Gating: Gated load mechanisms are bypassed by commented-out blocks inside App.jsx, but legacy code artifacts remain.
Direct DOM Hover Manipulation: Inline mouse enter/leave actions dynamically alter state styles (e.g., in Humanoid.jsx cards and footers). These present maintenance overhead and will be replaced by Tailwind native pseudoclass selectors (hover:text-warm-ivory hover:border-accent).
Noise Filters: Human.jsx leverages a base64-embedded inline SVG turbulence filter to generate atmospheric noise. This technique is computationally clean, highly effective, and will be preserved inside the minimal framework layout.
7. Asset Verification
The project includes basic visual assets inside the codebase structure:

text

src/assets/
  ├── hero.png   (Unused in the active source tree; safe to remove in S2)
  ├── react.svg  (Standard installation artifact; safe to remove in S2)
  └── vite.svg   (Standard installation artifact; safe to remove in S2)

public/
  ├── favicon.svg (Active site tab decoration; RETAIN)
  └── icons.svg   (SVG Sprite; retain pending target symbol reviews)
8. Verified Project Metadata
Below is the verified inventory of the primary projects, ensuring absolute accuracy with their respective target repositories.

Active Foundations (Selected Work)
1. Aryntra Anveksha
Description: AI-Powered Preventive Health Screening Platform.
Core Stack: Python 3, FastAPI, SQLAlchemy, Ollama, Next.js 14, TypeScript, Tailwind CSS.
Release Status: v0.9.4 — Dashboard Analytics complete. Over 1,200 total integrated system tests passing.
Target Role: Primary showcase project.
2. Aryntra Aayaam
Description: Developer Project Awareness CLI.
Core Stack: Go (Golang), CLI Arguments, Terminal and JSON-oriented outputs.
Release Status: v1.0.0 — CLI core foundation and output layers operational.
Target Role: Primary showcase project.
3. Aryntra Tarka
Description: Transparent Local-First AI Agent.
Core Stack: FastAPI, React, TypeScript, Ollama, SQLite, Server-Sent Events (SSE).
Release Status: v1.0.0 — Autonomous planner, tooling registry, local conversation history complete.
Target Role: Primary showcase project.
9. Comprehensive Transformation Map
text

       ┌─────────────────────────────────────────────────────────┐
       │                 CURRENT NARRATIVE BASELINE              │
       │  (App.jsx with legacy comment blocks, inline style maps,│
       │  direct DOM hover handlers, and Emerald green colors)   │
       └────────────────────────────┬────────────────────────────┘
                                    │
                                    │ S1: FOUNDATION
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │              MINIMAL DESIGN TOKEN BASELINE              │
       │  (Locked Obsidian/Warm Ivory/Oxide Palette integrated   │
       │  directly inside Tailwind v4. Custom theme wrappers)    │
       └────────────────────────────┬────────────────────────────┘
                                    │
                                    │ S2: RE-COMPOSITION
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │               CLEAN LAYOUT SHELL ARCHITECTURE           │
       │  (Delete obsolete typewriters, loaders, transitions.    │
       │  Mount MinimalHero text elements in Obsidian viewports) │
       └────────────────────────────┬────────────────────────────┘
                                    │
                                    │ S3-S6: INTERACTIVE LAYERS
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │                COMPLETED TARGET PORTFOLIO               │
       │  (Quiet, focused single-page composition complete with   │
       │  ◈ Hands-On overlays, ◇ Evolution paths, Aryntra link)  │
       └─────────────────────────────────────────────────────────┘
1. RETAIN
src/main.jsx (Root rendering bootstrap configuration)
src/components/Container.jsx (Standard viewport constraints container)
src/data/projects.js (Structured codebase single-source-of-truth)
public/favicon.svg (Identity file)
2. TRANSFORM
src/App.jsx ──► Single-page structure; clean Obsidian layout frame
src/components/Human.jsx ──► MinimalHero (Compact typography focus)
src/components/Transformation.jsx ──► SelectedWork (Restrained card display)
src/components/Humanoid.jsx ──► HandsOnPanel (◈ overlays, Category groups)
tailwind.config.js ──► Tailwind v4 extended palette integration
src/index.css ──► Style housekeeping; purge old keyframe configurations
3. REMOVE
src/components/AnimatedHeader.jsx (Unreferenced layout helper)
src/components/SystemBoot.jsx (Commented legacy narrative loader)
src/components/SystemLogs.jsx (Redundant narrative element)
src/components/Transition.jsx (Obsolete console log mount frame)
src/components/MissionLaunch.jsx (DOM-mutating sequential helper)
src/components/Section.jsx (Opacity transition layout wrapper)
src/components/Typewriter.jsx (Frictionless display focus eliminates typing delays)
src/components/typewriter/* (Unused subdirectory structure)
src/data/bootSequence.js (Obsolete narrative text payload)
src/data/operations.js (Redundant active operational listings)
src/assets/hero.png (Obsolete visual asset)
src/assets/react.svg / vite.svg (Framework defaults)
4. CREATE
MinimalHero (Compact initial typography focus)
SelectedWork (Clean, balanced active showcase cards)
ProjectDetail (Restrained overlay details frame)
HandsOnTrigger / HandsOnPanel (◈ navigation layer showing technical stacks)
EvolutionTrigger / EvolutionPanel (◇ navigation layer mapping path progression)
AryntraLink (Integrated out-bound reference designator)
Panel (Shared structural modal base: handles Esc close, overlays, and transitions)
10. Dependency, Stability & Risk Assessment
Inline Hover Interferences: Multiple existing components manipulate native events with absolute hex parameters. We will transition these properties exclusively to Tailwind CSS styling (hover:bg-graphite) in S1 to prevent styling conflicts.
Tailwind v4 Integration Mechanics: This workspace utilizes Tailwind v4. This version handles color maps differently than v3. We must ensure our extended colors are configured cleanly within the stylesheet context during the S1 setup.
Continuous Deployment Integrity: The development pipeline is actively connected to the production URL (raghav.live). All transition phases must undergo thorough validation steps to prevent build-level breaks on deployment.
Passkey & Next.js Staging Boundaries: Content management databases and framework adaptations (Next.js, Prisma, Passkeys) are strictly assigned to later sprints (S7+). The initial visual redesign must remain inside the current performant React/Vite system.
Direct Repository Integrity: Do not write directly to or alter the evolution-portfolio-backup backup directory. Ensure all active development operates within evolution-portfolio.
11. Target Execution Sprints
text

  Sprint 1 (S1) ──►  Inject locked design tokens, colors & Tailwind v4 extend maps.
  Sprint 2 (S2) ──►  Purge legacy files. Implement MinimalHero viewport.
  Sprint 3 (S3) ──►  Rebuild SelectedWork showcasing Anveksha, Aayaam & Tarka.
  Sprint 4 (S4) ──►  Deploy compact overlay for Hands-On capabilities (◈).
  Sprint 5 (S5) ──►  Deploy compact overlay for Builder Evolution paths (◇).
  Sprint 6 (S6) ──►  Integrate Aryntra links. Perform final accessibility pass.
Exit Phase Checklist (Verified Safe)
 Current workspace runs cleanly (npm run dev)
 Application structure & variables audited without baseline drift
 Production build processes complete successfully (npm run build)
 Source structure verified with lint utilities (npm run lint)
 Transformation map verified and checked into docs/
text

