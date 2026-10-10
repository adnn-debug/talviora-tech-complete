"use client";

import { useState } from "react";
import {
  BookOpen,
  Code2,
  Bug,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

export default function LearningStudioPage() {
  const [activeTab, setActiveTab] = useState<"lesson" | "debug" | "reorder">("lesson");

  // Debugging exercise state
  const [debugBugFound, setDebugBugFound] = useState(false);
  const [debugSolutionShown, setDebugSolutionShown] = useState(false);

  // Code rearrangement exercise state
  const [reorderedItems, setReorderedItems] = useState([
    { id: 1, text: "const response = await fetch('/api/v1/inference');" },
    { id: 2, text: "if (!response.ok) throw new Error('Gateway timeout');" },
    { id: 3, text: "try {" },
    { id: 4, text: "} catch (err) { logger.error('Service fallback triggered', err); }" },
    { id: 5, text: "const data = await response.json(); return data;" },
  ]);
  const [reorderVerified, setReorderVerified] = useState(false);

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const items = [...reorderedItems];
    const temp = items[idx - 1];
    items[idx - 1] = items[idx];
    items[idx] = temp;
    setReorderedItems(items);
    setReorderVerified(false);
  };

  const moveDown = (idx: number) => {
    if (idx === reorderedItems.length - 1) return;
    const items = [...reorderedItems];
    const temp = items[idx + 1];
    items[idx + 1] = items[idx];
    items[idx] = temp;
    setReorderedItems(items);
    setReorderVerified(false);
  };

  const checkReorder = () => {
    // Correct order: 3 (try), 1 (fetch), 2 (check ok), 5 (json), 4 (catch)
    const order = reorderedItems.map((i) => i.id).join(",");
    if (order === "3,1,2,5,4") {
      setReorderVerified(true);
    } else {
      alert("Not quite right yet. Make sure your 'try {' block encapsulates the fetch and JSON parsing, followed by the catch block!");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#B59A83]/30 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#6F1737]/10 dark:bg-[#C58F98]/20 text-[#6F1737] dark:text-[#F0C4CC]">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C58F98] dark:text-[#D8A3AB]">
              Interactive Learning Studio
            </span>
          </div>
          <h1 className="font-display-serif text-3xl sm:text-4xl text-[#6F1737] dark:text-[#FFF9F0]">
            Guided Lessons & Engineering Practice
          </h1>
          <p className="text-xs text-[#4A3A37] dark:text-zinc-400 mt-0.5">
            Discover core principles, solve coding challenges, and sharpen real-world debugging intuition.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab("lesson")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === "lesson"
                ? "btn-burgundy shadow-xs"
                : "border border-[#B59A83]/40 bg-white/60 dark:bg-[#2E1F21] text-[#241A1A] dark:text-zinc-300"
            }`}
          >
            Guided Lesson
          </button>
          <button
            onClick={() => setActiveTab("debug")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === "debug"
                ? "btn-burgundy shadow-xs"
                : "border border-[#B59A83]/40 bg-white/60 dark:bg-[#2E1F21] text-[#241A1A] dark:text-zinc-300"
            }`}
          >
            Debugging Lab
          </button>
          <button
            onClick={() => setActiveTab("reorder")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeTab === "reorder"
                ? "btn-burgundy shadow-xs"
                : "border border-[#B59A83]/40 bg-white/60 dark:bg-[#2E1F21] text-[#241A1A] dark:text-zinc-300"
            }`}
          >
            Code Arrangement
          </button>
        </div>
      </div>

      {/* Tab 1: Guided Lesson */}
      {activeTab === "lesson" && (
        <div className="card-coffee p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#B59A83]/20 dark:border-zinc-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C58F98]">
                Module 2.2 • Applied Deep Learning
              </span>
              <h2 className="font-display-serif text-2xl text-[#6F1737] dark:text-[#FFF9F0] mt-1">
                Transformer Multi-Head Attention: Mechanics & Autograd
              </h2>
            </div>
            <span className="text-xs font-mono-code px-2.5 py-1 rounded bg-[#F5EBDD] dark:bg-[#2E1F21] text-[#6F1737] dark:text-[#F0C4CC] font-bold">
              Est: 45 mins
            </span>
          </div>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-[#3B2527] dark:text-zinc-300 leading-relaxed space-y-4 font-sans-ui">
            <p>
              In autoregressive transformer models, the self-attention mechanism enables each sequence token to compute contextual weights against every other token in parallel. Unlike recurrent architectures, which enforce sequential bottlenecks of \(O(N)\) steps, multi-head attention operates in \(O(1)\) sequential operations with \(O(N^2 \cdot d)\) computational complexity.
            </p>

            <div className="p-4 rounded-2xl bg-[#FFF9F0] dark:bg-[#1F1515] border border-[#B59A83]/40 space-y-2">
              <span className="text-xs font-bold text-[#6F1737] dark:text-[#F0C4CC] uppercase tracking-wide block">
                Mathematical Definition of Scaled Dot-Product Attention:
              </span>
              <div className="font-mono-code text-xs text-[#6F1737] dark:text-[#D8A3AB] p-2 bg-[#F5EBDD] dark:bg-[#2E1F21] rounded-lg">
                Attention(Q, K, V) = softmax( (Q · K^T) / √d_k ) · V
              </div>
              <p className="text-xs text-[#4A3A37] dark:text-zinc-400">
                The scaling factor \(1/\sqrt{d_k}\) prevents large dot-product magnitudes in high-dimensional vector spaces, avoiding vanishing gradients in the softmax region.
              </p>
            </div>

            <h3 className="font-bold text-sm text-[#6F1737] dark:text-[#FFF9F0] pt-2">
              PyTorch Implementation Blueprint:
            </h3>

            <div className="rounded-xl bg-[#241A1A] p-4 text-xs font-mono-code text-[#F5EBDD] overflow-x-auto">
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
      {activeTab === "debug" && (
        <div className="card-coffee p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-[#B59A83]/20 dark:border-zinc-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8D514B]">
              Intentionally Broken Code Challenge
            </span>
            <h2 className="font-display-serif text-2xl text-[#6F1737] dark:text-[#FFF9F0] mt-1">
              Find the Hidden Memory Leak in this PyTorch Training Loop
            </h2>
            <p className="text-xs text-[#4A3A37] dark:text-zinc-400 mt-1">
              Study the code snippet below. An engineer reports their GPU memory runs out (OOM) after 20 batches despite small batch sizes.
            </p>
          </div>

          <div className="rounded-xl bg-[#241A1A] p-4 font-mono-code text-xs text-[#F5EBDD] overflow-x-auto">
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
              <p className="text-xs text-[#3B2527] dark:text-zinc-300">
                Why does Line 9 trigger a cumulative GPU Out-of-Memory error over time?
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => alert("Incorrect: criterion(outputs, targets) returns a scalar tensor, not a matrix.")}
                  className="w-full text-left p-3 rounded-xl border border-[#B59A83]/40 hover:bg-[#F5EBDD] dark:hover:bg-[#2E1F21] text-xs transition cursor-pointer"
                >
                  A) The loss calculation criterion produces a 3D tensor instead of a scalar.
                </button>
                <button
                  onClick={() => setDebugBugFound(true)}
                  className="w-full text-left p-3 rounded-xl border border-[#B59A83]/40 hover:bg-[#F5EBDD] dark:hover:bg-[#2E1F21] text-xs transition cursor-pointer"
                >
                  B) Adding `loss` directly retains the entire autograd computational graph in memory. We must use `loss.item()`.
                </button>
                <button
                  onClick={() => alert("Incorrect: optimizer.zero_grad() was already called at the top of the loop.")}
                  className="w-full text-left p-3 rounded-xl border border-[#B59A83]/40 hover:bg-[#F5EBDD] dark:hover:bg-[#2E1F21] text-xs transition cursor-pointer"
                >
                  C) The dataloader failed to shuffle batches between iterations.
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#96977A]/15 border border-[#96977A]/40 text-xs space-y-2 text-[#241A1A] dark:text-[#FFF9F0]">
              <div className="flex items-center gap-2 font-bold text-[#96977A]">
                <CheckCircle2 className="w-5 h-5" />
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
      {activeTab === "reorder" && (
        <div className="card-coffee p-6 sm:p-8 space-y-6">
          <div className="pb-4 border-b border-[#B59A83]/20 dark:border-zinc-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A77C91]">
              Code-Rearrangement Exercise
            </span>
            <h2 className="font-display-serif text-2xl text-[#6F1737] dark:text-[#FFF9F0] mt-1">
              Order the Asynchronous Error Handling Pipeline
            </h2>
            <p className="text-xs text-[#4A3A37] dark:text-zinc-400 mt-1">
              Use the arrow buttons to arrange these code blocks into a robust, production-grade Next.js API client handler with HTTP error validation.
            </p>
          </div>

          <div className="space-y-2">
            {reorderedItems.map((item, idx) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-white dark:bg-[#241A1A] border border-[#B59A83]/40 flex items-center justify-between text-xs font-mono-code text-[#241A1A] dark:text-[#FFF9F0]"
              >
                <span>{item.text}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="px-2 py-0.5 rounded bg-[#F5EBDD] dark:bg-[#3B2527] text-xs font-bold disabled:opacity-30 cursor-pointer"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === reorderedItems.length - 1}
                    className="px-2 py-0.5 rounded bg-[#F5EBDD] dark:bg-[#3B2527] text-xs font-bold disabled:opacity-30 cursor-pointer"
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            {reorderVerified ? (
              <span className="text-xs font-bold text-[#96977A] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Correct Sequence Verified!
              </span>
            ) : (
              <span className="text-xs text-[#4A3A37] dark:text-zinc-400">
                Arrange blocks, then verify logic.
              </span>
            )}

            <button
              onClick={checkReorder}
              className="px-5 py-2 rounded-xl btn-burgundy text-xs font-semibold cursor-pointer shadow-xs"
            >
              Verify Pipeline Logic
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
