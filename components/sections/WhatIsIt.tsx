"use client";

import React from 'react';
import { T, useLanguage } from "@/contexts/LanguageContext";

const WhatIsIt: React.FC = () => {
    const { language } = useLanguage();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);
    return (
        <section className="py-20 lg:py-32 bg-white dark:bg-brand-dark-primary overflow-hidden relative transition-colors duration-500">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">

                <div className="space-y-8 order-2 lg:order-1">
                    <div>
                        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 dark:bg-brand-green/20 text-brand-green font-bold text-xs tracking-widest uppercase mb-6">
                            {/* @ts-ignore */} <T> About The Platform </T> </div>
                        <h2 className={`font-sans leading-[1.1] mb-6 ${mounted && language === 'ta' ? 'text-3xl lg:text-5xl font-semibold' : 'text-4xl lg:text-6xl font-medium text-brand-dark-primary dark:text-white'}`}>
                            {/* @ts-ignore */} <T> What is </T> <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-teal-500">{/* @ts-ignore */} <T>Origin BI?</T> </span>
                        </h2>
                        <p className={`text-gray-600 dark:text-gray-300 leading-relaxed font-light ${mounted && language === 'ta' ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'}`}>
                            {/* @ts-ignore */} <T> At OriginBI MindWorks, we help you build a more accountable, agile, and mentally fit mind space using frameworks designed for Indian students. We combine Agile in India, frugal lifestyle thinking, and deep self-awareness to help people truly know their strength. </T> </p>
                    </div>

                    <div className="relative pl-6 border-l-4 border-brand-green">
                        <p className={`text-brand-dark-primary dark:text-white font-medium italic ${mounted && language === 'ta' ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'}`}>
                            {/* @ts-ignore */} <T> "Traditional systems are outdated. We build human-first mind spaces." </T> </p>
                    </div>
                </div>

                <div className="relative h-[400px] lg:h-[550px] order-1 lg:order-2 flex justify-center items-center">
                    {/* Organic Background Shape */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/20 to-blue-500/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] rotate-3 scale-95 blur-xl opacity-60 dark:opacity-40" />

                    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10 rotate-2 hover:rotate-0 transition-all duration-700 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                        <img
                            src="/images/problem1.png" // Placeholder image
                            alt="What is Origin BI"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-lg">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                                    <p className="text-brand-green text-xs font-bold uppercase tracking-wider">{/* @ts-ignore */} <T>Mission</T> </p>
                                </div>
                                <p className="text-white text-lg font-medium leading-snug">{/* @ts-ignore */} <T>Empowering Student Growth through Self-Awareness</T> </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WhatIsIt;
