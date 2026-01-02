"use client";

import Image from "next/image";

interface RaceCard {
  location: string;
  city: string;
  date: string;
  branch: string;
  result?: string;
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
    result: "1ST",
    backgroundType: "image",
    imageUrl: "/atle-half-shave.png", // Placeholder - you can replace with actual race images
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
    imageUrl: "https://flagcdn.com/w1280/it.png", // Italy flag
  },
  {
    location: "SWITZERLAND",
    city: "ADELBODEN",
    date: "15 MARCH",
    branch: "SUPER-G",
    backgroundType: "solid",
    backgroundColor: "#0a0e27", // Dark blue
    imageUrl: "https://flagcdn.com/w1280/ch.png", // Switzerland flag
  },
  {
    location: "SWITZERLAND",
    city: "WENGEN",
    date: "29 MARCH",
    branch: "DOWNHILL",
    backgroundType: "solid",
    backgroundColor: "#0a0e27", // Dark blue
    imageUrl: "https://flagcdn.com/w1280/ch.png", // Switzerland flag
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
                  {/* Grayscale flag image */}
                  {race.imageUrl && (
                    <div className="absolute inset-0 opacity-20">
                      <Image
                        src={race.imageUrl}
                        alt={race.location}
                        fill
                        className="object-cover grayscale"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Result - Top Left */}
              {race.result && (
                <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
                  <p className="text-xl md:text-2xl font-black uppercase tracking-tight text-black">
                    {race.result}
                  </p>
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

