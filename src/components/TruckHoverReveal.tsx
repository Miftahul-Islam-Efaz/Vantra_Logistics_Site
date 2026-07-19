import React, { useRef, useState } from 'react';

interface TruckHoverRevealProps {
  className?: string;
  style?: React.CSSProperties;
}

// Configurable thresholds & assets
const REVEAL_CONFIG = {
  // Edge entrance threshold (10%)
  edgeThreshold: 0.10,

  // Images
  sharpTruckUrl: "https://lh3.googleusercontent.com/d/11zLuLvsB-JdwSSjvSnnR-goxYfA1DPS4",
  blurredTruckUrl: "https://lh3.googleusercontent.com/d/1T5eT2fIog2_XgS59tU0cCd336a5wsXGr",

  // Lens settings
  lensSize: 180, // size in pixels
};

export default function TruckHoverReveal({ className, style }: TruckHoverRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = useState({ width: 1, height: 1 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setContainerSize({
      width: rect.width || 1,
      height: rect.height || 1,
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      });
      setContainerSize({
        width: rect.width || 1,
        height: rect.height || 1,
      });
    }
  };

  // Only open when the cursor enters the truck image by 10% on all edges as requested
  const isEffectActive = isHovering && 
    mousePos.x >= containerSize.width * REVEAL_CONFIG.edgeThreshold && 
    mousePos.x <= containerSize.width * (1 - REVEAL_CONFIG.edgeThreshold) &&
    mousePos.y >= containerSize.height * REVEAL_CONFIG.edgeThreshold &&
    mousePos.y <= containerSize.height * (1 - REVEAL_CONFIG.edgeThreshold);

  return (
    <div 
      ref={containerRef}
      className={`relative flex flex-col items-center pointer-events-auto cursor-default select-none ${className || ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchMove={handleTouchMove}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={() => setIsHovering(false)}
      style={style}
    >
      {/* Ground Shadow precisely beneath wheels to weld the truck into the void */}
      <div className="absolute bottom-[8%] left-[10%] right-[10%] h-[24px] bg-black/95 blur-xl rounded-full mix-blend-multiply z-10 pointer-events-none" />
      
      {/* 1. Sharp Original Truck Image (Behind, revealed on hover) */}
      <img 
        src={REVEAL_CONFIG.sharpTruckUrl} 
        alt="Vantra heavy truck" 
        className="w-full h-auto object-contain relative z-20 filter brightness-[1.05] drop-shadow-[0_25px_40px_rgba(0,0,0,0.95)] pointer-events-none"
      />

      {/* 2. Blurred Truck Image (Overlay, hides the sharp one until hovered) */}
      <img 
        src={REVEAL_CONFIG.blurredTruckUrl} 
        alt="Vantra heavy truck blur" 
        className="w-full h-auto object-contain absolute top-0 left-0 pointer-events-none"
        style={{
          zIndex: 25,
          // Mask has 100% transparency (0% to 80% of lens radius) for a crystal-clear sharp look inside the lens area,
          // transitioning to 100% opaque black at 100% radius so the blur is strictly observed only right at the transition edges!
          maskImage: isEffectActive 
            ? `radial-gradient(circle ${REVEAL_CONFIG.lensSize / 2}px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 80%, black 100%)`
            : 'none',
          WebkitMaskImage: isEffectActive 
            ? `radial-gradient(circle ${REVEAL_CONFIG.lensSize / 2}px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, transparent 80%, black 100%)`
            : 'none',
        }}
      />
    </div>
  );
}
