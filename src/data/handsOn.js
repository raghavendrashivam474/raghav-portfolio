// src/data/handsOn.js
// S10: Living Current Stack Data Model
// Focuses on what is actively being built with.
// Evidence is retained but moved to a secondary inspection layer.

export const currentStack = [
  {
    id: "01",
    category: "Languages",
    items: [
      { name: "TypeScript", evidence: ["Aryntra Anveksha", "Aryntra Tarka"] },
      { name: "Python",     evidence: ["Aryntra Anveksha", "Aryntra Backtrace"] },
      { name: "Go",         evidence: ["Aryntra Aayaam"] },
      { name: "C++",        evidence: ["System Foundations"] }
    ]
  },
  {
    id: "02",
    category: "Build",
    items: [
      { name: "React",   evidence: ["Aryntra Anveksha", "Aryntra Tarka", "GradeFlow"] },
      { name: "Next.js", evidence: ["Aryntra Anveksha"] },
      { name: "FastAPI", evidence: ["Aryntra Anveksha", "Aryntra Tarka"] },
      { name: "Node.js", evidence: ["Syaahi"] }
    ]
  },
  {
    id: "03",
    category: "Data",
    items: [
      { name: "PostgreSQL", evidence: ["Aryntra Anveksha"] },
      { name: "SQLite",     evidence: ["Aryntra Tarka"] },
      { name: "Supabase",   evidence: ["GradeFlow"] }
    ]
  },
  {
    id: "04",
    category: "AI",
    items: [
      { name: "Ollama",     evidence: ["Aryntra Anveksha", "Aryntra Tarka"] },
      { name: "RAG",        evidence: ["Aryntra Anveksha"] },
      { name: "OpenAI SDK", evidence: ["Aryntra Anveksha"] }
    ]
  },
  {
    id: "05",
    category: "Systems & Tooling",
    items: [
      { name: "Docker",           evidence: ["System Foundations"] },
      { name: "Git & GitHub",     evidence: ["All Repositories"] },
      { name: "CLI Architecture", evidence: ["Aryntra Aayaam"] }
    ]
  }
]