"use client";

import { useState } from "react";
import {
  Sparkles,
  Send,
  Bot,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function MentorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input;
    setInput("");
    setErrorMessage(null);
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setLoading(true);

    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, history: messages.slice(-40) }),
      });
      const data = await res.json();
      if (!res.ok || !data.success || !data.reply) {
        setErrorMessage(data?.error || "The AI mentor is unavailable. Try again after provider configuration is checked.");
      } else {
        const reply = data.suggestedNextStep
          ? `${data.reply}\n\nSuggested next step: ${data.suggestedNextStep}`
          : data.reply;
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      }
    } catch {
      setErrorMessage("The AI mentor service could not be reached. Your question was not answered.");
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "What are the top 3 architectural trade-offs in enterprise RAG?",
    "How should I structure a weekly study schedule?",
    "How do I explain model quantization during a technical screen?",
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(var(--color-burgundy-rgb),0.15)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)]">
              <Sparkles className="w-4 h-4 text-[var(--color-burgundy)]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]">
              Your AI Learning Guide
            </span>
          </div>
          <h1 className="font-display-serif text-3xl sm:text-4xl font-bold text-[var(--color-burgundy)]">
            Your AI Learning Guide & Career Mentor
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/85 mt-0.5 font-medium">
            Ask any question about programming concepts, learning steps, practical projects, or career preparation in simple language.
          </p>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="flex flex-wrap gap-2">
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => setInput(p)}
            className="text-xs px-3.5 py-1.5 rounded-full border border-[rgba(var(--color-burgundy-rgb),0.15)] bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)] transition cursor-pointer shadow-xs font-medium"
          >
            💡 {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="card-coffee p-6 min-h-[420px] flex flex-col justify-between space-y-6 border border-[rgba(var(--color-burgundy-rgb),0.14)] bg-[var(--color-warm-ivory)]">
        <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
          {messages.length === 0 && !loading && (
            <p className="mx-auto max-w-lg py-16 text-center text-sm leading-relaxed text-[var(--text-secondary)]">
              Ask a learning or career question to begin. Your mentor can follow the conversation across up to 20 recent exchanges. Add a Gemini API key on the server to enable replies.
            </p>
          )}
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4 text-[var(--color-warm-ivory)]" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] rounded-tr-xs font-medium"
                    : "bg-[var(--color-creme-latte)] border border-[rgba(var(--color-burgundy-rgb),0.12)] text-[var(--color-burgundy)] rounded-tl-xs font-medium"
                }`}
              >
                {m.content}
              </div>

              {m.role === "user" && (
                <div className="w-8 h-8 rounded-xl bg-[var(--color-dusty-rose)] text-[var(--color-burgundy)] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[rgba(var(--color-burgundy-rgb),0.2)]">
                  You
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[var(--color-burgundy)] text-[var(--color-warm-ivory)] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[var(--color-warm-ivory)]" />
              </div>
              <div className="p-3.5 rounded-2xl bg-[var(--surface-rose)] border border-[rgba(var(--color-dusty-rose-rgb),0.6)] text-xs text-[var(--color-burgundy)] flex items-center gap-2 font-medium">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[var(--color-burgundy)]" />
                <span>Waiting for AI mentor response…</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="pt-4 border-t border-[rgba(var(--color-burgundy-rgb),0.12)] flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your mentor anything about learning, code, projects, or your career..."
            className="input-coffee flex-1 px-4 py-2.5 text-xs sm:text-sm bg-[var(--color-warm-ivory)] text-[var(--color-burgundy)]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="btn-burgundy px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 text-[var(--color-warm-ivory)]" />
            <span>Send</span>
          </button>
        </form>
      </div>

      {errorMessage && (
        <p className="flex items-start gap-2 rounded-xl border border-[var(--border-warm)] bg-[var(--surface-rose)] p-3 text-xs leading-relaxed text-[var(--text-primary)]" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-flowering-chestnut)]" />
          {errorMessage}
        </p>
      )}
    </div>
  );
}
