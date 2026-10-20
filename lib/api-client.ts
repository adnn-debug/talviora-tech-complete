"use client";

import { supabase } from "@/lib/supabase";

export async function fetchWithAuth(input: RequestInfo | URL, init: RequestInit = {}) {
  const headers = new Headers(init.headers);

  // If Authorization header is not already set, attach the current active session access token
  if (!headers.has("Authorization")) {
    try {
      const { data, error } = await supabase.auth.getSession();
      const accessToken = data?.session?.access_token;
      if (!error && accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
    } catch (err) {
      console.warn("Session retrieval failed in fetchWithAuth:", err);
    }
  }

  return fetch(input, { ...init, headers });
}
