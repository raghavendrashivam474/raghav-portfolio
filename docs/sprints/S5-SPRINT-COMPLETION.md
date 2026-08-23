---

# Sprint S5 — Builder Evolution Layer

## Engineering Completion Report

| Field | Detail |
|---|---|
| **Sprint** | S5 — Builder Evolution Layer |
| **Repository** | `evolution-portfolio` |
| **Branch** | `main` |
| **Production** | https://raghav.live/ |
| **Status** | ✅ Complete |
| **Commits** | `b476e4e` · `7420d88` |

---

## 1. Executive Summary

Sprint S5 implements the second hidden-depth interaction layer of the portfolio. The `◇` control at the top-right of the page now opens a compact **Builder Evolution** panel that communicates how the builder's thinking has matured — from early experimentation to intentional, evidence-driven construction.

This is explicitly **not** a résumé timeline. There are no dates, no job titles, no technology acquisition milestones. The panel presents a five-stage conceptual progression of builder mindset, separated from presentation via a dedicated data module for future CMS compatibility.

An ancillary fix was applied to the Aryntra outbound link to ensure correct `target="_blank"` behavior with appropriate security attributes.

---

## 2. Sprint Objectives

| # | Objective | Status |
|---|---|---|
| 1 | Connect the existing `◇` trigger to a functional Evolution panel | ✅ |
| 2 | Implement a five-stage conceptual progression (not chronological) | ✅ |
| 3 | Separate content from presentation via a data module | ✅ |
| 4 | Match S4 HandsOnPanel interaction and accessibility patterns | ✅ |
| 5 | Maintain responsive behavior across desktop, tablet, and mobile | ✅ |
| 6 | Introduce zero new dependencies | ✅ |
| 7 | Preserve all existing S0–S4 functionality untouched | ✅ |

---

## 3. Architecture Decisions

### 3.1 State Management

**Decision:** Local `useState` within `EvolutionTrigger.jsx`.

**Rationale:** The Evolution panel is a single isolated interaction. Global state (Redux, Zustand, Context) would add complexity without benefit. This mirrors the S4 `HandsOnTrigger` pattern exactly, maintaining architectural consistency across sibling layers.

### 3.2 Component Structure

```
EvolutionTrigger.jsx
├── Manages open/close state
├── Handles focus restoration on close
└── Renders EvolutionPanel.jsx
    ├── Consumes data from src/data/evolution.js
    ├── Renders five-stage progression
    ├── Handles Escape key, backdrop click, close button
    └── Manages body scroll lock on mobile
```

The trigger owns its panel. `App.jsx` remains a flat composition shell with no state logic.

### 3.3 Data Separation

**File:** `src/data/evolution.js`

**Rationale:** Content is isolated from UI to support a future admin/CMS sprint without component refactoring. The data module exports `evolutionStages` (array of `{ id, title, description }`) and `evolutionMeta` (heading, framing, direction strings). Stable string IDs are included for future keyed lookups.

### 3.4 Styling Approach

**Decision:** Tailwind utility classes only. No separate CSS files.

**Rationale:** The existing S4 `HandsOnPanel` uses Tailwind exclusively. Introducing a parallel CSS file for S5 would create an inconsistency. All visual treatment uses the established S1 design tokens (`obsidian`, `graphite`, `ash`, `stone`, `ivory`, `oxide`, `copper`) via the Tailwind config.

### 3.5 No Backend or External Services

S5 is purely frontend. No database, API, CMS, authentication, or external service was introduced. This constraint will be maintained until the designated content-management sprint.

---

## 4. Files Changed

| File | Action | Lines | Purpose |
|---|---|---|---|
| `src/data/evolution.js` | Created | +36 | Five-stage evolution data + metadata |
| `src/components/EvolutionPanel.jsx` | Created | +117 | Accessible dialog panel with progression rendering |
| `src/components/EvolutionTrigger.jsx` | Modified | +50 / −15 | Added state management, panel wiring, focus restoration |
| `src/components/AryntraLink.jsx` | Modified | +12 / −5 | Fixed outbound link target and security attributes |

**Total:** 203 insertions, 20 deletions across 4 files.

---

## 5. Content Model

The five stages represent a progression in **builder maturity**, not a timeline:

| Stage | ID | Focus |
|---|---|---|
| Making things | `making-things` | Curiosity, experimentation |
| Understanding how they work | `understanding-how-they-work` | Mechanisms, debugging, architecture |
| Designing systems | `designing-systems` | Components, boundaries, trade-offs |
| Thinking in products | `thinking-in-products` | Users, problems, prioritization |
| Building with intent | `building-with-intent` | Purpose, evidence, constraints |

The final stage is explicitly framed as **"a direction, not a destination"** to avoid false finality. No dates, no fabricated milestones, no unsupported autobiographical claims.

---

## 6. Interaction Specification

### 6.1 Open

```
User clicks/taps ◇
  → EvolutionTrigger sets isOpen = true
  → EvolutionPanel renders
  → Backdrop appears (obsidian/60)
  → Focus moves to close button (requestAnimationFrame)
  → Body scroll locked
```

### 6.2 Close (three methods)

| Method | Behavior |
|---|---|
| `×` button | `onClose()` → `isOpen = false` → focus returns to `◇` |
| `Escape` key | Captured via `keydown` listener, `stopPropagation` |
| Backdrop click | `onClick` on overlay div (not on panel content) |

### 6.3 Focus Restoration

On close, `requestAnimationFrame` returns focus to the `◇` trigger button. Keyboard users are never stranded.

---

## 7. Accessibility

| Requirement | Implementation |
|---|---|
| Semantic trigger | `<button>` with `aria-label`, `aria-expanded`, `aria-controls` |
| Dialog semantics | `role="dialog"`, `aria-modal="true"`, `aria-label` |
| Keyboard activation | Native `<button>` behavior (Enter/Space) |
| Escape close | `keydown` listener with `stopPropagation` |
| Focus entry | `requestAnimationFrame` → close button focus on open |
| Focus restoration | `requestAnimationFrame` → trigger focus on close |
| Visible focus | `focus-visible:text-oxide` on trigger, `focus-visible:text-oxide` on close |
| Touch support | Minimum 44px touch target via `p-3` padding |
| Scroll lock | `document.body.style.overflow = 'hidden'` with cleanup |

---

## 8. Responsive Behavior

| Breakpoint | Panel Position | Layout |
|---|---|---|
| Desktop (>640px) | Top-right, anchored below `◇` | Floating card, `max-w-[360px]` |
| Mobile (≤640px) | Bottom sheet | Full-width, `rounded-t-md`, `max-h-[80dvh]` |

The five stages remain readable without excessive scrolling at all viewport sizes.

---

## 9. Quality Gates

| Gate | Result |
|---|---|
| `npm run lint` | ✅ Zero errors, zero warnings |
| `npm run build` | ✅ Vite v8.0.3, 27 modules, 1.08s |
| CSS bundle | 25.12 KB (5.59 KB gzip) |
| JS bundle | 204.07 KB (64.16 KB gzip) |
| New dependencies | 0 |
| `git diff --check` | ✅ Clean (CRLF warnings are cosmetic on Windows) |
| Unrelated changes | None |

---

## 10. Relationship to Existing Layers

```
◈ Hands-on (S4)          ◇ Evolution (S5)
│                        │
│ What I've built with   │ How my thinking changed
│ Technologies, tools    │ Mindset, maturity
│ Evidence-based         │ Conceptual progression
│                        │
└──────── RAGHAV ────────┘
         │
    Selected Work (S3)
    Anveksha · Aayaam · Tarka
         │
      Aryntra ↗
```

The two hidden-depth layers (`◈` and `◇`) are sibling interactions with identical architectural patterns but distinct visual positioning (left vs. right) and content purpose (tools vs. thinking).

---

## 11. Ancillary Fix — Aryntra Link

| Before | After |
|---|---|
| No `target` attribute | `target="_blank"` |
| No `rel` attribute | `rel="noopener noreferrer"` |
| No accessible label | `aria-label="Visit aryntra.com (opens in a new tab)"` |
| `<div>` wrapper | `<footer>` semantic element |

---

## 12. What Was Explicitly NOT Done

- ❌ No résumé timeline with dates
- ❌ No fabricated career milestones
- ❌ No proficiency levels or skill graphs
- ❌ No new CSS files (Tailwind only)
- ❌ No global state management
- ❌ No backend, database, API, or CMS
- ❌ No new npm dependencies
- ❌ No redesign of page shell, hero, or Selected Work
- ❌ No modification to HandsOnPanel or handsOn.js
- ❌ No sequential boot/typewriter animations
- ❌ No long-form essay content

---

## 13. Future Considerations

| Item | Sprint | Notes |
|---|---|---|
| CMS/Admin for evolution data | Future | `evolution.js` schema is admin-ready |
| Content refinement | Ongoing | Stage descriptions can be updated without touching UI |
| Animation polish | Optional | Current transitions are `opacity` + `translateY` only |
| Analytics on `◇` interaction | Future | Track engagement with evolution layer |

---

## 14. Conclusion

Sprint S5 successfully delivers the Builder Evolution layer as a compact, accessible, conceptually rigorous interaction that communicates builder maturity without resorting to conventional timeline patterns. The implementation maintains full architectural parity with S4, introduces zero technical debt, and preserves the portfolio's minimal aesthetic.

**S5 is complete and ready for production deployment.**

---

*Report generated from commit range `d898c8a..7420d88` on branch `main`.*