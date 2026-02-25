"use client";

import React from "react";
import { CheckIcon, AlertCircleIcon } from "@/components/icons";

const WhyOriginBI: React.FC = () => {
    const tableData = [
        {
            feature: "Basis of Choice",
            old: 'Based on "Market Trends" or what relatives/friends suggest.',
            new: "Based on your child’s Unique Behavioral DNA and natural strengths.",
        },
        {
            feature: "The Method",
            old: 'General marks in school or "What do you like?" questions.',
            new: "Proprietary Behavioral Mapping to see how their brain is actually wired.",
        },
        {
            feature: "The Outcome",
            old: "Picking a degree and hoping it leads to a good career.",
            new: "Identifying the Role first, then picking the degree that fits.",
        },
        {
            feature: "Family Stress",
            old: 'High anxiety and "Dinner Table" arguments over college choices.',
            new: "Confidence and Peace of Mind knowing the path is backed by science.",
        },
        {
            feature: "The Goal",
            old: 'Just getting into "A Good College" or any popular branch.',
            new: "Finding the Right Professional Fit for long-term growth and success.",
        },
    ];

    return (
        <section
            id="why-originbi"
            className="relative z-10 w-full py-16 lg:py-24 bg-white dark:bg-brand-dark-primary transition-colors duration-300"
        >
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">
                <div className="text-center mb-12 lg:mb-20">
                    <h2 className="text-[clamp(32px,4vw,56px)] font-sans font-extrabold text-brand-dark-primary dark:text-white leading-tight mb-4 transition-colors duration-300">
                        Why <span className="text-brand-green">OriginBI?</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-brand-text-light-secondary dark:text-white/60 font-medium">
                        The Difference Between Guessing and Knowing
                    </p>
                </div>

                <div className="max-w-6xl mx-auto overflow-hidden rounded-[1.5rem] border border-gray-200 dark:border-white/5 shadow-sm bg-white dark:bg-brand-dark-secondary transition-colors duration-300">

                    {/* Header Row */}
                    <div className="hidden md:grid grid-cols-[1fr_1.5fr_1.5fr] bg-brand-light-secondary dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                        <div className="p-6 lg:p-8 font-semibold text-xl text-brand-dark-primary dark:text-white flex items-center">
                            Feature
                        </div>
                        <div className="p-6 lg:p-8 font-semibold text-xl text-brand-dark-primary dark:text-white flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-red-500 shrink-0">
                                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>dangerous</span>
                            </span>
                            <span className="pt-1">The Old Way <span className="text-gray-500 dark:text-gray-400 text-sm font-medium block mt-0.5">(High Risk)</span></span>
                        </div>
                        <div className="p-6 lg:p-8 font-semibold text-2xl text-brand-green flex items-center gap-3 bg-brand-green/5 dark:bg-brand-green/10 border-l border-brand-green/20">
                            <span className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white shrink-0 shadow-sm shadow-brand-green/30">
                                <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}>verified</span>
                            </span>
                            <span className="pt-1">The OriginBI Way <span className="text-brand-green/70 text-sm font-medium block mt-0.5">(The Strategy)</span></span>
                        </div>
                    </div>

                    {/* Data Rows */}
                    <div className="divide-y divide-gray-200 dark:divide-gray-800">
                        {tableData.map((row, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1.5fr] hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors duration-300">
                                <div className="p-6 lg:px-8 flex flex-col justify-center bg-gray-50/50 dark:bg-gray-800/10">
                                    <span className="md:hidden font-semibold text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2 block">Feature</span>
                                    <span className="font-bold text-lg text-brand-dark-primary dark:text-gray-100">{row.feature}</span>
                                </div>

                                <div className="p-6 lg:p-8 flex flex-col justify-center text-gray-600 dark:text-gray-400 text-[1.1rem] border-t border-gray-100 dark:border-white/5 md:border-t-0">
                                    <span className="md:hidden font-semibold text-[11px] text-red-500/80 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>dangerous</span> The Old Way
                                    </span>
                                    <p className="leading-relaxed">{row.old}</p>
                                </div>

                                <div className="p-6 lg:p-8 flex flex-col justify-center text-[1.15rem] text-brand-dark-primary dark:text-white bg-brand-green/[0.03] dark:bg-brand-green/5 border-t border-brand-green/10 md:border-t-0 md:border-l border-brand-green/20">
                                    <span className="md:hidden font-semibold text-[11px] text-brand-green uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                        <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>verified</span> The OriginBI Way
                                    </span>
                                    <p className="leading-relaxed font-bold">{row.new}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 lg:mt-28 text-center max-w-5xl mx-auto">
                    <div className="relative [border-radius:2.3rem_0_2.3rem_0] bg-brand-green px-8 py-12 lg:px-16 lg:py-16 shadow-lg overflow-hidden">
                        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
                        <img
                            src="/quote-symbol.svg"
                            alt=""
                            aria-hidden="true"
                            className="absolute top-5 left-7 w-9 h-auto lg:w-11 opacity-90 pointer-events-none select-none brightness-0 invert"
                        />
                        <img
                            src="/quote-symbol.svg"
                            alt=""
                            aria-hidden="true"
                            className="absolute bottom-5 right-8 w-9 h-auto lg:w-11 rotate-180 opacity-90 pointer-events-none select-none brightness-0 invert"
                        />
                        <p className="relative z-10 text-[clamp(20px,1.8vw,32px)] leading-[1.6] text-white font-semibold">
                            <span className="opacity-90 font-medium">Most students pick a degree based on 10% of the information (Marks & Trends).</span>
                            <br className="hidden md:block" />
                            <span className="mt-5 block">We help you decide based on the other <strong className="text-brand-dark-green bg-white/90 px-3 py-1.5 rounded-lg text-[1em] font-extrabold mx-1 shadow-sm">90%</strong> <span className="block mt-2 sm:inline sm:mt-0 opacity-90">(Personality, Behavior, and Potential).</span></span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyOriginBI;
