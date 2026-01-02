"use client";

import Image from "next/image";

interface Partner {
  name: string;
  logoUrl?: string;
  website?: string;
}

const partners: Partner[] = [
  {
    name: "Partner 1",
    // Add logo URLs when available
  },
  {
    name: "Partner 2",
  },
  {
    name: "Partner 3",
  },
  {
    name: "Partner 4",
  },
  {
    name: "Partner 5",
  },
  {
    name: "Partner 6",
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 md:p-8 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-[#FFD700]/50 transition-all duration-300 group"
            >
              {partner.logoUrl ? (
                <div className="relative w-full h-20 md:h-24">
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    fill
                    className="object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                  />
                </div>
              ) : (
                <div className="text-white/40 group-hover:text-[#FFD700] text-center transition-colors duration-300">
                  <p className="text-sm md:text-base font-bold uppercase tracking-wider">
                    {partner.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

