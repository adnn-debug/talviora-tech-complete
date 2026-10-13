# TALVIORA TECH: API Reference & Endpoint Contract

> **Historical ZIP reference; endpoint authentication, response shapes, and provider behavior may be stale.** The current code and verification results are described in [`IMPLEMENTATION_AUDIT.md`](IMPLEMENTATION_AUDIT.md).

**Document Version:** 1.0.0  
**Base URL:** `http://localhost:3000` (or `https://your-domain.com`)  
**Format:** RESTful JSON  
**Authentication:** Optional Bearer JWT (`Authorization: Bearer <SUPABASE_ACCESS_TOKEN>`). Endpoints fall back safely to guest mode when unauthenticated.

---

## Quick Navigation
- [1. Career Assessment API (`/api/assessment`)](#1-career-assessment-api)
- [2. Technical Interview Simulator API (`/api/interview`)](#2-technical-interview-simulator-api)
- [3. Technology Market Trends API (`/api/market`)](#3-technology-market-trends-api)
- [4. Vanity Portfolio Profile API (`/api/portfolio`)](#4-vanity-portfolio-profile-api)
- [5. Learner Profile Management API (`/api/profile`)](#5-learner-profile-management-api)
- [6. Industry Projects Catalogue API (`/api/projects`)](#6-industry-projects-catalogue-api)
- [7. Phased Curriculum Roadmap API (`/api/roadmap`)](#7-phased-curriculum-roadmap-api)
- [8. Sprint & Daily Tasks API (`/api/tasks`)](#8-sprint--daily-tasks-api)

---

## 1. Career Assessment API

### `GET /api/assessment`
Retrieves baseline benchmark metrics for the active learner.

* **Headers:** `Accept: application/json`
* **Response (200 OK):**
```json
{
  "candidate": "Feriha Rahman",
  "targetRole": "AI Solutions Architect",
  "readinessScore": 72,
  "assessedSkills": {
    "Python": 78,
    "SQL": 72,
    "Machine Learning": 65,
    "PyTorch": 54,
    "System Design": 62,
    "LLMs & RAG": 70
  }
}
```

---

### `POST /api/assessment`
Submits multi-step technical responses and evaluates interview readiness score via Google Gemini 1.5 Flash (or deterministic fallback engine).

* **Headers:** `Content-Type: application/json`, `Authorization: Bearer <jwt>` (optional)
* **Request Body:**
```json
{
  "targetRole": "AI Solutions Architect",
  "weeklyHours": 14,
  "answers": {
    "1": 1,
    "2": 0,
    "3": 2,
    "4": 1,
    "5": 0
  }
}
```

* **Response (200 OK):**
```json
{
  "success": true,
  "evaluatedAt": "2026-10-10T15:20:00.000Z",
  "targetRole": "AI Solutions Architect",
  "readinessScore": 74,
  "strongPillars": [
    "Python & Algorithms",
    "Data Pipelines & Core ML"
  ],
  "growthPillars": [
    "Distributed System Architecture",
    "Production Model Deployment & MLOps"
  ],
  "prioritySkills": [
    "PyTorch",
    "RAG & LLM Application Engineering",
    "FastAPI & Vector Indexing"
  ],
  "recommendedProjects": [
    "Enterprise Hybrid RAG Assistant with Hybrid Search",
    "Real-Time Stream Processing & Feature Store Architecture"
  ],
  "nextSprintFocus": "Master Vector Embeddings, Chunking Strategies & FAISS/pgvector",
  "executiveSummary": "Based on your technical evaluation for AI Solutions Architect, your core engineering acumen is solid at 74%..."
}
```

---

## 2. Technical Interview Simulator API

### `GET /api/interview`
Retrieves the curated question bank for technical screenings and system failure scenarios.

* **Response (200 OK):**
```json
{
  "questions": [
    {
      "id": "iq-101",
      "role": "AI Solutions Architect",
      "category": "Technical Architecture",
      "prompt": "Design a scalable RAG infrastructure for an enterprise with 50,000 employees...",
      "sampleAnswerOverview": "Pre-filtering vs post-filtering metadata...",
      "rubricKeyPoints": ["Explained metadata payload filtering...", "..."]
    }
  ],
  "totalCount": 4
}
```

---

### `POST /api/interview`
Evaluates a candidate's technical response using Google Gemini 1.5 Flash against engineering rubrics.

* **Request Body:**
```json
{
  "role": "AI Solutions Architect",
  "question": "Explain trade-offs of semantic caching in RAG pipelines.",
  "answer": "Semantic caching utilizes vector embedding cosine similarity to reuse prior LLM outputs, lowering p95 latency from 1.8s to 45ms. However, strict invalidation policies are needed."
}
```

* **Response (200 OK):**
```json
{
  "success": true,
  "evaluatedAt": "2026-10-10T15:21:00.000Z",
  "rating": 8,
  "strengths": [
    "Clear explanation of trade-offs between latency and throughput",
    "Mentioned cache invalidation strategies correctly"
  ],
  "areasForImprovement": [
    "Could elaborate further on backpressure handling under high load",
    "Quantify metrics like p99 SLA targets"
  ],
  "idealTalkingPoints": [
    "Distributed tracing with OpenTelemetry",
    "Graceful degradation with circuit breakers"
  ],
  "verdict": "Strong technical competency displayed. Clear communication."
}
```

* **Validation Error (400 Bad Request):**
```json
{
  "success": false,
  "error": "Please provide a substantive answer (at least 5 characters) to evaluate."
}
```

---

## 3. Technology Market Trends API

### `GET /api/market`
Returns salary bands, YoY demand growth, open postings, and remote percentages.

* **Query Parameters:**
  * `role` *(optional, string)*: Filter roles by title or required skill (e.g., `?role=architect`, `?role=mlops`).
* **Response (200 OK):**
```json
{
  "trends": [
    {
      "role": "AI Solutions Architect",
      "medianSalaryUSD": 172000,
      "salaryRange": "$145,000 - $195,000",
      "yoyGrowthPct": 34.2,
      "openPostingsCount": 14850,
      "topSkillsInDemand": ["System Design", "RAG & Vector Search", "Python"],
      "remoteFriendlyPct": 68
    }
  ],
  "totalCount": 1,
  "updatedAt": "2026-10-10T15:22:00.000Z"
}
```

---

## 4. Vanity Portfolio Profile API

### `GET /api/portfolio`
Serves candidate vanity proof-of-work profiles for recruiters and mentors.

* **Query Parameters:**
  * `slug` *(optional, string)*: Specific portfolio vanity slug (defaults to `feriha`).
* **Response (200 OK):**
```json
{
  "slug": "feriha",
  "publicUrl": "/portfolio",
  "candidate": {
    "name": "Feriha Rahman",
    "targetRole": "AI Solutions Architect",
    "readinessScore": 72,
    "bio": "Passionate engineer focusing on production AI architectures...",
    "verifiedBadges": [
      "Certified RAG Systems Developer",
      "Deep Learning Foundations (PyTorch)",
      "PostgreSQL Performance Specialist",
      "FastAPI Microservice Architect"
    ],
    "featuredProjects": [...]
  }
}
```

---

## 5. Learner Profile Management API

### `GET /api/profile`
Retrieves authenticated candidate profile from Supabase or default profile.

* **Response (200 OK):**
```json
{
  "id": "talviora-usr-01",
  "name": "Feriha Rahman",
  "email": "feriha@talviora.tech",
  "targetRole": "AI Solutions Architect",
  "experienceLevel": "Junior",
  "readinessScore": 72,
  "weeklyHours": 12,
  "currentStreakDays": 14,
  "skills": { "Python": 78, "SQL": 72, "PyTorch": 54 }
}
```

---

### `POST /api/profile`
Updates candidate settings with automatic sanitization and IDOR protection.

* **Request Body:**
```json
{
  "name": "Feriha Rahman",
  "targetRole": "Staff AI Solutions Architect",
  "weeklyHours": 16,
  "bio": "Specializing in distributed inference and agentic pipelines."
}
```

* **Response (200 OK):**
```json
{
  "success": true,
  "profile": {
    "id": "talviora-usr-01",
    "name": "Feriha Rahman",
    "targetRole": "Staff AI Solutions Architect",
    "weeklyHours": 16,
    "bio": "Specializing in distributed inference and agentic pipelines."
  }
}
```

---

## 6. Industry Projects Catalogue API

### `GET /api/projects`
Retrieves production-grade project briefs, tech stacks, and defense rubrics.

* **Query Parameters:**
  * `difficulty` *(optional, string)*: `Intermediate`, `Advanced`, or `Production-Grade`.
  * `q` *(optional, string)*: Search title, description, or tech stack (e.g. `?q=rag`, `?q=docker`).
* **Response (200 OK):**
```json
{
  "projects": [
    {
      "id": "proj-enterprise-rag",
      "title": "Enterprise Hybrid RAG Assistant with Hybrid Search & Semantic Caching",
      "difficulty": "Production-Grade",
      "estimatedHours": 45,
      "techStack": ["FastAPI", "pgvector", "Redis Semantic Cache", "Docker Compose"]
    }
  ],
  "totalCount": 1
}
```

---

## 7. Phased Curriculum Roadmap API

### `GET /api/roadmap`
Returns the 16-week, 4-phase structured curriculum milestones.

* **Query Parameters:**
  * `phase` *(optional, number)*: Filter modules by phase number `1`, `2`, `3`, or `4`.
* **Response (200 OK):**
```json
{
  "phases": [
    {
      "phaseNumber": 1,
      "phaseTitle": "Foundations & Mathematical Tooling",
      "status": "completed",
      "durationWeeks": "Weeks 1-4",
      "estimatedHours": 48,
      "modules": [...]
    }
  ],
  "totalModules": 16,
  "completedModules": 6
}
```

---

## 8. Sprint & Daily Tasks API

### `GET /api/tasks`
Returns Kanban board sprint items for daily accountability.

* **Response (200 OK):**
```json
{
  "tasks": [
    {
      "id": "t-1",
      "title": "Implement Transformer Multi-Head Attention layer in PyTorch",
      "category": "Deep Learning",
      "hours": 6,
      "column": "in-progress"
    }
  ],
  "totalCount": 6
}
```

---

### `POST /api/tasks`
Creates a new sprint task with input sanitization.

* **Request Body:**
```json
{
  "title": "Implement HNSW Index in pgvector",
  "category": "Database",
  "hours": 4,
  "column": "backlog"
}
```

* **Response (200 OK):**
```json
{
  "success": true,
  "task": {
    "id": "task-1728573600000",
    "user_id": "talviora-usr-01",
    "title": "Implement HNSW Index in pgvector",
    "category": "Database",
    "hours": 4,
    "column": "backlog",
    "created_at": "2026-10-10T15:24:00.000Z"
  }
}
```
