"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    try {
      const mode = localStorage.getItem("talviora-theme");
      const dark = mode ? mode === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", dark);
      setIsDark(dark);
    } catch (e) {}
  }, []);

  const toggleMode = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    setIsDark(next);
    try {
      localStorage.setItem("talviora-theme", next ? "dark" : "light");
    } catch (e) {}
  };

  return (
    <button
      onClick={toggleMode}
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="p-2 rounded-xl border border-[rgba(var(--color-burgundy-rgb),0.2)] bg-[var(--surface-rose)] hover:bg-[var(--color-creme-latte)] text-[var(--color-burgundy)] transition-all shadow-xs flex items-center justify-center cursor-pointer"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[var(--color-burgundy)]" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--color-burgundy)]" />
      )}
    </button>
  );
}
