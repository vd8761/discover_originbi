"use client";

import React from 'react';
import Button from "@/components/ui/Button";

const CTASection: React.FC = () => {
    return (
        <section className="relative z-10 w-full py-12 sm:py-16 lg:py-20">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">
                {/* Themed Container - Matches width and style of Testimonials and WhyThisMatters */}
                <div className="relative [border-radius:1.5rem_0_1.5rem_0] sm:[border-radius:2rem_0_2rem_0] lg:[border-radius:2.5rem_0_2.5rem_0] overflow-hidden bg-brand-green shadow-xl transition-all duration-500">

                    {/* White Grid Background Effect */}
                    <div className="absolute inset-0 opacity-[0.2] pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}>
                    </div>

                    {/* Centered Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 sm:p-12 lg:p-16 min-h-[280px] lg:min-h-[350px]">
                        <h2 className="text-[clamp(24px,3vw,44px)] font-sans font-bold text-brand-dark-green leading-[1.1] mb-6 max-w-4xl tracking-tight">
                            Still confused about what to do <br className="hidden md:block" /> after 12th or college?
                        </h2>
                        <p className="text-[clamp(15px,1vw,18px)] text-brand-dark-green/80 font-medium mb-10 max-w-2xl leading-relaxed">
                            Let us help you discover the right path. Discover the path that fits you, not what others expect.
                        </p>
                        <div className="flex justify-center w-full">
                            <Button
                                size="lg"
                                className="!bg-white !text-brand-green hover:!bg-white/90 border-none rounded-2xl shadow-[0_15px_30px_-10px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 px-10 py-5"
                            >
                                Take the First Step
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
