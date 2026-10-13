import { NextResponse } from "next/server";
import { assessmentQuestionsList } from "@/lib/career-data";
import { generateCareerAssessmentAnalysis, isGeminiConfigured } from "@/lib/gemini";
import { getAuthenticatedUser, sanitizeInput } from "@/lib/auth-server";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export async function GET(req: Request) {
  const user = await getAuthenticatedUser(req);
  if (!user.id) {
    return NextResponse.json({ success: false, error: "Sign in to load saved assessment results." }, { status: 401 });
  }
  if (!isSupabaseConfigured) {
    return NextResponse.json({ success: false, error: "Assessment history is unavailable until Supabase is configured." }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("user_id", user.id)
    .order("assessed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Assessment history read failed:", error.message);
    return NextResponse.json({ success: false, error: "Could not load assessment history." }, { status: 503 });
  }

  return NextResponse.json({ success: true, assessment: data ?? null, persisted: true });
}

export async function POST(req: Request) {
  if (!isGeminiConfigured) {
    return NextResponse.json(
      { success: false, error: "Assessment feedback is unavailable until GEMINI_API_KEY is configured on the server." },
      { status: 503 }
    );
  }

  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ success: false, error: "Invalid request payload format." }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const targetRole = sanitizeInput(input.targetRole, 100);
    const answers = input.answers;
    if (!targetRole) return NextResponse.json({ success: false, error: "Choose a target role." }, { status: 400 });
    if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
      return NextResponse.json({ success: false, error: "Answer every assessment question before submitting." }, { status: 400 });
    }

    const submitted = answers as Record<string, unknown>;
    const skillScores = new Map<string, number[]>();

    for (const question of assessmentQuestionsList) {
      const selectedLabel = sanitizeInput(submitted[String(question.id)], 4);
      const selectedOption = question.options.find((option) => option.label === selectedLabel);
      if (!selectedOption) {
        return NextResponse.json({ success: false, error: "Answer every assessment question using one of its listed options." }, { status: 400 });
      }

      const maxWeight = Math.max(...question.options.map((option) => option.weight), 1);
      for (const skill of selectedOption.skillTags) {
        const current = skillScores.get(skill) ?? [];
        current.push(Math.round((selectedOption.weight / maxWeight) * 100));
        skillScores.set(skill, current);
      }
    }

    const skills = Object.fromEntries(
      Array.from(skillScores.entries(), ([skill, scores]) => [
        skill,
        Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
      ])
    );

    const analysis = await generateCareerAssessmentAnalysis({ targetRole, skills });
    if (!Number.isFinite(analysis.readinessScore) || !Array.isArray(analysis.prioritySkills)) {
      return NextResponse.json({ success: false, error: "The AI provider returned an invalid assessment. Please retry." }, { status: 502 });
    }

    const evaluatedAt = new Date().toISOString();
    const user = await getAuthenticatedUser(req);
    let persisted = false;
    let persistenceMessage = "This assessment is available for this browser session and was not saved to an account.";

    if (user.id && isSupabaseConfigured) {
      const { error } = await supabase.from("assessments").insert({
        user_id: user.id,
        target_role: targetRole,
        readiness_score: analysis.readinessScore,
        strong_pillars: analysis.strongPillars,
        growth_pillars: analysis.growthPillars,
        priority_skills: analysis.prioritySkills,
        recommended_projects: analysis.recommendedProjects,
        next_sprint_focus: analysis.nextSprintFocus,
        executive_summary: analysis.executiveSummary,
        answers: submitted,
        assessed_at: evaluatedAt,
      });
      persisted = !error;
      persistenceMessage = error
        ? "Assessment feedback was generated but could not be saved to your account."
        : "Assessment feedback was saved to your account.";
      if (error) console.error("Assessment save failed:", error.message);
    }

    return NextResponse.json({
      success: true,
      evaluatedAt,
      targetRole,
      provider: "Google Gemini",
      persisted,
      persistenceMessage,
      skills,
      ...analysis,
    });
  } catch (error) {
    console.error("Assessment API error:", error);
    return NextResponse.json(
      { success: false, error: "Assessment feedback could not be generated. Check AI provider configuration and retry." },
      { status: 502 }
    );
  }
}
