"use client";

import React, { useRef, useState, useEffect } from "react";
import { T } from "@/contexts/LanguageContext";

const SituationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateAmount, setTranslateAmount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;

      const container = containerRef.current;
      const track = trackRef.current;

      const rect = container.getBoundingClientRect();
      const scrollRange = rect.height - window.innerHeight;
      const scrolled = -rect.top;

      let progress = scrolled / scrollRange;
      progress = Math.max(0, Math.min(1, progress));

      const trackWidth = track.scrollWidth;
      const maxTranslate = trackWidth - window.innerWidth;

      if (maxTranslate > 0) {
        setTranslateAmount(progress * maxTranslate);
      } else {
        setTranslateAmount(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollSection = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const containerTop = rect.top + scrollTop;
    const scrollRange = rect.height - window.innerHeight;

    const currentScrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, currentScrolled / scrollRange));

    let targetProgress = progress;
    if (direction === "right") {
      if (progress < 0.25) targetProgress = 0.5;
      else if (progress < 0.75) targetProgress = 1.0;
    } else {
      if (progress > 0.75) targetProgress = 0.5;
      else if (progress > 0.25) targetProgress = 0.0;
    }

    const targetScrollY = containerTop + targetProgress * scrollRange;
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth"
    });
  };

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#F4F4F4]">
      {/* Sticky Frame */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-8 pb-6 lg:pt-10 lg:pb-8 bg-[#F4F4F4] text-[#19211c] select-none"
      >
        {/* ===== HEADER ===== */}
        <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)] flex flex-row justify-between items-start z-30">
          {/* Left Title */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-sans font-medium text-[#19211c] leading-[1.15]">
              <T>Is This Your</T>
              <br />
              <T>Current Situation ?</T>
            </h2>
          </div>

          {/* Right Subtitle & Navigation */}
          <div className="flex items-center gap-6 lg:gap-10">
            <p className="hidden md:block text-[#4A5568] text-sm lg:text-base font-light leading-relaxed max-w-[280px] lg:max-w-[320px] text-right">
              <T>Check if you or your child are facing one of these critical career crossroads</T>
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollSection("left")}
                className="w-11 h-11 rounded-full border border-black/15 flex items-center justify-center text-black hover:bg-black/5 active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Scroll left"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => scrollSection("right")}
                className="w-11 h-11 rounded-full bg-[#1ed36a] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-md shadow-[#1ed36a]/15 cursor-pointer"
                aria-label="Scroll right"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ===== CARDS HORIZONTAL TRACK ===== */}
        <div className="flex-1 flex items-center min-h-0 relative z-20 w-full overflow-hidden mt-6 lg:mt-0">
          <div
            ref={trackRef}
            className="flex flex-row gap-6 lg:gap-8 pl-6 lg:pl-10 2xl:pl-[clamp(24px,2.5vw,48px)] pr-[30vw] transition-transform duration-100 ease-out will-change-transform"
            style={{
              transform: `translateX(-${translateAmount}px)`,
            }}
          >
            {/* ── CARD 1: Stop the Guesswork ── */}
            <div className="relative w-[85vw] sm:w-[480px] lg:w-[600px] xl:w-[640px] h-[340px] sm:h-[380px] lg:h-[420px] xl:h-[440px] rounded-[28px] lg:rounded-[36px] bg-[#19211c] text-white flex-shrink-0 overflow-hidden shadow-lg border border-white/5 group hover:border-[#1ed36a]/20 transition-colors duration-300">
              {/* Illustration Top Right */}
              <div className="absolute top-0 right-0 w-[200px] sm:w-[240px] lg:w-[300px] h-[200px] sm:h-[240px] lg:h-[300px] pointer-events-none z-10 transition-transform duration-500 group-hover:scale-105 group-hover:translate-x-1 group-hover:-translate-y-1">
                <svg viewBox="0 0 300 300" className="w-full h-full opacity-90">
                  {/* Solid green circle at top-center */}
                  <circle cx="150" cy="115" r="58" fill="#1ed36a" />
                  {/* Thin outlined circles intersecting */}
                  <circle cx="115" cy="165" r="68" stroke="#1ed36a" strokeWidth="1.5" fill="none" opacity="0.35" />
                  <circle cx="185" cy="165" r="68" stroke="#1ed36a" strokeWidth="1.5" fill="none" opacity="0.35" />
                  {/* Thin white/green intersection highlights */}
                  <circle cx="150" cy="115" r="58" stroke="#ffffff" strokeWidth="0.75" fill="none" opacity="0.15" />
                </svg>
              </div>

              {/* Text content Bottom Left */}
              <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-8 right-6 lg:right-8 z-20">
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-white mb-2 sm:mb-3 leading-snug">
                  <T>Stop the Guesswork</T>
                </h3>
                <p className="text-white/60 text-xs sm:text-sm lg:text-base font-light leading-relaxed max-w-[280px] sm:max-w-sm lg:max-w-md">
                  <T>Choosing a degree based on trends, popular courses, or others' choices can lead to the wrong future path.</T>
                </p>
              </div>
            </div>

            {/* ── CARD 2: Find Your Direction ── */}
            <div className="relative w-[85vw] sm:w-[480px] lg:w-[600px] xl:w-[640px] h-[340px] sm:h-[380px] lg:h-[420px] xl:h-[440px] rounded-[28px] lg:rounded-[36px] bg-white text-[#19211c] flex-shrink-0 overflow-hidden shadow-lg border border-[#e2e8f0] group hover:border-[#1ed36a]/30 transition-colors duration-300">
              {/* Text content Top Center */}
              <div className="absolute top-6 lg:top-8 left-6 lg:left-8 right-6 lg:right-8 text-center z-20">
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-[#19211c] mb-2 sm:mb-3 leading-snug">
                  <T>Find Your Direction</T>
                </h3>
                <p className="text-[#4A5568] text-xs sm:text-sm lg:text-base font-light leading-relaxed max-w-[280px] sm:max-w-md lg:max-w-lg mx-auto">
                  <T>Marks alone do not define the right career. True clarity comes from understanding natural strengths and long-term fit.</T>
                </p>
              </div>

              {/* Illustration Bottom Center */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] sm:w-[260px] lg:w-[300px] h-[160px] sm:h-[180px] lg:h-[200px] pointer-events-none z-10 transition-transform duration-500 group-hover:scale-105 group-hover:translate-y-0.5">
                <svg viewBox="0 0 300 220" className="w-full h-full opacity-90">
                  {/* Solid dark circles */}
                  <circle cx="150" cy="220" r="42" fill="#24272b" />
                  <circle cx="150" cy="140" r="42" fill="#24272b" />
                  <circle cx="150" cy="60" r="42" fill="#24272b" />
                  {/* Outline circles */}
                  <circle cx="98" cy="140" r="42" stroke="#24272b" strokeWidth="1.5" fill="none" opacity="0.15" />
                  <circle cx="202" cy="140" r="42" stroke="#24272b" strokeWidth="1.5" fill="none" opacity="0.15" />
                  
                  <circle cx="98" cy="220" r="42" stroke="#24272b" strokeWidth="1.5" fill="none" opacity="0.15" />
                  <circle cx="202" cy="220" r="42" stroke="#24272b" strokeWidth="1.5" fill="none" opacity="0.15" />
                  
                  <circle cx="98" cy="60" r="42" stroke="#24272b" strokeWidth="1.5" fill="none" opacity="0.15" />
                  <circle cx="202" cy="60" r="42" stroke="#24272b" strokeWidth="1.5" fill="none" opacity="0.15" />
                </svg>
              </div>
            </div>

            {/* ── CARD 3: Correct Your Course Before It Starts ── */}
            <div className="relative w-[85vw] sm:w-[480px] lg:w-[600px] xl:w-[640px] h-[340px] sm:h-[380px] lg:h-[420px] xl:h-[440px] rounded-[28px] lg:rounded-[36px] bg-[#19211c] text-white flex-shrink-0 overflow-hidden shadow-lg border border-white/5 group hover:border-[#1ed36a]/20 transition-colors duration-300">
              {/* Illustration Bottom Right */}
              <div className="absolute bottom-0 right-0 w-[220px] sm:w-[260px] lg:w-[300px] h-[200px] sm:h-[240px] lg:h-[260px] pointer-events-none z-10 transition-transform duration-500 group-hover:scale-105 group-hover:translate-x-1 group-hover:translate-y-1">
                <svg viewBox="0 0 300 260" className="w-full h-full opacity-90">
                  {/* Clover shape overlapping solid green circles */}
                  <circle cx="115" cy="175" r="52" fill="#1ed36a" />
                  <circle cx="185" cy="175" r="52" fill="#1ed36a" />
                  <circle cx="115" cy="115" r="52" fill="#1ed36a" />
                  <circle cx="185" cy="115" r="52" fill="#1ed36a" />
                  {/* Subtle inner dark intersection outline lines */}
                  <circle cx="115" cy="175" r="52" stroke="#19211c" strokeWidth="1.25" fill="none" opacity="0.25" />
                  <circle cx="185" cy="175" r="52" stroke="#19211c" strokeWidth="1.25" fill="none" opacity="0.25" />
                  <circle cx="115" cy="115" r="52" stroke="#19211c" strokeWidth="1.25" fill="none" opacity="0.25" />
                  <circle cx="185" cy="115" r="52" stroke="#19211c" strokeWidth="1.25" fill="none" opacity="0.25" />
                </svg>
              </div>

              {/* Text content Top Left */}
              <div className="absolute top-6 lg:top-8 left-6 lg:left-8 right-6 lg:right-8 z-20">
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-white mb-2 sm:mb-3 leading-snug">
                  <T>Correct Your Course Before It Starts</T>
                </h3>
                <p className="text-white/60 text-xs sm:text-sm lg:text-base font-light leading-relaxed max-w-[280px] sm:max-w-sm lg:max-w-md">
                  <T>Avoid spending years and major investments on a path that may not align with true potential.</T>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacer replaced bottom compass decoration */}
        <div className="hidden lg:block" />
      </div>
    </div>
  );
};

export default SituationSection;
