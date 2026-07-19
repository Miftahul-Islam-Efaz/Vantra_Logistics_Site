import React from 'react';
import BlurRevealText from './BlurRevealText';

export default function AboutSection() {
  return (
    <div className="w-full bg-[#050505] py-20 px-6 lg:px-12 border-t border-white/[0.03] select-none" id="brand-insight-stage">
      <div className="max-w-[1450px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Section 1: About Vantra (Left 7 Columns) */}
        <section 
          id="about-vantra" 
          className="lg:col-span-7 flex flex-col justify-start text-left space-y-6"
        >
          <h1 className="text-[11px] font-mono tracking-[0.25em] text-[#FF4500] uppercase font-bold">
            About Vantra Logistics
          </h1>
          
          <div className="text-[28px] sm:text-[36px] md:text-[42px] font-light tracking-tight text-white leading-[1.15] uppercase">
            <BlurRevealText text="A Concept in Premium Heavy Logistics" duration={0.6} />
          </div>

          <div className="space-y-4 max-w-2xl text-[#8E8E93] text-sm sm:text-base leading-relaxed font-sans">
            <p>
              Vantra Logistics is a concept freight and container shipping brand —
              built to explore what a premium, editorial-grade logistics experience
              could look and feel like on the web. Every detail, from the container
              dimension breakdowns to the global hub network, was designed to make
              a traditionally utilitarian industry feel precise, modern, and trustworthy.
            </p>
            <p className="text-[#555] font-mono uppercase text-[11px] tracking-wider">
              This site is a design and engineering showcase, not an operating
              logistics company.
            </p>
          </div>
        </section>

        {/* Section 2: Developer Credit (Right 5 Columns) */}
        <section 
          id="developer-credit" 
          aria-label="Site credits"
          className="lg:col-span-5 flex flex-col justify-start text-left space-y-6 bg-[#0B0C0E] border border-white/[0.04] p-8 rounded-[24px] shadow-2xl shadow-black/80"
        >
          <h2 className="text-[11px] font-mono tracking-[0.25em] text-[#A3A3A3] uppercase font-bold">
            Engineered By
          </h2>

          <div className="text-[20px] sm:text-[24px] font-normal text-white tracking-tight uppercase">
            Miftahul Islam Efaz
          </div>

          <div className="space-y-4 text-[#8C8C8C] text-sm leading-relaxed font-sans">
            <p>
              Vantra Logistics was designed and developed by{' '}
              <strong className="text-white font-medium">Miftahul Islam Efaz</strong> (known as{' '}
              <strong className="text-white font-medium">Efaz</strong>),
              an autodidact entrepreneur, vibe-coder, and AI orchestrator based in
              Chattogram, Bangladesh. Efaz specializes in high-end front-end
              engineering — WebGL, GSAP motion design, Three.js, and AI-assisted
              full-stack development.
            </p>
            
            <div className="pt-2">
              <p className="text-[11px] text-[#555] font-mono uppercase tracking-widest mb-1.5">Portfolio Link</p>
              <a 
                href="https://miftahulislamefaz.xyz" 
                rel="author"
                target="_blank"
                className="text-white font-mono text-xs hover:text-[#FF4500] transition-colors duration-300 border-b border-white/20 hover:border-[#FF4500]/50 pb-0.5 inline-block"
              >
                miftahulislamefaz.xyz
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
