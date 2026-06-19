"use client";

import React, { useRef, useState, useEffect } from "react";
import { T } from "@/contexts/LanguageContext";

const SituationSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Desktop scrolling translation
  const [translateAmount, setTranslateAmount] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  // Mobile/Tablet Interactive Stack State
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointerStartX, setPointerStartX] = useState(0);
  const [pointerCurrentX, setPointerCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeAwayDirection, setSwipeAwayDirection] = useState<"left" | "right" | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return;

      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      const container = containerRef.current;
      const track = trackRef.current;

      const rect = container.getBoundingClientRect();
      const scrollRange = rect.height - window.innerHeight;
      const scrolled = -rect.top;

      let progress = 0;
      if (scrollRange > 0) {
        progress = Math.max(0, Math.min(1, scrolled / scrollRange));
      }

      if (mobile) {
        setTranslateAmount(0);
        return;
      }

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
    let progress = 0;
    if (scrollRange > 0) {
      progress = Math.max(0, Math.min(1, currentScrolled / scrollRange));
    }

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

  // Swipe animation trigger
  const triggerSwipeAway = (direction: "left" | "right") => {
    setIsTransitioning(true);
    setSwipeAwayDirection(direction);

    // Both swipe directions dismiss the card and reveal the next card in the deck
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
      setSwipeAwayDirection(null);
      setIsTransitioning(false);
    }, 350);
  };

  // Mobile Swipe/Drag Event Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || isTransitioning) return; // Only respond to primary click
    setPointerStartX(e.clientX);
    setPointerCurrentX(e.clientX);
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPointerCurrentX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const diff = pointerStartX - pointerCurrentX;
    const threshold = 70; // swipe detection threshold

    if (diff > threshold) {
      triggerSwipeAway("left");
    } else if (diff < -threshold) {
      triggerSwipeAway("right");
    } else if (Math.abs(diff) < 5) {
      // Tap detected -> cycle forward
      triggerSwipeAway("left");
    }
  };

  const getCardStyle = (cardIndex: number) => {
    if (!isMobile) return {};

    // Relative position in circular stack:
    // 0 = active/front, 1 = middle, 2 = back
    const position = (cardIndex - activeIndex + 3) % 3;

    // Real-time pointer drag translation
    const dragOffset = isDragging && position === 0 ? pointerCurrentX - pointerStartX : 0;
    const dragProgress = Math.min(1, Math.abs(dragOffset) / 150);

    let translateY = 0;
    let translateX = 0;
    let rotate = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 30 - position * 10;
    let pointerEvents: "auto" | "none" = position === 0 ? "auto" : "none";

    let transitionStr = "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1), z-index 0.35s step-end";

    if (isDragging && position === 0) {
      // Remove transform transition during drag to prevent drag lag
      transitionStr = "opacity 0.15s ease-out";
    }

    if (position === 0) {
      if (swipeAwayDirection === "left") {
        translateX = -120;
        translateY = 20; // Shift front card down
        rotate = -12;
        opacity = 0;
      } else if (swipeAwayDirection === "right") {
        translateX = 120;
        translateY = 20; // Shift front card down
        rotate = 12;
        opacity = 0;
      } else {
        translateX = dragOffset;
        translateY = 20; // Shift front card down
        rotate = (dragOffset / 300) * 15; // rotate slightly based on drag direction
        opacity = 1 - Math.min(0.4, Math.abs(dragOffset) / 600);
      }
      scale = 1;
    } else if (position === 1) {
      // Scales up and slides down to active card's position (from 0px to 20px)
      const progress = swipeAwayDirection !== null ? 1 : dragProgress;
      translateY = 0 + progress * 20;
      scale = 0.94 + progress * 0.06;
      opacity = 1;
    } else if (position === 2) {
      // Scales up and slides down to middle card's position (from -20px to 0px)
      const progress = swipeAwayDirection !== null ? 1 : dragProgress;
      translateY = -20 + progress * 20;
      scale = 0.88 + progress * 0.06;
      opacity = progress; // Hide when idle, fade in during swipe
    }

    const xUnit = (position === 0 && swipeAwayDirection !== null) ? "%" : "px";

    return {
      transform: `translate3d(${translateX}${xUnit}, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
      opacity,
      pointerEvents,
      zIndex,
      transition: transitionStr,
    } as React.CSSProperties;
  };

  return (
    <div id="problem" ref={containerRef} className="relative h-auto lg:h-[250vh] py-12 lg:py-0 bg-[#F4F4F4]">
      {/* Sticky/Relative Frame */}
      <div
        ref={stickyRef}
        className="relative lg:sticky lg:top-0 h-auto lg:h-screen w-full overflow-visible lg:overflow-hidden flex flex-col justify-start lg:justify-between pt-6 pb-8 lg:pt-10 lg:pb-8 bg-[#F4F4F4] text-[#19211c] select-none"
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
        <div className="flex-1 flex flex-col justify-center min-h-0 relative z-20 w-full overflow-visible lg:overflow-hidden mt-10 lg:mt-0">
          <div
            ref={trackRef}
            onPointerDown={isMobile ? handlePointerDown : undefined}
            onPointerMove={isMobile ? handlePointerMove : undefined}
            onPointerUp={isMobile ? handlePointerUp : undefined}
            onPointerCancel={isMobile ? handlePointerUp : undefined}
            className="grid grid-cols-1 grid-rows-1 justify-items-center w-full px-6 lg:flex lg:flex-row gap-0 lg:gap-8 lg:px-0 lg:pl-10 lg:pr-10 2xl:pl-[clamp(24px,2.5vw,48px)] 2xl:pr-[clamp(24px,2.5vw,48px)] transition-transform duration-100 ease-out will-change-transform lg:w-auto translate-x-0 lg:translate-x-[var(--translate-amount)] touch-pan-y"
            style={{
              "--translate-amount": `-${translateAmount}px`,
              cursor: isMobile ? (isDragging ? "grabbing" : "grab") : undefined,
            } as React.CSSProperties}
          >
            {/* ── CARD 1: Stop the Guesswork ── */}
            <div
              style={getCardStyle(0)}
              className="col-start-1 row-start-1 relative w-full max-w-2xl lg:max-w-none mx-auto lg:mx-0 lg:w-[640px] xl:w-[670px] h-[390px] sm:h-[420px] lg:h-[430px] xl:h-[450px] rounded-[28px] lg:rounded-[36px] bg-[#19211c] text-white flex-shrink-0 overflow-hidden shadow-lg border border-white/5 select-none"
            >
              {/* Illustration Top Right */}
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
            <div
              style={getCardStyle(1)}
              className="col-start-1 row-start-1 relative w-full max-w-2xl lg:max-w-none mx-auto lg:mx-0 lg:w-[640px] xl:w-[670px] h-[390px] sm:h-[420px] lg:h-[430px] xl:h-[450px] rounded-[28px] lg:rounded-[36px] bg-white text-[#19211c] flex-shrink-0 overflow-hidden shadow-lg border border-[#e2e8f0] select-none"
            >
              {/* Text content Top Center */}
              <div className="absolute top-6 lg:top-8 left-6 lg:left-8 right-6 lg:right-8 text-center z-20">
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-semibold text-[#19211c] mb-2 sm:mb-3 leading-snug">
                  <T>Find Your Direction</T>
                </h3>
                <p className="text-[#19211c] text-xs sm:text-sm lg:text-base font-normal leading-relaxed max-w-[280px] sm:max-w-md lg:max-w-lg mx-auto">
                  <T>Marks alone do not define the right career. True clarity comes from understanding natural strengths and long-term fit.</T>
                </p>
              </div>

              {/* Illustration Bottom Center */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[240px] sm:w-[300px] lg:w-[420px] xl:w-[460px] h-[130px] sm:h-[160px] lg:h-[250px] xl:h-[280px] pointer-events-none z-10">
                <img
                  src="/assets/situation/card2.svg"
                  alt="Find Your Direction"
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
            </div>

            {/* ── CARD 3: Correct Your Course Before It Starts ── */}
            <div
              style={getCardStyle(2)}
              className="col-start-1 row-start-1 relative w-full max-w-2xl lg:max-w-none mx-auto lg:mx-0 lg:w-[640px] xl:w-[670px] h-[390px] sm:h-[420px] lg:h-[430px] xl:h-[450px] rounded-[28px] lg:rounded-[36px] bg-[#19211c] text-white flex-shrink-0 overflow-hidden shadow-lg border border-white/5 select-none"
            >
              {/* Illustration Bottom Left */}
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

          {/* Mobile Pagination Dots */}
          <div className="flex lg:hidden justify-center items-center gap-2 mt-8 z-30">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isTransitioning) {
                    setActiveIndex(index);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-[#1ed36a] w-6"
                    : "bg-black/20"
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="hidden lg:block" />
      </div>
    </div>
  );
};

export default SituationSection;
