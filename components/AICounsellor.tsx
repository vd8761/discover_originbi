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

      <div className="max-w-[1920px] w-full mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* DESKTOP & TABLET LAYOUT (lg and above)                                     */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex flex-row justify-between items-center gap-12 lg:gap-16">
          {/* Left Column: Title, CTA Button & Chat Interface Mockup */}
          <div className="w-[45%] flex flex-col justify-start">
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

            {/* Chat Mockup Image Container */}
            <div className="relative w-full max-w-[440px] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
              <img
                src="/assets/left.png"
                alt="AI Chat Mockup"
                className="w-full h-auto block select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Right Column: Description & Overlapping Circles */}
          <div className="w-[50%] flex flex-col justify-start lg:pt-4">
            <p className="text-white text-xl sm:text-2xl md:text-[32px] font-sans font-normal leading-tight md:leading-[1.25] tracking-tight max-w-[850px] mb-12 lg:mb-16">
              <T>Ask personalized questions, make smarter college decisions, and discover what careers fit you best. Our AI uses your behavioral data to guide majors, projects, internships, and placement goals.</T>
            </p>

            {/* Overlapping Circles Container */}
            <div className="w-full">
              <div className="flex flex-row items-center justify-start lg:-space-x-7 xl:-space-x-8 w-full animate-fade-in">
                {/* Circle 1: Discover Who You Are */}
                <div className="relative z-10 w-[200px] h-[200px] xl:w-[235px] xl:h-[235px] aspect-square rounded-full border border-white/15 bg-[#19211c]/40 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4 py-2">
                  <h4 className="text-white text-sm xl:text-[18px] font-sans font-semibold leading-tight max-w-[150px]">
                    <T>Discover Who You Are</T>
                  </h4>
                  <p className="text-white text-[11px] xl:text-xs mt-1.5 font-sans font-normal leading-relaxed max-w-[165px]">
                    <T>Understand your natural strengths and behavioral profile.</T>
                  </p>
                </div>

                {/* Circle 2: Plan Better Decisions */}
                <div className="relative z-20 w-[215px] h-[215px] xl:w-[255px] xl:h-[255px] aspect-square rounded-full bg-[#1ed36a] flex flex-col items-center justify-center text-center px-4 py-2 shadow-lg shadow-[#1ed36a]/15">
                  <h4 className="text-white text-sm xl:text-[18px] font-sans font-bold leading-tight max-w-[150px]">
                    <T>Plan Better Decisions</T>
                  </h4>
                  <p className="text-white text-[11px] xl:text-xs mt-1.5 font-sans font-normal leading-relaxed max-w-[165px]">
                    <T>Choose degrees and career paths with confidence.</T>
                  </p>
                </div>

                {/* Circle 3: Always Available */}
                <div className="relative z-10 w-[200px] h-[200px] xl:w-[235px] xl:h-[235px] aspect-square rounded-full border border-white/15 bg-[#19211c]/40 backdrop-blur-sm flex flex-col items-center justify-center text-center px-4 py-2">
                  <h4 className="text-white text-sm xl:text-[18px] font-sans font-semibold leading-tight max-w-[150px]">
                    <T>Always Available</T>
                  </h4>
                  <p className="text-white text-[11px] xl:text-xs mt-1.5 font-sans font-normal leading-relaxed max-w-[165px]">
                    <T>Access AI-powered guidance anytime.</T>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE & TABLET LAYOUT (below lg)                                         */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden flex-col w-full text-left">
          {/* 1. Title */}
          <h2 className="text-white text-[32px] sm:text-[40px] font-sans font-medium leading-[1.1] tracking-tight">
            <T>Meet Your Personal</T>
            <div className="mt-1 flex items-center flex-wrap gap-x-2">
              <span className="bg-[linear-gradient(to_right,#ED2F34,#EF5921,#FDC00C,#1ED36A)] bg-clip-text text-transparent font-medium">
                AI {language === "ta" ? "ஆலோசகர்" : "Counsellor"}
              </span>
            </div>
          </h2>

          {/* 2. Description */}
          <p className="text-white/70 text-[15px] sm:text-base font-sans font-normal leading-relaxed tracking-tight mt-4 mb-6">
            <T>Ask personalized questions, make smarter college decisions, and discover what careers fit you best. Our AI uses your behavioral data to guide majors, projects, internships, and placement goals.</T>
          </p>

          {/* 3. Button */}
          <div className="mb-8">
            <Button
              href={getRegisterUrl()}
              showArrow={true}
              variant="primary"
              noDefaultSize={true}
              className="pl-6 pr-2 py-2 text-sm sm:text-base font-bold"
            >
              <T>Start Your Free Career Chat</T>
            </Button>
          </div>

          {/* 4. Swipeable Overlapping Circles Container */}
          <div className="w-[calc(100%+3rem)] overflow-x-auto scrollbar-none py-6 -mx-6 px-6 mb-8">
            <div className="flex flex-row items-center w-max min-w-full">
              {/* Circle 1 */}
              <div className="shrink-0 w-[220px] h-[220px] rounded-full border border-white/15 bg-[#19211c]/40 backdrop-blur-sm flex flex-col items-center justify-center text-center px-5 py-2 relative z-10 select-none">
                <h4 className="text-white text-base font-sans font-semibold leading-tight max-w-[155px]">
                  <T>Discover Who You Are</T>
                </h4>
                <p className="text-white/60 text-xs mt-2 font-sans font-normal leading-relaxed max-w-[170px]">
                  <T>Understand your natural strengths and behavioral profile.</T>
                </p>
              </div>

              {/* Circle 2 */}
              <div className="shrink-0 w-[235px] h-[235px] rounded-full bg-[#1ed36a] flex flex-col items-center justify-center text-center px-5 py-2 -ml-8 relative z-20 select-none shadow-lg shadow-[#1ed36a]/15">
                <h4 className="text-white text-base font-sans font-bold leading-tight max-w-[155px]">
                  <T>Plan Better Decisions</T>
                </h4>
                <p className="text-white/90 text-xs mt-2 font-sans font-normal leading-relaxed max-w-[170px]">
                  <T>Choose degrees and career paths with confidence.</T>
                </p>
              </div>

              {/* Circle 3 */}
              <div className="shrink-0 w-[220px] h-[220px] rounded-full border border-white/15 bg-[#19211c]/40 backdrop-blur-sm flex flex-col items-center justify-center text-center px-5 py-2 -ml-8 relative z-10 select-none">
                <h4 className="text-white text-base font-sans font-semibold leading-tight max-w-[155px]">
                  <T>Always Available</T>
                </h4>
                <p className="text-white/60 text-xs mt-2 font-sans font-normal leading-relaxed max-w-[170px]">
                  <T>Access AI-powered guidance anytime.</T>
                </p>
              </div>
            </div>
          </div>

          {/* 5. Chat Mockup */}
          <div className="relative w-full max-w-[440px] rounded-2xl overflow-hidden border border-white/10 shadow-xl mx-auto">
            <img
              src="/assets/left.png"
              alt="AI Chat Mockup"
              className="w-full h-auto block select-none pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICounsellor;
