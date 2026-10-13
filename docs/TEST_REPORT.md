# TALVIORA TECH: Current Test Report

**Date:** 12 October 2026  
**Scope:** Adaptive Roadmap & Skill-Dependency Engine milestone 1  
**Evidence rule:** Only commands run in this workspace are marked passed. The archived QA report bundled with the source is not current evidence.

## Executed checks

| Check | Result | Scope / limits |
|---|---|---|
| `npm run test:roadmap` | **PASS — 7/7** | Pure deterministic graph-engine and streamed request-parser unit tests: stable prerequisite order, required closure vs recommended background, mastery thresholds, stable tie-breaking, invalid graph rejection, time/goal validation, schedule math, explanations, and body limits. Uses Node's built-in test runner and installed TypeScript compiler. |
| `npx tsc --noEmit` | **PASS** | TypeScript compilation for the application source. |
| `node scripts/test_catalogue_suite.js` | **PASS — 66/66** | Existing catalogue/regression verification script. |
| `npm run build` | **PASS** | Next.js 15.5.27 compiled, type-checked, generated all 51 static pages, and listed the new API routes. |

## Not executed

- The Supabase migration was not applied. `.env.local`, Supabase credentials, `psql`, and the Supabase CLI are absent from this workspace.
- Database persistence, rollback, RLS policy behavior, RPC execution, answer-key secrecy at runtime, and cross-user authorization were not integration-tested.
- No live auth session was available; protected API creation/retrieval, forged mastery attempts, duplicate requests, and user A/user B isolation were not exercised against a database.
- No browser automation or end-to-end learner scenario was executed. Loading states and API interactions were reviewed in code only.
- `npm run lint` is not counted as a check: the repository script calls `next lint`, while ESLint is not installed in this project.

## Interpretation

The passing checks establish the pure roadmap engine, request-body parser, application compile/build, and listed catalogue regression only. They do not establish production readiness or database security. Complete the documented Supabase migration and authorization tests using a non-production project before treating persistence and RLS as verified.
