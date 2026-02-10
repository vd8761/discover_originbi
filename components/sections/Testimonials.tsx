"use client";

import React from 'react';
import { QuoteIcon } from "@/components/icons";

const Testimonials: React.FC = () => {
    return (
        <section className="relative py-32 flex items-center justify-center bg-gray-900 overflow-hidden">
            {/* Background Image with Parallax-like feel */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/problem2.png"
                    alt="Background"
                    className="w-full h-full object-cover opacity-50 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60" />
            </div>

            <div className="relative z-10 max-w-[1440px] mx-auto px-6 w-full">
                <div className="max-w-5xl mx-auto">
                    {/* Glass Card Container */}
                    <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl overflow-hidden">

                        {/* Decorative Quote Mark Background */}
                        <div className="absolute top-10 left-10 text-white/5 pointer-events-none select-none">
                            <QuoteIcon className="w-32 h-32" />
                        </div>

                        <div className="relative z-10 space-y-10">
                            <div className="w-20 h-20 mx-auto bg-brand-green/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-brand-green/30 text-brand-green mb-6">
                                <QuoteIcon className="w-8 h-8" />
                            </div>

                            <h2 className="text-3xl md:text-5xl font-sans font-light leading-snug text-white tracking-wide">
                                "We consider the Origin BI personal profile as an extension to our training programs in personal growth and development for our students."
                            </h2>


                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
