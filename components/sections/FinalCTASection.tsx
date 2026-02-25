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
                <div className="relative overflow-hidden rounded-[3rem] bg-brand-dark-primary shadow-[0_20px_60px_-15px_rgba(30,211,106,0.3)]">

                    {/* Background Elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-brand-green/10 blur-[120px] rounded-full mix-blend-screen"></div>
                        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[120%] bg-brand-green/20 blur-[100px] rounded-full mix-blend-screen"></div>

                        {/* Grid Pattern overlay */}
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 bg-center"></div>
                    </div>

                    <div className="relative z-10 px-6 py-16 lg:py-24 max-w-5xl mx-auto flex flex-col items-center text-center">
                        <h2 className="text-[clamp(36px,5vw,72px)] font-sans font-bold text-white leading-[1.1] tracking-tight mb-8">
                            <span className="block opacity-90">Stop choosing courses</span>
                            <span className="block text-brand-green mt-2">in the dark.</span>
                        </h2>

                        <h3 className="text-[clamp(24px,3vw,40px)] font-medium text-white/90 mb-8">
                            Start with your natural role.
                        </h3>

                        <div className="max-w-3xl mb-12">
                            <p className="text-[clamp(18px,1.5vw,24px)] text-gray-300 leading-relaxed font-light">
                                "Every year, thousands of students pick degrees they will never use.
                                Don't let your child be one of them. Spend <strong className="text-white font-medium">60 minutes</strong> now to save <strong className="text-white font-medium">4 years</strong> of struggle."
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-4 w-full sm:w-auto">
                            <button className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-brand-green px-8 py-5 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(30,211,106,0.5)] active:scale-95">
                                <span className="relative z-10 flex items-center justify-center gap-3 text-lg sm:text-xl font-bold text-white tracking-wide">
                                    Download Your Career Roadmap
                                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-60"></span>
                                    <span>₹749</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                {/* Button shine effect */}
                                <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
                            </button>

                            <p className="text-gray-400 text-sm sm:text-base font-medium mt-2 tracking-wide uppercase">
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
