import { authenticateRoadmapRequest } from "@/lib/supabase-request";
import { authError, mapRoadmapError, roadmapError, roadmapJson, requestIdFrom, UUID_PATTERN } from "@/lib/roadmap-http";

export async function GET(req: Request, context: { params: Promise<{ skillId: string }> }) {
  const requestId = requestIdFrom(req);
  const auth = await authenticateRoadmapRequest(req);
  if (!auth.ok) return authError(auth, requestId);
  const { skillId } = await context.params;
  if (!UUID_PATTERN.test(skillId)) return roadmapError(requestId, 404, "SKILL_NOT_FOUND", "Skill not found.");

  const { data: skill, error: skillError } = await auth.client.from("skills")
    .select("id,slug,name,description,mastery_threshold")
    .eq("id", skillId).eq("status", "published").maybeSingle();
  if (skillError) return mapRoadmapError(skillError, requestId);
  if (!skill) return roadmapError(requestId, 404, "SKILL_NOT_FOUND", "Skill not found.");

  const [{ data: dependencies, error: dependencyError }, { data: progress, error: progressError }] = await Promise.all([
    auth.client.from("skill_dependencies")
      .select("dependency_type,minimum_mastery_threshold,prerequisite_skill_id,prerequisite:skills!skill_dependencies_prerequisite_skill_id_fkey(id,slug,name,description,mastery_threshold)")
      .eq("skill_id", skillId),
    auth.client.from("learner_skill_progress").select("skill_id,status,mastery_score")
      .eq("user_id", auth.user.id),
  ]);
  if (dependencyError) return mapRoadmapError(dependencyError, requestId);
  if (progressError) return mapRoadmapError(progressError, requestId);

  const progressBySkill = new Map(((progress ?? []) as Array<{ skill_id: string; status: string; mastery_score: number | null }>)
    .map((item) => [item.skill_id, item]));
  const result = ((dependencies ?? []) as Array<{
    dependency_type: "required" | "recommended";
    minimum_mastery_threshold: number | null;
    prerequisite_skill_id: string;
    prerequisite: { id: string; slug: string; name: string; description: string; mastery_threshold: number } | Array<{ id: string; slug: string; name: string; description: string; mastery_threshold: number }> | null;
  }>).map((edge) => {
    const prerequisite = Array.isArray(edge.prerequisite) ? edge.prerequisite[0] ?? null : edge.prerequisite;
    const learnerProgress = progressBySkill.get(edge.prerequisite_skill_id);
    const threshold = edge.minimum_mastery_threshold ?? prerequisite?.mastery_threshold ?? 100;
    const score = learnerProgress?.mastery_score === null || learnerProgress?.mastery_score === undefined
      ? null : Number(learnerProgress.mastery_score);
    return {
      type: edge.dependency_type,
      minimumMasteryThreshold: edge.minimum_mastery_threshold,
      skill: prerequisite,
      learnerEvidence: {
        status: learnerProgress?.status ?? "not_started",
        masteryScore: score,
        satisfiesDependency: Boolean(score !== null && score >= threshold && ["completed", "mastered"].includes(learnerProgress?.status ?? "")),
        selfReportedKnowledgeIsNotVerified: learnerProgress?.status === "not_started" || learnerProgress?.status === undefined,
      },
    };
  });

  return roadmapJson({ skill, prerequisites: result, requestId }, requestId);
}
