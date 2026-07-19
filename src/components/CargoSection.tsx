import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import { CONTAINER_TYPES } from '../constants';
import { ContainerId } from '../types';
import ChromaticHoverImage from './ChromaticHoverImage';
import BlurRevealText from './BlurRevealText';

interface CargoSectionProps {
  selectedContainer: ContainerId;
  setSelectedContainer: (id: ContainerId) => void;
  showSpecs: boolean;
  setShowSpecs: (show: boolean) => void;
  onPickUpClick: () => void;
}

export default function CargoSection({
  selectedContainer,
  setSelectedContainer,
  showSpecs,
  setShowSpecs,
  onPickUpClick
}: CargoSectionProps) {
  const currentContainer = CONTAINER_TYPES.find(c => c.id === selectedContainer);

  return (
    <section className="max-w-[1450px] mx-auto px-6 lg:px-12 py-24 w-full bg-[#0A0A0A] border-t border-[#121212] relative z-40 shrink-0 overflow-hidden" id="cargo-containers-section">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Content */}
        <div className="md:col-span-5 flex flex-col justify-center text-left">
          <h2 className="text-[36px] sm:text-[48px] md:text-[56px] font-light tracking-tight text-white mb-6 uppercase leading-[1.05]" id="cargo-containers-title">
            <BlurRevealText key={selectedContainer} text={currentContainer?.title || ''} />
          </h2>

          {/* Container descriptions */}
          <div className="min-h-[140px] mb-8" id="container-descriptions">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedContainer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <p className="text-[#D4D4D4] text-base md:text-lg leading-relaxed font-normal">
                  <BlurRevealText 
                    key={`desc1-${selectedContainer}`} 
                    text={currentContainer?.desc1 || ''} 
                    stagger={0.015} 
                    duration={0.4} 
                  />
                </p>
                <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed font-normal">
                  <BlurRevealText 
                    key={`desc2-${selectedContainer}`} 
                    text={currentContainer?.desc2 || ''} 
                    stagger={0.012} 
                    duration={0.4} 
                    delay={0.15} 
                  />
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-4" id="container-actions">
            <button
              id="pickup-container-btn"
              onClick={onPickUpClick}
              className="px-8 py-4 bg-[#E5E5E5] hover:bg-white text-black font-semibold text-sm rounded-[20px] transition-all duration-300 hover:scale-[1.02] shadow-lg cursor-pointer"
            >
              Pick up a Container
            </button>
            <button
              id="toggle-specs-btn"
              onClick={() => setShowSpecs(!showSpecs)}
              className={`w-[54px] h-[54px] rounded-[20px] flex items-center justify-center transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                showSpecs 
                  ? 'bg-[#FF4500] text-white shadow-lg shadow-[#FF4500]/20' 
                  : 'bg-[#E5E5E5] hover:bg-white text-black'
              }`}
              title="View Technical Specifications"
            >
              <Plus className={`w-6 h-6 transition-transform duration-300 ${showSpecs ? 'rotate-45' : ''}`} />
            </button>
          </div>

          {/* Interactive Specs Details Drawer */}
          <div className="relative overflow-hidden" id="specs-drawer-container">
            <AnimatePresence>
              {showSpecs && currentContainer && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="mt-8 p-5 rounded-[20px] bg-[#121212] border border-[#1A1A1A] max-w-[500px]"
                  id="specs-panel"
                >
                  <h4 className="text-xs font-mono text-[#FF4500] font-bold uppercase tracking-wider mb-4">
                    {currentContainer.tabLabel} Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs font-mono text-[#D4D4D4]">
                    <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                      <span className="text-[#737373]">External Length:</span>
                      <span className="text-white font-medium">
                        {currentContainer.specs.length}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                      <span className="text-[#737373]">External Width:</span>
                      <span className="text-white font-medium">
                        {currentContainer.specs.width}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                      <span className="text-[#737373]">External Height:</span>
                      <span className="text-white font-medium">
                        {currentContainer.specs.height}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-[#1A1A1A] pb-2">
                      <span className="text-[#737373]">Max Payload:</span>
                      <span className="text-[#FF4500] font-bold">
                        {currentContainer.specs.payload}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-between pt-1">
                      <span className="text-[#737373]">Cubic Capacity:</span>
                      <span className="text-white font-medium">
                        {currentContainer.specs.volume}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Dynamic Static Large Image with Premium Chromatic Aberration Hover Effect */}
        <div className="md:col-span-7 flex items-center justify-center relative min-h-[360px] md:min-h-[520px]" id="cargo-image-container">
          {/* Ambient backdrop orange radial light matching the high-contrast truck above */}
          <div className="absolute w-[80%] h-[80%] rounded-full bg-[#FF4500]/10 blur-[100px] pointer-events-none" id="cargo-ambient-glow"></div>
          
          <div
            className="relative w-full max-w-[620px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] z-10 flex justify-center items-center select-none"
            id="container-3d-model"
          >
            <ChromaticHoverImage 
              src="https://lh3.googleusercontent.com/d/162VPv7B-yn7A5ryFQg6o-1wB3X3kSVpr" 
              alt="Premium Cargo Container with Chromatic Aberration Effect"
              className="w-full max-h-[500px] pointer-events-auto"
              radius={160}
              maxOffset={20}
              lerpSpeed={0.08}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
