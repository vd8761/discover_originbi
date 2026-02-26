"use client";

import React, { useEffect, useRef, useState } from "react";
import { T } from "@/contexts/LanguageContext";

const MobileHowItWorksCarousel: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { title: "Fill the Registration Form", desc: "Name, Email, Age, Education, etc." },
        { title: "Make Payment", desc: "via UPI, Card, or NetBanking" },
        { title: "Receive Confirmation Email", desc: "with instructions" },
        { title: "Login and Start Assessment", desc: "Access your dashboard to begin the test" },
        { title: "Finish Test & Receive Report", desc: "Instant digital results" },
        { title: "Choose the right path in your career", desc: "Get expert guidance and clarity" },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
                const isEnd = scrollLeft + clientWidth >= scrollWidth - 10;

                const nextStep = isEnd ? 0 : activeStep + 1;

                // If we're at the end, snap back to start without smooth scroll for "infinite" feel, 
                // or just smooth scroll to 0. Let's do smooth scroll to next or 0.
                const nextScrollLeft = isEnd ? 0 : (activeStep + 1) * clientWidth;

                scrollRef.current.scrollTo({
                    left: nextScrollLeft,
                    behavior: 'smooth'
                });

                setActiveStep(prev => isEnd ? 0 : prev + 1);
            }
        }, 3000); // Auto-scroll every 3 seconds

        return () => clearInterval(interval);
    }, [activeStep]);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const newActiveStep = Math.round(scrollLeft / clientWidth);
            setActiveStep(newActiveStep);
        }
    };

    return (
        <div className="w-full pb-8">
            <h3 className="text-xl font-bold text-center mb-6 text-brand-dark-primary dark:text-white">
                {/* @ts-ignore */} <T> How it works </T> </h3>

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-4 pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="min-w-[85vw] sm:min-w-[300px] snap-center bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm"
                    >
                        <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center text-lg font-bold mb-4">
                            {index + 1}
                        </div>
                        <h4 className="font-bold text-brand-dark-primary dark:text-white mb-2">
                            {step.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {step.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-2">
                {steps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (scrollRef.current) {
                                scrollRef.current.scrollTo({
                                    left: index * scrollRef.current.clientWidth,
                                    behavior: 'smooth'
                                });
                            }
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeStep === index
                            ? "bg-brand-green w-6"
                            : "bg-gray-300 dark:bg-white/20"
                            }`}
                        aria-label={`Go to step ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default MobileHowItWorksCarousel;
