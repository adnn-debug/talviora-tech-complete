# Adaptive roadmap data model

The current base schema is `supabase/schema.sql`; it has profiles, career assessments, interview sessions, tasks, and bookmarks. It has no skill graph or persisted roadmap entities. This milestone adds a transaction-wrapped, additive migration at `supabase/migrations/20261012_adaptive_roadmap_engine.sql` and does not rewrite existing tables or records.

## Added entities

| Table | Purpose and key constraints |
|---|---|
| `learning_pathways` | Versioned goal catalog with draft/published/archived state and default language. |
| `skills` | Stable skill slug, beginner description, category/difficulty, estimated minutes, objectives, completion criteria, mastery threshold, and content version. |
| `learning_pathway_skills` | Connects a pathway to skills, with deterministic sequence hints and target-skill flags. |
| `skill_dependencies` | Directed required/recommended edges, unique per pair, no self-edge, optional threshold. |
| `learning_resources` | Local lesson/exercise/project content and external documentation references, language, access, verification metadata, and time estimate. |
| `learner_profiles` | Minimal pathway, language, optional country, weekly study time, and provisional experience preferences. |
| `learner_skill_progress` | Unique `(user_id, skill_id)` status, self-reported level, evidence-backed mastery score, attempts, and activity dates. |
| `roadmaps` | User-owned, versioned roadmap snapshots, schedule totals, prior version, algorithm, and status. A partial unique index allows one active roadmap per user/pathway. |
| `roadmap_steps` | Ordered skill snapshot, status, estimate, criteria, prerequisites, and activities. |
| `skill_assessments` | Versioned quiz content and correct answers; no direct client select policy is granted. |
| `assessment_attempts` | Owner-scoped, server-scored results with unique client event ID, roadmap/step references, and attempt number. |
| `roadmap_events` | Owner-scoped creation, progress, assessment, review, and adaptation history. |

## Access model

Published catalog rows can be selected by `anon` and `authenticated`; draft and archived catalog rows are hidden by RLS. Learner-owned rows have owner-only `SELECT` policies and no direct client write grants. Authenticated mutations go through security-definer RPCs with `auth.uid()` checks and fixed `search_path`; those RPCs validate ownership, prerequisites, saved assessment evidence, idempotency, and computed schedule. Assessment answer keys are available only inside the scoring function.

The migration is designed to run after `supabase/schema.sql`. It uses `BEGIN`/`COMMIT`, idempotent table/index/policy definitions, and upserts for pathway seed content. Its SQL has not been run against a PostgreSQL/Supabase instance in this workspace. RLS, function signatures, SQL syntax, seed behavior, rollback, and cross-user access therefore remain unverified at runtime.

## Apply and rollback notes

Apply the base schema if required, then apply the new migration using the project's authorized Supabase migration workflow. Review the SQL and run it in a non-production project first. No provider credentials or Supabase CLI/`psql` executable are configured here, so no remote changes were made.

The migration is additive and transactional. If it fails before `COMMIT`, PostgreSQL should roll back its transaction. After it has been applied and learner data exists, do not run ad hoc `DROP TABLE` statements: that would delete roadmap and assessment history. A rollback should first stop new roadmap writes, export/retain learner data as required, then remove only the new functions, policies, and tables in reverse foreign-key order in a reviewed maintenance migration. No destructive down migration is supplied.

Existing `profiles`, `assessments`, `interview_sessions`, `tasks`, and `bookmarks` remain unchanged. The separate legacy policy concerns recorded in [`ARCHITECTURE_AUDIT.md`](ARCHITECTURE_AUDIT.md) are not fixed by this migration.
