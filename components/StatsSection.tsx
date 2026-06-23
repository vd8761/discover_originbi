"use client";

import React, { useEffect, useRef, useState } from "react";
import { T } from "@/contexts/LanguageContext";

const StatsSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleDragStart = (e: React.MouseEvent) => {
    if (!dragRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - dragRef.current.offsetLeft);
    setScrollLeft(dragRef.current.scrollLeft);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragRef.current) return;
    e.preventDefault();
    const x = e.pageX - dragRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    dragRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && dragRef.current) {
      const el = dragRef.current;
      const timer = setTimeout(() => {
        el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  return (
    <section className="relative w-full bg-[#f4f4f4] pt-10 md:pt-14 lg:pt-16 pb-0 overflow-hidden">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23f4f4f4'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-lg sm:text-xl lg:text-[24px] font-normal tracking-[0.35em] text-[#19211c] opacity-95 uppercase">
            <T>FROM INSIGHT TO IMPACT</T>
          </h2>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-stretch relative z-30">
          {[
            {
              label: "STUDENTS GUIDED",
              value: "10K+",
              isMiddle: false,
              path: "M 0,8 Q 0,0 8,0 L 92,0 Q 100,0 100,8 L 100,92 Q 100,100 92,100 L 8,82 Q 0,82 0,74 Z",
            },
            {
              label: "CAREER PATHS MAPPED",
              value: "30K+",
              isMiddle: true,
              path: "M 0,8 Q 0,0 8,0 L 92,0 Q 100,0 100,8 L 100,92 Q 100,100 92,100 L 8,100 Q 0,100 0,92 Z",
            },
            {
              label: "CAREER CLARITY GAINED",
              value: "85%",
              isMiddle: false,
              path: "M 0,8 Q 0,0 8,0 L 92,0 Q 100,0 100,8 L 100,74 Q 100,82 92,82 L 8,100 Q 0,100 0,92 Z",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`relative group flex flex-col justify-between py-10 px-8 min-h-[300px] transition-all duration-300 hover:-translate-y-2 hover:z-20 ${
                stat.isMiddle
                  ? "md:scale-105 md:-translate-y-1 md:hover:-translate-y-3 z-10"
                  : "z-0"
              }`}
            >
              {/* Card Shape background */}
              <svg
                className={`absolute inset-0 w-full h-full ${
                  stat.isMiddle ? "text-[#1ed36a]" : "text-[#19211c]"
                } filter drop-shadow-[0_12px_24px_rgba(25,33,28,0.12)]`}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                fill="currentColor"
              >
                <path
                  d={stat.path}
                  vectorEffect="non-scaling-stroke"
                  className={stat.isMiddle ? "stroke-transparent" : "stroke-white/10"}
                  strokeWidth="1.5"
                />
              </svg>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-start text-center h-full pt-2 pb-6">
                <span
                  className={`text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase mb-4 transition-colors duration-300 ${
                    stat.isMiddle ? "text-white/90" : "text-white/60"
                  }`}
                >
                  <T>{stat.label}</T>
                </span>
                <span
                  className={`text-6xl sm:text-7xl lg:text-[76px] xl:text-[84px] font-bold font-galderglynn tracking-tight transition-transform duration-300 group-hover:scale-105 ${
                    stat.isMiddle ? "text-white" : "text-[#1ed36a]"
                  }`}
                >
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Group Photo */}
      <div
        ref={dragRef}
        onMouseDown={handleDragStart}
        onMouseLeave={handleDragLeave}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDragMove}
        className={`relative w-full h-[290px] sm:h-[370px] md:h-[450px] lg:h-[510px] xl:h-[550px] overflow-x-auto overflow-y-hidden scrollbar-none -mt-16 md:-mt-28 lg:-mt-36 z-20 select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
      >
        <img
          src="/assets/group.png"
          alt="OriginBI Students Group"
          className="w-[140vw] sm:w-[120vw] lg:w-full h-full object-cover object-top block pointer-events-none transform scale-115 origin-top"
        />
      </div>
    </section>
  );
};

export default StatsSection;
