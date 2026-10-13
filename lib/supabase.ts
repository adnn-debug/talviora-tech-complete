import { createClient, SupabaseClient } from "@supabase/supabase-js";

const configuredUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const configuredAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

const hasPlaceholderConfiguration = Boolean(
  configuredUrl?.includes("your-project-id") ||
    configuredAnonKey?.includes("your_supabase_anon_key_here") ||
    configuredUrl?.includes("placeholder-project") ||
    configuredAnonKey?.includes("placeholder")
);
export const isSupabaseConfigured = Boolean(configuredUrl && configuredAnonKey && !hasPlaceholderConfiguration);
const supabaseUrl = configuredUrl || "https://placeholder-project.supabase.co";
const supabaseAnonKey = configuredAnonKey || "placeholder-anon-key";

let clientInstance: SupabaseClient;

try {
  clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: typeof window !== "undefined",
      autoRefreshToken: typeof window !== "undefined",
    },
  });
} catch (err) {
  console.warn("Supabase client initialization warning:", err);
  clientInstance = createClient("https://placeholder-project.supabase.co", "placeholder-key");
}

export const supabase = clientInstance;

/** Create an API client bound to the authenticated request so database RLS sees auth.uid(). */
export function createRequestScopedSupabase(accessToken: string): SupabaseClient | null {
  if (!isSupabaseConfigured || !configuredUrl || !configuredAnonKey || !accessToken) return null;
  return createClient(configuredUrl, configuredAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  });
}

