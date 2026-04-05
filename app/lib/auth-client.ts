"use client";

import { createClient } from "@supabase/supabase-js";

// Client-side Supabase client singleton
let browserClient: ReturnType<typeof createClient> | null = null;

export function getBrowserClient() {
  if (!browserClient) {
    browserClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    );
  }
  return browserClient;
}

// Auth operations
export async function signIn(email: string, password: string) {
  const supabase = getBrowserClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Store auth tokens in cookies for server-side access
  if (data.session) {
    document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=3600; secure; samesite=lax`;
    document.cookie = `sb-refresh-token=${data.session.refresh_token}; path=/; max-age=604800; secure; samesite=lax`;
  }

  return data;
}

export async function signOut() {
  const supabase = getBrowserClient();
  await supabase.auth.signOut();

  // Clear auth cookies
  document.cookie = "sb-access-token=; path=/; max-age=0";
  document.cookie = "sb-refresh-token=; path=/; max-age=0";
}

export async function getCurrentUser() {
  const supabase = getBrowserClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  return error ? null : user;
}

export async function getSession() {
  const supabase = getBrowserClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  return error ? null : session;
}