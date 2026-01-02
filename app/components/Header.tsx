import Image from "next/image";

export default function Header() {
  return (
    <header className="relative w-full">
      {/* Dark grey top bar */}
      <div className="bg-[#2a2a2a] h-2 w-full"></div>
      
      {/* Main header section with blurred background */}
      <div className="relative w-full overflow-hidden">
        {/* Blurred background images - split layout */}
        <div className="absolute inset-0 z-0">
          {/* Left side image */}
          <div className="absolute inset-0 w-1/2 left-0">
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
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/20 z-10 transform -translate-x-1/2"></div>
          
          {/* Right side image */}
          <div className="absolute inset-0 w-1/2 right-0">
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
        
        {/* Content container - flex layout */}
        <div className="relative z-10 flex items-center min-h-[80px] md:min-h-[100px]">
          {/* Left section - Logo (positioned to the left of yellow bar) */}
          <div className="flex items-center px-4 md:px-6 py-4 md:py-6 relative z-20">
            {/* Logo image */}
            <div className="relative w-24 h-16 md:w-32 md:h-20 lg:w-40 lg:h-24 flex-shrink-0">
              <Image
                src="/atle-logo-hvit.png"
                alt="Atle Logo"
                fill
                className="object-contain object-left"
                quality={100}
                priority
              />
            </div>
          </div>
          
          {/* Yellow navigation bar - starts from center-left, extends to right */}
          <nav className="flex-1 bg-[#FFD700] px-4 md:px-6 lg:px-8 py-4 md:py-5 flex items-center justify-between relative ml-auto min-h-[80px] md:min-h-[100px]">
            {/* Navigation Links - Center */}
            <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 absolute left-1/2 transform -translate-x-1/2">
              <a href="#" className="text-black font-black text-xs lg:text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
                HOME
              </a>
              <a href="#" className="text-black font-black text-xs lg:text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
                ABOUT
              </a>
              <a href="#" className="text-black font-black text-xs lg:text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
                SEASON
              </a>
              <a href="#" className="text-black font-black text-xs lg:text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
                PARTNERS
              </a>
              <a href="#" className="text-black font-black text-xs lg:text-sm uppercase tracking-wider hover:opacity-70 transition-opacity">
                STORE
              </a>
            </div>
            
            {/* Event Announcement - Right side */}
            <div className="text-black font-black text-xs md:text-sm lg:text-base uppercase tracking-wider text-right ml-auto">
              <div className="hidden sm:block leading-tight">AUSTRALIAN GRAND PRIX</div>
              <div className="text-[10px] md:text-xs lg:text-sm leading-tight">06-08 MARCH</div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

