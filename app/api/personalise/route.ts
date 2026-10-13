import { NextResponse } from "next/server";
import { isGeminiConfigured, generatePersonalisedLearningPlan } from "@/lib/gemini";
import { createDeterministicPlan, PersonalisedJourney, PlanGenerationParams } from "@/lib/personalised-journey";
import { getAuthenticatedUser, sanitizeInput, sanitizeNumber } from "@/lib/auth-server";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { CATALOGUE_ITEMS } from "@/lib/catalogue-data";

export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ success: false, error: "Invalid request payload format." }, { status: 400 });
    }

    const input = body as Record<string, unknown>;
    const fieldId = sanitizeInput(String(input.fieldId || "lang-python"), 50);
    const experienceLevel = (input.experienceLevel as PlanGenerationParams["experienceLevel"]) || "Complete Beginner";
    const dailyStudyMinutes = sanitizeNumber(input.dailyStudyMinutes, 15, 480, 45);
    const mainGoal = (input.mainGoal as PlanGenerationParams["mainGoal"]) || "build_projects";
    const previousJourney = (input.previousJourney as PersonalisedJourney | null) || null;

    const matchedItem = CATALOGUE_ITEMS.find((i) => i.id === fieldId) || CATALOGUE_ITEMS[0];

    let journey: PersonalisedJourney;
    let isAiGenerated = false;
    let generationModel = "Deterministic Curriculum Engine (Structured Fallback)";
    let aiNotice =
      "Structured Deterministic Plan • Generated based on your specific level and time inputs. Configure GEMINI_API_KEY for dynamic real-time AI critique.";

    if (isGeminiConfigured) {
      try {
        const aiPlan = await generatePersonalisedLearningPlan({
          targetField: matchedItem.name,
          experienceLevel,
          dailyStudyMinutes,
          mainGoal,
        });

        if (aiPlan && Array.isArray(aiPlan.todayTasks) && aiPlan.todayTasks.length > 0) {
          isAiGenerated = true;
          generationModel = "Google Gemini (gemini-3.8-flash)";
          aiNotice = "Personalised by Google Gemini based on your learning goals and study schedule.";

          const existingCompletedTopics = previousJourney?.completedTopicIds || [];

          journey = {
            id: previousJourney?.id || `journey-${Date.now()}`,
            fieldId: matchedItem.id,
            fieldName: matchedItem.name,
            fieldCategory: matchedItem.category,
            fieldSummary: matchedItem.plainLanguageSummary,
            difficultyLevel: experienceLevel,
            dailyStudyMinutes,
            dailyStudyLabel: `${dailyStudyMinutes} minutes / day`,
            weeklyGoalHours: aiPlan.weeklyGoalHours || Math.round((dailyStudyMinutes * 7) / 60),
            completedHoursThisWeek: previousJourney?.completedHoursThisWeek || 0,
            mainGoal,
            goalLabel: mainGoal,
            createdAt: previousJourney?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isAiGenerated: true,
            generationModel,
            aiNotice,
            todayTasks: aiPlan.todayTasks.map((t, idx) => ({
              id: `task-${matchedItem.id}-${idx}`,
              title: t.title,
              durationMinutes: t.durationMinutes || 20,
              completed: previousJourney?.todayTasks.find((pt) => pt.title === t.title)?.completed || false,
              type: t.type || "practice",
            })),
            roadmapMilestones: (aiPlan.roadmapMilestones || []).map((m, idx) => ({
              id: `ms-${matchedItem.id}-${idx}`,
              week: m.week || idx + 1,
              title: m.title,
              desc: m.desc,
              completed: existingCompletedTopics.includes(`ms-${matchedItem.id}-${idx}`),
            })),
            recommendedExercises: (aiPlan.recommendedExercises || []).map((e, idx) => ({
              id: `rec-${idx}`,
              title: e.title,
              desc: e.desc,
              actionUrl: e.actionUrl || "/learning",
              actionLabel: e.actionLabel || "Practice in Sandbox",
            })),
            suggestedProjects: (aiPlan.suggestedProjects || []).map((p, idx) => ({
              id: `proj-${idx}`,
              title: p.title,
              level: p.level || "Beginner",
              deliverable: p.deliverable || "Working repository",
              desc: p.desc,
            })),
            completedTopicIds: existingCompletedTopics,
            recommendedNextAction: aiPlan.recommendedNextAction || {
              title: "Step 1: Open the Learning Studio Sandbox",
              desc: `Run your first interactive exercise in ${matchedItem.name}.`,
              actionUrl: "/learning",
              actionLabel: "Start Practicing Now",
            },
          };
        } else {
          journey = createDeterministicPlan({
            fieldId: matchedItem.id,
            experienceLevel,
            dailyStudyMinutes,
            mainGoal,
            previousJourney,
          });
        }
      } catch (geminiError) {
        console.warn("Gemini plan generation encountered an issue, falling back to deterministic plan:", geminiError);
        journey = createDeterministicPlan({
          fieldId: matchedItem.id,
          experienceLevel,
          dailyStudyMinutes,
          mainGoal,
          previousJourney,
        });
      }
    } else {
      journey = createDeterministicPlan({
        fieldId: matchedItem.id,
        experienceLevel,
        dailyStudyMinutes,
        mainGoal,
        previousJourney,
      });
    }

    // Connect to user profile & tasks backend if authenticated and configured
    try {
      const user = await getAuthenticatedUser(req);
      if (user.id && isSupabaseConfigured) {
        const weeklyHours = Math.max(1, Math.min(100, Math.round((dailyStudyMinutes * 7) / 60)));
        await supabase
          .from("profiles")
          .update({
            target_role: matchedItem.name,
            experience_level: experienceLevel === "Complete Beginner" ? "Entry" : experienceLevel === "Some Basics" ? "Junior" : "Mid-Level",
            weekly_hours: weeklyHours,
            updated_at: new Date().toISOString(),
          })
          .eq("id", user.id);
      }
    } catch (dbError) {
      console.warn("Background profile sync skipped:", dbError);
    }

    return NextResponse.json({
      success: true,
      journey,
      isAiGenerated: journey.isAiGenerated,
      model: journey.generationModel,
      notice: journey.aiNotice,
    });
  } catch (err: any) {
    console.error("Personalised journey creation error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to generate learning plan" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const user = await getAuthenticatedUser(req);
    if (user.id && isSupabaseConfigured) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile && profile.target_role) {
        const matched =
          CATALOGUE_ITEMS.find((c) =>
            c.name.toLowerCase().includes(profile.target_role.toLowerCase())
          ) || CATALOGUE_ITEMS[0];
        const journey = createDeterministicPlan({
          fieldId: matched.id,
          experienceLevel:
            profile.experience_level === "Entry"
              ? "Complete Beginner"
              : profile.experience_level === "Junior"
              ? "Some Basics"
              : "Intermediate",
          dailyStudyMinutes: profile.weekly_hours
            ? Math.round((profile.weekly_hours * 60) / 7)
            : 45,
        });
        return NextResponse.json({ success: true, journey });
      }
    }

    // Default fallback plan for guest visitors
    const defaultJourney = createDeterministicPlan({ fieldId: "lang-python" });
    return NextResponse.json({ success: true, journey: defaultJourney });
  } catch (err: any) {
    console.error("Personalised journey fetch error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to fetch learning plan" },
      { status: 500 }
    );
  }
}
