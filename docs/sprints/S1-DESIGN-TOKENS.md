# S1 — Design Tokens Reference

## Color Palette

| Token      | Name             | Hex       | Tailwind Classes           | Usage                |
| ---------- | ---------------- | --------- | -------------------------- | -------------------- |
| `obsidian` | Obsidian         | `#0D0E0C` | `bg-obsidian`              | Main background      |
| `ivory`    | Warm Ivory       | `#E8E3D8` | `text-ivory`               | Primary text         |
| `stone`    | Stone            | `#8D8A82` | `text-stone`               | Secondary text       |
| `oxide`    | Oxide            | `#B85C38` | `text-oxide`, `bg-oxide`   | Primary accent       |
| `copper`   | Burnished Copper | `#D17A52` | `text-copper`, `bg-copper` | Accent hover         |
| `graphite` | Graphite         | `#171916` | `bg-graphite`              | Elevated surfaces    |
| `ash`      | Ash              | `#2A2C28` | `border-ash`, `bg-ash`     | Borders/dividers     |

## Semantic Tokens

| Token              | Maps To  | Tailwind Classes              |
| ------------------ | -------- | ----------------------------- |
| `background`       | obsidian | `bg-background`               |
| `surface`          | graphite | `bg-surface`                  |
| `surface-elevated` | —        | `bg-surface-elevated`         |
| `text-primary`     | ivory    | `text-text-primary`           |
| `text-secondary`   | stone    | `text-text-secondary`         |
| `text-muted`       | —        | `text-text-muted`             |
| `border`           | ash      | `border-border`               |
| `accent`           | oxide    | `text-accent`, `bg-accent`    |
| `accent-hover`     | copper   | `text-accent-hover`           |

## Typography

| Level    | Size      | Weight | Font | Class           | Usage            |
| -------- | --------- | ------ | ---- | --------------- | ---------------- |
| Display  | 3.5rem    | 500    | Sans | `.text-display` | Central identity |
| Heading  | 1.75rem   | 500    | Sans | `.text-heading` | Section titles   |
| Title    | 1.25rem   | 450    | Sans | `.text-title`   | Project titles   |
| Body     | 1rem      | 400    | Sans | `.text-body`    | Descriptions     |
| Metadata | 0.8125rem | 400    | Mono | `.text-meta`    | Tech labels      |
| Micro    | 0.6875rem | 400    | Mono | `.text-micro`   | Section labels   |

## Spacing

| Token     | Value   | Usage                    |
| --------- | ------- | ------------------------ |
| `section` | 8rem    | Between major sections   |
| `block`   | 4rem    | Between content blocks   |
| `element` | 2rem    | Between related elements |
| `inline`  | 1.25rem | Inline gaps              |
| `tight`   | 0.5rem  | Compact spacing          |

## Interaction States

| State            | Behavior                        |
| ---------------- | ------------------------------- |
| Default          | Quiet, monochromatic            |
| `:hover`         | Oxide signal appears            |
| `:active`        | Copper emphasis                 |
| `:focus-visible` | 1.5px oxide outline, 3px offset |

## Utility Classes

| Class                 | Purpose                      |
| --------------------- | ---------------------------- |
| `.surface`            | Graphite bg + ash border     |
| `.surface-elevated`   | Darker surface + ash border  |
| `.divider`            | Horizontal ash rule          |
| `.interactive`        | Transition + hover accent    |
| `.link-quiet`         | Stone to oxide link          |
| `.link-accent`        | Underlined to oxide link     |
| `.viewport-container` | Full-height flex column      |
| `.content-frame`      | Centered max-width container |
