"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Compass } from "lucide-react";
import { careerRolesList } from "@/lib/career-data";
import { fetchWithAuth } from "@/lib/api-client";
import { supabase } from "@/lib/supabase";

const categories = ["All", "AI & ML", "Software Engineering", "Data & Quant", "Systems & Security"];

export default function CareerMatchPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTargetRole, setActiveTargetRole] = useState("");
  const [message, setMessage] = useState("");
  const filteredRoles = careerRolesList.filter((role) => selectedCategory === "All" || role.category === selectedCategory);

  const handleSetTarget = async (roleTitle: string) => {
    setActiveTargetRole(roleTitle);
    setMessage("Selected for this visit. Sign in to save it to your cloud profile.");
    try {
      const { data: authData } = await supabase.auth.getSession();
      if (!authData?.session) {
        // Guest mode: Selected in-memory for this session without firing an unauthenticated network request
        return;
      }
      const response = await fetchWithAuth("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetRole: roleTitle }),
      });
      const data = await response.json();
      setMessage(response.ok && data.persisted ? `Saved target role: ${roleTitle}.` : `${data?.error || "This selection was not saved."} The role remains selected for this visit.`);
    } catch {
      setMessage("This selection is only for this visit and could not be saved.");
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 border-b border-[var(--border-panel)] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-[var(--color-burgundy)]"><Compass className="h-5 w-5" aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-widest">Explore Careers That Match Your Interests</span></div>
          <h1 className="mt-3 font-display-serif text-3xl font-bold text-[var(--heading-primary)] sm:text-4xl">Explore Careers That Match Your Interests</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">Discover real-world technology career paths, typical responsibilities, and the essential skills needed for each role.</p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Filter role examples">
          {categories.map((category) => (
            <button key={category} type="button" aria-pressed={selectedCategory === category} onClick={() => setSelectedCategory(category)} className={selectedCategory === category ? "btn-burgundy rounded-xl px-3 py-2 text-xs font-semibold" : "btn-secondary-coffee rounded-xl px-3 py-2 text-xs font-semibold"}>{category}</button>
          ))}
        </div>
      </header>

      {message && <p role="status" className="rounded-xl border border-[var(--border-warm)] bg-[var(--surface-rose)] p-3 text-sm text-[var(--text-primary)]">{message}</p>}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredRoles.map((role) => {
          const selected = activeTargetRole === role.title;
          return (
            <article key={role.id} className={`flex flex-col rounded-2xl border bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)] ${selected ? "border-[var(--border-accent)] ring-1 ring-[var(--border-accent)]" : "border-[var(--border-panel)]"}`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-cocoa-sand)]">Example · {role.category}</div>
              <h2 className="mt-2 font-display-serif text-xl font-bold text-[var(--heading-secondary)]">{role.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{role.description}</p>
              <div className="mt-4">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Example skill tags</h3>
                <ul className="mt-2 flex flex-wrap gap-1.5">{role.keySkills.map((skill) => <li key={skill} className="rounded-full border border-[var(--border-panel)] bg-[var(--surface-rose)] px-2.5 py-1 text-[10px] font-medium text-[var(--color-burgundy)]">{skill}</li>)}</ul>
              </div>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--border-panel)] pt-4 mt-5">
                <button type="button" onClick={() => void handleSetTarget(role.title)} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-panel)] px-3 py-2 text-xs font-semibold text-[var(--color-burgundy)] hover:bg-[var(--surface-rose)]">{selected && <Check className="h-3.5 w-3.5" aria-hidden="true" />}{selected ? "Selected" : "Set target role"}</button>
                <Link href="/skill-gap" className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-burgundy)] hover:underline">Skill practice <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
              </div>
            </article>
          );
        })}
      </div>

      <Link href="/assessment" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-burgundy)] hover:underline">Take an assessment for personalized feedback <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
    </div>
  );
}
