import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative z-10">
        {/* Yellow Navigation Bar */}
        <nav className="bg-[#FFD700] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between relative">
          {/* Logo Section - Left side of nav bar */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-[#FFD700] rounded-full border-2 border-black flex items-center justify-center">
              <svg className="w-5 h-5 md:w-7 md:h-7" viewBox="0 0 24 24" fill="black">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <span className="text-xl md:text-3xl font-bold text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">OB</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="text-black font-bold text-xs lg:text-sm uppercase tracking-wider border-b-2 border-black pb-1">HOME</a>
            <a href="#" className="text-black font-bold text-xs lg:text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">ABOUT</a>
            <a href="#" className="text-black font-bold text-xs lg:text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">SEASON</a>
            <a href="#" className="text-black font-bold text-xs lg:text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">PARTNERS</a>
            <a href="#" className="text-black font-bold text-xs lg:text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">STORE</a>
          </div>

          {/* Event Announcement - Right side */}
          <div className="text-black font-bold text-xs md:text-sm uppercase tracking-wider text-right">
            <div className="hidden sm:block">AUSTRALIAN GRAND PRIX</div>
            <div className="text-[10px] md:text-xs">06-08 MARCH</div>
          </div>
        </nav>
      </header>

      {/* Main Hero Section - Split Layout */}
      <main className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
        {/* Left Section - Portrait */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 overflow-hidden min-h-[50vh] md:min-h-full">
          {/* Background pattern for architectural elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)'
            }}></div>
          </div>
          
          {/* Portrait image */}
          <div className="absolute inset-0">
            <Image
              src="/atle-cowboy.png"
              alt="Ollie Bearman"
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
              OLLIE
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-4 md:mb-6 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.3)] leading-none">
              BEARMAN
            </h2>
            <p className="text-[#FFD700] text-sm md:text-lg lg:text-xl font-bold uppercase tracking-widest">
              MONEYGRAM HAAS F1 TEAM FORMULA 1 DRIVER
            </p>
          </div>
        </div>

        {/* Right Section - Merchandise/Sale */}
        <div className="w-full md:w-1/2 relative bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden min-h-[50vh] md:min-h-full">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)'
            }}></div>
          </div>

          {/* Merchandise image */}
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
          <div className="absolute bottom-8 md:bottom-20 right-6 md:right-12 z-10 text-right">
            <h3 className="text-3xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-2 md:mb-3 drop-shadow-[3px_3px_0px_rgba(0,0,0,0.3)] leading-tight">
              END OF SEASON SALE
            </h3>
            <p className="text-white text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider mb-6 md:mb-8 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
              UP TO 50% OFF
            </p>
            <button className="bg-[#FFD700] hover:bg-[#FFED4E] text-black font-black py-3 px-6 md:py-5 md:px-10 rounded-full border-2 border-black uppercase tracking-wider flex items-center gap-2 md:gap-3 transition-all hover:scale-105 shadow-lg text-sm md:text-base">
              <div className="w-5 h-5 md:w-7 md:h-7 bg-[#FFD700] rounded-full border border-black flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="black">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span>SHOP NOW</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0e27] h-16 w-full"></footer>
    </div>
  );
}
