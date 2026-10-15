import { CATALOGUE_ITEMS, CatalogueItem } from "@/lib/catalogue-data";

export interface JourneyTask {
  id: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
  type: "reading" | "practice" | "quiz" | "project";
}

export interface JourneyMilestone {
  id: string;
  week: number;
  title: string;
  desc: string;
  completed: boolean;
}

export interface RecommendedExercise {
  id: string;
  title: string;
  desc: string;
  actionUrl: string;
  actionLabel: string;
}

export interface SuggestedProject {
  id: string;
  title: string;
  level: string;
  deliverable: string;
  desc: string;
}

export interface PersonalisedJourney {
  id: string;
  fieldId: string;
  fieldName: string;
  fieldCategory: string;
  fieldSummary: string;
  difficultyLevel: "Complete Beginner" | "Some Basics" | "Intermediate" | "Advanced";
  dailyStudyMinutes: number;
  dailyStudyLabel: string;
  weeklyGoalHours: number;
  completedHoursThisWeek: number;
  mainGoal: "learn_skill" | "build_projects" | "prepare_job" | "explore_freelancing" | "exploring";
  goalLabel: string;
  createdAt: string;
  updatedAt: string;
  isAiGenerated: boolean;
  generationModel: string;
  aiNotice: string;
  todayTasks: JourneyTask[];
  roadmapMilestones: JourneyMilestone[];
  recommendedExercises: RecommendedExercise[];
  suggestedProjects: SuggestedProject[];
  completedTopicIds: string[];
  recommendedNextAction: {
    title: string;
    desc: string;
    actionUrl: string;
    actionLabel: string;
  };
}

export interface PlanGenerationParams {
  fieldId: string;
  experienceLevel?: "Complete Beginner" | "Some Basics" | "Intermediate" | "Advanced";
  dailyStudyMinutes?: number;
  mainGoal?: "learn_skill" | "build_projects" | "prepare_job" | "explore_freelancing" | "exploring";
  previousJourney?: PersonalisedJourney | null;
}

const GOAL_LABELS: Record<string, string> = {
  learn_skill: "Learn a practical tech skill",
  build_projects: "Build real-world portfolio projects",
  prepare_job: "Prepare for a technology career",
  explore_freelancing: "Explore freelancing & client services",
  exploring: "Explore tech possibilities",
};

export function createDeterministicPlan(params: PlanGenerationParams): PersonalisedJourney {
  const item =
    CATALOGUE_ITEMS.find((i) => i.id === params.fieldId) ||
    CATALOGUE_ITEMS.find((i) => i.id === "lang-python") ||
    CATALOGUE_ITEMS[0];

  const experience = params.experienceLevel || "Complete Beginner";
  const dailyMins = params.dailyStudyMinutes || 45;
  const goal = params.mainGoal || "build_projects";
  const weeklyHours = Math.max(1, Math.round((dailyMins * 7) / 60));

  // Carry over previous progress if updating preferences
  const prev = params.previousJourney;
  const existingCompletedTopics = prev?.completedTopicIds || [];
  const existingCompletedHours = prev?.completedHoursThisWeek || 0;

  // Build custom daily tasks scaled to daily study minutes
  const todayTasks: JourneyTask[] = [
    {
      id: `task-${item.id}-1`,
      title: `Read: Foundations of ${item.name}`,
      durationMinutes: Math.min(15, Math.round(dailyMins * 0.3)),
      completed: prev?.todayTasks.find((t) => t.id === `task-${item.id}-1` || t.title === `Read: Foundations of ${item.name}`)?.completed || false,
      type: "reading",
    },
    {
      id: `task-${item.id}-2`,
      title: `Try It Yourself: Interactive ${item.name} sandbox practice`,
      durationMinutes: Math.max(15, Math.round(dailyMins * 0.5)),
      completed: prev?.todayTasks.find((t) => t.id === `task-${item.id}-2` || t.title === `Try It Yourself: Interactive ${item.name} sandbox practice`)?.completed || false,
      type: "practice",
    },
    {
      id: `task-${item.id}-3`,
      title: `Check understanding: 1-Question concept check`,
      durationMinutes: Math.max(5, Math.round(dailyMins * 0.2)),
      completed: prev?.todayTasks.find((t) => t.id === `task-${item.id}-3` || t.title === `Check understanding: 1-Question concept check`)?.completed || false,
      type: "quiz",
    },
  ];

  // Tailor milestones based on catalog learning stages
  const roadmapMilestones: JourneyMilestone[] = [
    {
      id: `ms-${item.id}-1`,
      week: 1,
      title: "Week 1: Core Fundamentals & Environment Setup",
      desc: item.learningStages.beginner,
      completed: existingCompletedTopics.includes(`ms-${item.id}-1`),
    },
    {
      id: `ms-${item.id}-2`,
      week: 2,
      title: "Week 2–3: Hands-On Practice & Mini-Scenarios",
      desc: `Build confidence with foundational commands and interactive exercises in ${item.name}.`,
      completed: existingCompletedTopics.includes(`ms-${item.id}-2`),
    },
    {
      id: `ms-${item.id}-3`,
      week: 4,
      title: "Week 4–6: Intermediate Architecture & Feature Building",
      desc: item.learningStages.intermediate,
      completed: existingCompletedTopics.includes(`ms-${item.id}-3`),
    },
    {
      id: `ms-${item.id}-4`,
      week: 8,
      title: "Week 7–10: Production Project & Portfolio Milestone",
      desc: item.learningStages.advanced,
      completed: existingCompletedTopics.includes(`ms-${item.id}-4`),
    },
  ];

  // Recommended exercises
  const recommendedExercises: RecommendedExercise[] = [
    {
      id: `rec-1`,
      title: `In-Browser Code Sandbox for ${item.name}`,
      desc: "Edit and execute code directly in your browser with immediate feedback and line outputs.",
      actionUrl: "/learning",
      actionLabel: "Open Sandbox",
    },
    {
      id: `rec-2`,
      title: `Check What You Know (Concept Diagnostic)`,
      desc: `Verify your understanding of ${item.name} concepts and discover any foundational areas to review.`,
      actionUrl: "/assessment",
      actionLabel: "Check What You Know",
    },
    {
      id: `rec-3`,
      title: `Explore Full Technology Blueprint`,
      desc: `Inspect real-world use cases, prerequisites, official documentation, and career tracks.`,
      actionUrl: "/catalogue",
      actionLabel: "Explore This Field",
    },
  ];

  // Suggested Projects
  const suggestedProjects: SuggestedProject[] = (item.projectIdeas || []).slice(0, 2).map((p, idx) => ({
    id: `proj-${item.id}-${idx}`,
    title: p.title,
    level: p.level,
    deliverable: p.deliverables || "Working code repository with documentation",
    desc: p.description,
  }));

  if (suggestedProjects.length === 0) {
    suggestedProjects.push({
      id: `proj-${item.id}-fallback`,
      title: `Hands-on ${item.name} Prototype`,
      level: "Beginner",
      deliverable: "Functional script or web interface demonstrating key features",
      desc: item.purpose,
    });
  }

  return {
    id: prev?.id || `journey-${Date.now()}`,
    fieldId: item.id,
    fieldName: item.name,
    fieldCategory: item.category,
    fieldSummary: item.plainLanguageSummary,
    difficultyLevel: experience,
    dailyStudyMinutes: dailyMins,
    dailyStudyLabel: `${dailyMins} minutes / day`,
    weeklyGoalHours: weeklyHours,
    completedHoursThisWeek: existingCompletedHours,
    mainGoal: goal,
    goalLabel: GOAL_LABELS[goal] || "Explore Tech Journey",
    createdAt: prev?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isAiGenerated: false,
    generationModel: "Deterministic Curriculum Engine (Structured Fallback)",
    aiNotice:
      "Structured Deterministic Plan • Generated based on your specific level and time inputs. Configure GEMINI_API_KEY for dynamic real-time AI critique.",
    todayTasks,
    roadmapMilestones,
    recommendedExercises,
    suggestedProjects,
    completedTopicIds: existingCompletedTopics,
    recommendedNextAction: {
      title: `Step 1: Open the Learning Studio Sandbox`,
      desc: `Run your first interactive exercise in ${item.name} to build immediate confidence.`,
      actionUrl: "/learning",
      actionLabel: "Start Practicing Now",
    },
  };
}

const STORAGE_KEY = "talviora_personalised_journey";

export function loadSavedJourney(): PersonalisedJourney | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersonalisedJourney;
  } catch (err) {
    console.warn("Could not load saved journey from localStorage:", err);
    return null;
  }
}

export function saveJourney(journey: PersonalisedJourney): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(journey));
  } catch (err) {
    console.warn("Could not save journey to localStorage:", err);
  }
}

export function toggleJourneyTask(
  journey: PersonalisedJourney,
  taskId: string
): PersonalisedJourney {
  const updatedTasks = journey.todayTasks.map((t) =>
    t.id === taskId ? { ...t, completed: !t.completed } : t
  );

  const completedCount = updatedTasks.filter((t) => t.completed).length;
  const taskMinutes = updatedTasks
    .filter((t) => t.completed)
    .reduce((acc, t) => acc + t.durationMinutes, 0);

  const updated: PersonalisedJourney = {
    ...journey,
    todayTasks: updatedTasks,
    completedHoursThisWeek: Math.min(
      journey.weeklyGoalHours,
      Math.round(((taskMinutes / 60) + (journey.completedHoursThisWeek || 0)) * 10) / 10
    ),
    updatedAt: new Date().toISOString(),
  };

  saveJourney(updated);
  return updated;
}

export function toggleJourneyMilestone(
  journey: PersonalisedJourney,
  milestoneId: string
): PersonalisedJourney {
  const updatedMilestones = journey.roadmapMilestones.map((m) =>
    m.id === milestoneId ? { ...m, completed: !m.completed } : m
  );

  const completedIds = updatedMilestones.filter((m) => m.completed).map((m) => m.id);

  // Preserve all prior completed topics and merge
  const allCompleted = Array.from(new Set([...journey.completedTopicIds, ...completedIds]));

  const updated: PersonalisedJourney = {
    ...journey,
    roadmapMilestones: updatedMilestones,
    completedTopicIds: allCompleted,
    updatedAt: new Date().toISOString(),
  };

  saveJourney(updated);
  return updated;
}
