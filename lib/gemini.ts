import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY?.trim() || "";
export const isGeminiConfigured = Boolean(apiKey && apiKey !== "your_gemini_api_key_here");
const modelName = process.env.GEMINI_MODEL?.trim() || "gemini-3.8-flash";

const genAI = isGeminiConfigured ? new GoogleGenAI({ apiKey }) : null;

async function generateText(prompt: string, temperature: number, maxOutputTokens?: number) {
  if (!genAI) {
    throw new Error("Gemini is not configured. Add GEMINI_API_KEY on the server to enable AI features.");
  }

  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  try {
    const result = await Promise.race([
      genAI.models.generateContent({
        model: modelName,
        contents: prompt,
        config: { temperature, responseMimeType: "application/json", ...(maxOutputTokens ? { maxOutputTokens } : {}) },
      }),
      new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => reject(new Error("AI provider request timed out.")), 12000);
      }),
    ]);
    if (!result.text) throw new Error("AI provider returned no text.");
    return result.text;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

function parseJson<T>(rawText: string): T {
  const clean = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
  const firstBrace = clean.indexOf("{");
  const lastBrace = clean.lastIndexOf("}");
  const candidate = firstBrace !== -1 && lastBrace > firstBrace
    ? clean.slice(firstBrace, lastBrace + 1)
    : clean;
  return JSON.parse(candidate) as T;
}

export async function generateCareerAssessmentAnalysis(params: {
  targetRole: string;
  skills: Record<string, number>;
}) {
  const prompt = `
You are the career-learning feedback assistant for TALVIORA TECH. Give cautious, specific educational guidance from the submitted assessment scores. Do not claim hiring outcomes, salary predictions, percentile rankings, or verified readiness.
Learner-selected target role (for context, not an external benchmark): ${params.targetRole}
Observed skill scores (0-100): ${JSON.stringify(params.skills)}

Return only JSON with readinessScore (0-100, derived only from the supplied scores), strongPillars (array), growthPillars (array), prioritySkills (array), recommendedProjects (array), nextSprintFocus (string), and executiveSummary (string). Mark readiness as an assessment result, not a job guarantee.
`;
  return parseJson<{
    readinessScore: number;
    strongPillars: string[];
    growthPillars: string[];
    prioritySkills: string[];
    recommendedProjects: string[];
    nextSprintFocus: string;
    executiveSummary: string;
  }>(await generateText(prompt, 0.3));
}

export async function evaluateInterviewResponse(params: {
  role: string;
  question: string;
  userAnswer: string;
}) {
  const prompt = `
Evaluate this practice answer against the question and role. Give evidence-based feedback from the words supplied; do not imply this is a real hiring assessment.
Role: ${params.role}
Question: ${params.question}
Candidate answer: ${params.userAnswer}

Return only JSON with rating (1-10), strengths (array), areasForImprovement (array), idealTalkingPoints (array), and verdict (string).
`;
  return parseJson<{
    rating: number;
    strengths: string[];
    areasForImprovement: string[];
    idealTalkingPoints: string[];
    verdict: string;
  }>(await generateText(prompt, 0.3));
}

export async function generateMentorReply(
  message: string,
  history: { role: "user" | "assistant"; content: string }[] = []
) {
  const prompt = `
You are TALVIORA TECH's learning and career mentor. Give practical, accurate guidance that helps a learner understand, practise, build, or apply a technology skill. Do not invent personal progress, live job information, salary data, or guaranteed outcomes. If current facts are requested, explain that no live source is connected.
Conversation so far (earliest first):
${history.map((item) => `${item.role === "user" ? "Learner" : "Mentor"}: ${item.content}`).join("\\n")}
Learner's latest message: ${message}

Return only JSON with reply (string) and suggestedNextStep (string). Give a thorough, well-structured answer when the question merits it; include examples and steps while staying focused.
`;
  return parseJson<{ reply: string; suggestedNextStep: string }>(await generateText(prompt, 0.5, 8192));
}

export async function generatePersonalisedLearningPlan(params: {
  targetField: string;
  experienceLevel: string;
  dailyStudyMinutes: number;
  mainGoal: string;
}) {
  const prompt = `
You are the curriculum and career planning guide for TALVIORA TECH.
Create an honest, realistic, encouraging, and structured learning journey plan for a learner based ONLY on their provided answers.
Target field: ${params.targetField}
Experience level: ${params.experienceLevel}
Daily study commitment: ${params.dailyStudyMinutes} minutes/day
Main practical goal: ${params.mainGoal}

Return ONLY valid JSON with this exact schema:
{
  "summary": "one or two sentence supportive summary of this custom plan",
  "todayTasks": [
    { "title": "concrete action", "durationMinutes": 20, "type": "reading" }
  ],
  "weeklyGoalHours": 5,
  "roadmapMilestones": [
    { "week": 1, "title": "Foundation Milestone", "desc": "description of what they will achieve" }
  ],
  "recommendedExercises": [
    { "title": "exercise title", "desc": "brief instructions", "actionUrl": "/learning", "actionLabel": "Practice in Sandbox" }
  ],
  "suggestedProjects": [
    { "title": "project name", "level": "Beginner", "deliverable": "what is built", "desc": "why this matters" }
  ],
  "recommendedNextAction": {
    "title": "immediate next step",
    "desc": "why do this first",
    "actionUrl": "/learning",
    "actionLabel": "Start Step 1"
  }
}
Do not guarantee hiring or make inflated claims. Tailor tasks realistically to ${params.dailyStudyMinutes} minutes per day.
`;
  return parseJson<{
    summary: string;
    todayTasks: { title: string; durationMinutes: number; type: "reading" | "practice" | "quiz" | "project" }[];
    weeklyGoalHours: number;
    roadmapMilestones: { week: number; title: string; desc: string }[];
    recommendedExercises: { title: string; desc: string; actionUrl: string; actionLabel: string }[];
    suggestedProjects: { title: string; level: string; deliverable: string; desc: string }[];
    recommendedNextAction: { title: string; desc: string; actionUrl: string; actionLabel: string };
  }>(await generateText(prompt, 0.4));
}

