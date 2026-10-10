import { NextResponse } from "next/server";
import { generateCareerAssessmentAnalysis } from "@/lib/gemini";
import { initialUserProfile } from "@/lib/career-data";

export async function GET() {
  return NextResponse.json({
    candidate: initialUserProfile.name,
    targetRole: initialUserProfile.targetRole,
    readinessScore: initialUserProfile.readinessScore,
    assessedSkills: initialUserProfile.skills,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { targetRole, answers, weeklyHours } = body;

    // Aggregate skill points from answers
    const calculatedSkills: Record<string, number> = {
      Python: 75,
      SQL: 70,
      "Machine Learning": 68,
      PyTorch: 60,
      "System Design": 65,
      "LLMs & RAG": 72,
    };

    if (answers && typeof answers === "object") {
      Object.keys(answers).forEach((k) => {
        const val = Number(answers[k]);
        if (!isNaN(val)) {
          calculatedSkills["System Design"] = Math.min(100, calculatedSkills["System Design"] + 3);
          calculatedSkills["LLMs & RAG"] = Math.min(100, calculatedSkills["LLMs & RAG"] + 4);
        }
      });
    }

    const aiIntelligence = await generateCareerAssessmentAnalysis({
      targetRole: targetRole || "AI Solutions Architect",
      skills: calculatedSkills,
      timeAvailableHours: Number(weeklyHours) || 12,
    });

    return NextResponse.json({
      success: true,
      evaluatedAt: new Date().toISOString(),
      targetRole: targetRole || "AI Solutions Architect",
      ...aiIntelligence,
    });
  } catch (error: any) {
    console.error("Assessment API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Failed to process assessment",
        fallbackData: {
          readinessScore: 68,
          priority_skills: ["PyTorch", "System Design", "RAG Pipeline Architecture"],
          recommended_projects: ["Enterprise Hybrid RAG Assistant", "Stream Feature Store"],
          nextStep: "Master HNSW Vector Indexing & Distributed Model Serving",
        },
      },
      { status: 500 }
    );
  }
}
