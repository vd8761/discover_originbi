"use client";

import React from "react";
import { CheckIcon } from "@/components/icons";

const features = [
    {
        title: "Behavioral Mapping",
        desc: "A deep dive into how their brain is naturally wired to work, lead, and solve problems.",
        icon: (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>
        )
    },
    {
        title: "The Success Blueprint",
        desc: "A clear, data-backed plan that shows exactly where they belong in the professional world.",
        icon: (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
        )
    },
    {
        title: "The 10x Advantage",
        desc: "Identification of specific job roles where their personality gives them a massive edge over others.",
        icon: (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
        )
    },
    {
        title: "Agile Compatibility",
        desc: "A clear understanding of how their natural strengths will adapt to a rapidly changing job market.",
        icon: (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
        )
    },
    {
        title: "Future-Sector Alignment",
        desc: "A guide to high-growth industries and emerging technologies that match their specific profile.",
        icon: (
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
        )
    }
];

const CareerValueCard: React.FC = () => {
    return (
        <section
            id="career-value-card"
            className="relative z-10 w-full py-16 lg:py-24 bg-brand-light-primary dark:bg-brand-dark-secondary transition-colors duration-300"
        >
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center justify-between">

                    {/* Left side content - Description & List */}
                    <div className="flex-1 w-full order-2 md:order-1">
                        <div className="mb-10 text-center md:text-left">
                            <h2 className="text-[clamp(28px,3.4vw,54px)] font-sans font-semibold text-brand-dark-primary dark:text-white leading-tight mb-4 transition-colors duration-300">
                                5: The Career Value Card
                            </h2>
                            <p className="text-[clamp(18px,1.5vw,24px)] text-gray-600 dark:text-gray-300">
                                Everything your child needs to choose the right path for{" "}
                                <span className="text-brand-green font-bold text-[1.2em]">₹749</span>.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex gap-4 md:gap-5 group cursor-default">
                                    <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-2xl bg-white dark:bg-brand-dark-primary shadow-[0_8px_20px_-8px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white group-hover:scale-105 transition-all duration-300">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-brand-dark-primary dark:text-white mb-2 group-hover:text-brand-green transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[1.05rem]">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side content - The Card & Philosophy */}
                    <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col gap-8 order-1 md:order-2">
                        {/* Premium Price Card Visual */}
                        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-brand-dark-primary to-brand-green/90 p-8 lg:p-12 shadow-[0_20px_50px_-15px_rgba(30,211,106,0.5)] overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

                            <div className="relative z-10">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold tracking-wider uppercase mb-8 backdrop-blur-sm shadow-sm">
                                    Lifetime Value
                                </span>
                                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                                    The Career Value Package
                                </h3>
                                <div className="flex items-end gap-2 mb-8">
                                    <span className="text-5xl lg:text-7xl font-bold text-white tracking-tighter">₹749</span>
                                    <span className="text-brand-light-secondary/80 text-lg mb-2">/ one-time</span>
                                </div>

                                <button className="w-full bg-white text-brand-green text-lg font-bold py-4 rounded-2xl hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_8px_25px_-8px_rgba(255,255,255,0.4)]">
                                    Get the Blueprint Now
                                </button>
                            </div>
                        </div>

                        {/* Philosophy Quote */}
                        <div className="relative rounded-3xl bg-brand-green/[0.08] dark:bg-brand-green/[0.1] border border-brand-green/20 px-8 py-10 lg:p-10 text-center shadow-[0_8px_30px_-12px_rgba(30,211,106,0.1)]">
                            <h4 className="text-sm font-bold tracking-widest uppercase text-brand-green mb-4">
                                The OriginBI Philosophy
                            </h4>
                            <p className="text-[clamp(18px,1.4vw,22px)] leading-relaxed text-brand-dark-primary dark:text-gray-200 font-medium italic">
                                "Choose the <span className="not-italic font-bold text-brand-green">Role</span> first, then pick the <span className="not-italic font-bold text-brand-green">Course</span>. Stop spending lakhs on degrees that don't fit."
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CareerValueCard;
