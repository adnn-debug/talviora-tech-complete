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
  HelpCircle,
  Lightbulb,
  Info,
  Check,
  ChevronDown,
  ChevronUp,
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
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQ = assessmentQuestionsList[currentStep] || assessmentQuestionsList[0];
  const totalQuestions = assessmentQuestionsList.length;
  const progressPct = Math.round(((currentStep + 1) / totalQuestions) * 100);

  const handleSelectOption = (qId: number, optionLabel: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionLabel,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
      setShowHint(false);
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setShowHint(false);
      setShowExplanation(false);
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
        setErrorMsg(data?.error || "Assessment evaluation encountered an issue. Please try again.");
      } else if (data) {
        // Persist evaluation result for the results page
        if (typeof window !== "undefined") {
          localStorage.setItem("talviora-last-assessment", JSON.stringify(data));
        }
        router.push("/results");
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setErrorMsg("Failed to reach diagnostic evaluation engine. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for difficulty badge styling
  const getDifficultyBadge = (difficulty?: string) => {
    switch (difficulty) {
      case "Foundational":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Intermediate":
        return "bg-[var(--surface-rose)] text-[var(--color-burgundy)] border-[rgba(var(--color-dusty-rose-rgb),0.8)]";
      case "Advanced":
        return "bg-amber-100 text-amber-900 border-amber-300";
      default:
        return "bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] border-[rgba(var(--color-burgundy-rgb),0.15)]";
    }
  };

  // Helper for task label badge styling
  const getTaskBadge = (taskType?: string) => {
    switch (taskType) {
      case "debug":
        return "Task: Debug & Fix Code";
      case "compare":
        return "Task: Compare Trade-Offs";
      case "explain":
        return "Task: Explain Core Concept";
      case "choose":
        return "Task: Choose Optimal Approach";
      case "write":
        return "Task: Write Solution";
      default:
        return "Task: Conceptual Choice";
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
              Diagnostic Knowledge Check
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display-serif font-bold text-[var(--color-burgundy)]">
            Check What You Know
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/85 mt-0.5 font-medium">
            Test your understanding across foundational ideas, code debugging, and real-world system decisions.
          </p>
        </div>

        {/* Role Target Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-[var(--color-burgundy)]">Target field context:</label>
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

      {/* Honest Assessment Purpose & Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.15)] flex items-start gap-3 text-xs text-[var(--color-burgundy)] font-medium leading-relaxed">
        <Info className="w-4 h-4 shrink-0 text-[var(--color-burgundy)] mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold block">What This Diagnostic Measures (and What It Does Not):</span>
          <p className="text-[11px] text-[var(--color-burgundy)]/90 leading-relaxed">
            This quiz measures <strong>conceptual understanding, code reading ability, and architectural trade-offs</strong>. It <strong>does NOT predict or guarantee job readiness</strong>. Real engineering ability is built through practical projects, collaboration, and continuous hands-on practice.
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="card-coffee p-4 bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.14)]">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-[var(--color-burgundy)]">
            Diagnostic Progress: Question {currentStep + 1} of {totalQuestions}
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
        {/* Badges Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty Badge */}
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${getDifficultyBadge(currentQ.difficulty)}`}>
            {currentQ.difficulty || "Foundational"}
          </span>

          {/* Question Type Badge */}
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)]">
            {currentQ.questionType || currentQ.category}
          </span>

          {/* Task Type Badge */}
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.18)]">
            {getTaskBadge(currentQ.taskType)}
          </span>
        </div>

        {/* Expected Task Callout Banner */}
        {currentQ.expectedTask && (
          <div className="p-3.5 rounded-xl bg-[var(--surface-rose)]/40 border border-[rgba(var(--color-dusty-rose-rgb),0.6)] flex items-start gap-2.5 text-xs text-[var(--color-burgundy)] font-medium">
            <Lightbulb className="w-4 h-4 shrink-0 text-[var(--color-burgundy)] mt-0.5" />
            <div>
              <span className="font-bold block text-[11px] uppercase tracking-wider text-[var(--color-burgundy)]/85">
                Clear Task Requirement:
              </span>
              <p className="leading-relaxed mt-0.5">{currentQ.expectedTask}</p>
            </div>
          </div>
        )}

        {/* Question Title & Prompt */}
        <div>
          <h2 className="font-display-serif text-lg sm:text-2xl font-bold text-[var(--color-burgundy)]">
            {currentQ.title}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/95 mt-2 leading-relaxed font-medium">
            {currentQ.question}
          </p>
        </div>

        {/* Code Snippet Box (if present) */}
        {currentQ.codeSnippet && (
          <div className="rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[#181313] text-[#F5E8E0] p-4 font-mono-code text-xs overflow-x-auto shadow-inner">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] uppercase tracking-wider font-bold text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-rose-300" />
                <span>Code Context / Inspection Snippet</span>
              </span>
              <span className="text-zinc-400">Read & Debug</span>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed text-[#F7F2EB]">{currentQ.codeSnippet}</pre>
          </div>
        )}

        {/* Options List */}
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase text-[var(--color-burgundy)] block">
            Select Your Answer:
          </span>
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
                  <span className="text-xs sm:text-sm text-[var(--color-burgundy)] leading-relaxed font-medium block">
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

        {/* Hint and Concept Feedback Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {currentQ.hint && (
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-creme-latte)] text-xs text-[var(--color-burgundy)] font-semibold hover:bg-[var(--surface-rose)] transition cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
              <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
            </button>
          )}

          {selectedAnswers[currentQ.id] !== undefined && currentQ.explanation && (
            <button
              type="button"
              onClick={() => setShowExplanation(!showExplanation)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--surface-rose)]/60 text-xs text-[var(--color-burgundy)] font-semibold hover:bg-[var(--surface-rose)] transition cursor-pointer ml-auto"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[var(--color-burgundy)]" />
              <span>{showExplanation ? "Hide Explanation" : "Why This Concept Matters"}</span>
              {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>

        {/* Expandable Hint */}
        {showHint && currentQ.hint && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium leading-relaxed animate-in fade-in duration-150">
            💡 <span className="font-bold">Helpful Hint:</span> {currentQ.hint}
          </div>
        )}

        {/* Expandable Concept Explanation */}
        {showExplanation && currentQ.explanation && (
          <div className="p-4 rounded-xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.18)] text-xs text-[var(--color-burgundy)] space-y-1.5 animate-in fade-in duration-150">
            <span className="font-bold block text-[11px] uppercase tracking-wider text-[var(--color-burgundy)]">
              Conceptual Explanation & Best Practice:
            </span>
            <p className="leading-relaxed font-medium">{currentQ.explanation}</p>
          </div>
        )}

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-[var(--color-burgundy)] text-xs flex items-center gap-2 font-medium">
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

          {currentStep < totalQuestions - 1 ? (
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="btn-burgundy px-5 py-2.5 text-xs flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>Next Question</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleSubmitAssessment}
              disabled={isSubmitting || selectedAnswers[currentQ.id] === undefined}
              className="btn-burgundy px-6 py-2.5 text-xs flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--color-warm-ivory)]" />
                  <span>Evaluating Answers...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[var(--color-warm-ivory)]" />
                  <span>Submit Diagnostic & View Feedback</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
