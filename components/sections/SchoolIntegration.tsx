"use client";

import React from 'react';
import Button from "@/components/ui/Button";

const SchoolIntegration: React.FC = () => {
    return (
        <section className="py-0 relative overflow-hidden bg-brand-green">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%">
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
            {/* Curved dashed lines decorative */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] border-[3px] border-dashed border-white/20 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] border-[3px] border-dashed border-white/20 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-12 items-center relative z-10 h-full">

                <div className="py-24 pr-10">
                    <h2 className="text-4xl lg:text-5xl font-sans font-light text-white mb-8">
                        Origin BI for <span className="font-bold">Schools</span>
                    </h2>
                    <div className="space-y-6 text-lg text-white/95 font-light leading-relaxed mb-8">
                        <p>
                            Give your students instant access to key parts of their personal profile inside their learning environment.
                        </p>
                        <p>
                            Teachers can compare communication styles, anticipate classroom dynamics and get tips on adapting their approach, all within the school system.
                        </p>
                        <p className="font-bold bg-white/10 p-4 rounded-xl border-l-4 border-white backdrop-blur-sm">
                            Included with every Origin BI Personal Profile, it helps schools build stronger and more effective learning relationships.
                        </p>
                    </div>

                    <Button
                        href="/register"
                        className="bg-white !text-brand-green hover:bg-brand-dark-primary hover:!text-white transition-all text-lg px-8 py-4 shadow-xl font-medium rounded-full"
                    >
                        Register Now
                    </Button>
                </div>

                <div className="relative h-full min-h-[500px] flex items-end justify-center lg:justify-end pb-0">
                    <div className="relative w-full max-w-md lg:max-w-full">
                        {/* Puzzle Floating Card */}
                        <div className="absolute top-10 -left-10 z-20 bg-white p-4 rounded-2xl shadow-xl max-w-[200px] animate-bounce-slow hidden lg:block">
                            <div className="flex gap-2 items-center mb-2">
                                <span className="text-2xl">🧩</span>
                                <span className="text-xs font-bold text-gray-400">FIT CHECK</span>
                            </div>
                            <p className="text-sm font-medium text-brand-dark-primary">Know what fits you – not what others expect</p>
                        </div>

                        <img
                            src="/images/hero.png"
                            alt="Student Integration"
                            className="w-full h-auto object-cover rounded-t-3xl shadow-2xl border-t-8 border-x-8 border-white/20"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SchoolIntegration;
