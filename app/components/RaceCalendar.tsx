"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { RaceDisplay } from "../lib/race-schedule";

interface RaceCalendarProps {
  races: RaceDisplay[];
}

export default function RaceCalendar({ races }: RaceCalendarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextRaceIndex = races.findIndex((r) => r.isNextRace);
  const targetIndex = nextRaceIndex >= 0 ? nextRaceIndex : 0;

  useEffect(() => {
    if (races.length === 0 || !scrollRef.current) return;
    const container = scrollRef.current;
    const scrollToNext = () => {
      const card = container.querySelector(`[data-race-index="${targetIndex}"]`) as HTMLElement | null;
      if (!card) return;
      const containerWidth = container.offsetWidth;
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      const scrollLeft = cardLeft - containerWidth / 2 + cardWidth / 2;
      container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
    };
    const id = requestAnimationFrame(() => scrollToNext());
    return () => cancelAnimationFrame(id);
  }, [races.length, targetIndex]);

  if (races.length === 0) {
    return (
      <section className="w-full bg-[#0a0e27] py-16 px-4 md:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4">
            Race calendar
          </h2>
          <p className="text-white/70 mb-6">
            No races to display at the moment. Check back soon or visit the full calendar.
          </p>
          <a
            href="/calendar"
            className="inline-block bg-[#FFD700] hover:bg-[#FFED4E] text-black font-black py-3 px-6 rounded-full border-2 border-black uppercase tracking-wider transition-all hover:scale-105"
          >
            View calendar
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#0a0e27] py-16 px-4 md:px-8 relative z-10">
      <div className="w-full overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide" ref={scrollRef} style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
        <div className="flex gap-4 md:gap-6 pb-4 min-w-max" style={{ paddingLeft: "max(1rem, calc(50vw - 180px))", paddingRight: "max(1rem, calc(50vw - 180px))" }}>
          {races.map((race, index) => (
            <div
              key={race.round}
              data-race-index={index}
              className="flex-shrink-0 w-[280px] md:w-[320px] h-[400px] md:h-[480px] rounded-2xl overflow-hidden relative shadow-2xl transition-transform hover:scale-[1.02]"
              style={{ scrollSnapAlign: "center", scrollSnapStop: "always" }}
            >
              <div
                className={`absolute inset-0 ${
                  race.isNextRace ? "bg-[#FFD700]" : "bg-[#0a0e27] border border-[#1a1f3a]"
                }`}
              >
                {!race.isNextRace && (
                  <div className="absolute inset-0 opacity-10">
                    <Image
                      src={`https://flagcdn.com/w1280/${race.countryCode}.png`}
                      alt=""
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                )}
              </div>

              {/* Position badge */}
              <div
                className={`absolute top-4 right-4 px-2 py-1 rounded-md text-xs md:text-sm font-black uppercase tracking-tighter z-10 ${
                  race.position === "P1"
                    ? "bg-[#FFD700] text-black"
                    : race.position === "P2"
                    ? "bg-[#C0C0C0] text-black"
                    : race.position === "P3"
                    ? "bg-[#CD7F32] text-black"
                    : race.isNextRace
                    ? "bg-black/10 text-black"
                    : "bg-white/10 text-white"
                }`}
              >
                {race.position ?? "—"}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3
                  className={`text-xl md:text-2xl font-black uppercase tracking-tighter mb-1 ${
                    race.isNextRace ? "text-black" : "text-white"
                  }`}
                >
                  {race.country}
                </h3>
                <h4
                  className={`text-lg md:text-xl font-black uppercase tracking-tighter mb-2 ${
                    race.isNextRace ? "text-black/90" : "text-white/90"
                  }`}
                >
                  {race.city}
                </h4>
                <p
                  className={`text-base md:text-lg font-bold uppercase tracking-wider mb-4 ${
                    race.isNextRace ? "text-black/80" : "text-white/80"
                  }`}
                >
                  {race.date}
                </p>

                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-10 md:w-16 md:h-12 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={`https://flagcdn.com/w1280/${race.countryCode}.png`}
                      alt={race.country}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p
                    className={`text-sm md:text-base font-bold uppercase tracking-wide ${
                      race.isNextRace ? "text-black/90" : "text-white/90"
                    }`}
                  >
                    {race.discipline || "—"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-white/60 text-sm mt-4">Scroll left and right to see all races</p>
    </section>
  );
}
