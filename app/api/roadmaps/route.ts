import { randomUUID } from "node:crypto";
import { authenticateRoadmapRequest } from "@/lib/supabase-request";
import { mapRoadmapError, authError, roadmapError, roadmapJson, requestIdFrom, readJsonLimited, UUID_PATTERN } from "@/lib/roadmap-http";
import { getOwnedRoadmap, listOwnedCurrentRoadmaps, prepareRoadmap, type RoadmapGenerationInput } from "@/lib/roadmap-service";

const MAX_BODY_BYTES = 16_384;

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

export async function GET(req: Request) {
  const requestId = requestIdFrom(req);
  const context = await authenticateRoadmapRequest(req);
  if (!context.ok) return authError(context, requestId);

  try {
    const roadmaps = await listOwnedCurrentRoadmaps(context.client, context.user.id);
    return roadmapJson({ roadmaps, requestId }, requestId);
  } catch (error) {
    return mapRoadmapError(error as { code?: string; message?: string }, requestId);
  }
}

export async function POST(req: Request) {
  const requestId = requestIdFrom(req);
  const context = await authenticateRoadmapRequest(req);
  if (!context.ok) return authError(context, requestId);

  const parsedBody = await readJsonLimited(req, MAX_BODY_BYTES);
  if (!parsedBody.ok) return parsedBody.reason === "too_large"
    ? roadmapError(requestId, 413, "REQUEST_TOO_LARGE", "The roadmap request is too large.")
    : roadmapError(requestId, 400, "INVALID_JSON", "Send a valid JSON request body.");
  const body = parsedBody.value;
  if (!isObject(body)) return roadmapError(requestId, 400, "INVALID_REQUEST", "The roadmap request must be a JSON object.");

  const goal = typeof body.goal === "string" ? body.goal.trim().slice(0, 80) : "";
  const weeklyStudyMinutes = body.weeklyStudyMinutes;
  const experienceLevel = body.experienceLevel ?? "beginner";
  const preferredLanguage = typeof body.language === "string" ? body.language.trim().toLowerCase() : "en";
  const targetCountry = body.country === null || body.country === undefined
    ? null
    : typeof body.country === "string" ? body.country.trim().toUpperCase() : "invalid";
  const suppliedRequestId = body.requestId;

  if (!goal) return roadmapError(requestId, 400, "GOAL_REQUIRED", "Choose a supported learning goal.");
  if (!Number.isInteger(weeklyStudyMinutes) || Number(weeklyStudyMinutes) < 30 || Number(weeklyStudyMinutes) > 2400) {
    return roadmapError(requestId, 400, "INVALID_STUDY_TIME", "Weekly study time must be from 30 to 2,400 minutes.");
  }
  if (!(["beginner", "junior", "intermediate", "senior"] as unknown[]).includes(experienceLevel)) {
    return roadmapError(requestId, 400, "INVALID_EXPERIENCE_LEVEL", "Choose a supported experience level.");
  }
  if (preferredLanguage !== "en") {
    return roadmapError(requestId, 422, "LANGUAGE_NOT_AVAILABLE", "This first pathway is currently available in English.");
  }
  if (targetCountry !== null && !/^[A-Z]{2}$/.test(targetCountry)) {
    return roadmapError(requestId, 400, "INVALID_COUNTRY", "Country must be a two-letter ISO code, or left blank.");
  }
  if (suppliedRequestId !== undefined && (typeof suppliedRequestId !== "string" || !UUID_PATTERN.test(suppliedRequestId))) {
    return roadmapError(requestId, 400, "INVALID_REQUEST_ID", "Request ID must be a UUID.");
  }

  const input: RoadmapGenerationInput = {
    goal,
    weeklyStudyMinutes: Number(weeklyStudyMinutes),
    experienceLevel: experienceLevel as RoadmapGenerationInput["experienceLevel"],
    preferredLanguage,
    targetCountry,
  };

  try {
    const prepared = await prepareRoadmap(context.client, context.user.id, input);
    if (prepared.plan.steps.length === 0) {
      return roadmapError(requestId, 409, "GOAL_ALREADY_MET", "Saved evidence already meets the mastery threshold for this goal.");
    }

    const clientRequestId = typeof suppliedRequestId === "string" ? suppliedRequestId : randomUUID();
    const { data, error } = await context.client.rpc("create_learning_roadmap", {
      p_goal_slug: input.goal,
      p_weekly_study_minutes: input.weeklyStudyMinutes,
      p_experience_level: input.experienceLevel,
      p_preferred_language: input.preferredLanguage,
      p_target_country: input.targetCountry,
      p_algorithm_version: prepared.plan.algorithmVersion,
      p_generation_reason: "Generated from the published skill graph and this learner’s saved assessment evidence.",
      p_total_learning_minutes: prepared.plan.totalLearningMinutes,
      p_estimated_total_minutes: prepared.plan.estimatedTotalMinutes,
      p_estimated_duration_weeks: prepared.plan.estimatedDurationWeeks,
      p_steps: prepared.steps,
      p_request_id: clientRequestId,
      p_previous_roadmap_id: null,
      p_assessment_attempt_id: null,
    });
    if (error) return mapRoadmapError(error, requestId);

    const roadmapId = data?.roadmapId;
    if (typeof roadmapId !== "string" || !UUID_PATTERN.test(roadmapId)) {
      console.error("Roadmap create RPC returned no roadmap ID", { requestId });
      return roadmapError(requestId, 503, "ROADMAP_SAVE_FAILED", "The roadmap was generated but could not be confirmed as saved.");
    }
    const saved = await getOwnedRoadmap(context.client, context.user.id, roadmapId);
    if (!saved) return roadmapError(requestId, 503, "ROADMAP_READBACK_FAILED", "The roadmap was saved but could not be reloaded.");

    return roadmapJson({
      ...saved,
      estimatedScheduleExplanation: prepared.plan.scheduleExplanation,
      requestId: clientRequestId,
      idempotentReplay: data.idempotentReplay === true,
    }, requestId, 201);
  } catch (error) {
    if (error instanceof Error && error.name === "RoadmapServiceError") {
      return mapRoadmapError(error as Error & { code?: string }, requestId);
    }
    console.error("Roadmap generation failed", { requestId });
    return roadmapError(requestId, 503, "ROADMAP_GENERATION_FAILED", "The published pathway could not be loaded. Try again later.");
  }
}
