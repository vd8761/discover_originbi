"use client";

import React, { useState } from "react";
import { T, useLanguage } from "@/contexts/LanguageContext";

interface Testimonial {
  id: number;
  quoteEn: string;
  quoteTa: string;
  authorEn: string;
  authorTa: string;
  roleEn: string;
  roleTa: string;
  avatar: string;
}

const StudentAvatar: React.FC<{ src?: string; name: string; className?: string }> = ({ src, name, className = "" }) => {
  const [hasError, setHasError] = useState(false);
  
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Deterministic gradient based on the first letter of the name
  const getGradientClass = (char: string) => {
    const code = char.charCodeAt(0) % 5;
    switch (code) {
      case 0:
        return "from-emerald-400 to-teal-600";
      case 1:
        return "from-cyan-400 to-blue-600";
      case 2:
        return "from-purple-400 to-indigo-600";
      case 3:
        return "from-orange-400 to-pink-600";
      default:
        return "from-green-400 to-emerald-600";
    }
  };

  const gradient = getGradientClass(name[0] || "A");

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover rounded-full ${className}`}
      />
    );
  }

  return (
    <div
      className={`w-full h-full rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-medium tracking-wide text-xs md:text-sm ${className}`}
    >
      {initials}
    </div>
  );
};

const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quoteEn: "I did not know whether to stay in core engineering or switch tracks. The report showed strong leadership and operations fit, and my decisions became easier.",
      quoteTa: "நான் முக்கிய பொறியியல் துறையிலேயே தொடர வேண்டுமா அல்லது வேறு துறைக்கு மாற வேண்டுமா என்று தெரியாமல் குழம்பினேன். இந்த அறிக்கை எனது தலைமைப் பண்பு மற்றும் செயல்பாட்டுத் திறனுக்கான பொருத்தத்தைக் காட்டியது, இதனால் எனது முடிவுகள் எளிதாகின.",
      authorEn: "Karthik M",
      authorTa: "கார்த்திக் எம்",
      roleEn: "B.E. Mechanical - 3rd Year • Bangalore",
      roleTa: "B.E. மெக்கானிக்கல் - 3 ஆம் ஆண்டு • பெங்களூரு",
      avatar: "/assets/testimonials/karthik.png",
    },
    {
      id: 2,
      quoteEn: "I was confused between pursuing standard CSE and UI/UX design. OriginBI's profile highlighted my high empathy and spatial visualization skills. Now I am thriving in my Product Design track!",
      quoteTa: "நான் வழக்கமான சி.எஸ்.இ மற்றும் யு.ஐ/யு.எக்ஸ் வடிவமைப்பிற்கு இடையே குழம்பினேன். ஆரிஜின் பி.ஐ-யின் சுயவிவரம் எனது அதிக அனுதாபம் மற்றும் இடஞ்சார்ந்த காட்சிப்படுத்தல் திறன்களை எடுத்துக்காட்டியது. இப்போது நான் தயாரிப்பு வடிவமைப்பு பாதையில் செழித்து வருகிறேன்!",
      authorEn: "Sneha Rao",
      authorTa: "சினேகா ராவ்",
      roleEn: "B.Tech. Information Technology - 2nd Year • Chennai",
      roleTa: "B.Tech. தகவல் தொழில்நுட்பம் - 2 ஆம் ஆண்டு • சென்னை",
      avatar: "",
    },
    {
      id: 3,
      quoteEn: "My parents wanted me to prepare for UPSC, but I felt drawn to entrepreneurship and finance. The assessment proved my high risk tolerance and strategic decision style, helping us align as a family.",
      quoteTa: "என் பெற்றோர் என்னை யு.பி.எஸ்.சி தேர்வுக்கு தயாராக விரும்பினர், ஆனால் நான் தொழில்முனைவு மற்றும் நிதியியல் மீது ஈர்க்கப்பட்டேன். இந்த மதிப்பீடு எனது அதிக ஆபத்து தாங்கும் திறன் மற்றும் மூலோபாய முடிவு பாணியை நிரூபித்தது, இது ஒரு குடும்பமாக நாங்கள் ஒத்துப்போக உதவியது.",
      authorEn: "Rohan Das",
      authorTa: "ரோஹன் தாஸ்",
      roleEn: "B.Com. Honors - Graduated • Mumbai",
      roleTa: "B.Com. ஹானர்ஸ் - பட்டதாரி • மும்பை",
      avatar: "",
    },
    {
      id: 4,
      quoteEn: "Choosing a specialization in Biotech was stressful. The detailed behavioral report showed a strong match for analytical research and project coordination rather than pure clinical roles.",
      quoteTa: "பயோடெக்கில் ஒரு சிறப்புப் பிரிவைத் தேர்ந்தெடுப்பது மன அழுத்தமாக இருந்தது. விரிவான நடைமுறை அறிக்கை தூய மருத்துவப் பாத்திரங்களை விட பகுப்பாய்வு ஆராய்ச்சி மற்றும் திட்ட ஒருங்கிணைப்புக்கான வலுவான பொருத்தத்தைக் காட்டியது.",
      authorEn: "Anjali Sharma",
      authorTa: "அஞ்சலி சர்மா",
      roleEn: "B.Sc. Biotechnology - 4th Year • Delhi",
      roleTa: "B.Sc. பயோடெக்னாலஜி - 4 ஆம் ஆண்டு • டெல்லி",
      avatar: "",
    },
    {
      id: 5,
      quoteEn: "I was struggling with CS subjects and doubted if coding was for me. The roadmap helped me realize that my strengths lie in Technical Product Management and System Architecture.",
      quoteTa: "நான் கணினி அறிவியல் பாடங்களில் சிரமப்பட்டேன் மற்றும் குறியீட்டு முறை எனக்கு பொருந்துமா என்று சந்தேகித்தேன். எனது பலம் தொழில்நுட்ப தயாரிப்பு மேலாண்மை மற்றும் கணினி கட்டமைப்பில் உள்ளது என்பதை இந்த வரைபடம் எனக்கு உணர உதவியது.",
      authorEn: "Vikram Aditya",
      authorTa: "விக்ரம் ஆதித்யா",
      roleEn: "B.E. Computer Science - 3rd Year • Hyderabad",
      roleTa: "B.E. கணினி அறிவியல் - 3 ஆம் ஆண்டு • ஹைதராபாத்",
      avatar: "",
    },
    {
      id: 6,
      quoteEn: "I changed my major twice before taking this assessment. It showed me that my cognitive speed and communication patterns are perfect for Corporate law and policy design. I finally feel in my element.",
      quoteTa: "இந்த மதிப்பீட்டை எடுப்பதற்கு முன் நான் எனது முக்கிய பாடத்தை இரண்டு முறை மாற்றினேன். எனது அறிவாற்றல் வேகம் மற்றும் தொடர்பு முறைகள் கார்ப்பரேட் சட்டம் மற்றும் கொள்கை வடிவமைப்பிற்கு சரியானவை என்பதை இது காட்டியது. நான் இறுதியாக எனது சரியான இடத்தில் உணர்கிறேன்.",
      authorEn: "Meera Nair",
      authorTa: "மீரா நாயர்",
      roleEn: "B.A. LL.B - 4th Year • Pune",
      roleTa: "B.A. LL.B - 4 ஆம் ஆண்டு • புனே",
      avatar: "",
    },
    {
      id: 7,
      quoteEn: "I felt lost in a sea of CSE students. The behavioral analysis showed a natural flair for data analytics and pattern recognition. I focused on that, and just secured an internship in AI analytics.",
      quoteTa: "நான் சி.எஸ்.இ மாணவர்களின் கடலில் தொலைந்துபோனதாக உணர்ந்தேன். நடத்தை பகுப்பாய்வு தரவு பகுப்பாய்வு மற்றும் முறை அங்கீகாரத்திற்கான இயல்பான திறமையைக் காட்டியது. நான் அதில் கவனம் செலுத்தி, இப்போதுதான் AI பகுப்பாய்வில் ஒரு இன்டர்ன்ஷிப்பைப் பெற்றேன்.",
      authorEn: "Abhinav Patel",
      authorTa: "அபிநவ் படேல்",
      roleEn: "B.Tech. CSE - 3rd Year • Ahmedabad",
      roleTa: "B.Tech. சி.எஸ்.இ - 3 ஆம் ஆண்டு • அகமதாபாத்",
      avatar: "",
    },
  ];

  const activeTestimonial = testimonials[currentIndex];

  const changeSlide = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 200);
  };

  const handlePrev = () => {
    const nextIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    changeSlide(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    changeSlide(nextIndex);
  };

  return (
    <section
      id="testimonials"
      className="w-full bg-[#19211c] pt-14 pb-14 md:pt-16 md:pb-16 px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)] relative overflow-hidden border-t border-white/5"
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

      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-stretch gap-12 md:gap-16 relative z-10">
        
        {/* Left Column (Header & Watermark) */}
        <div className="w-full md:w-[35%] flex flex-col justify-start relative min-h-[220px] md:min-h-[340px]">
          <div>
            <h2 className="text-[#1ed36a] text-[22px] md:text-[26px] font-sans font-semibold tracking-tight leading-snug">
              <T>Student Testimonials</T>
            </h2>
            <p className="text-white/60 text-xs md:text-sm font-sans font-normal leading-relaxed mt-2 max-w-[260px]">
              <T>Stories from students who found clarity through behavioral intelligence.</T>
            </p>
          </div>
          
          {/* Quotes Watermark SVG - Positioned absolute at bottom edge and scaled larger */}
          <div className="absolute bottom-[-56px] md:bottom-[-64px] left-[-12px] w-[95%] sm:w-[80%] md:w-[135%] max-w-[450px] z-0 pointer-events-none select-none">
            <img
              src="/assets/quotes.svg"
              alt="Quotes Watermark"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right Column (Testimonial details & slider controls) */}
        <div className="w-full md:w-[60%] flex flex-col justify-between relative min-h-[260px] md:min-h-[340px] pt-1 pb-1">
          
          {/* Testimonial Quote Text with Fade Transition */}
          <div className="flex-grow flex items-center">
            <p
              className={`text-white text-xl sm:text-2xl md:text-[32px] lg:text-[34px] font-sans font-normal leading-snug md:leading-[1.35] tracking-tight transition-opacity duration-200 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {language === "ta" ? activeTestimonial.quoteTa : activeTestimonial.quoteEn}
            </p>
          </div>

          {/* Progress Bar, Pagination, Profile & Controls */}
          <div className="w-full mt-6 md:mt-8">
            
            {/* Horizontal Progress bar and X/7 Pagination */}
            <div className="w-full relative mb-6">
              <div className="flex justify-end mb-2">
                <span className="text-[#1ed36a] font-sans font-medium text-[13px] md:text-sm tracking-wider select-none leading-none">
                  {currentIndex + 1}/{testimonials.length}
                </span>
              </div>
              <div className="relative w-full h-[1.5px] bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-[#1ed36a] transition-all duration-300 ease-out"
                  style={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Profile Info (Avatar, Name, Details) & Navigation Arrows */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              
              {/* Profile Block with Fade Transition */}
              <div
                className={`flex items-center gap-4 transition-opacity duration-200 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                {/* Avatar container */}
                <div className="w-12 h-12 md:w-[50px] md:h-[50px] rounded-full overflow-hidden shrink-0 border border-white/10 relative">
                  <StudentAvatar src={activeTestimonial.avatar} name={activeTestimonial.authorEn} />
                </div>
                {/* Text Block */}
                <div className="flex flex-col">
                  <h4 className="text-[#1ed36a] font-sans font-semibold text-sm md:text-base leading-tight">
                    {language === "ta" ? activeTestimonial.authorTa : activeTestimonial.authorEn}
                  </h4>
                  <p className="text-white/60 font-sans font-normal text-xs md:text-[13px] mt-1">
                    {language === "ta" ? activeTestimonial.roleTa : activeTestimonial.roleEn}
                  </p>
                </div>
              </div>

              {/* Navigation Arrow Controls */}
              <div className="flex items-center gap-3 ml-auto sm:ml-0">
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous Testimonial"
                  className="group w-11 h-11 md:w-[44px] md:h-[44px] rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-white/50 hover:text-white bg-transparent hover:bg-white/5 transition-all duration-300 cursor-pointer outline-none active:scale-95 relative overflow-hidden"
                >
                  <div className="relative w-[18px] h-[14px] overflow-hidden flex items-center justify-center">
                    {/* Arrow 1: Active, slides out to the left on hover */}
                    <svg
                      className="w-[18px] h-[14px] transition-transform duration-300 ease-in-out group-hover:-translate-x-[150%] absolute"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.6187 0.256279C7.27701 -0.0854264 6.72296 -0.0854264 6.38127 0.256279L0.25626 6.3813C-0.0854282 6.72299 -0.0854282 7.27704 0.25626 7.61872L6.38127 13.7437C6.72296 14.0854 7.27701 14.0854 7.6187 13.7437C7.96039 13.402 7.96039 12.848 7.6187 12.5063L2.9874 7.87501L16.625 7.87501C17.1082 7.87501 17.5 7.48327 17.5 7.00001C17.5 6.51675 17.1082 6.12501 16.625 6.12501L2.9874 6.12501L7.6187 1.49372C7.96039 1.15201 7.96039 0.597993 7.6187 0.256279Z"
                        fill="currentColor"
                      />
                    </svg>
                    {/* Arrow 2: Hidden at the right, slides in on hover */}
                    <svg
                      className="w-[18px] h-[14px] transition-transform duration-300 ease-in-out translate-x-[150%] group-hover:translate-x-0 absolute"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.6187 0.256279C7.27701 -0.0854264 6.72296 -0.0854264 6.38127 0.256279L0.25626 6.3813C-0.0854282 6.72299 -0.0854282 7.27704 0.25626 7.61872L6.38127 13.7437C6.72296 14.0854 7.27701 14.0854 7.6187 13.7437C7.96039 13.402 7.96039 12.848 7.6187 12.5063L2.9874 7.87501L16.625 7.87501C17.1082 7.87501 17.5 7.48327 17.5 7.00001C17.5 6.51675 17.1082 6.12501 16.625 6.12501L2.9874 6.12501L7.6187 1.49372C7.96039 1.15201 7.96039 0.597993 7.6187 0.256279Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  aria-label="Next Testimonial"
                  className="group w-11 h-11 md:w-[44px] md:h-[44px] rounded-full bg-[#1ed36a] hover:bg-[#15bf5c] border border-[#1ed36a] flex items-center justify-center text-[#19211c] hover:text-white transition-all duration-300 cursor-pointer outline-none active:scale-95 relative overflow-hidden"
                >
                  <div className="relative w-[18px] h-[14px] overflow-hidden flex items-center justify-center">
                    {/* Arrow 1: Active, slides out to the right on hover */}
                    <svg
                      className="w-[18px] h-[14px] transition-transform duration-300 ease-in-out group-hover:translate-x-[150%] absolute"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.8813 0.256279C10.223 -0.0854264 10.777 -0.0854264 11.1187 0.256279L17.2437 6.3813C17.5854 6.72299 17.5854 7.27704 17.2437 7.61872L11.1187 13.7437C10.777 14.0854 10.223 14.0854 9.8813 13.7437C9.53961 13.402 9.53961 12.848 9.8813 12.5063L14.5126 7.87501L0.875001 7.87501C0.391756 7.87501 0 7.48327 0 7.00001C0 6.51675 0.391756 6.12501 0.875001 6.12501L14.5126 6.12501L9.8813 1.49372C9.53961 1.15201 9.53961 0.597993 9.8813 0.256279Z"
                        fill="currentColor"
                      />
                    </svg>
                    {/* Arrow 2: Hidden at the left, slides in on hover */}
                    <svg
                      className="w-[18px] h-[14px] transition-transform duration-300 ease-in-out -translate-x-[150%] group-hover:translate-x-0 absolute"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.8813 0.256279C10.223 -0.0854264 10.777 -0.0854264 11.1187 0.256279L17.2437 6.3813C17.5854 6.72299 17.5854 7.27704 17.2437 7.61872L11.1187 13.7437C10.777 14.0854 10.223 14.0854 9.8813 13.7437C9.53961 13.402 9.53961 12.848 9.8813 12.5063L14.5126 7.87501L0.875001 7.87501C0.391756 7.87501 0 7.48327 0 7.00001C0 6.51675 0.391756 6.12501 0.875001 6.12501L14.5126 6.12501L9.8813 1.49372C9.53961 1.15201 9.53961 0.597993 9.8813 0.256279Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonials;
