import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import TruckHoverReveal from './TruckHoverReveal';
import TextMorph from './TextMorph';

// ==========================================
// TRUCK & TEXT LAYOUT CONFIGURATION
// You can easily adjust the size and position of the truck and text reveal here!
// ==========================================
const TRUCK_CONFIG = {
  // Position: How far downwards the truck is shifted.
  // Negative values move the truck further DOWN (e.g., -100px is lower than -40px)
  bottomOffsetMobile: -10,   // px (Mobile)
  bottomOffsetTablet: -20,   // px (Tablet)
  bottomOffsetDesktop: -30,  // px (Desktop)

  // Size: Responsive widths for the truck container
  widthMobile: "95%",        // Mobile width
  widthTablet: "90%",        // Tablet width
  widthDesktop: "85%",       // Desktop width
  maxWidth: 1250,            // Absolute max width in pixels
};

const TEXT_CONFIG = {
  // Y-translation of the logo text
  startingY: 250,            // Start position (hidden behind the truck)
  endingY: -110,             // End position (set to show exactly ~85% above the truck and 15% covered)
  
  // Scale transformation
  startingScale: 0.8,
  endingScale: 1.1,
};

export default function TruckRevealSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll tracking specifically for this truck reveal section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  });

  // Use smooth spring physics for high-end cinematic feel
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 45, damping: 20 });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Text Parallax: Rises up from behind the truck to the top, fully revealing starting after 20% of the scroll (from 0.2 to 0.8)
  const textY = useTransform(
    smoothScroll,
    [0.2, 0.8],
    isMobile 
      ? [220, 45] 
      : [TEXT_CONFIG.startingY, TEXT_CONFIG.endingY]
  );
  const textScale = useTransform(smoothScroll, [0.2, 0.8], [TEXT_CONFIG.startingScale, TEXT_CONFIG.endingScale]);
  const textOpacity = useTransform(smoothScroll, [0.2, 0.75], [0, 1]);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-[#020202] relative z-40 overflow-hidden select-none" 
      id="truck-reveal-section"
    >
      {/* Immersive Scroll Reveal Stage */}
      <div 
        className="w-full h-[550px] sm:h-[650px] md:h-[750px] lg:h-[850px] relative flex flex-col justify-between overflow-hidden"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/d/1aqzTgQGJ5Qglgc2GBS-CaJ6rZPutLoFc')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
        id="truck-reveal-stage"
      >
        {/* Cinematic Vignettes and Gradients to seamlessly blend with the black background */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#020202] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020202] to-transparent z-20 pointer-events-none" />

        {/* Ambient brand glow deep in the background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-[#FF4500]/5 blur-[120px] pointer-events-none z-0" />

        {/* Layer A: Giant Logo Text (Behind the truck, z-15) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
          <motion.div
            style={{
              y: textY,
              scale: textScale,
              opacity: textOpacity,
            }}
            className="flex flex-col items-center justify-center text-center px-4"
          >
            {/* Elegant brand symbol that rises with the text */}
            <svg className="w-10 h-10 md:w-14 md:h-14 text-[#FF4500] fill-current mb-3 filter drop-shadow-[0_0_15px_rgba(255,69,0,0.3)]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C11.5 2 6 5.5 2.5 10C1 12 1 14 2 15C3 16 5 16.5 7 15.5C9 14.5 12.5 11 14.5 9.5C14.5 9.5 11.5 11 9 12C7 12.8 5 13 4 12C3 11 4.5 9 6.5 8C9.5 6.5 13.5 5 17 4.5C21 4 23 2.5 23 2.5C23 2.5 18 2 12 2Z"/>
              <path d="M11.5 7.5C10 8 7 9.5 5.5 11C4.5 12 5.5 12 6.5 11.5C8 10.8 11.5 9 13.5 8C15 7.2 16.5 6.8 17.5 6.5C15 6.8 13 7 11.5 7.5Z"/>
            </svg>
            <TextMorph 
              words="VANTRA\nLOGISTICS"
              color="#FFFFFF"
              font={{
                fontFamily: "var(--font-brolimo), sans-serif",
                fontWeight: "normal",
                fontSize: "11vw",
                letterSpacing: "0.02em",
                lineHeight: "1em",
                textAlign: "center",
              }}
              transition={{
                type: "tween",
                duration: 0.6,
                delay: 2.4,
                ease: "easeInOut",
              }}
              className="w-[90vw] h-[15vw] flex items-center justify-center filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] font-black uppercase"
            />
          </motion.div>
        </div>

        {/* Layer B: The Heavy Truck (In front of the text, z-30) - Completely Static */}
        <div 
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none z-30"
          style={{
            bottom: 'var(--truck-bottom)',
            transform: 'var(--truck-transform, none)',
          } as React.CSSProperties}
        >
          {/* Inject inline custom responsive styling using CSS variables mapped from the easy config */}
          <style dangerouslySetInnerHTML={{ __html: `
            #truck-reveal-section {
              --truck-bottom: ${TRUCK_CONFIG.bottomOffsetMobile}px;
              --truck-width: ${TRUCK_CONFIG.widthMobile};
              --truck-transform: translateY(-22%);
            }
            @media (min-width: 640px) {
              #truck-reveal-section {
                --truck-bottom: ${TRUCK_CONFIG.bottomOffsetTablet}px;
                --truck-width: ${TRUCK_CONFIG.widthTablet};
                --truck-transform: none;
              }
            }
            @media (min-width: 1024px) {
              #truck-reveal-section {
                --truck-bottom: ${TRUCK_CONFIG.bottomOffsetDesktop}px;
                --truck-width: ${TRUCK_CONFIG.widthDesktop};
                --truck-transform: none;
              }
            }
          `}} />

          <TruckHoverReveal 
            style={{
              width: 'var(--truck-width)',
              maxWidth: `${TRUCK_CONFIG.maxWidth}px`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
