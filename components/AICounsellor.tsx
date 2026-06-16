"use client";

import React from "react";
import { T, useLanguage } from "@/contexts/LanguageContext";
import { useReferral } from "@/contexts/ReferralContext";
import Button from "@/components/ui/Button";

const AICounsellor: React.FC = () => {
  const { getRegisterUrl } = useReferral();
  const { language } = useLanguage();

  return (
    <section
      id="ai-counsellor"
      className="w-full bg-[#19211c] py-16 lg:py-0 px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)] relative overflow-hidden lg:min-h-screen lg:flex lg:items-center border-t border-white/5"
    >
      {/* Background Noise Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-[1920px] w-full mx-auto flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16 relative z-10">
        
        {/* Left Column: Title, CTA Button & Chat Interface Mockup */}
        <div className="w-full lg:w-[45%] flex flex-col justify-start">
          <h2 className="text-white text-[32px] sm:text-[40px] md:text-[48px] font-sans font-medium leading-[1.1] tracking-tight">
            <T>Meet Your Personal</T>
            <div className="mt-1 flex items-center flex-wrap gap-x-2">
              <span className="bg-[linear-gradient(to_right,#ED2F34,#EF5921,#FDC00C,#1ED36A)] bg-clip-text text-transparent font-medium">
                AI {language === "ta" ? "ஆலோசகர்" : "Counsellor"}
              </span>
            </div>
          </h2>

          <div className="mt-6 mb-8">
            <Button
              href={getRegisterUrl()}
              showArrow={true}
              variant="primary"
              noDefaultSize={true}
              className="pl-6 pr-2 py-2 text-sm md:text-base font-bold"
            >
              <T>Start Your Free Career Chat</T>
            </Button>
          </div>

          {/* Chat Mockup Image Container - Remove hardcoded aspect ratio to show image fully */}
          <div className="relative w-full max-w-[540px] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            <img
              src="/assets/left.png"
              alt="AI Chat Mockup"
              className="w-full h-auto block select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>

        {/* Right Column: Description & Overlapping Circles */}
        <div className="w-full lg:w-[50%] flex flex-col justify-start lg:pt-4">
          <p className="text-white text-xl sm:text-2xl md:text-[32px] font-sans font-normal leading-tight md:leading-[1.25] tracking-tight max-w-[850px] mb-12 lg:mb-16">
            <T>Ask personalized questions, make smarter college decisions, and discover what careers fit you best. Our AI uses your behavioral data to guide majors, projects, internships, and placement goals.</T>
          </p>

          {/* Overlapping Circles/Cards Container */}
          <div className="w-full">
            {/* Mobile layout: clean modern glassmorphic cards (hidden on sm and up) */}
            <div className="flex flex-col gap-4 sm:hidden w-full text-left">
              {/* Card 1 */}
              <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-start gap-4 text-left">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 font-semibold shrink-0">
                  1
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="text-white text-base font-sans font-semibold leading-tight">
                    <T>Discover Who You Are</T>
                  </h4>
                  <p className="text-white/60 text-sm mt-1.5 font-sans font-normal leading-relaxed">
                    <T>Understand your natural strengths and behavioral profile.</T>
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-full rounded-2xl bg-[#1ed36a] p-5 flex items-start gap-4 text-left shadow-lg shadow-[#1ed36a]/15">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold shrink-0">
                  2
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="text-white text-base font-sans font-bold leading-tight">
                    <T>Plan Better Decisions</T>
                  </h4>
                  <p className="text-white/90 text-sm mt-1.5 font-sans font-normal leading-relaxed">
                    <T>Choose degrees and career paths with confidence.</T>
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 flex items-start gap-4 text-left">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 font-semibold shrink-0">
                  3
                </div>
                <div className="flex flex-col text-left">
                  <h4 className="text-white text-base font-sans font-semibold leading-tight">
                    <T>Always Available</T>
                  </h4>
                  <p className="text-white/60 text-sm mt-1.5 font-sans font-normal leading-relaxed">
                    <T>Access AI-powered guidance anytime.</T>
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop & Tablet layout: Overlapping Circles (hidden on mobile) */}
            <div className="hidden sm:flex flex-row items-center justify-center lg:justify-start sm:-space-x-5 lg:-space-x-7 xl:-space-x-8 w-full animate-fade-in">
              {/* Circle 1: Discover Who You Are */}
              <div className="relative z-10 w-[210px] h-[210px] lg:w-[200px] lg:h-[200px] xl:w-[235px] xl:h-[235px] aspect-square rounded-full border border-white/15 bg-white/[0.01] flex flex-col items-center justify-center text-center px-4 py-2">
                <h4 className="text-white text-sm sm:text-base xl:text-[18px] font-sans font-semibold leading-tight max-w-[150px]">
                  <T>Discover Who You Are</T>
                </h4>
                <p className="text-white text-[11px] xl:text-xs mt-1 font-sans font-normal leading-relaxed max-w-[165px]">
                  <T>Understand your natural strengths and behavioral profile.</T>
                </p>
              </div>

              {/* Circle 2: Plan Better Decisions */}
              <div className="relative z-20 w-[225px] h-[225px] lg:w-[215px] lg:h-[215px] xl:w-[255px] xl:h-[255px] aspect-square rounded-full bg-[#1ed36a] flex flex-col items-center justify-center text-center px-4 py-2">
                <h4 className="text-white text-sm sm:text-base xl:text-[18px] font-sans font-bold leading-tight max-w-[150px]">
                  <T>Plan Better Decisions</T>
                </h4>
                <p className="text-white text-[11px] xl:text-xs mt-1 font-sans font-normal leading-relaxed max-w-[165px]">
                  <T>Choose degrees and career paths with confidence.</T>
                </p>
              </div>

              {/* Circle 3: Always Available */}
              <div className="relative z-10 w-[210px] h-[210px] lg:w-[200px] lg:h-[200px] xl:w-[235px] xl:h-[235px] aspect-square rounded-full border border-white/15 bg-white/[0.01] flex flex-col items-center justify-center text-center px-4 py-2">
                <h4 className="text-white text-sm sm:text-base xl:text-[18px] font-sans font-semibold leading-tight max-w-[150px]">
                  <T>Always Available</T>
                </h4>
                <p className="text-white text-[11px] xl:text-xs mt-1 font-sans font-normal leading-relaxed max-w-[165px]">
                  <T>Access AI-powered guidance anytime.</T>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AICounsellor;
