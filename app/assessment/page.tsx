"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BrainCircuit,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle,
  Code2,
  Clock,
  ShieldAlert,
  Loader2,
} from "lucide-react";
import { assessmentQuestionsList, careerRolesList } from "@/lib/career-data";

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [targetRole, setTargetRole] = useState("AI Solutions Architect");
  const [weeklyHours, setWeeklyHours] = useState(12);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const currentQ = assessmentQuestionsList[currentStep];
  const progressPct = Math.round(((currentStep + 1) / assessmentQuestionsList.length) * 100);

  const handleSelectOption = (qId: number, weight: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: weight,
    }));
  };

  const handleNext = () => {
    if (currentStep < assessmentQuestionsList.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole,
          weeklyHours,
          answers: selectedAnswers,
        }),
      });

      const data = await response.json();

      if (data) {
        // Persist evaluation result for the results page
        if (typeof window !== "undefined") {
          localStorage.setItem("talviora-last-assessment", JSON.stringify(data));
        }
        router.push("/results");
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setErrorMsg("Failed to reach AI assessment engine. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <BrainCircuit className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Adaptive Evaluation Diagnostic
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            AI Skill Assessment
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Evaluate your architecture, algorithmic, and engineering skills against market benchmarks.
          </p>
        </div>

        {/* Role Target Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-zinc-500">Benchmark Role:</label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#c58b94]"
          >
            {careerRolesList.map((r) => (
              <option key={r.id} value={r.title}>
                {r.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="card-luxury p-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-zinc-600 dark:text-zinc-400">
            Diagnostic Progress: Question {currentStep + 1} of {assessmentQuestionsList.length}
          </span>
          <span className="font-mono-code font-bold text-[#843e4b] dark:text-[#d8a0ab]">
            {progressPct}% Completed
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#c58b94] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="card-luxury p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              Domain: {currentQ.category}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {currentQ.title}
          </h2>
          <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-2 leading-relaxed">
            {currentQ.question}
          </p>
        </div>

        {/* Code Snippet Box (if present) */}
        {currentQ.codeSnippet && (
          <div className="rounded-xl border border-zinc-300 dark:border-zinc-800 bg-zinc-950 p-4 font-mono-code text-xs text-rose-200/90 overflow-x-auto">
            <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-zinc-800 text-[10px] text-zinc-500 uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>Technical Context</span>
            </div>
            <pre className="whitespace-pre-wrap">{currentQ.codeSnippet}</pre>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((opt, i) => {
            const isSelected = selectedAnswers[currentQ.id] === opt.weight;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectOption(currentQ.id, opt.weight)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                  isSelected
                    ? "border-[#c58b94] bg-rose-50/50 dark:bg-rose-950/20 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isSelected
                      ? "bg-[#c58b94] text-white"
                      : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400"
                  }`}
                >
                  {opt.label}
                </div>
                <div className="flex-1">
                  <span className="text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 leading-snug">
                    {opt.text}
                  </span>
                  {opt.skillTags && opt.skillTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {opt.skillTags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {currentStep < assessmentQuestionsList.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 font-semibold text-xs tracking-wide transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-xs"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmitAssessment}
              disabled={isSubmitting || selectedAnswers[currentQ.id] === undefined}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#c58b94] to-[#843e4b] hover:opacity-95 text-white font-semibold text-xs tracking-wide transition flex items-center gap-2 shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating via Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Submit & Synthesize Intelligence</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
