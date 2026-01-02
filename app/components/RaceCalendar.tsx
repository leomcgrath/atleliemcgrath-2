"use client";

import Image from "next/image";

interface RaceCard {
  location: string;
  city: string;
  date: string;
  branch: string;
  backgroundType: "image" | "solid";
  backgroundColor?: string;
  imageUrl?: string;
}

const races: RaceCard[] = [
  {
    location: "AUSTRIA",
    city: "SCHLADMING",
    date: "10 NOVEMBER",
    branch: "SLALOM",
    backgroundType: "image",
    imageUrl: "/atle-cowboy.png", // Placeholder - you can replace with actual race images
  },
  {
    location: "AFGHANISTAN",
    city: "KABUL",
    date: "07 DECEMBER",
    branch: "GIANT SLALOM",
    backgroundType: "image",
    imageUrl: "/atle-standing.png", // Placeholder - you can replace with actual race images
  },
  {
    location: "ITALY",
    city: "MADONNA",
    date: "08 MARCH",
    branch: "SLALOM",
    backgroundType: "solid",
    backgroundColor: "#FFD700", // Yellow
  },
  {
    location: "CHINA",
    city: "SHANGHAI",
    date: "15 MARCH",
    branch: "SUPER-G",
    backgroundType: "solid",
    backgroundColor: "#0a0e27", // Dark blue
  },
  {
    location: "JAPAN",
    city: "SUZUKA",
    date: "29 MARCH",
    branch: "DOWNHILL",
    backgroundType: "solid",
    backgroundColor: "#0a0e27", // Dark blue
  },
];

export default function RaceCalendar() {
  return (
    <section className="w-full bg-[#0a0e27] py-16 px-4 md:px-8 relative z-10">
      <div className="w-full">
        <div className="flex gap-4 md:gap-6">
          {races.map((race, index) => (
            <div
              key={index}
              className="flex-1 h-[400px] md:h-[480px] rounded-2xl overflow-hidden relative shadow-2xl transition-transform hover:scale-105"
            >
              {/* Background */}
              {race.backgroundType === "image" && race.imageUrl ? (
                <div className="absolute inset-0">
                  <Image
                    src={race.imageUrl}
                    alt={race.location}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: race.backgroundColor || "#0a0e27" }}
                >
                  {/* Track outline placeholder - you can add SVG track layouts here */}
                  <div className="absolute top-8 left-8 right-8 h-32 opacity-30">
                    <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="none">
                      <path
                        d="M10,50 Q30,20 60,30 T120,40 Q150,50 180,50 L190,50"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        className={race.backgroundColor === "#FFD700" ? "text-black" : "text-white"}
                      />
                      <path
                        d="M10,50 Q30,80 60,70 T120,60 Q150,50 180,50"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        className={race.backgroundColor === "#FFD700" ? "text-black" : "text-white"}
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3
                  className={`text-2xl md:text-3xl font-black uppercase tracking-tighter mb-1 ${
                    race.backgroundColor === "#FFD700" ? "text-black" : "text-white"
                  }`}
                >
                  {race.location}
                </h3>
                <h4
                  className={`text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 ${
                    race.backgroundColor === "#FFD700" ? "text-black" : "text-white"
                  }`}
                >
                  {race.city}
                </h4>
                <p
                  className={`text-lg md:text-xl font-bold uppercase tracking-wider mb-6 ${
                    race.backgroundColor === "#FFD700" ? "text-black" : "text-white"
                  }`}
                >
                  {race.date}
                </p>

                {/* Branch */}
                <p
                  className={`text-sm md:text-base font-bold uppercase tracking-wide ${
                    race.backgroundColor === "#FFD700" ? "text-black/90" : "text-white/90"
                  }`}
                >
                  {race.branch}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

