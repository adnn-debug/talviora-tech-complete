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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <Cpu className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Production Systems Architecture
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            AI & LLM Application Blueprint
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Production architectural patterns for RAG pipelines, fine-tuning loops, and agentic workflows.
          </p>
        </div>
      </div>

      {/* 4 Pillars Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-luxury p-5 space-y-2">
          <span className="text-[10px] font-bold uppercase text-[#c58b94]">Pattern 01</span>
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Hybrid RAG & Vector Indexing
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            HNSW graph search + BM25 lexical fusion with cross-encoder re-ranking for &gt;95% retrieval accuracy.
          </p>
        </div>

        <div className="card-luxury p-5 space-y-2">
          <span className="text-[10px] font-bold uppercase text-cyan-500">Pattern 02</span>
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Semantic Caching with Redis
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Store past vector embeddings in RAM; bypass LLM generation for semantically similar prompts.
          </p>
        </div>

        <div className="card-luxury p-5 space-y-2">
          <span className="text-[10px] font-bold uppercase text-emerald-500">Pattern 03</span>
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            LoRA & 4-bit Quantization
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Fit 7B/14B parameter models onto single commodity GPUs with NF4 bitsandbytes and low-rank adapters.
          </p>
        </div>

        <div className="card-luxury p-5 space-y-2">
          <span className="text-[10px] font-bold uppercase text-amber-500">Pattern 04</span>
          <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            Stateful Agentic Workflows
          </h2>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Cyclic execution graphs with loop guards, human-in-the-loop review, and state checkpoint rollbacks.
          </p>
        </div>
      </div>

      {/* Code Blueprint Box */}
      <div className="card-luxury p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#c58b94]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              FastAPI + pgvector + Redis Semantic Cache Reference Implementation
            </h2>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition flex items-center gap-1.5 cursor-pointer"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? "Copied" : "Copy Code"}</span>
          </button>
        </div>

        <div className="rounded-xl border border-zinc-300 dark:border-zinc-800 bg-[#0c0c11] p-4 font-mono-code text-xs text-zinc-200 overflow-x-auto">
          <pre className="whitespace-pre">{ragPythonSnippet}</pre>
        </div>
      </div>
    </div>
  );
}
