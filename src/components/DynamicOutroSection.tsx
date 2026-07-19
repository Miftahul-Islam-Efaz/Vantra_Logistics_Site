import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Plus } from 'lucide-react';

interface DynamicOutroSectionProps {
  onPickUpClick: () => void;
}

export default function DynamicOutroSection({ onPickUpClick }: DynamicOutroSectionProps) {
  const outroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Scroll tracking specifically for this section
  const { scrollYProgress } = useScroll({
    target: outroRef,
    offset: ["start end", "end end"]
  });

  // Pulling animation: starts below (e.g. 350px) and rises up to 0px (hanging)
  const rawY = useTransform(scrollYProgress, [0.0, 0.85], [300, 0]);
  const containerY = useSpring(rawY, { stiffness: 55, damping: 22 });

  // Subtle tilt oscillation as it gets pulled up to give it a heavy physical pendulum feel
  const rawRotate = useTransform(scrollYProgress, [0.0, 0.4, 0.85], [-4, 2, 0]);
  const containerRotate = useSpring(rawRotate, { stiffness: 45, damping: 18 });

  // Subtle scale-up transition to emphasize the dramatic vertical hoisting
  const containerScale = useTransform(scrollYProgress, [0.0, 0.85], [0.9, 1.02]);

  return (
    <section 
      ref={outroRef}
      className="relative w-full min-h-[750px] md:min-h-[850px] lg:min-h-[920px] bg-[#020202] py-16 px-6 lg:px-12 flex flex-col justify-between overflow-hidden select-none border-t border-[#121212]"
      style={{
        backgroundImage: `url('${isMobile ? 'https://lh3.googleusercontent.com/d/1JgrMMpfPrri4g_Z6udp_CTm6sZ-bmE7L' : 'https://lh3.googleusercontent.com/d/1FKenYDB9-3n6YaOcqrvNtrxOgQetC1-m'}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
      }}
      id="footer-section"
    >
      {/* Immersive overlay for supreme contrast and integration */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/80 z-10 pointer-events-none" />

      {/* Main content layer */}
      <div className="max-w-[1450px] mx-auto w-full relative z-20 flex flex-col justify-between h-full flex-1">
        
        {/* 2. Middle area containing content & animated central background container */}
        <div className="relative w-full flex-1 flex flex-col md:flex-row justify-between items-center py-16 gap-12" id="footer-middle">
          
          {/* Left Text Column */}
          <div className="w-full md:w-[35%] text-left space-y-4 md:space-y-6 z-30" id="footer-text-block">
            <h2 className="text-[40px] sm:text-[50px] md:text-[54px] font-bold tracking-tight text-white leading-[1.1]">
              Freight that <br />
              doesn't wait.
            </h2>
            <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed max-w-[360px] font-normal">
              Reliable logistics solutions delivered with speed, precision, and care.
            </p>
          </div>

          {/* Center Background Animated Container Section */}
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center pointer-events-none z-20 overflow-visible">
            <motion.div
              style={{
                y: containerY,
                rotate: containerRotate,
                scale: containerScale,
              }}
              className="w-[340px] sm:w-[520px] md:w-[620px] lg:w-[740px] xl:w-[820px] h-full flex items-center justify-center relative select-none"
            >
              <img 
                src="https://lh3.googleusercontent.com/d/10jjqb5ysXD4iYWOsEhqG63icCULjcUfe" 
                alt="Hanging Container" 
                className="w-full h-auto object-contain drop-shadow-[0_45px_70px_rgba(0,0,0,0.95)] max-h-[110%]"
              />
            </motion.div>
          </div>

          {/* Right Placeholder Column to offset layout and keep spacing beautifully symmetrical */}
          <div className="hidden md:block w-[35%] h-10 pointer-events-none" />

        </div>

      </div>
    </section>
  );
}
