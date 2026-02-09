"use client";

import React from 'react';

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
        <section id="problem" className="relative z-10 w-full py-20 lg:py-32 transition-colors duration-500">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">
                {/* Section Header */}
                <div className="text-center mb-16 lg:mb-24 animate-fade-in">
                    <span className="text-[clamp(10px,0.8vw,14px)] font-bold uppercase tracking-[0.2em] text-brand-green mb-4 block">
                        Problem
                    </span>
                    <h2 className="text-[clamp(28px,3.5vw,56px)] font-sans font-bold leading-[1.1] text-brand-dark-primary dark:text-white max-w-4xl mx-auto transition-colors duration-300">
                        Still choosing courses based on fear or pressure?
                    </h2>
                </div>

                {/* Problems Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {problems.map((item, index) => (
                        <div
                            key={index}
                            className={`group relative flex flex-col h-[350px] lg:h-[450px] 2xl:h-[550px] rounded-[2.5rem] overflow-hidden border ${item.borderColor} ${item.bgColor} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-dark-primary/5 dark:hover:shadow-white/5 animate-fade-in`}
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            {/* Text content */}
                            <div className="p-8 lg:p-10 relative z-10">
                                <h3 className={`text-[clamp(18px,1.5vw,28px)] font-medium leading-[1.3] ${item.textColor} transition-colors duration-300`}>
                                    {item.title} <br />
                                    <span className="font-bold underline decoration-2 underline-offset-4">{item.highlight}</span>
                                </h3>
                            </div>

                            {/* Image container - aligned bottom and centered */}
                            <div className="mt-auto relative w-full h-full flex items-end justify-center overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-auto max-h-[85%] object-contain select-none pointer-events-none group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                {/* Bottom masking gradient to blend image if needed */}
                                <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${item.bgColor.split(' ')[0].replace('bg-', 'from-')} ${item.bgColor.split(' ')[1].replace('bg-', 'dark:from-')} to-transparent opacity-60`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Problem;
