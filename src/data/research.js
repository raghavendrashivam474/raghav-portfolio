// src/data/research.js
// S14: Active Research Systems Data Layer
// Source of truth for ongoing system explorations and investigations.
// No fabricated publications, metrics, or claims.

export const researchSystems = [
  {
    id: "synapse",
    number: "01",
    name: "Aryntra Synapse",
    shortName: "SYNAPSE",
    category: "RESEARCH",
    status: "ACTIVE · RESEARCH",
    tagline: "Knowledge & intelligence infrastructure",
    description: "Investigating distributed knowledge synthesis, vector indexing, and memory persistence models for local-first intelligence systems.",
    focus: ["Knowledge Graphing", "Intelligence Indexing", "Local Memory Persistence"],
    link: "https://github.com/raghavendrashivam474/aryntra-synapse"
  },
  {
    id: "continuumx",
    number: "02",
    name: "ContinuumX",
    shortName: "CONTINUUMX",
    category: "RESEARCH",
    status: "ACTIVE · RESEARCH",
    tagline: "Experimental systems research",
    description: "Exploring system continuity, context decay mitigation, evaluation boundaries, and research environment state preservation.",
    focus: ["Context Decay Mitigation", "Decision Archaeology", "State Preservation"],
    link: "https://github.com/raghavendrashivam474/Aryntra-ContinuumX"
  },
  {
    id: "refracto",
    number: "03",
    name: "Aryntra Refracto",
    shortName: "REFRACTO",
    category: "RESEARCH",
    status: "ACTIVE · RESEARCH",
    tagline: "Context continuity & verified state",
    description: "Investigating minimum-sufficient verified context preservation required for human-AI collaborative workflows and agent execution.",
    focus: ["Verified State Contracts", "Minimum Context Preservation", "Human-AI Handoffs"],
    link: "https://github.com/raghavendrashivam474/aryntra-refracto"
  }
  ,{
    id: "madhav",
    number: "04",
    name: "Madhav",
    shortName: "MADHAV",
    category: "RESEARCH",
    status: "ACTIVE · RESEARCH",
    tagline: "Knowledge & intelligence substrate",
    description: "Exploring structured knowledge, entity memory, provenance, claims, relationships, temporal state, resolution, retrieval, and reasoning infrastructure for reliable intelligence systems.",
    focus: ["Entity Memory", "Provenance", "Reasoning Infrastructure"],
    link: "https://github.com/raghavendrashivam474/madhav-knowledge-explorer"
  }
]

export const researchMeta = {
  heading: "RESEARCH LAB",
  framing: "Current questions, experiments, and systems under study.",
  subtitle: "Investigating what systems should become next. Questions before conclusions.",
  direction: `${String(researchSystems.length).padStart(2, "0")} Active Investigations`
}


