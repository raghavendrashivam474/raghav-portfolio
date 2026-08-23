# Sprint S1 — Engineering Report

**Project:** Evolution Portfolio (`evolution-portfolio`)
**Sprint:** S1 — Minimal Visual Foundation
**Date:** 2026-08-23
**Commit:** `a4fdbbd` on `main`
**Author:** Raghavendra Singh
**Status:** ✅ Complete, build-verified, ready for push

---

## 1. Executive Summary

S1 replaces the legacy visual system (emerald-green, terminal-aesthetic, glow-heavy) with a locked minimal design language built on Tailwind CSS v4's native `@theme` configuration. The sprint delivers a complete token system — colors, typography, spacing, surfaces, borders, interaction states, and responsive breakpoints — without modifying any component logic, data models, or deployment configuration.

The existing page remains fully functional. Components still render using their original inline styles. S1 only establishes the visual grammar that S2 through S6 will consume.

---

## 2. Technical Context & Pre-S1 State

### 2.1 Stack

| Layer | Version |
|---|---|
| React | 19.2.4 |
| ReactDOM | 19.2.4 |
| Vite | 8.0.3 |
| Tailwind CSS | 4.2.2 |
| PostCSS | 8.5.8 |
| Language | JavaScript / JSX (no TypeScript) |

### 2.2 Pre-S1 Tailwind Configuration (Hybrid / Broken)

The project had a **misconfigured hybrid setup** that was functioning only by accident:

- `src/index.css` used **v3-style directives**: `@tailwind base; @tailwind components; @tailwind utilities;`
- `postcss.config.js` loaded the **v4 plugin**: `@tailwindcss/postcss`
- `tailwind.config.js` defined v3-style color extensions (`dark: #0a0a0a`, `accent: #00ff88`, `dim: #1a1a1a`)

In Tailwind v4, `tailwind.config.js` is **not auto-discovered**. It requires an explicit `@config` directive in CSS, which was absent. This means the old color extensions (`bg-dark`, `text-accent`, `bg-dim`) were **already inert** before S1 began. No active component referenced them — all styling was hardcoded inline.

### 2.3 Pre-S1 Styling Patterns

The S0 audit identified ~700+ lines of inline styling across active components. Inspection confirmed:

- **App.jsx**: ~100% inline styles, synthetic `onMouseEnter`/`onMouseLeave` handlers on footer links
- **Human.jsx**: ~95% inline, one Tailwind class (`bg-emerald-400/5` — a built-in Tailwind color, not from the old config), emerald glow div, radial gradient background
- **Transformation.jsx**: 100% inline, synthetic hover state via `useState` + `onMouseEnter`/`onMouseLeave`
- **Humanoid.jsx**: 100% inline, heavy synthetic hover with `translateY`, `boxShadow`, and `borderColor` mutations
- **MissionCard.jsx**: 100% inline, `useState`-driven hover and expand states
- **Container.jsx**: The only component using Tailwind utilities properly (`mx-auto max-w-6xl px-6 sm:px-8 lg:px-16`)

### 2.4 Active vs. Dead Components

**Active** (imported in App.jsx): `Human`, `Transformation`, `Humanoid`, `MissionCard`, `Container`

**Dead** (present in repo, not imported): `AnimatedHeader`, `SystemBoot`, `SystemLogs`, `Transition`, `MissionLaunch`, `Section`, `Typewriter`, `typewriter/ScrollTrigger`, `typewriter/SequenceController`

S1 does not touch either set. Dead component removal is deferred to S2.

---

## 3. What S1 Changed

### 3.1 Files Modified

| File | Change | Lines |
|---|---|---|
| `src/index.css` | Complete rewrite: v3 directives → v4 `@import` + `@theme` + global styles | 340 lines (was ~30) |
| `tailwind.config.js` | Stripped legacy color extensions, added explanatory comments | 13 lines (was ~15) |

### 3.2 Files Created

| File | Purpose |
|---|---|
| `docs/sprints/S1-DESIGN-TOKENS.md` | Token reference for S2+ developers |
| `docs/sprints/S1-SPRINT-COMPLETION.md` | Sprint closure report |

### 3.3 Files NOT Changed (Deliberately)

- All `.jsx` components (active and dead)
- All data files (`projects.js`, `modules.js`, `operations.js`, `bootSequence.js`)
- `vite.config.js`, `postcss.config.js`, `index.html`
- `package.json` (no new dependencies)
- Deployment configuration, domain settings

---

## 4. Tailwind v4 Migration Details

### 4.1 The Core Change

**Before (v3 directives, partially broken under v4):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**After (v4 CSS-first):**
```css
@import "tailwindcss";
```

The single `@import "tailwindcss"` statement in v4 replaces all three v3 directives and automatically includes the base reset, component layer, and utility layer. This is the canonical v4 entry point.

### 4.2 The `@theme` Block

All design tokens are declared inside `@theme { }`, which is Tailwind v4's native CSS-first configuration mechanism. Tokens declared here automatically generate corresponding utility classes.

**Example mapping:**

| `@theme` Declaration | Generated Tailwind Classes |
|---|---|
| `--color-obsidian: #0D0E0C;` | `bg-obsidian`, `text-obsidian`, `border-obsidian` |
| `--color-oxide: #B85C38;` | `bg-oxide`, `text-oxide`, `border-oxide` |
| `--color-background: #0D0E0C;` | `bg-background`, `text-background`, `border-background` |
| `--font-sans: "Inter", ...;` | `font-sans` |
| `--font-mono: "JetBrains Mono", ...;` | `font-mono` |

### 4.3 Known Naming Caveat

Semantic tokens like `--color-text-primary` generate the class `text-text-primary` (the `text-` prefix is added by Tailwind's utility generator, and `text-primary` is the token name). This double-prefix is slightly verbose but unambiguous. The alternative — naming the token `--color-primary` — would create ambiguity with the palette color names. This is a deliberate tradeoff favoring clarity over brevity. S2 can evaluate whether to alias these.

### 4.4 `tailwind.config.js` Retention

The file is kept as a minimal stub with an empty `theme.extend` block. Rationale:

- Some IDE extensions (e.g., Tailwind CSS IntelliSense for VS Code) still read `tailwind.config.js` for autocomplete even in v4 projects
- The `content` array provides file-glob hints for the scanner
- It costs nothing to keep and prevents confusing "missing config" warnings in some tooling
- A comment explicitly directs developers to `src/index.css` for actual token definitions

---

## 5. Color System

### 5.1 Locked Palette

| Token | Hex | Role |
|---|---|---|
| `obsidian` | `#0D0E0C` | Page background |
| `ivory` | `#E8E3D8` | Primary text |
| `stone` | `#8D8A82` | Secondary text |
| `oxide` | `#B85C38` | Interactive accent (quiet signal) |
| `copper` | `#D17A52` | Hover/active emphasis |
| `graphite` | `#171916` | Elevated surfaces |
| `ash` | `#2A2C28` | Borders and dividers |

### 5.2 Accent Usage Philosophy

Oxide is **not** a dominant color. The site should read as predominantly monochromatic (obsidian + ivory + stone). Oxide appears only on interaction:

- **Default state**: No oxide visible. Monochrome.
- **Hover**: Oxide appears as a text color, border, or underline.
- **Active/pressed**: Copper replaces oxide for emphasis.

This is enforced by convention, not by code. S2+ developers must follow this hierarchy.

### 5.3 Legacy Emerald References

All `#34d399` / emerald references remain **inside component inline styles**, which S1 deliberately did not modify. These will be replaced during S2 (hero/nav) and S3 (project cards). The only emerald reference in CSS was the `::selection` background, which S1 replaced with `rgba(184, 92, 56, 0.3)`.

The `bg-emerald-400/5` class in `Human.jsx` continues to work because `emerald` is a **built-in Tailwind color**, not a custom config extension. It will be removed when Human.jsx is rewritten in S2.

---

## 6. Typography System

### 6.1 Font Stacks

- **Sans** (`--font-sans`): Inter → SF Pro Display → system-ui fallback chain. Used for all primary content.
- **Mono** (`--font-mono`): JetBrains Mono → SF Mono → Fira Code → Cascadia Code → ui-monospace. Used only for metadata, micro-labels, and technical indicators.

### 6.2 Scale

| Level | Size | Line Height | Letter Spacing | Weight | Font | Usage |
|---|---|---|---|---|---|---|
| Display | 3.5rem | 1.1 | -0.03em | 500 | Sans | Central identity ("raghu_007") |
| Heading | 1.75rem | 1.2 | -0.02em | 500 | Sans | Section titles ("SELECTED WORK") |
| Title | 1.25rem | 1.3 | -0.01em | 450 | Sans | Project names |
| Body | 1rem | 1.65 | normal | 400 | Sans | Descriptions, panel text |
| Metadata | 0.8125rem | 1.5 | +0.02em | 400 | Mono | Tech labels, status |
| Micro | 0.6875rem | 1.4 | +0.08em | 400 | Mono | Section labels, uppercase |

### 6.3 Responsive Scaling

At `≤1024px`: Display drops to 2.75rem, Heading to 1.5rem.
At `≤640px`: Display drops to 2rem, Heading to 1.25rem, Title to 1.125rem.

Scaling is implemented via CSS custom property overrides in media queries, not via Tailwind responsive prefixes. This keeps the typography system centralized and prevents scattered `md:text-4xl lg:text-5xl` patterns across components.

---

## 7. Spacing System

| Token | Value | Purpose |
|---|---|---|
| `--spacing-section` | 8rem | Between major page sections |
| `--spacing-block` | 4rem | Between content blocks within a section |
| `--spacing-element` | 2rem | Between related elements |
| `--spacing-inline` | 1.25rem | Inline gaps (tags, buttons) |
| `--spacing-tight` | 0.5rem | Compact spacing (icon + label) |

These are also responsive: section spacing compresses to 6rem → 4rem at smaller breakpoints.

The design intent is **generous whitespace**. The portfolio is a single-page composition where breathing room is a feature, not wasted space.

---

## 8. Interaction States

### 8.1 CSS Utility Classes

| Class | Behavior |
|---|---|
| `.interactive` | Base transition (200ms, quiet easing). Hover → oxide text. Active → copper text. |
| `.link-quiet` | Stone text → oxide on hover → copper on active. No underline. |
| `.link-accent` | Ivory text with ash underline → oxide text + oxide underline on hover. |

### 8.2 Focus States

```css
:focus-visible {
  outline: 1.5px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}
```

All `:focus` outlines are suppressed in favor of `:focus-visible` to avoid noisy outlines on mouse click while preserving keyboard accessibility.

### 8.3 What This Replaces

The old codebase used synthetic hover patterns like:

```jsx
onMouseEnter={(e) => { e.currentTarget.style.color = '#fff' }}
onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280' }}
```

These patterns are **not removed** in S1 (they live in component inline styles), but the new utility classes provide the declarative replacement that S2+ should use. The migration from synthetic to declarative hover happens as each component is rewritten.

---

## 9. Surfaces, Borders, and Layout

### 9.1 Surfaces

| Class | Background | Border | Radius | Usage |
|---|---|---|---|---|
| `.surface` | Graphite (`#171916`) | 1px Ash | 0.5rem | Cards, panels |
| `.surface-elevated` | `#1E201C` | 1px Ash | 0.5rem | Overlays, modals |

### 9.2 Borders

All structural borders use Ash (`#2A2C28`). This is deliberately low-contrast against the Obsidian background. The visitor should perceive structure without seeing a grid of boxes.

### 9.3 Layout Primitives

| Class | Purpose |
|---|---|
| `.viewport-container` | Full-viewport flex column (`min-height: 100dvh`) |
| `.content-frame` | Centered content, `max-width: 72rem`, responsive padding |

---

## 10. Selection Styling

**Before:** `background: #34d399; color: #000;` (bright emerald, black text)

**After:** `background-color: rgba(184, 92, 56, 0.3); color: var(--color-ivory);` (subtle oxide tint, warm ivory text)

The selection state is visible but quiet. It doesn't introduce a new color — it uses the locked accent at reduced opacity.

---

## 11. Preserved Legacy

### 11.1 `blink` Keyframe

The `@keyframes blink` animation is retained in `index.css`. It was part of the old typewriter cursor system. Per S0 guidance, it is not deleted because:

1. Dead components that reference it still exist in the repo
2. Removing it could cause silent CSS warnings if any component is temporarily reactivated during S2 transition
3. Actual cleanup belongs to S2's dead-component removal pass

A comment marks it for future removal.

### 11.2 Component Inline Styles

All ~700+ lines of inline styling across active components remain untouched. S1 is a foundation sprint, not a component rewrite. The inline styles will be replaced incrementally as S2–S6 rebuild each component using the new token system.

---

## 12. Build Verification

### 12.1 Lint

```
npm run lint → eslint . → 0 errors, 0 warnings
```

### 12.2 Build

```
npm run build → vite build
  ✓ 21 modules transformed
  dist/index.html                  0.63 kB │ gzip:  0.37 kB
  dist/assets/index-9CctLbY2.css  19.40 kB │ gzip:  4.67 kB
  dist/assets/index-D4KUwFj3.js  221.09 kB │ gzip: 67.89 kB
  ✓ built in 1.10s
```

CSS bundle increased from ~16.8 kB to ~19.4 kB (gzip: 4.31 → 4.67 kB). This is the cost of the new token system and utility classes. Negligible in production.

### 12.3 Git

```
git diff --check → clean (after CRLF normalization)
git status → nothing to commit, working tree clean
```

---

## 13. Known Issues & Caveats

### 13.1 CRLF / LF Line Endings

The development environment is Windows (PowerShell), which produces CRLF line endings. Git reports `LF will be replaced by CRLF` warnings. This is cosmetic and does not affect functionality. If the team standardizes on LF via `.gitattributes`, that should be done in a separate housekeeping commit, not during a feature sprint.

### 13.2 Double-Prefix Token Names

As noted in Section 4.3, semantic tokens like `--color-text-primary` produce the class `text-text-primary`. This is functional and unambiguous but slightly verbose. If this becomes annoying during S2+, the tokens can be renamed to `--color-fg-primary` (producing `text-fg-primary`) or similar. Not urgent.

### 13.3 No Visual Change to Existing Components

The page will look **almost identical** after S1. The body background shifts from `#0a0a0a` to `#0D0E0C` (imperceptible), body text shifts from `#fafafa` to `#E8E3D8` (slightly warmer), and text selection changes from green to oxide. All emerald glows, badges, and neon accents in components remain because those are inline styles. This is correct and intentional.

### 13.4 Font Loading

The `--font-sans` stack references "Inter" and the `--font-mono` stack references "JetBrains Mono", but neither font is currently loaded via `@font-face` or a CDN link in `index.html`. The system will fall back to system fonts. If the design requires Inter/JetBrains Mono to be loaded explicitly, that should be added in S2 when the hero composition is built.

---

## 14. S2 Handoff Checklist

The S2 developer can begin immediately with:

- [x] Color tokens available as Tailwind classes (`bg-obsidian`, `text-ivory`, `border-ash`, `text-oxide`, etc.)
- [x] Semantic tokens available (`bg-background`, `bg-surface`, `text-text-primary`, `text-text-secondary`, `border-border`, `text-accent`)
- [x] Typography classes ready (`.text-display`, `.text-heading`, `.text-title`, `.text-body`, `.text-meta`, `.text-micro`)
- [x] Spacing tokens available as CSS variables (`var(--spacing-section)`, etc.)
- [x] Surface classes ready (`.surface`, `.surface-elevated`, `.divider`)
- [x] Interaction classes ready (`.interactive`, `.link-quiet`, `.link-accent`)
- [x] Layout primitives ready (`.viewport-container`, `.content-frame`)
- [x] Focus-visible states globally defined
- [x] Selection styling updated
- [x] Responsive breakpoints established
- [x] Token reference documented in `docs/sprints/S1-DESIGN-TOKENS.md`

**S2's primary responsibilities will be:**
1. Remove dead components (SystemBoot, AnimatedHeader, etc.)
2. Build the new MinimalHero using `.text-display`, `bg-background`, `text-text-primary`
3. Replace the old nav with corner controls (`◈` `◇`)
4. Begin migrating inline styles to Tailwind tokens in active components
5. Load Inter + JetBrains Mono fonts if required

---

## 15. Commit History

```
a4fdbbd (HEAD → main) feat(s1): establish minimal visual foundation
02d7bea (origin/main) docs(s0): add architecture audit sprint brief
ba30caf docs(s0): add architecture audit and transformation blueprint
49d008e fix: correct Dev-Vault technology metadata
```

---

**End of S1 Engineering Report.**