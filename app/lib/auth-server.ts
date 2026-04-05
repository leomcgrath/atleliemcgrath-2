import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Server-side Supabase client
export function createServerClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );
}

// Create auth client with auth context (for protected routes)
export function createAuthClient() {
  const cookieStore = cookies();

  // Create client with auth headers from cookies
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  return supabase;
}

// Check if current user is authenticated via session from cookies
export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("sb-access-token")?.value;

    if (!accessToken) return false;

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return false;

    return !!user;
  } catch {
    return false;
  }
}

// Get current user from auth cookies
export async function getCurrentUser() {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("sb-access-token")?.value;

    if (!accessToken) return null;

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      }
    );

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return null;

    return user;
  } catch {
    return null;
  }
}

// Check if user is admin
export async function isAdmin(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (!user || !adminEmail) return false;

    return user.email === adminEmail;
  } catch {
    return false;
  }
}