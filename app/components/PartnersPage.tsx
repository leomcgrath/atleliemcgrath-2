"use client";

interface Partner {
  name: string;
  brandingColor: string;
  description: string;
  website?: string;
  tagline?: string;
}

const partners: Partner[] = [
  {
    name: "AVENTUM",
    brandingColor: "#0a1a2e", // Dark teal/blue
    description: "Aventum, our people make reinsurance better. We never stand still, we forever challenge complacency and we believe that anything is possible.",
    website: "https://aventum.com",
  },
  {
    name: "EUROSPARES",
    brandingColor: "#DC143C", // Vibrant red
    description: "Eurospares are the world's largest supplier of new and used spare parts for Ferrari, Lamborghini, Maserati, Porsche, Aston Martin and other supercars.",
    website: "https://eurospares.co.uk",
    tagline: "A passion for parts since 1985.",
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
              <div className="text-center">
                {partner.name === "EUROSPARES" ? (
                  <>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white lowercase tracking-tighter mb-4">
                      eurospares
                    </h2>
                    {partner.tagline && (
                      <p className="text-white/90 text-sm md:text-base lg:text-lg italic font-light">
                        {partner.tagline}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                      {partner.name}
                    </h2>
                    {partner.tagline && (
                      <p className="text-white/90 text-sm md:text-base lg:text-lg italic font-light">
                        {partner.tagline}
                      </p>
                    )}
                  </>
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
                <h4 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter">
                  {partner.name === "EUROSPARES" ? (
                    <span className="lowercase">eurospares</span>
                  ) : (
                    <span className="uppercase">{partner.name}</span>
                  )}
                </h4>
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

