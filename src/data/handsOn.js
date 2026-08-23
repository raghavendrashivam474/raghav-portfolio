// src/data/handsOn.js
// S6 Hands-on data layer: communicates range, paradigms, and practical exposure.
// Source of truth: verified project implementations and core engineering work.
// No proficiency bars, percentages, or expertise claims.

export const handsOn = [
  {
    category: "Languages",
    technologies: [
      "C++",
      "Python",
      "JavaScript",
      "TypeScript",
      "Go"
    ]
  },
  {
    category: "Web & Applications",
    technologies: [
      "React",
      "Next.js",
      "Vite",
      "FastAPI",
      "Node.js",
      "Express",
      "Tailwind CSS"
    ]
  },
  {
    category: "Data",
    technologies: [
      "PostgreSQL",
      "SQLite",
      "IndexedDB",
      "Supabase",
      "SQLAlchemy"
    ]
  },
  {
    category: "AI",
    technologies: [
      "Ollama",
      "OpenAI SDK",
      "RAG",
      "Embeddings",
      "LLM Integration"
    ]
  },
  {
    category: "Systems & Tooling",
    technologies: [
      "Go CLI",
      "Terminal Architecture",
      "JSON Output Engine",
      "Modular Architecture"
    ]
  }
]

// Internal audit mapping to project evidence
export const handsOnEvidence = {
  "C++": ["System Foundations"],
  "Python": ["01", "OS-03"],
  "JavaScript": ["OS-02"],
  "TypeScript": ["01", "03"],
  "Go": ["02"],
  "React": ["01", "03", "OS-04"],
  "Next.js": ["01"],
  "Vite": ["03"],
  "FastAPI": ["01", "03"],
  "Node.js": ["OS-01"],
  "Express": ["OS-01"],
  "Tailwind CSS": ["01", "03"],
  "PostgreSQL": ["01"],
  "SQLite": ["03"],
  "IndexedDB": ["OS-02"],
  "Supabase": ["OS-04"],
  "SQLAlchemy": ["01"],
  "Ollama": ["01", "03"],
  "OpenAI SDK": ["01"],
  "RAG": ["01"],
  "Embeddings": ["01"],
  "LLM Integration": ["OS-03"],
  "Go CLI": ["02"],
  "Terminal Architecture": ["02"],
  "JSON Output Engine": ["02"],
  "Modular Architecture": ["01", "03"]
}
