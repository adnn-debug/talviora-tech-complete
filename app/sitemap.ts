import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://talviora-ai-career-intelligence.vercel.app";
  const routes = [
    "",
    "/learning",
    "/catalogue",
    "/assessment",
    "/simulator",
    "/opportunities",
    "/projects",
    "/career-match",
    "/features",
    "/auth",
    "/roadmap",
    "/dsa-tracker",
    "/sprint-planner",
    "/bookmarks",
    "/profile",
    "/privacy",
    "/terms",
    "/accessibility",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route === "/learning" || route === "/catalogue" ? 0.9 : 0.8,
  }));
}
