"use client";

import React from 'react';

const DimensionQuote: React.FC = () => {
    return (
        <section className="relative w-full py-16 lg:py-24 bg-white dark:bg-brand-dark-primary overflow-hidden">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">
                <div className="relative [border-radius:2.3rem_0_2.3rem_0] bg-brand-green px-8 py-10 lg:px-14 lg:py-14 text-center shadow-[0_18px_48px_-22px_rgba(30,211,106,0.7)] overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
                    <img
                        src="/quote-symbol.svg"
                        alt=""
                        aria-hidden="true"
                        className="absolute top-5 left-7 w-9 h-auto lg:w-11 opacity-90 pointer-events-none select-none brightness-0 invert"
                    />
                    <blockquote className="relative z-10 mx-auto max-w-5xl text-white text-[clamp(20px,2.4vw,48px)] leading-[1.5] font-semibold">
                        Each dimension tells a story. Together, they tell yours.
                    </blockquote>
                    <img
                        src="/quote-symbol.svg"
                        alt=""
                        aria-hidden="true"
                        className="absolute bottom-5 right-8 w-9 h-auto lg:w-11 rotate-180 opacity-90 pointer-events-none select-none brightness-0 invert"
                    />
                </div>
            </div>
        </section>
    );
};

export default DimensionQuote;
