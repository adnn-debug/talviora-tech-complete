"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LockKeyhole,
  Mail,
  KeyRound,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  User,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setIsError(false);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setMsg("Verification link sent! Please check your email.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setMsg("Authentication successful! Redirecting...");
        setTimeout(() => router.push("/"), 1200);
      }
    } catch (err: any) {
      console.warn("Auth warning:", err);
      // Even if network or Supabase is offline, provide friendly fallback
      setIsError(true);
      setMsg(err?.message || "Authentication service temporarily unreachable. You can continue in Guest Mode below.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("talviora-guest-session", "active");
    }
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto my-8 space-y-6 animate-in fade-in duration-300">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-zinc-900 dark:bg-rose-100/10 border border-zinc-700 dark:border-rose-300/30 flex items-center justify-center text-white dark:text-rose-200 font-cinzel font-bold text-lg mx-auto shadow-sm">
          TT
        </div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 font-cinzel tracking-wider">
          TALVIORA TECH
        </h1>
        <p className="text-xs text-zinc-500">
          Autonomous Career Intelligence & Learning Ecosystem
        </p>
      </div>

      {/* Auth Card */}
      <div className="card-luxury p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 text-xs">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsSignUp(false);
                setMsg("");
              }}
              className={`font-semibold pb-1 cursor-pointer transition ${
                !isSignUp
                  ? "text-[#843e4b] dark:text-[#d8a0ab] border-b-2 border-[#c58b94]"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                setMsg("");
              }}
              className={`font-semibold pb-1 cursor-pointer transition ${
                isSignUp
                  ? "text-[#843e4b] dark:text-[#d8a0ab] border-b-2 border-[#c58b94]"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              }`}
            >
              Create Account
            </button>
          </div>

          <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Supabase Auth</span>
          </span>
        </div>

        {msg && (
          <div
            className={`p-3 rounded-xl text-xs font-medium ${
              isError
                ? "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-900"
                : "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
            }`}
          >
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="developer@talviora.tech"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#c58b94]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#c58b94]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-semibold tracking-wide transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isSignUp ? (
              <span>Create Free Candidate Account</span>
            ) : (
              <span>Authenticate Session</span>
            )}
          </button>
        </form>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
          <span className="flex-shrink mx-3 text-[10px] text-zinc-400 uppercase font-semibold">
            or instant preview
          </span>
          <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
        </div>

        <button
          onClick={handleGuestMode}
          className="w-full py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <User className="w-4 h-4 text-[#c58b94]" />
          <span>Continue as Guest (Instant Access)</span>
        </button>
      </div>
    </div>
  );
}
