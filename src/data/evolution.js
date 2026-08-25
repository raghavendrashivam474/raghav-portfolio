// src/data/evolution.js
// Builder evolution stages — focusing on shift in mental models over chronology.
// S11: One-stage-at-a-time progression with richer narrative hierarchy.

export const evolutionStages = [
  {
    id: 'making-things',
    number: '01',
    title: 'Making things',
    headline: 'Curiosity came first.',
    description:
      'Build something. Break it. Try again. Learn by touching the system before trying to master it.',
    orientation: 'EXPERIMENTATION',
    tags: ['Curiosity Driven', 'Rapid Prototypes', 'Trial & Error'],
  },
  {
    id: 'understanding-how-they-work',
    number: '02',
    title: 'Understanding how they work',
    headline: '"It works" wasn\'t enough.',
    description:
      'I started looking beneath the surface — mechanisms, failure modes, and why things behaved the way they did.',
    orientation: 'MECHANISMS',
    tags: ['Internal Mechanics', 'Debugging', 'Core Principles'],
  },
  {
    id: 'designing-systems',
    number: '03',
    title: 'Designing systems',
    headline: 'Pieces became systems.',
    description:
      'Components, boundaries, contracts, and trade-offs started mattering as much as implementation itself.',
    orientation: 'BOUNDARIES · TRADE-OFFS · COMPOSITION',
    tags: ['Component Boundaries', 'Trade-off Analysis', 'Modular Architecture'],
  },
  {
    id: 'thinking-in-products',
    number: '04',
    title: 'Thinking in products',
    headline: 'Not everything worth building should be built.',
    description:
      'The question shifted from "Can I build it?" to "Should this exist, and who does it serve?"',
    orientation: 'PROBLEM → USER → SYSTEM',
    tags: ['User Value', 'Product Fit', 'Problem Framing'],
  },
  {
    id: 'building-with-intent',
    number: '05',
    title: 'Building with intent',
    headline: 'Build deliberately.',
    description:
      'Evidence, constraints, users, and long-term consequences increasingly shape what gets built and why.',
    orientation: 'EVIDENCE → SYSTEM → INTENT',
    tags: ['Deliberate Code', 'Evidence First', 'Long-term Resilience'],
  },
]

export const evolutionMeta = {
  heading: 'EVOLUTION',
  framing: 'How I build has changed.',
  subtitle: 'A continuous shift in how I think about problems, systems, and what is worth building.',
  direction: 'A direction, not a destination.',
}