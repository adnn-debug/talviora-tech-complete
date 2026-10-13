import { randomUUID } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  getOwnedRoadmap,
  prepareRoadmap,
  RoadmapServiceError,
  type RoadmapGenerationInput,
} from "@/lib/roadmap-service";

export interface RoadmapAdaptationResponse {
  body: Record<string, unknown>;
  status: 200 | 201;
}

/** Apply only saved assessment evidence to the learner's current roadmap. */
export async function adaptRoadmapAfterAssessment(
  client: SupabaseClient,
  userId: string,
  roadmapId: string,
  assessmentAttemptId: string
): Promise<RoadmapAdaptationResponse> {
  const existing = await getOwnedRoadmap(client, userId, roadmapId);
  if (!existing || existing.roadmap.status !== "active") {
    throw new RoadmapServiceError("ROADMAP_NOT_FOUND", "Active roadmap not found.");
  }

  const { data: attempt, error: attemptError } = await client.from("assessment_attempts")
    .select("id,result,roadmap_id")
    .eq("id", assessmentAttemptId)
    .eq("user_id", userId)
    .eq("roadmap_id", roadmapId)
    .maybeSingle();
  if (attemptError) throw attemptError;
  if (!attempt) {
    throw new RoadmapServiceError("ASSESSMENT_EVIDENCE_NOT_FOUND", "Assessment evidence not found for this roadmap.");
  }

  if ((attempt.result as Record<string, unknown>)?.mastered !== true) {
    const { data, error } = await client.rpc("record_roadmap_review_event", {
      p_roadmap_id: roadmapId,
      p_assessment_attempt_id: assessmentAttemptId,
    });
    if (error) throw error;
    return { body: { adaptation: data }, status: 200 };
  }

  const { data: learningProfile, error: profileError } = await client.from("learner_profiles")
    .select("weekly_study_minutes,experience_level,preferred_language,target_country")
    .eq("user_id", userId)
    .maybeSingle();
  if (profileError) throw profileError;

  const input: RoadmapGenerationInput = {
    goal: existing.roadmap.goal,
    weeklyStudyMinutes: Number(learningProfile?.weekly_study_minutes ?? existing.roadmap.weeklyStudyMinutes),
    experienceLevel: learningProfile?.experience_level ?? "beginner",
    preferredLanguage: learningProfile?.preferred_language ?? "en",
    targetCountry: learningProfile?.target_country ?? null,
  };
  const prepared = await prepareRoadmap(client, userId, input);
  const { data, error } = await client.rpc("create_learning_roadmap", {
    p_goal_slug: input.goal,
    p_weekly_study_minutes: input.weeklyStudyMinutes,
    p_experience_level: input.experienceLevel,
    p_preferred_language: input.preferredLanguage,
    p_target_country: input.targetCountry,
    p_algorithm_version: prepared.plan.algorithmVersion,
    p_generation_reason: `Updated after saved mastery evidence for the current roadmap. ${prepared.plan.scheduleExplanation}`,
    p_total_learning_minutes: prepared.plan.totalLearningMinutes,
    p_estimated_total_minutes: prepared.plan.estimatedTotalMinutes,
    p_estimated_duration_weeks: prepared.plan.estimatedDurationWeeks,
    p_steps: prepared.steps,
    p_request_id: randomUUID(),
    p_previous_roadmap_id: roadmapId,
    p_assessment_attempt_id: assessmentAttemptId,
  });
  if (error) throw error;

  const newRoadmapId = data?.roadmapId;
  if (typeof newRoadmapId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(newRoadmapId)) {
    throw new RoadmapServiceError("ROADMAP_ADAPTATION_FAILED", "The saved mastery result could not be applied to a new roadmap version.");
  }
  const next = await getOwnedRoadmap(client, userId, newRoadmapId);
  if (!next) {
    throw new RoadmapServiceError("ROADMAP_READBACK_FAILED", "The updated roadmap could not be reloaded.");
  }

  return {
    body: {
      ...next,
      adaptation: {
        changed: true,
        previousVersion: existing.roadmap.version,
        newVersion: next.roadmap.version,
        reason: "A saved assessment met the skill’s mastery threshold, so that skill is omitted from the new version. Its prior step and attempt remain in history.",
      },
      estimatedScheduleExplanation: prepared.plan.scheduleExplanation,
    },
    status: 201,
  };
}
