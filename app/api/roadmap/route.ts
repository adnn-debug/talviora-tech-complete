import { NextResponse } from "next/server";
import { roadmapPhasesList } from "@/lib/career-data";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phaseParam = searchParams.get("phase");

    let phases = roadmapPhasesList.map((phase) => ({
      ...phase,
      modules: phase.modules.map((module) => ({ ...module, completed: false })),
    }));
    if (phaseParam) {
      const pNum = parseInt(phaseParam, 10);
      if (!isNaN(pNum)) {
        phases = phases.filter((p) => p.phaseNumber === pNum);
      }
    }

    return NextResponse.json({
      phases,
      totalModules: phases.flatMap((p) => p.modules).length,
      completedModules: phases
        .flatMap((p) => p.modules)
        .filter((m) => m.completed).length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to retrieve curriculum roadmap" },
      { status: 500 }
    );
  }
}

