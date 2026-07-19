import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import BlurRevealText from './BlurRevealText';

export default function FleetSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#020202] py-24 sm:py-32 lg:py-40 flex flex-col justify-between rounded-t-[40px] sm:rounded-t-[60px] md:rounded-t-[80px] bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url('${isMobile ? 'https://lh3.googleusercontent.com/d/1ZxuD2lTWJDPoCy8I5p7dZqBmEAL13Osl' : 'https://lh3.googleusercontent.com/d/1bPP5ZFDqZMsC_gU26J7fzVZhZ6u-IqDe'}')`,
      }}
      id="fleet-section"
    >
      {/* Ambient dark bottom/left overlays to ensure text readability across all display ratios */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40 md:hidden z-10 pointer-events-none" />
      <div className="absolute inset-0 hidden md:block bg-black/20 z-10 pointer-events-none" />
      
      <div className="max-w-[1450px] mx-auto px-6 lg:px-12 w-full relative z-20 flex flex-col justify-between h-full min-h-[480px] md:min-h-[580px]">
        {/* Top content block (left-aligned) */}
        <div className="max-w-[650px] space-y-6 md:space-y-8">
          <div className="space-y-4">
            <h2 className="text-[40px] sm:text-[54px] md:text-[62px] lg:text-[72px] font-light tracking-tight text-white leading-[1.08]">
              <BlurRevealText text="Every mile," className="block" duration={0.6} />
              <BlurRevealText text="driven by care." className="text-[#FF4500] font-normal block" duration={0.6} delay={0.15} />
            </h2>

            <p className="text-[#E5E5E5]/80 text-[15px] sm:text-[17px] leading-relaxed font-normal max-w-[480px]">
              <BlurRevealText text="Real drivers. Real routes. Real accountability." duration={0.5} delay={0.3} />
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <button 
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/20 hover:border-white/60 bg-transparent text-white text-[14.5px] font-normal transition-all duration-300 hover:bg-white/5 cursor-pointer group"
              id="meet-fleet-btn"
            >
              <span>Meet our fleet</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 text-[16px]">
                →
              </span>
            </button>
          </motion.div>
        </div>

        {/* Bottom stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pt-16 md:pt-24 border-t border-white/5" id="fleet-stats-row">
          {[
            { val: "10k+", label: "Drivers" },
            { val: "98%", label: "On-time" },
            { val: "15+ yrs", label: "Experience" },
            { val: "0", label: "Missed handoffs" }
          ].map((stat, i) => (
            <div 
              key={i}
              id={`fleet-stat-${i}`}
            >
              <div className="text-[36px] sm:text-[44px] md:text-[52px] font-light text-white leading-none mb-2 tracking-tight">
                <BlurRevealText text={stat.val} delay={0.4 + i * 0.1} duration={0.5} stagger={0.02} />
              </div>
              <div className="text-[#808080] text-[13.5px] sm:text-[14.5px] font-normal">
                <BlurRevealText text={stat.label} delay={0.5 + i * 0.1} duration={0.5} stagger={0.02} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
