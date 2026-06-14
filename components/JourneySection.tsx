"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { T, useLanguage } from "@/contexts/LanguageContext";

const JourneySection: React.FC = () => {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [mobileActiveStep, setMobileActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const sectionRect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    const viewportH = window.innerHeight;

    // Scroll progress calculations
    const totalScroll = sectionHeight - viewportH;
    if (totalScroll <= 0) return;

    const scrolled = -sectionRect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScroll));

    // Map scroll progress to active step
    let newActive = 0;
    if (progress < 0.33) {
      newActive = 0;
    } else if (progress < 0.66) {
      newActive = 1;
    } else {
      newActive = 2;
    }
    setActiveStep(newActive);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  // Content for the three steps
  const steps = [
    {
      step: 1,
      firstPartEn: "Connecting the",
      secondPartEn: "Dots",
      firstPartTa: "புள்ளிகளை",
      secondPartTa: "இணைத்தல்",
      feelingEn: "Finally, someone understands how I actually think, not just how many marks I score.",
      feelingTa: "நான் எவ்வளவு மதிப்பெண்கள் பெறுகிறேன் என்பதைக் காட்டிலும், நான் உண்மையில் எப்படி சிந்திக்கிறேன் என்பதை ஒருவர் புரிந்துகொள்கிறார்.",
      whatHappensEn: (
          <>
            Your child takes our{" "}
            <span className="text-[#1ed36a] font-bold">
            Proprietary Behavioral Intelligence Assessment
          </span>
            . It is not a pass/fail school exam, but a discovery of their natural brain wiring.
          </>
      ),
      whatHappensTa: (
          <>
            உங்கள் குழந்தை எங்களது{" "}
            <span className="text-[#1ed36a] font-bold">
            உரிமையுடைமை நடத்தை நுண்ணறிவு மதிப்பீட்டை
          </span>{" "}
            மேற்கொள்கிறார். இது தேர்ச்சி/தோல்வி வகை தேர்வு அல்ல; அவர்களின் இயல்பான சிந்தனை அமைப்பை கண்டறியும் ஒரு செயல்முறை.
          </>
      ),
      resultEn: (
          <>
            We identify their core strengths and decision-making style, showing you exactly what they are{" "}
            <span className="text-[#1ed36a] font-bold">"built"</span> for before you spend a rupee on college fees.
          </>
      ),
      resultTa: (
          <>
            அவர்களின் முக்கிய திறன்களையும், முடிவெடுக்கும் முறையையும் நாங்கள் தெளிவாக அடையாளம் காண்கிறோம். அவர்கள் எந்த துறைக்கு இயல்பாக{" "}
            <span className="text-[#1ed36a] font-bold">பொருந்துகிறார்கள்</span> என்பதை, கல்லூரி கட்டணத்தில் ஒரு ரூபாயும் செலவிடும் முன்பே உங்களுக்குத் தெளிவுபடுத்துகிறோம்.
          </>
      ),
    },
    {
      step: 2,
      firstPartEn: "Finding Your",
      secondPartEn: "Natural Blueprint",
      firstPartTa: "உங்கள் பிறவித் திறன்",
      secondPartTa: "அடையாளத்தை கண்டறிதல்",
      feelingEn: "Now we see the link between their personality and the right degree.",
      feelingTa: "இперь அவர்களின் ஆளுமைக்கும் சரியான பட்டத்திற்கும் உள்ள தொடர்பை நாம் காண்கிறோம்.",
      whatHappensEn: (
          <>
            We take the assessment data and match it against{" "}
            <span className="text-[#1ed36a] font-bold">thousands of real-world</span> professional roles and industry requirements.
          </>
      ),
      whatHappensTa: (
          <>
            நாங்கள் மதிப்பீட்டுத் தரவை எடுத்து{" "}
            <span className="text-[#1ed36a] font-bold">ஆயிரக்கணக்கான நிஜ உலக</span> தொழில்முறை பாத்திரங்கள் மற்றும் தொழில் தேவைகளுடன் பொருத்துகிறோம்.
          </>
      ),
      resultEn: (
          <>
            You see the perfect{" "}
            <span className="text-[#1ed36a] font-bold">"fit"</span> between your child's personality and the modern career landscape. We show you the{" "}
            <span className="text-[#1ed36a] font-bold">Role</span> they are meant for, which makes choosing the{" "}
            <span className="text-[#1ed36a] font-bold">Course</span> easy.
          </>
      ),
      resultTa: (
          <>
            ஆளுமைக்கும் நவீன தொழில் நிலப்பரப்புக்கும்{" "}
            <span className="text-[#1ed36a] font-bold">"சரியான பொருத்தத்தை"</span> நீங்கள் பார்க்கிறீர்கள். அவர்கள் எதற்கென உருவாக்கப்பட்ட{" "}
            <span className="text-[#1ed36a] font-bold">தொழில் பாத்திரத்தை</span> நாங்கள் உங்களுக்குக் காட்டுகிறோம், இது{" "}
            <span className="text-[#1ed36a] font-bold">படிப்பைத்</span> தேர்ந்தெடுப்பதை எளிதாக்குகிறது.
          </>
      ),
    },
    {
      step: 3,
      firstPartEn: "Following Your",
      secondPartEn: "Personalized Roadmap",
      firstPartTa: "உங்கள் தனிப்பயனாக்கப்பட்ட",
      secondPartTa: "வரைபடத்தைப் பின்பற்றுதல்",
      feelingEn: "We finally have a plan we can trust. No more confusion about which college or branch to pick.",
      feelingTa: "இறுதியாக நாம் நம்பக்கூடிய ஒரு திட்டம் வந்துள்ளது. எந்த கல்லூரியை அல்லது பிரிவை தேர்வு செய்வது என்பது குறித்து இனி எந்த குழப்பமும் இல்லை.",
      whatHappensEn: (
          <>
            We provide a{" "}
            <span className="text-[#1ed36a] font-bold">Step-by-Step Action Plan</span> designed specifically for the transition from school to college.
          </>
      ),
      whatHappensTa: (
          <>
            பள்ளியிலிருந்து கல்லூரிக்கு மாறுவதற்காக வடிவமைக்கப்பட்ட{" "}
            <span className="text-[#1ed36a] font-bold">படிப்படியான செயல் திட்டத்தை</span> நாங்கள் வழங்குகிறோம்.
          </>
      ),
      resultEn: (
          <>
            You get a clear list of the degrees and specializations that will lead to long-term success, removing the stress and risk of a{" "}
            <span className="text-[#1ed36a] font-bold">"wrong-fit"</span> choice.
          </>
      ),
      resultTa: (
          <>
            நீண்ட கால வெற்றிக்கு வழிவகுக்கும் பட்டங்கள் மற்றும் சிறப்புப் படிப்புகளின் தெளிவான பட்டியலை நீங்கள் பெறுகிறீர்கள், இது ஒரு{" "}
            <span className="text-[#1ed36a] font-bold">"தவறான பொருத்தத்"</span> தேர்வின் மன அழுத்தம் மற்றும் அபாயத்தை நீக்குகிறது.
          </>
      ),
    },
  ];

  const isTa = language === "ta";

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative w-full bg-[#19211c] text-white"
    >
      {/* Background Noise Texture ("moisture") */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* MOBILE LAYOUT */}
      <div className="lg:hidden relative z-10 py-16 px-6 max-w-xl mx-auto flex flex-col gap-12">
        {/* Mobile Header */}
        <div>
          <h2 className="text-white text-xs uppercase tracking-[0.2em] font-medium mb-1 opacity-70">
            <T>Your Journey to</T>
          </h2>
          <h3 className="text-white text-2xl sm:text-3xl font-bold font-sans">
            <T>Career Certainty</T>
          </h3>
          <p className="text-white/80 text-sm mt-2 font-light">
            <T>3 Simple Steps to Stop Guessing and Start Growing</T>
          </p>
        </div>

        {/* Steps List */}
        <div className="flex flex-col">
          {steps.map((step, idx) => {
            const isOpen = mobileActiveStep === idx;
            return (
              <div key={idx} className="flex flex-col">
                {/* Step Header */}
                <div 
                  className="flex items-start gap-3 cursor-pointer select-none"
                  onClick={() => setMobileActiveStep(isOpen ? -1 : idx)}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 mt-0.5 transition-all duration-300 ${
                    isOpen 
                      ? "bg-[#1ed36a] text-white font-bold" 
                      : "border border-white/30 text-white/50"
                  }`}>
                    {step.step}
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-xl font-bold leading-tight transition-colors duration-300">
                      <span className={isOpen ? "text-white" : "text-white/70"}>
                        {isTa ? step.firstPartTa : step.firstPartEn}{" "}
                      </span>
                      <span className={isOpen ? "text-[#1ed36a]" : "text-white/70"}>
                        {isTa ? step.secondPartTa : step.secondPartEn}
                      </span>
                    </h4>
                  </div>
                </div>

                {/* Collapsible Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col gap-6 pt-6 pb-2">
                    {/* Quote Block under Title */}
                    <div className="pl-11 flex flex-col items-start">
                      <img
                        src="/assets/icons/colored_quotes.svg"
                        alt="quotes"
                        className="w-5 h-auto mb-2 opacity-90"
                      />
                      <p className="italic text-white text-sm leading-relaxed font-light">
                        "{isTa ? step.feelingTa : step.feelingEn}"
                      </p>
                    </div>

                    {/* Separation Line before What Happens */}
                    <div className="w-full h-px bg-white/10" />

                    {/* Content Panel */}
                    <div className="pl-11 flex flex-col gap-6">
                      <div>
                        <h5 className="text-[#1ed36a] text-xs font-bold uppercase tracking-[0.15em] mb-2">
                          <T>What Happens</T>
                        </h5>
                        <p className="text-white text-sm leading-relaxed font-light">
                          {isTa ? step.whatHappensTa : step.whatHappensEn}
                        </p>
                      </div>

                      {/* Horizontal Separator between What Happens and Result */}
                      <div className="w-full h-px bg-white/10" />

                      <div>
                        <h5 className="text-[#1ed36a] text-xs font-bold uppercase tracking-[0.15em] mb-2">
                          <T>The Result</T>
                        </h5>
                        <p className="text-white text-sm leading-relaxed font-light">
                          {isTa ? step.resultTa : step.resultEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider between Steps */}
                {idx < steps.length - 1 && (
                  <div className="w-full h-px bg-white/10 my-6" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* DESKTOP LAYOUT (Sticky Scrollytelling) */}
      <div
        className="hidden lg:block relative"
        style={{ minHeight: "240vh" }}
      >
        <div className="sticky top-0 h-screen w-full flex items-stretch">
          <div className="max-w-[1920px] mx-auto w-full flex items-stretch px-10 2xl:px-[clamp(24px,2.5vw,48px)]">
            
            {/* ─── LEFT COLUMN: Sticky Sidebar ─── */}
            <div className="w-[45%] flex flex-col justify-between py-16 pr-12 relative border-r border-white/10">
              
              {/* Header */}
              <div>
                <h2 className="text-white text-[16px] tracking-[0.2em] font-medium uppercase opacity-80 mb-2">
                  <T>Your Journey to</T> <span className="text-[#1ed36a]"><T>Career Certainty</T></span>
                </h2>
                <p className="text-white/60 text-sm font-light">
                  <T>3 Simple Steps to Stop Guessing and Start Growing</T>
                </p>
              </div>

              {/* Steps Vertical List */}
              <div className="flex flex-col w-full my-auto">
                {steps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <React.Fragment key={idx}>
                      {idx === 0 && <div className="w-full h-px bg-white/10" />}
                      <div className="flex flex-col items-start py-6 transition-all duration-300 w-full">
                        {/* Title Row */}
                        <div className="flex items-center w-full">
                          {/* Circle Number */}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-all duration-300 ${
                              isActive
                                ? "bg-[#1ed36a] text-white font-bold"
                                : "border border-white text-white font-semibold"
                            }`}
                          >
                            {step.step}
                          </div>

                          {/* Title text */}
                          <div className="ml-5 flex-1 text-left">
                            <div
                              className={`transition-all duration-500 origin-left ${
                                isActive
                                  ? "text-2xl sm:text-3xl lg:text-[36px] xl:text-[40px] font-semibold leading-tight tracking-tight text-white animate-fade-in"
                                  : "text-lg sm:text-xl font-medium leading-tight tracking-tight text-white"
                              }`}
                            >
                              <span className="text-white">
                                {isTa ? step.firstPartTa : step.firstPartEn}{" "}
                              </span>
                              <span
                                className={`transition-all duration-500 ${
                                  isActive
                                    ? "text-[#1ed36a] block mt-1"
                                    : "text-white"
                                }`}
                              >
                                {isTa ? step.secondPartTa : step.secondPartEn}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Quote Block - displayed only under active step, indented */}
                        <div
                          className={`transition-all duration-700 ease-out overflow-hidden flex flex-col items-start pl-[52px] ${
                            isActive
                              ? "max-h-[200px] opacity-100 mt-5 pointer-events-auto"
                              : "max-h-0 opacity-0 pointer-events-none"
                          }`}
                        >
                          <img
                            src="/assets/icons/colored_quotes.svg"
                            alt="quotes"
                            className="w-6 h-auto mb-2 opacity-95"
                          />
                          <p className="italic text-white text-[15px] xl:text-[16px] leading-relaxed font-light max-w-sm">
                            "{isTa ? step.feelingTa : step.feelingEn}"
                          </p>
                        </div>
                      </div>
                      <div className="w-full h-px bg-white/10" />
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Bottom Spacer/Placeholder to align layout */}
              <div className="h-6" />
            </div>

            {/* ─── RIGHT COLUMN: Stacked Cards Area ─── */}
            <div className="w-[55%] pl-16 flex items-center justify-center relative">
              <div className="relative w-full max-w-xl h-[480px] sm:h-[450px] lg:h-[420px] flex items-center overflow-visible">
                {steps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <div
                      key={idx}
                      className={`absolute w-full flex flex-col transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        isActive
                          ? "opacity-100 translate-x-0 scale-100 pointer-events-auto z-10"
                          : activeStep > idx
                          ? "opacity-0 -translate-x-12 scale-95 pointer-events-none z-0"
                          : "opacity-0 translate-x-12 scale-105 pointer-events-none z-0"
                      }`}
                    >
                      {/* What Happens Block */}
                      <div className={`flex flex-col text-left transition-all duration-700 ease-out delay-100 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}>
                        <h4 className="text-white text-base font-bold uppercase tracking-[0.2em] mb-4">
                          <T>What Happens</T>
                        </h4>
                        <p className="text-white text-lg xl:text-xl font-light leading-relaxed">
                          {isTa ? step.whatHappensTa : step.whatHappensEn}
                        </p>
                      </div>

                      {/* Horizontal Separator Line */}
                      <div className={`h-px bg-white/10 my-8 transition-all duration-700 ease-out delay-200 origin-left ${
                        isActive ? "w-full opacity-100" : "w-0 opacity-0"
                      }`} />

                      {/* The Result Block */}
                      <div className={`flex flex-col text-left transition-all duration-700 ease-out delay-300 ${
                        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}>
                        <h4 className="text-white text-base font-bold uppercase tracking-[0.2em] mb-4">
                          <T>The Result</T>
                        </h4>
                        <p className="text-white text-lg xl:text-xl font-light leading-relaxed">
                          {isTa ? step.resultTa : step.resultEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
