import { authenticateRoadmapRequest } from "@/lib/supabase-request";
import { authError, mapRoadmapError, roadmapError, roadmapJson, requestIdFrom, readJsonLimited, UUID_PATTERN } from "@/lib/roadmap-http";
import { adaptRoadmapAfterAssessment } from "@/lib/roadmap-adaptation";

export async function POST(req: Request, context: { params: Promise<{ roadmapId: string }> }) {
  const requestId = requestIdFrom(req);
  const auth = await authenticateRoadmapRequest(req);
  if (!auth.ok) return authError(auth, requestId);
  const { roadmapId } = await context.params;
  if (!UUID_PATTERN.test(roadmapId)) return roadmapError(requestId, 404, "ROADMAP_NOT_FOUND", "Roadmap not found.");

  const parsedBody = await readJsonLimited(req, 1024);
  if (!parsedBody.ok) return parsedBody.reason === "too_large"
    ? roadmapError(requestId, 413, "REQUEST_TOO_LARGE", "The adaptation request is too large.")
    : roadmapError(requestId, 400, "INVALID_JSON", "Send a valid JSON request body.");
  const body = parsedBody.value;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return roadmapError(requestId, 400, "INVALID_ADAPTATION_REQUEST", "Submit the ID of a saved assessment attempt.");
  }
  const attemptId = (body as Record<string, unknown>).assessmentAttemptId;
  if (typeof attemptId !== "string" || !UUID_PATTERN.test(attemptId)) {
    return roadmapError(requestId, 400, "INVALID_ADAPTATION_REQUEST", "Submit the ID of a saved assessment attempt.");
  }

  try {
    const result = await adaptRoadmapAfterAssessment(auth.client, auth.user.id, roadmapId, attemptId);
    return roadmapJson({ ...result.body, requestId }, requestId, result.status);
  } catch (error) {
    return mapRoadmapError(error as { code?: string; message?: string }, requestId);
  }
}
