import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useScroll } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { HERO_CONFIG } from '../config';
import VariableFontCursorProximity from './VariableFontCursorProximity';

interface HeroSectionProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  introComplete: boolean;
  introStarted: boolean;
}

export default function HeroSection({ containerRef, introComplete, introStarted }: HeroSectionProps) {
  const heroBlockRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<'shipments' | 'countries' | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse position tracking for ultra-premium 3D parallax on desktop
  const mouseX = useSpring(0, { stiffness: 100, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroBlockRef.current) return;
    const rect = heroBlockRef.current.getBoundingClientRect();
    // Normalize coordinates to -0.5 to 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Combine scroll parallax for mobile/scrolling contexts with mouse-move parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background Parallax: slower movement, subtle depth
  const scrollBgY = useTransform(scrollYProgress, [0, 1], HERO_CONFIG.background.scrollYRange);
  const mouseBgX = useTransform(mouseX, [-0.5, 0.5], HERO_CONFIG.background.mouseXRange);
  const mouseBgY = useTransform(mouseY, [-0.5, 0.5], HERO_CONFIG.background.mouseYRange);

  // Truck Parallax: moves opposite to background to create high-contrast 3D pop-out
  const scrollTruckY = useTransform(scrollYProgress, [0, 1], HERO_CONFIG.truck.scrollYRange);
  const mouseTruckX = useTransform(mouseX, [-0.5, 0.5], HERO_CONFIG.truck.mouseXRange);
  const mouseTruckY = useTransform(mouseY, [-0.5, 0.5], HERO_CONFIG.truck.mouseYRange);

  return (
    <>
      {/* SVG Clip Path Definitions for top-right hump tab and organic rounded corners */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="hero-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.20
                     C 0,0.14 0.02,0.12 0.06,0.12
                     L 0.65,0.12
                     C 0.69,0.12 0.71,0 0.76,0
                     L 0.94,0
                     C 0.98,0 1,0.04 1,0.12
                     L 1,0.88
                     C 1,0.96 0.98,1 0.94,1
                     L 0.06,1
                     C 0.02,1 0,0.96 0,0.88
                     Z" />
          </clipPath>
          <clipPath id="hero-clip-mobile" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.60
                     C 0,0.54 0.02,0.52 0.06,0.52
                     L 0.65,0.52
                     C 0.69,0.52 0.71,0.45 0.76,0.45
                     L 0.94,0.45
                     C 0.98,0.45 1,0.49 1,0.57
                     L 1,0.88
                     C 1,0.96 0.98,1 0.94,1
                     L 0.06,1
                     C 0.02,1 0,0.96 0,0.88
                     Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Main Content Area: Responsive flex layout with top padding matching fixed header height */}
      <main className="max-w-[1450px] mx-auto px-6 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-6 flex-1 flex flex-col justify-between w-full min-h-0">
        {/* Dynamic Typography - Sized perfectly so it never crowds out the screen */}
        <div id="hero-title" className="mb-2 sm:mb-8 md:mb-12 lg:mb-16 xl:mb-20 shrink-0 transform translate-y-[12vh] sm:translate-y-0">
          <VariableFontCursorProximity
            label="Freight that doesn't wait."
            className="text-[33.6px] sm:text-[44.1px] md:text-[52.5px] lg:text-[60.9px] xl:text-[69.3px] leading-[1.08] tracking-[-0.03em] max-w-[892.5px] text-left text-white"
            fromWeight={400}
            toWeight={900}
            strength={35}
            fontFamily="'Patriot', sans-serif"
            startAnimation={introComplete}
          />
        </div>

        {/* Hero Visual Block - Responsive flexible height container */}
        <div 
          ref={heroBlockRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full flex-1 min-h-[220px] xs:min-h-[240px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[480px] xl:min-h-[520px] max-h-[600px]" 
          id="hero-block"
        >
          
          {/* Layer 1: The Charcoal Base Container (Clipped to Custom Tab Silhouette) */}
          <div 
            className="absolute inset-0 overflow-hidden bg-[#121212] z-10 hero-clip-container"
          >
            {/* Smooth Vignette Gradient to blend the left/bottom/top naturally without hiding the background image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/60 to-transparent z-15 w-[35%] lg:w-[25%] pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/40 to-transparent z-15 pointer-events-none"></div>
            
            {/* Parallax Background: Anchored to bottom edge of visual block */}
            <motion.div 
              className="absolute inset-0 w-full h-[112%] -top-[6%]"
              style={{ y: scrollBgY }}
            >
              <motion.div 
                className="w-full h-full"
                style={{ x: mouseBgX, y: mouseBgY }}
              >
                <img 
                  src={HERO_CONFIG.background.url} 
                  alt="Tunnel infrastructure" 
                  style={{
                    transform: `scale(${HERO_CONFIG.background.scale})`,
                    transformOrigin: 'bottom',
                    opacity: HERO_CONFIG.background.opacity,
                  }}
                  className={`w-full h-full object-cover object-bottom ${HERO_CONFIG.background.blendMode}`}
                />
              </motion.div>
            </motion.div>

            {/* Custom SVG Border Overlay for 3D tab silhouette layout (All screens - Synced exactly to clipPath) */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-20 block"
              viewBox="0 0 1 1"
              preserveAspectRatio="none"
            >
              <path 
                d={isMobile ? 
                  "M 0,0.60 C 0,0.54 0.02,0.52 0.06,0.52 L 0.65,0.52 C 0.69,0.52 0.71,0.45 0.76,0.45 L 0.94,0.45 C 0.98,0.45 1,0.49 1,0.57 L 1,0.88 C 1,0.96 0.98,1 0.94,1 L 0.06,1 C 0.02,1 0,0.96 0,0.88 Z" :
                  "M 0,0.20 C 0,0.14 0.02,0.12 0.06,0.12 L 0.65,0.12 C 0.69,0.12 0.71,0 0.76,0 L 0.94,0 C 0.98,0 1,0.04 1,0.12 L 1,0.88 C 1,0.96 0.98,1 0.94,1 L 0.06,1 C 0.02,1 0,0.96 0,0.88 Z"
                }
                fill="none" 
                stroke="#1A1A1A" 
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Layer 2: The Pitch Black Cutout for descriptions - Above the truck image now! */}
          <div className="absolute bottom-[-1px] left-[-1px] w-[60px] sm:w-[270px] lg:w-[310px] h-[46px] sm:h-[220px] lg:h-[250px] bg-[#0A0A0A] rounded-tr-[16px] sm:rounded-tr-[48px] md:rounded-tr-[64px] rounded-bl-[16px] sm:rounded-bl-[48px] md:rounded-bl-[64px] z-45 flex flex-col justify-between p-1 sm:p-5 lg:p-6 border-r border-t border-[#121212]" id="desc-cutout">
             <div>
                <p className="text-[#A3A3A3] text-[4.7px] xs:text-[5.5px] sm:text-[12.5px] lg:text-[13px] leading-[1.2] sm:leading-[1.5] mb-0.5 sm:mb-2.5 font-normal tracking-tight">
                   <span className="sm:inline hidden">Our logistics services are designed for speed, precision, and trust.</span>
                   <span className="inline sm:hidden">Speed, precision & trust.</span>
                </p>
                <p className="text-[#A3A3A3] text-[4.7px] xs:text-[5.5px] sm:text-[12.5px] lg:text-[13px] leading-[1.2] sm:leading-[1.5] font-normal tracking-tight">
                   <span className="sm:inline hidden">Get reliable solutions you can depend on, all globally connected.</span>
                   <span className="inline sm:hidden">Globally connected.</span>
                </p>
             </div>
             {/* Premium Orange Circular Action Button placed elegantly below the text description inside the cutout */}
             <div className="mt-0.5 sm:mt-3 flex justify-start">
                <button className="w-[12px] h-[12px] xs:w-[14px] xs:h-[14px] sm:w-[44px] sm:h-[44px] lg:w-[48px] lg:h-[48px] bg-[#FF4500] rounded-full flex items-center justify-center hover:scale-105 hover:bg-[#ff5511] transition-all duration-300 text-white shadow-xl shadow-[#FF4500]/25 group cursor-pointer" id="action-btn">
                   <ArrowUpRight className="w-2 h-2 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:rotate-45 transition-transform duration-300" />
                </button>
             </div>
          </div>

          {/* Custom Inverted Corner at bottom-right of cutout */}
          <div className="absolute bottom-[-1px] left-[59px] sm:left-[269px] lg:left-[309px] w-[12px] sm:w-[32px] h-[12px] sm:h-[32px] pointer-events-none z-50">
             <svg className="w-full h-full" viewBox="0 0 32 32">
                <path d="M 0,0 A 32,32 0 0,0 32,32 L 0,32 Z" fill="#0A0A0A" />
                <path d="M 0,0 A 32,32 0 0,0 32,32" fill="none" stroke="#121212" strokeWidth="1" />
             </svg>
          </div>

          {/* Custom Inverted Corner at top-left of cutout */}
          <div className="absolute bottom-[45px] sm:bottom-[219px] lg:bottom-[249px] left-[-1px] w-[12px] sm:w-[32px] h-[12px] sm:h-[32px] pointer-events-none z-50">
             <svg className="w-full h-full" viewBox="0 0 32 32">
                <path d="M 0,0 A 32,32 0 0,0 32,32 L 0,32 Z" fill="#0A0A0A" />
                <path d="M 0,0 A 32,32 0 0,0 32,32" fill="none" stroke="#121212" strokeWidth="1" />
             </svg>
          </div>

          {/* Layer 3: The Heavy Truck - Grounded, much larger, and firmly sitting on the road */}
          <motion.div 
            initial={{ x: '-40vw', opacity: 0 }}
            animate={{ x: introStarted ? 0 : '-40vw', opacity: introStarted ? 1 : 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`absolute z-40 pointer-events-none flex flex-col items-center ${HERO_CONFIG.truck.leftMobile} ${HERO_CONFIG.truck.leftSm} ${HERO_CONFIG.truck.leftLg} ${HERO_CONFIG.truck.leftXl} ${HERO_CONFIG.truck.positionMobile} ${HERO_CONFIG.truck.positionSm} ${HERO_CONFIG.truck.positionLg} ${HERO_CONFIG.truck.positionXl} ${HERO_CONFIG.truck.widthMobile} ${HERO_CONFIG.truck.widthSm} ${HERO_CONFIG.truck.widthLg} ${HERO_CONFIG.truck.widthXl} ${HERO_CONFIG.truck.maxWidth}`}
            id="parallax-truck"
          >
            <motion.div
              style={{ 
                x: mouseTruckX, 
                y: mouseTruckY, 
                translateY: scrollTruckY 
              }}
              className="w-full h-full flex flex-col items-center relative"
            >
              {/* Immersive radial wheel shadow to physically ground the truck on the asphalt road */}
              <div className={`absolute ${HERO_CONFIG.truck.shadow.bottomMobile} ${HERO_CONFIG.truck.shadow.bottomSm} ${HERO_CONFIG.truck.shadow.left} ${HERO_CONFIG.truck.shadow.right} ${HERO_CONFIG.truck.shadow.heightMobile} ${HERO_CONFIG.truck.shadow.heightSm} ${HERO_CONFIG.truck.shadow.opacity} ${HERO_CONFIG.truck.shadow.blur} rounded-full mix-blend-multiply z-10`}></div>
              
              <img 
                src={HERO_CONFIG.truck.url} 
                alt="Heavy Duty Freight Truck" 
                className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.95)] filter brightness-[1.03] z-20"
              />
            </motion.div>
          </motion.div>

          {/* Layer 4: Elegant, ultra-compact Stats Cards with synchronized hover-color swapping */}
          <div 
            className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 z-50 flex flex-col sm:flex-row gap-3 pointer-events-none" 
            id="stats-container"
          >
             {/* Orange Card (becomes White with orange text on hover) */}
             <motion.div 
               whileHover={{ y: -8 }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               onMouseEnter={() => setHoveredCard('shipments')}
               onMouseLeave={() => setHoveredCard(null)}
               className="w-[43px] sm:w-[120px] lg:w-[150px] cursor-pointer group pointer-events-auto"
               id="stat-shipments"
             >
                {/* Folder Tab Design */}
                <div className="flex justify-end mb-[-1.5px] relative z-10">
                   <div className={`w-[70%] h-[3px] sm:h-1.5 lg:h-3.5 rounded-t-[2px] sm:rounded-t-[4px] lg:rounded-t-lg transition-colors duration-300 ${hoveredCard === 'shipments' ? 'bg-white' : 'bg-[#FF4500]'}`}></div>
                </div>
                {/* Main Card Body */}
                <div className={`p-1 sm:p-1.5 lg:p-3.5 rounded-b-[5px] sm:rounded-b-[8px] lg:rounded-b-[20px] rounded-tl-[5px] sm:rounded-tl-[8px] lg:rounded-tl-[20px] flex flex-col justify-between h-[33px] sm:h-[100px] lg:h-[120px] transition-all duration-300 ${hoveredCard === 'shipments' ? 'bg-white shadow-2xl shadow-black/30' : 'bg-[#FF4500] shadow-lg shadow-[#FF4500]/15'}`}>
                   <p className={`text-[4px] xs:text-[4.7px] sm:text-[11px] lg:text-[13px] font-medium leading-[1.1] transition-colors duration-300 ${hoveredCard === 'shipments' ? 'text-[#FF4500]/90' : 'text-white/95'}`}>Shipments<br/>Delivered</p>
                   <p className={`text-[8.5px] sm:text-2xl lg:text-[32px] font-bold text-right tracking-tight leading-none transition-colors duration-300 ${hoveredCard === 'shipments' ? 'text-[#FF4500]' : 'text-white'}`}>20k+</p>
                </div>
             </motion.div>

             {/* White Card (becomes Orange with white text on hover of shipments) */}
             <motion.div 
               whileHover={{ y: -8 }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               onMouseEnter={() => setHoveredCard('countries')}
               onMouseLeave={() => setHoveredCard(null)}
               className="w-[100px] sm:w-[120px] lg:w-[150px] cursor-pointer hidden sm:block group pointer-events-auto"
               id="stat-countries"
             >
                {/* Folder Tab Design */}
                <div className="flex justify-end mb-[-1.5px] relative z-10">
                   <div className={`w-[70%] h-2.5 lg:h-3.5 rounded-t-md lg:rounded-t-lg transition-colors duration-300 ${hoveredCard === 'shipments' ? 'bg-[#FF4500]' : 'bg-white'}`}></div>
                </div>
                {/* Main Card Body */}
                <div className={`p-2.5 lg:p-3.5 rounded-b-[12px] lg:rounded-b-[20px] rounded-tl-[12px] lg:rounded-tl-[20px] flex flex-col justify-between h-[85px] sm:h-[100px] lg:h-[120px] transition-all duration-300 ${hoveredCard === 'shipments' ? 'bg-[#FF4500] shadow-lg shadow-[#FF4500]/25' : hoveredCard === 'countries' ? 'bg-white shadow-2xl shadow-black/55 border border-gray-100/10' : 'bg-white shadow-xl shadow-black/35'}`}>
                   <p className={`text-[9px] sm:text-[11px] lg:text-[13px] font-medium leading-tight transition-colors duration-300 ${hoveredCard === 'shipments' ? 'text-white/95' : 'text-[#121212]/80'}`}>Countries<br/>Covered</p>
                   <p className={`text-xl sm:text-2xl lg:text-[32px] font-bold text-right tracking-tight leading-none transition-colors duration-300 ${hoveredCard === 'shipments' ? 'text-white' : 'text-[#121212]'}`}>24k+</p>
                </div>
             </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
