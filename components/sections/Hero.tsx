"use client";

import React from 'react';
import Link from 'next/link';
import Button from "@/components/ui/Button";

const Hero: React.FC = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center bg-white dark:bg-brand-dark-primary overflow-hidden pt-28 pb-20 bg-mesh">
            {/* Dynamic Background Elements */}

            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 w-full relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Text Content */}
                <div className="space-y-8 order-2 lg:order-1 text-center lg:text-left">


                    <h1 className="text-5xl lg:text-7xl font-sans font-bold text-brand-dark-primary dark:text-white leading-[1.1] tracking-tight">
                        What should I do <span className="text-brand-green">Next?</span>
                    </h1>

                    <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
                        Let your strengths answer that.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:400ms] opacity-0 fill-mode-forwards">
                            <Button href="/register" size="lg" className="transform hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-brand-green/20 rounded-full px-10 py-4 text-lg font-bold">
                                Take the First Step
                            </Button>
                            <Button href="#how-it-works" variant="outline" size="lg" className="border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5">
                                Learn More
                            </Button>
                        </div>
                    </div>

                    <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 text-gray-400 text-sm font-medium">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-brand-dark-primary bg-gray-200 flex items-center justify-center overflow-hidden">
                                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                </div>
                            ))}
                        </div>
                        <p>Trusted by 50+ Institutions</p>
                    </div>
                </div>

                {/* Hero Visual */}
                <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                    <div className="relative z-10 w-full max-w-[600px] lg:scale-125 origin-center lg:origin-bottom-right">
                        {/* Main Image - Removed card, increased size */}
                        <div className="relative">
                            <img
                                src="/hero-new.png"
                                alt="Origin BI Discovery"
                                className="w-full h-auto object-cover"
                            />

                        </div>
                    </div>

                    {/* Background Decorative Blobs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-brand-green/20 to-blue-500/20 rounded-full blur-[100px] -z-10" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
