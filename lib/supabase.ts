import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vxqpsuzmdjaqvvnqtfcv.supabase.com";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cXBzdXptZGphcXZ2bnF0ZmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyMzE5NTAsImV4cCI6MjEwNjgwNzk1MH0.l9giCwN6MeuPzPmuZ1cyFGPzEWYtZVizTGnzS6PLqFo";

let clientInstance: SupabaseClient | null = null;

try {
  if (supabaseUrl && supabaseAnonKey) {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (err) {
  console.warn("Supabase client initialization warning:", err);
}

export const supabase = clientInstance || (createClient(
  "https://vxqpsuzmdjaqvvnqtfcv.supabase.com",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4cXBzdXptZGphcXZ2bnF0ZmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyMzE5NTAsImV4cCI6MjEwNjgwNzk1MH0.l9giCwN6MeuPzPmuZ1cyFGPzEWYtZVizTGnzS6PLqFo"
));
