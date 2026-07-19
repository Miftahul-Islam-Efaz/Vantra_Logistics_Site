import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroAnimationProps {
  onComplete: () => void;
  onPanelsStart: () => void;
}

export default function IntroAnimation({ onComplete, onPanelsStart }: IntroAnimationProps) {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // Hide logo after 1.5 seconds, then the panels will animate out.
    const timer = setTimeout(() => {
      setShowLogo(false);
      onPanelsStart();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onPanelsStart]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none flex w-full h-full">
      {/* 4 Vertical Panels */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: showLogo ? '0%' : '-100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        className="w-1/4 h-full bg-[#FF4500] origin-top border-r border-[#FF5511]"
      />
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: showLogo ? '0%' : '100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.25 }}
        className="w-1/4 h-full bg-[#FF4500] origin-bottom border-r border-[#FF5511]"
      />
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: showLogo ? '0%' : '-100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
        className="w-1/4 h-full bg-[#FF4500] origin-top border-r border-[#FF5511]"
      />
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: showLogo ? '0%' : '100%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
        onAnimationComplete={() => {
          if (!showLogo) {
            onComplete();
          }
        }}
        className="w-1/4 h-full bg-[#FF4500] origin-bottom"
      />

      {/* Logo Container */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            {/* Logo */}
              <div className="flex items-center gap-3">
                <svg className="w-12 h-12 text-white fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C11.5 2 6 5.5 2.5 10C1 12 1 14 2 15C3 16 5 16.5 7 15.5C9 14.5 12.5 11 14.5 9.5C14.5 9.5 11.5 11 9 12C7 12.8 5 13 4 12C3 11 4.5 9 6.5 8C9.5 6.5 13.5 5 17 4.5C21 4 23 2.5 23 2.5C23 2.5 18 2 12 2Z"/>
                  <path d="M11.5 7.5C10 8 7 9.5 5.5 11C4.5 12 5.5 12 6.5 11.5C8 10.8 11.5 9 13.5 8C15 7.2 16.5 6.8 17.5 6.5C15 6.8 13 7 11.5 7.5Z"/>
                </svg>
                <div className="flex flex-col leading-[1.1]">
                  <span className="text-[26px] font-black tracking-widest text-white uppercase">Vantra</span>
                  <span className="text-[14px] font-semibold tracking-[0.18em] text-white/70 uppercase">Logistics</span>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
