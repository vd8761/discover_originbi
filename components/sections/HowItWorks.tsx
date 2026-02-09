"use client";

import React, { useEffect, useRef, useState } from 'react';

interface Step {
    id: string;
    title: string;
    desc: string;
}

const steps: Step[] = [
    { id: "01", title: "Fill the Registration Form", desc: "Start your journey by providing basic details like Name, Email, and Education." },
    { id: "02", title: "Make Payment", desc: "Secure your spot through various digital payment options like UPI, Card, or NetBanking." },
    { id: "03", title: "Receive Confirmation", desc: "Look out for a confirmation email with your unique instructions and next steps." },
    { id: "04", title: "Login & Start", desc: "Access your personalized dashboard to begin the psychometric assessment." },
    { id: "05", title: "Instant Report", desc: "Receive your comprehensive digital results immediately after finishing the test." },
    { id: "06", title: "Career Clarity", desc: "Choose the right path with expert guidance and a deep understanding of your strengths." },
];

const HowItWorks: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            // Total height of the scroll track
            const totalHeight = rect.height;
            // How much is already scrolled past the top of the viewport
            const scrolled = Math.max(0, -rect.top);
            // Window height
            const winHeight = window.innerHeight;

            // The actual scrollable range for the animation
            const scrollRange = totalHeight - winHeight;

            if (scrollRange <= 0) return;

            const progress = Math.min(Math.max(scrolled / scrollRange, 0), 0.99);
            const index = Math.floor(progress * steps.length);

            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeIndex]);

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-brand-light-primary dark:bg-brand-dark-primary transition-colors duration-500"
            style={{ height: `${steps.length * 100}vh` }} // Gives enough scroll room
        >
            {/* STICKY WRAPPER */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
                <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] w-full">

                    {/* Header */}
                    <div className="mb-12 lg:mb-16">
                        <span className="text-[clamp(10px,0.8vw,14px)] font-bold uppercase tracking-[0.2em] text-brand-green mb-3 block">
                            Process
                        </span>
                        <h2 className="text-[clamp(26px,3.2vw,48px)] font-sans font-bold leading-[1.2] lg:leading-[1.1] text-brand-dark-primary dark:text-white max-w-2xl transition-colors duration-300">
                            How it works
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* LEFT COLUMN: Premium Mockup Visual (The Nice Version) */}
                        <div className="hidden lg:flex items-center justify-center relative">
                            <div className="relative w-[380px] h-[380px] xl:w-[480px] xl:h-[480px]">
                                {/* Glowing Background Effect */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-green/20 via-brand-green/10 to-transparent blur-3xl scale-110" />

                                {/* Decorative Rings */}
                                <div className="absolute inset-4 rounded-full border border-brand-green/5 dark:border-brand-green/10" />
                                <div className="absolute inset-12 rounded-full border border-brand-green/10 dark:border-brand-green/15" />
                                <div className="absolute inset-20 rounded-full border border-brand-green/15 dark:border-white/5" />

                                {/* Central Visual Element */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative w-56 h-56 xl:w-72 xl:h-72">
                                        {/* Main Circle */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-green via-brand-green/90 to-brand-green/70 shadow-[0_25px_60px_-15px_rgba(30,211,106,0.5)] flex flex-col items-center justify-center text-center p-8">
                                            {/* Content inside the green circle */}
                                            <div className="absolute inset-2.5 rounded-full bg-brand-dark-primary border-[6px] border-brand-green/20 flex flex-col items-center justify-center shadow-inner">
                                                <span className="text-brand-green text-5xl xl:text-6xl font-bold tracking-tighter">BI</span>
                                                <span className="text-white/80 text-[10px] xl:text-xs font-bold uppercase tracking-[0.2em] mt-2">Assessment</span>
                                                <div className="mt-4 flex items-center gap-1.5 bg-brand-green/10 px-3 py-1 rounded-full">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                                                    <span className="text-brand-green text-[10px] xl:text-[11px] font-bold">ACTIVE</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Indicators */}
                                        <div className="absolute -top-4 -right-4 w-14 h-14 xl:w-16 xl:h-16 rounded-2xl bg-white dark:bg-brand-dark-secondary shadow-2xl flex items-center justify-center border border-brand-light-tertiary dark:border-white/10 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                                            <svg className="w-7 h-7 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>

                                        <div className="absolute -bottom-6 -left-6 w-14 h-14 xl:w-16 xl:h-16 rounded-2xl bg-white dark:bg-brand-dark-secondary shadow-2xl flex items-center justify-center border border-brand-light-tertiary dark:border-white/10 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                                            <svg className="w-7 h-7 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Scrolling Cards Animation (Bottom to Top) */}
                        <div className="relative h-[400px] lg:h-[450px] w-full flex items-center pr-4">
                            {steps.map((step, index) => {
                                const isPast = index < activeIndex;
                                const isActive = index === activeIndex;
                                const isFuture = index > activeIndex;

                                // Animation logic
                                let translateY = "100%";
                                let opacity = 0;
                                let scale = 0.9;
                                let zIndex = steps.length - index;

                                if (isActive) {
                                    translateY = "0%";
                                    opacity = 1;
                                    scale = 1;
                                } else if (isPast) {
                                    translateY = "-120%"; // Moves it out to the top
                                    opacity = 0;
                                    scale = 0.95;
                                } else if (isFuture) {
                                    // Stacked below
                                    translateY = `${15 * (index - activeIndex)}%`;
                                    opacity = Math.max(0, 0.4 - (index - activeIndex) * 0.1);
                                    scale = 1 - (index - activeIndex) * 0.05;
                                }

                                return (
                                    <div
                                        key={step.id}
                                        className="absolute inset-0 flex items-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                                        style={{
                                            transform: `translateY(${translateY}) scale(${scale})`,
                                            opacity: opacity,
                                            zIndex: zIndex,
                                            pointerEvents: isActive ? 'auto' : 'none'
                                        }}
                                    >
                                        <div className={`w-full p-8 lg:p-10 rounded-[2.5rem] border transition-all duration-500 ${isActive
                                            ? 'bg-white dark:bg-brand-dark-tertiary border-brand-green/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_80px_-20px_rgba(30,211,106,0.15)]'
                                            : 'bg-white/50 dark:bg-brand-dark-secondary/50 border-transparent'
                                            }`}>
                                            {/* Number Bubble */}
                                            <div className="w-12 h-12 rounded-2xl bg-brand-green flex items-center justify-center text-white font-bold text-xl mb-6 shadow-lg shadow-brand-green/30">
                                                {step.id}
                                            </div>

                                            <h3 className="text-[clamp(20px,1.8vw,32px)] font-bold text-brand-dark-primary dark:text-white mb-4 leading-tight">
                                                {step.title}
                                            </h3>

                                            <p className="text-[clamp(14px,1vw,18px)] text-brand-text-light-secondary dark:text-brand-text-secondary leading-relaxed max-w-md">
                                                {step.desc}
                                            </p>

                                            {/* Progress indicator at bottom of card */}
                                            <div className="mt-8 flex items-center gap-2">
                                                {steps.map((_, dotIndex) => (
                                                    <div
                                                        key={dotIndex}
                                                        className={`h-1.5 rounded-full transition-all duration-500 ${dotIndex === index
                                                            ? 'w-8 bg-brand-green'
                                                            : 'w-2 bg-brand-light-tertiary dark:bg-white/10'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>

                {/* Optional: Scroll indicator at the very bottom of the sticky section */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark-primary dark:text-white">Keep Scrolling</span>
                    <div className="w-px h-12 bg-gradient-to-b from-brand-green to-transparent" />
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
