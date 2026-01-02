import Image from "next/image";
import Header from "./components/Header";
import RaceCalendar from "./components/RaceCalendar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Background images starting from top - behind everything */}
      <div className="absolute inset-0 z-0 min-h-screen">
        {/* Left side image */}
        <div className="absolute inset-0 w-3/5 left-0">
          <Image
            src="/atle-cowboy.png"
            alt="Background"
            fill
            className="object-cover object-center"
            quality={90}
          />
          <div className="absolute inset-0 backdrop-blur-md bg-slate-200/40"></div>
        </div>
        
        {/* Vertical divider line */}
        <div className="absolute left-[60%] top-0 bottom-0 w-px bg-black/20 z-10"></div>
        
        {/* Right side image */}
        <div className="absolute inset-0 w-2/5 right-0">
          <Image
            src="/atle-standing.png"
            alt="Background"
            fill
            className="object-cover object-center"
            quality={90}
          />
          <div className="absolute inset-0 backdrop-blur-md bg-teal-600/40"></div>
        </div>
      </div>

      {/* Header - on top of images */}
      <Header />

      {/* Main Hero Section - Split Layout */}
      <main className="flex flex-col md:flex-row min-h-screen relative z-10">
        {/* Left Section - Portrait */}
        <div className="w-full md:w-3/5 relative overflow-hidden min-h-[50vh] md:min-h-full">
          {/* Portrait image - same as background but without blur for content area */}
          <div className="absolute inset-0">
            <Image
              src="/atle-cowboy.png"
              alt="Atle Lie McGrath"
              fill
              className="object-cover object-center"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>

          {/* Text Overlays - Bottom Left */}
          <div className="absolute bottom-8 md:bottom-20 left-6 md:left-12 z-10">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-1 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.3)] leading-none">
              ATLE
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 md:mb-6 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.3)] leading-none">
              LIE MCGRATH
            </h2>
            <p className="text-[#FFD700] text-sm md:text-lg lg:text-xl font-bold uppercase tracking-widest">
              ALPINE RACER
            </p>
          </div>
        </div>

        {/* Right Section - Merchandise/Sale */}
        <div className="w-full md:w-2/5 relative overflow-hidden min-h-[50vh] md:min-h-full">
          {/* Merchandise image - same as background but without blur for content area */}
          <div className="absolute inset-0">
            <Image
              src="/atle-standing.png"
              alt="Merchandise"
              fill
              className="object-cover object-center"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>

          {/* Text Overlays - Bottom Right */}
          <div className="absolute bottom-8 md:bottom-20 left-1/2 -translate-x-1/2 z-10 text-center">
            <h3 className="text-3xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-2 md:mb-3 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.3)] leading-tight">
              HE SKIS
            </h3>
            <button className="bg-[#FFD700] hover:bg-[#FFED4E] text-black font-black py-3 px-6 md:py-5 md:px-10 rounded-full border-2 border-black uppercase tracking-wider flex items-center gap-2 md:gap-3 transition-all hover:scale-105 shadow-lg text-sm md:text-base w-fit mx-auto">
              <div className="w-5 h-5 md:w-7 md:h-7 bg-[#FFD700] rounded-full border border-black flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="black">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span>RACE CALENDAR</span>
            </button>
          </div>
        </div>
      </main>

      {/* Race Calendar */}
      <RaceCalendar />

      {/* Footer */}
      <footer className="bg-[#0a0e27] h-16 w-full"></footer>
    </div>
  );
}
