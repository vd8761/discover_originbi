"use client";

import React, { useState, useEffect } from "react";
import { T, useTranslation, useLanguage } from "@/contexts/LanguageContext";

interface ExpertData {
  id: "bharathiraja" | "pratap";
  nameKey: string;
  titleKey: string;
  subtitleKey: string;
  imgSrc: string;
  videos: {
    ta: string;
    en: string;
  };
  quoteKey: string;
  subtextKey: string;
  signatureType: "image" | "text";
  signatureSrc?: string;
}

const EXPERTS_DATA: ExpertData[] = [
  {
    id: "bharathiraja",
    nameKey: "Bharathiraja Thangappalam",
    titleKey: "Chief Consultant, OriginBI",
    subtitleKey: "Expert in Behavioral Analytics & Career Strategy",
    imgSrc: "/assets/experts/bharathiraja.png",
    videos: {
      ta: "https://www.youtube.com/embed/4luQSZLsZUk",
      en: "https://www.youtube.com/embed/Z2ZkryASFi0",
    },
    quoteKey: "Every student is unique. Our role is to help them discover what makes them, them.",
    subtextKey: "At OriginBI, we blend science, psychology, and technology to help students understand their natural strengths and make career decisions that truly fit who they are.",
    signatureType: "image",
    signatureSrc: "/assets/experts/sign-bharathiraja.png",
  },
  {
    id: "pratap",
    nameKey: "Dr Shree PrataP",
    titleKey: "Advisory Board Member - OriginBI",
    subtitleKey: "Medical Director, Shadithya Psychiatric Hospital, Chennai",
    imgSrc: "/assets/experts/pratap.png",
    videos: {
      ta: "https://www.youtube.com/embed/ZEHYqAiwDUQ",
      en: "https://www.youtube.com/embed/ZEHYqAiwDUQ",
    },
    quoteKey: "Career planning is about aligning a student's unique cognitive strengths to their long-term path with science-backed clarity.",
    subtextKey: "At OriginBI, we bridge the gap between academic pressure and natural capability, helping families make informed, stress-free career decisions.",
    signatureType: "image",
    signatureSrc: "/assets/experts/sign-bharathiraja.png",
  },
];

const IndustryExperts: React.FC = () => {
  const { language } = useLanguage();
  const [activeExpert, setActiveExpert] = useState<"bharathiraja" | "pratap">("bharathiraja");
  const [videoLang, setVideoLang] = useState<"en" | "ta">("ta");
  const [isMounted, setIsMounted] = useState(false);

  // Keep track of language preferences. 
  // If activeExpert is 'pratap', force videoLang to 'en' (since he only has English).
  // Otherwise, default/restore to the current active selection or matching site language.
  useEffect(() => {
    if (activeExpert === "pratap") {
      setVideoLang("en");
    } else {
      // Default to matching site language if Bharathiraja is active
      setVideoLang(language === "ta" ? "ta" : "en");
    }
  }, [activeExpert, language]);

  const activeExpertData = EXPERTS_DATA.find((e) => e.id === activeExpert) || EXPERTS_DATA[0];

  // Helper to extract the video ID for looping
  const getYouTubeId = (url: string) => {
    const parts = url.split("/embed/");
    return parts[parts.length - 1];
  };

  const embedBase = activeExpertData.videos[videoLang];
  const videoId = getYouTubeId(embedBase);
  const videoUrl = `${embedBase}?autoplay=1&mute=1&loop=1&playlist=${videoId}&enablejsapi=1&rel=0`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="experts"
      className="w-full bg-[#f4f4f4] py-16 lg:py-24 px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)] relative overflow-hidden border-t border-black/5"
    >
      {/* Background Noise Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-[1920px] w-full mx-auto relative z-10">
        
        {/* Top Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] xl:grid-cols-[460px_1fr] justify-between items-baseline lg:items-end gap-8 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
            <h2 className="text-[#19211c] text-[32px] sm:text-[40px] md:text-[48px] font-sans font-medium leading-[1.1] tracking-tight">
              <T>Industry Experts</T>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 w-full">
            <p className="text-[#19211c] text-base md:text-[18px] font-sans font-normal leading-relaxed max-w-[480px]">
              <T>Insights from industry leaders shaping smarter career decisions through behavioral intelligence.</T>
            </p>
            
            {/* Language Switcher Capsule */}
            <div className="flex items-center gap-1 p-0.5 bg-[#19211c] rounded-full border border-white/5 self-start sm:self-auto shrink-0 shadow-md w-fit">
              <button
                onClick={() => activeExpert === "bharathiraja" && setVideoLang("ta")}
                disabled={activeExpert === "pratap"}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold font-sans transition-all duration-300 ${
                  activeExpert === "pratap"
                    ? "opacity-35 cursor-not-allowed text-white/40"
                    : videoLang === "ta"
                    ? "bg-[#1ed36a] text-white shadow-sm cursor-pointer"
                    : "bg-transparent text-white/70 hover:text-white cursor-pointer"
                }`}
              >
                தமிழ்
              </button>
              <button
                onClick={() => setVideoLang("en")}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold font-sans transition-all duration-300 cursor-pointer ${
                  videoLang === "en"
                    ? "bg-[#1ed36a] text-white shadow-sm"
                    : "bg-transparent text-white/70 hover:text-white"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] xl:grid-cols-[460px_1fr] items-stretch gap-8 mt-6">
          
          {/* Left Column: Experts Stack */}
          <div className="grid grid-cols-1 lg:grid-rows-2 gap-6 lg:h-full">
            {EXPERTS_DATA.map((expert) => {
              const isActive = activeExpert === expert.id;
              return (
                <div
                  key={expert.id}
                  onClick={() => setActiveExpert(expert.id)}
                  className={`group relative overflow-hidden rounded-[24px] border transition-all duration-500 cursor-pointer flex p-5 sm:p-6 select-none h-[180px] sm:h-[210px] lg:h-auto ${
                    isActive
                      ? "bg-gradient-to-br from-[#1c2520] to-[#121815] border-[#1ed36a]/30 shadow-[0_12px_40px_rgba(30,211,106,0.12)]"
                      : "bg-[#181d19]/95 border-white/5 hover:border-white/10 hover:bg-[#1c221d] shadow-md"
                  }`}
                >
                  {/* Background vector (always present) */}
                  <img
                    src="/assets/experts/behind_vector.svg"
                    alt="Background Vector"
                    className={`absolute bottom-0 right-0 w-full h-full object-contain object-[right_bottom] mix-blend-overlay pointer-events-none z-0 transition-opacity duration-500 ${
                      isActive ? "opacity-45" : "opacity-15"
                    }`}
                  />

                  {/* Active radial gradient glow */}
                  {isActive && (
                    <div className="absolute bottom-[-120px] right-[-40px] w-[320px] h-[320px] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] bg-[radial-gradient(circle_at_35%_35%,rgba(239,89,33,0.95)_0%,rgba(239,89,33,0.45)_35%,rgba(239,89,33,0.15)_60%,transparent_75%)] blur-[45px] pointer-events-none z-0 animate-aura-spin" />
                  )}

                  {/* Left content block */}
                  <div className="flex flex-col justify-start w-[55%] sm:w-[58%] max-w-[180px] sm:max-w-[210px] lg:max-w-[230px] relative z-20 text-left">
                    <h3 className="text-white text-[16px] sm:text-[18px] font-sans font-semibold leading-tight">
                      <T>{expert.nameKey}</T>
                    </h3>
                    <p className="text-white text-[11px] sm:text-[12px] font-sans font-medium mt-1">
                      <T>{expert.titleKey}</T>
                    </p>
                    <p className="text-white text-[10px] sm:text-[11px] font-sans leading-normal mt-4 max-w-[160px] sm:max-w-[185px]">
                      <T>{expert.subtitleKey}</T>
                    </p>
                  </div>

                  {/* Expert Image */}
                  <img
                    src={expert.imgSrc}
                    alt={expert.nameKey}
                    className={`absolute bottom-0 right-0 h-[94%] w-auto object-contain object-bottom z-10 transition-all duration-500 ease-out pointer-events-none ${
                      isActive
                        ? "filter-none opacity-100"
                        : "grayscale opacity-35 group-hover:opacity-50"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Video + Quote Box */}
          <div className="flex flex-col gap-6 h-full">
            
            {/* Video Player Container */}
            <div className="relative w-full aspect-video rounded-[24px] overflow-hidden border border-black/5 bg-black shadow-lg">
              {isMounted ? (
                <iframe
                  src={videoUrl}
                  title={activeExpertData.nameKey}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  suppressHydrationWarning
                />
              ) : (
                <div className="w-full h-full bg-black animate-pulse" />
              )}
            </div>

            {/* Quote Box Card */}
            <div className="w-full bg-[#f9faf9] border border-[#19211c]/10 rounded-[24px] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-stretch gap-6 shadow-sm relative">
              
              {/* Left Side: Quote Text */}
              <div className="flex-1 flex flex-col justify-start relative text-left">
                {/* Green Quotes SVG */}
                <img
                  src="/assets/experts/quotes-green.svg"
                  alt="Quotes"
                  className="w-[35px] h-[24px] object-contain select-none pointer-events-none mb-3"
                />
                <p className="font-sans italic text-lg sm:text-xl md:text-[22px] leading-relaxed text-[#19211c] font-medium max-w-[420px]">
                  <T>{activeExpertData.quoteKey}</T>
                </p>
              </div>

              {/* Vertical Divider (desktop only) */}
              <div className="hidden md:block w-[1px] bg-[#19211c] self-stretch my-1 shrink-0" />

              {/* Right Side: Description + Signature */}
              <div className="flex-1 flex flex-col justify-between pt-1 h-full text-left">
                <p className="text-[#19211c] text-xs sm:text-sm md:text-[14px] leading-relaxed max-w-[420px]">
                  <T>{activeExpertData.subtextKey}</T>
                </p>
                
                {/* Signature Block */}
                <div className="mt-6">
                  {activeExpertData.signatureType === "image" ? (
                    <img
                      src={activeExpertData.signatureSrc}
                      alt={activeExpertData.nameKey}
                      className="h-10 sm:h-12 w-auto object-contain opacity-90 select-none pointer-events-none"
                    />
                  ) : (
                    <span
                      className="text-2xl sm:text-3xl font-bold tracking-wide opacity-95 text-[#1a3a2c] select-none block font-caveat"
                    >
                      Dr Shree Pratap
                    </span>
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default IndustryExperts;
