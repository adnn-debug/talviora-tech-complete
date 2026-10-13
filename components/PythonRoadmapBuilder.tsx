"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowDownRight,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock3,
  LoaderCircle,
  Play,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { fetchWithAuth } from "@/lib/api-client";

type Activity = {
  resourceId: string;
  title: string;
  type: string;
  description: string;
  contentMarkdown: string | null;
  url: string | null;
  provider: string | null;
  language: string;
  accessType: string;
  verificationStatus: string;
  lastVerifiedAt: string | null;
  estimatedMinutes: number | null;
  completionCriteria: string[];
};

type Prerequisite = {
  skillId: string;
  slug: string;
  name: string;
  dependencyType: "required" | "recommended";
  minimumMasteryThreshold: number | null;
  masteryScore: number | null;
  includedAsStep: boolean;
  satisfied: boolean;
};

type RoadmapStep = {
  id: string;
  skillId: string;
  skillSlug: string;
  title: string;
  description: string;
  sequenceNumber: number;
  status: "not_started" | "in_progress" | "practice_required" | "completed" | "mastered";
  estimatedMinutes: number;
  learningObjectives: string[];
  completionCriteria: string[];
  prerequisites: Prerequisite[];
  activities: Activity[];
  recommendedReason: string;
};

type RoadmapRecord = {
  id: string;
  goal: string;
  goalName: string;
  description: string;
  version: number;
  status: "active" | "superseded" | "completed" | "archived";
  algorithmVersion: string;
  generationReason: string;
  weeklyStudyMinutes: number;
  totalLearningMinutes: number;
  estimatedTotalMinutes: number;
  estimatedDurationWeeks: number;
  createdAt: string;
  steps: RoadmapStep[];
  events: Array<{ id: string; event_type: string; reason: string; created_at: string }>;
  versions: Array<{
    id: string;
    version: number;
    status: string;
    previous_roadmap_id: string | null;
    algorithm_version: string;
    generation_reason: string;
    created_at: string;
    estimated_duration_weeks: number;
  }>;
};

type Assessment = {
  assessmentId: string;
  version: number;
  title: string;
  questions: Array<{ id: string; prompt: string; options: Array<{ id: string; text: string }> }>;
};

type ApiError = { error?: { code?: string; message?: string } };

function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  return Number.isInteger(hours) ? `${hours} hr` : `${hours.toFixed(1)} hr`;
}

function getErrorMessage(data: ApiError, fallback: string): string {
  return typeof data?.error?.message === "string" ? data.error.message : fallback;
}

export default function PythonRoadmapBuilder() {
  const [weeklyHours, setWeeklyHours] = useState(5);
  const [country, setCountry] = useState("");
  const [roadmap, setRoadmap] = useState<RoadmapRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [busyStepId, setBusyStepId] = useState<string | null>(null);
  const [assessmentStepId, setAssessmentStepId] = useState<string | null>(null);
  const [assessmentEventId, setAssessmentEventId] = useState<string | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [signedOut, setSignedOut] = useState(false);

  const readActiveRoadmap = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchWithAuth("/api/roadmaps", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) setSignedOut(true);
        setError(getErrorMessage(data, "Roadmap data is unavailable."));
        return;
      }
      setSignedOut(false);
      const first = data.roadmaps?.[0];
      if (!first?.id) {
        setRoadmap(null);
        return;
      }
      const detailResponse = await fetchWithAuth(`/api/roadmaps/${first.id}`, { cache: "no-store" });
      const detail = await detailResponse.json();
      if (!detailResponse.ok) {
        setError(getErrorMessage(detail, "Could not load the saved roadmap."));
        return;
      }
      setRoadmap(detail.roadmap as RoadmapRecord);
      setWeeklyHours(Math.max(1, Math.min(40, Math.round(Number(detail.roadmap.weeklyStudyMinutes) / 60))));
    } catch {
      setError("Could not reach roadmap storage. Check your connection and Supabase setup.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void readActiveRoadmap(); }, [readActiveRoadmap]);

  const createRoadmap = async () => {
    setCreating(true);
    setError("");
    setNotice("");
    try {
      const response = await fetchWithAuth("/api/roadmaps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goal: "learn_python",
          experienceLevel: "beginner",
          weeklyStudyMinutes: weeklyHours * 60,
          country: country || null,
          language: "en",
          requestId: crypto.randomUUID(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) setSignedOut(true);
        setError(getErrorMessage(data, "The roadmap could not be generated."));
        if (response.status === 409 && data?.error?.code === "ACTIVE_ROADMAP_EXISTS") await readActiveRoadmap();
        return;
      }
      setRoadmap(data.roadmap as RoadmapRecord);
      setNotice(`Roadmap version ${data.roadmap.version} was generated from the published skill graph.`);
    } catch {
      setError("Could not reach roadmap generation. Check your connection and retry.");
    } finally {
      setCreating(false);
    }
  };

  const startStep = async (step: RoadmapStep) => {
    if (!roadmap) return;
    setBusyStepId(step.id);
    setError("");
    try {
      const response = await fetchWithAuth(`/api/roadmaps/${roadmap.id}/steps/${step.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start" }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(getErrorMessage(data, "This step could not be started."));
        return;
      }
      await readActiveRoadmap();
    } catch {
      setError("Could not update step progress. Retry when you are online.");
    } finally {
      setBusyStepId(null);
    }
  };

  const openAssessment = async (step: RoadmapStep) => {
    if (!roadmap) return;
    setAssessmentStepId(step.id);
    setAssessmentEventId(crypto.randomUUID());
    setAssessment(null);
    setAnswers({});
    setError("");
    try {
      const response = await fetchWithAuth(`/api/roadmaps/${roadmap.id}/assessments?stepId=${step.id}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        setError(getErrorMessage(data, "No knowledge check is available for this step."));
        return;
      }
      setAssessment(data.assessment as Assessment);
    } catch {
      setError("Could not load the knowledge check. Retry when you are online.");
    }
  };

  const submitAssessment = async () => {
    if (!roadmap || !assessmentStepId || !assessment) return;
    setBusyStepId(assessmentStepId);
    setError("");
    setNotice("");
    try {
      const response = await fetchWithAuth(`/api/roadmaps/${roadmap.id}/assessments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stepId: assessmentStepId,
          answers,
          clientEventId: assessmentEventId ?? crypto.randomUUID(),
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(getErrorMessage(data, "The knowledge check could not be scored."));
        return;
      }
      const attempt = data.attempt;
      setAssessment(null);
      setAssessmentStepId(null);
      setAssessmentEventId(null);
      setNotice(`${attempt.message} Result: ${attempt.correctCount} of ${attempt.questionCount} correct (${attempt.score}%).`);

      const adaptResponse = await fetchWithAuth(`/api/roadmaps/${roadmap.id}/adapt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assessmentAttemptId: attempt.attemptId }),
      });
      const adaptData = await adaptResponse.json();
      if (adaptResponse.ok && adaptData.roadmap) {
        setRoadmap(adaptData.roadmap as RoadmapRecord);
        if (adaptData.adaptation?.changed) {
          setNotice(`Roadmap updated to version ${adaptData.roadmap.version}. ${adaptData.adaptation.reason}`);
        } else {
          setNotice(`${attempt.message} ${adaptData.adaptation?.reason ?? "The current sequence remains in place."}`);
        }
      } else {
        await readActiveRoadmap();
      }
    } catch {
      setError("The assessment result was saved, but the updated roadmap could not be loaded. Refresh to see current progress.");
      await readActiveRoadmap();
    } finally {
      setBusyStepId(null);
    }
  };

  const completedCount = roadmap?.steps.filter((step) => ["completed", "mastered"].includes(step.status)).length ?? 0;
  const nextStepId = roadmap?.steps.find((step) => !["completed", "mastered"].includes(step.status))?.id;

  return (
    <section className="space-y-5 rounded-3xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)] sm:p-7" aria-labelledby="adaptive-roadmap-title">
      <div className="flex flex-col gap-4 border-b border-[var(--border-panel)] pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-accent)] bg-[var(--surface-rose)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Deterministic roadmap · v1.0.0
          </span>
          <h2 id="adaptive-roadmap-title" className="mt-3 font-display-serif text-2xl font-bold text-[var(--heading-primary)] sm:text-3xl">
            Start Python from the beginning
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            A saved skill graph sets prerequisite order. Each checkpoint has an activity and a scored knowledge check; a browser click alone cannot mark a skill complete.
          </p>
        </div>
        {roadmap && (
          <div className="shrink-0 rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-canvas)] px-4 py-3 text-sm text-[var(--text-primary)]">
            <div className="font-semibold">Version {roadmap.version}</div>
            <div className="mt-1 text-xs text-[var(--text-secondary)]">{completedCount} of {roadmap.steps.length} checkpoints passed</div>
          </div>
        )}
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-2 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-rose)] px-4 py-3 text-sm text-[var(--color-burgundy)]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <div>
            <p>{error}</p>
            {signedOut && <Link className="mt-1 inline-block font-semibold underline" href="/auth?next=%2Froadmap">Sign in to continue</Link>}
          </div>
        </div>
      )}
      {notice && <p role="status" className="rounded-xl border border-[var(--border-accent)] bg-[var(--surface-rose)] px-4 py-3 text-sm text-[var(--color-burgundy)]">{notice}</p>}

      {!roadmap && (
        <div className="grid gap-4 rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-canvas)] p-4 sm:grid-cols-[1fr_auto_auto] sm:items-end">
          <div>
            <label htmlFor="python-study-hours" className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">Available study time per week</label>
            <div className="flex items-center gap-3">
              <input id="python-study-hours" type="range" min="1" max="40" step="1" value={weeklyHours} onChange={(event) => setWeeklyHours(Number(event.target.value))} className="w-full accent-[var(--color-burgundy)]" />
              <output htmlFor="python-study-hours" className="min-w-16 rounded-lg border border-[var(--border-panel)] bg-[var(--bg-surface)] px-2 py-1 text-center text-sm font-semibold text-[var(--text-primary)]">{weeklyHours} hr</output>
            </div>
          </div>
          <div>
            <label htmlFor="python-country" className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">Target country <span className="font-normal text-[var(--text-secondary)]">(optional)</span></label>
            <input id="python-country" value={country} onChange={(event) => setCountry(event.target.value.toUpperCase().slice(0, 2))} maxLength={2} placeholder="e.g. IN" className="min-h-10 w-24 rounded-lg border border-[var(--border-panel)] bg-[var(--bg-surface)] px-3 text-sm text-[var(--text-primary)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-burgundy)]" aria-describedby="country-note" />
            <p id="country-note" className="mt-1 text-[10px] text-[var(--text-secondary)]">Does not change this learning pathway.</p>
          </div>
          <button type="button" onClick={createRoadmap} disabled={creating || loading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--color-burgundy)] px-5 py-2 text-sm font-semibold text-[var(--color-warm-ivory)] transition hover:opacity-90 disabled:cursor-wait disabled:opacity-60">
            {creating ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
            {creating ? "Generating…" : "Generate my roadmap"}
          </button>
        </div>
      )}

      {loading && !roadmap && <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />Checking for a saved roadmap…</div>}

      {roadmap && (
        <>
          <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-canvas)] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-[var(--text-primary)]">{roadmap.goalName}</p>
              <p className="mt-1 max-w-3xl text-xs leading-relaxed text-[var(--text-secondary)]">{roadmap.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3 text-xs text-[var(--text-secondary)]">
              <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4" aria-hidden="true" />~{roadmap.estimatedDurationWeeks} weeks</span>
              <span>{formatMinutes(roadmap.weeklyStudyMinutes)}/week</span>
              <button type="button" onClick={() => void readActiveRoadmap()} className="rounded-lg p-2 text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]" aria-label="Refresh saved roadmap"><RefreshCw className="h-4 w-4" aria-hidden="true" /></button>
            </div>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            Time is an estimate with a 20% review/checkpoint allowance. It is not a guarantee. Self-reported experience does not skip prerequisite steps; only saved knowledge-check evidence changes the graph result.
          </p>

          <ol className="space-y-4" aria-label="Generated Python learning steps">
            {roadmap.steps.map((step) => {
              const isDone = ["completed", "mastered"].includes(step.status);
              const isActive = step.status === "in_progress" || step.status === "practice_required";
              const blocked = step.prerequisites.some((prerequisite) => {
                if (prerequisite.dependencyType !== "required") return false;
                const precedingStep = roadmap.steps.find((item) => item.skillId === prerequisite.skillId);
                if (precedingStep) return !["completed", "mastered"].includes(precedingStep.status);
                return !prerequisite.satisfied;
              });

              return (
                <li key={step.id} className="relative rounded-2xl border border-[var(--border-panel)] bg-[var(--bg-surface)] p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-[var(--color-burgundy)]" aria-hidden="true">{isDone ? <CheckCircle2 className="h-5 w-5" /> : isActive ? <ArrowDownRight className="h-5 w-5" /> : <Circle className="h-5 w-5" />}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-cocoa-sand)]">Step {step.sequenceNumber}</span>
                        <span className="text-[10px] text-[var(--text-secondary)]">{formatMinutes(step.estimatedMinutes)} estimate</span>
                        <span className="rounded-full bg-[var(--surface-rose)] px-2 py-0.5 text-[10px] font-semibold capitalize text-[var(--color-burgundy)]">{step.status.replaceAll("_", " ")}</span>
                      </div>
                      <h3 className="mt-1 font-display-serif text-lg font-bold text-[var(--heading-secondary)]">{step.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{step.description}</p>
                      <p className="mt-3 rounded-xl border border-[var(--border-panel)] bg-[var(--bg-canvas)] px-3 py-2 text-xs leading-relaxed text-[var(--text-primary)]"><span className="font-semibold">Why next: </span>{step.recommendedReason}</p>

                      {step.learningObjectives.length > 0 && <div className="mt-3"><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">Learning objectives</p><ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-[var(--text-primary)]">{step.learningObjectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div>}
                      {step.prerequisites.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{step.prerequisites.map((prerequisite) => <span key={`${prerequisite.slug}-${prerequisite.dependencyType}`} className={`rounded-full border px-2 py-1 text-[10px] ${prerequisite.dependencyType === "required" ? "border-[var(--border-accent)] text-[var(--color-burgundy)]" : "border-[var(--border-panel)] text-[var(--text-secondary)]"}`}>{prerequisite.dependencyType === "required" ? "What to Learn First (Required)" : "Helpful Background (Recommended)"}: {prerequisite.name}</span>)}</div>}
                      {step.completionCriteria.length > 0 && <div className="mt-3"><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">Completion condition</p><ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-[var(--text-primary)]">{step.completionCriteria.map((criterion) => <li key={criterion}>{criterion}</li>)}</ul></div>}

                      {step.activities.length > 0 && <div className="mt-4 grid gap-3 lg:grid-cols-2">{step.activities.map((activity) => <article key={activity.resourceId} className="rounded-xl border border-[var(--border-panel)] bg-[var(--bg-canvas)] p-3.5">
                        <div className="flex items-start gap-2"><BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-burgundy)]" aria-hidden="true" /><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h4 className="text-xs font-semibold text-[var(--text-primary)]">{activity.title}</h4><span className="rounded-full bg-[var(--surface-rose)] px-1.5 py-0.5 text-[9px] uppercase text-[var(--color-burgundy)]">{activity.type}</span></div><p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{activity.description}</p></div></div>
                        {activity.contentMarkdown && <pre className="mt-3 whitespace-pre-wrap break-words rounded-lg border border-[var(--border-panel)] bg-[var(--bg-surface)] p-3 font-sans text-xs leading-relaxed text-[var(--text-primary)]">{activity.contentMarkdown}</pre>}
                        {activity.url && <a href={activity.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-burgundy)] underline">Open {activity.verificationStatus === "link_checked" ? "checked official reference" : "resource"}</a>}
                        {activity.verificationStatus === "link_checked" && activity.lastVerifiedAt && <p className="mt-1 text-[10px] text-[var(--text-secondary)]">Link checked {new Date(activity.lastVerifiedAt).toLocaleDateString()} · cost/access: {activity.accessType}</p>}
                      </article>)}</div>}

                      <div className="mt-4 flex flex-wrap gap-2">
                        {!isDone && <button type="button" disabled={Boolean(busyStepId) || blocked || creating} onClick={() => void startStep(step)} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-[var(--border-accent)] px-3 py-1.5 text-xs font-semibold text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] disabled:cursor-not-allowed disabled:opacity-50"><Play className="h-3.5 w-3.5" aria-hidden="true" />{blocked ? "Complete prerequisite first" : isActive ? "Step started" : "Start step"}</button>}
                        {!isDone && <button type="button" disabled={Boolean(busyStepId) || blocked || !isActive} onClick={() => void openAssessment(step)} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-[var(--color-burgundy)] px-3 py-1.5 text-xs font-semibold text-[var(--color-warm-ivory)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"><CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />Knowledge check</button>}
                        {busyStepId === step.id && <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)]"><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />Saving…</span>}
                      </div>

                      {assessmentStepId === step.id && assessment && <div className="mt-4 rounded-2xl border border-[var(--border-accent)] bg-[var(--surface-rose)]/50 p-4" aria-label="Knowledge check">
                        <div className="flex items-start justify-between gap-3"><div><h4 className="font-semibold text-[var(--text-primary)]">{assessment.title}</h4><p className="mt-1 text-[11px] text-[var(--text-secondary)]">Version {assessment.version} · answers are scored on the server</p></div><button type="button" onClick={() => { setAssessment(null); setAssessmentStepId(null); }} className="rounded-md px-2 py-1 text-xs text-[var(--color-burgundy)] underline">Close</button></div>
                        <div className="mt-4 space-y-4">{assessment.questions.map((question, questionIndex) => <fieldset key={question.id}><legend className="text-sm font-medium text-[var(--text-primary)]">{questionIndex + 1}. {question.prompt}</legend><div className="mt-2 grid gap-2 sm:grid-cols-2">{question.options.map((option) => { const selected = answers[question.id] === option.id; return <label key={option.id} className={`flex cursor-pointer items-start gap-2 rounded-lg border p-2.5 text-xs ${selected ? "border-[var(--color-burgundy)] bg-[var(--bg-surface)]" : "border-[var(--border-panel)] bg-[var(--bg-surface)]"}`}><input type="radio" name={question.id} value={option.id} checked={selected} onChange={() => setAnswers((previous) => ({ ...previous, [question.id]: option.id }))} className="mt-0.5 accent-[var(--color-burgundy)]" />{option.text}</label>; })}</div></fieldset>)}</div>
                        <button type="button" disabled={Object.keys(answers).length !== assessment.questions.length || busyStepId === step.id} onClick={() => void submitAssessment()} className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-[var(--color-burgundy)] px-4 py-2 text-xs font-semibold text-[var(--color-warm-ivory)] disabled:cursor-not-allowed disabled:opacity-50">{busyStepId === step.id ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}Submit knowledge check</button>
                      </div>}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          {roadmap.versions.length > 0 && <details className="rounded-xl border border-[var(--border-panel)] px-4 py-3"><summary className="cursor-pointer text-xs font-semibold text-[var(--text-primary)]">Saved roadmap versions ({roadmap.versions.length})</summary><ol className="mt-3 space-y-2">{roadmap.versions.slice().reverse().map((version) => <li key={version.id} className="border-l-2 border-[var(--border-accent)] pl-3 text-xs"><p className="font-semibold text-[var(--text-primary)]">Version {version.version} · {version.status}</p><p className="mt-0.5 text-[var(--text-secondary)]">{version.generation_reason}</p><time className="text-[10px] text-[var(--text-secondary)]" dateTime={version.created_at}>{new Date(version.created_at).toLocaleString()}</time></li>)}</ol></details>}
          {roadmap.events.length > 0 && <details className="rounded-xl border border-[var(--border-panel)] px-4 py-3"><summary className="cursor-pointer text-xs font-semibold text-[var(--text-primary)]">Roadmap activity ({roadmap.events.length})</summary><ol className="mt-3 space-y-2">{roadmap.events.slice().reverse().map((event) => <li key={event.id} className="border-l-2 border-[var(--border-accent)] pl-3 text-xs"><p className="font-semibold text-[var(--text-primary)]">{event.event_type.replaceAll("_", " ")}</p><p className="mt-0.5 text-[var(--text-secondary)]">{event.reason}</p><time className="text-[10px] text-[var(--text-secondary)]" dateTime={event.created_at}>{new Date(event.created_at).toLocaleString()}</time></li>)}</ol></details>}
        </>
      )}

      <p className="text-[10px] leading-relaxed text-[var(--text-secondary)]">
        This pathway is a limited first milestone. Knowledge checks measure the saved quiz answers; the app does not run or independently review your local project. English content only. The optional country field does not supply job or salary intelligence.
      </p>
    </section>
  );
}
