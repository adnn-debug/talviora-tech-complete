"use client";

import { supabase } from "@/lib/supabase";

export async function fetchWithAuth(input: RequestInfo | URL, init: RequestInit = {}) {
  const headers = new Headers(init.headers);

  try {
    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;
    if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
  } catch {
    // The endpoint will return an honest unauthenticated/configuration response.
  }

  return fetch(input, { ...init, headers });
}
