import { authenticateRoadmapRequest } from "@/lib/supabase-request";
import { authError, mapRoadmapError, roadmapError, roadmapJson, requestIdFrom, readJsonLimited, UUID_PATTERN } from "@/lib/roadmap-http";

const MAX_BODY_BYTES = 8192;

export async function GET(req: Request, context: { params: Promise<{ roadmapId: string }> }) {
  const requestId = requestIdFrom(req);
  const auth = await authenticateRoadmapRequest(req);
  if (!auth.ok) return authError(auth, requestId);
  const { roadmapId } = await context.params;
  const stepId = new URL(req.url).searchParams.get("stepId") ?? "";
  if (!UUID_PATTERN.test(roadmapId) || !UUID_PATTERN.test(stepId)) {
    return roadmapError(requestId, 404, "ASSESSMENT_NOT_FOUND", "No published knowledge check is available for this step.");
  }

  const { data, error } = await auth.client.rpc("get_roadmap_assessment", {
    p_roadmap_id: roadmapId,
    p_step_id: stepId,
  });
  if (error) return mapRoadmapError(error, requestId);
  return roadmapJson({ assessment: data, requestId }, requestId);
}

export async function POST(req: Request, context: { params: Promise<{ roadmapId: string }> }) {
  const requestId = requestIdFrom(req);
  const auth = await authenticateRoadmapRequest(req);
  if (!auth.ok) return authError(auth, requestId);
  const { roadmapId } = await context.params;
  if (!UUID_PATTERN.test(roadmapId)) return roadmapError(requestId, 404, "ROADMAP_NOT_FOUND", "Roadmap not found.");
  const parsedBody = await readJsonLimited(req, MAX_BODY_BYTES);
  if (!parsedBody.ok) return parsedBody.reason === "too_large"
    ? roadmapError(requestId, 413, "REQUEST_TOO_LARGE", "The assessment submission is too large.")
    : roadmapError(requestId, 400, "INVALID_JSON", "Send a valid JSON request body.");
  const body = parsedBody.value;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return roadmapError(requestId, 400, "INVALID_ASSESSMENT_SUBMISSION", "The assessment submission is invalid.");
  }
  const input = body as Record<string, unknown>;
  const stepId = typeof input.stepId === "string" ? input.stepId : "";
  const answers = input.answers;
  const clientEventId = typeof input.clientEventId === "string" ? input.clientEventId : "";
  if (!UUID_PATTERN.test(stepId) || !UUID_PATTERN.test(clientEventId)) {
    return roadmapError(requestId, 400, "INVALID_ASSESSMENT_SUBMISSION", "The assessment submission is invalid.");
  }
  if (!answers || typeof answers !== "object" || Array.isArray(answers) || Object.keys(answers).length > 20) {
    return roadmapError(requestId, 400, "INVALID_ASSESSMENT_SUBMISSION", "Submit answers for the listed questions only.");
  }
  const answerMap = answers as Record<string, unknown>;
  if (Object.values(answerMap).some((answer) => typeof answer !== "string" || answer.length > 32)) {
    return roadmapError(requestId, 400, "INVALID_ASSESSMENT_SUBMISSION", "Each answer must be one listed option ID.");
  }

  const { data, error } = await auth.client.rpc("submit_roadmap_assessment", {
    p_roadmap_id: roadmapId,
    p_step_id: stepId,
    p_answers: answerMap,
    p_client_event_id: clientEventId,
  });
  if (error) return mapRoadmapError(error, requestId);
  return roadmapJson({ attempt: data, requestId }, requestId, 201);
}
