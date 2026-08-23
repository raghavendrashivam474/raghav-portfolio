// src/data/handsOn.js
// Evidence-backed Hands-on data layer.
// Source of truth: verified project implementations across Aryntra & previous systems.
// No proficiency bars, percentages, or expertise claims.

export const handsOn = [
  {
    id: "languages",
    category: "Languages",
    description: "Core syntax and runtime environments utilized across systems and applications.",
    technologies: [
      { name: "C++", evidence: ["System Foundations"], detail: "Low-level system concepts and performance-critical logic." },
      { name: "Python", evidence: ["Aryntra Anveksha", "Aryntra Backtrace"], detail: "FastAPI backends, SQLAlchemy ORM, data pipelines, and Pytest." },
      { name: "JavaScript", evidence: ["Dev-Vault", "Syaahi"], detail: "Async runtime, DOM APIs, IndexedDB storage, and Node.js servers." },
      { name: "TypeScript", evidence: ["Aryntra Anveksha", "Aryntra Tarka"], detail: "Strict type contracts across Next.js, React, and API clients." },
      { name: "Go", evidence: ["Aryntra Aayaam"], detail: "Lightweight CLI binaries, file inspection, and concurrency." }
    ]
  },
  {
    id: "web-apps",
    category: "Applications & Web",
    description: "Frameworks and UI/UX engines for client and server-side applications.",
    technologies: [
      { name: "React", evidence: ["Aryntra Anveksha", "Aryntra Tarka", "GradeFlow"], detail: "Declarative component trees, custom hooks, and state management." },
      { name: "Next.js", evidence: ["Aryntra Anveksha"], detail: "App router architecture, SSR/SSG patterns, and API routes." },
      { name: "Vite", evidence: ["Aryntra Tarka"], detail: "Ultra-fast frontend bundling and HMR development setup." },
      { name: "FastAPI", evidence: ["Aryntra Anveksha", "Aryntra Tarka"], detail: "Async REST APIs, OpenAPI schema validation, and SSE streaming." },
      { name: "Node.js", evidence: ["Syaahi"], detail: "Backend services, filesystem operations, and HTTP servers." },
      { name: "Express", evidence: ["Syaahi"], detail: "RESTful route handlers and middleware pipelines." },
      { name: "Tailwind CSS", evidence: ["Aryntra Anveksha", "Aryntra Tarka"], detail: "Utility-first design systems and custom theme tokens." }
    ]
  },
  {
    id: "data",
    category: "Data Infrastructure",
    description: "Relational, embedded, and local-first data storage systems.",
    technologies: [
      { name: "PostgreSQL", evidence: ["Aryntra Anveksha"], detail: "Relational schemas, indexes, and complex analytical queries." },
      { name: "SQLite", evidence: ["Aryntra Tarka"], detail: "Embedded zero-config local database for persistent AI history." },
      { name: "IndexedDB", evidence: ["Dev-Vault"], detail: "Client-side offline browser storage for structured records." },
      { name: "Supabase", evidence: ["GradeFlow"], detail: "Postgres backend-as-a-service, auth, and real-time data." },
      { name: "SQLAlchemy", evidence: ["Aryntra Anveksha"], detail: "Python ORM model definitions, migrations, and session management." }
    ]
  },
  {
    id: "ai-ml",
    category: "AI & Machine Learning",
    description: "Local-first LLM inference, autonomous agents, and RAG pipelines.",
    technologies: [
      { name: "Ollama", evidence: ["Aryntra Anveksha", "Aryntra Tarka"], detail: "Local LLM runner for privacy-first, offline inference models." },
      { name: "OpenAI SDK", evidence: ["Aryntra Anveksha"], detail: "Structured JSON outputs, function calling, and provider fallbacks." },
      { name: "RAG", evidence: ["Aryntra Anveksha"], detail: "Retrieval-augmented generation for contextual domain knowledge." },
      { name: "Embeddings", evidence: ["Aryntra Anveksha"], detail: "Vector embeddings for semantic search and document retrieval." },
      { name: "LLM Integration", evidence: ["Aryntra Backtrace"], detail: "Root cause analysis and structured explanation generation." }
    ]
  },
  {
    id: "systems",
    category: "Systems & Architecture",
    description: "CLI architecture, terminal output design, and system boundaries.",
    technologies: [
      { name: "Go CLI", evidence: ["Aryntra Aayaam"], detail: "POSIX-compliant argument parsing, flags, and binary execution." },
      { name: "Terminal Architecture", evidence: ["Aryntra Aayaam"], detail: "Formatted stdout/stderr streams and interactive shell interfaces." },
      { name: "JSON Output Engine", evidence: ["Aryntra Aayaam"], detail: "Deterministic machine-readable JSON pipeline for CI/CD." },
      { name: "Modular Architecture", evidence: ["Aryntra Anveksha", "Aryntra Tarka"], detail: "Clean separation between domain logic, persistence, and UI." }
    ]
  },
  {
    id: "tooling",
    category: "Workflow & Tooling",
    description: "Version control, testing suites, containerization, and API inspection.",
    technologies: [
      { name: "Git & GitHub", evidence: ["All Repositories"], detail: "Branching strategies, CI work, and release tag management." },
      { name: "Pytest & Jest", evidence: ["Aryntra Anveksha"], detail: "Automated unit and integration testing across frontend & backend." },
      { name: "Docker", evidence: ["System Foundations"], detail: "Containerized application environments and local orchestration." },
      { name: "Postman & HTTP", evidence: ["All Backends"], detail: "API endpoint testing, header inspection, and payload verification." }
    ]
  }
]