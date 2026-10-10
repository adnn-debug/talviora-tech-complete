"use client";

import { useState } from "react";
import {
  MessageSquareCode,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Award,
} from "lucide-react";
import { interviewQuestionsList } from "@/lib/career-data";

export default function SimulatorPage() {
  const [selectedQIdx, setSelectedQIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState(
    "To handle role-based permissions in vector search, I would use pre-filtering metadata inside the vector index rather than filtering afterwards. I'd store security group hashes in the payload metadata and include boolean filter clauses directly during the HNSW search so only authorized document chunks are considered, avoiding recall degradation."
  );
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);

  const activeQ = interviewQuestionsList[selectedQIdx];

  const handleEvaluate = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: activeQ.role,
          question: activeQ.prompt,
          answer: userAnswer,
        }),
      });
      const data = await res.json();
      setEvaluationResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <MessageSquareCode className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              High-Stakes Technical Screening
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Technical Interview Simulator
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Real scenario-based architectural and algorithmic prompts evaluated by Gemini AI against senior rubrics.
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
            }}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
              selectedQIdx === i
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs"
                : "bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            Prompt {i + 1}: {q.category}
          </button>
        ))}
      </div>

      {/* Active Question Prompt */}
      <div className="card-luxury p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
            Role: {activeQ.role} • {activeQ.category}
          </span>
        </div>

        <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
          {activeQ.prompt}
        </h2>

        {/* Rubric Points Overview */}
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-2">
          <span className="text-[10px] uppercase font-bold text-zinc-400 block">
            Senior Interviewer Assessment Focus
          </span>
          <div className="space-y-1">
            {activeQ.rubricKeyPoints.map((pt, idx) => (
              <div key={idx} className="text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                <span className="text-[#c58b94] font-bold">•</span>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Answer Input */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
            Your Technical Response:
          </label>
          <textarea
            rows={6}
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Structure your answer: trade-offs, architecture choices, latency implications, and resilience patterns..."
            className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#c58b94] leading-relaxed"
          />
        </div>

        {/* Submit Action */}
        <div className="flex justify-end pt-2">
          <button
            onClick={handleEvaluate}
            disabled={isEvaluating || !userAnswer.trim()}
            className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-semibold text-xs tracking-wide transition flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
          >
            {isEvaluating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Interviewer Evaluating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#c58b94]" />
                <span>Submit Response for AI Critique</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feedback Panel */}
      {evaluationResult && (
        <div className="card-luxury p-6 sm:p-8 space-y-6 animate-in slide-in-from-bottom duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <span className="text-xs font-bold uppercase text-[#c58b94] dark:text-[#d8a0ab]">
                AI Interviwer Critique
              </span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                Verdict: {evaluationResult.verdict || "Strong Competency Demonstrated"}
              </h3>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Score: {evaluationResult.rating || 8} / 10</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Demonstrated Strengths</span>
              </span>
              <div className="space-y-2">
                {(evaluationResult.strengths || []).map((s: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 text-xs text-emerald-900 dark:text-emerald-200"
                  >
                    ✓ {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>Areas for Improvement</span>
              </span>
              <div className="space-y-2">
                {(evaluationResult.areasForImprovement || []).map((a: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 text-xs text-rose-900 dark:text-rose-200"
                  >
                    ! {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ideal Talking Points */}
          {evaluationResult.idealTalkingPoints && (
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Interviewer Pro-Tip Talking Points</span>
              </span>
              <div className="space-y-1">
                {evaluationResult.idealTalkingPoints.map((tp: string, idx: number) => (
                  <div key={idx} className="text-xs text-zinc-600 dark:text-zinc-400">
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
