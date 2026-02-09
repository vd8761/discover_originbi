"use client";

import React from 'react';

const WhyThisMatters: React.FC = () => {
    return (
        <section id="why-this-matters" className="relative z-10 w-full py-16 lg:py-24 bg-brand-light-secondary dark:bg-brand-dark-primary transition-colors duration-300">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">
                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.6fr] gap-8 lg:gap-12 items-center">
                    <div className="max-w-xl">
                        <h2 className="text-[clamp(32px,3.4vw,54px)] font-sans font-semibold text-brand-dark-primary dark:text-white leading-tight mb-8 transition-colors duration-300">
                            Why This Matters
                        </h2>
                        <ul className="space-y-7">
                            <li className="flex items-start gap-4">
                                <span className="mt-2 block h-6 w-6 rounded-full border-[3px] border-brand-green" />
                                <p className="text-[clamp(20px,1.45vw,34px)] leading-[1.35] text-brand-dark-primary dark:text-brand-text-primary font-medium transition-colors duration-300">
                                    Education is changing.
                                    <br />
                                    Students live on WhatsApp.
                                </p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="mt-2 block h-6 w-6 rounded-full border-[3px] border-brand-green" />
                                <p className="text-[clamp(20px,1.45vw,34px)] leading-[1.35] text-brand-dark-primary dark:text-brand-text-primary font-medium transition-colors duration-300">
                                    This is not about marks. It is about
                                    <br />
                                    understanding who you are.
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="relative [border-radius:2.3rem_0_2.3rem_0] bg-brand-green px-8 py-10 lg:px-14 lg:py-14 text-center shadow-[0_18px_48px_-22px_rgba(30,211,106,0.7)]">
                        <img
                            src="/quote-symbol.svg"
                            alt=""
                            aria-hidden="true"
                            className="absolute top-5 left-7 w-9 h-auto lg:w-11 opacity-95 pointer-events-none select-none"
                        />
                        <blockquote className="mx-auto max-w-5xl text-brand-dark-green text-[clamp(22px,2vw,44px)] leading-[1.45] font-semibold">
                            I used to think I had to pick engineering or medicine like everyone else. After the assessment, I understood my strengths and chose a path that genuinely fits me.
                        </blockquote>
                        <img
                            src="/quote-symbol.svg"
                            alt=""
                            aria-hidden="true"
                            className="absolute bottom-5 right-8 w-9 h-auto lg:w-11 rotate-180 opacity-95 pointer-events-none select-none"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyThisMatters;
