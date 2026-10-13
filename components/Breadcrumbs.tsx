"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface RouteMeta {
  group: string;
  groupHref: string;
  title: string;
}

const ROUTE_DIRECTORY: Record<string, RouteMeta> = {
  // Home
  "/welcome": { group: "Home", groupHref: "/welcome", title: "Public Overview" },
  "/features": { group: "Home", groupHref: "/features", title: "Platform Features" },

  // Explore
  "/catalogue": { group: "Explore", groupHref: "/catalogue", title: "Explore All Tech Fields" },
  "/market": { group: "Explore", groupHref: "/market", title: "Tech Job Trends" },
  "/opportunities": { group: "Explore", groupHref: "/opportunities", title: "News & Opportunities" },

  // My Learning
  "/roadmap": { group: "My Learning", groupHref: "/roadmap", title: "Your Step-by-Step Plan" },
  "/analytics": { group: "My Learning", groupHref: "/analytics", title: "Your Learning Progress" },
  "/sprint-planner": { group: "My Learning", groupHref: "/sprint-planner", title: "Sprint Tasks" },
  "/bookmarks": { group: "My Learning", groupHref: "/bookmarks", title: "Saved Pathways & Bookmarks" },
  "/profile": { group: "My Learning", groupHref: "/profile", title: "Learner Profile" },

  // Learn & Practise
  "/learning": { group: "Learn & Practise", groupHref: "/learning", title: "Learning Studio & Sandbox" },
  "/simulator": { group: "Learn & Practise", groupHref: "/simulator", title: "Interactive Practice & Lab" },
  "/assessment": { group: "Learn & Practise", groupHref: "/assessment", title: "Check What You Know" },
  "/results": { group: "Learn & Practise", groupHref: "/results", title: "Assessment Results" },
  "/dsa-tracker": { group: "Learn & Practise", groupHref: "/dsa-tracker", title: "Problem-Solving Patterns" },

  // Build Projects
  "/projects": { group: "Build Projects", groupHref: "/projects", title: "Build Real Projects" },
  "/architecture": { group: "Build Projects", groupHref: "/architecture", title: "System Architecture" },
  "/portfolio": { group: "Build Projects", groupHref: "/portfolio", title: "Public Portfolio" },

  // AI Learning Guide
  "/mentor": { group: "AI Learning Guide", groupHref: "/mentor", title: "Your AI Learning Guide" },
  "/ai-blueprint": { group: "AI Learning Guide", groupHref: "/ai-blueprint", title: "AI & Prompt Blueprint" },

  // Careers & Opportunities
  "/career-match": { group: "Careers & Opportunities", groupHref: "/career-match", title: "Explore Matching Careers" },
  "/skill-gap": { group: "Careers & Opportunities", groupHref: "/skill-gap", title: "Find What You Need to Learn" },
  "/resume": { group: "Careers & Opportunities", groupHref: "/resume", title: "Improve Your Resume" },
  "/readiness": { group: "Careers & Opportunities", groupHref: "/readiness", title: "Readiness Diagnostic" },
  "/auth": { group: "Careers & Opportunities", groupHref: "/auth", title: "Sign In / Learner Account" },

  // Legal & Privacy
  "/privacy": { group: "Trust & Transparency", groupHref: "/privacy", title: "Privacy Policy" },
  "/terms": { group: "Trust & Transparency", groupHref: "/terms", title: "Terms of Service" },
  "/accessibility": { group: "Accessibility", groupHref: "/accessibility", title: "Accessibility Notes" },
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/welcome") {
    return null;
  }

  const matched = ROUTE_DIRECTORY[pathname];

  const formatSegment = (seg: string) => {
    return seg
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumbs"
      className="flex items-center gap-1.5 text-xs text-[var(--color-burgundy)] mb-4 flex-wrap"
    >
      <ol className="flex items-center gap-1.5 flex-wrap list-none m-0 p-0">
        <li className="flex items-center gap-1">
          <Link
            href="/"
            className="flex items-center gap-1 text-[var(--color-burgundy)]/80 hover:text-[var(--color-burgundy)] font-medium transition"
          >
            <Home className="w-3.5 h-3.5 text-[var(--color-burgundy)]" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>

        {matched ? (
          <>
            <li className="flex items-center gap-1.5" aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-[var(--color-dusty-rose)] shrink-0" />
            </li>
            <li className="flex items-center gap-1.5">
              <Link
                href={matched.groupHref}
                className="text-[var(--color-burgundy)]/80 hover:text-[var(--color-burgundy)] font-semibold transition"
              >
                {matched.group}
              </Link>
            </li>
            <li className="flex items-center gap-1.5" aria-hidden="true">
              <ChevronRight className="w-3.5 h-3.5 text-[var(--color-dusty-rose)] shrink-0" />
            </li>
            <li className="flex items-center gap-1.5 font-bold text-[var(--color-burgundy)]" aria-current="page">
              <span>{matched.title}</span>
            </li>
          </>
        ) : (
          pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;
            const subMatched = ROUTE_DIRECTORY[href];

            return (
              <li key={href} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-[var(--color-dusty-rose)] shrink-0" aria-hidden="true" />
                {isLast ? (
                  <span className="font-bold text-[var(--color-burgundy)]" aria-current="page">
                    {subMatched?.title || formatSegment(segment)}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-[var(--color-flowering-chestnut)] transition text-[var(--color-burgundy)]/80 font-medium"
                  >
                    {subMatched?.title || formatSegment(segment)}
                  </Link>
                )}
              </li>
            );
          })
        )}
      </ol>
    </nav>
  );
}
