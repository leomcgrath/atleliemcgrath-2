import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "../../../lib/auth-server";

// GET - Fetch all content
export async function GET() {
  try {
    const supabase = createServerClient();

    const { data: content, error } = await supabase
      .from("website_content")
      .select("*")
      .order("key", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("Error fetching content:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch content" },
      { status: 500 }
    );
  }
}

// POST - Create or update content
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { key, value, section } = body;

    if (!key || value === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Try to update first, insert if doesn't exist
    const { data: existing } = await supabase
      .from("website_content")
      .select("id")
      .eq("key", key)
      .single();

    let result;

    if (existing) {
      const { data, error } = await supabase
        .from("website_content")
        .update({ value, section: section || null })
        .eq("key", key)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabase
        .from("website_content")
        .insert({ key, value, section: section || null })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({ success: true, content: result });
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save content" },
      { status: 500 }
    );
  }
}

// DELETE - Delete content
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { success: false, error: "Key is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("website_content")
      .delete()
      .eq("key", key);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting content:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete content" },
      { status: 500 }
    );
  }
}