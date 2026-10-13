export interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetRole: string;
  experienceLevel: "" | "Entry" | "Junior" | "Mid-Level" | "Senior" | "Lead";
  readinessScore: number;
  weeklyHours: number;
  currentStreakDays: number;
  verifiedBadgesCount: number;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioSlug: string;
  bio: string;
  skills: { [skill: string]: number };
}

export interface CareerRole {
  id: string;
  title: string;
  category: "AI & ML" | "Software Engineering" | "Data & Quant" | "Cloud & DevOps" | "Systems & Security";
  description: string;
  keySkills: string[];
}

export interface SkillGapItem {
  skill: string;
  category: string;
  actionableStep: string;
  recommendedResource: string;
}

export interface AssessmentQuestion {
  id: number;
  category: string;
  title: string;
  question: string;
  codeSnippet?: string;
  options: {
    label: string;
    text: string;
    weight: number;
    skillTags: string[];
  }[];
}

export interface AssessmentResult {
  score: number;
  readinessPercentage: number;
  evaluatedRole: string;
  strongPillars: string[];
  growthPillars: string[];
  prioritySkills: string[];
  recommendedProjects: string[];
  nextSprintFocus: string;
  executiveSummary: string;
  completedAt: string;
}

export interface RoadmapModule {
  id: string;
  title: string;
  description: string;
  hours: number;
  completed: boolean;
  resourceLink?: string;
}

export interface RoadmapPhase {
  phaseNumber: number;
  phaseTitle: string;
  status: "not-started";
  durationWeeks: string;
  estimatedHours: number;
  modules: RoadmapModule[];
}

export interface IndustryProject {
  id: string;
  title: string;
  tagline: string;
  difficulty: "Intermediate" | "Advanced" | "Production-Grade";
  estimatedHours: number;
  techStack: string[];
  architecturalOverview: string;
  architectureDiagramType: string;
  deliverables: string[];
  rubricCriteria: string[];
  githubTemplateUrl?: string;
  liveDemoUrl?: string;
}

export interface InterviewQuestion {
  id: string;
  role: string;
  category: "Technical Architecture" | "Behavioral & Leadership" | "Coding & Data Structures" | "System Failure";
  prompt: string;
  sampleAnswerOverview: string;
  rubricKeyPoints: string[];
}
