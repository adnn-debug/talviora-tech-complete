import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { sanitizeInput } from "@/lib/auth-server";

export async function GET(req: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json(
      { success: false, error: "Public portfolios are unavailable until Supabase is configured." },
      { status: 503 }
    );
  }

  const rawSlug = new URL(req.url).searchParams.get("slug");
  const slug = sanitizeInput(rawSlug, 50).toLowerCase();
  if (!slug || !/^[a-z0-9-]{3,50}$/.test(slug)) {
    return NextResponse.json({ success: false, error: "Provide a valid public portfolio slug." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("name,target_role,readiness_score,bio,skills,portfolio_slug")
    .eq("portfolio_slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Public portfolio lookup failed:", error.message);
    return NextResponse.json({ success: false, error: "Could not load this public portfolio." }, { status: 503 });
  }
  if (!data) {
    return NextResponse.json({ success: false, error: "No public portfolio was found for that slug." }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    slug: data.portfolio_slug,
    publicUrl: `/portfolio?slug=${encodeURIComponent(data.portfolio_slug)}`,
    candidate: {
      name: data.name,
      targetRole: data.target_role,
      readinessScore: data.readiness_score,
      bio: data.bio,
      skills: data.skills ?? {},
      verifiedBadges: [],
      featuredProjects: [],
    },
    note: "Only profile fields allowed by the public-profile database policy are returned. Credentials and projects require separately verified records.",
  });
}
