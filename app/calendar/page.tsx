import Header from "../components/Header";
import RaceCalendarPage from "../components/RaceCalendarPage";
import { getRaces } from "../lib/race-schedule";

export default async function CalendarPage() {
  const races = await getRaces();

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <Header />
      <RaceCalendarPage races={races} />
    </div>
  );
}

