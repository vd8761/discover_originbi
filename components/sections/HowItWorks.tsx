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
    return (
        <section id="how-it-works" className="relative w-full py-16 lg:py-24 bg-brand-light-primary dark:bg-brand-dark-primary transition-colors duration-500 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">

                {/* Header */}
                <div className="text-center mb-16 lg:mb-24">
                    <span className="text-[clamp(10px,0.8vw,14px)] font-bold uppercase tracking-[0.2em] text-brand-green mb-3 block">
                        Process
                    </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-sans font-bold leading-[1.2] lg:leading-[1.1] text-brand-dark-primary dark:text-white transition-colors duration-300">
                        How it works
                    </h2>
                </div>

                {/* Vertical Timeline Layout */}
                <div className="relative">
                    {/* Central Vertical Line (hidden on mobile, visible on lg) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-green/0 via-brand-green/30 to-brand-green/0 hidden lg:block" />

                    <div className="space-y-12 lg:space-y-24">
                        {steps.map((step, index) => (
                            <div key={step.id} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>

                                {/* Content Side */}
                                <div className="flex-1 text-center lg:text-left">
                                    <div className={`flex flex-col gap-4 ${index % 2 === 0 ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'}`}>
                                        <div className="inline-block px-4 py-1 rounded-full bg-brand-green/10 text-brand-green font-bold text-sm tracking-widest uppercase mb-2">
                                            Step {step.id}
                                        </div>
                                        <h3 className="text-2xl lg:text-4xl font-bold text-brand-dark-primary dark:text-white">
                                            {step.title}
                                        </h3>
                                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Marker */}
                                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white dark:bg-brand-dark-tertiary border-4 border-brand-green flex items-center justify-center shadow-[0_0_30px_rgba(30,211,106,0.4)] group hover:scale-110 transition-transform duration-300">
                                    <div className="w-3 h-3 rounded-full bg-brand-green" />
                                </div>

                                {/* Visual Side (Placeholder or Decorative) */}
                                <div className="flex-1 hidden lg:block">
                                    <div className={`relative h-64 w-full rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl p-8 flex items-center justify-center group hover:-translate-y-2 transition-transform duration-500 ${index % 2 === 0 ? 'origin-right' : 'origin-left'}`}>
                                        {/* Decorative Gradients based on step */}
                                        <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${index % 2 === 0 ? 'from-brand-green/30 to-transparent' : 'from-blue-500/30 to-transparent'}`} />

                                        <div className="text-9xl font-bold text-brand-dark-primary/5 dark:text-white/5 select-none scale-150 group-hover:scale-125 transition-transform duration-700">
                                            {step.id}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile version connector line adjust */}
                <div className="lg:hidden w-0.5 bg-gradient-to-b from-transparent via-brand-green/20 to-transparent absolute left-1/2 top-32 bottom-32 -z-10" />

            </div>
        </section>
    );
};

export default HowItWorks;
