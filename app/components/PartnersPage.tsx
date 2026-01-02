"use client";

import Image from "next/image";

interface Partner {
  name: string;
  brandingColor: string;
  description: string;
  website?: string;
  tagline?: string;
  image: string;
}

const partners: Partner[] = [
  {
    name: "HEAD",
    brandingColor: "#000000", // Black
    description: "HEAD is a leading manufacturer of sports equipment, specializing in tennis, skiing, and other performance sports. With a commitment to innovation and excellence, HEAD provides athletes with cutting-edge gear designed to enhance performance.",
    website: "https://www.head.com",
    image: "/partners/head.webp",
  },
  {
    name: "LEKI",
    brandingColor: "#000000", // Black
    description: "LEKI is the world's leading manufacturer of ski poles, trekking poles, and outdoor accessories. With over 70 years of experience, LEKI combines German engineering precision with innovative design to create premium equipment for outdoor enthusiasts.",
    website: "https://www.leki.com",
    image: "/partners/leki.svg",
  },
  {
    name: "LEVEL",
    brandingColor: "#000000", // Black
    description: "LEVEL is a premium ski brand dedicated to creating high-performance ski equipment. With a focus on quality and innovation, LEVEL provides skiers with gear that delivers exceptional performance on the slopes.",
    website: "https://www.levelski.com",
    image: "/partners/level.jpg",
  },
  {
    name: "Pfanner",
    brandingColor: "#FFD700", // Gold/Yellow (from the banner)
    description: "Pfanner has been producing premium quality products since 1856. With a rich heritage spanning over 160 years, Pfanner combines traditional craftsmanship with modern innovation to deliver exceptional quality in all their products.",
    website: "https://www.pfanner.com",
    tagline: "PREMIUM QUALITY SINCE 1856",
    image: "/partners/pfanner.jpg",
  },
  {
    name: "BRASS AVALANCHE",
    brandingColor: "#1E3A8A", // Blue (from the logo)
    description: "BRASS AVALANCHE is a dynamic brand that embodies the spirit of adventure and the power of nature. With a focus on quality and performance, BRASS AVALANCHE creates products designed for those who seek the extraordinary.",
    website: "https://www.brassavalanche.com",
    image: "/partners/brass.png",
  },
  {
    name: "SPORTMASTER",
    brandingColor: "#0066CC", // Blue (from the runner logo)
    description: "SPORTMASTER is a leading sports brand dedicated to empowering athletes and sports enthusiasts. With a focus on performance, innovation, and quality, SPORTMASTER provides gear and equipment designed to help athletes achieve their goals.",
    website: "https://www.sportmaster.com",
    image: "/partners/sportmaster.png",
  },
  {
    name: "KVITFJELL",
    brandingColor: "#000000", // Black
    description: "KVITFJELL is a premier ski resort destination offering world-class skiing and snowboarding experiences. Nestled in the Norwegian mountains, KVITFJELL provides exceptional slopes and facilities for winter sports enthusiasts of all levels.",
    website: "https://www.kvitfjell.no",
    image: "/partners/kvitfjell.png",
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen pt-[85px]">
      {/* Header Section */}
      <section className="w-full bg-white py-12 md:py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          {/* Title */}
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black uppercase tracking-tighter leading-none mb-2">
              ATLE'S
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-black uppercase tracking-tighter leading-none">
              PARTNERS
            </h1>
          </div>

          {/* Become a Partner Button */}
          <a
            href="#contact"
            className="border-2 border-[#4A90E2] bg-white text-[#4A90E2] font-black py-3 px-6 md:py-4 md:px-8 rounded-sm uppercase tracking-wider flex items-center gap-3 hover:bg-[#4A90E2] hover:text-white transition-all duration-300 text-sm md:text-base"
          >
            <div className="w-6 h-6 md:w-7 md:h-7 bg-[#4A90E2] rounded-full border border-[#4A90E2] flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <span>BECOME A PARTNER</span>
          </a>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full bg-[#0a0e27]">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="w-full flex flex-col md:flex-row min-h-[400px] md:min-h-[500px]"
          >
            {/* Left Panel - Branding */}
            <div
              className="w-full md:w-2/5 flex items-center justify-center p-8 md:p-12 lg:p-16"
              style={{ backgroundColor: partner.brandingColor }}
            >
              <div className="text-center w-full max-w-md">
                <div className="relative w-full h-48 md:h-64 lg:h-80 mb-6">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                </div>
                {partner.tagline && (
                  <p className="text-white/90 text-sm md:text-base lg:text-lg italic font-light">
                    {partner.tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Right Panel - Description */}
            <div className="w-full md:w-3/5 bg-black flex items-center p-8 md:p-12 lg:p-16">
              <div className="max-w-2xl">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-6 md:mb-8">
                  {partner.name}
                </h3>
                <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed mb-8 md:mb-10 font-light">
                  {partner.description}
                </p>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border-2 border-[#FFD700] bg-black text-white font-black py-3 px-8 md:py-4 md:px-10 rounded-sm uppercase tracking-wider hover:bg-[#FFD700] hover:text-black transition-all duration-300 text-sm md:text-base"
                  >
                    MORE INFO
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full bg-white py-16 md:py-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Partnerships Info */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black uppercase tracking-tighter mb-6">
                PARTNERSHIPS
              </h2>
              <p className="text-black text-base md:text-lg leading-relaxed font-light">
                Looking to partner with Atle? Please contact us for all business enquiries.
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-100 p-8 md:p-10 rounded-sm">
              <h3 className="text-2xl md:text-3xl font-black text-[#4A90E2] uppercase tracking-tighter mb-6">
                CONTACT
              </h3>
              <div className="space-y-2 text-black text-base md:text-lg font-light">
                <p className="font-semibold">Business Inquiries</p>
                <p>contact@atleliemcgrath.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Partner Logos */}
      <section className="w-full bg-[#0a0e27] py-12 md:py-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mb-4 bg-white rounded-lg p-4 flex items-center justify-center">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 128px, (max-width: 1200px) 160px, 192px"
                  />
                </div>
                {partner.tagline && (
                  <p className="text-white/70 text-xs md:text-sm italic mt-2">
                    {partner.tagline}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

