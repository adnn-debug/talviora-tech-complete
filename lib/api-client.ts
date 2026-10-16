"use client";

import { supabase } from "@/lib/supabase";

const PROTECTED_ENDPOINTS = [
  "/api/profile",
  "/api/roadmaps",
];

export async function fetchWithAuth(input: RequestInfo | URL, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  const urlString = typeof input === "string" ? input : input instanceof URL ? input.pathname : (input as Request).url;

  let accessToken: string | undefined;
  try {
    const { data } = await supabase.auth.getSession();
    accessToken = data.session?.access_token;
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  } catch {
    // The endpoint will return an honest unauthenticated/configuration response.
  }

  // If there is no active session and this is a protected endpoint or explicit mutation,
  // return an honest client-side 401 Response to avoid emitting an unauthenticated network failure in DevTools.
  const isProtectedGet = PROTECTED_ENDPOINTS.some((ep) => urlString.includes(ep));
  const isProtectedMutation = (urlString.includes("/api/tasks") || urlString.includes("/api/bookmarks") || urlString.includes("/api/profile")) && 
                              (init.method === "POST" || init.method === "DELETE" || init.method === "PUT");

  if (!accessToken && (isProtectedGet || isProtectedMutation)) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Sign in to access your personal account.",
        code: "AUTH_REQUIRED",
        isGuest: true,
      }),
      {
        status: 401,
        statusText: "Unauthorized",
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  return fetch(input, { ...init, headers });
}
