import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "../../../lib/auth-server";

// GET - Fetch all races
export async function GET() {
  try {
    const supabase = createServerClient();

    const { data: races, error } = await supabase
      .from("race_schedule")
      .select("*")
      .order("race_date", { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, races });
  } catch (error) {
    console.error("Error fetching races:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch races" },
      { status: 500 }
    );
  }
}

// POST - Create a new race
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { round, country, city, race_date, country_code, discipline, position } = body;

    if (!round || !country || !city || !race_date || !country_code) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: race, error } = await supabase
      .from("race_schedule")
      .insert({
        round,
        country,
        city,
        race_date,
        country_code,
        discipline: discipline || null,
        position: position || null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, race });
  } catch (error) {
    console.error("Error creating race:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create race" },
      { status: 500 }
    );
  }
}

// PUT - Update a race
export async function PUT(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const body = await request.json();

    const { id, round, country, city, race_date, country_code, discipline, position } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Race ID is required" },
        { status: 400 }
      );
    }

    const { data: race, error } = await supabase
      .from("race_schedule")
      .update({
        round,
        country,
        city,
        race_date,
        country_code,
        discipline: discipline || null,
        position: position || null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, race });
  } catch (error) {
    console.error("Error updating race:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update race" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a race
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createServerClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Race ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("race_schedule")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting race:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete race" },
      { status: 500 }
    );
  }
}