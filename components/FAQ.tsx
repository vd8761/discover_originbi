"use client";

import React, { useState } from "react";
import { T } from "@/contexts/LanguageContext";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  // Initialize with left-0 (id 0) and right-2 (id 5) expanded as shown in the screenshot
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({
    0: true,
    5: true,
  });

  const toggleItem = (id: number) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const leftColumnItems: FAQItem[] = [
    {
      id: 0,
      question: "I am already in college. Can this still help me?",
      answer: "A deep dive into how your brain is naturally wired to work, lead, and solve problems.",
    },
    {
      id: 1,
      question: "Can this help me choose internships and projects?",
      answer: "Yes. Your roadmap links your strengths to practical next steps, so you can choose internships, projects, and certifications that improve role readiness.",
    },
    {
      id: 2,
      question: "How long is this roadmap valid?",
      answer: "Behavioral patterns stay stable. Your roadmap remains useful through college and your early career transition.",
    },
  ];

  const rightColumnItems: FAQItem[] = [
    {
      id: 3,
      question: "Is this like another exam where marks decide everything?",
      answer: "Not at all. There are no pass or fail grades. This assessment helps you understand how you think, decide, and work best.",
    },
    {
      id: 4,
      question: "I already picked a major. Is it too late to use this?",
      answer: "Not late at all. You can still use your profile to choose the right track, electives, projects, and internship roles within your major.",
    },
    {
      id: 5,
      question: "What if the results suggest a path I never considered?",
      answer: "That is often the biggest breakthrough. Many students discover hidden strengths for roles they had never explored before.",
    },
  ];

  const renderFAQItem = (item: FAQItem) => {
    const isOpen = !!openItems[item.id];

    return (
      <div
        key={item.id}
        onClick={() => toggleItem(item.id)}
        className={`border rounded-[16px] p-6 cursor-pointer transition-all duration-300 select-none shadow-sm ${
          isOpen
            ? "bg-[#19211c] border-[#19211c] text-white"
            : "bg-white/40 border-[#19211c]/10 hover:bg-white/60 text-[#19211c]"
        }`}
      >
        {/* Question Row */}
        <div className="flex justify-between items-center gap-4">
          <h4 className="font-sans font-medium text-base md:text-lg leading-snug text-left">
            <T>{item.question}</T>
          </h4>
          <div className="flex-shrink-0">
            {isOpen ? (
              // Minus Icon in brand green
              <svg className="w-5 h-5 text-[#1ed36a] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            ) : (
              // Plus Icon in dark color
              <svg className="w-5 h-5 text-[#19211c] transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            )}
          </div>
        </div>

        {/* Answer (Accordion Panel) */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[500px] opacity-100 mt-4 pt-4 border-t border-white/10" : "max-h-0 opacity-0"
          }`}
        >
          <p className="font-sans font-light text-sm md:text-base leading-relaxed text-white">
            <T>{item.answer}</T>
          </p>
        </div>
      </div>
    );
  };

  return (
    <section id="faq" className="w-full bg-[#f4f4f4] py-20 px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)] relative overflow-hidden">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Title */}
        <h2 className="text-[#19211c] text-3xl md:text-[40px] font-sans font-medium mb-12 tracking-tight text-center">
          <T>Frequently Asked Questions</T>
        </h2>

        {/* Grid of Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start w-full">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftColumnItems.map(renderFAQItem)}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightColumnItems.map(renderFAQItem)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
