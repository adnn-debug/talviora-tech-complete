"use client";

import { useState } from "react";
import {
  Sparkles,
  Send,
  User,
  Bot,
  BrainCircuit,
  Loader2,
  Lightbulb,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Greetings, Feriha. I am your TALVIORA AI Career & Technology Mentor. Based on your current 72% readiness evaluation for AI Solutions Architect, I recommend focusing on PyTorch model quantization and distributed caching with Redis. What would you like to explore today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "AI Solutions Architect",
          question: "General Career & Engineering Mentorship",
          answer: userText,
        }),
      });
      const data = await res.json();

      let reply = `In your trajectory toward AI Solutions Architect, here is my direct counsel: ${
        data.verdict || "Continue prioritizing production deliverables."
      }`;
      if (data.strengths && data.strengths.length > 0) {
        reply += ` Key insight: ${data.strengths[0]}.`;
      }
      if (data.idealTalkingPoints && data.idealTalkingPoints.length > 0) {
        reply += ` Suggested architectural priority: ${data.idealTalkingPoints[0]}.`;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "To reach the 85+ readiness threshold for senior technical rounds, focus on demonstrating point-in-time correctness, backpressure resilience, and memory bandwidth considerations during autoregressive generation.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "What are the top 3 architectural trade-offs in enterprise RAG?",
    "How should I structure my weekly 12 hours for Phase 2?",
    "How do I explain model quantization during a technical screen?",
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#B59A83]/30 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#6F1737]/10 dark:bg-[#C58F98]/20 text-[#6F1737] dark:text-[#F0C4CC]">
              <Sparkles className="w-4 h-4 text-[#C58F98]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C58F98] dark:text-[#D8A3AB]">
              Autonomous Career Advisor
            </span>
          </div>
          <h1 className="font-display-serif text-3xl sm:text-4xl text-[#6F1737] dark:text-[#FFF9F0]">
            AI Engineering & Career Mentor
          </h1>
          <p className="text-xs text-[#4A3A37] dark:text-zinc-400 mt-0.5">
            Context-aware technical mentoring aligned with your assessment scores, skill gaps, and roadmap milestones.
          </p>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="flex flex-wrap gap-2">
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => setInput(p)}
            className="text-xs px-3 py-1.5 rounded-full border border-[#B59A83]/40 bg-white/60 dark:bg-[#2E1F21] text-[#241A1A] dark:text-zinc-300 hover:border-[#C58F98] transition cursor-pointer"
          >
            💡 {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="card-coffee p-6 min-h-[420px] flex flex-col justify-between space-y-6">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-[#6F1737] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#6F1737] text-white rounded-tr-xs"
                    : "bg-[#FFF9F0] dark:bg-[#241A1A] border border-[#B59A83]/30 text-[#241A1A] dark:text-[#FFF9F0] rounded-tl-xs"
                }`}
              >
                {m.content}
              </div>

              {m.role === "user" && (
                <div className="w-8 h-8 rounded-xl bg-[#C58F98] text-[#241A1A] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  FR
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#6F1737] text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-[#FFF9F0] dark:bg-[#241A1A] border border-[#B59A83]/30 text-xs text-[#7E6962] flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C58F98]" />
                <span>Mentor analyzing architecture context...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="pt-4 border-t border-[#B59A83]/20 dark:border-zinc-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your mentor about system design, code trade-offs, or career strategy..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-[#B59A83]/40 bg-white dark:bg-[#1F1515] text-xs sm:text-sm text-[#241A1A] dark:text-[#FFF9F0] focus:outline-none focus:ring-1 focus:ring-[#C58F98]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 py-2.5 rounded-xl btn-burgundy text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
