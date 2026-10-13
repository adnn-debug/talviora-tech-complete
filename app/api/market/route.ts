import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    trends: [],
    totalCount: 0,
    dataMode: "unavailable",
    source: null,
    lastCheckedAt: null,
    notice: "No live market provider is connected. No salary, demand, or job-count estimates are available.",
  });
}
