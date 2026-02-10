"use client";

import React from 'react';
import Button from "@/components/ui/Button";

const Impact: React.FC = () => {
    return (
        <section className="py-24 bg-[#F4F4F4] dark:bg-brand-dark-secondary">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-center">

                <div className="space-y-8">
                    <h2 className="text-4xl lg:text-5xl font-sans font-light text-[#19211C] dark:text-white">
                        What's the <span className="font-bold">impact?</span>
                    </h2>
                    <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                        <p>
                            The impact of Origin BI isn't simply in the profile you receive – although that, in itself, is outstanding. No, it's what you take with you when you go back to the classroom or workplace.
                        </p>
                        <p>
                            The real breakthrough will happen when the lessons of Origin BI are applied back in the real world. When communication is consistently clear and respectful, when students know how to leverage their strengths, you'll realize the measurable impact that self-awareness can bring.
                        </p>
                    </div>
                    <div className="pt-4">
                        <Button
                            href="/register"
                            size="lg"
                            className="bg-brand-green text-white hover:bg-brand-dark-green transition-all text-lg px-8 py-4 shadow-xl shadow-brand-green/30"
                        >
                            Get Started Now
                        </Button>
                    </div>
                </div>

                <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
                    <img
                        src="/Slider.png"
                        alt="Student Impact"
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/20 to-transparent mix-blend-overlay transition-opacity duration-300 group-hover:opacity-80" />
                </div>

            </div>
        </section>
    );
};

export default Impact;
