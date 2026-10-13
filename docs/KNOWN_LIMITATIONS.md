# Known limitations and required setup

## Required setup

1. Configure the project's existing Supabase URL and anon key in `.env.local`.
2. Apply and verify `supabase/migrations/20261012_adaptive_roadmap_engine.sql` after the base schema through the authorized Supabase workflow.
3. Sign in with Supabase Auth to create or retrieve a personal roadmap. Without the migration/configuration the UI reports an unavailable or sign-in state; no roadmap is generated from a local demo fallback.

## Product and implementation limits

- Only `learn_python` is seeded. Other goal slugs return an explicit unsupported-goal response.
- The first path is English-only. The country field is optional and stored as a two-letter code, but no launch-country allowlist, market-specific path, job-demand score, salary estimate, or localized career data is implemented. The product owner still needs to choose the small initial launch-market set.
- Self-reported knowledge does not skip skills. No diagnostic prior-knowledge assessment exists for the Python graph.
- Progress supports starting a step and submitting a server-scored three-question quiz. Exercises, projects, completion criteria, portfolio evidence, and project code are self-guided; the application does not execute or review submitted code.
- A quiz below mastery records a review event and keeps the existing roadmap sequence. It does not insert a new versioned prerequisite/remedial skill or change the activity graph. A mastery-level result creates a new roadmap version.
- Changing weekly study time or goal after roadmap creation is not yet exposed as an adaptation action. Only the supported Python path is available, so cross-goal skill reuse is not exercised.
- Browser checklist progress remains a separate local reference checklist. The new personal roadmap uses database persistence and does not treat local checkbox state as evidence.
- Rate limiting is implemented for knowledge-check attempts in the database RPC (30 per user/skill/day). No gateway-level rate limiter is present for roadmap generation or prerequisite lookup.
- The graph and mutation RPCs have been reviewed in source but not exercised against PostgreSQL. RLS policy behavior, RPC permissions, migrations, and real cross-user isolation require a configured test project.

## Existing project risks outside this milestone

The base schema contains legacy anonymous-access policies for some assessment/interview/task tables and a public profile-row policy. Those policies may expose or permit data outside this milestone and need an owner-reviewed security pass. The new roadmap tables use separate owner-only policies; that does not establish security of the rest of the product.

The supplied README and historical QA workbook/report are source artifacts, not current validation evidence. Feature definitions 12–18 remain unspecified in the tracker and are not inferred from conflicting README names.
