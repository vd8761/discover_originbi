"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const FinalCTASection: React.FC = () => {
    return (
        <section
            id="final-cta"
            className="relative z-10 w-full py-20 lg:py-32 bg-brand-light-secondary dark:bg-brand-dark-primary transition-colors duration-300"
        >
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">
                <div className="relative [border-radius:3.5rem_0_3.5rem_0] bg-brand-green shadow-[0_24px_64px_-20px_rgba(30,211,106,0.6)] overflow-hidden">

                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

                    {/* Quote Symbols */}
                    <img
                        src="/quote-symbol.svg"
                        alt=""
                        aria-hidden="true"
                        className="absolute top-8 left-8 w-12 h-auto opacity-90 pointer-events-none select-none brightness-0 invert"
                    />
                    <img
                        src="/quote-symbol.svg"
                        alt=""
                        aria-hidden="true"
                        className="absolute bottom-8 right-10 w-12 h-auto rotate-180 opacity-90 pointer-events-none select-none brightness-0 invert"
                    />

                    <div className="relative z-10 px-6 py-16 lg:py-24 max-w-5xl mx-auto flex flex-col items-center text-center">
                        <h2 className="text-[clamp(36px,5vw,72px)] font-sans font-bold text-white leading-[1.1] tracking-tight mb-8">
                            <span className="block opacity-90">Stop choosing courses</span>
                            <span className="block text-brand-dark-green mt-2">in the dark.</span>
                        </h2>

                        <h3 className="text-[clamp(24px,3vw,40px)] font-medium text-white mb-8">
                            Start with your natural role.
                        </h3>

                        <div className="max-w-3xl mb-12">
                            <p className="text-[clamp(18px,1.5vw,24px)] text-white/90 leading-relaxed font-semibold">
                                "Every year, thousands of students pick degrees they will never use.
                                Don't let your child be one of them. Spend <strong className="text-brand-dark-green bg-white/90 px-3 py-1 rounded-lg">60 minutes</strong> now to save <strong className="text-brand-dark-green bg-white/90 px-3 py-1 rounded-lg">4 years</strong> of struggle."
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                            <button className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-white px-8 py-5 shadow-xl transition-all duration-300 active:scale-95">
                                <span className="relative z-10 flex items-center justify-center gap-3 text-lg sm:text-xl font-bold text-brand-green tracking-wide">
                                    Download Your Career Roadmap
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green opacity-30"></span>
                                    <span>₹749</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>

                            <p className="text-white/70 text-sm sm:text-base font-bold mt-2 tracking-widest uppercase">
                                Start your Behavioral Mapping today.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinalCTASection;
