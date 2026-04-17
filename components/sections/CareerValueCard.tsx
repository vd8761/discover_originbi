"use client";

import React from "react";
import { CheckIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import { T, useLanguage } from "@/contexts/LanguageContext";
import { useReferral } from "@/contexts/ReferralContext";

const features = [
    {
        title: <>{/* @ts-ignore */} <T> Behavioral Mapping </T></>,
        desc: <>{/* @ts-ignore */} <T> A deep dive into how your brain is naturally wired to work, lead, and solve problems. </T></>,
        icon: "psychology"
    },
    {
        title: <>{/* @ts-ignore */} <T> The Success Blueprint </T></>,
        desc: <>{/* @ts-ignore */} <T> A clear, data-backed plan that shows exactly where they belong in the professional world. </T></>,
        icon: "description"
    },
    {
        title: <>{/* @ts-ignore */} <T> The 10x Advantage </T></>,
        desc: <>{/* @ts-ignore */} <T> Identification of specific job roles where their personality gives them a massive edge over others. </T></>,
        icon: "trending_up"
    },
    {
        title: <>{/* @ts-ignore */} <T> Agile Compatibility </T></>,
        desc: <>{/* @ts-ignore */} <T> A clear understanding of how their natural strengths will adapt to a rapidly changing job market. </T></>,
        icon: "bolt"
    },
    {
        title: <>{/* @ts-ignore */} <T> Future-Sector Alignment </T></>,
        desc: <>{/* @ts-ignore */} <T> A guide to high-growth industries and emerging technologies that match their specific profile. </T></>,
        icon: "explore"
    }
];

const CareerValueCard: React.FC = () => {
    const { language } = useLanguage();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);
    const { getRegisterUrl } = useReferral();
    return (
        <section
            id="career-value-card"
            className="relative z-10 w-full min-h-screen flex items-center py-20 lg:py-32 bg-brand-light-primary dark:bg-brand-dark-primary transition-colors duration-500 overflow-hidden"
        >

            <div className="container mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between">

                    {/* Left side content - Description & List */}
                    <div className="flex-1 w-full order-2 lg:order-1">
                        <div className="mb-12 text-center lg:text-left">
                            <h2 className={`font-sans font-extrabold text-brand-dark-primary dark:text-white leading-[1.1] tracking-tight mb-6 transition-all duration-300 ${mounted && language === 'ta' ? 'text-[clamp(28px,3.5vw,48px)]' : 'text-[clamp(32px,4vw,56px)]'}`}>
                                {/* @ts-ignore */} <T> The </T> <span className="text-brand-green">{/* @ts-ignore */} <T>Career Value Card</T> </span>
                            </h2>
                            <p className={`text-brand-text-light-secondary dark:text-white/70 font-medium max-w-2xl mx-auto lg:mx-0 transition-all duration-300 ${mounted && language === 'ta' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>
                                {/* @ts-ignore */} <T> Everything you need to choose the right college-to-career path for</T> {" "}
                                <span className="text-brand-green font-bold">₹{/* @ts-ignore */}<T>499</T></span>.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex gap-4 md:gap-6 group cursor-default">
                                    <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-2xl bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                        <span className="material-symbols-outlined" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}>
                                            {feature.icon}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-bold text-brand-dark-primary dark:text-white mb-2 leading-tight tracking-tight group-hover:text-brand-green transition-all duration-300 ${mounted && language === 'ta' ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>
                                            {feature.title}
                                        </h3>
                                        <p className={`text-brand-text-light-secondary dark:text-white/70 leading-relaxed font-medium transition-all duration-300 ${mounted && language === 'ta' ? 'text-sm sm:text-base' : 'text-base sm:text-lg'}`}>
                                            {feature.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side content - The Card & Philosophy */}
                    <div className="w-full lg:w-[42%] flex flex-col gap-8 order-1 lg:order-2">
                        {/* Premium Price Card Visual - Primary Green Theme */}
                        <div className="relative rounded-[1.8rem] bg-gradient-to-br from-brand-green via-[#19b359] to-brand-green p-8 lg:p-12 border border-white/20 shadow-xl overflow-hidden group">
                            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

                            {/* Animated reflection effect */}
                            <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 lg:px-4 lg:py-1.5 rounded-full bg-white/20 text-white border border-white/30 text-[9px] lg:text-[10px] font-black tracking-[0.2em] uppercase mb-10 backdrop-blur-md">
                                    {/* @ts-ignore */} <T> Lifetime Value </T> </span>
                                <h3 className={`font-extrabold text-white mb-2 leading-tight tracking-tight transition-all duration-300 ${mounted && language === 'ta' ? 'text-2xl lg:text-3xl' : 'text-3xl lg:text-4xl'}`}>
                                    {/* @ts-ignore */} <T> The Career Value Package </T> </h3>
                                <div className="flex items-baseline gap-2 mb-10">
                                    <span className={`font-black text-white tracking-tighter transition-all duration-300 ${mounted && language === 'ta' ? 'text-4xl lg:text-6xl' : 'text-5xl lg:text-8xl'}`}>₹{/* @ts-ignore */}<T>499</T></span>
                                    <span className="text-white/60 text-base lg:text-lg font-bold">{/* @ts-ignore */} <T>/ one-time</T> </span>
                                </div>

                                <Button
                                    href={getRegisterUrl()}
                                    className="w-full bg-white !text-brand-green hover:bg-brand-dark-green hover:!text-white text-base lg:text-lg font-black py-3.5 lg:py-4.5 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 border-none"
                                >
                                    {/* @ts-ignore */} <T> Get My Career Blueprint </T> </Button>
                            </div>
                        </div>

                        {/* Philosophy Quote - Simple & Elegant */}
                        <div className="relative rounded-[1.8rem] bg-white dark:bg-brand-dark-secondary border border-gray-100 dark:border-white/5 px-8 py-10 lg:p-12 text-center shadow-[0_15px_30px_-10px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)]">
                            <h4 className="text-[11px] font-black tracking-[0.2em] uppercase text-brand-green mb-6">
                                {/* @ts-ignore */} <T> The OriginBI Philosophy </T> </h4>
                            <p className={`leading-snug text-brand-dark-primary dark:text-white font-semibold italic transition-all duration-300 ${mounted && language === 'ta' ? 'text-lg sm:text-xl lg:text-2xl' : 'text-xl sm:text-2xl lg:text-3xl'}`}>
                                {/* @ts-ignore */} <T> "Choose the </T> <span className="not-italic text-brand-green font-extrabold">{/* @ts-ignore */} <T>Role</T> </span> {/* @ts-ignore */} <T> first, then pick the </T> <span className="not-italic text-brand-green font-extrabold">{/* @ts-ignore */} <T>Specialization</T> </span>{/* @ts-ignore */} <T>. Stop investing years in paths that do not fit." </T> </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerValueCard;
