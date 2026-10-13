export type DependencyType = "required" | "recommended";

export interface RoadmapSkill {
  id: string;
  slug: string;
  name: string;
  description: string;
  estimatedEffortMinutes: number;
  masteryThreshold: number;
  sequenceHint: number;
  learningObjectives: string[];
  completionCriteria: string[];
}

export interface SkillDependency {
  skillId: string;
  prerequisiteSkillId: string;
  dependencyType: DependencyType;
  minimumMasteryThreshold: number | null;
}

export interface SkillProgressSnapshot {
  skillId: string;
  status: "not_started" | "in_progress" | "practice_required" | "completed" | "mastered";
  masteryScore: number | null;
}

export interface PlannedPrerequisite {
  skillId: string;
  slug: string;
  name: string;
  dependencyType: DependencyType;
  minimumMasteryThreshold: number | null;
  masteryScore: number | null;
  includedAsStep: boolean;
  satisfied: boolean;
}

export interface PlannedRoadmapStep {
  skillId: string;
  skillSlug: string;
  title: string;
  description: string;
  sequenceNumber: number;
  status: SkillProgressSnapshot["status"];
  estimatedMinutes: number;
  learningObjectives: string[];
  completionCriteria: string[];
  prerequisites: PlannedPrerequisite[];
  recommendedReason: string;
}

export interface GeneratedRoadmapPlan {
  algorithmVersion: "1.0.0";
  steps: PlannedRoadmapStep[];
  totalLearningMinutes: number;
  estimatedTotalMinutes: number;
  weeklyStudyMinutes: number;
  estimatedDurationWeeks: number;
  scheduleExplanation: string;
}

export class RoadmapGraphError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = "RoadmapGraphError";
  }
}

function compareSkills(a: RoadmapSkill, b: RoadmapSkill): number {
  return a.sequenceHint - b.sequenceHint || a.slug.localeCompare(b.slug);
}

function masteryScoreFor(skillId: string, progress: Map<string, SkillProgressSnapshot>): number | null {
  const score = progress.get(skillId)?.masteryScore;
  return typeof score === "number" && Number.isFinite(score) ? score : null;
}

function meetsThreshold(
  skillId: string,
  threshold: number,
  progress: Map<string, SkillProgressSnapshot>
): boolean {
  const evidence = progress.get(skillId);
  return Boolean(
    evidence &&
      (evidence.status === "completed" || evidence.status === "mastered") &&
      typeof evidence.masteryScore === "number" &&
      evidence.masteryScore >= threshold
  );
}

function isMastered(skill: RoadmapSkill, progress: Map<string, SkillProgressSnapshot>): boolean {
  const evidence = progress.get(skill.id);
  return Boolean(
    evidence?.status === "mastered" &&
      typeof evidence.masteryScore === "number" &&
      evidence.masteryScore >= skill.masteryThreshold
  );
}

function topologicalOrder(
  skills: RoadmapSkill[],
  dependencies: SkillDependency[]
): RoadmapSkill[] {
  const byId = new Map(skills.map((skill) => [skill.id, skill]));
  const inbound = new Map(skills.map((skill) => [skill.id, 0]));
  const outgoing = new Map(skills.map((skill) => [skill.id, [] as string[]]));

  for (const edge of dependencies) {
    inbound.set(edge.skillId, (inbound.get(edge.skillId) ?? 0) + 1);
    outgoing.get(edge.prerequisiteSkillId)!.push(edge.skillId);
  }

  const ready = skills.filter((skill) => inbound.get(skill.id) === 0).sort(compareSkills);
  const ordered: RoadmapSkill[] = [];
  while (ready.length > 0) {
    const current = ready.shift()!;
    ordered.push(current);
    for (const dependentId of outgoing.get(current.id)!.sort((left, right) => {
      return compareSkills(byId.get(left)!, byId.get(right)!);
    })) {
      const nextInbound = inbound.get(dependentId)! - 1;
      inbound.set(dependentId, nextInbound);
      if (nextInbound === 0) {
        ready.push(byId.get(dependentId)!);
        ready.sort(compareSkills);
      }
    }
  }

  if (ordered.length !== skills.length) {
    throw new RoadmapGraphError("DEPENDENCY_CYCLE", "The published skill graph contains a cycle.");
  }
  return ordered;
}

export function validateSkillGraph(skills: RoadmapSkill[], dependencies: SkillDependency[]): void {
  const byId = new Map<string, RoadmapSkill>();
  const slugSet = new Set<string>();

  for (const skill of skills) {
    if (!skill.id || !skill.slug || !skill.name.trim()) {
      throw new RoadmapGraphError("INVALID_SKILL", "Every skill needs an id, slug, and name.");
    }
    if (byId.has(skill.id) || slugSet.has(skill.slug)) {
      throw new RoadmapGraphError("DUPLICATE_SKILL", "The skill graph contains a duplicate id or slug.");
    }
    if (!Number.isInteger(skill.estimatedEffortMinutes) || skill.estimatedEffortMinutes < 1) {
      throw new RoadmapGraphError("INVALID_SKILL_EFFORT", `Skill ${skill.slug} has an invalid effort estimate.`);
    }
    if (!Number.isInteger(skill.masteryThreshold) || skill.masteryThreshold < 1 || skill.masteryThreshold > 100) {
      throw new RoadmapGraphError("INVALID_MASTERY_THRESHOLD", `Skill ${skill.slug} has an invalid mastery threshold.`);
    }
    byId.set(skill.id, skill);
    slugSet.add(skill.slug);
  }

  const edgeSet = new Set<string>();
  for (const edge of dependencies) {
    if (!byId.has(edge.skillId) || !byId.has(edge.prerequisiteSkillId)) {
      throw new RoadmapGraphError("MISSING_DEPENDENCY_SKILL", "A dependency points to a missing or unpublished skill.");
    }
    if (edge.skillId === edge.prerequisiteSkillId) {
      throw new RoadmapGraphError("SELF_DEPENDENCY", "A skill cannot depend on itself.");
    }
    if (edge.dependencyType !== "required" && edge.dependencyType !== "recommended") {
      throw new RoadmapGraphError("INVALID_DEPENDENCY_TYPE", "A dependency must be required or recommended.");
    }
    if (
      edge.minimumMasteryThreshold !== null &&
      (!Number.isInteger(edge.minimumMasteryThreshold) || edge.minimumMasteryThreshold < 0 || edge.minimumMasteryThreshold > 100)
    ) {
      throw new RoadmapGraphError("INVALID_DEPENDENCY_THRESHOLD", "A dependency threshold must be between 0 and 100.");
    }
    const key = `${edge.skillId}:${edge.prerequisiteSkillId}`;
    if (edgeSet.has(key)) {
      throw new RoadmapGraphError("DUPLICATE_DEPENDENCY", "The skill graph contains a duplicate dependency edge.");
    }
    edgeSet.add(key);
  }

  topologicalOrder(skills, dependencies);
}

export function generateRoadmapPlan(input: {
  skills: RoadmapSkill[];
  dependencies: SkillDependency[];
  targetSkillIds: string[];
  progress?: SkillProgressSnapshot[];
  weeklyStudyMinutes: number;
}): GeneratedRoadmapPlan {
  const { skills, dependencies, targetSkillIds, weeklyStudyMinutes } = input;
  validateSkillGraph(skills, dependencies);

  if (!Number.isInteger(weeklyStudyMinutes) || weeklyStudyMinutes < 30 || weeklyStudyMinutes > 2400) {
    throw new RoadmapGraphError("INVALID_STUDY_TIME", "Weekly study time must be from 30 to 2,400 minutes.");
  }
  if (targetSkillIds.length === 0) {
    throw new RoadmapGraphError("UNSUPPORTED_GOAL", "This learning goal does not have a published target skill.");
  }

  const byId = new Map(skills.map((skill) => [skill.id, skill]));
  const progress = new Map((input.progress ?? []).map((item) => [item.skillId, item]));
  const targetIds = Array.from(new Set(targetSkillIds));
  for (const id of targetIds) {
    if (!byId.has(id)) {
      throw new RoadmapGraphError("UNSUPPORTED_GOAL", "This learning goal includes an unpublished or missing skill.");
    }
  }

  const included = new Set<string>();
  const collectRequired = (skillId: string): void => {
    const skill = byId.get(skillId)!;
    if (isMastered(skill, progress) || included.has(skillId)) return;
    included.add(skillId);
    for (const edge of dependencies) {
      if (edge.skillId !== skillId || edge.dependencyType !== "required") continue;
      const prerequisite = byId.get(edge.prerequisiteSkillId)!;
      const threshold = edge.minimumMasteryThreshold ?? prerequisite.masteryThreshold;
      if (!meetsThreshold(prerequisite.id, threshold, progress)) collectRequired(prerequisite.id);
    }
  };
  targetIds.forEach(collectRequired);

  const ordered = topologicalOrder(skills, dependencies).filter((skill) => included.has(skill.id));
  const steps = ordered.map((skill, index): PlannedRoadmapStep => {
    const relatedEdges = dependencies.filter((edge) => edge.skillId === skill.id);
    const prerequisites: PlannedPrerequisite[] = relatedEdges
      .map((edge) => {
        const prerequisite = byId.get(edge.prerequisiteSkillId)!;
        const threshold = edge.minimumMasteryThreshold;
        const isSatisfied = threshold === null
          ? isMastered(prerequisite, progress)
          : meetsThreshold(prerequisite.id, threshold, progress);
        return {
          skillId: prerequisite.id,
          slug: prerequisite.slug,
          name: prerequisite.name,
          dependencyType: edge.dependencyType,
          minimumMasteryThreshold: threshold,
          masteryScore: masteryScoreFor(prerequisite.id, progress),
          includedAsStep: included.has(prerequisite.id),
          satisfied: isSatisfied,
        };
      })
      .sort((a, b) => a.dependencyType.localeCompare(b.dependencyType) || a.name.localeCompare(b.name));

    const includedRequired = prerequisites.filter((item) => item.dependencyType === "required" && item.includedAsStep);
    const outstandingRecommended = prerequisites.filter((item) => item.dependencyType === "recommended" && !item.satisfied);
    let recommendedReason = includedRequired.length > 0
      ? `Learn ${includedRequired.map((item) => item.name).join(", ")} first because the published pathway marks them as required prerequisites for ${skill.name}.`
      : "This is the next unsatisfied skill in the published beginner pathway; no unmet required prerequisite is ahead of it.";
    if (outstandingRecommended.length > 0) {
      recommendedReason += ` Optional background: ${outstandingRecommended.map((item) => item.name).join(", ")}. This does not block the step.`;
    }

    const evidence = progress.get(skill.id);
    return {
      skillId: skill.id,
      skillSlug: skill.slug,
      title: skill.name,
      description: skill.description,
      sequenceNumber: index + 1,
      status: evidence?.status ?? "not_started",
      estimatedMinutes: skill.estimatedEffortMinutes,
      learningObjectives: [...skill.learningObjectives],
      completionCriteria: [...skill.completionCriteria],
      prerequisites,
      recommendedReason,
    };
  });

  const totalLearningMinutes = steps.reduce((sum, step) => sum + step.estimatedMinutes, 0);
  const estimatedTotalMinutes = Math.ceil(totalLearningMinutes * 1.2);
  const estimatedDurationWeeks = steps.length === 0 ? 0 : Math.ceil(estimatedTotalMinutes / weeklyStudyMinutes);

  return {
    algorithmVersion: "1.0.0",
    steps,
    totalLearningMinutes,
    estimatedTotalMinutes,
    weeklyStudyMinutes,
    estimatedDurationWeeks,
    scheduleExplanation: steps.length === 0
      ? "The saved evidence meets the mastery threshold for every target skill in this pathway."
      : `${estimatedTotalMinutes} estimated minutes, including a 20% review and checkpoint allowance, divided by ${weeklyStudyMinutes} available minutes per week. This is a planning estimate, not a guarantee.`,
  };
}
