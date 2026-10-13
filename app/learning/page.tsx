"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  Code2,
  Bug,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Terminal,
  Layout,
  Database,
  Cpu,
  GraduationCap,
  Play,
  Layers,
  Check,
  Compass,
  FileCode,
  Flame,
} from "lucide-react";

import InteractiveCodeSandbox from "@/components/InteractiveCodeSandbox";
import {
  BEGINNER_LEARNING_TRACKS,
  LearningTrack,
  LearningLesson,
} from "@/lib/beginner-learning-data";

export default function LearningStudioPage() {
  // Main Hub Mode: Beginner Tracks, Standalone Sandbox, or Advanced Engineering Labs
  const [mainMode, setMainMode] = useState<"tracks" | "sandbox" | "advanced">("tracks");

  // Track & Lesson navigation state
  const [selectedTrackId, setSelectedTrackId] = useState<string>("python-foundations");
  const [selectedLessonIdx, setSelectedLessonIdx] = useState<number>(0);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);

  // Quiz state for current lesson: { [lessonId]: { selectedOption: number, submitted: boolean } }
  const [quizAnswers, setQuizAnswers] = useState<Record<string, { selected: number; isCorrect: boolean; showFeedback: boolean }>>({});

  // Standalone Sandbox State
  const [sandboxLang, setSandboxLang] = useState<"python" | "javascript" | "html" | "sql">("python");
  const [sandboxCode, setSandboxCode] = useState<string>(
    `# TALVIORA TECH Interactive Sandbox
def calculate_growth(starting_skills, learning_rate):
    projected = starting_skills * (1 + learning_rate)
    return f"Projected Skill Capital: {projected:.1f}"

print("Welcome to the Code Playground!")
print(calculate_growth(10, 0.45))`
  );

  // -------------------------------------------------------------
  // PRESERVED ORIGINAL ADVANCED LAB STATE
  // -------------------------------------------------------------
  const [advancedTab, setAdvancedTab] = useState<"lesson" | "debug" | "reorder">("lesson");

  // Debugging exercise state
  const [debugBugFound, setDebugBugFound] = useState(false);
  const [debugFeedback, setDebugFeedback] = useState<string | null>(null);

  // Code rearrangement exercise state
  const [reorderedItems, setReorderedItems] = useState([
    { id: 1, text: "const response = await fetch('/api/v1/inference');" },
    { id: 2, text: "if (!response.ok) throw new Error('Gateway timeout');" },
    { id: 3, text: "try {" },
    { id: 4, text: "} catch (err) { logger.error('Service fallback triggered', err); }" },
    { id: 5, text: "const data = await response.json(); return data;" },
  ]);
  const [reorderVerified, setReorderVerified] = useState(false);
  const [reorderFeedback, setReorderFeedback] = useState<string | null>(null);

  // Load completed lessons from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("talviora_completed_lessons");
      if (saved) {
        setCompletedLessonIds(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Save completed lessons to localStorage
  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessonIds((prev) => {
      const next = prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId];
      try {
        localStorage.setItem("talviora_completed_lessons", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // Find active track & active lesson
  const currentTrack = BEGINNER_LEARNING_TRACKS.find((t) => t.id === selectedTrackId) || BEGINNER_LEARNING_TRACKS[0];
  const currentLesson = currentTrack.lessons[selectedLessonIdx] || currentTrack.lessons[0];

  // Advance to next / previous lesson
  const goToNextLesson = () => {
    if (selectedLessonIdx < currentTrack.lessons.length - 1) {
      setSelectedLessonIdx(selectedLessonIdx + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToPrevLesson = () => {
    if (selectedLessonIdx > 0) {
      setSelectedLessonIdx(selectedLessonIdx - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Quiz submission handler
  const handleQuizOptionSelect = (optionIdx: number) => {
    const isCorrect = optionIdx === currentLesson.quiz.correctIndex;
    setQuizAnswers((prev) => ({
      ...prev,
      [currentLesson.id]: {
        selected: optionIdx,
        isCorrect,
        showFeedback: true,
      },
    }));
    if (isCorrect && !completedLessonIds.includes(currentLesson.id)) {
      toggleLessonComplete(currentLesson.id);
    }
  };

  // Standalone sandbox preset switcher
  const handleSandboxLangChange = (lang: "python" | "javascript" | "html" | "sql") => {
    setSandboxLang(lang);
    if (lang === "python") {
      setSandboxCode(`# Python Interactive Sandbox
def recommend_path(weekly_hours):
    if weekly_hours >= 15:
        return "Accelerated AI Engineer Track"
    return "Balanced Foundations Track"

print("Recommendation:", recommend_path(16))`);
    } else if (lang === "javascript") {
      setSandboxCode(`// Modern JavaScript Execution Sandbox
const candidate = {
  name: "Jordan",
  skills: ["React", "TypeScript", "Tailwind"],
  verifiedScore: 92
};

console.log("Candidate Profile:");
console.log(JSON.stringify(candidate, null, 2));
console.log("Ready for Technical Interview: " + (candidate.verifiedScore >= 80));`);
    } else if (lang === "html") {
      setSandboxCode(`<div style="font-family: system-ui, sans-serif; padding: 24px; background: #F5E8E0; border-radius: 12px; border: 1px solid #DAA2A1; color: #914955;">
  <h2 style="margin: 0 0 8px;">TALVIORA TECH Career Card</h2>
  <p style="margin: 0 0 16px; font-size: 14px; opacity: 0.9;">
    Master technologies through hands-on W3Schools-style live sandboxes and verified learning pathways.
  </p>
  <button style="background: #914955; color: #EEE8DC; border: none; padding: 8px 16px; border-radius: 6px; font-weight: bold; cursor: pointer;">
    Enroll in Track &rarr;
  </button>
</div>`);
    } else if (lang === "sql") {
      setSandboxCode(`-- Query top learners from in-memory database
SELECT name, target_role, readiness_score, weekly_hours
FROM learners
WHERE readiness_score >= 80
ORDER BY readiness_score DESC
LIMIT 5;`);
    }
  };

  // Original Preserved Advanced Reorder handlers
  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const items = [...reorderedItems];
    const temp = items[idx - 1];
    items[idx - 1] = items[idx];
    items[idx] = temp;
    setReorderedItems(items);
    setReorderVerified(false);
    setReorderFeedback(null);
  };

  const moveDown = (idx: number) => {
    if (idx === reorderedItems.length - 1) return;
    const items = [...reorderedItems];
    const temp = items[idx + 1];
    items[idx + 1] = items[idx];
    items[idx] = temp;
    setReorderedItems(items);
    setReorderVerified(false);
    setReorderFeedback(null);
  };

  const checkReorder = () => {
    // Correct order: 3 (try), 1 (fetch), 2 (check ok), 5 (json), 4 (catch)
    const order = reorderedItems.map((i) => i.id).join(",");
    if (order === "3,1,2,5,4") {
      setReorderVerified(true);
      setReorderFeedback(null);
    } else {
      setReorderFeedback("Not quite right yet. Make sure your 'try {' block encapsulates the fetch and JSON parsing, followed by the catch block!");
    }
  };

  const trackCompletedCount = currentTrack.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
  const trackProgressPercent = Math.round((trackCompletedCount / currentTrack.lessons.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Platform Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)]">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
              Beginner-First Learning Studio • W3Schools Methodology
            </span>
          </div>
          <h1 className="font-display-serif text-3xl sm:text-4xl text-[var(--color-burgundy)] font-bold">
            Interactive Learning Studio & Code Sandbox
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/85 mt-1 max-w-2xl leading-relaxed">
            Step-by-step beginner tutorials with immediate <span className="font-bold underline">Try It Yourself</span> runnable code sandboxes, sequential chapter pacing, and practical exercises.
          </p>
        </div>

        {/* Top-Level Mode Selector */}
        <div className="flex items-center p-1 rounded-2xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs">
          <button
            onClick={() => setMainMode("tracks")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mainMode === "tracks"
                ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shadow-2xs"
                : "text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]/60"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Beginner Tracks</span>
          </button>
          <button
            onClick={() => setMainMode("sandbox")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mainMode === "sandbox"
                ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shadow-2xs"
                : "text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]/60"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Try It Yourself</span>
          </button>
          <button
            onClick={() => setMainMode("advanced")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              mainMode === "advanced"
                ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shadow-2xs"
                : "text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]/60"
            }`}
          >
            <Bug className="w-3.5 h-3.5" />
            <span>Advanced Labs</span>
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* MODE 1: BEGINNER-FIRST LEARNING TRACKS (W3Schools Style)                   */}
      {/* -------------------------------------------------------------------------- */}
      {mainMode === "tracks" && (
        <div className="space-y-6">
          {/* Domain Track Navigation Pills */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {BEGINNER_LEARNING_TRACKS.map((track) => {
              const isSelected = track.id === selectedTrackId;
              const completedCount = track.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
              return (
                <button
                  key={track.id}
                  onClick={() => {
                    setSelectedTrackId(track.id);
                    setSelectedLessonIdx(0);
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? "bg-[var(--surface-rose)] border-[var(--color-burgundy)] shadow-xs ring-1 ring-[var(--color-burgundy)]"
                      : "bg-[var(--color-warm-ivory)] border-[rgba(var(--color-burgundy-rgb),0.12)] hover:border-[var(--color-dusty-rose)] hover:bg-[var(--surface-rose)]/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.15)]">
                      {track.badge.split("•")[0].trim()}
                    </span>
                    <span className="text-[10px] font-mono-code font-bold text-[var(--color-burgundy)]/80">
                      {completedCount}/{track.lessons.length} done
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--color-burgundy)] group-hover:text-[var(--color-burgundy)] transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-[11px] text-[var(--color-burgundy)]/75 mt-1 line-clamp-2 leading-snug">
                    {track.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Chapter Layout: Sidebar on Left, Lesson Content & Sandbox on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Chapters Index Sidebar (4 cols on lg) */}
            <aside className="lg:col-span-4 rounded-2xl border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-creme-latte)] p-4 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[var(--color-burgundy)] mb-1">
                  <span>Track Syllabus</span>
                  <span className="font-mono-code">{trackProgressPercent}% complete</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--surface-rose)] overflow-hidden border border-[rgba(var(--color-dusty-rose-rgb),0.3)]">
                  <div
                    className="h-full bg-[var(--color-burgundy)] transition-all duration-300"
                    style={{ width: `${trackProgressPercent}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                {currentTrack.lessons.map((lesson, idx) => {
                  const isCurrent = idx === selectedLessonIdx;
                  const isDone = completedLessonIds.includes(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setSelectedLessonIdx(idx);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[var(--color-burgundy)] shadow-2xs font-bold"
                          : "text-[var(--color-burgundy)]/85 hover:bg-[var(--surface-rose)]/50 hover:text-[var(--color-burgundy)]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono-code font-bold shrink-0 ${
                            isDone
                              ? "bg-green-700 text-white"
                              : isCurrent
                              ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]"
                              : "bg-[var(--surface-rose)] text-[var(--color-burgundy)]"
                          }`}
                        >
                          {isDone ? <Check className="w-3 h-3" /> : idx + 1}
                        </span>
                        <span className="truncate">{lesson.title}</span>
                      </div>
                      <span className="text-[10px] font-mono-code text-[var(--color-burgundy)]/60 shrink-0">
                        {lesson.estimatedMinutes}m
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Jump to Technology Catalogue */}
              <div className="pt-3 border-t border-[rgba(var(--color-burgundy-rgb),0.12)]">
                <Link
                  href="/catalogue"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--surface-rose)]/50 text-[11px] font-bold text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" /> Explore Tech Catalogue
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </aside>

            {/* Active Chapter Main Canvas (8 cols on lg) */}
            <main className="lg:col-span-8 space-y-6">
              {/* Chapter Header Card */}
              <div className="p-6 rounded-3xl bg-[var(--color-warm-ivory)] border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[rgba(var(--color-burgundy-rgb),0.1)]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)]">
                      Chapter {currentLesson.chapterNumber} of {currentTrack.lessons.length}
                    </span>
                    <span className="text-xs font-mono-code text-[var(--color-burgundy)]/75">
                      Est. {currentLesson.estimatedMinutes} mins
                    </span>
                  </div>

                  <button
                    onClick={() => toggleLessonComplete(currentLesson.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                      completedLessonIds.includes(currentLesson.id)
                        ? "bg-green-700 text-white shadow-2xs"
                        : "border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
                    }`}
                  >
                    {completedLessonIds.includes(currentLesson.id) ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" /> Mark as Done
                      </>
                    )}
                  </button>
                </div>

                <div>
                  <h2 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
                    {currentLesson.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/85 mt-2 leading-relaxed">
                    {currentLesson.summary}
                  </p>
                </div>

                {/* Concepts Breakdown */}
                <div className="space-y-4 pt-2">
                  {currentLesson.concepts.map((concept, cIdx) => (
                    <div
                      key={cIdx}
                      className="p-4 rounded-2xl bg-[var(--color-creme-latte)]/70 border border-[rgba(var(--color-burgundy-rgb),0.1)] space-y-2.5"
                    >
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] flex items-center gap-2">
                        <span className="w-1.5 h-3.5 rounded-full bg-[var(--color-burgundy)]" />
                        {concept.heading}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--color-burgundy)]/90 leading-relaxed whitespace-pre-line">
                        {concept.body}
                      </p>
                      {concept.codeExample && (
                        <div className="p-3 rounded-xl bg-[#1A1414] text-[#F8DEDC] font-mono-code text-xs overflow-x-auto shadow-inner">
                          <pre>{concept.codeExample}</pre>
                        </div>
                      )}
                      {concept.note && (
                        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)] text-xs text-[var(--color-burgundy)]">
                          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-[var(--color-burgundy)]" />
                          <span className="leading-relaxed font-medium">{concept.note}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* W3Schools Signature "Try It Yourself" Sandbox */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 px-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)]">
                    Interactive Sandbox
                  </span>
                  <span className="text-xs font-bold text-[var(--color-burgundy)]">
                    Try It Yourself: Live Code & Instant Output
                  </span>
                </div>
                <InteractiveCodeSandbox
                  key={currentLesson.id}
                  initialCode={currentLesson.starterCode}
                  language={currentLesson.language}
                  goal={currentLesson.tryItYourselfGoal}
                  title={`${currentTrack.title} — ${currentLesson.title}`}
                  height="260px"
                />
              </div>

              {/* End of Chapter "Check Your Understanding" Micro-Quiz */}
              <div className="p-6 rounded-3xl bg-[var(--surface-rose)]/50 border border-[rgba(var(--color-burgundy-rgb),0.18)] shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
                  <Sparkles className="w-4 h-4 text-[var(--color-burgundy)]" />
                  <span>Check Your Understanding</span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-[var(--color-burgundy)] leading-relaxed">
                  {currentLesson.quiz.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentLesson.quiz.options.map((opt, oIdx) => {
                    const currentQuizState = quizAnswers[currentLesson.id];
                    const isSelected = currentQuizState?.selected === oIdx;
                    const isCorrect = oIdx === currentLesson.quiz.correctIndex;
                    let buttonStyle = "bg-[var(--color-warm-ivory)] border-[rgba(var(--color-burgundy-rgb),0.15)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]";

                    if (currentQuizState?.showFeedback) {
                      if (isCorrect) {
                        buttonStyle = "bg-green-700 text-white border-green-800 font-bold shadow-2xs";
                      } else if (isSelected && !isCorrect) {
                        buttonStyle = "bg-red-700 text-white border-red-800";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleQuizOptionSelect(oIdx)}
                        className={`p-3 rounded-xl border text-xs font-medium text-left transition cursor-pointer flex items-center justify-between ${buttonStyle}`}
                      >
                        <span>{opt}</span>
                        {currentQuizState?.showFeedback && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 shrink-0 text-white ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizAnswers[currentLesson.id]?.showFeedback && (
                  <div
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                      quizAnswers[currentLesson.id]?.isCorrect
                        ? "bg-green-50 text-green-900 border-green-300"
                        : "bg-amber-50 text-amber-900 border-amber-300"
                    }`}
                  >
                    <span className="font-bold block mb-1">
                      {quizAnswers[currentLesson.id]?.isCorrect
                        ? "✓ Spot on! Concept verified."
                        : "Not quite, but you are learning!"}
                    </span>
                    {currentLesson.quiz.explanation}
                  </div>
                )}
              </div>

              {/* Sequential Chapter Navigation: Previous & Next Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={goToPrevLesson}
                  disabled={selectedLessonIdx === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] disabled:opacity-40 disabled:pointer-events-none text-xs font-bold transition cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Chapter</span>
                </button>

                <div className="text-[11px] font-mono-code text-[var(--color-burgundy)]/75">
                  Chapter {selectedLessonIdx + 1} of {currentTrack.lessons.length}
                </div>

                <button
                  onClick={goToNextLesson}
                  disabled={selectedLessonIdx === currentTrack.lessons.length - 1}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] hover:brightness-110 disabled:opacity-40 disabled:pointer-events-none text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  <span>Next Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </main>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* MODE 2: STANDALONE "TRY IT YOURSELF" PLAYGROUND                           */}
      {/* -------------------------------------------------------------------------- */}
      {mainMode === "sandbox" && (
        <div className="space-y-6">
          {/* Language Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.15)]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] pl-1">
                Select Engine:
              </span>
              <div className="flex items-center gap-1.5">
                {(["python", "javascript", "html", "sql"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleSandboxLangChange(lang)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono-code font-bold uppercase transition cursor-pointer ${
                      sandboxLang === lang
                        ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shadow-2xs"
                        : "bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] border border-[rgba(var(--color-burgundy-rgb),0.15)] hover:bg-[var(--surface-rose)]"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-[var(--color-burgundy)]/75 font-mono-code">
              Offline-Capable Client Execution Engine
            </div>
          </div>

          {/* Dedicated Full Playground */}
          <InteractiveCodeSandbox
            initialCode={sandboxCode}
            language={sandboxLang}
            title={`Standalone ${sandboxLang.toUpperCase()} Code Playground`}
            goal="Write custom scripts, experiment with syntax variations, and verify execution output instantly without installing local compilers!"
            height="380px"
          />
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* MODE 3: PRESERVED ADVANCED ENGINEERING LABS                               */}
      {/* -------------------------------------------------------------------------- */}
      {mainMode === "advanced" && (
        <div className="space-y-6">
          {/* Advanced Sub-Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.15)] w-fit">
            <button
              onClick={() => setAdvancedTab("lesson")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                advancedTab === "lesson"
                  ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shadow-xs"
                  : "text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
              }`}
            >
              Transformer Attention Autograd
            </button>
            <button
              onClick={() => setAdvancedTab("debug")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                advancedTab === "debug"
                  ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shadow-xs"
                  : "text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
              }`}
            >
              PyTorch Memory Leak Lab
            </button>
            <button
              onClick={() => setAdvancedTab("reorder")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                advancedTab === "reorder"
                  ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shadow-xs"
                  : "text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]"
              }`}
            >
              Async Pipeline Rearrangement
            </button>
          </div>

          {/* Tab 1: Guided Lesson (Transformer) */}
          {advancedTab === "lesson" && (
            <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-6 sm:p-8 space-y-6 border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70">
                    Module 2.2 • Applied Deep Learning
                  </span>
                  <h2 className="font-display-serif text-2xl text-[var(--color-burgundy)] font-bold mt-1">
                    Transformer Multi-Head Attention: Mechanics & Autograd
                  </h2>
                </div>
                <span className="text-xs font-mono-code px-2.5 py-1 rounded bg-[var(--surface-rose)] text-[var(--color-burgundy)] font-bold border border-[rgba(var(--color-dusty-rose-rgb),0.4)]">
                  Est: 45 mins
                </span>
              </div>

              <div className="max-w-none text-xs sm:text-sm text-[var(--color-burgundy)]/85 leading-relaxed space-y-4">
                <p>
                  In autoregressive transformer models, the self-attention mechanism enables each sequence token to compute contextual weights against every other token in parallel. Unlike recurrent architectures, which enforce sequential bottlenecks of \(O(N)\) steps, multi-head attention operates in \(O(1)\) sequential operations with \(O(N^2 \cdot d)\) computational complexity.
                </p>

                <div className="p-4 rounded-2xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.12)] space-y-2">
                  <span className="text-xs font-bold text-[var(--color-burgundy)] uppercase tracking-wide block">
                    Mathematical Definition of Scaled Dot-Product Attention:
                  </span>
                  <div className="font-mono-code text-xs text-[var(--color-burgundy)] p-2 bg-[var(--surface-rose)] rounded-lg">
                    Attention(Q, K, V) = softmax( (Q · K^T) / √d_k ) · V
                  </div>
                  <p className="text-xs text-[var(--color-burgundy)]/80">
                    The scaling factor 1/√d_k prevents large dot-product magnitudes in high-dimensional vector spaces, avoiding vanishing gradients in the softmax region.
                  </p>
                </div>

                <h3 className="font-bold text-sm text-[var(--color-burgundy)] pt-2">
                  PyTorch Implementation Blueprint:
                </h3>

                <div className="rounded-xl bg-[#241A1A] p-4 text-xs font-mono-code text-[var(--color-creme-latte)] overflow-x-auto shadow-inner">
                  <pre>{`import torch
import torch.nn as nn
import math

class ScaledDotProductAttention(nn.Module):
    def __init__(self, d_k: int):
        super().__init__()
        self.d_k = d_k

    def forward(self, q, k, v, mask=None):
        scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
        attention_weights = torch.softmax(scores, dim=-1)
        output = torch.matmul(attention_weights, v)
        return output, attention_weights`}</pre>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Debugging Practice */}
          {advancedTab === "debug" && (
            <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-6 sm:p-8 space-y-6 border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs">
              <div className="pb-4 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70">
                  Intentionally Broken Code Challenge
                </span>
                <h2 className="font-display-serif text-2xl text-[var(--color-burgundy)] font-bold mt-1">
                  Find the Hidden Memory Leak in this PyTorch Training Loop
                </h2>
                <p className="text-xs text-[var(--color-burgundy)]/80 mt-1">
                  Study the code snippet below. An engineer reports their GPU memory runs out (OOM) after 20 batches despite small batch sizes.
                </p>
              </div>

              <div className="rounded-xl bg-[#241A1A] p-4 font-mono-code text-xs text-[var(--color-creme-latte)] overflow-x-auto shadow-inner">
                <pre>{`total_epoch_loss = 0
for batch_idx, (data, targets) in enumerate(dataloader):
    optimizer.zero_grad()
    outputs = model(data)
    loss = criterion(outputs, targets)
    loss.backward()
    optimizer.step()
    
    # LINE 9: Tracking cumulative training loss
    total_epoch_loss += loss  # <--- CAN YOU SPOT THE FLAW?`}</pre>
              </div>

              {!debugBugFound ? (
                <div className="space-y-3">
                  <p className="text-xs text-[var(--color-burgundy)] font-semibold">
                    Why does Line 9 trigger a cumulative GPU Out-of-Memory error over time?
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => setDebugFeedback("Incorrect: criterion(outputs, targets) returns a scalar tensor, not a matrix.")}
                      className="w-full text-left p-3 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.15)] hover:bg-[var(--surface-rose)] text-xs text-[var(--color-burgundy)] transition cursor-pointer"
                    >
                      A) The loss calculation criterion produces a 3D tensor instead of a scalar.
                    </button>
                    <button
                      onClick={() => {
                        setDebugBugFound(true);
                        setDebugFeedback(null);
                      }}
                      className="w-full text-left p-3 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.15)] hover:bg-[var(--surface-rose)] text-xs text-[var(--color-burgundy)] transition cursor-pointer"
                    >
                      B) Adding `loss` directly retains the entire autograd computational graph in memory. We must use `loss.item()`.
                    </button>
                    <button
                      onClick={() => setDebugFeedback("Incorrect: optimizer.zero_grad() was already called at the top of the loop.")}
                      className="w-full text-left p-3 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.15)] hover:bg-[var(--surface-rose)] text-xs text-[var(--color-burgundy)] transition cursor-pointer"
                    >
                      C) The dataloader failed to shuffle batches between iterations.
                    </button>
                  </div>

                  {debugFeedback && (
                    <div className="p-3 rounded-xl bg-[var(--surface-rose)] border border-[var(--color-dusty-rose)] text-xs text-[var(--color-burgundy)] flex items-center gap-2 animate-in fade-in duration-200">
                      <AlertCircle className="w-4 h-4 shrink-0 text-[var(--color-burgundy)]" />
                      <span>{debugFeedback}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.5)] text-xs space-y-2 text-[var(--color-burgundy)]">
                  <div className="flex items-center gap-2 font-bold text-[var(--color-burgundy)]">
                    <CheckCircle2 className="w-5 h-5 text-green-700" />
                    <span>Bug Identified Successfully!</span>
                  </div>
                  <p className="leading-relaxed">
                    By writing <code>total_epoch_loss += loss</code>, Python preserves a reference to the PyTorch variable and its full backward computation history across all batches. Replacing it with <code>total_epoch_loss += loss.item()</code> extracts the raw Python float and frees the computation graph from GPU VRAM immediately!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Code Rearrangement */}
          {advancedTab === "reorder" && (
            <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-6 sm:p-8 space-y-6 border border-[rgba(var(--color-burgundy-rgb),0.15)] shadow-xs">
              <div className="pb-4 border-b border-[rgba(var(--color-burgundy-rgb),0.12)]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70">
                  Code-Rearrangement Exercise
                </span>
                <h2 className="font-display-serif text-2xl text-[var(--color-burgundy)] font-bold mt-1">
                  Order the Asynchronous Error Handling Pipeline
                </h2>
                <p className="text-xs text-[var(--color-burgundy)]/80 mt-1">
                  Use the arrow buttons to arrange these code blocks into a robust, production-grade Next.js API client handler with HTTP error validation.
                </p>
              </div>

              <div className="space-y-2">
                {reorderedItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.15)] flex items-center justify-between text-xs font-mono-code text-[var(--color-burgundy)]"
                  >
                    <span>{item.text}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveUp(idx)}
                        disabled={idx === 0}
                        className="px-2 py-0.5 rounded bg-[var(--surface-rose)] text-[var(--color-burgundy)] hover:bg-[var(--color-dusty-rose)]/40 text-xs font-bold disabled:opacity-30 cursor-pointer"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveDown(idx)}
                        disabled={idx === reorderedItems.length - 1}
                        className="px-2 py-0.5 rounded bg-[var(--surface-rose)] text-[var(--color-burgundy)] hover:bg-[var(--color-dusty-rose)]/40 text-xs font-bold disabled:opacity-30 cursor-pointer"
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {reorderFeedback && (
                <div className="p-3 rounded-xl bg-[var(--surface-rose)] border border-[var(--color-dusty-rose)] text-xs text-[var(--color-burgundy)] flex items-center gap-2 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[var(--color-burgundy)]" />
                  <span>{reorderFeedback}</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                {reorderVerified ? (
                  <span className="text-xs font-bold text-green-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Correct Sequence Verified!
                  </span>
                ) : (
                  <span className="text-xs text-[var(--color-burgundy)]/70">
                    Arrange blocks, then verify logic.
                  </span>
                )}

                <button
                  onClick={checkReorder}
                  className="px-5 py-2 rounded-xl bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] text-xs font-semibold cursor-pointer shadow-xs hover:brightness-110"
                >
                  Verify Pipeline Logic
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
