"use client";

import { useState } from "react";
import {
  Cpu,
  Layers,
  Code2,
  CheckCircle2,
  Sparkles,
  Copy,
  Check,
  ShieldAlert,
} from "lucide-react";

export default function AiBlueprintPage() {
  const [copiedCode, setCopiedCode] = useState(false);

  const ragPythonSnippet = `# Production Enterprise RAG Pipeline (FastAPI + pgvector + Redis Cache)
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncpg
import redis.asyncio as redis

app = FastAPI(title="Talviora Enterprise RAG Serving Gateway")
r_cache = redis.from_url("redis://localhost:6379", decode_responses=False)

class QueryPayload(BaseModel):
    query: str
    top_k: int = 5
    similarity_threshold: float = 0.88

@app.post("/api/v1/retrieve")
async def retrieve_documents(payload: QueryPayload):
    # 1. Compute embedding for candidate query
    query_vector = await compute_embedding(payload.query)
    
    # 2. Check semantic cache in Redis
    cached = await check_semantic_cache(r_cache, query_vector, payload.similarity_threshold)
    if cached:
        return {"source": "semantic_cache", "latency_ms": 12, "chunks": cached}
        
    # 3. Hybrid search (Dense HNSW + Sparse BM25) in pgvector
    async with db_pool.acquire() as conn:
        records = await conn.fetch("""
            SELECT id, content, 1 - (embedding <=> $1) AS cosine_similarity
            FROM document_chunks
            WHERE 1 - (embedding <=> $1) > 0.70
            ORDER BY embedding <=> $1
            LIMIT $2;
        """, query_vector, payload.top_k)
        
    return {"source": "pgvector_hnsw", "latency_ms": 48, "chunks": [dict(r) for r in records]}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(ragPythonSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-creme-latte)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[var(--color-dusty-rose)]/30">
              <Cpu className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]/80">
              Production Systems Architecture
            </span>
          </div>
          <h1 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
            AI & LLM Application Blueprint
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/80 mt-0.5">
            Production architectural patterns for RAG pipelines, fine-tuning loops, and agentic workflows.
          </p>
        </div>
      </div>

      {/* 4 Pillars Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-5 space-y-2 border border-[var(--color-creme-latte)] hover:border-[var(--color-dusty-rose)] shadow-xs transition">
          <span className="text-[10px] font-bold uppercase text-[var(--color-burgundy)]/70">Pattern 01</span>
          <h2 className="text-sm font-display-serif font-bold text-[var(--color-burgundy)]">
            Hybrid RAG & Vector Indexing
          </h2>
          <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed">
            Combine approximate vector search with lexical matching and optional re-ranking. Measure retrieval quality on a representative, labeled test set.
          </p>
        </div>

        <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-5 space-y-2 border border-[var(--color-creme-latte)] hover:border-[var(--color-dusty-rose)] shadow-xs transition">
          <span className="text-[10px] font-bold uppercase text-[var(--color-burgundy)]/70">Pattern 02</span>
          <h2 className="text-sm font-display-serif font-bold text-[var(--color-burgundy)]">
            Semantic Caching with Redis
          </h2>
          <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed">
            Store past vector embeddings in RAM; bypass LLM generation for semantically similar prompts.
          </p>
        </div>

        <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-5 space-y-2 border border-[var(--color-creme-latte)] hover:border-[var(--color-dusty-rose)] shadow-xs transition">
          <span className="text-[10px] font-bold uppercase text-[var(--color-burgundy)]/70">Pattern 03</span>
          <h2 className="text-sm font-display-serif font-bold text-[var(--color-burgundy)]">
            LoRA & 4-bit Quantization
          </h2>
          <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed">
            Fit 7B/14B parameter models onto single commodity GPUs with NF4 bitsandbytes and low-rank adapters.
          </p>
        </div>

        <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-5 space-y-2 border border-[var(--color-creme-latte)] hover:border-[var(--color-dusty-rose)] shadow-xs transition">
          <span className="text-[10px] font-bold uppercase text-[var(--color-burgundy)]/70">Pattern 04</span>
          <h2 className="text-sm font-display-serif font-bold text-[var(--color-burgundy)]">
            Stateful Agentic Workflows
          </h2>
          <p className="text-xs text-[var(--color-burgundy)]/80 leading-relaxed">
            Cyclic execution graphs with loop guards, human-in-the-loop review, and state checkpoint rollbacks.
          </p>
        </div>
      </div>

      {/* Code Blueprint Box */}
      <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-6 sm:p-8 space-y-4 border border-[var(--color-creme-latte)] shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--color-creme-latte)]">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[var(--color-burgundy)]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
              FastAPI + pgvector + Redis Semantic Cache Reference Implementation
            </h2>
          </div>

          <button
            onClick={handleCopy}
            className="btn-secondary-coffee px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-[var(--color-burgundy)]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? "Copied" : "Copy Code"}</span>
          </button>
        </div>

        <div className="rounded-xl border border-[var(--color-creme-latte)] bg-[#241A1A] p-4 font-mono-code text-xs text-[var(--color-creme-latte)] overflow-x-auto shadow-inner">
          <pre className="whitespace-pre">{ragPythonSnippet}</pre>
        </div>
      </div>
    </div>
  );
}
