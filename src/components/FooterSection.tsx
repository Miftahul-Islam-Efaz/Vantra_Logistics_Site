import React from 'react';

export default function FooterSection() {
  return (
    <footer 
      className="w-full bg-[#020202] relative z-40 overflow-hidden select-none border-t border-white/[0.04]" 
      id="true-footer-section"
    >
      {/* Seamless transition space - reduced for compact premium look */}
      <div className="w-full h-[6vh] md:h-[10vh] min-h-[40px] md:min-h-[60px] max-h-[120px] bg-[#020202] relative z-40" />

      {/* 2. Professional Content Grid */}
      <div className="px-6 lg:px-12 pt-10 md:pt-20 pb-8 md:pb-12 relative z-40 bg-[#020202] overflow-hidden">
        <div className="max-w-[1450px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-8 relative z-30">
          
          {/* Column 1: Identity & Status */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#FF4500] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C11.5 2 6 5.5 2.5 10C1 12 1 14 2 15C3 16 5 16.5 7 15.5C9 14.5 12.5 11 14.5 9.5C14.5 9.5 11.5 11 9 12C7 12.8 5 13 4 12C3 11 4.5 9 6.5 8C9.5 6.5 13.5 5 17 4.5C21 4 23 2.5 23 2.5C23 2.5 18 2 12 2Z"/>
                <path d="M11.5 7.5C10 8 7 9.5 5.5 11C4.5 12 5.5 12 6.5 11.5C8 10.8 11.5 9 13.5 8C15 7.2 16.5 6.8 17.5 6.5C15 6.8 13 7 11.5 7.5Z"/>
              </svg>
              <div className="flex flex-col leading-[1.1]">
                <span className="text-[13px] font-black tracking-widest text-white uppercase">Vantra</span>
                <span className="text-[8px] font-semibold tracking-[0.18em] text-[#737373] uppercase">Logistics</span>
              </div>
            </div>
            
            {/* Extremely concise on mobile, fully detailed description on desktop */}
            <p className="text-[12px] md:text-[13px] text-[#8C8C8C] leading-relaxed font-sans max-w-sm">
              <span className="block md:hidden">Precision heavy transport & global automated container ecosystems.</span>
              <span className="hidden md:block" style={{ width: '300.953px' }}>Precision heavy transport, hyper-efficient freight management, and automated container ecosystems globally. We bridge heavy industrial hardware with digital intelligence.</span>
            </p>
          </div>

          {/* Column 2: Empty Spacer on desktop to allow the centered 3D Globe to rise up cleanly */}
          <div className="hidden lg:block h-10" />

          {/* Column 3: Hubs & Terminals on the Right side */}
          <div className="flex flex-col gap-3 md:items-end md:text-right md:justify-self-end mt-2 md:mt-0">
            <h4 className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-[#FF4500] uppercase font-bold md:text-right">
              Global Hubs
            </h4>
            
            {/* Mobile Inline List (extremely clean & minimal) */}
            <div className="flex md:hidden flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#A3A3A3] font-mono uppercase tracking-wider">
              <span>Chicago</span>
              <span className="text-white/10">•</span>
              <span>Los Angeles</span>
              <span className="text-white/10">•</span>
              <span>Rotterdam</span>
            </div>

            {/* Desktop Detailed List */}
            <div className="hidden md:flex flex-col gap-3.5 text-[13px] text-[#A3A3A3] font-sans md:items-end">
              <div className="md:text-right">
                <p className="text-white font-medium text-[13px]">North America Hub</p>
                <p className="text-[12px] text-[#737373] mt-0.5">Terminal Area 4 — Chicago, IL</p>
              </div>
              <div className="md:text-right">
                <p className="text-white font-medium text-[13px]">Pacific Terminal</p>
                <p className="text-[12px] text-[#737373] mt-0.5">Port Expansion Unit — Los Angeles, CA</p>
              </div>
              <div className="md:text-right">
                <p className="text-white font-medium text-[13px]">Euro-Gateway</p>
                <p className="text-[12px] text-[#737373] mt-0.5">Automated Terminal — Rotterdam, NL</p>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Flat Meta and Copyright Row */}
        <div className="max-w-[1450px] mx-auto w-full mt-10 md:mt-24 border-t border-white/[0.04] pt-6 md:pt-8 relative z-30">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] md:text-[11px] text-[#555555] font-mono uppercase tracking-widest">
            <div>
              © {new Date().getFullYear()} Vantra Logistics Inc.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#FF4500] transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-[#FF4500] transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* High-performance static globe image - NO DARK OVERLAY, BLUR FADE AT TOP */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          {/* Mobile version image */}
          <img 
            src="https://lh3.googleusercontent.com/d/1CU570A6NSb6ounRp4ZED_w0uiuzzEYqo" 
            alt="Vantra Logistics Globe Mobile"
            className="block md:hidden w-full h-full object-cover object-bottom select-none opacity-100 translate-y-[40%]" 
            style={{ 
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 100%)'
            }}
            referrerPolicy="no-referrer"
          />
          {/* Desktop version image */}
          <img 
            src="https://lh3.googleusercontent.com/d/1zlpA8fVuIEQFAEmmrbFwuqktHo1ckUE0" 
            alt="Vantra Logistics Globe"
            className="hidden md:block w-full h-auto object-cover select-none opacity-100" 
            style={{ 
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 100%)'
            }}
            referrerPolicy="no-referrer"
          />
        </div>

      </div>
    </footer>
  );
}
