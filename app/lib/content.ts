import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

interface ContentItem {
  key: string;
  value: string;
  section: string | null;
}

// Get content by key
export async function getContent(key: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from("website_content")
      .select("value")
      .eq("key", key)
      .single();

    if (error || !data) return null;
    return data.value;
  } catch {
    return null;
  }
}

// Get content by key with fallback
export async function getContentWithFallback(key: string, fallback: string): Promise<string> {
  const value = await getContent(key);
  return value || fallback;
}

// Get all content for a section
export async function getContentBySection(section: string): Promise<Record<string, string>> {
  try {
    const { data, error } = await supabase
      .from("website_content")
      .select("key, value")
      .eq("section", section);

    if (error || !data) return {};

    return data.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);
  } catch {
    return {};
  }
}

// Get multiple content keys at once
export async function getContentMultiple(keys: string[]): Promise<Record<string, string>> {
  try {
    const { data, error } = await supabase
      .from("website_content")
      .select("key, value")
      .in("key", keys);

    if (error || !data) {
      return keys.reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {} as Record<string, string>);
    }

    const result: Record<string, string> = {};
    data.forEach((item) => {
      result[item.key] = item.value;
    });

    // Return empty string for missing keys
    keys.forEach((key) => {
      if (!(key in result)) {
        result[key] = "";
      }
    });

    return result;
  } catch {
    return keys.reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {} as Record<string, string>);
  }
}