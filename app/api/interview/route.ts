import { NextResponse } from "next/server";
import { evaluateInterviewResponse } from "@/lib/gemini";
import { interviewQuestionsList } from "@/lib/career-data";

export async function GET() {
  return NextResponse.json({
    questions: interviewQuestionsList,
  });
}

export async function POST(req: Request) {
  try {
    const { role, question, answer } = await req.json();

    if (!answer || answer.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Please provide a substantive answer to evaluate." },
        { status: 400 }
      );
    }

    const evaluation = await evaluateInterviewResponse({
      role: role || "AI Solutions Architect",
      question: question || "Describe your system design methodology",
      userAnswer: answer,
    });

    return NextResponse.json({
      success: true,
      evaluatedAt: new Date().toISOString(),
      ...evaluation,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Failed to evaluate interview response" },
      { status: 500 }
    );
  }
}
