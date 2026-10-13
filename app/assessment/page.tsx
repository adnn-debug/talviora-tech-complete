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
import { fetchWithAuth } from "@/lib/api-client";

export default function AssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [targetRole, setTargetRole] = useState("AI Solutions Architect");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const currentQ = assessmentQuestionsList[currentStep];
  const progressPct = Math.round(((currentStep + 1) / assessmentQuestionsList.length) * 100);

  const handleSelectOption = (qId: number, optionLabel: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionLabel,
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
      const response = await fetchWithAuth("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole,
          answers: selectedAnswers,
        }),
      });

      const data = await response.json();

      if (!response.ok || data?.success === false) {
        setErrorMsg(data?.error || "Assessment evaluation encountered an error. Please try again.");
      } else if (data) {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(var(--color-burgundy-rgb),0.15)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)]">
              <BrainCircuit className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]">
              Adaptive Evaluation Diagnostic
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display-serif font-bold text-[var(--color-burgundy)]">
            AI Skill Assessment
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/85 mt-0.5 font-medium">
            Reflect on your answers. Feedback summarizes this quiz and is not an external market benchmark or hiring score.
          </p>
        </div>

        {/* Role Target Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[var(--color-burgundy)]">Target role context:</label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="input-coffee text-xs font-semibold cursor-pointer bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)]"
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
      <div className="card-coffee p-4 bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.14)]">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-[var(--color-burgundy)]">
            Diagnostic Progress: Question {currentStep + 1} of {assessmentQuestionsList.length}
          </span>
          <span className="font-mono-code font-bold text-[var(--color-burgundy)]">
            {progressPct}% Completed
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[var(--color-creme-latte)] overflow-hidden border border-[rgba(var(--color-burgundy-rgb),0.12)]">
          <div
            className="h-full rounded-full bg-[var(--color-burgundy)] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="card-coffee p-6 sm:p-8 space-y-6 bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.14)]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)]">
              Domain: {currentQ.category}
            </span>
          </div>
          <h2 className="font-display-serif text-lg sm:text-2xl font-bold text-[var(--color-burgundy)]">
            {currentQ.title}
          </h2>
          <p className="text-sm text-[var(--color-burgundy)]/90 mt-2 leading-relaxed font-normal">
            {currentQ.question}
          </p>
        </div>

        {/* Code Snippet Box (if present) */}
        {currentQ.codeSnippet && (
          <div className="rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-creme-latte)] p-4 font-mono-code text-xs text-[var(--color-burgundy)] overflow-x-auto shadow-inner">
            <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-[rgba(var(--color-burgundy-rgb),0.15)] text-[10px] text-[var(--color-burgundy)] uppercase tracking-wider font-bold">
              <Code2 className="w-3.5 h-3.5 text-[var(--color-dusty-rose)]" />
              <span>Technical Context</span>
            </div>
            <pre className="whitespace-pre-wrap">{currentQ.codeSnippet}</pre>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((opt, i) => {
            const isSelected = selectedAnswers[currentQ.id] === opt.label;
            return (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectOption(currentQ.id, opt.label)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                  isSelected
                    ? "border-[var(--color-burgundy)] bg-[var(--surface-rose)] shadow-xs"
                    : "border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)] hover:border-[rgba(var(--color-dusty-rose-rgb),0.7)] hover:bg-[var(--surface-rose)]/50"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isSelected
                      ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]"
                      : "bg-[var(--color-creme-latte)] text-[var(--color-burgundy)]"
                  }`}
                >
                  {opt.label}
                </div>
                <div className="flex-1">
                  <span className="text-xs sm:text-sm text-[var(--color-burgundy)] leading-snug font-medium">
                    {opt.text}
                  </span>
                  {opt.skillTags && opt.skillTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {opt.skillTags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] px-2 py-0.5 rounded-full bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.15)] font-semibold"
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
          <div className="p-3 rounded-xl bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-[var(--color-burgundy)] text-xs flex items-center gap-2 font-medium">
            <ShieldAlert className="w-4 h-4 shrink-0 text-[var(--color-dusty-rose)]" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="pt-4 border-t border-[rgba(var(--color-burgundy-rgb),0.12)] flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="btn-secondary-coffee px-4 py-2 text-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {currentStep < assessmentQuestionsList.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="btn-burgundy px-5 py-2.5 text-xs flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmitAssessment}
              disabled={isSubmitting || selectedAnswers[currentQ.id] === undefined}
              className="btn-burgundy px-6 py-2.5 text-xs flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--color-warm-ivory)]" />
                  <span>Evaluating via Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[var(--color-warm-ivory)]" />
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
