"use client";

import React from 'react';
import Button from "@/components/ui/Button";

const Hero: React.FC = () => {
    return (
        <main className="relative z-10 w-full mt-20 h-[calc(100dvh-0px)] flex flex-col overflow-hidden bg-transparent">
            {/* Content Wrapper */}
            <div className="flex-1 flex flex-col items-center max-w-[1920px] mx-auto w-full px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] pt-8 lg:pt-12">

                {/* Top Section: Text Content */}
                <div className="w-full flex flex-col items-center text-center animate-fade-in z-30 flex-shrink-0">
                    <h1 className="text-[clamp(32px,4vw,64px)] font-sans font-bold leading-[1.1] mb-4 tracking-tight text-brand-dark-primary dark:text-white transition-colors duration-300">
                        What should I do <span className="text-brand-green">Next?</span>
                    </h1>
                    <p className="text-[clamp(14px,1.1vw,20px)] text-brand-text-light-secondary dark:text-brand-text-secondary font-sans font-medium mb-6 leading-relaxed max-w-lg mx-auto transition-colors duration-300">
                        Let your strengths answer that. Discover the path that fits you, not what others expect.
                    </p>
                    <Button
                        size="lg"
                        className="rounded-2xl shadow-[0_20px_40px_-10px_rgba(30,211,106,0.3)] hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(30,211,106,0.4)] transition-all duration-300"
                    >
                        Take the First Step
                    </Button>
                </div>

                {/* Bottom Section: Hero Illustration - fills remaining space */}
                <div className="relative w-full flex-1 flex items-end justify-center overflow-hidden min-h-0">
                    <img
                        src="/images/hero.png"
                        alt="Student Illustration"
                        className="w-auto h-full max-h-full object-contain object-bottom mask-gradient select-none pointer-events-none drop-shadow-2xl transition-all duration-500"
                    />
                </div>
            </div>
        </main>
    );
};

export default Hero;
