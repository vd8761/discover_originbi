"use client";

import React, { useRef, useState, useEffect } from "react";
import { T } from "@/contexts/LanguageContext";

const SituationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [translateAmount, setTranslateAmount] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;

      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (mobile) {
        setTranslateAmount(0);
        return;
      }

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
    if (!containerRef.current || isMobile) return;

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
    <div id="problem" ref={containerRef} className="relative h-auto lg:h-[250vh] bg-[#F4F4F4]">
      {/* Sticky Frame */}
      <div
        ref={stickyRef}
        className="relative lg:sticky lg:top-0 h-auto lg:h-screen w-full overflow-visible lg:overflow-hidden flex flex-col justify-start lg:justify-between pt-16 pb-16 lg:pt-10 lg:pb-8 bg-[#F4F4F4] text-[#19211c] select-none"
      >
        {/* ===== HEADER ===== */}
        <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)] flex flex-col md:flex-row gap-6 justify-between items-start md:items-center z-30">
          {/* Left Title */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] xl:text-[48px] font-sans font-medium text-[#19211c] leading-[1.15]">
              <T>Is This Your</T>
              <br />
              <T>Current Situation ?</T>
            </h2>
          </div>

          {/* Right Subtitle & Navigation */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-[#19211c] text-sm lg:text-base font-normal leading-relaxed max-w-[280px] lg:max-w-[320px] text-left md:text-right">
              <T>Check if you or your child are facing one of these critical career crossroads</T>
            </p>
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => scrollSection("left")}
                className="w-11 h-11 rounded-full border border-black flex items-center justify-center text-black hover:bg-black/5 active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Scroll left"
              >
                <img
                  src="/assets/icons/left_arrow.svg"
                  alt="Scroll left"
                  className="w-[18px] h-[14px]"
                />
              </button>
              <button
                onClick={() => scrollSection("right")}
                className="w-11 h-11 rounded-full bg-[#1ed36a] flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-md shadow-[#1ed36a]/15 cursor-pointer"
                aria-label="Scroll right"
              >
                <img
                  src="/assets/icons/right_arrow.svg"
                  alt="Scroll right"
                  className="w-[18px] h-[14px]"
                />
              </button>
            </div>
          </div>
        </div>

        {/* ===== CARDS HORIZONTAL TRACK ===== */}
        <div className="flex-1 flex items-center min-h-0 relative z-20 w-full overflow-visible lg:overflow-hidden mt-10 lg:mt-0">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-8 lg:gap-8 px-6 lg:px-0 lg:pl-10 lg:pr-10 2xl:pl-[clamp(24px,2.5vw,48px)] 2xl:pr-[clamp(24px,2.5vw,48px)] transition-transform duration-100 ease-out will-change-transform w-full lg:w-auto translate-x-0 lg:translate-x-[var(--translate-amount)]"
            style={{
              "--translate-amount": `-${translateAmount}px`,
            } as React.CSSProperties}
          >
            {/* ── CARD 1: Stop the Guesswork ── */}
            <div className="relative w-full max-w-2xl lg:max-w-none mx-auto lg:mx-0 lg:w-[640px] xl:w-[670px] h-[280px] sm:h-[320px] lg:h-[430px] xl:h-[450px] rounded-[28px] lg:rounded-[36px] bg-[#19211c] text-white flex-shrink-0 overflow-hidden shadow-lg border border-white/5">
              {/* Illustration Top Right (shifted left slightly) */}
              <div className="absolute top-0 right-6 lg:right-10 w-[240px] sm:w-[280px] lg:w-[340px] xl:w-[370px] h-[220px] sm:h-[260px] lg:h-[340px] xl:h-[370px] pointer-events-none z-10">
                <img
                  src="/assets/situation/card1.svg"
                  alt="Stop the Guesswork"
                  className="w-full h-full object-contain object-[right_top]"
                />
              </div>

              {/* Text content Bottom Left */}
              <div className="absolute bottom-6 lg:bottom-8 left-6 lg:left-8 right-6 lg:right-8 z-20">
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-white mb-2 sm:mb-3 leading-snug">
                  <T>Stop the Guesswork</T>
                </h3>
                <p className="text-white text-xs sm:text-sm lg:text-base font-normal leading-relaxed max-w-[280px] sm:max-w-sm lg:max-w-md">
                  <T>Choosing a degree based on trends, popular courses, or others' choices can lead to the wrong future path.</T>
                </p>
              </div>
            </div>

            {/* ── CARD 2: Find Your Direction ── */}
            <div className="relative w-full max-w-2xl lg:max-w-none mx-auto lg:mx-0 lg:w-[640px] xl:w-[670px] h-[280px] sm:h-[320px] lg:h-[430px] xl:h-[450px] rounded-[28px] lg:rounded-[36px] bg-white text-[#19211c] flex-shrink-0 overflow-hidden shadow-lg border border-[#e2e8f0]">
              {/* Text content Top Center */}
              <div className="absolute top-6 lg:top-8 left-6 lg:left-8 right-6 lg:right-8 text-center z-20">
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-[#19211c] mb-2 sm:mb-3 leading-snug">
                  <T>Find Your Direction</T>
                </h3>
                <p className="text-[#19211c] text-xs sm:text-sm lg:text-base font-normal leading-relaxed max-w-[280px] sm:max-w-md lg:max-w-lg mx-auto">
                  <T>Marks alone do not define the right career. True clarity comes from understanding natural strengths and long-term fit.</T>
                </p>
              </div>

              {/* Illustration Bottom Center (increased size) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] sm:w-[300px] lg:w-[420px] xl:w-[460px] h-[130px] sm:h-[160px] lg:h-[250px] xl:h-[280px] pointer-events-none z-10">
                <img
                  src="/assets/situation/card2.svg"
                  alt="Find Your Direction"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
            </div>

            {/* ── CARD 3: Correct Your Course Before It Starts ── */}
            <div className="relative w-full max-w-2xl lg:max-w-none mx-auto lg:mx-0 lg:w-[640px] xl:w-[670px] h-[280px] sm:h-[320px] lg:h-[430px] xl:h-[450px] rounded-[28px] lg:rounded-[36px] bg-[#19211c] text-white flex-shrink-0 overflow-hidden shadow-lg border border-white/5">
              {/* Illustration Bottom Left (increased size) */}
              <div className="absolute bottom-0 left-0 w-[340px] sm:w-[420px] lg:w-[450px] xl:w-[500px] h-[180px] sm:h-[230px] lg:h-[250px] xl:h-[280px] pointer-events-none z-10">
                <img
                  src="/assets/situation/card3.svg"
                  alt="Correct Your Course"
                  className="w-full h-full object-contain object-[left_bottom]"
                />
              </div>

              {/* Text content Top Left */}
              <div className="absolute top-6 lg:top-8 left-6 lg:left-8 right-6 lg:right-8 z-20">
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-white mb-2 sm:mb-3 leading-snug">
                  <T>Correct Your Course Before It Starts</T>
                </h3>
                <p className="text-white text-xs sm:text-sm lg:text-base font-normal leading-relaxed max-w-[280px] sm:max-w-sm lg:max-w-md">
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
