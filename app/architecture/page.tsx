"use client";

import { useState } from "react";
import {
  Workflow,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  Server,
  Zap,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

export default function ArchitecturePage() {
  const [selectedPattern, setSelectedPattern] = useState("rag");

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <Workflow className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Production System Blueprints
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            System Architecture Explorer
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Interactive distributed diagrams, latency SLAs, and component trade-off matrices for senior defenses.
          </p>
        </div>

        {/* Pattern Switcher */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedPattern("rag")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedPattern === "rag"
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs"
                : "bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Hybrid RAG Pipeline
          </button>
          <button
            onClick={() => setSelectedPattern("stream")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedPattern === "stream"
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs"
                : "bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            Stream Feature Store
          </button>
          <button
            onClick={() => setSelectedPattern("auth")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedPattern === "auth"
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-xs"
                : "bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            API Gateway & RBAC
          </button>
        </div>
      </div>

      {/* Diagram Canvas */}
      {selectedPattern === "rag" && (
        <div className="card-luxury p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#c58b94] dark:text-[#d8a0ab]">
                Microservice Topology
              </span>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Enterprise Hybrid RAG Architecture (pgvector + Redis Semantic Cache)
              </h2>
            </div>
            <span className="text-xs font-mono-code px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold self-start">
              SLA: &lt; 90ms Latency
            </span>
          </div>

          {/* Interactive Flowchart Diagram */}
          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-zinc-800 text-white space-y-6 overflow-x-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 min-w-[700px]">
              {/* Step 1 */}
              <div className="w-48 p-4 rounded-xl bg-zinc-900 border border-zinc-700 text-center space-y-2">
                <span className="text-[10px] font-bold text-rose-300 uppercase">1. Ingestion Layer</span>
                <p className="text-xs font-bold text-white">Document Parser</p>
                <span className="text-[10px] text-zinc-400 block">PDF / Markdown → Chunks (512 tokens with 50 overlap)</span>
              </div>

              <ArrowRight className="w-5 h-5 text-zinc-500 shrink-0 hidden md:block" />
              <ArrowDown className="w-5 h-5 text-zinc-500 shrink-0 md:hidden" />

              {/* Step 2 */}
              <div className="w-48 p-4 rounded-xl bg-zinc-900 border border-rose-500/50 text-center space-y-2 ring-1 ring-rose-500/30">
                <span className="text-[10px] font-bold text-[#d8a0ab] uppercase">2. Semantic Cache</span>
                <p className="text-xs font-bold text-white">Redis Cache</p>
                <span className="text-[10px] text-zinc-400 block">Cosine sim &gt; 0.88? Serve instant cached response (12ms)</span>
              </div>

              <ArrowRight className="w-5 h-5 text-zinc-500 shrink-0 hidden md:block" />
              <ArrowDown className="w-5 h-5 text-zinc-500 shrink-0 md:hidden" />

              {/* Step 3 */}
              <div className="w-48 p-4 rounded-xl bg-zinc-900 border border-cyan-500/50 text-center space-y-2 ring-1 ring-cyan-500/30">
                <span className="text-[10px] font-bold text-cyan-300 uppercase">3. Vector Search</span>
                <p className="text-xs font-bold text-white">PostgreSQL pgvector</p>
                <span className="text-[10px] text-zinc-400 block">HNSW index with m=16, ef_construction=64 + BM25</span>
              </div>

              <ArrowRight className="w-5 h-5 text-zinc-500 shrink-0 hidden md:block" />
              <ArrowDown className="w-5 h-5 text-zinc-500 shrink-0 md:hidden" />

              {/* Step 4 */}
              <div className="w-48 p-4 rounded-xl bg-zinc-900 border border-emerald-500/50 text-center space-y-2 ring-1 ring-emerald-500/30">
                <span className="text-[10px] font-bold text-emerald-300 uppercase">4. Generation</span>
                <p className="text-xs font-bold text-white">Gemini 1.5 Flash</p>
                <span className="text-[10px] text-zinc-400 block">Streaming SSE tokens with citation footnotes</span>
              </div>
            </div>
          </div>

          {/* Trade-off Matrix */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 block">
              Architectural Trade-Off Analysis
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  HNSW Index vs Inverted File (IVF):
                </span>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  HNSW consumes ~1.8x more RAM but provides 98% recall at &lt;15ms query times. Chosen for mission-critical enterprise docs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">
                  Semantic Cache Hit Ratio:
                </span>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  In enterprise workloads, repeat and paraphrased queries account for 40-65% of traffic. Cuts OpenAI/Gemini costs by over 50%.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPattern === "stream" && (
        <div className="card-luxury p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Event-Driven Kappa Topology
              </span>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Real-Time Streaming Feature Store (Kafka + Redis + gRPC)
              </h2>
            </div>
            <span className="text-xs font-mono-code px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
              Throughput: 10,000 events/sec
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-zinc-800 text-white space-y-4">
            <p className="text-xs text-zinc-300 leading-relaxed">
              Decoupled real-time sliding window aggregates (e.g. 5-minute transaction velocity) stored in Redis with point-in-time correctness for ML inference scoring.
            </p>
          </div>
        </div>
      )}

      {selectedPattern === "auth" && (
        <div className="card-luxury p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Multi-Tenant Security
              </span>
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                API Gateway, Token Bucket Rate Limiter & Supabase RLS
              </h2>
            </div>
            <span className="text-xs font-mono-code px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
              Zero-Trust Architecture
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0d0d12] border border-zinc-800 text-white space-y-4">
            <p className="text-xs text-zinc-300 leading-relaxed">
              Next.js Edge middleware validates Supabase JWT claims, verifies rate limit token buckets in Redis, and injects secure tenant isolation headers before executing PostgreSQL queries.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
