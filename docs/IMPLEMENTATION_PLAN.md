# Adaptive roadmap milestone plan

**Date:** 12 October 2026

## Milestones and acceptance criteria

| Milestone | Dependencies | Acceptance criteria | Main files |
|---|---|---|---|
| 1. Baseline audit | None | Existing routes, schema, auth, state, tests, risks, and planned edits documented before implementation. | `docs/ARCHITECTURE_AUDIT.md`, this plan |
| 2. Versioned Python pathway and schema | Audit | Additive migration defines pathway/skills/dependencies/resources, progress, versioned roadmaps/steps, assessment attempts/events, owner RLS, and an idempotent beginner pathway seed. | `supabase/migrations/20261012_adaptive_roadmap_engine.sql`, `docs/DATA_MODEL.md` |
| 3. Deterministic graph engine | Seed shape | Reject duplicate/missing/self/cyclic edges; return stable topological order, strict versus recommended prerequisites, schedule estimate, and explanations. Tests exercise valid and invalid graphs. | `lib/roadmap-engine.ts`, `tests/roadmap-engine.test.js`, Node built-in test runner |
| 4. Authenticated persistence services and APIs | Migration and graph engine | Bearer verified; user JWT forwarded for RLS; unsupported goals and invalid inputs return safe errors; creation is transactional; reads and writes are owner-scoped; no mastery from clicks. | `lib/roadmap-service.ts`, `lib/supabase-request.ts`, `app/api/roadmaps/**`, `app/api/skills/**` |
| 5. Progress, evidence, and adaptation | APIs and versioned data model | Start step; accept versioned knowledge-check attempts scored server-side; preserve attempts and completed work; adaptation creates a new version with a reason and no client-forged mastery. | `lib/roadmap-service.ts`, roadmap/assessment/adapt route handlers, SQL RPCs |
| 6. Frontend vertical slice | APIs | Learner selects Python from scratch and weekly time, sees generated objectives/prerequisites/reasons/time/activities, can start and attempt a check, and sees a truthful unavailable/error state without credentials. Existing curriculum remains available. | `app/roadmap/page.tsx` and existing shared components |
| 7. Verification and handover | All implementation | Engine tests and regression catalogue check pass; TypeScript/build pass; live database/auth/ownership and browser scenarios are marked unverified unless actually run with configured services. | `docs/TEST_REPORT.md`, `docs/KNOWN_LIMITATIONS.md`, `docs/ROADMAP_ENGINE.md`, `docs/API_CONTRACTS.md` |

## Feature-to-file map

| Responsibility | Implementation location |
|---|---|
| Pathway and skill records, graph edges, learning activities, RLS, RPC transactions | `supabase/migrations/20261012_adaptive_roadmap_engine.sql` |
| Pure graph validation/order/estimate/explanation | `lib/roadmap-engine.ts` |
| Bearer verification and JWT-bound Supabase client | `lib/supabase-request.ts` |
| Roadmap reads/generation orchestration and adaptation decision flow | `lib/roadmap-service.ts`, `lib/roadmap-adaptation.ts` |
| Create/list personal roadmaps | `app/api/roadmaps/route.ts` |
| Retrieve roadmap and version history | `app/api/roadmaps/[roadmapId]/route.ts` |
| Start/submit progress, without client-side mastery | `app/api/roadmaps/[roadmapId]/steps/[stepId]/route.ts` |
| Server-scored skill assessment | `app/api/roadmaps/[roadmapId]/assessments/route.ts` |
| Versioned adaptation | `app/api/roadmaps/[roadmapId]/adapt/route.ts` |
| Required/recommended prerequisite lookup | `app/api/skills/[skillId]/prerequisites/route.ts` |
| Python beginner experience | `app/roadmap/page.tsx` |
| Unit/regression results and known gaps | `tests/`, `docs/TEST_REPORT.md`, `docs/KNOWN_LIMITATIONS.md` |

## Boundaries for this milestone

- Only the supported `learn_python` pathway is generated. Other goals return an explicit unsupported-goal response.
- Prerequisite ordering is deterministic and does not delegate dependency decisions to Gemini.
- Self-reported experience is provisional. The Python knowledge check is stored as evidence; a correct answer can support a mastery assessment only according to the pathway's server-side threshold.
- Market/country choices do not block this beginner pathway. No job, salary, employment, or certification claims are introduced.
- SQL is delivered as an unapplied migration. Applying it requires the project's authorized Supabase environment; this workspace has no provider credentials.

## Execution status — 12 October 2026

| Phase | Status | Evidence / remaining dependency |
|---|---|---|
| 1. Audit and baseline | Complete | The pre-change audit and implementation map are recorded above and in `ARCHITECTURE_AUDIT.md`. |
| 2. Data model | Migration authored; runtime pending | Additive SQL migration and seed are present. Apply it in a non-production Supabase project and verify syntax, permissions, RLS, and rollback before production use. |
| 3. Skill graph | Implemented; unit tests pass | `lib/roadmap-engine.ts`; `npm run test:roadmap` passes 7/7. |
| 4. Persistence APIs | Implemented in source; runtime pending | Authenticated route handlers and owner-scoped service are present. They require configured Supabase and the migration for live verification. |
| 5. Progress/adaptation | Implemented in source; runtime pending | Step start, server-scored quiz attempts, review event, and mastery-triggered versions are implemented in SQL RPCs. No DB integration test could run here. |
| 6. Frontend | Implemented in source | Python builder is mounted on existing `/roadmap`; existing checklist remains separately identified as local reference. |
| 7. Verification | Partial | Roadmap unit tests, TypeScript check, production build, and catalogue suite pass. Live DB/browser/auth tests remain unverified as tracked in `TEST_REPORT.md`. |
| 8. Handover | Documentation added | See `ROADMAP_ENGINE.md`, `API_CONTRACTS.md`, `DATA_MODEL.md`, `TEST_REPORT.md`, and `KNOWN_LIMITATIONS.md`. |

The unit test is executed directly by Node's built-in runner; it transpiles the pure TypeScript engine in memory with the existing TypeScript package. No test dependency was added.
