"use client";

import { useState } from "react";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Zap,
} from "lucide-react";

export default function ResumePage() {
  const [resumeText, setResumeText] = useState(
    `• Designed an enterprise document retrieval system with vector search.\n• Built machine learning pipelines using PyTorch and FastAPI.\n• Optimized database queries in PostgreSQL to handle 50,000 daily active users.\n• Created real-time microservices deployed with Docker.`
  );
  const [atsScore, setAtsScore] = useState(84);
  const [copied, setCopied] = useState(false);

  const keywordsPresent = ["PyTorch", "FastAPI", "PostgreSQL", "Docker", "Vector Search"];
  const missingKeywords = ["HNSW Indexing", "LoRA Quantization", "Redis Semantic Caching", "Kafka"];

  const handleEnhance = () => {
    setResumeText(
      `• Architected an enterprise hybrid RAG engine with pgvector and HNSW indexing, cutting retrieval latency to sub-80ms.\n• Engineered PyTorch deep learning microservices served via FastAPI and Triton with 99.9% uptime SLA.\n• Spearheaded PostgreSQL query optimization and GIN indexing, reducing p95 database response times by 42% across 50,000 DAU.\n• Containerized distributed worker pipelines using Docker and Kubernetes with automated CI/CD validation.`
    );
    setAtsScore(96);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <FileText className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              High-Impact Executive Resume Tool
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Smart Resume Crafter & ATS Engine
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Optimize your technical bullet points, pass ATS screening filters, and quantify architectural impact.
          </p>
        </div>

        <button
          onClick={handleEnhance}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#c58b94] to-[#843e4b] hover:opacity-95 text-white font-semibold text-xs tracking-wide transition flex items-center gap-2 shadow-xs cursor-pointer self-start"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Impact Enhancer</span>
        </button>
      </div>

      {/* ATS Score Card */}
      <div className="card-luxury p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-gradient-to-r from-white to-rose-50/20 dark:from-zinc-900 dark:to-zinc-900/60">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase text-[#c58b94] dark:text-[#d8a0ab]">
            ATS Compatibility Rating
          </span>
          <div className="font-serif-luxury text-4xl sm:text-5xl text-zinc-900 dark:text-zinc-100">
            {atsScore} <span className="text-xl font-sans text-zinc-400">/ 100</span>
          </div>
          <p className="text-xs text-zinc-500">
            Targeting: <strong>AI Solutions Architect</strong> screening algorithms.
          </p>
        </div>

        <div className="w-full sm:w-64 space-y-2">
          <div className="w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-700"
              style={{ width: `${atsScore}%` }}
            />
          </div>
          <span className="text-[10px] text-zinc-400 block text-right font-semibold">
            {atsScore >= 90 ? "Excellent ATS Alignment" : "Good — Enhancements Available"}
          </span>
        </div>
      </div>

      {/* Editor & Keywords Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Editor Box */}
        <div className="lg:col-span-8 card-luxury p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Technical Experience Bullets
            </span>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <textarea
            rows={10}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 font-mono-code text-xs sm:text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#c58b94] leading-relaxed resize-y"
          />

          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Formula: Action Verb + Technical Component + Quantified Business Impact</span>
            <span>{resumeText.split("\n").filter((l) => l.trim()).length} Bullet Points</span>
          </div>
        </div>

        {/* Keyword Scanner Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="card-luxury p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 block pb-2 border-b border-zinc-100 dark:border-zinc-800">
              Detected ATS Keywords
            </span>
            <div className="flex flex-wrap gap-1.5">
              {keywordsPresent.map((k, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-500/20 flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{k}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="card-luxury p-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 block pb-2 border-b border-zinc-100 dark:border-zinc-800">
              Missing High-Value Keywords
            </span>
            <div className="flex flex-wrap gap-1.5">
              {missingKeywords.map((k, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-700 dark:text-rose-400 font-semibold border border-rose-500/20 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  <span>{k}</span>
                </span>
              ))}
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Click "AI Impact Enhancer" above to automatically incorporate these missing architectural keywords with realistic metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
