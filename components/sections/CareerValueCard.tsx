"use client";

import React from "react";
import { CheckIcon } from "@/components/icons";

const features = [
    {
        title: "Behavioral Mapping",
        desc: "A deep dive into how their brain is naturally wired to work, lead, and solve problems.",
        icon: "psychology"
    },
    {
        title: "The Success Blueprint",
        desc: "A clear, data-backed plan that shows exactly where they belong in the professional world.",
        icon: "description"
    },
    {
        title: "The 10x Advantage",
        desc: "Identification of specific job roles where their personality gives them a massive edge over others.",
        icon: "trending_up"
    },
    {
        title: "Agile Compatibility",
        desc: "A clear understanding of how their natural strengths will adapt to a rapidly changing job market.",
        icon: "bolt"
    },
    {
        title: "Future-Sector Alignment",
        desc: "A guide to high-growth industries and emerging technologies that match their specific profile.",
        icon: "explore"
    }
];

const CareerValueCard: React.FC = () => {
    return (
        <section
            id="career-value-card"
            className="relative z-10 w-full min-h-screen flex items-center py-20 lg:py-32 bg-brand-light-primary dark:bg-brand-dark-primary transition-colors duration-500 overflow-hidden"
        >

            <div className="container mx-auto px-6 lg:px-[clamp(24px,6vw,120px)] relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">

                    {/* Left side content - Description & List */}
                    <div className="flex-1 w-full order-2 lg:order-1">
                        <div className="mb-12 text-center lg:text-left">
                            <h2 className="text-[clamp(32px,4vw,56px)] font-sans font-extrabold text-brand-dark-primary dark:text-white leading-[1.1] tracking-tight mb-6 transition-colors">
                                The <span className="text-brand-green">Career Value Card</span>
                            </h2>
                            <p className="text-lg sm:text-xl text-brand-text-light-secondary dark:text-white/70 font-medium max-w-2xl mx-auto lg:mx-0">
                                Everything your child needs to choose the right path for{" "}
                                <span className="text-brand-green font-bold">₹749</span>.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex gap-4 md:gap-6 group cursor-default">
                                    <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-2xl bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                        <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}>
                                            {feature.icon}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl sm:text-2xl font-bold text-brand-dark-primary dark:text-white mb-2 leading-tight tracking-tight group-hover:text-brand-green transition-colors duration-300">
                                            {feature.title}
                                        </h3>
                                        <p className="text-base sm:text-lg text-brand-text-light-secondary dark:text-white/70 leading-relaxed font-medium">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side content - The Card & Philosophy */}
                    <div className="w-full lg:w-[42%] flex flex-col gap-8 order-1 lg:order-2">
                        {/* Premium Price Card Visual - Primary Green Theme */}
                        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-brand-green via-[#19b359] to-brand-green p-8 lg:p-12 border border-white/20 shadow-xl overflow-hidden group">
                            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

                            {/* Animated reflection effect */}
                            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                            <div className="relative z-10">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white border border-white/30 text-[10px] font-black tracking-[0.2em] uppercase mb-10 backdrop-blur-md">
                                    Lifetime Value
                                </span>
                                <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-2 leading-tight tracking-tight">
                                    The Career Value Package
                                </h3>
                                <div className="flex items-baseline gap-2 mb-10">
                                    <span className="text-6xl lg:text-8xl font-black text-white tracking-tighter">₹749</span>
                                    <span className="text-white/60 text-lg font-bold">/ one-time</span>
                                </div>

                                <button className="w-full bg-white text-brand-green text-lg font-black py-4.5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg flex items-center justify-center gap-2">
                                    Get the Blueprint Now
                                </button>
                            </div>
                        </div>

                        {/* Philosophy Quote - Simple & Elegant */}
                        <div className="relative rounded-[2rem] bg-white dark:bg-brand-dark-secondary border border-gray-100 dark:border-white/5 px-8 py-10 lg:p-12 text-center shadow-[0_15px_30px_-10px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]">
                            <h4 className="text-[11px] font-black tracking-[0.2em] uppercase text-brand-green mb-6">
                                The OriginBI Philosophy
                            </h4>
                            <p className="text-xl sm:text-2xl lg:text-3xl leading-snug text-brand-dark-primary dark:text-white font-semibold italic">
                                "Choose the <span className="not-italic text-brand-green font-extrabold">Role</span> first, then pick the <span className="not-italic text-brand-green font-extrabold">Course</span>. Stop spending lakhs on degrees that don't fit."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerValueCard;
