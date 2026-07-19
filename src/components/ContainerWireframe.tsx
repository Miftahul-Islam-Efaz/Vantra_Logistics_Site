import React, { useEffect, useState, useRef } from 'react';
import { animate, useInView } from 'motion/react';

interface ContainerWireframeProps {
  type: '20dc' | '40dc' | '40hc';
  delay?: number;
}

export default function ContainerWireframe({ type, delay = 0.1 }: ContainerWireframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Animation states
  const [lengthScale, setLengthScale] = useState(0.4);
  const [heightScale, setHeightScale] = useState(0.3);
  const [blueprintDraw, setBlueprintDraw] = useState(1); // 1 to 0 (strokeDashoffset multiplier)
  const [solidWipe, setSolidWipe] = useState(0); // 0 to 1
  const [ribsWipe, setRibsWipe] = useState(0); // 0 to 1
  const [blueprintOpacity, setBlueprintOpacity] = useState(1);

  // Targets
  const targetLength = type === '20dc' ? 1.0 : 1.55;
  const targetHeight = type === '40hc' ? 1.15 : 1.0;

  useEffect(() => {
    if (!isInView) return;

    // Orchestrate high-end multi-stage professional animation timeline
    const controls: any[] = [];

    // Stage 1: Blueprint wireframe draw-in (0.0s - 0.7s)
    controls.push(
      animate(1, 0, {
        duration: 0.9,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
        onUpdate: (latest) => setBlueprintDraw(latest),
      })
    );

    // Stage 2: Data-driven scale morph (0.3s - 1.3s)
    controls.push(
      animate(0.4, targetLength, {
        duration: 1.1,
        delay: delay + 0.25,
        ease: [0.25, 1, 0.5, 1], // premium spring-like easeOutQuart
        onUpdate: (latest) => setLengthScale(latest),
      })
    );

    controls.push(
      animate(0.3, targetHeight, {
        duration: 1.2,
        delay: delay + 0.2,
        ease: [0.25, 1, 0.5, 1],
        onUpdate: (latest) => setHeightScale(latest),
      })
    );

    // Stage 3: Panels fill-in solid left-to-right (0.6s - 1.5s)
    controls.push(
      animate(0, 1.3, {
        duration: 1.1,
        delay: delay + 0.5,
        ease: [0.33, 1, 0.68, 1],
        onUpdate: (latest) => setSolidWipe(latest),
      })
    );

    // Stage 4: Ribbed textures reveal via directional mask wipe (0.8s - 1.7s)
    controls.push(
      animate(0, 1.3, {
        duration: 1.0,
        delay: delay + 0.7,
        ease: [0.33, 1, 0.68, 1],
        onUpdate: (latest) => setRibsWipe(latest),
      })
    );

    // Stage 5: Gently blend out glowing blueprint lines into clean ash (1.1s - 1.8s)
    controls.push(
      animate(1, 0, {
        duration: 0.7,
        delay: delay + 0.9,
        ease: 'easeInOut',
        onUpdate: (latest) => setBlueprintOpacity(latest),
      })
    );

    return () => {
      controls.forEach((c) => c.stop());
    };
  }, [isInView, targetLength, targetHeight, delay]);

  // Coordinate math for 3D parallel isometric projection
  const L = lengthScale;
  const H = heightScale;

  const bottom_fm = { x: 42, y: 105 };
  const bottom_lm = { x: bottom_fm.x - 30, y: bottom_fm.y - 12 };
  const bottom_rm = { x: bottom_fm.x + L * 73, y: bottom_fm.y - L * 23 };
  const bottom_tb = { x: bottom_lm.x + L * 73, y: bottom_lm.y - L * 23 };

  const top_fm = { x: bottom_fm.x, y: bottom_fm.y - H * 40 };
  const top_lm = { x: bottom_lm.x, y: bottom_lm.y - H * 40 };
  const top_rm = { x: bottom_rm.x, y: bottom_rm.y - H * 40 };
  const top_tb = { x: bottom_tb.x, y: bottom_tb.y - H * 40 };

  // Ribs (vertical lines along the side)
  const N_ribs = type === '20dc' ? 12 : 24;
  const ribsPoints = [];
  for (let i = 1; i < N_ribs; i++) {
    const t = i / N_ribs;
    const topX = top_fm.x + t * (top_rm.x - top_fm.x);
    const topY = top_fm.y + t * (top_rm.y - top_fm.y);
    const botX = bottom_fm.x + t * (bottom_rm.x - bottom_fm.x);
    const botY = bottom_fm.y + t * (bottom_rm.y - bottom_fm.y);
    ribsPoints.push({ x1: topX, y1: topY, x2: botX, y2: botY });
  }

  // Roof Ribs (lines across the ceiling)
  const roofPoints = [];
  for (let i = 1; i < N_ribs; i++) {
    const t = i / N_ribs;
    const r1x = top_lm.x + t * (top_tb.x - top_lm.x);
    const r1y = top_lm.y + t * (top_tb.y - top_lm.y);
    const r2x = top_fm.x + t * (top_rm.x - top_fm.x);
    const r2y = top_fm.y + t * (top_rm.y - top_fm.y);
    roofPoints.push({ x1: r1x, y1: r1y, x2: r2x, y2: r2y });
  }

  // Door split and locking rods on the left face
  const doorSplit = {
    x1: (top_lm.x + top_fm.x) / 2,
    y1: (top_lm.y + top_fm.y) / 2,
    x2: (bottom_lm.x + bottom_fm.x) / 2,
    y2: (bottom_lm.y + bottom_fm.y) / 2,
  };

  const rodLeft = {
    x1: doorSplit.x1 - 3.5,
    y1: doorSplit.y1 - 1,
    x2: doorSplit.x2 - 3.5,
    y2: doorSplit.y2 + 1,
  };

  const rodRight = {
    x1: doorSplit.x1 + 3.5,
    y1: doorSplit.y1 + 1,
    x2: doorSplit.x2 + 3.5,
    y2: doorSplit.y2 - 1,
  };

  // Convert points to SVG string helpers
  const getPointsString = (...pts: { x: number; y: number }[]) =>
    pts.map((p) => `${p.x},${p.y}`).join(' ');

  // Unique clip & mask IDs to avoid overlapping instances
  const solidMaskId = `solid-mask-${type}`;
  const ribsMaskId = `ribs-mask-${type}`;

  // Color stop percentages for mask wipes
  const solidStop1 = Math.max(0, Math.min(100, (solidWipe - 0.2) * 100));
  const solidStop2 = Math.max(0, Math.min(100, solidWipe * 100));

  const ribsStop1 = Math.max(0, Math.min(100, (ribsWipe - 0.15) * 100));
  const ribsStop2 = Math.max(0, Math.min(100, ribsWipe * 100));

  return (
    <div
      ref={containerRef}
      className="w-[150px] h-[100px] flex items-center justify-center relative select-none pointer-events-none"
      id={`container-wireframe-wrapper-${type}`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 170 115"
        className="w-full h-auto block"
        id={`container-svg-${type}`}
      >
        <defs>
          {/* Solid fill gradient mask (left-to-right wipe) */}
          <linearGradient id={solidMaskId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" />
            <stop offset={`${solidStop1}%`} stopColor="white" />
            <stop offset={`${solidStop2}%`} stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Ribs texture gradient mask (directional wipe) */}
          <linearGradient id={ribsMaskId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" />
            <stop offset={`${ribsStop1}%`} stopColor="white" />
            <stop offset={`${ribsStop2}%`} stopColor="transparent" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* ==========================================
            LAYER 1: SOLID ASH PANEL FILLS (The "Solid" Build)
            ========================================== */}
        <g mask={`url(#${solidMaskId})`}>
          {/* Left Door Face Solid Fill */}
          <polygon
            points={getPointsString(top_lm, top_fm, bottom_fm, bottom_lm)}
            fill="#121212"
            id={`solid-left-fill-${type}`}
          />
          {/* Right Long Side Solid Fill */}
          <polygon
            points={getPointsString(top_fm, top_rm, bottom_rm, bottom_fm)}
            fill="#141414"
            id={`solid-right-fill-${type}`}
          />
          {/* Roof Solid Fill */}
          <polygon
            points={getPointsString(top_lm, top_tb, top_rm, top_fm)}
            fill="#181818"
            id={`solid-top-fill-${type}`}
          />
        </g>

        {/* ==========================================
            LAYER 2: SOLID GREY STRUCTURAL OUTLINES
            ========================================== */}
        <g mask={`url(#${solidMaskId})`}>
          {/* Left Door Face Outline */}
          <polygon
            points={getPointsString(top_lm, top_fm, bottom_fm, bottom_lm)}
            fill="none"
            stroke="#999999"
            strokeWidth="1.2"
            id={`outline-left-${type}`}
          />
          {/* Right Long Face Outline */}
          <polygon
            points={getPointsString(top_fm, top_rm, bottom_rm, bottom_fm)}
            fill="none"
            stroke="#888888"
            strokeWidth="1.2"
            id={`outline-right-${type}`}
          />
          {/* Top Face Outline */}
          <polygon
            points={getPointsString(top_lm, top_tb, top_rm, top_fm)}
            fill="none"
            stroke="#666666"
            strokeWidth="1"
            id={`outline-top-${type}`}
          />

          {/* Door split line */}
          <line
            x1={doorSplit.x1}
            y1={doorSplit.y1}
            x2={doorSplit.x2}
            y2={doorSplit.y2}
            stroke="#666666"
            strokeWidth="1"
          />

          {/* Locking Rods */}
          <line
            x1={rodLeft.x1}
            y1={rodLeft.y1}
            x2={rodLeft.x2}
            y2={rodLeft.y2}
            stroke="#888888"
            strokeWidth="0.8"
          />
          <line
            x1={rodRight.x1}
            y1={rodRight.y1}
            x2={rodRight.x2}
            y2={rodRight.y2}
            stroke="#888888"
            strokeWidth="0.8"
          />

          {/* Outer corner vertical lines for structural depth */}
          <line x1={top_lm.x} y1={top_lm.y} x2={bottom_lm.x} y2={bottom_lm.y} stroke="#888888" strokeWidth="1" />
          <line x1={top_fm.x} y1={top_fm.y} x2={bottom_fm.x} y2={bottom_fm.y} stroke="#B0B0B0" strokeWidth="1.5" />
          <line x1={top_rm.x} y1={top_rm.y} x2={bottom_rm.x} y2={bottom_rm.y} stroke="#888888" strokeWidth="1" />
        </g>

        {/* ==========================================
            LAYER 3: RIBBED CORRUGATION TEXTURES (Wipe Revealed)
            ========================================== */}
        <g mask={`url(#${ribsMaskId})`}>
          {/* Vertical Ribs */}
          {ribsPoints.map((pt, i) => (
            <line
              key={`solid-rib-${i}`}
              x1={pt.x1}
              y1={pt.y1}
              x2={pt.x2}
              y2={pt.y2}
              stroke="#4B4B4B"
              strokeWidth="1.1"
            />
          ))}

          {/* Roof Ribs */}
          {roofPoints.map((pt, i) => (
            <line
              key={`solid-roof-rib-${i}`}
              x1={pt.x1}
              y1={pt.y1}
              x2={pt.x2}
              y2={pt.y2}
              stroke="#3A3A3A"
              strokeWidth="0.8"
            />
          ))}
        </g>

        {/* ==========================================
            LAYER 4: HIGH-END GLOWING BLUEPRINT WIREFRAME
            ========================================== */}
        {blueprintOpacity > 0.01 && (
          <g
            opacity={blueprintOpacity}
            strokeDasharray="200"
            strokeDashoffset={200 * blueprintDraw}
            strokeLinecap="round"
          >
            {/* Cyan structural grid outlines (Feels high-tech / engineered) */}
            <polygon
              points={getPointsString(top_lm, top_fm, bottom_fm, bottom_lm)}
              fill="none"
              stroke="#00F3FF"
              strokeWidth="1.2"
              id={`blueprint-left-${type}`}
            />
            <polygon
              points={getPointsString(top_fm, top_rm, bottom_rm, bottom_fm)}
              fill="none"
              stroke="#00F3FF"
              strokeWidth="1.2"
              id={`blueprint-right-${type}`}
            />
            <polygon
              points={getPointsString(top_lm, top_tb, top_rm, top_fm)}
              fill="none"
              stroke="#00C0FF"
              strokeWidth="0.8"
              id={`blueprint-top-${type}`}
            />

            {/* Glowing Orange Technical Highlights (Locking Rods / High contrast) */}
            <line
              x1={rodLeft.x1}
              y1={rodLeft.y1}
              x2={rodLeft.x2}
              y2={rodLeft.y2}
              stroke="#FF4500"
              strokeWidth="1.1"
              id={`blueprint-rod-l-${type}`}
            />
            <line
              x1={rodRight.x1}
              y1={rodRight.y1}
              x2={rodRight.x2}
              y2={rodRight.y2}
              stroke="#FF4500"
              strokeWidth="1.1"
              id={`blueprint-rod-r-${type}`}
            />

            {/* Blueprint Corrugations (drawn at 35% opacity to avoid cluttering blueprint stage) */}
            <g opacity="0.4">
              {ribsPoints.map((pt, i) => (
                <line
                  key={`blueprint-rib-${i}`}
                  x1={pt.x1}
                  y1={pt.y1}
                  x2={pt.x2}
                  y2={pt.y2}
                  stroke="#00F3FF"
                  strokeWidth="0.8"
                />
              ))}
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
