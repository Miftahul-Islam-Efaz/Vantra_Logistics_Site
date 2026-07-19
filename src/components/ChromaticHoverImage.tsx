import React, { useRef, useEffect, useState } from 'react';

interface ChromaticHoverImageProps {
  src: string;
  alt: string;
  className?: string;
  radius?: number;
  maxOffset?: number;
  lerpSpeed?: number;
}

export default function ChromaticHoverImage({
  src,
  alt,
  className = '',
  radius = 160,
  maxOffset = 18,
  lerpSpeed = 0.08,
}: ChromaticHoverImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse positions
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const isInsideRef = useRef(false);

  // Cache for pixel processing
  const originalDataRef = useRef<ImageData | null>(null);
  const prevBoxRef = useRef<{ x: number; y: number; w: number; h: number } | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Load image and setup canvas
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.src = src;

    img.onload = () => {
      imageRef.current = img;
      // Get appropriate display dimensions maintaining aspect ratio
      const container = containerRef.current;
      if (!container) return;

      const containerWidth = container.clientWidth || 600;
      const aspectRatio = img.naturalHeight / img.naturalWidth;
      const calculatedHeight = containerWidth * aspectRatio;

      setDimensions({
        width: containerWidth,
        height: calculatedHeight,
      });
    };
  }, [src]);

  // Handle resizing or dimension updates
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img || dimensions.width === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Draw initial clean image
    ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

    // Capture original pixel data on an offscreen canvas
    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = dimensions.width;
    offscreenCanvas.height = dimensions.height;
    const offCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });
    if (offCtx) {
      offCtx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
      originalDataRef.current = offCtx.getImageData(0, 0, dimensions.width, dimensions.height);
    }

    // Reset previous frame tracking
    prevBoxRef.current = null;
  }, [dimensions]);

  // Main rendering loop for hover effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx || !originalDataRef.current) return;

    const originalData = originalDataRef.current;
    const { width, height } = dimensions;

    const render = () => {
      // Lerp current position to target mouse position
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      const dxPos = targetX - currentPosRef.current.x;
      const dyPos = targetY - currentPosRef.current.y;

      // Update positions with premium spring-like easing
      currentPosRef.current.x += dxPos * lerpSpeed;
      currentPosRef.current.y += dyPos * lerpSpeed;

      // Restore previous modified bounding box to pristine state
      if (prevBoxRef.current) {
        const { x, y, w, h } = prevBoxRef.current;
        // Create matching pristine image data block from cached original data
        const restoreData = ctx.createImageData(w, h);
        for (let row = 0; row < h; row++) {
          for (let col = 0; col < w; col++) {
            const origX = x + col;
            const origY = y + row;
            if (origX >= 0 && origX < width && origY >= 0 && origY < height) {
              const origIdx = (origY * width + origX) * 4;
              const targetIdx = (row * w + col) * 4;
              restoreData.data[targetIdx] = originalData.data[origIdx];
              restoreData.data[targetIdx + 1] = originalData.data[origIdx + 1];
              restoreData.data[targetIdx + 2] = originalData.data[origIdx + 2];
              restoreData.data[targetIdx + 3] = originalData.data[origIdx + 3];
            }
          }
        }
        ctx.putImageData(restoreData, x, y);
      }

      // If hovered, calculate and apply chromatic aberration inside the active bounding box
      if (isInsideRef.current) {
        const cx = currentPosRef.current.x;
        const cy = currentPosRef.current.y;

        // Bounding box of the effect radius
        const startX = Math.max(0, Math.floor(cx - radius));
        const startY = Math.max(0, Math.floor(cy - radius));
        const endX = Math.min(width, Math.ceil(cx + radius));
        const endY = Math.min(height, Math.ceil(cy + radius));

        const rectW = endX - startX;
        const rectH = endY - startY;

        if (rectW > 0 && rectH > 0) {
          const boxData = ctx.createImageData(rectW, rectH);

          for (let row = 0; row < rectH; row++) {
            for (let col = 0; col < rectW; col++) {
              const x = startX + col;
              const y = startY + row;

              const dx = x - cx;
              const dy = y - cy;
              const distSq = dx * dx + dy * dy;
              const rSq = radius * radius;

              const targetIdx = (row * rectW + col) * 4;

              if (distSq < rSq) {
                const dist = Math.sqrt(distSq);
                // Radial strength peaks in a ring or custom profile. Let's make it peak at 30% out and smoothly fade to 0 at edge
                const progress = dist / radius; // 0 to 1
                const factor = Math.sin(progress * Math.PI); // beautiful bell curve
                const strength = factor * maxOffset;

                // Radial unit vectors
                const ux = dist > 0 ? dx / dist : 0;
                const uy = dist > 0 ? dy / dist : 0;

                // Offsets for red and blue channels (shifting outward and inward radially)
                const shiftX = Math.round(ux * strength);
                const shiftY = Math.round(uy * strength);

                // Sample colors clamping coordinates
                const rx = Math.max(0, Math.min(width - 1, Math.round(x + shiftX)));
                const ry = Math.max(0, Math.min(height - 1, Math.round(y + shiftY)));

                const bx = Math.max(0, Math.min(width - 1, Math.round(x - shiftX)));
                const by = Math.max(0, Math.min(height - 1, Math.round(y - shiftY)));

                const rIdx = (ry * width + rx) * 4;
                const gIdx = (y * width + x) * 4;
                const bIdx = (by * width + bx) * 4;

                boxData.data[targetIdx] = originalData.data[rIdx];         // Red channel from offset position
                boxData.data[targetIdx + 1] = originalData.data[gIdx + 1]; // Green channel centered
                boxData.data[targetIdx + 2] = originalData.data[bIdx + 2]; // Blue channel from opposite offset
                boxData.data[targetIdx + 3] = originalData.data[gIdx + 3]; // Alpha channel matches center
              } else {
                // Outside radius, draw pristine pixels
                const origIdx = (y * width + x) * 4;
                boxData.data[targetIdx] = originalData.data[origIdx];
                boxData.data[targetIdx + 1] = originalData.data[origIdx + 1];
                boxData.data[targetIdx + 2] = originalData.data[origIdx + 2];
                boxData.data[targetIdx + 3] = originalData.data[origIdx + 3];
              }
            }
          }

          ctx.putImageData(boxData, startX, startY);
          prevBoxRef.current = { x: startX, y: startY, w: rectW, h: rectH };
        } else {
          prevBoxRef.current = null;
        }
      } else {
        prevBoxRef.current = null;
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [dimensions, radius, maxOffset, lerpSpeed]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseRef.current = { x, y };
    if (!isInsideRef.current) {
      isInsideRef.current = true;
      setIsHovered(true);
      // Snap starting easing point to current position for zero jitter
      currentPosRef.current = { x, y };
    }
  };

  const handleMouseLeave = () => {
    isInsideRef.current = false;
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden cursor-crosshair select-none pointer-events-auto rounded-[24px] ${className}`}
      id="chromatic-hover-image-container"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-auto block select-none pointer-events-none"
        style={{
          maxHeight: '100%',
        }}
        id="chromatic-canvas"
      />
    </div>
  );
}
