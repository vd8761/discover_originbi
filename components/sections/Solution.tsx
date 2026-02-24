"use client";

import React from 'react';

const Solution: React.FC = () => {
    return (
        <section id="solution" className="relative w-full py-20 lg:py-32 bg-white dark:bg-brand-dark-primary transition-colors duration-500 overflow-hidden">
            {/* Background Detail */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-green/[0.02] dark:bg-brand-green/[0.01] -skew-x-12 translate-x-1/2 pointer-events-none" />

            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Column: Heading */}
                    <div className="max-w-2xl">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 dark:bg-brand-green/20 text-brand-green font-bold text-xs tracking-widest uppercase mb-8">
                            The Mirror Assessment
                        </div>
                        <h2 className="text-[clamp(40px,4.5vw,72px)] font-sans font-extrabold text-brand-dark-primary dark:text-white leading-[1.05] tracking-tight">
                            Not a quiz.<br />
                            Not a test.<br />
                            <span className="text-brand-green">A mirror.</span>
                        </h2>
                    </div>

                    {/* Right Column: Content Card */}
                    <div className="relative">
                        <div className="bg-brand-light-secondary dark:bg-brand-dark-secondary p-8 lg:p-12 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl relative overflow-hidden group">
                            {/* Decorative element */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-green/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150" />

                            <div className="relative z-10 space-y-10">
                                <div>
                                    <p className="text-[clamp(18px,1.3vw,22px)] font-medium text-brand-dark-primary dark:text-brand-text-primary leading-relaxed">
                                        Our assessment measures
                                        <span className="block my-4">
                                            <span className="text-brand-green font-black text-[clamp(48px,5vw,84px)] leading-none">14</span>
                                            <span className="text-brand-green font-bold text-[clamp(18px,1.2vw,22px)] ml-3 uppercase tracking-wider">Unique Dimensions</span>
                                        </span>
                                        of human behavior — from how you think and solve problems, to how you collaborate, create, and lead.
                                    </p>
                                </div>

                                <div className="h-px w-full bg-gradient-to-r from-brand-green/30 to-transparent" />

                                <p className="text-[clamp(18px,1.2vw,20px)] text-gray-600 dark:text-gray-400 leading-relaxed">
                                    It doesn't judge. It doesn't rank. It simply shows you how your mind works — and what that means for your future.
                                </p>

                                <div className="pt-4">
                                    <p className="text-[clamp(20px,1.4vw,24px)] font-bold text-brand-dark-primary dark:text-white leading-tight">
                                        Because when you understand yourself, every decision gets easier.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Solution;
