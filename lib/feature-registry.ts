export interface PlatformFeature {
  number: number;
  name: string | null;
  scope: string | null;
  href: string;
  specificationAvailable: boolean;
}

const knownFeatures: Record<number, Omit<PlatformFeature, "number" | "specificationAvailable">> = {
  1: { name: "Goal-to-roadmap learning system", scope: "Learner enters a target technology or role; the platform explains fundamentals and builds a staged learning path.", href: "/roadmap" },
  2: { name: "Adaptive assessments and anti-cheating question variants", scope: "Theory and code-based tests; next/back navigation can present a different question variant where intended.", href: "/assessment" },
  3: { name: "Performance dashboard and AI mentor guidance", scope: "Tracks mastery and progress, then recommends next steps based on learner gaps.", href: "/analytics" },
  4: { name: "Project studio", scope: "Beginner-to-advanced projects with instructions, milestones, and evaluation criteria.", href: "/projects" },
  5: { name: "Career and technology market analysis", scope: "Demand and salary insights by country or region, with sources, dates, and honest data limitations.", href: "/market" },
  6: { name: "AI tools and prompting laboratory", scope: "Practical AI-tool and prompting practice, provider integration where configured, and planned multilingual support.", href: "/ai-blueprint" },
  7: { name: "Personalised schedule and roadmap planner", scope: "Builds a realistic schedule using available study time and existing commitments.", href: "/roadmap" },
  8: { name: "Focus and performance tracker", scope: "Tracks progress and focus, with supportive, non-punitive guidance.", href: "/analytics" },
  9: { name: "Career assessment, alignment, and resume builder", scope: "Career-fit guidance, job suggestions, and resume-building support.", href: "/career-match" },
  10: { name: "Interview preparation", scope: "Role-based interview practice and technical or coding questions.", href: "/simulator" },
  11: { name: "Daily tasks and accountability system", scope: "Daily goals, milestones, reminders, or recovery plans without harmful punishment mechanics.", href: "/sprint-planner" },
  19: { name: "Completely free platform and practical tool training", scope: "Core platform learning stays free; teach actual use of tools such as VS Code and Google Antigravity, and disclose third-party limits and costs.", href: "/terms" },
  20: { name: "AI news and emerging-project radar", scope: "News on AI models, tools, and demanded projects, with dates, sources, confirmed-versus-rumour labels, and hands-on missions.", href: "/opportunities" },
  21: { name: "Government tech jobs and side-hustle guidance", scope: "Official recruitment notices, eligibility, deadlines, source links, and practical side-hustle training.", href: "/opportunities" },
  22: { name: "Tech work and opportunity directory", scope: "Freelancing, internships, entry-level work, open-source, hackathons, and project opportunities with status and eligibility.", href: "/opportunities" },
  23: { name: "Free course and resource finder", scope: "Searchable learning resources with level, language, prerequisites, duration, source, and certificate-cost clarity.", href: "/opportunities" },
  24: { name: "Technology-trend-to-skill translator", scope: "Turns a technology trend or role demand into skills and learning actions.", href: "/skill-gap" },
  25: { name: "Portfolio and proof-of-work builder", scope: "Helps learners present projects and evidence of skills.", href: "/portfolio" },
  26: { name: "Debugging gym", scope: "Practice diagnosing and fixing intentionally broken code safely.", href: "/learning" },
  27: { name: "Career-path simulator", scope: "Compare role pathways, prerequisites, skills, and trade-offs.", href: "/career-match" },
  28: { name: "Team-project workflow simulator", scope: "Practice issues, branches, pull requests, reviews, and collaboration workflows.", href: "/projects" },
  29: { name: "Build-a-real-product lab", scope: "Guides requirements, architecture, database, APIs, frontend, testing, deployment, security, and maintenance.", href: "/architecture" },
  30: { name: "Resource and opportunity trust monitor", scope: "Checks freshness, broken links, expired opportunities, source provenance, and changed free-tier information.", href: "/opportunities" },
  31: { name: "Complete technology mastery catalogue", scope: "Searchable and filterable catalogue based on the existing technology, tool, and professional-skill areas, with pathways and practical learning.", href: "/catalogue" },
};

export const platformFeatures: PlatformFeature[] = Array.from({ length: 31 }, (_, index) => {
  const number = index + 1;
  const known = knownFeatures[number];

  if (known) return { number, ...known, specificationAvailable: true };

  return {
    number,
    name: null,
    scope: null,
    href: `/features/feature-${number}`,
    specificationAvailable: false,
  };
});

export const pendingFeatureNumbers = platformFeatures
  .filter((feature) => !feature.specificationAvailable)
  .map((feature) => feature.number);
