import type { SupabaseClient } from "@supabase/supabase-js";
import {
  generateRoadmapPlan,
  RoadmapGraphError,
  type DependencyType,
  type PlannedRoadmapStep,
  type RoadmapSkill,
  type SkillDependency,
  type SkillProgressSnapshot,
} from "@/lib/roadmap-engine";

type DatabaseSkill = {
  id: string;
  slug: string;
  name: string;
  description: string;
  estimated_effort_minutes: number;
  mastery_threshold: number;
  learning_objectives: string[] | null;
  completion_criteria: string[] | null;
};

type DatabaseDependency = {
  skill_id: string;
  prerequisite_skill_id: string;
  dependency_type: DependencyType;
  minimum_mastery_threshold: number | null;
};

type DatabaseResource = {
  id: string;
  skill_id: string;
  title: string;
  resource_type: string;
  description: string;
  content_markdown: string | null;
  url: string | null;
  provider: string | null;
  language: string;
  access_type: string;
  verification_status: string;
  last_verified_at: string | null;
  estimated_minutes: number | null;
  completion_criteria: string[] | null;
};

export class RoadmapServiceError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = "RoadmapServiceError";
  }
}

export interface RoadmapGenerationInput {
  goal: string;
  weeklyStudyMinutes: number;
  experienceLevel: "beginner" | "junior" | "intermediate" | "senior";
  preferredLanguage: string;
  targetCountry: string | null;
}

export interface PreparedRoadmap {
  pathway: { id: string; slug: string; name: string; description: string };
  plan: ReturnType<typeof generateRoadmapPlan>;
  steps: Array<Record<string, unknown>>;
}

function throwQueryError(error: { code?: string; message?: string } | null, operation: string): void {
  if (error) {
    console.error(`Roadmap ${operation} query failed`, { errorCode: error.code ?? "unknown" });
    throw new RoadmapServiceError("ROADMAP_DATA_UNAVAILABLE", "Published pathway data is unavailable.");
  }
}

function toClientActivity(resource: DatabaseResource) {
  return {
    resourceId: resource.id,
    title: resource.title,
    type: resource.resource_type,
    description: resource.description,
    contentMarkdown: resource.content_markdown,
    url: resource.url,
    provider: resource.provider,
    language: resource.language,
    accessType: resource.access_type,
    verificationStatus: resource.verification_status,
    lastVerifiedAt: resource.last_verified_at,
    estimatedMinutes: resource.estimated_minutes,
    completionCriteria: resource.completion_criteria ?? [],
  };
}

export async function prepareRoadmap(
  client: SupabaseClient,
  userId: string,
  input: RoadmapGenerationInput
): Promise<PreparedRoadmap> {
  const { data: pathwayData, error: pathwayError } = await client
    .from("learning_pathways")
    .select("id,slug,name,description")
    .eq("slug", input.goal)
    .eq("status", "published")
    .maybeSingle();
  throwQueryError(pathwayError, "pathway");
  if (!pathwayData) throw new RoadmapServiceError("UNSUPPORTED_GOAL", "No published pathway exists for this goal.");

  const { data: pathwaySkillData, error: pathwaySkillError } = await client
    .from("learning_pathway_skills")
    .select("skill_id,sequence_hint,is_target_skill")
    .eq("pathway_id", pathwayData.id)
    .order("sequence_hint");
  throwQueryError(pathwaySkillError, "pathway skill");
  const pathwaySkills = (pathwaySkillData ?? []) as Array<{
    skill_id: string;
    sequence_hint: number;
    is_target_skill: boolean;
  }>;
  if (pathwaySkills.length === 0) throw new RoadmapServiceError("UNSUPPORTED_GOAL", "This pathway has no published skills.");

  const [{ data: skillData, error: skillError }, { data: dependencyData, error: dependencyError }, { data: progressData, error: progressError }] = await Promise.all([
    client.from("skills").select("id,slug,name,description,estimated_effort_minutes,mastery_threshold,learning_objectives,completion_criteria").eq("status", "published"),
    client.from("skill_dependencies").select("skill_id,prerequisite_skill_id,dependency_type,minimum_mastery_threshold"),
    client.from("learner_skill_progress").select("skill_id,status,mastery_score").eq("user_id", userId),
  ]);
  throwQueryError(skillError, "skill");
  throwQueryError(dependencyError, "dependency");
  throwQueryError(progressError, "progress");

  const pathwayOrder = new Map(pathwaySkills.map((item) => [item.skill_id, item.sequence_hint]));
  const skills: RoadmapSkill[] = ((skillData ?? []) as DatabaseSkill[]).map((skill) => ({
    id: skill.id,
    slug: skill.slug,
    name: skill.name,
    description: skill.description,
    estimatedEffortMinutes: Number(skill.estimated_effort_minutes),
    masteryThreshold: Number(skill.mastery_threshold),
    sequenceHint: pathwayOrder.get(skill.id) ?? 100000,
    learningObjectives: skill.learning_objectives ?? [],
    completionCriteria: skill.completion_criteria ?? [],
  }));
  const dependencies: SkillDependency[] = ((dependencyData ?? []) as DatabaseDependency[]).map((edge) => ({
    skillId: edge.skill_id,
    prerequisiteSkillId: edge.prerequisite_skill_id,
    dependencyType: edge.dependency_type,
    minimumMasteryThreshold: edge.minimum_mastery_threshold === null ? null : Number(edge.minimum_mastery_threshold),
  }));
  const progress: SkillProgressSnapshot[] = ((progressData ?? []) as Array<{
    skill_id: string;
    status: SkillProgressSnapshot["status"];
    mastery_score: number | null;
  }>).map((item) => ({
    skillId: item.skill_id,
    status: item.status,
    masteryScore: item.mastery_score === null ? null : Number(item.mastery_score),
  }));
  const targetSkillIds = pathwaySkills.filter((item) => item.is_target_skill).map((item) => item.skill_id);

  let plan: ReturnType<typeof generateRoadmapPlan>;
  try {
    plan = generateRoadmapPlan({ skills, dependencies, targetSkillIds, progress, weeklyStudyMinutes: input.weeklyStudyMinutes });
  } catch (error) {
    if (error instanceof RoadmapGraphError) throw new RoadmapServiceError(error.code, error.message);
    throw error;
  }
  if (plan.steps.length === 0 && !input.goal) {
    throw new RoadmapServiceError("UNSUPPORTED_GOAL", "No roadmap steps are available for this goal.");
  }

  const planSkillIds = plan.steps.map((step) => step.skillId);
  const { data: resourceData, error: resourceError } = planSkillIds.length > 0
    ? await client.from("learning_resources")
        .select("id,skill_id,title,resource_type,description,content_markdown,url,provider,language,access_type,verification_status,last_verified_at,estimated_minutes,completion_criteria")
        .in("skill_id", planSkillIds)
        .order("sort_order")
    : { data: [], error: null };
  throwQueryError(resourceError, "resource");
  const resourcesBySkill = new Map<string, ReturnType<typeof toClientActivity>[]>();
  for (const resource of (resourceData ?? []) as DatabaseResource[]) {
    const current = resourcesBySkill.get(resource.skill_id) ?? [];
    current.push(toClientActivity(resource));
    resourcesBySkill.set(resource.skill_id, current);
  }

  const steps = plan.steps.map((step: PlannedRoadmapStep) => ({
    skillId: step.skillId,
    sequenceNumber: step.sequenceNumber,
    status: step.status,
    estimatedMinutes: step.estimatedMinutes,
    completionCriteria: step.completionCriteria,
    prerequisites: step.prerequisites,
    activities: resourcesBySkill.get(step.skillId) ?? [],
    recommendedReason: step.recommendedReason,
  }));

  return {
    pathway: pathwayData,
    plan,
    steps,
  };
}

export async function getOwnedRoadmap(client: SupabaseClient, userId: string, roadmapId: string) {
  const { data: roadmap, error: roadmapError } = await client
    .from("roadmaps")
    .select("*")
    .eq("id", roadmapId)
    .eq("user_id", userId)
    .maybeSingle();
  throwQueryError(roadmapError, "roadmap read");
  if (!roadmap) return null;

  const [{ data: pathway, error: pathwayError }, { data: stepData, error: stepError }, { data: eventData, error: eventError }, { data: versionData, error: versionError }] = await Promise.all([
    client.from("learning_pathways").select("slug,name,description,content_version").eq("id", roadmap.pathway_id).maybeSingle(),
    client.from("roadmap_steps").select("*").eq("roadmap_id", roadmap.id).order("sequence_number"),
    client.from("roadmap_events").select("id,event_type,previous_version,new_version,reason,metadata,created_at").eq("roadmap_id", roadmap.id).order("created_at"),
    client.from("roadmaps").select("id,version,status,previous_roadmap_id,algorithm_version,generation_reason,created_at,updated_at,estimated_duration_weeks")
      .eq("user_id", userId).eq("pathway_id", roadmap.pathway_id).order("version"),
  ]);
  throwQueryError(pathwayError, "pathway read");
  throwQueryError(stepError, "step read");
  throwQueryError(eventError, "event read");
  throwQueryError(versionError, "roadmap version history read");

  const normalizedSteps = (stepData ?? []).map((step) => {
    const skill = (step.skill_snapshot ?? {}) as Record<string, unknown>;
    return {
      id: step.id,
      skillId: step.skill_id,
      skillSlug: typeof skill.slug === "string" ? skill.slug : "unknown-skill",
      title: typeof skill.name === "string" ? skill.name : "Learning checkpoint",
      description: typeof skill.description === "string" ? skill.description : "",
      sequenceNumber: step.sequence_number,
      status: step.status,
      estimatedMinutes: step.estimated_minutes,
      learningObjectives: Array.isArray(skill.learningObjectives) ? skill.learningObjectives : [],
      completionCriteria: step.completion_criteria ?? [],
      prerequisites: Array.isArray(step.prerequisites_snapshot) ? step.prerequisites_snapshot : [],
      activities: Array.isArray(step.activities_snapshot) ? step.activities_snapshot : [],
      recommendedReason: step.recommended_reason,
    };
  });

  return {
    roadmap: {
      id: roadmap.id,
      goal: pathway?.slug ?? "unknown",
      goalName: pathway?.name ?? "Learning pathway",
      description: pathway?.description ?? "",
      version: roadmap.version,
      status: roadmap.status,
      algorithmVersion: roadmap.algorithm_version,
      generationReason: roadmap.generation_reason,
      weeklyStudyMinutes: roadmap.weekly_study_minutes,
      totalLearningMinutes: roadmap.total_learning_minutes,
      estimatedTotalMinutes: roadmap.estimated_total_minutes,
      estimatedDurationWeeks: roadmap.estimated_duration_weeks,
      createdAt: roadmap.created_at,
      updatedAt: roadmap.updated_at,
      steps: normalizedSteps,
      events: eventData ?? [],
      versions: versionData ?? [],
    },
  };
}

export async function listOwnedCurrentRoadmaps(client: SupabaseClient, userId: string) {
  const { data, error } = await client.from("roadmaps").select("id,pathway_id,version,status,estimated_duration_weeks,created_at")
    .eq("user_id", userId).in("status", ["active", "completed"]).order("created_at", { ascending: false });
  throwQueryError(error, "current roadmap list");
  return data ?? [];
}
