import { NextResponse } from "next/server";
import {
  OPPORTUNITY_SEED_DATA,
  OpportunityItem,
  verifyOpportunity,
  computePipelineSummary,
  deduplicateOpportunities,
} from "@/lib/opportunities-data";

export const dynamic = "force-dynamic";

// In-memory runtime cache for verified opportunities during server lifetime
let activeOpportunities: OpportunityItem[] = [...OPPORTUNITY_SEED_DATA];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.toLowerCase().trim();
    const shouldRecheck = searchParams.get("recheck") === "true";

    // Recheck live if requested
    if (shouldRecheck) {
      // Re-verify in parallel with a concurrency limit
      const rechecked = await Promise.all(
        activeOpportunities.map((item) => verifyOpportunity(item))
      );
      activeOpportunities = rechecked;
    }

    let filtered = deduplicateOpportunities(activeOpportunities);

    if (category && category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (status && status !== "all") {
      filtered = filtered.filter((item) => item.verificationStatus === status);
    }

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(search) ||
          item.organisation.toLowerCase().includes(search) ||
          item.locationAndEligibility.toLowerCase().includes(search) ||
          item.requiredSkills.some((s) => s.toLowerCase().includes(search))
      );
    }

    const summary = computePipelineSummary(activeOpportunities);

    return NextResponse.json({
      success: true,
      items: filtered,
      pipelineSummary: summary,
      sourcePolicy:
        "Strict zero-hallucination policy. Listings are sourced exclusively from official career pages, government recruitment notifications, accredited university portals, and technology documentation. Google search results alone are never treated as verification.",
    });
  } catch (error: any) {
    console.error("Opportunities API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load opportunities pipeline",
        details: error?.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { id, action } = body;

    if (action === "recheck" && id) {
      const targetIndex = activeOpportunities.findIndex((o) => o.id === id);
      if (targetIndex === -1) {
        return NextResponse.json(
          { success: false, error: "Opportunity not found" },
          { status: 404 }
        );
      }

      const updated = await verifyOpportunity(activeOpportunities[targetIndex]);
      activeOpportunities[targetIndex] = updated;

      return NextResponse.json({
        success: true,
        item: updated,
        pipelineSummary: computePipelineSummary(activeOpportunities),
      });
    }

    if (action === "recheck_all") {
      const rechecked = await Promise.all(
        activeOpportunities.map((item) => verifyOpportunity(item))
      );
      activeOpportunities = rechecked;

      return NextResponse.json({
        success: true,
        items: activeOpportunities,
        pipelineSummary: computePipelineSummary(activeOpportunities),
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action. Use 'recheck' with id or 'recheck_all'." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Opportunities POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process verification request" },
      { status: 500 }
    );
  }
}
