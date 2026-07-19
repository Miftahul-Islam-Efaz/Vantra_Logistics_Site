/**
 * Skot Logistics Hero Section Config
 * Use this file to easily adjust the sizes, positions, and 3D parallax strengths
 * of the truck and background image to perfect the visual layout.
 */

export const HERO_CONFIG = {
  // --- BACKGROUND IMAGE CONFIGURATION ---
  background: {
    // URL of the high-res tunnel image
    url: "https://lh3.googleusercontent.com/d/1Up0VgVesu-Dohc7781ILfuKbd45ZBife",
    
    // Zoom/scale multiplier of the background image (1.0 = 100% full fit)
    // 1.0 ensures the image fits perfectly from left-to-right
    scale: 1.0,
    
    // Mix blend mode to match design aesthetic ('mix-blend-lighten', etc.)
    blendMode: "mix-blend-lighten",
    
    // Opacity of the background image (0.0 to 1.0)
    opacity: 0.85,

    // Scroll-based parallax depth shift multiplier (smaller = slower)
    scrollYRange: [0, 0],

    // Mouse interactive shift multiplier on desktop (pixels)
    mouseXRange: [0, 0],
    mouseYRange: [0, 0],
  },

  // --- TRUCK IMAGE CONFIGURATION ---
  truck: {
    // URL of the high-quality truck image
    url: "https://lh3.googleusercontent.com/d/1PIO5OL8tB9GAS5HabmdlBHDaxWRtJvE1",

    // Responsive width configurations at different screen break points
    // Increase/decrease these percentage strings to make the truck bigger or smaller!
    widthMobile: "w-[102%]",  // Mobile screens (Proportional sizing)
    widthSm: "sm:w-[112%]",   // Small tablets/laptops (+10% larger)
    widthLg: "lg:w-[102%]",    // Medium-large desktops (+10% larger)
    widthXl: "xl:w-[98%]",    // Extra large desktop monitors (+10% larger)

    // Maximum width constraint to keep it proportional on ultra-wide screens
    maxWidth: "max-w-[1300px]",

    // Vertical positioning offset (shifted down by 10% to sit perfectly on the road)
    positionMobile: "bottom-[-2%]",
    positionSm: "sm:bottom-[2%]",
    positionLg: "lg:bottom-[-2%]",
    positionXl: "xl:bottom-[-5%]",

    // Left alignment offsets (extended 10% further to the left)
    leftMobile: "left-[-3%]",
    leftSm: "sm:left-[-8%]",
    leftLg: "lg:left-[-2%]",
    leftXl: "xl:left-[0%]",

    // Wheel road shadow styling to ground the truck physically
    shadow: {
      bottomMobile: "bottom-[3%]",
      bottomSm: "sm:bottom-[12%]",
      left: "left-[12%]",
      right: "right-[8%]",
      heightMobile: "h-[20px]",
      heightSm: "sm:h-[30px]",
      blur: "blur-md", // Tailwind blur intensity ('blur-sm', 'blur-md', 'blur-lg')
      opacity: "bg-black/95", // Shadow color and alpha transparency
    },

    // Parallax travel ranges
    // Scroll displacement range [startPos, endPos] in pixels as you scroll down
    scrollYRange: [0, 0],

    // Mouse interactivity travel range (tilt depth on mouse movement)
    mouseXRange: [0, 0],
    mouseYRange: [0, 0],
  },
};
