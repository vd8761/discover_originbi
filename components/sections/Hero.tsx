"use client";

import React from 'react';
import Button from "@/components/ui/Button";

const Hero: React.FC = () => {
    return (
        <section className="relative w-full bg-brand-light-primary dark:bg-brand-dark-primary transition-colors duration-500">

            {/* ── Green Hero Block ── responsive height ── */}
            <div className="relative w-full min-h-[80vh] sm:min-h-[100vh] lg:min-h-[140vh] flex flex-col items-center justify-center bg-brand-green overflow-visible">

                {/* Grid + Dot Pattern at Intersections */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px),
                            radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 2px, transparent 2px)
                        `,
                        backgroundSize: '48px 48px',
                    }}
                />

                {/* Glow at the bottom center */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-white/30 blur-[140px] rounded-full pointer-events-none" />

                {/* ── Text Content ── responsive positioning ── */}
                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center flex flex-col items-center -mt-[15vh] sm:mt-0 sm:-mb-20 lg:-mt-[60vh]">
                    <h1 className="text-[clamp(42px,6vw,84px)] font-sans font-extrabold text-white leading-[1.05] tracking-tight mb-5 drop-shadow-sm">
                        What should I do Next?
                    </h1>

                    <p className="text-[clamp(18px,1.5vw,22px)] text-white/90 font-medium max-w-2xl leading-relaxed mb-10 drop-shadow-sm">
                        Most students pick a career path based on pressure, not potential. We built something that helps you see yourself — clearly, completely, honestly.
                    </p>

                    <Button
                        href="/register"
                        size="lg"
                        className="group bg-white !text-brand-dark-green hover:bg-gray-50 border-none shadow-xl shadow-brand-dark-green/20 rounded-full px-8 py-3.5 sm:px-10 sm:py-4 text-lg font-bold transition-transform duration-300 hover:scale-105"
                    >
                        Discover who you are
                        <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </Button>
                </div>

                {/* ── Dome Curve ── green curves DOWNWARD ── */}
                <div className="absolute bottom-0 left-0 w-full z-[1] pointer-events-none translate-y-[1px]">
                    <svg
                        className="block w-full"
                        viewBox="0 0 1440 180"
                        preserveAspectRatio="none"
                        style={{ height: 'clamp(60px, 10vw, 220px)' }}
                    >
                        <path
                            d="M0,0 Q720,360 1440,0 L1440,180 L0,180 Z"
                            className="fill-brand-light-primary dark:fill-brand-dark-primary"
                        />
                    </svg>
                </div>
            </div>

            {/* ── Product Card ── responsive overlap ── */}
            <div className="relative z-20 w-full max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 -mt-[20vh] sm:-mt-[20vh] lg:-mt-[60vh] pb-24 lg:pb-32">
                <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-dark-secondary">
                    <div className="relative w-full aspect-[16/9] md:aspect-[16/10] lg:aspect-[16/9]">
                        <img
                            src="/hero-new.png"
                            alt="Origin BI Assessment Platform"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
