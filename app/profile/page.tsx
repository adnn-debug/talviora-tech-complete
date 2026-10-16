"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  LogIn,
  AlertCircle,
  Info,
  Loader2,
} from "lucide-react";
import { initialUserProfile, careerRolesList } from "@/lib/career-data";
import { UserProfile } from "@/lib/types";
import { fetchWithAuth } from "@/lib/api-client";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(initialUserProfile);
  const [authStatus, setAuthStatus] = useState<"loading" | "authenticated" | "guest" | "expired">("loading");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isEmptyProfile, setIsEmptyProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAccountAndProfile() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (!isMounted) return;

        if (error || !data?.session?.user) {
          // Logged-out / Guest state: Do NOT dispatch unauthenticated network request
          setAuthStatus("guest");
          return;
        }

        const session = data.session;
        setAuthStatus("authenticated");
        setUserEmail(session.user.email || null);

        // Fetch user's profile with verified access token
        const res = await fetchWithAuth("/api/profile", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!isMounted) return;

        if (res.status === 401) {
          setAuthStatus("expired");
          setSaveError("Your session has expired. Please sign in again to access and save your cloud profile.");
          return;
        }

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          setSaveError(errData?.error || "Could not load saved profile from the account service.");
          return;
        }

        const json = await res.json();
        if (json.profile) {
          setProfile(json.profile);
          setIsEmptyProfile(false);
        } else {
          // Empty profile in database (row not yet created for this user)
          setIsEmptyProfile(true);
          if (session.user.email) {
            setProfile((prev) => ({ ...prev, email: session.user.email || prev.email }));
          }
        }
      } catch (err) {
        if (isMounted) {
          console.warn("Profile load error:", err);
          setSaveError("Network connection error: Unable to reach the profile service.");
        }
      } finally {
        if (isMounted) {
          setAuthStatus((prev) => (prev === "loading" ? "guest" : prev));
        }
      }
    }

    loadAccountAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) return;
      if (event === "SIGNED_OUT") {
        setAuthStatus("guest");
        setUserEmail(null);
        setProfile(initialUserProfile);
        setIsEmptyProfile(false);
        setSaveError(null);
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        if (session?.user) {
          setAuthStatus("authenticated");
          setUserEmail(session.user.email || null);
          setSaveError(null);
        }
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(false);
    setSaveError(null);

    if (authStatus === "guest") {
      setSaveError("You are currently in Guest Mode. Please sign in to save your profile to the cloud.");
      return;
    }

    if (authStatus === "expired") {
      setSaveError("Your session has expired. Please sign in again to save changes.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetchWithAuth("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, weeklyHours: profile.weeklyHours > 0 ? profile.weeklyHours : undefined }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        setAuthStatus("expired");
        setSaveError("Your session has expired. Please sign in again to save changes.");
        return;
      }

      if (res.ok && data.success && data.persisted) {
        setSavedSuccess(true);
        setIsEmptyProfile(false);
        if (data.profile) setProfile(data.profile);
        setTimeout(() => setSavedSuccess(false), 3500);
      } else {
        setSaveError(data?.error || "Profile changes were not saved.");
      }
    } catch {
      setSaveError("Profile changes were not saved because the service could not be reached.");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-creme-latte)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-[var(--surface-rose)] text-[var(--color-burgundy)] border border-[var(--color-dusty-rose)]/30">
              <UserCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-burgundy)]/80">
              Account & Trajectory
            </span>
          </div>
          <h1 className="font-display-serif text-2xl sm:text-3xl font-bold text-[var(--color-burgundy)]">
            Candidate Profile & Settings
          </h1>
          <p className="text-xs text-[var(--color-burgundy)]/80 mt-0.5">
            Configure your target roles, weekly study capacity, and self-assessed competency baselines.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[var(--color-burgundy)] font-semibold">
          <ShieldCheck className="w-4 h-4 text-[var(--color-dusty-rose)]" />
          <span>
            {authStatus === "authenticated"
              ? userEmail ? `Signed in: ${userEmail}` : "Cloud profile connected"
              : authStatus === "loading"
              ? "Initializing session..."
              : "Guest Mode (Local session)"}
          </span>
        </div>
      </div>

      {authStatus === "loading" && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[var(--surface-rose)] border border-[var(--border-warm)] text-[var(--color-burgundy)] text-xs font-semibold shadow-2xs">
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-[var(--color-burgundy)]" />
          <span>Checking account authentication status...</span>
        </div>
      )}

      {authStatus === "guest" && (
        <div className="p-4 rounded-xl bg-[var(--surface-rose)] border border-[var(--border-warm)] text-[var(--text-primary)] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <Info className="w-4 h-4 text-[var(--color-burgundy)] shrink-0" />
            <div>
              <span className="font-bold text-[var(--color-burgundy)]">Guest Mode Active:</span>{" "}
              Settings can be adjusted locally for this session. Sign in to sync your candidate profile across devices.
            </div>
          </div>
          <Link
            href="/auth"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg btn-burgundy text-xs font-semibold whitespace-nowrap self-start sm:self-auto"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Create Account</span>
          </Link>
        </div>
      )}

      {authStatus === "expired" && (
        <div className="p-4 rounded-xl bg-[var(--surface-rose)] border border-[var(--color-burgundy)] text-[var(--color-burgundy)] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs" role="alert">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-[var(--color-burgundy)] shrink-0" />
            <div>
              <span className="font-bold">Session Expired:</span> Please sign in again to load or save your personal data.
            </div>
          </div>
          <Link
            href="/auth"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg btn-burgundy text-xs font-semibold whitespace-nowrap self-start sm:self-auto"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In Again</span>
          </Link>
        </div>
      )}

      {isEmptyProfile && authStatus === "authenticated" && (
        <div className="p-3.5 rounded-xl bg-[var(--surface-rose)] border border-[var(--border-warm)] text-[var(--color-burgundy)] text-xs font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--color-burgundy)] shrink-0" />
          <span>New account detected. Complete your target role and study capacity below, then click Save Profile to create your cloud record.</span>
        </div>
      )}

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-[var(--surface-rose)] border border-[var(--color-dusty-rose)]/40 text-[var(--color-burgundy)] text-xs font-semibold flex items-center gap-2 shadow-2xs">
          <Check className="w-4 h-4 shrink-0 text-[var(--color-burgundy)]" />
          <span>Profile saved to your account.</span>
        </div>
      )}

      {saveError && (
        <div className="rounded-xl border border-[var(--border-warm)] bg-[var(--surface-rose)] p-3.5 text-xs font-medium text-[var(--text-primary)]" role="alert">
          {saveError}
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-6 sm:p-8 space-y-6 border border-[var(--color-creme-latte)] shadow-xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-burgundy)] pb-2 border-b border-[var(--color-creme-latte)]">
            Identity & Target Role Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--color-burgundy)]">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] focus:border-[var(--color-burgundy)] focus:outline-hidden transition shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--color-burgundy)]">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] focus:border-[var(--color-burgundy)] focus:outline-hidden transition shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--color-burgundy)]">
                Target Role Track
              </label>
              <select
                value={profile.targetRole}
                onChange={(e) => setProfile({ ...profile, targetRole: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] focus:border-[var(--color-burgundy)] focus:outline-hidden transition shadow-xs"
              >
                <option value="">Choose a target role</option>
                {careerRolesList.map((r) => (
                  <option key={r.id} value={r.title}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--color-burgundy)]">
                Experience Tier
              </label>
              <select
                value={profile.experienceLevel}
                onChange={(e: any) => setProfile({ ...profile, experienceLevel: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] focus:border-[var(--color-burgundy)] focus:outline-hidden transition shadow-xs"
              >
                <option value="">Choose an experience tier</option>
                <option value="Entry">Entry (0-1 yrs)</option>
                <option value="Junior">Junior (1-3 yrs)</option>
                <option value="Mid-Level">Mid-Level (3-5 yrs)</option>
                <option value="Senior">Senior (5-8 yrs)</option>
                <option value="Lead">Lead / Architect (8+ yrs)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--color-burgundy)]">
                Dedicated Study Time (Hours / Week)
              </label>
              <input
                type="number"
                min={1}
                max={60}
                value={profile.weeklyHours || ""}
                onChange={(e) => setProfile({ ...profile, weeklyHours: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] focus:border-[var(--color-burgundy)] focus:outline-hidden transition shadow-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[var(--color-burgundy)]">
                Public Portfolio Slug
              </label>
              <input
                type="text"
                value={profile.portfolioSlug}
                onChange={(e) => setProfile({ ...profile, portfolioSlug: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs font-mono-code rounded-xl bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] focus:border-[var(--color-burgundy)] focus:outline-hidden transition shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[var(--color-burgundy)]">
              Professional Biography
            </label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full p-3 text-xs leading-relaxed rounded-xl bg-[var(--color-warm-ivory)] border border-[var(--color-creme-latte)] text-[var(--color-burgundy)] focus:border-[var(--color-burgundy)] focus:outline-hidden transition shadow-xs"
            />
          </div>
        </div>

        {/* Skill Sliders Box */}
        <div className="bg-[var(--color-warm-ivory)] rounded-2xl p-6 sm:p-8 space-y-6 border border-[var(--color-creme-latte)] shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--color-creme-latte)]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--color-burgundy)]">
              Self-Reported Skill Proficiencies
            </h2>
            <span className="text-xs text-[var(--color-burgundy)]/70 font-mono-code">0 - 100% Scale</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(profile.skills).map(([skill, val]) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[var(--color-burgundy)]">{skill}</span>
                  <span className="font-mono-code font-bold text-[var(--color-burgundy)]">
                    {val}%
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={val}
                  onChange={(e) => handleSkillChange(skill, Number(e.target.value))}
                  className="w-full accent-[var(--color-burgundy)] cursor-pointer"
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
            className="btn-burgundy px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : authStatus === "guest" ? "Save profile (Sign in required)" : "Save profile"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
