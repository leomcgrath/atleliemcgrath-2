"use client";

import Image from "next/image";

export interface Race {
  round: number;
  country: string;
  city: string;
  date: string;
  countryCode: string;
  discipline: string;
  isNextRace?: boolean;
  position?: string;
}

interface RaceCalendarPageProps {
  races: Race[];
}

export default function RaceCalendarPage({ races }: RaceCalendarPageProps) {
  const nextRace = races.find((r) => r.isNextRace) || races[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] md:min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/atle-calendar.png"
            alt="Race Calendar Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-[85px]">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tighter mb-4 md:mb-6 leading-none pt-50">
              2025/2026 SEASON
            </h1>
            <div className="mb-4">
              <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#FFD700] uppercase tracking-wider mb-1 md:mb-2">
                NEXT RACE:
              </p>
              <p className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#FFD700] uppercase tracking-tighter leading-tight pb-40">
                {nextRace?.city ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Race Cards Grid */}
      <section className="w-full py-12 md:py-16 px-4 md:px-8 lg:px-12 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {races.map((race) => (
              <div
                key={race.round}
                className={`rounded-lg overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-3xl relative ${
                  race.isNextRace
                    ? "bg-[#FFD700] text-black border-2 border-black"
                    : "bg-[#0a0e27] border border-[#1a1f3a] text-white"
                }`}
              >
                {/* Position / Placement Badge */}
                <div
                  className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs md:text-sm font-black uppercase tracking-tighter ${
                    race.position === "P1"
                      ? "bg-[#FFD700] text-black"
                      : race.position === "P2"
                      ? "bg-[#C0C0C0] text-black"
                      : race.position === "P3"
                      ? "bg-[#CD7F32] text-black"
                      : race.isNextRace
                      ? "bg-transparent text-[#FFD700]"
                      : "bg-transparent text-white"
                  }`}
                >
                  {race.position ?? "—"}
                </div>
                <div className="p-4 md:p-5">
                  {/* Country and City */}
                  <h3
                    className={`text-lg md:text-xl font-black uppercase tracking-tighter mb-1 ${
                      race.isNextRace ? "text-black" : "text-white"
                    }`}
                  >
                    {race.country}
                  </h3>
                  <h4
                    className={`text-sm md:text-base font-bold uppercase tracking-tight mb-1 ${
                      race.isNextRace ? "text-black/90" : "text-white/90"
                    }`}
                  >
                    {race.city}
                  </h4>
                  <p
                    className={`text-xs md:text-sm font-bold uppercase tracking-wider mb-3 md:mb-4 ${
                      race.isNextRace ? "text-black/80" : "text-white/80"
                    }`}
                  >
                    {race.date}
                  </p>

                  {/* Flag */}
                  <div className="w-full h-20 md:h-24 mb-3 md:mb-4 flex items-center justify-center">
                    <div className="relative w-16 h-12 md:w-20 md:h-14">
                      <Image
                        src={`https://flagcdn.com/w1280/${race.countryCode}.png`}
                        alt={race.country}
                        fill
                        className="object-cover rounded-sm"
                      />
                    </div>
                  </div>

                  {/* Discipline */}
                  <div
                    className={`text-xs md:text-sm font-bold uppercase tracking-wide ${
                      race.isNextRace ? "text-black/90" : "text-white/90"
                    }`}
                  >
                    {race.discipline || "—"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

