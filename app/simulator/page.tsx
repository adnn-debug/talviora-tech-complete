"use client";

import { useState } from "react";
import {
  MessageSquareCode,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Award,
  Lightbulb,
} from "lucide-react";
import { interviewQuestionsList } from "@/lib/career-data";
import { fetchWithAuth } from "@/lib/api-client";

interface InterviewEvaluation {
  verdict: string;
  rating: number;
  strengths: string[];
  areasForImprovement: string[];
  idealTalkingPoints: string[];
  provider: string;
  persisted: boolean;
  persistenceMessage: string;
}

export default function SimulatorPage() {
  const [selectedQIdx, setSelectedQIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<InterviewEvaluation | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeQ = interviewQuestionsList[selectedQIdx];

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    setErrorMessage(null);
    try {
      const res = await fetchWithAuth("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: activeQ.role,
          question: activeQ.prompt,
          answer: userAnswer,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        setErrorMessage(data?.error || "Evaluation failed. Please provide a substantive response (min 5 characters).");
        setEvaluationResult(null);
      } else {
        setEvaluationResult(data);
      }
    } catch (e: any) {
      console.error(e);
      setErrorMessage(e?.message || "Failed to reach interview evaluation engine. Please try again.");
      setEvaluationResult(null);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(var(--color-burgundy-rgb),0.15)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)]">
              <MessageSquareCode className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]">
            Interview Practice
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display-serif font-bold text-[var(--color-burgundy)]">
            Technical Interview Simulator
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/85 mt-0.5 font-medium">
            Practice prompts use the displayed rubric. AI feedback requires a configured provider; this is not a hiring assessment.
          </p>
        </div>
      </div>

      {/* Question Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {interviewQuestionsList.map((q, i) => (
          <button
            key={q.id}
            onClick={() => {
              setSelectedQIdx(i);
              setEvaluationResult(null);
              setErrorMessage(null);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              selectedQIdx === i
                ? "btn-burgundy shadow-xs"
                : "btn-secondary-coffee"
            }`}
          >
            Prompt {i + 1}: {q.category}
          </button>
        ))}
      </div>

      {/* Active Question Prompt */}
      <div className="card-coffee p-6 sm:p-8 space-y-4 border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)]">
            Role: {activeQ.role} • {activeQ.category}
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-display-serif font-bold text-[var(--color-burgundy)] leading-snug">
          {activeQ.prompt}
        </h2>

        {/* Rubric Points Overview */}
        <div className="p-4 rounded-xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.15)] space-y-2">
          <span className="text-[10px] uppercase font-bold text-[var(--color-burgundy)] block">
            Senior Interviewer Assessment Focus
          </span>
          <div className="space-y-1">
            {activeQ.rubricKeyPoints.map((pt, idx) => (
              <div key={idx} className="text-xs text-[var(--color-burgundy)]/90 flex items-start gap-2 font-medium">
                <span className="text-[var(--color-dusty-rose)] font-bold">•</span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Answer Input */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-[var(--color-burgundy)]">
            Your Technical Response:
          </label>
          <textarea
            rows={6}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Structure your answer: trade-offs, architecture choices, latency implications, and resilience patterns..."
            className="input-coffee w-full p-4 rounded-xl text-xs sm:text-sm leading-relaxed bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)]"
          />
        </div>

        {/* Submit Action */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleEvaluate}
            disabled={isEvaluating || !userAnswer.trim()}
            className="btn-burgundy px-6 py-2.5 rounded-xl font-semibold text-xs tracking-wide transition flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isEvaluating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[var(--color-warm-ivory)]" />
                <span>Interviewer Evaluating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[var(--color-warm-ivory)]" />
                <span>Submit Response for AI Critique</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Notice */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-[var(--surface-rose)] border border-[var(--color-dusty-rose)] text-xs text-[var(--color-burgundy)] flex items-start gap-3 animate-in fade-in duration-200">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-burgundy)]" />
          <div className="space-y-1">
            <span className="font-bold block">Evaluation Notice</span>
            <p className="leading-relaxed font-medium">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Feedback Panel */}
      {evaluationResult && (
        <div className="card-coffee p-6 sm:p-8 space-y-6 animate-in slide-in-from-bottom duration-300 border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
            <div>
              <span className="text-xs font-bold uppercase text-[var(--color-dusty-rose)]">
                AI Interviewer Critique
              </span>
              <h3 className="text-lg font-display-serif font-bold text-[var(--color-burgundy)] mt-0.5">
                Verdict: {evaluationResult.verdict}
              </h3>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] font-bold text-sm">
              <Award className="w-4 h-4 text-[var(--color-burgundy)]" />
              <span>Score: {evaluationResult.rating} / 10</span>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-[var(--text-secondary)]" role="status">
            Feedback provider: {evaluationResult.provider}. {evaluationResult.persistenceMessage}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-burgundy)]" />
                <span>Demonstrated Strengths</span>
              </span>
              <div className="space-y-2">
                {(evaluationResult.strengths || []).map((s: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)] text-xs text-[var(--color-burgundy)] font-medium"
                  >
                    ✓ {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[var(--color-dusty-rose)]" />
                <span>Areas for Improvement</span>
              </span>
              <div className="space-y-2">
                {(evaluationResult.areasForImprovement || []).map((a: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.15)] text-xs text-[var(--color-burgundy)] font-medium"
                  >
                    ! {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ideal Talking Points */}
          {evaluationResult.idealTalkingPoints && (
            <div className="p-4 rounded-xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.14)] space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-[var(--color-dusty-rose)]" />
                <span>Interviewer Pro-Tip Talking Points</span>
              </span>
              <div className="space-y-1">
                {evaluationResult.idealTalkingPoints.map((tp: string, idx: number) => (
                  <div key={idx} className="text-xs text-[var(--color-burgundy)]/90 font-medium">
                    • {tp}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
