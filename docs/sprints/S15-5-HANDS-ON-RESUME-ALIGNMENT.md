# Sprint S15.5 — Hands-on Skills Alignment (Resume v2.2 Sync)
**Sprint**: S15.5  
**Title**: Hands-on Skills Alignment & Resume v2.2 Synchronization  
**Type**: Frontend Content & Technical Authority Alignment  
**Target Reference**: Resume v2.2 Authoritative Technical Skills  
**Status**: COMPLETED  

---

## 1. Objective

Synchronized the portfolio's **Hands-On** overlay panel with the authoritative **Technical Skills** section of **Resume v2.2**.

### Core Principle
> *The resume and portfolio must present one consistent engineering identity. The portfolio may provide interactive evidence and architectural context, but its technical skills must never contradict the resume.*

---

## 2. Six Authoritative Categories & Technology Matrix

The previous 5-category structure has been updated to the exact 6-category structure defined in Resume v2.2:

| # | Category | Technologies Listed | Evidence & Context |
| :---: | :--- | :--- | :--- |
| **01** | **LANGUAGES** | `Python`, `TypeScript`, `Dart`, `C#`, `SQL`, `Rust*` | • **Dart**: Nomad, Syaahi App<br>• **Python**: Aryntra Synapse, Shyam<br>• **C#**: Workgrid Platform<br>• **TypeScript**: Syaahi Backend API<br>• **SQL**: SQLite, EF Core, Prisma, Drift<br>• **Rust\***: *Developing systems-programming capability* |
| **02** | **BACKEND & SYSTEMS** | `FastAPI`, `.NET 8`, `Express.js`, `Node.js`, `REST APIs`, `Local-First Architecture` | • **FastAPI**: Synapse, Shyam<br>• **.NET 8**: Workgrid API (ASP.NET Core)<br>• **Express.js / Node.js**: Syaahi Backend<br>• **REST APIs**: Workgrid, Synapse, Syaahi, Shyam<br>• **Local-First Architecture**: Nomad, Workgrid, Syaahi, Shyam |
| **03** | **DATA & STORAGE** | `PostgreSQL`, `SQLite`, `EF Core`, `Prisma`, `Supabase`, `FAISS` | • **PostgreSQL**: Relational schemas<br>• **SQLite**: Local-first embedded persistence (Nomad, Workgrid, Syaahi)<br>• **EF Core**: Relational ORM (Workgrid)<br>• **Prisma**: Type-safe ORM & migrations (Syaahi)<br>• **Supabase**: Cloud database & storage client (Syaahi)<br>• **FAISS**: Dense vector index & similarity search (Synapse) |
| **04** | **INFRASTRUCTURE & DEVOPS** | `Docker`, `Docker Compose`, `GitHub Actions`, `CI`, `CI/CD Fundamentals` | • **Docker & Docker Compose**: Containerization and multi-service local orchestration<br>• **GitHub Actions & CI**: Automated CI workflows, linting & build verification<br>• **CI/CD Fundamentals**: Continuous integration & delivery pipelines |
| **05** | **AI ENGINEERING** | `RAG Pipelines`, `Vector Indexing`, `Transformers`, `Ollama`, `NetworkX` | • **RAG Pipelines**: Adaptive context engineering & progressive expansion (Synapse)<br>• **Vector Indexing**: Dense similarity indexing & memory persistence (Synapse)<br>• **Transformers**: Embedding models & tokenizers (Synapse)<br>• **Ollama**: Local LLM inference engine (Synapse)<br>• **NetworkX**: Structured knowledge graph & memory modeling (Synapse) |
| **06** | **DEVELOPER TOOLING** | `Git`, `GitHub`, `CLI Tooling`, `Cryptography`, `Linux` | • **Git & GitHub**: Distributed version control & repo management across all codebases<br>• **CLI Tooling**: CLI entrypoint architecture (Shyam CLI, Typer/Click)<br>• **Cryptography**: Key derivation, auth & payload signing (Shyam)<br>• **Linux**: Development and runtime environment |

*\*Rust Qualification*: Explicitly noted in the technology item (`Rust*`), within the evidence drawer, and in the panel footer as a developing systems-programming capability.

---

## 3. UI & Responsive Implementation

- **Grid Sizing**: Rendered via responsive 2-column grid (`grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10 sm:gap-y-12`), fitting 6 balanced cards (3 rows of 2 on desktop; 6 single-column cards on mobile).
- **Interactive Drawer**: Clicking any technology smoothly expands an inset evidence drawer displaying the exact implementation evidence and context.
- **Footer Sync**: Updated to:
  `A working stack, not a list of everything I've ever touched. *Rust: developing capability` | `Resume v2.2 Synced`.
- **Zero Redesign Principle**: Preserved dark Industrial Warm Slate visual identity, copper typography accents, and modal backdrop blur.

---

## 4. Modified Files

1. `src/data/handsOn.js` — Replaced stack definition with the 6 resume-synced categories, metadata, and Rust qualification.
2. `src/components/HandsOnPanel.jsx` — Enhanced responsive category spacing, drawer capability notes, and footer status text.
3. `docs/sprints/S15-5-HANDS-ON-RESUME-ALIGNMENT.md` — Authoritative sprint documentation.

---

## 5. Verification

- `npm run build`: Successful (zero TypeScript/JSX/Vite errors).
- Data Contract: 6 categories, 33 verified technologies, zero discrepancies against Resume v2.2.
