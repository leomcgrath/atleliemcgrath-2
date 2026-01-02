"use client";

import Image from "next/image";

interface Partner {
  name: string;
  logoUrl?: string;
  website?: string;
}

const partners: Partner[] = [
  {
    name: "HEAD",
    logoUrl: "/partners/head.webp",
    website: "https://www.head.com",
  },
  {
    name: "LEKI",
    logoUrl: "/partners/leki.svg",
    website: "https://www.leki.com",
  },
  {
    name: "LEVEL",
    logoUrl: "/partners/level.jpg",
    website: "https://www.levelski.com",
  },
  {
    name: "Pfanner",
    logoUrl: "/partners/pfanner.jpg",
    website: "https://www.pfanner.com",
  },
  {
    name: "BRASS AVALANCHE",
    logoUrl: "/partners/brass.png",
    website: "https://www.brassavalanche.com",
  },
  {
    name: "SPORTMASTER",
    logoUrl: "/partners/sportmaster.png",
    website: "https://www.sportmaster.com",
  },
  {
    name: "KVITFJELL",
    logoUrl: "/partners/kvitfjell.png",
    website: "https://www.kvitfjell.no",
  },
];

export default function Partners() {
  return (
    <section className="w-full bg-[#0a0e27] py-16 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            PARTNERS
          </h2>
          <div className="w-24 h-1 bg-[#FFD700] mx-auto"></div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 md:p-6 bg-white rounded-xl border border-white/20 hover:bg-white/90 hover:border-[#FFD700] hover:shadow-lg transition-all duration-300 group aspect-square"
            >
              {partner.logoUrl ? (
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 14vw"
                />
              ) : (
                <div className="text-gray-800 group-hover:text-[#FFD700] text-center transition-colors duration-300">
                  <p className="text-sm md:text-base font-bold uppercase tracking-wider">
                    {partner.name}
                  </p>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

