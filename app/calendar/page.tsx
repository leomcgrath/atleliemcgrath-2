import Header from "../components/Header";
import RaceCalendarPage, { type Race } from "../components/RaceCalendarPage";
import { supabase } from "../lib/supabase";
import {
  formatRaceDate,
  type RaceScheduleRow,
} from "../lib/race-schedule";

function todayDateString(): string {
  const t = new Date();
  const y = t.getFullYear();
  const m = String(t.getMonth() + 1).padStart(2, "0");
  const d = String(t.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default async function CalendarPage() {
  const { data: rows } = await supabase
    .from("race_schedule")
    .select("id, round, country, city, race_date, country_code, discipline, position")
    .order("race_date", { ascending: true });

  const today = todayDateString();
  const raw = (rows as RaceScheduleRow[] | null) ?? [];
  const nextRaceIndex = raw.findIndex((row) => row.race_date >= today);

  const races: Race[] = raw.map((row, index) => ({
    round: row.round,
    country: row.country,
    city: row.city,
    date: formatRaceDate(row.race_date),
    countryCode: (row.country_code ?? "").trim().toLowerCase(),
    discipline: row.discipline ?? "",
    isNextRace: nextRaceIndex >= 0 && index === nextRaceIndex,
    position: row.position?.trim() || undefined,
  }));

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <Header />
      <RaceCalendarPage races={races} />
    </div>
  );
}

