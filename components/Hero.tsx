"use client";

import React from "react";
import { useReferral } from "@/contexts/ReferralContext";
import { T } from "@/contexts/LanguageContext";
import Button from "@/components/ui/Button";

const Hero: React.FC = () => {
  const { getRegisterUrl } = useReferral();

  return (
    <section className="relative w-full min-h-screen xl:min-h-0 xl:h-screen overflow-x-hidden xl:overflow-hidden bg-[#19211c] flex flex-col select-none pt-[56px] xl:pt-[72px]">
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
      <div className="flex-1 w-full max-w-[1920px] mx-auto px-0 xl:px-10 2xl:px-[clamp(24px,2.5vw,48px)] flex flex-col xl:flex-row relative xl:static z-10 min-h-0">

        {/* ── Left Column: Text Content ── */}
        <div className="relative z-30 flex flex-col justify-center w-full px-6 xl:px-0 xl:w-[48%] order-1 pt-12 sm:pt-16 xl:pt-0">
          <div className="xl:-mt-72">
            {/* Subtitle */}
            <div className="text-white text-base md:text-lg xl:text-[21px] font-light mb-3 tracking-wide flex items-center gap-1.5 animate-fade-in">
              <T>Confused After</T>{" "}
              <span className="text-[#1ed36a] font-medium">
                <T>12th?</T>
              </span>
            </div>

            {/* Description */}
            <h1 className="hero-description text-white text-xl md:text-[22px] xl:text-[32px] font-light leading-[1.3] mb-8 max-w-lg xl:max-w-xl tracking-normal animate-fade-in delay-100">
              <T>Discover careers that match your strengths, not just your marks, and get a clear roadmap from 12th to your first job.</T>
            </h1>

            {/* CTA Button */}
            <div className="flex items-center animate-fade-in delay-200">
              <Button
                href={getRegisterUrl()}
                showArrow={true}
                variant="primary"
                noDefaultSize={true}
                className="pl-5 pr-2.5 py-2 text-sm font-medium xl:pl-5 xl:pr-2 xl:py-1.5 xl:text-sm"
              >
                <T>Find My Career Match | ₹999</T>
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right Column: Hero Portrait ── */}
        <div className="relative w-full xl:absolute xl:right-0 xl:top-[72px] xl:bottom-0 xl:w-[50%] xl:h-auto flex-1 xl:flex-none flex items-end justify-center xl:justify-end z-20 order-2 m-0 xl:m-0 overflow-visible xl:overflow-visible">
          <img
            src="/assets/image.webp"
            alt="OriginBI Right Career"
            className="relative z-20 w-full h-auto xl:h-full xl:w-auto max-w-full md:max-w-[90%] xl:max-w-none mx-auto xl:mx-0 object-contain object-bottom select-none pointer-events-none animate-fade-in duration-1000 -translate-y-12 scale-[117%] origin-bottom xl:translate-y-0 xl:scale-100"
            draggable={false}
          />
        </div>
      </div>

      {/* ===== BOTTOM BANNER: Background Giant Text ===== */}
      <div className="absolute bottom-0 left-0 right-0 w-full select-none pointer-events-none z-30 xl:z-10 leading-none pb-8 xl:pb-8 px-6 xl:px-10 2xl:px-[clamp(24px,2.5vw,48px)]">
        <div className="max-w-[1920px] mx-auto">
          {/* FIND THE */}
          <div className="text-white text-[3.8vw] md:text-[2.4vw] xl:text-[2vw] font-light tracking-[2.5vw] md:tracking-[2.8vw] xl:tracking-[3vw] uppercase mb-1 sm:mb-2 xl:mb-4">
            <T>FIND THE</T>
          </div>
          {/* RIGHT CAREER — stacked on mobile/tablet, single line on desktop */}
          <div className="xl:hidden text-white font-medium uppercase tracking-[0.02em] leading-[0.85] -ml-[2px]">
            <div className="text-[20vw] sm:text-[18vw] md:text-[15vw]"><T>RIGHT</T></div>
            <div className="text-[20vw] sm:text-[18vw] md:text-[15vw]"><T>CAREER</T></div>
          </div>
          <div className="hidden xl:block text-white text-[12vw] font-medium uppercase tracking-[0.06em] whitespace-nowrap -ml-[2px]">
            <T>RIGHT CAREER</T>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
