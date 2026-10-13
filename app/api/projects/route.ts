import { NextResponse } from "next/server";
import { industryProjectsList } from "@/lib/career-data";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const difficulty = searchParams.get("difficulty");
    const query = searchParams.get("q")?.toLowerCase();

    let filtered = industryProjectsList;
    if (difficulty) {
      filtered = filtered.filter((p) => p.difficulty.toLowerCase() === difficulty.toLowerCase());
    }
    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.techStack.some((t) => t.toLowerCase().includes(query))
      );
    }

    return NextResponse.json({
      projects: filtered,
      totalCount: filtered.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to retrieve projects catalogue" },
      { status: 500 }
    );
  }
}

