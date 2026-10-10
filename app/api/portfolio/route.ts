import { NextResponse } from "next/server";
import { initialUserProfile, industryProjectsList } from "@/lib/career-data";

export async function GET() {
  return NextResponse.json({
    slug: initialUserProfile.portfolioSlug,
    publicUrl: `/portfolio`,
    candidate: {
      name: initialUserProfile.name,
      targetRole: initialUserProfile.targetRole,
      readinessScore: initialUserProfile.readinessScore,
      bio: initialUserProfile.bio,
      verifiedBadges: [
        "Certified RAG Systems Developer",
        "Deep Learning Foundations (PyTorch)",
        "PostgreSQL Performance Specialist",
        "FastAPI Microservice Architect",
      ],
      featuredProjects: industryProjectsList.slice(0, 2),
    },
  });
}
