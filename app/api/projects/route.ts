import { NextResponse } from "next/server";
import { industryProjectsList } from "@/lib/career-data";

export async function GET() {
  return NextResponse.json({
    projects: industryProjectsList,
    totalCount: industryProjectsList.length,
  });
}
