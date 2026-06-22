"use client";

import React, { useState, useEffect } from "react";
import { T, useLanguage } from "@/contexts/LanguageContext";

const WhyOriginBI: React.FC = () => {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isTa = mounted && language === "ta";

  const comparisonData = [
    {
      feature: "Basis of Choice",
      oldWay: "Based on \"Market Trends\" or what relatives/friends suggest.",
      newWayEn: (
        <>
          Based on your child’s <span className="text-[#1ed36a] font-medium">Unique Behavioral</span> profile and natural strengths.
        </>
      ),
      newWayTa: (
        <>
          உங்கள் குழந்தையின் <span className="text-[#1ed36a] font-medium">தனித்துவமான நடத்தை</span> சுயவிவரம் மற்றும் இயற்கையான பலத்தின் அடிப்படையில்.
        </>
      )
    },
    {
      feature: "The Method",
      oldWay: "General marks in school or \"What do you like?\" questions.",
      newWayEn: (
        <>
          Proprietary <span className="text-[#1ed36a] font-medium">Behavioral Mapping</span> to see how their brain is naturally designed.
        </>
      ),
      newWayTa: (
        <>
          அவர்களின் மூளை இயற்கையாக எவ்வாறு வடிவமைக்கப்பட்டுள்ளது என்பதைப் பார்க்க <span className="text-[#1ed36a] font-medium">உரிமையாளர் நடத்தை வரைவு</span>.
        </>
      )
    },
    {
      feature: "The Outcome",
      oldWay: "Picking a degree and hoping it leads to a good career.",
      newWayEn: (
        <>
          Identifying the <span className="text-[#1ed36a] font-medium">Role first</span>, then picking the degree that fits.
        </>
      ),
      newWayTa: (
        <>
          முதலில் <span className="text-[#1ed36a] font-medium">பங்கை</span> அடையாளம் கண்டு, பின்னர் அதற்கு ஏற்ற பட்டத்தைத் தேர்ந்தெடுப்பது.
        </>
      )
    },
    {
      feature: "Family Stress",
      oldWay: "High anxiety and \"Dinner Table\" arguments over college choices.",
      newWayEn: (
        <>
          <span className="text-[#1ed36a] font-medium">Confidence</span> and <span className="text-[#1ed36a] font-medium">Peace</span> of Mind knowing the path is backed by science.
        </>
      ),
      newWayTa: (
        <>
          பாதை அறிவியலால் ஆதரிக்கப்படுகிறது என்பதை அறிவதில் <span className="text-[#1ed36a] font-medium">நம்பிக்கையும்</span> <span className="text-[#1ed36a] font-medium">நிம்மதியும்</span>.
        </>
      )
    },
    {
      feature: "The Goal",
      oldWay: "Just getting into \"A Good College\" or any popular branch.",
      newWayEn: (
        <>
          Finding the <span className="text-[#1ed36a] font-medium">Right Professional Fit</span> for long-term growth and success.
        </>
      ),
      newWayTa: (
        <>
          நீண்ட கால வளர்ச்சி மற்றும் வெற்றிக்கு <span className="text-[#1ed36a] font-medium">சரியான தொழில்முறை பொருத்தத்தைக்</span> கண்டறிதல்.
        </>
      )
    }
  ];

  return (
    <section id="why-originbi" className="relative w-full min-h-screen bg-[#19211c] text-white py-20 flex flex-col justify-center items-center overflow-hidden">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1920px] w-full mx-auto px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)] flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl md:text-[44px] font-sans font-medium text-center leading-tight mb-2 tracking-tight text-white">
          {isTa ? (
            <>
              <span className="text-[#1ed36a] font-medium">ஆரிஜின் பி.ஐ</span> ஏன்?
            </>
          ) : (
            <>
              Why <span className="text-[#1ed36a] font-medium">OriginBI?</span>
            </>
          )}
        </h2>
        
        {/* Subtitle */}
        <p className="text-white text-sm md:text-base font-sans font-medium tracking-wide text-center mb-16 max-w-xl">
          <T>The Difference Between Guessing and Knowing</T>
        </p>

        {/* DESKTOP LAYOUT (Table / Grid - Repositioned Border Outlines) */}
        <div className="hidden lg:flex w-full items-stretch justify-center relative">
          
          {/* LEFT CONTAINER (Feature & The Old Way - 60% Width) */}
          <div className="w-[60%] pl-[1px] pt-[1px] pb-[1px] pr-0 bg-gradient-to-br from-[#ED2F34] via-[#FDC00C] to-[#1ED36A] rounded-l-[24px] overflow-hidden">
            <div className="bg-[#121815] h-full rounded-l-[23px] overflow-hidden flex flex-col items-stretch">
              
              {/* Header Row */}
              <div className="h-[70px] border-b border-white/10 grid grid-cols-[33.33%_66.67%] w-full items-stretch">
                <div className="px-4 flex items-center justify-center text-[15px] text-white font-sans font-medium border-r border-white/10">
                  <T>Feature</T>
                </div>
                <div className="px-4 flex items-center justify-center text-[15px] text-white font-sans font-medium">
                  <T>The Old Way</T>
                  <span className="text-[#ff4d4d] font-medium ml-1.5">
                    <T>(High Risk)</T>
                  </span>
                </div>
              </div>

              {/* Body Rows */}
              {comparisonData.map((row, index) => {
                const isLast = index === comparisonData.length - 1;
                const isEvenRow = index % 2 === 1;
                return (
                  <div 
                    key={index} 
                    className={`h-[130px] grid grid-cols-[33.33%_66.67%] w-full items-stretch ${!isLast ? 'border-b border-white/10' : ''} ${isEvenRow ? 'bg-white/[0.03]' : ''}`}
                  >
                    {/* Feature Name */}
                    <div className="px-4 flex items-center justify-center text-center text-[16px] text-white font-sans font-medium border-r border-white/10">
                      <T>{row.feature}</T>
                    </div>
                    {/* The Old Way Text */}
                    <div className="px-8 flex items-center justify-center text-center text-[15px] text-white leading-relaxed font-sans font-medium">
                      <T>{row.oldWay}</T>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT CONTAINER (The OriginBI Way - 40% Width - Solid Green Border Outline) */}
          <div className="w-[40%] border border-[#1ed36a] rounded-r-[24px] overflow-hidden flex flex-col items-stretch">
            
            {/* OriginBI Header Row */}
            <div className="h-[70px] bg-[#1ed36a] flex flex-col sm:flex-row items-center justify-center gap-1.5 text-[15px] text-white font-sans font-medium">
              <span><T>The OriginBI Way</T></span>
              <span className="text-white font-medium text-[13px]"><T>(The Strategy)</T></span>
            </div>

            {/* OriginBI Body Rows */}
            {comparisonData.map((row, index) => {
              const isLast = index === comparisonData.length - 1;
              const isEvenRow = index % 2 === 1;
              return (
                <div 
                  key={index} 
                  className={`h-[130px] px-8 flex items-center justify-center text-center text-[15px] leading-relaxed font-sans font-medium text-white ${!isLast ? 'border-b border-[#1ed36a]/20' : ''} ${isEvenRow ? 'bg-[#1ed36a]/10' : 'bg-[#1ed36a]/5'}`}
                >
                  <div>
                    {isTa ? row.newWayTa : row.newWayEn}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE & TABLET LAYOUT (Stacked Cards with Custom Borders matching the Figma design) */}
        <div className="lg:hidden w-full flex flex-col gap-6 max-w-md sm:max-w-xl mx-auto">
          {comparisonData.map((row, index) => (
            <div 
              key={index} 
              className="w-full rounded-[20px] overflow-hidden border border-[#2d3732] bg-[#121815] shadow-xl"
            >
              {/* Card Header (Dark grey bar) */}
              <div className="bg-[#2d3531] px-5 py-4 border-b border-white/5 flex items-center">
                <span className="text-white text-[15px] sm:text-base font-sans font-medium tracking-wide">
                  <T>{row.feature}</T>
                </span>
              </div>
              
              {/* The Old Way Section (Light grey background) */}
              <div className="bg-[#e4e6e5] px-5 py-5 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-sans font-semibold tracking-wider uppercase">
                  <span className="text-[#6b7280]"><T>The Old Way</T></span>
                  <span className="text-[#ff4d4d] font-medium"><T>(High Risk)</T></span>
                </div>
                <p className="text-[#19211c] text-[14px] leading-relaxed font-sans font-medium">
                  <T>{row.oldWay}</T>
                </p>
              </div>
              
              {/* The OriginBI Way Section (Dark green background) */}
              <div className="bg-[#1b4630] px-5 py-5 flex flex-col gap-2 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-[11px] font-sans font-semibold tracking-wider uppercase text-[#1ed36a]">
                  <span><T>The OriginBI Way</T></span>
                  <span className="text-[#1ed36a]/90 font-medium"><T>(The Strategy)</T></span>
                </div>
                <div className="text-white text-[14px] leading-relaxed font-sans font-medium">
                  {isTa ? row.newWayTa : row.newWayEn}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyOriginBI;
