"use client";

import React from 'react';
import { T } from "@/contexts/LanguageContext";

const Problem: React.FC = () => {
    const problems = [
        {
            title: "Following friends without",
            highlight: "knowing why?",
            image: "/images/problem1.png",
            bgColor: "bg-brand-light-primary dark:bg-brand-dark-secondary",
            textColor: "text-brand-dark-primary dark:text-brand-text-primary",
            borderColor: "border-brand-light-tertiary dark:border-white/5"
        },
        {
            title: "Parents pushing",
            highlight: '"safe" career paths?',
            image: "/images/problem2.png",
            bgColor: "bg-brand-light-secondary dark:bg-brand-dark-tertiary",
            textColor: "text-brand-dark-primary dark:text-brand-text-primary",
            borderColor: "border-brand-light-tertiary dark:border-white/5"
        },
        {
            title: "Stuck in a boring job, wondering",
            highlight: "what else is out there?",
            image: "/images/problem3.png",
            bgColor: "bg-brand-light-primary dark:bg-brand-dark-secondary",
            textColor: "text-brand-dark-primary dark:text-brand-text-primary",
            borderColor: "border-brand-light-tertiary dark:border-white/5"
        }
    ];

    return (
        <section id="problem" className="relative z-10 w-full py-16 lg:py-24 transition-colors duration-500">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">
                {/* Section Header */}
                <div className="text-center mb-12 lg:mb-20 animate-fade-in">
                    <span className="text-[clamp(10px,0.8vw,14px)] font-bold uppercase tracking-[0.2em] text-brand-green mb-4 block">
                        {/* @ts-ignore */} <T> Problem </T> </span>
                    <h2 className="text-[clamp(26px,3.2vw,48px)] font-sans font-bold leading-[1.2] lg:leading-[1.1] text-brand-dark-primary dark:text-white max-w-4xl mx-auto transition-colors duration-300 px-4">
                        {/* @ts-ignore */} <T> Still choosing courses based on fear or pressure? </T> </h2>
                </div>

                {/* Problems Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {problems.map((item, index) => (
                        <div
                            key={index}
                            className={`group relative flex flex-col h-[300px] lg:h-[380px] 2xl:h-[450px] rounded-tl-[2.5rem] rounded-br-[2.5rem] overflow-hidden border ${item.borderColor} ${item.bgColor} animate-fade-in shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-brand-green/30`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Text content */}
                            <div className="p-6 lg:p-8 relative z-20">
                                <h3 className={`text-[clamp(16px,1.3vw,24px)] font-medium leading-[1.4] lg:leading-[1.3] ${item.textColor} transition-colors duration-300`}>
                                    {item.title} <br />
                                    <span className="font-bold">{item.highlight}</span>
                                </h3>
                            </div>

                            {/* Image container - aligned bottom and centered */}
                            <div className="mt-auto relative w-full flex-1 flex items-end justify-center overflow-hidden">
                                {/* Enhanced Ripple Effect (Concentric Circles) */}
                                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[68%] aspect-square rounded-full bg-brand-green/[0.05] dark:bg-brand-green/[0.03] z-0 scale-[1.22] transition-transform duration-700 group-hover:scale-[1.3]" />
                                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[68%] aspect-square rounded-full bg-brand-green/[0.1] dark:bg-brand-green/[0.07] z-0 scale-[1.04] transition-transform duration-700 group-hover:scale-[1.1]" />
                                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[68%] aspect-square rounded-full bg-brand-green/[0.18] dark:bg-brand-green/[0.14] z-0 scale-[0.88] shadow-[0_0_70px_rgba(30,211,106,0.3)] transition-transform duration-700 group-hover:scale-[0.95]" />
                                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[24%] aspect-square rounded-full bg-gradient-to-b from-brand-green/80 via-brand-green/60 to-brand-green/30 blur-sm z-0" />

                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="relative z-10 w-full h-auto max-h-[90%] object-contain select-none pointer-events-none drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Bottom masking gradient */}
                                <div className={`absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t ${item.bgColor.split(' ')[0].replace('bg-', 'from-')} ${item.bgColor.split(' ')[1].replace('bg-', 'dark:from-')} to-transparent opacity-40 z-15`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Problem;
