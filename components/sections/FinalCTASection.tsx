"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { T } from "@/contexts/LanguageContext";
import { useReferral } from "@/contexts/ReferralContext";

const FinalCTASection: React.FC = () => {
    const { getRegisterUrl } = useReferral();
    return (
        <section
            id="final-cta"
            className="relative z-10 w-full min-h-[80vh] flex items-center py-12 lg:py-16 bg-brand-light-secondary dark:bg-brand-dark-primary transition-colors duration-300"
        >
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] w-full">
                <div className="relative [border-radius:1.8rem_0_1.8rem_0] bg-brand-green shadow-2xl overflow-hidden">

                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

                    {/* Quote Symbols */}
                    <img
                        src="/quote-symbol.svg"
                        alt=""
                        aria-hidden="true"
                        className="absolute top-4 left-4 lg:top-6 lg:left-6 w-8 lg:w-10 h-auto opacity-70 pointer-events-none select-none brightness-0 invert"
                    />
                    <img
                        src="/quote-symbol.svg"
                        alt=""
                        aria-hidden="true"
                        className="absolute bottom-4 right-6 lg:bottom-6 lg:right-8 w-8 lg:w-10 h-auto rotate-180 opacity-70 pointer-events-none select-none brightness-0 invert"
                    />

                    <div className="relative z-10 px-6 py-12 lg:py-16 max-w-4xl mx-auto flex flex-col items-center text-center">
                        <h2 className="text-[clamp(24px,4vw,56px)] font-sans font-bold text-white leading-[1.1] tracking-tight mb-6 px-4 lg:px-0">
                            <span className="block opacity-90">{/* @ts-ignore */} <T>Stop choosing courses</T> </span>
                            <span className="block text-brand-dark-green mt-2">{/* @ts-ignore */} <T>in the dark.</T> </span>
                        </h2>

                        <h3 className="text-[clamp(16px,2.2vw,30px)] font-medium text-white mb-6">
                            {/* @ts-ignore */} <T> Start with your natural role. </T> </h3>

                        <div className="max-w-2xl mb-10">
                            <p className="text-[clamp(14px,1.2vw,20px)] text-white/90 leading-relaxed font-semibold">
                                {/* @ts-ignore */} <T> "Every year, thousands of students pick degrees they will never use. Don't let your child be one of them. Spend </T> <strong className="inline-block text-brand-dark-green bg-white/90 px-2 py-0 lg:px-3 lg:py-1 rounded-md mx-0.5 text-[0.95em]">{/* @ts-ignore */} <T>60 minutes</T> </strong> {/* @ts-ignore */} <T> now to save </T> <strong className="inline-block text-brand-dark-green bg-white/90 px-2 py-0 lg:px-3 lg:py-1 rounded-md mx-1 text-[0.95em]">{/* @ts-ignore */} <T>4 years</T> </strong> {/* @ts-ignore */} <T> of struggle." </T> </p>
                        </div>

                        <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                            <Button
                                href={getRegisterUrl()}
                                className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-white hover:bg-brand-dark-green px-5 py-3.5 lg:px-8 lg:py-5 shadow-xl transition-all duration-300 active:scale-95 border-none focus:outline-none focus:ring-0"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2 lg:gap-3 text-sm lg:text-lg font-bold text-brand-green group-hover:text-white tracking-wide transition-colors duration-300">
                                    {/* @ts-ignore */} <T> Download Your Career Roadmap </T> <span className="w-1.5 h-1.5 rounded-full bg-brand-green group-hover:bg-white opacity-30 mt-0.5 transition-colors"></span>
                                    <span>₹749</span>
                                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Button>

                            <p className="text-white/70 text-[10px] sm:text-sm font-bold mt-1 tracking-widest uppercase mb-4 lg:mb-0">
                                {/* @ts-ignore */} <T> Start your Behavioral Mapping today. </T> </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTASection;
