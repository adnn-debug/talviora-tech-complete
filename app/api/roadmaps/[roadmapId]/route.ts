import { authenticateRoadmapRequest } from "@/lib/supabase-request";
import { authError, mapRoadmapError, roadmapError, roadmapJson, requestIdFrom, UUID_PATTERN } from "@/lib/roadmap-http";
import { getOwnedRoadmap } from "@/lib/roadmap-service";

export async function GET(req: Request, context: { params: Promise<{ roadmapId: string }> }) {
  const requestId = requestIdFrom(req);
  const auth = await authenticateRoadmapRequest(req);
  if (!auth.ok) return authError(auth, requestId);
  const { roadmapId } = await context.params;
  if (!UUID_PATTERN.test(roadmapId)) return roadmapError(requestId, 404, "ROADMAP_NOT_FOUND", "Roadmap not found.");

  try {
    const result = await getOwnedRoadmap(auth.client, auth.user.id, roadmapId);
    if (!result) return roadmapError(requestId, 404, "ROADMAP_NOT_FOUND", "Roadmap not found.");
    return roadmapJson({ ...result, requestId }, requestId);
  } catch (error) {
    return mapRoadmapError(error as { code?: string; message?: string }, requestId);
  }
}
