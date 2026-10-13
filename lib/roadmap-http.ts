import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type { RoadmapAuthContext } from "@/lib/supabase-request";

export function requestIdFrom(req: Request): string {
  const candidate = req.headers.get("x-request-id")?.trim();
  return candidate && /^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(candidate) ? candidate : randomUUID();
}

export function roadmapJson(data: unknown, requestId: string, status = 200) {
  return NextResponse.json(data, { status, headers: { "X-Request-ID": requestId } });
}

export async function readJsonLimited(req: Request, maximumBytes: number): Promise<
  { ok: true; value: unknown } | { ok: false; reason: "too_large" | "invalid_json" }
> {
  const reader = req.body?.getReader();
  if (!reader) return { ok: false, reason: "invalid_json" };
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maximumBytes) {
        await reader.cancel();
        return { ok: false, reason: "too_large" };
      }
      chunks.push(value);
    }
    const body = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.byteLength;
    }
    return { ok: true, value: JSON.parse(new TextDecoder().decode(body)) as unknown };
  } catch {
    return { ok: false, reason: "invalid_json" };
  } finally {
    reader.releaseLock();
  }
}

export function roadmapError(
  requestId: string,
  status: number,
  code: string,
  message: string,
  details?: Record<string, unknown>
) {
  return roadmapJson({ error: { code, message, requestId, ...(details ? { details } : {}) } }, requestId, status);
}

export function authError(context: Extract<RoadmapAuthContext, { ok: false }>, requestId: string) {
  return roadmapError(requestId, context.status, context.code, context.message);
}

export function mapRoadmapError(error: { code?: string; message?: string }, requestId: string) {
  const raw = error.message ?? "";
  const code = raw.match(/(?:^|\s)([A-Z][A-Z0-9_]+)(?:$|\s)/)?.[1] ?? error.code ?? "ROADMAP_OPERATION_FAILED";
  const known: Record<string, { status: number; message: string }> = {
    AUTH_REQUIRED: { status: 401, message: "Sign in to continue." },
    ROADMAP_DATA_UNAVAILABLE: { status: 503, message: "Published pathway data is unavailable. Try again later." },
    DEPENDENCY_CYCLE: { status: 422, message: "The published skill graph is invalid and cannot be used to generate a roadmap." },
    MISSING_DEPENDENCY_SKILL: { status: 422, message: "The published skill graph references a missing skill." },
    DUPLICATE_SKILL: { status: 422, message: "The published skill graph contains duplicate skills." },
    DUPLICATE_DEPENDENCY: { status: 422, message: "The published skill graph contains duplicate prerequisites." },
    SELF_DEPENDENCY: { status: 422, message: "The published skill graph contains a self-dependency." },
    INVALID_DEPENDENCY_TYPE: { status: 422, message: "The published skill graph contains an invalid prerequisite type." },
    INVALID_DEPENDENCY_THRESHOLD: { status: 422, message: "The published skill graph contains an invalid mastery threshold." },
    INVALID_SKILL: { status: 422, message: "The published skill graph contains an incomplete skill." },
    INVALID_SKILL_EFFORT: { status: 422, message: "A published skill has an invalid effort estimate." },
    INVALID_MASTERY_THRESHOLD: { status: 422, message: "A published skill has an invalid mastery threshold." },
    UNSUPPORTED_GOAL: { status: 422, message: "That learning goal is not available yet." },
    UNSUPPORTED_ALGORITHM_VERSION: { status: 422, message: "This roadmap algorithm version is not available." },
    GOAL_ALREADY_MET: { status: 409, message: "Saved evidence already meets the target skills in this pathway." },
    ACTIVE_ROADMAP_EXISTS: { status: 409, message: "An active roadmap already exists for this goal. Open it to continue." },
    ROADMAP_NOT_FOUND: { status: 404, message: "Roadmap not found." },
    ACTIVE_ROADMAP_NOT_FOUND: { status: 404, message: "Active roadmap not found." },
    STEP_NOT_FOUND: { status: 404, message: "Roadmap step not found." },
    ASSESSMENT_NOT_FOUND: { status: 404, message: "No published knowledge check is available for this step." },
    ASSESSMENT_EVIDENCE_NOT_FOUND: { status: 404, message: "Assessment evidence not found." },
    REQUIRED_PREREQUISITE_NOT_MET: { status: 409, message: "Complete the required prerequisite checkpoint before starting this step." },
    REQUIRED_PREREQUISITE_MISSING: { status: 422, message: "The generated roadmap is missing a required prerequisite." },
    START_STEP_BEFORE_ASSESSMENT: { status: 409, message: "Start this roadmap step before taking its knowledge check." },
    MASTERY_EVIDENCE_REQUIRED: { status: 403, message: "A saved mastery-level assessment is required to adapt this roadmap." },
    MASTERY_EVIDENCE_REQUIRES_ADAPTATION: { status: 409, message: "This result meets the mastery threshold and should create a new roadmap version." },
    IDEMPOTENCY_KEY_REUSED: { status: 409, message: "This request ID was already used for another step." },
    ASSESSMENT_RATE_LIMIT: { status: 429, message: "The daily knowledge-check limit was reached. Try again tomorrow." },
    INVALID_STUDY_TIME: { status: 400, message: "Weekly study time must be from 30 to 2,400 minutes." },
    INVALID_EXPERIENCE_LEVEL: { status: 400, message: "Choose a supported experience level." },
    INVALID_COUNTRY: { status: 400, message: "Country must be a two-letter ISO code." },
    INVALID_LANGUAGE: { status: 400, message: "Language code is too long." },
    INVALID_ROADMAP_STEPS: { status: 422, message: "The roadmap plan could not be saved." },
    STEP_SKILL_NOT_IN_PATHWAY: { status: 422, message: "A roadmap step is outside the selected pathway." },
    UNRELATED_STEP_SKILL: { status: 422, message: "A roadmap step is unrelated to this pathway's target skills." },
    TARGET_SKILL_MISSING: { status: 422, message: "The roadmap is missing a target skill without saved mastery evidence." },
    INVALID_STEP_EFFORT: { status: 422, message: "A roadmap step has an invalid effort estimate." },
    INVALID_ROADMAP_ESTIMATE: { status: 422, message: "The roadmap schedule estimate does not match its saved steps." },
    INVALID_STEP_ORDER: { status: 422, message: "The generated roadmap order is invalid." },
    INVALID_STEP_CONTENT: { status: 422, message: "The generated roadmap step is incomplete." },
    INVALID_STEP_STATUS: { status: 422, message: "The generated roadmap step status is invalid." },
    ANSWER_EVERY_ASSESSMENT_QUESTION: { status: 400, message: "Answer every knowledge-check question before submitting." },
    INVALID_ASSESSMENT_OPTION: { status: 400, message: "Choose one of the listed answer options for every question." },
    INVALID_ASSESSMENT_SUBMISSION: { status: 400, message: "The assessment submission is invalid." },
  };

  const result = known[code];
  if (result) return roadmapError(requestId, result.status, code, result.message);
  console.error("Roadmap operation failed", { requestId, errorCode: error.code ?? "unknown" });
  return roadmapError(requestId, 500, "ROADMAP_OPERATION_FAILED", "The roadmap request could not be completed. Try again.");
}

export const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
