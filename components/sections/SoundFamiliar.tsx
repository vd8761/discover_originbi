"use client";

import React from 'react';

const SoundFamiliar: React.FC = () => {
    const situations = [
        {
            title: "Stop the Guesswork",
            description: (
                <>
                    Choosing a degree just because <span className="text-brand-green">"everyone is doing IT/CSE"</span> or because of friend’s choices. You fear that picking the wrong course now will lead to a career they will regret in 4 years.
                </>
            ),
            icon: "help"
        },
        {
            title: "Find Your Direction",
            description: (
                <>
                    Your child has the marks, but no clear idea which industry or specific professional role actually fits their natural personality. You are looking for a direction that goes beyond just <span className="text-brand-green">"getting a degree."</span>
                </>
            ),
            icon: "explore"
        },
        {
            title: "Correct Your Course Before It Starts",
            description: (
                <>
                    Feeling pressured to pick a college path without knowing if they have the natural <span className="text-brand-green">"Behavioral Fit"</span> for that work. You want to ensure they don't spend lakhs on a course only to realize later it was the wrong fit.
                </>
            ),
            icon: "gpp_maybe"
        }
    ];

    return (
        <section id="situation" className="relative w-full py-20 lg:py-32 bg-brand-light-primary dark:bg-brand-dark-primary transition-colors duration-500 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] relative z-10">
                {/* Header Sequence */}
                <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                    <h2 className="text-[clamp(32px,4vw,56px)] font-sans font-extrabold text-brand-dark-primary dark:text-white leading-[1.1] tracking-tight mb-6 transition-colors">
                        Is This Your <span className="text-brand-green">Current Situation</span> ?
                    </h2>
                    <p className="text-lg sm:text-xl text-brand-text-light-secondary dark:text-white/70 font-medium">
                        Check if you (or your child) are at one of these career crossroads:
                    </p>
                </div>

                {/* Grid Layout for Situations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {situations.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="group flex flex-col items-center text-center h-full px-2 lg:px-6"
                            >
                                <div className="flex-shrink-0 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2 text-brand-green">
                                    <span className="material-symbols-outlined" style={{ fontSize: '3.5rem' }}>
                                        {item.icon}
                                    </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-brand-dark-primary dark:text-white mb-4 leading-tight tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-base sm:text-lg text-brand-text-light-secondary dark:text-white/70 leading-relaxed font-medium">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SoundFamiliar;
