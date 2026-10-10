"use client";

import { useState, useEffect } from "react";
import {
  UserCheck,
  Save,
  Check,
  ShieldCheck,
  Sliders,
  Sparkles,
  RefreshCw,
  Github,
  Linkedin,
} from "lucide-react";
import { initialUserProfile, careerRolesList } from "@/lib/career-data";
import { UserProfile } from "@/lib/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    // Attempt fetching saved profile
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) {
          setProfile(data);
        }
      })
      .catch((e) => console.warn(e));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSkillChange = (skill: string, val: number) => {
    setProfile((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skill]: val,
      },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-[#c58b94]/15 text-[#843e4b] dark:text-[#d8a0ab]">
              <UserCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c58b94] dark:text-[#d8a0ab]">
              Account & Trajectory
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Candidate Profile & Settings
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Configure your target roles, weekly study capacity, and self-assessed competency baselines.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Supabase Synced</span>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>Profile configuration saved and synchronized with database!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="card-luxury p-6 sm:p-8 space-y-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-100 dark:border-zinc-800">
            Identity & Target Role Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#c58b94]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#c58b94]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Target Role Track
              </label>
              <select
                value={profile.targetRole}
                onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#c58b94]"
              >
                {careerRolesList.map((r) => (
                  <option key={r.id} value={r.title}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Experience Tier
              </label>
              <select
                value={profile.experienceLevel}
                onChange={(e: any) => setProfile({ ...profile, experienceLevel: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#c58b94]"
              >
                <option value="Entry">Entry (0-1 yrs)</option>
                <option value="Junior">Junior (1-3 yrs)</option>
                <option value="Mid-Level">Mid-Level (3-5 yrs)</option>
                <option value="Senior">Senior (5-8 yrs)</option>
                <option value="Lead">Lead / Architect (8+ yrs)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Dedicated Study Time (Hours / Week)
              </label>
              <input
                type="number"
                min={2}
                max={60}
                value={profile.weeklyHours}
                onChange={(e) => setProfile({ ...profile, weeklyHours: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#c58b94]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                Public Portfolio Slug
              </label>
              <input
                type="text"
                value={profile.portfolioSlug}
                onChange={(e) => setProfile({ ...profile, portfolioSlug: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-mono-code text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#c58b94]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Professional Biography
            </label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-[#c58b94] leading-relaxed"
            />
          </div>
        </div>

        {/* Skill Sliders Box */}
        <div className="card-luxury p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Self-Reported Skill Proficiencies
            </h2>
            <span className="text-xs text-zinc-400 font-mono-code">0 - 100% Scale</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(profile.skills).map(([skill, val]) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">{skill}</span>
                  <span className="font-mono-code font-bold text-[#843e4b] dark:text-[#d8a0ab]">
                    {val}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={val}
                  onChange={(e) => handleSkillChange(skill, Number(e.target.value))}
                  className="w-full accent-[#c58b94] cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-xs font-semibold tracking-wide transition flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save Profile & Sync Database"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
