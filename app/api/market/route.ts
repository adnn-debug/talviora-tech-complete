import { NextResponse } from "next/server";
import { marketTrendsList } from "@/lib/career-data";

export async function GET() {
  return NextResponse.json({
    trends: marketTrendsList,
    updatedAt: new Date().toISOString(),
  });
}
