# Architecture audit

**Date:** 12 October 2026  
**Target:** Milestone 1, Adaptive Roadmap & Skill-Dependency Engine  
**Audited source:** Existing TALVIORA TECH workspace before this milestone's code changes.

## Existing stack

- **Frontend:** Next.js 15.5.27 App Router, React 19, TypeScript 5.7, Tailwind CSS 4.
- **Backend:** Next.js App Router route handlers; there is no separate Express/Nest backend.
- **Database and auth:** Supabase PostgreSQL and Supabase Auth using `@supabase/supabase-js`. No Supabase credentials are configured in this workspace, so live database/auth behavior cannot be exercised here.
- **AI:** Google GenAI SDK is used by the existing assessment/interview/mentor endpoints. It is not needed to decide prerequisite order.
- **State:** React state and browser `localStorage` for the current roadmap checklist; no roadmap account persistence exists.
- **Tests:** No installed unit/integration/E2E framework. There is a repository-specific catalogue verification script. The current TypeScript check and production build passed before this milestone; the catalogue script reported 66 passing checks. `npm run lint` is not usable as supplied because ESLint is absent and the script prompts to install it.

## Existing database

`supabase/schema.sql` defines `profiles`, `assessments`, `interview_sessions`, `tasks`, and `bookmarks`, plus auth-triggered profile provisioning. It has no learning pathway, skill catalogue, prerequisite graph, learner skill progress, roadmap versions, roadmap steps, or roadmap events. No migration runner or migration directory existed at audit time.

The existing schema includes example-like defaults in `profiles` and policies on assessments, interviews, and tasks that allow `auth.uid() IS NULL`. The public profile policy permits selection of rows with a portfolio slug directly from the table. These policies need review: an anonymous database session must not become an owner of personal records, and public profile access should expose only intentional public fields. This milestone's new learner-owned tables will use strict owner RLS. Existing policies are documented rather than silently changed by this roadmap migration.

## Authentication and authorization

`lib/auth-server.ts` validates a bearer token through `supabase.auth.getUser(token)` and returns an anonymous/guest result when no valid token is present. Existing API handlers generally perform their own identity checks. The shared Supabase client in `lib/supabase.ts` uses the public anon key and does not forward a request's bearer token to subsequent table queries. Roadmap persistence therefore needs a request-scoped Supabase client that verifies the bearer and forwards it so PostgreSQL RLS sees `auth.uid()`.

## Routes and integrations

The app has 31 page modules and 10 API handlers. Relevant existing pages are `/roadmap`, `/assessment`, `/profile`, `/learning`, and `/catalogue`. Relevant handlers include `/api/roadmap` (GET of a static four-phase curriculum), `/api/assessment` (Gemini career assessment), `/api/profile`, and `/api/tasks`. Other handlers cover bookmarks, interviews, market, mentor, portfolio, and projects.

Existing reusable services include `lib/supabase.ts`, `lib/auth-server.ts`, `lib/api-client.ts`, `lib/career-data.ts`, and `lib/types.ts`. The shared UI includes `AppShell`, `Sidebar`, `Navbar`, `Breadcrumbs`, `Footer`, `CommandPalette`, theme controls, and chart components.

## Existing roadmap and missing functionality

The current roadmap contains a static 16-week curriculum and estimated effort; its progress checkbox is device-local. `/api/roadmap` returns that same sample curriculum and has no authenticated per-learner retrieval. There is no deterministic dependency-graph validation or ordering, supported-goal registry, authenticated roadmap creation/retrieval, persistent step progress, assessment evidence tied to a skill, roadmap version history, or adaptation service.

The existing career assessment asks role-oriented questions and uses Gemini for narrative analysis; it does not validate Python fundamentals and must not be reused as mastery evidence. No skill-specific quiz data exists.

## Security and compatibility concerns

1. No database credentials are configured; SQL can be prepared but not applied or verified against a live project.
2. A shared anon Supabase client does not forward the request JWT for RLS-protected queries. New API operations must verify identity and use a request-scoped JWT-bound client.
3. Existing policies with anonymous allowances and direct public profile row access are outside the new table migration. They remain a documented follow-up because changing them could alter existing guest and public-portfolio behavior.
4. Existing profiles have non-empty demo-like defaults. New learner-goal input must be explicit and must not derive mastery from those defaults.
5. There is no existing test framework. The plan uses Node's built-in test runner plus the already-installed TypeScript compiler for deterministic engine tests; no testing dependency is needed.
6. New roadmap APIs will be additive. The existing `/api/roadmap` response remains available to the existing page unless the frontend explicitly requests the personal engine API.

## Proposed files

- Add `supabase/migrations/20261012_adaptive_roadmap_engine.sql` with pathway, skills, dependencies, resources, learner progress, roadmap versions/steps, assessment attempts, and event tables; strict RLS; idempotent Python pathway seed; and transactional RPC functions.
- Add `lib/roadmap-engine.ts` for graph validation, deterministic topological ordering, schedule estimates, and graph-derived explanations; add focused services/types and a request-scoped Supabase helper.
- Add authenticated route handlers under `app/api/roadmaps/` for creation, retrieval, progress, assessment, and adaptation; add a prerequisite-read endpoint under `app/api/skills/`.
- Extend `/roadmap` with an opt-in Python beginner flow and backend-generated roadmap display while preserving the existing curriculum reference.
- Add Node built-in unit tests under `tests/`; the test file compiles the pure TypeScript engine in memory using the installed TypeScript package.
- Add `docs/IMPLEMENTATION_PLAN.md`, `docs/ROADMAP_ENGINE.md`, `docs/API_CONTRACTS.md`, `docs/DATA_MODEL.md`, `docs/TEST_REPORT.md`, and `docs/KNOWN_LIMITATIONS.md` as the implementation proceeds.

## Compatibility and migration risks

The new schema is additive and uses new namespaced tables. It does not change the existing profile or assessment tables. The migration will be idempotent for table/index/policy creation and seed records; it must be applied after the existing `supabase/schema.sql`. The frontend cannot persist a generated roadmap until that migration is applied and Supabase environment variables are configured. No production data or credentials are available in this workspace.

