// S4 Hands-on data layer
// Source of truth: actual project implementations in projects.js
// No expertise claims. No proficiency ratings. Evidence only.

export const handsOn = [
  {
    category: "Frontend",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Vanilla JavaScript",
      "Flutter Web"
    ]
  },
  {
    category: "Backend",
    technologies: [
      "Python",
      "FastAPI",
      "Node.js",
      "Go"
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
      "LLM Integration",
      "RAG"
    ]
  },
  {
    category: "Systems",
    technologies: [
      "Go CLI",
      "Terminal Architecture",
      "JSON Output Engine"
    ]
  }
];

// Internal audit trail — maps technologies to project evidence.
// Not rendered in UI. Exists so metadata stays verifiable.
export const handsOnEvidence = {
  "React": ["01", "03", "OS-04"],
  "Next.js": ["01"],
  "TypeScript": ["01", "03"],
  "Vite": ["03"],
  "Tailwind CSS": ["01", "03"],
  "Vanilla JavaScript": ["OS-02"],
  "Flutter Web": ["OS-01"],
  "Python": ["01", "OS-03"],
  "FastAPI": ["01", "03"],
  "Node.js": ["OS-01"],
  "Go": ["02"],
  "PostgreSQL": ["01"],
  "SQLite": ["03"],
  "IndexedDB": ["OS-02"],
  "Supabase": ["OS-04"],
  "SQLAlchemy": ["01"],
  "Ollama": ["01", "03"],
  "OpenAI SDK": ["01"],
  "LLM Integration": ["OS-03"],
  "RAG": ["01"],
  "Go CLI": ["02"],
  "Terminal Architecture": ["02"],
  "JSON Output Engine": ["02"]
};
