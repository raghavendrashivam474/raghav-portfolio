// ============================================================
// src/data/projects.js
// SINGLE SOURCE OF TRUTH for all mission and project data.
//
// Content is verified against current public repositories.
// Source of truth hierarchy:
//   Actual repository → Current README → Current implementation → this file
// ============================================================

export const activeMissions = [
  {
    id: "01",
    title: "Aryntra Anveksha",
    tagline: "AI-Powered Preventive Health Screening Platform",
    preview: [
      "Patient management and persistent patient records",
      "Structured screening sessions with deterministic risk assessment",
      "AI-generated health insights and personalized recommendations",
      "Provider-agnostic AI architecture (Ollama, OpenAI, Mock)",
      "Health dashboard with KPI, demographic, risk, and trend analytics",
      "Audit events, persistent audit records, and read-only audit API"
    ],
    problem:
      "Preventive health screening requires structured assessment and reliable risk classification, while users also need understandable insights and recommendations. The system addresses this by combining deterministic screening decisions with AI-assisted explanations and recommendations while keeping the deterministic engine as the source of truth.",
    solution:
      "Anveksha is a production-oriented preventive health screening platform that lets users complete structured screenings, produces deterministic risk assessments, and augments those results with validated AI-generated health insights and personalized recommendations. It also provides analytics, reporting infrastructure, and auditability around the screening workflow.",
    tech: [
      "Python 3",
      "FastAPI",
      "SQLAlchemy",
      "Pydantic",
      "Pytest",
      "Ollama",
      "OpenAI SDK",
      "Next.js 14",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Jest",
      "React Testing Library"
    ],
    impact:
      "v0.9.4 — M9.4 Dashboard Analytics. M1–M9.4 completed. 1126 backend tests passed, 132 frontend tests passed, frontend production build passed. Next: M9.5 Reports UI → M9.6 Audit UI.",
    status: "ACTIVE — M9.4 Complete",
    github: "https://github.com/raghavendrashivam474/Aryntra_Anveksha",
    apk: ""
  },
  {
    id: "02",
    title: "Aryntra Aayaam",
    tagline: "Developer Project Awareness CLI",
    preview: [
      "CLI foundation and application entry point",
      "CLI argument parsing",
      "Version and help commands",
      "Terminal and JSON-oriented output architecture",
      "Project-awareness architecture prepared for subsequent analysis capabilities"
    ],
    problem:
      "Developers need a quick way to understand the current state of a software project without manually inspecting its structure and metadata.",
    solution:
      "Aayaam is a lightweight developer utility CLI designed to provide project awareness. The current release establishes the CLI foundation; deeper project analysis and inspection capabilities are planned for subsequent sprints.",
    tech: [
      "Go",
      "Go CLI",
      "Terminal Output",
      "JSON Output Architecture"
    ],
    impact:
      "v1.0.0 — Sprint 1: Foundation. CLI operational. Project analysis begins in Sprint 2.",
    status: "ACTIVE — Foundation",
    github: "https://github.com/raghavendrashivam474/aryntra-aayaam",
    apk: ""
  },
  {
    id: "03",
    title: "Aryntra Tarka",
    tagline: "Transparent Local-First AI Agent",
    preview: [
      "Natural-language request understanding",
      "Autonomous multi-step planning",
      "Structured execution planning and transparent tool execution",
      "Extensible tool registry (Calculator, Date & Time, Filesystem)",
      "Real-time response streaming through SSE",
      "Persistent conversation history and local AI via Ollama"
    ],
    problem:
      "AI applications that simply forward prompts to a language model provide limited visibility into how a request is planned and executed. Tarka addresses the need for a local-first agent architecture where planning, tool invocation, execution, and resulting responses are explicit and observable.",
    solution:
      "Tarka is a local-first autonomous AI agent that converts natural-language requests into structured execution plans, invokes the required tools, collects execution results, streams the response, and persists conversation history. Its architecture separates the planner, runtime, tool registry, memory, and LLM provider.",
    tech: [
      "FastAPI",
      "React",
      "TypeScript",
      "Vite",
      "Ollama",
      "SQLite",
      "Server-Sent Events",
      "Tailwind CSS"
    ],
    impact:
      "v1.0.0 — Stable. Autonomous planning, local-first AI, tool execution, SQLite persistence, and streaming responses complete. Planned: Web Search, RAG, File Understanding, Plugin System, Multi-provider Support, Voice Interaction.",
    status: "ACTIVE — Stable",
    github: "https://github.com/raghavendrashivam474/aryntra-tarka",
    apk: ""
  }
]

// ============================================================
// PROJECT ARCHIVE — previous, experimental, and supporting work.
// 8 Verified Repositories (OS-01 to OS-08).
// ============================================================

export const otherSystems = [
  {
    id: "OS-01",
    title: "Syaahi",
    tagline: "Poetry platform for writers and readers",
    status: "PREVIOUS",
    kind: "PRODUCT",
    tech: "Flutter Web · Node.js",
    github: "https://github.com/raghavendrashivam474/syaahi",
    apk: ""
  },
  {
    id: "OS-02",
    title: "Dev-Vault",
    tagline: "Developer resource organization and retrieval system",
    status: "PREVIOUS",
    kind: "UTILITY",
    tech: "Vanilla JavaScript · IndexedDB",
    github: "https://github.com/raghavendrashivam474/dev-vault",
    apk: ""
  },
  {
    id: "OS-03",
    title: "Backtrace",
    tagline: "Automated error tracing and root cause analysis",
    status: "EXPERIMENTAL",
    kind: "RESEARCH",
    tech: "Python · Log Analysis · LLM Integration",
    github: "https://github.com/raghavendrashivam474/Aryntra-Backtrace",
    apk: ""
  },
  {
    id: "OS-04",
    title: "GradeFlow",
    tagline: "Academic performance tracking and analytics",
    status: "PREVIOUS",
    kind: "PRODUCT",
    tech: "React · Supabase · Data Visualization",
    github: "https://github.com/raghavendrashivam474/GradeFlow",
    apk: ""
  },
  {
    id: "OS-05",
    title: "Schedulr",
    tagline: "Automated task and resource scheduling engine",
    status: "PREVIOUS",
    kind: "UTILITY",
    tech: "Python · Algorithm Architecture",
    github: "https://github.com/raghavendrashivam474/Schedulr",
    apk: ""
  },
  {
    id: "OS-06",
    title: "Vinyasa",
    tagline: "Flow state productivity and workspace coordinator",
    status: "EXPERIMENTAL",
    kind: "PRODUCT",
    tech: "React · TypeScript · Local State",
    github: "https://github.com/raghavendrashivam474/Vinyasa",
    apk: ""
  },
  {
    id: "OS-07",
    title: "SecureVaultPlatform",
    tagline: "Cryptographic storage and access control system",
    status: "PREVIOUS",
    kind: "SECURITY",
    tech: "Go · Cryptography · Access Control",
    github: "https://github.com/raghavendrashivam474/SecureVaultPlatform",
    apk: ""
  },
  {
    id: "OS-08",
    title: "Anubhav",
    tagline: "Experiential learning and skill reflection tracker",
    status: "PREVIOUS",
    kind: "SYSTEM",
    tech: "Python · FastAPI · Database Schema",
    github: "https://github.com/raghavendrashivam474/Anubhav",
    apk: ""
  }
]