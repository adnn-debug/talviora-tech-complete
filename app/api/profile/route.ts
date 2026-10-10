import { NextResponse } from "next/server";
import { initialUserProfile } from "@/lib/career-data";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", initialUserProfile.id)
      .single();

    if (data && !error) {
      return NextResponse.json(data);
    }
  } catch (err) {
    console.warn("Supabase profile fetch fallback:", err);
  }

  // Resilient fallback to canonical profile
  return NextResponse.json(initialUserProfile);
}

export async function POST(req: Request) {
  try {
    const updates = await req.json();

    // Try persisting to Supabase if table exists
    try {
      await supabase.from("profiles").upsert({
        id: initialUserProfile.id,
        ...updates,
        updated_at: new Date().toISOString(),
      });
    } catch (dbErr) {
      console.warn("Supabase upsert warning:", dbErr);
    }

    return NextResponse.json({
      success: true,
      profile: {
        ...initialUserProfile,
        ...updates,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to update profile" },
      { status: 500 }
    );
  }
}
