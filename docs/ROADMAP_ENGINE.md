# Adaptive roadmap engine

**Milestone:** 1 — Python beginner vertical slice  
**Algorithm version:** `1.0.0`  
**Status:** Source code and additive SQL migration are prepared. The migration has not been applied to Supabase in this workspace.

## Current behavior

The supported goal is `learn_python`, backed by the `learning_pathways`, `skills`, `learning_pathway_skills`, and `skill_dependencies` records seeded by the new migration. The target is a small command-line text summarizer. Required prerequisites form the learning sequence; optional testing background is shown as a recommendation and is not pulled into the required learning plan.

`lib/roadmap-engine.ts` is deterministic and independent of the database. It validates skill records, edge references, edge types, thresholds, duplicates, self-dependencies, and cycles. It walks the required prerequisite closure of the target, checks saved learner evidence, and topologically sorts the resulting graph with pathway sequence and slug tie-breaks. Recommendations include the actual graph relationships that caused a step to be included.

Learner self-report and browser checklist state do not count as mastery. A required prerequisite can be omitted when saved completed/mastered evidence reaches its configured dependency threshold. A target is omitted only when its saved status is `mastered` and its score reaches the skill threshold. Starting a step persists `in_progress`; only the server-scored assessment RPC can write completed/mastered evidence in this milestone.

The schedule is the sum of estimated skill minutes with a 20% review/checkpoint allowance, divided by the learner's weekly study minutes and rounded up to weeks. The result is guidance, not a guarantee.

## Assessment and adaptation

Assessment questions and answer keys live in `skill_assessments`. The safe assessment RPC returns prompts/options without correct-option IDs. A second RPC validates the submitted option IDs, scores answers on the server, enforces a per-user, per-skill daily cap of 30 submissions, and stores attempts and progress evidence transactionally.

When an attempt meets the mastery threshold, the app creates a new roadmap version from saved evidence, supersedes the prior active version, and records an adaptation event. When it does not meet mastery, the current sequence remains in place; a review event is recorded and the learner is directed to the lesson/exercise and retry. All assessment attempts and roadmap versions remain in history; current and completed versions are visible after refresh.

The project activity is self-guided. The site does not execute, upload, or independently grade learner code. The only mastery evidence supported by this first slice is the versioned multiple-choice knowledge check.

## Relevant code

- Pure engine: `lib/roadmap-engine.ts`
- Database reads and roadmap projection: `lib/roadmap-service.ts`
- Evidence-driven adaptation orchestration: `lib/roadmap-adaptation.ts`
- Authenticated request client: `lib/supabase-request.ts`
- Additive tables, RLS, RPCs, and seed: `supabase/migrations/20261012_adaptive_roadmap_engine.sql`
- UI: `components/PythonRoadmapBuilder.tsx`, mounted on `/roadmap`
- Unit tests: `tests/roadmap-engine.test.js`

See [`API_CONTRACTS.md`](API_CONTRACTS.md), [`DATA_MODEL.md`](DATA_MODEL.md), [`TEST_REPORT.md`](TEST_REPORT.md), and [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md).
