import { NextResponse } from "next/server";
import { generateMentorReply, isGeminiConfigured } from "@/lib/gemini";
import { sanitizeInput } from "@/lib/auth-server";

export async function POST(req: Request) {
  if (!isGeminiConfigured) {
    return NextResponse.json(
      { success: false, error: "AI mentor is unavailable until GEMINI_API_KEY is configured on the server." },
      { status: 503 }
    );
  }

  try {
    const body: unknown = await req.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ success: false, error: "Invalid mentor request." }, { status: 400 });
    }

    const message = sanitizeInput((body as Record<string, unknown>).message, 2000);
    if (message.length < 3) {
      return NextResponse.json({ success: false, error: "Enter a question of at least 3 characters." }, { status: 400 });
    }

    const result = await generateMentorReply(message);
    if (!result.reply?.trim()) {
      return NextResponse.json({ success: false, error: "The AI mentor returned an empty response. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ success: true, ...result, provider: "Google Gemini" });
  } catch (error) {
    console.error("Mentor request failed:", error);
    return NextResponse.json(
      { success: false, error: "The AI mentor could not answer right now. Check provider configuration and retry." },
      { status: 502 }
    );
  }
}
