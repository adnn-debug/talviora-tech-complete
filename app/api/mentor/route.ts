import { NextResponse } from "next/server";
import { generateMentorReply, isGeminiConfigured } from "@/lib/gemini";
import { sanitizeInput } from "@/lib/auth-server";
import { checkRateLimit } from "@/lib/rate-limit";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const rateLimit = checkRateLimit(req, { limit: 15, windowSeconds: 60 });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many AI mentor requests. Please wait a moment before trying again." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
    );
  }
  if (!isGeminiConfigured) {
    return NextResponse.json(
      { success: false, error: "AI mentor is unavailable until GEMINI_API_KEY is configured on the server." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON request payload." }, { status: 400 });
  }

  try {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ success: false, error: "Invalid mentor request." }, { status: 400 });
    }

    const data = body as Record<string, unknown>;
    const message = sanitizeInput(data.message, 4000);
    if (message.length < 3) {
      return NextResponse.json({ success: false, error: "Enter a question of at least 3 characters." }, { status: 400 });
    }

    const rawHistory = Array.isArray(data.history) ? data.history : [];
    const history: ChatMessage[] = rawHistory
      .slice(-40)
      .filter((item): item is Record<string, unknown> =>
        Boolean(item && typeof item === "object" && !Array.isArray(item))
      )
      .filter((item) => (item.role === "user" || item.role === "assistant") && typeof item.content === "string")
      .map((item) => ({ role: item.role as ChatMessage["role"], content: sanitizeInput(item.content, 4000) }))
      .filter((item) => item.content.length > 0);

    const result = await generateMentorReply(message, history);
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
