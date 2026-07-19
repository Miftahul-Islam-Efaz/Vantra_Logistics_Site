import React, { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CargoSection from './components/CargoSection';
import SpecsSection from './components/SpecsSection';
import FleetSection from './components/FleetSection';
import DynamicOutroSection from './components/DynamicOutroSection';
import TruckRevealSection from './components/TruckRevealSection';
import AboutSection from './components/AboutSection';
import FooterSection from './components/FooterSection';
import BookingModal from './components/BookingModal';
import IntroAnimation from './components/IntroAnimation';
import { ContainerId } from './types';
import Lenis from 'lenis';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedContainer, setSelectedContainer] = useState<ContainerId>('dry');
  const [showSpecs, setShowSpecs] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [introStarted, setIntroStarted] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scrolling with custom physics setting
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // physics-based buttery easing curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-[145vh] bg-[#0A0A0A] text-white font-sans selection:bg-[#FF4500] selection:text-white flex flex-col overflow-x-hidden"
    >
      {!introComplete && <IntroAnimation onPanelsStart={() => setIntroStarted(true)} onComplete={() => setIntroComplete(true)} />}

      {/* Persistent capsule-designed Header/Navbar */}
      <Navbar onPickUpClick={() => setShowBookingModal(true)} />
      
      {/* Interactive 3D Parallax Hero with Typography proximity proximity and 3D truck shadow */}
      <HeroSection containerRef={containerRef} introComplete={introComplete} introStarted={introStarted} />
      
      {/* Cargo container interactive select, specifications drawer & custom dynamic graphics */}
      <CargoSection 
        selectedContainer={selectedContainer}
        setSelectedContainer={setSelectedContainer}
        showSpecs={showSpecs}
        setShowSpecs={setShowSpecs}
        onPickUpClick={() => setShowBookingModal(true)}
      />
      
      {/* Dimensions & Condition Cards (One-Way & Cargo Worthy) */}
      <SpecsSection />
      
      {/* Beautiful parallax background Fleet Row with driver stats */}
      <FleetSection />

      {/* Immersive Dynamic Outro Section with scroll-triggered heavy container hoisting animation */}
      <DynamicOutroSection onPickUpClick={() => setShowBookingModal(true)} />

      {/* Immersive Scroll Reveal Stage with heavy transport truck disclose */}
      <TruckRevealSection />

      {/* Crawlable, elegantly designed brand description and credits */}
      {/* <AboutSection /> */}

      {/* Premium links and copyrights Footer Section */}
      <FooterSection />
      
      {/* Premium request pickup/booking Overlay Form */}
      <BookingModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        selectedContainer={selectedContainer}
      />
    </div>
  );
}
