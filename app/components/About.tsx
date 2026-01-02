"use client";

import Image from "next/image";

export default function About() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Left Side - Image */}
          <div className="w-full md:w-2/5 relative h-[400px] md:h-[600px]">
            <Image
              src="/atle-about.png"
              alt="Atle Lie McGrath"
              fill
              className="object-cover object-center rounded-lg"
              quality={90}
            />
          </div>

          {/* Right Side - Text Content */}
          <div className="w-full md:w-3/5 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0a0e27] uppercase tracking-tighter mb-6 md:mb-8">
              ABOUT ATLE
            </h2>
            
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-10">
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                Atle Lie McGrath began his alpine skiing career at a young age, showing exceptional talent and dedication to the sport. His journey in competitive skiing has been marked by remarkable achievements and consistent performance across various disciplines.
              </p>
              
              <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                With a focus on technical events like slalom and giant slalom, Atle has established himself as a rising star in alpine racing, competing at the highest levels and representing his country with distinction on the international stage.
              </p>
            </div>

            {/* Read More Button */}
            <button className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border-2 border-[#0a0e27] text-[#0a0e27] font-bold uppercase tracking-wider rounded-lg hover:bg-[#0a0e27] hover:text-white transition-all duration-300 w-fit group">
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>READ MORE</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

