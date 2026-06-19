"use client";

import React from "react";
import { useReferral } from "@/contexts/ReferralContext";
import { T } from "@/contexts/LanguageContext";
import Button from "@/components/ui/Button";

const Hero: React.FC = () => {
  const { getRegisterUrl } = useReferral();

  return (
    <section className="relative w-full min-h-screen lg:min-h-0 lg:h-screen lg:overflow-hidden bg-[#19211c] flex flex-col select-none pt-[56px] lg:pt-[72px]">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div className="flex-1 w-full max-w-[1920px] mx-auto pl-6 pr-0 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)] flex flex-col lg:flex-row relative lg:static z-10 min-h-0">

        {/* ── Left Column: Text Content ── */}
        <div className="relative z-30 flex flex-col justify-center w-full pr-6 lg:pr-0 lg:w-[48%] order-1 pt-4 sm:pt-6 lg:pt-0">
          <div className="lg:-mt-72">
            {/* Subtitle */}
            <div className="text-white text-lg md:text-xl lg:text-[24px] font-light mb-3 tracking-wide flex items-center gap-1.5 animate-fade-in">
              <T>Confused After</T>{" "}
              <span className="text-[#1ed36a] font-bold">
                <T>12th?</T>
              </span>
            </div>

            {/* Description */}
            <h1 className="text-white text-2xl md:text-3xl lg:text-[36px] font-light leading-[1.3] mb-8 max-w-lg lg:max-w-xl tracking-normal animate-fade-in delay-100">
              <T>Discover careers that match your strengths, not just your marks, and get a clear roadmap from 12th to your first job.</T>
            </h1>

            {/* CTA Button */}
            <div className="flex items-center animate-fade-in delay-200">
              <Button
                href={getRegisterUrl()}
                showArrow={true}
                variant="primary"
                noDefaultSize={true}
                className="pl-6 pr-2 py-2 text-sm md:text-base font-medium"
              >
                <T>Find My Career Match | ₹999</T>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right Column: Hero Portrait ── */}
        <div className="relative w-full lg:absolute lg:right-0 lg:top-[72px] lg:bottom-0 lg:w-[50%] lg:h-auto flex-1 lg:flex-none flex items-end justify-end z-20 order-2 m-0 lg:m-0 overflow-hidden lg:overflow-visible">
          <img
            src="/assets/image.png"
            alt="OriginBI Right Career"
            className="relative z-20 h-[60vh] sm:h-[58vh] lg:h-full w-auto max-w-full lg:max-w-none object-contain object-bottom select-none pointer-events-none animate-fade-in duration-1000 -translate-y-8 lg:translate-y-0"
            draggable={false}
          />
        </div>
      </div>

      {/* ===== BOTTOM BANNER: Background Giant Text ===== */}
      <div className="absolute bottom-0 left-0 right-0 w-full select-none pointer-events-none z-10 leading-none pb-4 lg:pb-8 px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)]">
        <div className="max-w-[1920px] mx-auto">
          {/* FIND THE */}
          <div className="text-white text-[3.8vw] md:text-[2.4vw] lg:text-[2vw] font-light tracking-[2.5vw] md:tracking-[2.8vw] lg:tracking-[3vw] uppercase mb-1 sm:mb-2 lg:mb-4">
            <T>FIND THE</T>
          </div>
          {/* RIGHT CAREER */}
          <div className="text-white text-[13vw] sm:text-[12.5vw] lg:text-[12vw] font-medium uppercase tracking-[0.06em] whitespace-nowrap -ml-[2px]">
            <T>RIGHT CAREER</T>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
