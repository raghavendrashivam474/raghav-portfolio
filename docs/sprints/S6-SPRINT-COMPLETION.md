# Sprint S6 — Portfolio Depth, Work Archive & Contact Layer

## Completion Report

---

### Metadata

| Field | Value |
|---|---|
| **Sprint** | S6 — Portfolio Depth, Work Archive & Contact Layer |
| **Repository** | `evolution-portfolio` |
| **Branch** | `main` |
| **Production** | `https://raghav.live/` |
| **Status** | **Complete — Deployed to production** |
| **Commits** | 6 (all pushed to `origin/main`) |
| **Files Changed** | 11 modified · 2 created |
| **Lint / Build** | Passing (0 errors, 0 warnings) |

---

## 1. Sprint Objective

S6 extended the minimal portfolio's information architecture without violating its established quiet aesthetic. The mandate was:

> **Make more information discoverable without making it permanently visible.**

The three responsibilities defined in the brief were fully executed:

```text
1. Refine the Hands-on layer          ✅
2. Add "More Work" discovery          ✅
3. Add a minimal Contact endpoint     ✅
```

Additional interaction refinements (mutual exclusion, backdrop blur, rotating typewriter, spacing rhythm) were surfaced during implementation review and executed within-sprint without scope expansion.

---

## 2. Baseline

Before implementation, the baseline was confirmed clean:

```text
git status              → working tree clean
npm run lint            → 0 errors
npm run build           → 204.07 kB (gzip 64.16 kB)
```

Existing S0–S5 architecture was fully preserved. No legacy component was destabilized.

---

## 3. Deliverables

### 3.1 Part A — Hands-on Range Refinement

**File modified:** `src/data/handsOn.js`

The existing 5-category structure was reorganized to communicate **range and paradigm coverage**, not skill inventory.

**Before:**
```text
Frontend · Backend · Data · AI · Systems
```

**After:**
```text
Languages           → C++, Python, JavaScript, TypeScript, Go
Web & Applications  → React, Next.js, Vite, FastAPI, Node.js, Express, Tailwind CSS
Data                → PostgreSQL, SQLite, IndexedDB, Supabase, SQLAlchemy
AI                  → Ollama, OpenAI SDK, RAG, Embeddings, LLM Integration
Systems & Tooling   → Go CLI, Terminal Architecture, JSON Output Engine, Modular Architecture
```

The change surfaces language paradigm variety (C++, Python, Go, TypeScript) as the first visible category — directly addressing the "range not stack" objective in Section 10 of the brief.

**Constraints honored:**
- No proficiency ratings, percentages, or claim language.
- The internal `handsOnEvidence` map continues to link each technology to project IDs for auditability.
- Existing S4 `HandsOnPanel` component consumes the refined data without modification.

**Commit:** `d936d1d — feat(s6): expand hands-on technology range`

---

### 3.2 Part B — More Work Explorer

**Files created:** `src/components/MoreWorkPanel.jsx`
**Files modified:** `src/components/SelectedWork.jsx`, `src/App.jsx`

A `+ more work` trigger was placed beneath the primary three projects. Clicking it opens a centered modal populated dynamically from `otherSystems` in `src/data/projects.js`.

**Discovery mechanism:**
```text
Selected Work (3 projects)
        ↓
    + more work    ← subtle typographic trigger
        ↓
Modal → Syaahi, Dev-Vault, Backtrace, GradeFlow
```

**Design decisions:**
- Modal placement lifted to `App.jsx` root (not nested inside `<main>`) so the modal remains crisp when `<main>` is blurred behind it.
- Content driven from existing project data source. No metadata duplication.
- Solid surface background (`bg-graphite`) with hard border to prevent blurred hero text from bleeding through visually.
- Each project row displays: title (linked), status badge, tagline, and tech stack line.

**Accessibility:**
- `role="dialog"` + `aria-modal="true"`
- Escape closes
- Backdrop click closes
- Focus enters close button on open
- Focus restoration on close
- Body scroll lock on open
- Mobile bottom sheet (`max-sm:` rules)

**Commit:** `92b67c3 — feat(s6): add additional work explorer`

---

### 3.3 Part C — Contact Endpoint

**Files created:** `src/components/ContactFooter.jsx`
**Files modified:** `src/App.jsx`, `src/components/AryntraLink.jsx`

A quiet footer was added below the `aryntra ↗` link with four verified contact channels.

**Verified links (sourced from repo history):**
| Channel | URL |
|---|---|
| Email | `mailto:raghavendrashivam474@gmail.com` |
| LinkedIn | `https://www.linkedin.com/in/raghavendra-singh-2335292ab/` |
| GitHub | `https://github.com/raghavendrashivam474` |
| Instagram | `https://www.instagram.com/raghavendra.builds` |

The Instagram handle was explicitly confirmed by the owner before implementation — per Section 28 of the brief no URL was invented.

**Copy:** `let's build something.` (matches brief's Section 30 direction).

**Design:**
- Inline SVG icons (no icon library added — honoring Section 38 constraint).
- Hover reveals ivory-to-oxide color transition with subtle scale.
- Email uses `mailto:` (no `target="_blank"`); social links use `target="_blank"` + `rel="noopener noreferrer"`.

**Explicitly rejected:** contact form, phone number, LARGE CTA — per brief's Section 24 and Section 42.

**Commit:** `6e93fb3 — feat(s6): add minimal contact footer`

---

## 4. In-Sprint Refinements

Three iterative refinements surfaced during the visual review phase. These were not in the original brief but were justified by the design principle (Section 41 quality gate — *"Is the first viewport still quiet?"*).

### 4.1 Drawer Backdrop Blur & Mutual Exclusion

**Problem observed:** Opening the `◈` and `◇` drawers simultaneously created visual noise. The page content behind was fully readable, competing with panel content.

**Solution:**
- Unified overlay state in `App.jsx` (`activeOverlay: 'tools' | 'evolution' | 'moreWork' | null`).
- Opening any one automatically closes the others.
- `<main>` receives `blur-sm opacity-30 select-none` when any overlay is open.
- Backdrop uses `bg-obsidian/70 backdrop-blur-md` for depth.

**Architectural note:** Trigger components (`HandsOnTrigger`, `EvolutionTrigger`) were converted from self-owned state to controlled components receiving `isOpen`, `onToggle`, `onClose` props. This centralizes overlay coordination in one location and enables future extension (e.g., command palette).

**Commit:** `d33e15c — refactor(s6): implement drawer backdrop blur and mutual exclusion`

---

### 4.2 Rotating Typewriter Hero Tagline

**Problem observed:** Static tagline `"I build systems."` was minimal but static — did not surface personality or engineering focus.

**Solution:**
- Hero now displays `Raghavendra Singh` as the primary identity line.
- A `raghu_007` handle badge with a pulsing oxide dot sits above the name.
- Tagline rotates continuously through three curated statements:
  ```text
  "I build solutions where reality breaks them."
  "Local-first AI & resilient architecture."
  "From mental models to production code."
  ```
- Typewriter timing: 40ms type, 5s dwell at full phrase, 20ms backspace, 300ms transition.
- Terminal cursor: 2px vertical line, oxide-colored, pulsing when idle.

**React correctness:** Initial implementation triggered an ESLint `react-hooks/set-state-in-effect` cascade warning. Resolved by wrapping the phrase-transition state calls inside a `setTimeout` continuation, keeping all state updates inside effect timers rather than synchronous effect bodies.

**Commit:** `1f4843a — feat(s6): add rotating continuous typewriter tagline to hero`

---

### 4.3 Vertical Rhythm & Contact Footer Hierarchy

**Problem observed:** After the modal work landed, the lower stack (`Selected Work → aryntra ↗ → contact`) collapsed into a tight visual blob. Content also unexpectedly left-aligned due to a missing `align-items: center` in `.viewport-container`.

**Root causes identified:**
1. `.viewport-container` in `index.css` used `display: flex; flex-direction: column` without `align-items: center`, so `<main>` fell back to left-edge under flex default alignment.
2. Trigger icons (`◈`, `◇`) were `text-lg` — visually thin at desktop viewport.
3. Footer sections lacked breathing room between hierarchy levels.

**Solution:**
- Rewrote `PortfolioShell.jsx` with explicit `flex flex-col items-center justify-center`.
- Enlarged corner icons to `text-2xl sm:text-3xl` with hover scale.
- Introduced a thin `border-t border-ash/30` above the aryntra + contact block to visually separate continuation from work.
- Tuned `space-y-*` and `gap-*` values through multiple rounds of viewport review until layout felt intentional, not cramped and not stretched.

**Commit:** `20e2902 — refactor(s6): polish vertical rhythm and contact footer hierarchy`

---

## 5. Architecture

Final component composition:

```text
App.jsx
  │
  ├── PortfolioShell               (centered flex column, obsidian background)
  │
  ├── HandsOnTrigger  (◈)          → HandsOnPanel   ← controlled
  ├── EvolutionTrigger (◇)          → EvolutionPanel ← controlled
  │
  ├── <main>                       (blurs when any overlay is open)
  │     ├── MinimalHero            (rotating typewriter)
  │     ├── SelectedWork           (3 projects + trigger)
  │     ├── AryntraLink            (aryntra ↗)
  │     └── ContactFooter          (4 verified channels)
  │
  └── MoreWorkPanel                (root-level, crisp over blurred main)
```

**Overlay state is single-sourced:**
```js
const [activeOverlay, setActiveOverlay] = useState(null)
// 'tools' | 'evolution' | 'moreWork' | null
```

This satisfies the future CMS/admin roadmap by keeping presentation logic decoupled from content sources.

---

## 6. Constraint Compliance

Verified against Section 42 (*Explicitly Do NOT Do*) of the brief:

| Forbidden | Status |
|---|---|
| Traditional navbar | Not added |
| About / Résumé / Experience / Education sections | Not added |
| All projects on homepage | Only 3 visible; rest behind trigger |
| Project cards / images | Typographic list only |
| Proficiency bars, percentages, expertise claims | None |
| Contact form | None |
| Phone number | None |
| Invented Instagram URL | Confirmed with owner before use |
| Backend / CMS / auth / admin | None |
| New state management library | None (native React) |
| S5 destabilization | S5 untouched |
| Hero redesign | Refined, not redesigned |
| Boot sequence revival | Not revived |

---

## 7. Quality Gates

**Definition of Done** (Section 45) checklist:

**Hands-on**
- [x] Technology range clearly visible
- [x] Multiple programming languages represented
- [x] Frameworks / tools separated logically
- [x] No proficiency claims
- [x] Existing S4 interaction functional
- [x] Content concise

**More Work**
- [x] `+ more work` trigger exists and is visually subtle
- [x] Remaining projects derived from existing data source
- [x] Selected projects not duplicated
- [x] Modal opens / closes / Escape / backdrop / focus restoration all functional
- [x] Mobile layout works
- [x] Project metadata accurate

**Contact**
- [x] All four links functional
- [x] Instagram URL verified with owner before implementation
- [x] Icons match visual language (inline SVG)
- [x] Footer remains minimal
- [x] No contact form

**Quality**
- [x] `npm run lint` passes
- [x] `npm run build` passes
- [x] No unnecessary dependencies added
- [x] No unrelated files touched
- [x] S0–S5 behavior intact
- [x] Production configuration unchanged
- [x] Final diff reviewed manually

---

## 8. Build Metrics

| Metric | S5 Baseline | S6 Final | Delta |
|---|---|---|---|
| Modules transformed | 27 | 29 | +2 |
| `dist/index.html` | 0.63 kB | 0.63 kB | 0.00 |
| CSS (gzip) | 5.60 kB | 7.00 kB | +1.40 kB |
| JS (gzip) | 64.16 kB | 66.31 kB | +2.15 kB |
| Build time | 1.37 s | 1.22 s | −0.15 s |

**Bundle impact is proportional** — three new features and multiple visual refinements added under 2.2 kB of gzipped JavaScript. No dependencies added.

---

## 9. Commit Ledger

Chronological order, all merged into `main`:

```text
d936d1d  feat(s6): expand hands-on technology range
92b67c3  feat(s6): add additional work explorer
6e93fb3  feat(s6): add minimal contact footer
d33e15c  refactor(s6): implement drawer backdrop blur and mutual exclusion
1f4843a  feat(s6): add rotating continuous typewriter tagline to hero
20e2902  refactor(s6): polish vertical rhythm and contact footer hierarchy
```

Push: `e670ccb..20e2902 main -> main`

Commit history is logically segmented — three feature commits map directly to the brief's three parts, three refactor commits map to in-sprint refinements.

---

## 10. Notes for Next Sprint

Observations surfaced during S6 that may inform S7:

1. **`src/data/modules.js` is now unreferenced.** It was consumed by the deprecated `Humanoid.jsx` (removed in S2). Recommend either deletion or explicit migration into `handsOn.js` as evidence data.
2. **`Container.jsx` component appears unused** after the layout refactor. Worth verifying and pruning.
3. **Trigger prop signatures are consistent** (`isOpen`, `onToggle`, `onClose`) — a shared `useOverlay` hook could reduce App.jsx boilerplate if a fourth overlay is ever introduced.
4. **CMS readiness is architecturally clean.** All content sources (`projects.js`, `handsOn.js`, `evolution.js`) are pure data modules — swapping to a fetch-based provider would require zero UI changes.
5. **Typewriter phrases** are hardcoded in `MinimalHero.jsx`. If content velocity increases, this belongs in `src/data/`.

---

## 11. Summary

Sprint S6 achieved its brief-defined objective: **the homepage remains quiet on first viewport**, but a curious visitor can now discover the full breadth of Raghav's work, understand his technical range across paradigms, and reach him through verified channels — all without the portfolio becoming a résumé.

The interaction model (`◈`, `◇`, `+ more work`) now forms a coherent triad of opt-in depth layers, and the visual polish work brings the composition into consistent proportional balance across desktop and mobile viewports.

**Sprint status: closed. Production deployed. Ready for S7 scoping.**