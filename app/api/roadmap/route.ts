import { NextResponse } from "next/server";
import { roadmapPhasesList } from "@/lib/career-data";

export async function GET() {
  return NextResponse.json({
    phases: roadmapPhasesList,
    totalModules: roadmapPhasesList.flatMap((p) => p.modules).length,
    completedModules: roadmapPhasesList
      .flatMap((p) => p.modules)
      .filter((m) => m.completed).length,
  });
}
