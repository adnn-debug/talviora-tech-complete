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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-creme-latte)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[var(--color-dusty-rose)]/30">
              <Workflow className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]/80">
              Production System Blueprints
            </span>
          </div>
          <h1 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
            System Architecture Explorer
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/80 mt-0.5">
            Interactive distributed diagrams, latency SLAs, and component trade-off matrices for senior defenses.
          </p>
        </div>

        {/* Pattern Switcher */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSelectedPattern("rag")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              selectedPattern === "rag"
                ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shadow-xs"
                : "bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] hover:bg-[var(--color-warm-ivory)]"
            }`}
          >
            Hybrid RAG Pipeline
          </button>
          <button
            onClick={() => setSelectedPattern("stream")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              selectedPattern === "stream"
                ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shadow-xs"
                : "bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] hover:bg-[var(--color-warm-ivory)]"
            }`}
          >
            Stream Feature Store
          </button>
          <button
            onClick={() => setSelectedPattern("auth")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              selectedPattern === "auth"
                ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] shadow-xs"
                : "bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] hover:bg-[var(--color-warm-ivory)]"
            }`}
          >
            API Gateway & RBAC
          </button>
        </div>
      </div>

      {/* Diagram Canvas */}
      {selectedPattern === "rag" && (
        <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-6 sm:p-8 space-y-6 border border-[var(--color-creme-latte)] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--color-creme-latte)]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70">
                Microservice Topology
              </span>
              <h2 className="text-lg font-display-serif font-bold text-[var(--color-burgundy)]">
                Enterprise Hybrid RAG Architecture (pgvector + Redis Semantic Cache)
              </h2>
            </div>
            <span className="text-xs font-mono-code px-2.5 py-1 rounded-full bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[var(--color-dusty-rose)]/40 font-bold self-start">
              Example flow · not deployed
            </span>
          </div>

          {/* Interactive Flowchart Diagram */}
          <div className="p-6 rounded-2xl bg-[var(--color-creme-latte)]/50 border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] space-y-6 overflow-x-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 min-w-[700px]">
              {/* Step 1 */}
              <div className="w-48 p-4 rounded-xl bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-center space-y-2 shadow-xs">
                <span className="text-[10px] font-bold text-[var(--color-burgundy)]/80 uppercase">1. Ingestion Layer</span>
                <p className="text-xs font-bold text-[var(--color-burgundy)]">Document Parser</p>
                <span className="text-[10px] text-[var(--color-burgundy)]/70 block">PDF / Markdown → split into overlapping chunks</span>
              </div>

              <ArrowRight className="w-5 h-5 text-[var(--color-dusty-rose)] shrink-0 hidden md:block" />
              <ArrowDown className="w-5 h-5 text-[var(--color-dusty-rose)] shrink-0 md:hidden" />

              {/* Step 2 */}
              <div className="w-48 p-4 rounded-xl bg-[var(--color-warm-ivory)] border-2 border-[var(--color-burgundy)] text-center space-y-2 shadow-xs">
                <span className="text-[10px] font-bold text-[var(--color-burgundy)] uppercase">2. Semantic Cache</span>
                <p className="text-xs font-bold text-[var(--color-burgundy)]">Redis Cache</p>
                <span className="text-[10px] text-[var(--color-burgundy)]/70 block">Compare similarity with a threshold selected for your data</span>
              </div>

              <ArrowRight className="w-5 h-5 text-[var(--color-dusty-rose)] shrink-0 hidden md:block" />
              <ArrowDown className="w-5 h-5 text-[var(--color-dusty-rose)] shrink-0 md:hidden" />

              {/* Step 3 */}
              <div className="w-48 p-4 rounded-xl bg-[var(--color-warm-ivory)] border border-[var(--color-dusty-rose)] text-center space-y-2 shadow-xs">
                <span className="text-[10px] font-bold text-[var(--color-burgundy)] uppercase">3. Vector Search</span>
                <p className="text-xs font-bold text-[var(--color-burgundy)]">PostgreSQL pgvector</p>
                <span className="text-[10px] text-[var(--color-burgundy)]/70 block">Tune vector-index settings and combine with lexical search as needed</span>
              </div>

              <ArrowRight className="w-5 h-5 text-[var(--color-dusty-rose)] shrink-0 hidden md:block" />
              <ArrowDown className="w-5 h-5 text-[var(--color-dusty-rose)] shrink-0 md:hidden" />

              {/* Step 4 */}
              <div className="w-48 p-4 rounded-xl bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-center space-y-2 shadow-xs">
                <span className="text-[10px] font-bold text-[var(--color-burgundy)] uppercase">4. Generation</span>
                <p className="text-xs font-bold text-[var(--color-burgundy)]">Configured text model</p>
                <span className="text-[10px] text-[var(--color-burgundy)]/70 block">Generate grounded output and return source references</span>
              </div>
            </div>
          </div>

          {/* Trade-off Matrix */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-burgundy)] block">
              Architectural Trade-Off Analysis
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[var(--color-warm-ivory)]/40 border border-[var(--color-creme-latte)] space-y-1">
                <span className="font-bold text-[var(--color-burgundy)]">
                  HNSW Index vs Inverted File (IVF):
                </span>
                <p className="text-[var(--color-burgundy)]/80 leading-relaxed">
                  HNSW can trade additional memory for approximate nearest-neighbor lookup speed. Recall and latency depend on data, parameters, and hardware; measure them with a representative workload.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--color-warm-ivory)]/40 border border-[var(--color-creme-latte)] space-y-1">
                <span className="font-bold text-[var(--color-burgundy)]">
                  Semantic Cache Hit Ratio:
                </span>
                <p className="text-[var(--color-burgundy)]/80 leading-relaxed">
                  Caching may reduce repeated model calls. Measure the real hit rate, staleness risk, and cost impact from production traces before tuning it.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPattern === "stream" && (
        <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-6 sm:p-8 space-y-6 border border-[var(--color-creme-latte)] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-creme-latte)]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70">
                Event-Driven Kappa Topology
              </span>
              <h2 className="text-lg font-display-serif font-bold text-[var(--color-burgundy)]">
                Real-Time Streaming Feature Store (Kafka + Redis + gRPC)
              </h2>
            </div>
            <span className="text-xs font-mono-code px-2.5 py-1 rounded-full bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[var(--color-dusty-rose)]/40 font-bold">
              Throughput: 10,000 events/sec
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--color-warm-ivory)]/40 border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] space-y-4">
            <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
              Decoupled real-time sliding window aggregates (e.g. 5-minute transaction velocity) stored in Redis with point-in-time correctness for ML inference scoring.
            </p>
          </div>
        </div>
      )}

      {selectedPattern === "auth" && (
        <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-6 sm:p-8 space-y-6 border border-[var(--color-creme-latte)] shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-creme-latte)]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-burgundy)]/70">
                Multi-Tenant Security
              </span>
              <h2 className="text-lg font-display-serif font-bold text-[var(--color-burgundy)]">
                API Gateway, Token Bucket Rate Limiter & Supabase RLS
              </h2>
            </div>
            <span className="text-xs font-mono-code px-2.5 py-1 rounded-full bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[var(--color-dusty-rose)]/40 font-bold">
              Zero-Trust Architecture
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--color-warm-ivory)]/40 border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] space-y-4">
            <p className="text-xs text-[var(--color-burgundy)]/85 leading-relaxed">
              Next.js Edge middleware validates Supabase JWT claims, verifies rate limit token buckets in Redis, and injects secure tenant isolation headers before executing PostgreSQL queries.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
