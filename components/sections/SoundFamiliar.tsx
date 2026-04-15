"use client";

import React from 'react';
import { T, useLanguage } from "@/contexts/LanguageContext";

const SoundFamiliar: React.FC = () => {
    const { language } = useLanguage();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const situations = [
        {
            title: <>{/* @ts-ignore */} <T> Stop the Guesswork </T></>,
            description: (
                <>
                    {/* @ts-ignore */} <T> Choosing a degree just because </T> <span className="text-brand-green">{/* @ts-ignore */} <T>"everyone is doing IT/CSE"</T> </span> {/* @ts-ignore */} <T> or because of friend’s choices. You fear that picking the wrong course now will lead to a career they will regret in 4 years. </T> </>
            ),
            icon: "help"
        },
        {
            title: <>{/* @ts-ignore */} <T> Find Your Direction </T></>,
            description: (
                <>
                    {/* @ts-ignore */} <T> Your child has the marks, but no clear idea which industry or specific professional role actually fits their natural personality. You are looking for a direction that goes beyond just </T> <span className="text-brand-green">{/* @ts-ignore */} <T>"getting a degree."</T> </span>
                </>
            ),
            icon: "explore"
        },
        {
            title: <>{/* @ts-ignore */} <T> Correct Your Course Before It Starts </T></>,
            description: (
                <>
                    {/* @ts-ignore */} <T> Feeling pressured to pick a college path without knowing if they have the natural </T> <span className="text-brand-green">{/* @ts-ignore */} <T>"Behavioral Fit"</T> </span> {/* @ts-ignore */} <T> for that work. You want to ensure they don't spend lakhs on a course only to realize later it was the wrong fit. </T> </>
            ),
            icon: "gpp_maybe"
        }
    ];

    return (
        <section id="situation" className="relative w-full py-20 lg:py-32 bg-brand-light-primary dark:bg-brand-dark-primary transition-colors duration-500 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] relative z-10">
                {/* Header Sequence */}
                <div className={`text-center mx-auto mb-16 lg:mb-20 ${mounted && language === 'ta' ? 'max-w-5xl' : 'max-w-3xl'}`}>
                    <h2 className={`font-sans font-extrabold text-brand-dark-primary dark:text-white leading-[1.1] tracking-tight mb-6 transition-colors ${mounted && language === 'ta' ? 'text-[clamp(24px,3vw,38px)]' : 'text-[clamp(28px,3.5vw,48px)]'}`}>
                        {/* @ts-ignore */} <T> Is This Your </T> <span className="text-brand-green">{/* @ts-ignore */} <T>Current Situation</T> </span> ?
                    </h2>
                    <p className={`text-brand-text-light-secondary dark:text-white/70 font-medium ${mounted && language === 'ta' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>
                        {/* @ts-ignore */} <T> Check if you (or your child) are at one of these career crossroads: </T> </p>
                </div>

                {/* Grid Layout for Situations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                    {situations.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="group h-full"
                            >
                                <div className="h-full flex flex-col items-center text-center px-2 lg:px-6">
                                    <div className="h-16 flex-shrink-0 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-2 text-brand-green">
                                        <span className="material-symbols-outlined" style={{ fontSize: '3.5rem' }}>
                                            {item.icon}
                                        </span>
                                    </div>
                                    <h3 className={`font-bold text-brand-dark-primary dark:text-white mb-4 leading-tight tracking-tight min-h-[68px] flex items-center justify-center ${mounted && language === 'ta' ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>
                                        {item.title}
                                    </h3>
                                    <p className={`text-brand-text-light-secondary dark:text-white/70 leading-relaxed font-medium max-w-[34ch] mx-auto ${mounted && language === 'ta' ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}`}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SoundFamiliar;
