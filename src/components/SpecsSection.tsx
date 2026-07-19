import React from 'react';
import ContainerWireframe from './ContainerWireframe';

export default function SpecsSection() {
  return (
    <section className="max-w-[1450px] mx-auto px-6 lg:px-12 pb-24 w-full bg-[#0A0A0A] relative z-40 shrink-0" id="specs-and-conditions-section">
      {/* Dimensions Heading */}
      <div className="mb-8" id="dimensions-header">
        <h3 className="text-[32px] sm:text-[34px] font-normal tracking-tight text-white">
          Dimensions
        </h3>
      </div>

      {/* Dimensions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16" id="dimensions-grid">
        {[
          {
            title: "Standard 20 DC",
            subtitle: "Dry Container, 20ft",
            length: "5.90 m",
            width: "2.35 m",
            height: "2.39 m",
            heightLabel: "Height",
            wireframeType: "20dc" as const,
          },
          {
            title: "Standard 40 DC",
            subtitle: "Dry Container, 40ft",
            length: "12.03 m",
            width: "2.35 m",
            height: "2.39 m",
            heightLabel: "Height",
            wireframeType: "40dc" as const,
          },
          {
            title: "High cube 40 HC",
            subtitle: "Dry High Container, 40ft",
            length: "12.04 m",
            width: "2.35 m",
            height: "2.70 m",
            heightLabel: "Haight", // Spelled exactly like in user's mockup image
            wireframeType: "40hc" as const,
          }
        ].map((item, index) => (
          <div 
            key={index}
            id={`dim-card-${index}`}
            className="p-6 rounded-[24px] bg-[#151515] border border-[#222222] flex flex-col justify-between min-h-[220px] relative transition-all duration-300 group"
          >
            {/* Top Row: Title + Muted Orange Circle Info Icon */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-[20px] sm:text-[21px] font-normal tracking-tight text-white leading-snug">
                  {item.title}
                </h4>
                <p className="text-[13.5px] text-[#808080] mt-1 font-normal">
                  {item.subtitle}
                </p>
              </div>
              {/* Information Accent Icon matching orange dot style */}
              <div className="w-[20px] h-[20px] rounded-full bg-[#FF4500] flex items-center justify-center text-black font-semibold text-[11px] select-none" id={`info-icon-${index}`} title="Standardized Specifications">
                i
              </div>
            </div>

            {/* Bottom Row: Specs List on the Left, Wireframe Drawing on the right */}
            <div className="flex items-end justify-between mt-auto">
              {/* Left: Dimension Values */}
              <div className="space-y-1.5 text-[14px] text-[#888888] pb-1 font-normal">
                <div>
                  Length: {item.length}
                </div>
                <div>
                  Width: {item.width}
                </div>
                <div>
                  {item.heightLabel}: {item.height}
                </div>
              </div>

              {/* Right: Technical Vector Blueprint */}
              <div className="w-[140px] h-[95px] flex items-center justify-center translate-x-2">
                <ContainerWireframe type={item.wireframeType} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conditions Heading */}
      <div className="mb-8" id="conditions-header">
        <h3 className="text-[32px] sm:text-[34px] font-normal tracking-tight text-white">
          Conditions
        </h3>
      </div>

      {/* Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8" id="conditions-grid">
        {/* Card 1: New (One Way) */}
        <div 
          className="md:col-span-5 p-7 sm:p-8 rounded-[24px] bg-[#151515] border border-[#222222] flex flex-col justify-between min-h-[160px] md:min-h-[190px] transition-all duration-300"
          id="condition-card-new"
        >
          <div>
            <h4 className="text-[21px] font-normal text-white tracking-tight leading-tight mb-4">
              New (One Way)
            </h4>
            <p className="text-[#808080] text-[14px] sm:text-[15px] leading-relaxed font-normal">
              Almost like new,<br />
              only used once.
            </p>
          </div>
        </div>

        {/* Card 2: Cargo Worthy */}
        <div 
          className="md:col-span-7 p-7 sm:p-8 rounded-[24px] bg-[#FF4500] flex flex-col justify-between min-h-[160px] md:min-h-[190px] transition-all duration-300 group"
          id="condition-card-cw"
        >
          <div>
            <h4 className="text-[21px] font-bold text-black tracking-tight leading-tight mb-4">
              Cargo Worthy
            </h4>
            <p className="text-black text-[14px] sm:text-[15px] leading-relaxed font-normal max-w-[500px]">
              The CW container has been repaired to IICL standards and recertified for overseas shipments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
