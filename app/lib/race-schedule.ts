const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

/** Format Supabase race_date (YYYY-MM-DD) to display format e.g. "26 OCT" */
export function formatRaceDate(raceDate: string): string {
  const [year, monthStr, dayStr] = raceDate.split("-");
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);
  return `${day.toString().padStart(2, "0")} ${MONTHS[month] ?? "???"}`;
}

export interface RaceScheduleRow {
  id: number;
  round: number;
  country: string;
  city: string;
  race_date: string;
  country_code: string;
  discipline: string | null;
  position: string | null;
}

export interface NextRaceInfo {
  city: string;
  discipline: string;
  date: string;
}

function todayDateString(): string {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth() + 1).padStart(2, "0");
  const d = String(t.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Fetch the next upcoming race (first with race_date >= today). Used by Header and calendar. */
export async function getNextRace(): Promise<NextRaceInfo | null> {
  try {
    const { supabase } = await import("./supabase");
    const today = todayDateString();
    const { data: rows } = await supabase
      .from("race_schedule")
      .select("city, discipline, race_date")
      .gte("race_date", today)
      .order("race_date", { ascending: true })
      .limit(1);
    const row = Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    if (!row || typeof row !== "object" || !("race_date" in row)) return null;
    const r = row as { city?: string; discipline?: string | null; race_date: string };
    return {
      city: r.city ?? "",
      discipline: r.discipline ?? "",
      date: formatRaceDate(r.race_date),
    };
  } catch {
    return null;
  }
}
