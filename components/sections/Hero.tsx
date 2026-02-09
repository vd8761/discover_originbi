"use client";

import React from 'react';
import Button from "@/components/ui/Button";

const Hero: React.FC = () => {
    return (
        <main className="relative z-10 w-full mt-16 lg:mt-20 min-h-[calc(100dvh-64px)] lg:h-[calc(100dvh-80px)] flex flex-col overflow-hidden bg-transparent">
            {/* Content Wrapper */}
            <div className="flex-1 flex flex-col items-center max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] pt-24 sm:pt-16 lg:pt-8">

                {/* Top Section: Text Content */}
                <div className="w-full flex flex-col items-center text-center animate-fade-in z-30 flex-shrink-0">
                    <h1 className="text-[clamp(26px,4.5vw,64px)] font-sans font-bold leading-[1.1] mb-3 tracking-tight text-brand-dark-primary dark:text-white transition-colors duration-300">
                        What should I do <span className="text-brand-green">Next?</span>
                    </h1>
                    <p className="text-[clamp(14px,1.1vw,20px)] text-brand-text-light-secondary dark:text-brand-text-secondary font-sans font-medium mb-5 leading-relaxed max-w-lg mx-auto transition-colors duration-300 px-2 lg:px-0">
                        Let your strengths answer that. Discover the path that fits you, not what others expect.
                    </p>
                    <Button
                        size="lg"
                        className="rounded-2xl shadow-[0_20px_40px_-10px_rgba(30,211,106,0.3)] hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(30,211,106,0.4)] transition-all duration-300 text-[14px] lg:text-[16px] px-8 py-4"
                    >
                        Take the First Step
                    </Button>
                </div>

                {/* Bottom Section: Hero Illustration - responsive sizing */}
                <div className="relative w-full flex-1 flex items-end justify-center overflow-hidden min-h-[200px] sm:min-h-[280px] lg:min-h-0 mt-2 lg:mt-0">
                    <img
                        src="/images/hero.png"
                        alt="Student Illustration"
                        className="w-auto h-auto max-h-[45vh] sm:max-h-[50vh] md:max-h-[55vh] lg:max-h-full lg:h-full object-contain object-bottom mask-gradient select-none pointer-events-none drop-shadow-2xl transition-all duration-500 scale-[1.15] sm:scale-110 lg:scale-100 origin-bottom"
                    />
                </div>
            </div>
        </main>
    );
};

export default Hero;
