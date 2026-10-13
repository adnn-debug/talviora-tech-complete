import { authenticateRoadmapRequest } from "@/lib/supabase-request";
import { authError, mapRoadmapError, roadmapError, roadmapJson, requestIdFrom, readJsonLimited, UUID_PATTERN } from "@/lib/roadmap-http";

export async function PATCH(req: Request, context: { params: Promise<{ roadmapId: string; stepId: string }> }) {
  const requestId = requestIdFrom(req);
  const auth = await authenticateRoadmapRequest(req);
  if (!auth.ok) return authError(auth, requestId);
  const { roadmapId, stepId } = await context.params;
  if (!UUID_PATTERN.test(roadmapId) || !UUID_PATTERN.test(stepId)) {
    return roadmapError(requestId, 404, "STEP_NOT_FOUND", "Roadmap step not found.");
  }

  const parsedBody = await readJsonLimited(req, 1024);
  if (!parsedBody.ok) return parsedBody.reason === "too_large"
    ? roadmapError(requestId, 413, "REQUEST_TOO_LARGE", "The progress request is too large.")
    : roadmapError(requestId, 400, "INVALID_JSON", "Send a valid JSON request body.");
  const body = parsedBody.value;
  if (!body || typeof body !== "object" || Array.isArray(body) || (body as Record<string, unknown>).action !== "start") {
    return roadmapError(requestId, 400, "INVALID_PROGRESS_ACTION", "Only the start action is available here. Steps require saved evidence to complete.");
  }

  const { data, error } = await auth.client.rpc("start_roadmap_step", {
    p_roadmap_id: roadmapId,
    p_step_id: stepId,
  });
  if (error) return mapRoadmapError(error, requestId);
  return roadmapJson({ progress: data, requestId }, requestId);
}
