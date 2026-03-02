"use client";

import React from 'react';
import Button from "@/components/ui/Button";
import { T, useLanguage } from "@/contexts/LanguageContext";
import { useReferral } from "@/contexts/ReferralContext";

const CTASection: React.FC = () => {
    const { language } = useLanguage();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);
    const { getRegisterUrl } = useReferral();
    return (
        <section className="relative z-10 w-full py-12 sm:py-16 lg:py-20">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">
                {/* Themed Container - Matches width and style of Testimonials and WhyThisMatters */}
                <div className="relative [border-radius:1.5rem_0_1.5rem_0] sm:[border-radius:2rem_0_2rem_0] lg:[border-radius:2.5rem_0_2.5rem_0] overflow-hidden bg-brand-dark-primary shadow-xl transition-all duration-500">

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
                        style={{
                            backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
                            backgroundSize: '24px 24px'
                        }}>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-transparent pointer-events-none" />

                    {/* Centered Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-8 sm:p-12 lg:p-16 min-h-[280px] lg:min-h-[350px]">
                        <h2 className={`font-sans font-bold text-white leading-[1.1] mb-4 max-w-4xl tracking-tight ${mounted && language === 'ta' ? 'text-[clamp(24px,3.5vw,42px)]' : 'text-[clamp(32px,4vw,56px)]'}`}>
                            {/* @ts-ignore */} <T> What should I do Next? </T> </h2>
                        <p className={`text-white/90 font-medium mb-12 max-w-2xl leading-relaxed ${mounted && language === 'ta' ? 'text-[clamp(16px,1.8vw,22px)]' : 'text-[clamp(20px,2vw,28px)]'}`}>
                            {/* @ts-ignore */} <T> Let your strengths answer that </T> </p>
                        <div className="flex justify-center w-full">
                            <Button
                                size="lg"
                                href={getRegisterUrl()}
                                className="!bg-brand-green !text-white hover:!bg-brand-green/90 border-none rounded-full shadow-lg shadow-brand-green/30 hover:scale-105 transition-all duration-300 px-10 py-4 text-lg font-bold"
                            >
                                {/* @ts-ignore */} <T> Take the First Step </T> </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
