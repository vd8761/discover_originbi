"use client";

import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Step {
  id: number;
  titleEn: string;
  titleTa: string;
  descEn: string;
  descTa: string;
}

const HowItWorks: React.FC = () => {
  const { language } = useLanguage();
  const isTa = language === "ta";

  const steps: Step[] = [
    {
      id: 1,
      titleEn: "CHOOSE THE RIGHT PATH IN YOUR CAREER",
      titleTa: "உங்கள் தொழிலில் சரியான பாதையைத் தேர்வு செய்யுங்கள்",
      descEn: "Name, Email, Age, Education, etc.",
      descTa: "பெயர், மின்னஞ்சல், வயது, கல்வி போன்றவை.",
    },
    {
      id: 2,
      titleEn: "MAKE PAYMENT",
      titleTa: "கட்டணம் செலுத்துங்கள்",
      descEn: "via UPI, Card, or NetBanking",
      descTa: "UPI, கார்டு அல்லது நெட்பேங்கிங் மூலம்",
    },
    {
      id: 3,
      titleEn: "RECEIVE CONFIRMATION EMAIL",
      titleTa: "உறுதிப்படுத்தல் மின்னஞ்சலைப் பெறுங்கள்",
      descEn: "with instructions",
      descTa: "வழிமுறைகளுடன்",
    },
    {
      id: 4,
      titleEn: "LOGIN AND START ASSESSMENT",
      titleTa: "உள்நுழைந்து மதிப்பீட்டைத் தொடங்குங்கள்",
      descEn: "Access your dashboard to begin the test",
      descTa: "தேர்வைத் தொடங்க உங்கள் டாஷ்போர்டை அணுகவும்",
    },
    {
      id: 5,
      titleEn: "FINISH TEST & RECEIVE REPORT",
      titleTa: "தேர்வை முடித்து அறிக்கையைப் பெறுங்கள்",
      descEn: "Instant digital results",
      descTa: "உடனடி டிஜிட்டல் முடிவுகள்",
    },
    {
      id: 6,
      titleEn: "CHOOSE THE RIGHT PATH IN YOUR CAREER",
      titleTa: "உங்கள் தொழிலில் சரியான பாதையைத் தேர்வு செய்யுங்கள்",
      descEn: "Get expert guidance and clarity",
      descTa: "நிபுணர் வழிகாட்டுதல் மற்றும் தெளிவைப் பெறுங்கள்",
    },
  ];

  return (
    <section className="relative w-full bg-[#f4f4f4] text-[#19211c] py-20 px-6 md:px-12 xl:px-16 overflow-hidden">
      {/* Isolated CSS for orbital pulsing animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes orbit-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.06);
            opacity: 0.4;
          }
        }
        @keyframes orbit-pulse-reverse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(0.94);
            opacity: 0.3;
          }
        }
        .animate-orbit-1 {
          animation: orbit-pulse 3s ease-in-out infinite;
        }
        .animate-orbit-2 {
          animation: orbit-pulse-reverse 4s ease-in-out infinite;
        }
      `}} />

      {/* Card Grain Texture overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Title & Subtitle */}
        <h2 className="text-[32px] md:text-[36px] font-sans font-medium tracking-tight mb-3 text-[#19211c]">
          {isTa ? "எவ்வாறு செயல்படுகிறது" : "How it works"}
        </h2>
        <p className="text-xs md:text-sm text-[#19211c] font-light tracking-wide max-w-xl mb-16 leading-relaxed">
          {isTa 
            ? "உங்கள் தொழில் தெளிவுக்கான பயணம் எளிமையானது, டிஜிட்டலானது மற்றும் முடிவுகளுக்காக வடிவமைக்கப்பட்டது. உங்கள் திறனை வெளிக்கொணர இந்த ஆறு படிகளைப் பின்பற்றுங்கள்"
            : "Your journey to career clarity is simple, digital, and designed for results. Follow these six steps to unlock your potential"
          }
        </p>

        {/* ─── DESKTOP HORIZONTAL STEPPER ─── */}
        <div className="hidden lg:block relative w-full px-4">
          {/* Connector Line passing through circle centers */}
          <div className="absolute left-[8.33%] right-[8.33%] top-[56px] -translate-y-1/2 h-[3px] bg-gradient-to-r from-[#FF4B4B] via-[#FF7A00] via-[#FFB800] via-[#A8DF00] to-[#1ED36A] z-0" />

          {/* Steps Horizontal Row */}
          <div className="grid grid-cols-6 gap-6 relative z-10">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center group">
                
                {/* Circle Container with Concentric Rings */}
                <div className="relative w-28 h-28 flex items-center justify-center mb-5">
                  {/* Gradient Concentric Ring 1 (Inner 4-Color Gradient) */}
                  <div 
                    className="absolute inset-[-10px] rounded-full p-[1.5px] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-0 pointer-events-none animate-orbit-1"
                    style={{
                      background: 'linear-gradient(135deg, #ED2F34, #EF5921, #FDC00C, #1ED36A)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />
                  
                  {/* Gradient Concentric Ring 2 (Outer 4-Color Gradient) */}
                  <div 
                    className="absolute inset-[-20px] rounded-full p-[1.2px] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-0 pointer-events-none delay-[50ms] animate-orbit-2"
                    style={{
                      background: 'linear-gradient(225deg, #ED2F34, #EF5921, #FDC00C, #1ED36A)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  {/* 3D Flip Card */}
                  <div className="w-full h-full relative [perspective:1000px] z-10">
                    <div className="w-full h-full relative [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-transform duration-500 ease-out rounded-full">
                      {/* Front: Inactive Circle (No Border, Plain Soft Grey) */}
                      {/* Removed z-index to resolve 3D layer sorting and hide edge bleeding */}
                      <div className="absolute inset-0 w-full h-full rounded-full bg-[#e8e8e8] flex items-center justify-center font-sans font-extrabold text-[42px] text-[#19211c] [backface-visibility:hidden] transition-all duration-300">
                        {step.id}
                      </div>
                      
                      {/* Back: Active Green Circle */}
                      {/* Removed z-index to resolve 3D layer sorting and hide edge bleeding */}
                      <div 
                        className="absolute inset-0 w-full h-full rounded-full flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden"
                        style={{
                          background: 'radial-gradient(circle at center, #1ed36a 0%, #15aa52 100%)',
                        }}
                      >
                        {/* Noise overlay */}
                        <div 
                          className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          }}
                        />
                        {/* Icon */}
                        <img 
                          src="/steps/payment.svg" 
                          alt={`Step ${step.id}`} 
                          className="w-12 h-12 object-contain relative z-10" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Block */}
                <h4 className="text-[11.5px] font-bold tracking-wider text-[#19211c] max-w-[160px] leading-tight uppercase text-center min-h-[34px] flex items-center justify-center">
                  {isTa ? step.titleTa : step.titleEn}
                </h4>
                <p className="text-[10.5px] text-[#19211c] mt-1 font-normal max-w-[150px] leading-relaxed text-center">
                  {isTa ? step.descTa : step.descEn}
                </p>

              </div>
            ))}
          </div>
        </div>

        {/* ─── MOBILE/TABLET VERTICAL STEPPER ─── */}
        <div className="block lg:hidden relative w-full max-w-md mx-auto text-left px-0">
          {/* Vertical Connector Line centered exactly at 40px (half of 80px w-20 circle) */}
          <div className="absolute left-[40px] -translate-x-1/2 top-[40px] bottom-[40px] w-[3px] bg-gradient-to-b from-[#FF4B4B] via-[#FF7A00] via-[#FFB800] via-[#A8DF00] to-[#1ED36A] z-0" />

          {/* Steps Vertical List */}
          <div className="flex flex-col gap-10 relative z-10">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-6 relative group">
                
                {/* Circle Container with Concentric Rings */}
                <div className="relative w-20 h-20 flex-shrink-0 flex items-center justify-center">
                  {/* Gradient Concentric Ring 1 (Inner 4-Color Gradient) */}
                  <div 
                    className="absolute inset-[-8px] rounded-full p-[1.5px] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-0 pointer-events-none animate-orbit-1"
                    style={{
                      background: 'linear-gradient(135deg, #ED2F34, #EF5921, #FDC00C, #1ED36A)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />
                  
                  {/* Gradient Concentric Ring 2 (Outer 4-Color Gradient) */}
                  <div 
                    className="absolute inset-[-16px] rounded-full p-[1.2px] opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out z-0 pointer-events-none delay-[50ms] animate-orbit-2"
                    style={{
                      background: 'linear-gradient(225deg, #ED2F34, #EF5921, #FDC00C, #1ED36A)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />

                  {/* 3D Flip Card */}
                  <div className="w-full h-full relative [perspective:1000px] z-10">
                    <div className="w-full h-full relative [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-transform duration-500 ease-out rounded-full">
                      {/* Front: Inactive Circle */}
                      {/* Removed z-index to resolve 3D layer sorting and hide edge bleeding */}
                      <div className="absolute inset-0 w-full h-full rounded-full bg-[#e8e8e8] flex items-center justify-center font-sans font-extrabold text-[32px] text-[#19211c] [backface-visibility:hidden]">
                        {step.id}
                      </div>
                      
                      {/* Back: Active Green Circle */}
                      {/* Removed z-index to resolve 3D layer sorting and hide edge bleeding */}
                      <div 
                        className="absolute inset-0 w-full h-full rounded-full flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden"
                        style={{
                          background: 'radial-gradient(circle at center, #1ed36a 0%, #15aa52 100%)',
                        }}
                      >
                        {/* Noise overlay */}
                        <div 
                          className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-overlay"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                          }}
                        />
                        {/* Icon */}
                        <img 
                          src="/steps/payment.svg" 
                          alt={`Step ${step.id}`} 
                          className="w-8 h-8 object-contain relative z-10" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Text Block */}
                <div className="flex-1 py-1">
                  <h4 className="text-xs font-bold text-[#19211c] uppercase tracking-wider leading-tight">
                    {isTa ? step.titleTa : step.titleEn}
                  </h4>
                  <p className="text-[10.5px] text-[#19211c] font-normal mt-0.5 leading-relaxed">
                    {isTa ? step.descTa : step.descEn}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
