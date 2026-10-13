"use client";

import { useState } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Clock,
  Compass,
  GraduationCap,
  Target,
  Briefcase,
  Layers,
  Code2,
  Cpu,
  ShieldAlert,
  BarChart3,
  Terminal,
  Zap,
} from "lucide-react";
import { CATALOGUE_ITEMS, CatalogueItem } from "@/lib/catalogue-data";
import {
  PersonalisedJourney,
  PlanGenerationParams,
  createDeterministicPlan,
  saveJourney,
} from "@/lib/personalised-journey";
import { fetchWithAuth } from "@/lib/api-client";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (journey: PersonalisedJourney) => void;
  existingJourney?: PersonalisedJourney | null;
}

const POPULAR_FIELDS = [
  { id: "lang-python", name: "Python 3.12+", category: "Programming Languages", icon: Terminal, desc: "Easy to read, versatile, top choice for AI and data." },
  { id: "front-react", name: "React 19 & Next.js", category: "Frontend Development", icon: Code2, desc: "Modern web interfaces, component architecture." },
  { id: "ai-gemini-sdk", name: "Gemini API & AI", category: "Artificial Intelligence", icon: Cpu, desc: "Generative AI, multimodal prompts, intelligent assistants." },
  { id: "lang-sql", name: "SQL & Relational Databases", category: "Databases & Storage", icon: BarChart3, desc: "Data queries, analytics, and business insights." },
  { id: "sec-owasp-top10", name: "Web Security & OWASP", category: "Cybersecurity", icon: ShieldAlert, desc: "Defend web apps, secure endpoints, protect user data." },
  { id: "cloud-docker", name: "Docker & Containers", category: "Cloud & DevOps", icon: Layers, desc: "Package and deploy applications reliably anywhere." },
];

export default function OnboardingFlowModal({
  isOpen,
  onClose,
  onComplete,
  existingJourney,
}: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedFieldId, setSelectedFieldId] = useState<string>(
    existingJourney?.fieldId || "lang-python"
  );
  const [experienceLevel, setExperienceLevel] = useState<
    "Complete Beginner" | "Some Basics" | "Intermediate" | "Advanced"
  >(existingJourney?.difficultyLevel || "Complete Beginner");
  const [dailyMinutes, setDailyMinutes] = useState<number>(
    existingJourney?.dailyStudyMinutes || 45
  );
  const [mainGoal, setMainGoal] = useState<
    "learn_skill" | "build_projects" | "prepare_job" | "explore_freelancing" | "exploring"
  >(existingJourney?.mainGoal || "build_projects");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalSteps = 4;

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      // 1. Try server-side generation
      const res = await fetchWithAuth("/api/personalise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldId: selectedFieldId,
          experienceLevel,
          dailyStudyMinutes: dailyMinutes,
          mainGoal,
          previousJourney: existingJourney,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.journey) {
        saveJourney(data.journey);
        onComplete(data.journey);
        onClose();
        return;
      }
    } catch (err) {
      console.warn("Server plan generation unreachable, creating client-side plan:", err);
    }

    // 2. Deterministic client fallback (never fails)
    const localPlan = createDeterministicPlan({
      fieldId: selectedFieldId,
      experienceLevel,
      dailyStudyMinutes: dailyMinutes,
      mainGoal,
      previousJourney: existingJourney,
    });

    saveJourney(localPlan);
    onComplete(localPlan);
    setIsSubmitting(false);
    onClose();
  };

  const handleSkipQuestion = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] rounded-3xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.2)] shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-[var(--color-creme-latte)] border-b border-[rgba(var(--color-burgundy-rgb),0.15)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)]">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-burgundy)]/75 block">
                {existingJourney ? "Update Preferences" : "Personalise Your Tech Journey"} • Step {step} of {totalSteps}
              </span>
              <h2 id="onboarding-title" className="font-display-serif text-xl sm:text-2xl font-bold text-[var(--color-burgundy)] leading-tight">
                {step === 1 && "Which field would you like to explore?"}
                {step === 2 && "What is your current experience level?"}
                {step === 3 && "How much time can you study each day?"}
                {step === 4 && "What is your primary goal?"}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.15)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition cursor-pointer"
            aria-label="Close onboarding flow"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[var(--color-creme-latte)]/80 h-1.5">
          <div
            className="bg-[var(--color-burgundy)] h-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs text-[var(--color-burgundy)]">
          {/* STEP 1: SELECT FIELD */}
          {step === 1 && (
            <div className="space-y-4">
              <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed font-normal">
                Pick a foundational technology to start. You can explore all other catalogue fields anytime without losing progress.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {POPULAR_FIELDS.map((f) => {
                  const Icon = f.icon;
                  const isSelected = selectedFieldId === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFieldId(f.id)}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-[var(--surface-rose)] border-2 border-[var(--color-burgundy)] shadow-xs"
                          : "bg-[var(--color-warm-ivory)] border-[rgba(var(--color-burgundy-rgb),0.15)] hover:bg-[var(--color-creme-latte)]/50"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="p-1.5 rounded-lg bg-[var(--color-creme-latte)] text-[var(--color-burgundy)]">
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          {isSelected && <Check className="w-4 h-4 text-[var(--color-burgundy)]" />}
                        </div>
                        <strong className="font-bold text-xs text-[var(--color-burgundy)] block">
                          {f.name}
                        </strong>
                        <p className="text-[11px] text-[var(--color-burgundy)]/75 mt-0.5 line-clamp-2">
                          {f.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Or select any of all 30 catalogue entries */}
              <div className="pt-2">
                <label className="text-[11px] font-bold text-[var(--color-burgundy)]/80 uppercase block mb-1.5">
                  Or choose any of the 30 catalogue fields:
                </label>
                <select
                  value={selectedFieldId}
                  onChange={(e) => setSelectedFieldId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.2)] text-xs font-semibold text-[var(--color-burgundy)] cursor-pointer focus:ring-2 focus:ring-[var(--color-burgundy)]"
                >
                  {CATALOGUE_ITEMS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.category} • {item.difficulty})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* STEP 2: EXPERIENCE LEVEL */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
                This helps us calibrate task pacing and recommend foundational prerequisites when appropriate.
              </p>

              <div className="space-y-2.5">
                {[
                  {
                    level: "Complete Beginner" as const,
                    title: "I am a complete beginner",
                    desc: "I have never written code before or am just getting started with tech.",
                  },
                  {
                    level: "Some Basics" as const,
                    title: "I know some basics",
                    desc: "I understand basic variables, syntax, or have followed introductory tutorials.",
                  },
                  {
                    level: "Intermediate" as const,
                    title: "I have intermediate experience",
                    desc: "I have built small scripts or applications and want structured project experience.",
                  },
                  {
                    level: "Advanced" as const,
                    title: "I have advanced background",
                    desc: "I am an experienced engineer looking to master this specific technology or architecture.",
                  },
                ].map((opt) => {
                  const isSelected = experienceLevel === opt.level;
                  return (
                    <button
                      key={opt.level}
                      onClick={() => setExperienceLevel(opt.level)}
                      className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-[var(--surface-rose)] border-2 border-[var(--color-burgundy)] shadow-xs"
                          : "bg-[var(--color-warm-ivory)] border-[rgba(var(--color-burgundy-rgb),0.15)] hover:bg-[var(--color-creme-latte)]/50"
                      }`}
                    >
                      <div>
                        <strong className="text-xs font-bold text-[var(--color-burgundy)] block">
                          {opt.title}
                        </strong>
                        <p className="text-[11px] text-[var(--color-burgundy)]/75 mt-0.5">
                          {opt.desc}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? "border-[var(--color-burgundy)] bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]" : "border-[rgba(var(--color-burgundy-rgb),0.3)]"
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DAILY STUDY COMMITMENT */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
                Consistency is more important than long hours. Choose a daily pace that fits your real lifestyle.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    minutes: 20,
                    title: "15–20 min / day",
                    subtitle: "Bite-sized micro-learning",
                    weekly: "~2 hours / week",
                  },
                  {
                    minutes: 45,
                    title: "45 min / day",
                    subtitle: "Recommended daily habit",
                    weekly: "~5 hours / week",
                  },
                  {
                    minutes: 90,
                    title: "1.5 hours / day",
                    subtitle: "Accelerated deep learning",
                    weekly: "~10 hours / week",
                  },
                  {
                    minutes: 180,
                    title: "3+ hours / day",
                    subtitle: "Full-time intensive study",
                    weekly: "~20 hours / week",
                  },
                ].map((opt) => {
                  const isSelected = dailyMinutes === opt.minutes;
                  return (
                    <button
                      key={opt.minutes}
                      onClick={() => setDailyMinutes(opt.minutes)}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-[var(--surface-rose)] border-2 border-[var(--color-burgundy)] shadow-xs"
                          : "bg-[var(--color-warm-ivory)] border-[rgba(var(--color-burgundy-rgb),0.15)] hover:bg-[var(--color-creme-latte)]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <Clock className="w-4 h-4 text-[var(--color-burgundy)]" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/75">
                          {opt.weekly}
                        </span>
                      </div>
                      <div>
                        <strong className="text-xs font-bold text-[var(--color-burgundy)] block">
                          {opt.title}
                        </strong>
                        <span className="text-[11px] text-[var(--color-burgundy)]/75">
                          {opt.subtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: MAIN GOAL */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
                What would you most like to achieve? We will prioritize matching projects and milestones.
              </p>

              <div className="space-y-2.5">
                {[
                  {
                    id: "learn_skill" as const,
                    icon: GraduationCap,
                    title: "Learn a practical skill for personal curiosity",
                    desc: "Understand how the technology works without immediate career pressure.",
                  },
                  {
                    id: "build_projects" as const,
                    icon: Code2,
                    title: "Build practical, real-world portfolio projects",
                    desc: "Focus on creating working applications you can demonstrate.",
                  },
                  {
                    id: "prepare_job" as const,
                    icon: Target,
                    title: "Prepare for a technology career or role transition",
                    desc: "Focus on job-ready concepts, architecture, and technical interview readiness.",
                  },
                  {
                    id: "explore_freelancing" as const,
                    icon: Briefcase,
                    title: "Explore technology freelancing & side-hustles",
                    desc: "Build services, websites, or automations for independent clients.",
                  },
                  {
                    id: "exploring" as const,
                    icon: Compass,
                    title: "Something else / Undecided",
                    desc: "Explore possibilities and discover what interests you first.",
                  },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = mainGoal === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setMainGoal(opt.id)}
                      className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-[var(--surface-rose)] border-2 border-[var(--color-burgundy)] shadow-xs"
                          : "bg-[var(--color-warm-ivory)] border-[rgba(var(--color-burgundy-rgb),0.15)] hover:bg-[var(--color-creme-latte)]/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="p-2 rounded-xl bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <strong className="text-xs font-bold text-[var(--color-burgundy)] block">
                            {opt.title}
                          </strong>
                          <p className="text-[11px] text-[var(--color-burgundy)]/75 mt-0.5">
                            {opt.desc}
                          </p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? "border-[var(--color-burgundy)] bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]" : "border-[rgba(var(--color-burgundy-rgb),0.3)]"
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-[var(--color-creme-latte)] border-t border-[rgba(var(--color-burgundy-rgb),0.15)] flex items-center justify-between gap-3">
          <div>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev - 1)}
                className="px-4 py-2 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] text-xs font-semibold text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.15)] text-xs font-semibold text-[var(--color-burgundy)]/75 hover:bg-[var(--surface-rose)] cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Skip optional button */}
            {step > 1 && (
              <button
                type="button"
                onClick={handleSkipQuestion}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[var(--color-burgundy)]/80 hover:text-[var(--color-burgundy)] hover:underline cursor-pointer"
              >
                Skip for now
              </button>
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => setStep((prev) => prev + 1)}
                className="btn-burgundy px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                disabled={isSubmitting}
                className="btn-burgundy px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Your Plan...</span>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[var(--color-warm-ivory)]" />
                    <span>Create My Personalised Plan</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
