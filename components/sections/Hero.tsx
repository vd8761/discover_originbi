"use client";

import React from 'react';
import Button from "@/components/ui/Button";
import { Check } from "lucide-react";
import { T, useLanguage } from "@/contexts/LanguageContext";
import { useReferral } from "@/contexts/ReferralContext";

const Hero: React.FC = () => {
    const { getRegisterUrl } = useReferral();
    const { language } = useLanguage();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className={`relative w-full flex bg-brand-light-primary dark:bg-brand-dark-primary transition-colors duration-500 overflow-hidden ${mounted && language === 'ta' ? 'pt-24 pb-12 items-center' : 'pt-24 pb-16 lg:pt-44 lg:pb-8 items-center'}`}>
            <div className="container mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] relative z-10">
                <div className={`flex flex-col lg:flex-row justify-between gap-10 lg:gap-16 items-center`}>

                    {/* Left Content Column */}
                    <div className={`w-full text-left order-2 lg:order-1 transition-all duration-300 ${mounted && language === 'ta' ? 'lg:w-[50%] pt-4 lg:pt-8' : 'lg:w-[45%]'}`}>
                        <div className="max-w-xl">
                            <h1 className={`font-sans font-extrabold tracking-tight text-brand-dark-primary dark:text-white transition-colors py-1 ${mounted && language === 'ta' ? 'leading-[1.3] text-[clamp(18px,2.5vw,28px)] mb-6' : 'leading-[1.2] text-[clamp(30px,4vw,52px)] mb-5'}`}>
                                {/* @ts-ignore */} <T> Discover, Align and Excel </T>
                                <br className={mounted && language === 'ta' ? 'hidden' : 'hidden sm:block'} />
                                <span className={mounted && language === 'ta' ? 'text-brand-green' : 'text-brand-green'}>{mounted && language === 'ta' ? ' ' : ''}{/* @ts-ignore */} <T>in the Right Career Path</T> </span>
                            </h1>

                            <p className={`text-base sm:text-lg text-brand-text-light-secondary dark:text-white/60 font-medium mb-8 leading-relaxed ${mounted && language === 'ta' ? 'max-w-xl' : 'max-w-md'}`}>
                                {/* @ts-ignore */} <T> Find Your Edge. Move Beyond the Degree. </T> </p>

                            {/* Checklist */}
                            <div className="space-y-3 mb-10">
                                {[
                                    "1-on-1 Personalized Cognitive Profile Mapping",
                                    "Tailored Job-Role Alignment & Career Roadmaps",
                                    "Precision-Based Decision Making for Your Next Move"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-brand-green" strokeWidth={3} />
                                        </div>
                                        <span className="text-brand-text-light-primary dark:text-white/80 text-sm sm:text-base font-semibold tracking-tight">
                                            <T>{item}</T>
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <Button
                                    href={getRegisterUrl()}
                                    size="lg"
                                    className="!bg-brand-green !text-white border-none rounded-full px-9 py-3.5 text-base font-extrabold transition-all duration-300 hover:scale-[1.02] hover:brightness-105"
                                >
                                    {/* @ts-ignore */} <T> Get Your Career Roadmap Now • ₹749 </T> </Button>
                            </div>

                            {/* Language Support Indicator */}
                            <div className="mt-6 flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-tight">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[16px] text-brand-green">language</span>
                                    <span>
                                        {/* @ts-ignore */} <T>We support English & Tamil.</T>
                                    </span>
                                </div>
                                <span className="ml-6 text-xs text-gray-400 dark:text-gray-500">
                                    {/* @ts-ignore */} <T>Soon will add more native languages.</T>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Image Column - Plain Image, no container */}
                    <div className={`w-full relative flex justify-center order-1 lg:order-2 transition-all duration-300 ${mounted && language === 'ta' ? 'lg:w-[50%]' : 'lg:w-[55%]'}`}>
                        <div className={`w-full flex justify-center items-center ${mounted && language === 'ta' ? 'max-w-[550px]' : 'max-w-[650px]'}`}>
                            <img
                                src="/hero-new.png"
                                alt="Origin BI Assessment Platform"
                                className={`w-full h-auto object-contain max-w-[360px] sm:max-w-full mx-auto transition-transform duration-300 ${mounted && language === 'ta' ? 'scale-110' : 'scale-100 lg:scale-110 lg:-translate-y-10'}`}
                                draggable={false}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
