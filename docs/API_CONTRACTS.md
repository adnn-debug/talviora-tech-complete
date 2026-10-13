# Roadmap API contracts

These routes use the existing Next.js App Router and Supabase Auth. Protected calls require `Authorization: Bearer <Supabase access token>`. The handler verifies the token and uses a request-scoped Supabase client that forwards it to PostgreSQL so `auth.uid()` and RLS apply. Responses include `X-Request-ID`; errors use `{ "error": { "code", "message", "requestId" } }`.

The API paths follow this repository's existing route conventions; the proposed `/api/v1` prefix is not used.

## Routes

| Route | Contract |
|---|---|
| `GET /api/roadmaps` | Lists the authenticated learner's current active and completed roadmaps, newest first. Superseded versions are summarized with a current roadmap's version history. |
| `POST /api/roadmaps` | Creates a roadmap. Body: `goal`, `weeklyStudyMinutes`, optional `experienceLevel`, `language`, `country`, and idempotency `requestId`. Only the published `learn_python` goal and English are currently supported. Returns `{ roadmap, estimatedScheduleExplanation, requestId, idempotentReplay }`. |
| `GET /api/roadmaps/{roadmapId}` | Returns an owner-scoped roadmap, ordered steps, activity/prerequisite snapshots, and roadmap events. Non-owners receive a not-found response. |
| `PATCH /api/roadmaps/{roadmapId}/steps/{stepId}` | Accepts `{ "action": "start" }`. No client action can set completed/mastered. Required prerequisites are checked in the database RPC. |
| `GET /api/roadmaps/{roadmapId}/assessments?stepId={stepId}` | Returns a safe quiz projection without answer keys. |
| `POST /api/roadmaps/{roadmapId}/assessments` | Body: `{ stepId, answers: { questionId: optionId }, clientEventId }`. The database validates, scores, stores the attempt, and updates progress. `clientEventId` is a UUID used for idempotency. |
| `POST /api/roadmaps/{roadmapId}/adapt` | Body: `{ assessmentAttemptId }`. The server verifies the saved attempt belongs to the learner and roadmap. Mastery creates a new version; a lower result records a review event and keeps the current version. |
| `GET /api/skills/{skillId}/prerequisites` | Returns the published skill's required/recommended prerequisites and the authenticated learner's saved evidence, when present. |

The step status returned by database reads is projected with its skill title, objectives, prerequisite snapshot, activities, estimated minutes, and explanation. Assessment correct answers are not returned to the client.

## Validation and errors

Request bodies have size checks where applicable. IDs are validated as UUIDs. Weekly study time is 30–2,400 minutes, country is optional and syntactically two uppercase letters, and the only available language is `en`. Important error codes include `AUTH_REQUIRED`, `SUPABASE_NOT_CONFIGURED`, `UNSUPPORTED_GOAL`, `INVALID_STUDY_TIME`, `ACTIVE_ROADMAP_EXISTS`, `REQUIRED_PREREQUISITE_NOT_MET`, `START_STEP_BEFORE_ASSESSMENT`, `ASSESSMENT_RATE_LIMIT`, and `GOAL_ALREADY_MET`.

Unexpected exceptions return a safe generic error; handlers do not return SQL detail, stack traces, or credentials. Roadmap reads filter by `user_id`, and database owner RLS policies apply as a second boundary.

## Routes outside this milestone

The existing `/api/roadmap` route is retained. This milestone does not alter existing assessment, profile, task, or other API contracts. Assessment submissions use the roadmap-nested route because each attempt is scoped to an owned roadmap step; no competing assessment framework or endpoint was introduced.
