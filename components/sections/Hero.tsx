"use client";

import React from 'react';
import Button from "@/components/ui/Button";
import { Check } from "lucide-react";

const Hero: React.FC = () => {
    return (
        <section className="relative w-full flex items-center bg-brand-light-primary dark:bg-brand-dark-primary transition-colors duration-500 pt-24 pb-16 lg:pt-44 lg:pb-8 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">

                    {/* Left Content Column */}
                    <div className="w-full lg:w-[45%] text-left order-2 lg:order-1">
                        <div className="max-w-xl">
                            <h1 className="text-[clamp(30px,4vw,52px)] font-sans font-extrabold leading-[1.2] mb-5 tracking-tight text-brand-dark-primary dark:text-white transition-colors">
                                Discover, Align and Excel <br className="hidden sm:block" />
                                <span className="text-brand-green">in the Right Career Path</span>
                            </h1>

                            <p className="text-base sm:text-lg text-brand-text-light-secondary dark:text-white/60 font-medium mb-8 max-w-md leading-relaxed">
                                Find Your Edge. Move Beyond the Degree.
                            </p>

                            {/* Checklist */}
                            <div className="space-y-3 mb-10">
                                {[
                                    "1-on-1 Personalized Cognitive Profile Mapping",
                                    "Tailored Job-Role Alignment & Career Roadmaps",
                                    "Precision-Based Decision Making for Your Next Move"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-brand-green" strokeWidth={3} />
                                        </div>
                                        <span className="text-brand-text-light-primary dark:text-white/80 text-sm sm:text-base font-semibold tracking-tight">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <Button
                                    href="/register"
                                    size="lg"
                                    className="!bg-brand-green !text-white border-none rounded-full px-9 py-3.5 text-base font-extrabold transition-all duration-300 hover:scale-[1.02] hover:brightness-105"
                                >
                                    Get Your Career Roadmap Now • ₹749
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Right Image Column - Plain Image, no container */}
                    <div className="w-full lg:w-[55%] relative flex justify-center lg:justify-end order-1 lg:order-2">
                        <div className="w-full max-w-[650px]">
                            <img
                                src="/hero-new.png"
                                alt="Origin BI Assessment Platform"
                                className="w-full h-auto object-contain max-w-[360px] sm:max-w-full mx-auto scale-100 lg:scale-110 lg:-translate-y-10"
                                draggable={false}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
