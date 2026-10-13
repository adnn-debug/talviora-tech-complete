import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createRequestScopedSupabase, isSupabaseConfigured } from "@/lib/supabase";

export type RoadmapAuthContext =
  | { ok: true; client: SupabaseClient; user: User }
  | { ok: false; status: 401 | 503; code: "AUTH_REQUIRED" | "SUPABASE_NOT_CONFIGURED"; message: string };

export async function authenticateRoadmapRequest(req: Request): Promise<RoadmapAuthContext> {
  if (!isSupabaseConfigured) {
    return {
      ok: false,
      status: 503,
      code: "SUPABASE_NOT_CONFIGURED",
      message: "Roadmap storage is unavailable until Supabase is configured.",
    };
  }

  const authorization = req.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(authorization);
  const accessToken = match?.[1]?.trim();
  if (!accessToken || accessToken.length > 8192) {
    return {
      ok: false,
      status: 401,
      code: "AUTH_REQUIRED",
      message: "Sign in to create or view a personal roadmap.",
    };
  }

  const client = createRequestScopedSupabase(accessToken);
  if (!client) {
    return {
      ok: false,
      status: 503,
      code: "SUPABASE_NOT_CONFIGURED",
      message: "Roadmap storage is unavailable until Supabase is configured.",
    };
  }

  const { data, error } = await client.auth.getUser(accessToken);
  if (error || !data.user) {
    return {
      ok: false,
      status: 401,
      code: "AUTH_REQUIRED",
      message: "Your sign-in could not be verified. Sign in again and retry.",
    };
  }

  return { ok: true, client, user: data.user };
}
