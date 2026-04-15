"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Languages } from "lucide-react";
import { T, useLanguage } from "@/contexts/LanguageContext";

interface Expert {
    id: number;
    name: string;
    role: string;
    organization: string;
    videoUrl?: string; // Standard or fallback URL
    videoVariants?: {
        english: string;
        tamil: string;
    };
    defaultLanguage?: "english" | "tamil";
    title: string;
}

const experts: Expert[] = [
    {
        id: 1,
        name: "Dr Shree Pratap",
        role: "Advisory Board Member - OriginBI",
        organization: "Medical Director, Shadithya Psychiatric Hospital, Chennai",
        videoUrl: "https://www.youtube.com/embed/m189-McRa2M",
        title: "Dr Shree Pratap - Advisory Board Member",
    },
    {
        id: 2,
        name: "Mr. Bharathiraja Thangappalam",
        role: "Chief Consultant, OriginBI",
        organization: "Expert in Behavioral Analytics & Career Strategy",
        videoVariants: {
            english: "https://www.youtube.com/embed/Z2ZkryASFi0",
            tamil: "https://www.youtube.com/embed/4luQSZLsZUk"
        },
        defaultLanguage: "tamil",
        title: "Mr. Bharathiraja Thangappalam - Chief Consultant",
    }
];

const IndustryExperts: React.FC = () => {
    const { language, t } = useLanguage();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasEnteredView, setHasEnteredView] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<"english" | "tamil">("tamil");
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const currentExpert = experts[currentIndex];

    // Reset language when expert changes based on their default
    useEffect(() => {
        if (currentExpert.defaultLanguage) {
            setSelectedLanguage(currentExpert.defaultLanguage);
        } else {
            setSelectedLanguage("english"); // Default for others
        }
    }, [currentIndex, currentExpert.defaultLanguage]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasEnteredView(true);
                    if (sectionRef.current) observer.unobserve(sectionRef.current);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const triggerAnimation = (callback: () => void) => {
        setIsAnimating(true);
        setTimeout(() => {
            callback();
            setIsAnimating(false);
        }, 300); // Match transition duration
    };

    const nextSlide = () => {
        triggerAnimation(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % experts.length);
        });
    };

    const prevSlide = () => {
        triggerAnimation(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + experts.length) % experts.length);
        });
    };

    // Get the correct video URL based on selection
    const rawVideoUrl = currentExpert.videoVariants
        ? currentExpert.videoVariants[selectedLanguage]
        : currentExpert.videoUrl;

    const videoSrc = rawVideoUrl
        ? `${rawVideoUrl}?autoplay=${hasEnteredView ? 1 : 0}&mute=1&rel=0&playsinline=1&enablejsapi=1`
        : "";

    return (
        <section
            ref={sectionRef}
            className="relative z-10 w-full py-16 lg:py-24 bg-gray-50/50 dark:bg-brand-dark-primary/50 transition-colors duration-300 overflow-hidden"
        >
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className={`font-sans font-extrabold text-brand-dark-primary dark:text-white leading-tight mb-4 ${mounted && language === 'ta' ? 'text-[clamp(24px,3.5vw,42px)]' : 'text-[clamp(32px,4vw,56px)]'}`}>
                        {/* @ts-ignore */} <T> Industry </T> <span className="text-brand-green">{/* @ts-ignore */} <T>Experts</T> </span>
                    </h2>
                    <p className={`font-medium max-w-3xl mx-auto ${mounted && language === 'ta' ? 'text-base text-brand-text-light-secondary dark:text-white/50' : 'text-lg sm:text-xl text-brand-text-light-secondary dark:text-white/60'}`}>
                        {/* @ts-ignore */} <T> Insights from leaders who understand the true value of behavioral mapping in professional success. </T> </p>
                </div>

                <div className="max-w-4xl mx-auto relative group">
                    {/* External Navigation Buttons for Desktop */}
                    <div className="absolute top-1/2 -left-4 lg:-left-20 -translate-y-1/2 z-20 hidden sm:block">
                        <button
                            onClick={prevSlide}
                            className="p-3 lg:p-4 rounded-full bg-brand-green text-white shadow-xl shadow-brand-green/20 hover:scale-110 active:scale-95 transition-all duration-300 group/btn"
                            aria-label="Previous expert"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="absolute top-1/2 -right-4 lg:-right-20 -translate-y-1/2 z-20 hidden sm:block">
                        <button
                            onClick={nextSlide}
                            className="p-3 lg:p-4 rounded-full bg-brand-green text-white shadow-xl shadow-brand-green/20 hover:scale-110 active:scale-95 transition-all duration-300 group/btn"
                            aria-label="Next expert"
                        >
                            <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className={`transition-all duration-500 transform ${isAnimating ? "opacity-0 scale-95 translate-y-4" : "opacity-100 scale-100 translate-y-0"}`}>
                        <div className="bg-white dark:bg-brand-dark-secondary rounded-3xl border border-gray-200 dark:border-white/5 shadow-2xl overflow-hidden transition-all duration-500">
                            <div className="aspect-video md:aspect-[21/9] w-full relative bg-gray-900 overflow-hidden">
                                {rawVideoUrl ? (
                                    <iframe
                                        key={`${currentExpert.id}-${selectedLanguage}-${hasEnteredView}`}
                                        src={videoSrc}
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media; picture-in-picture"
                                        allowFullScreen
                                        title={t(currentExpert.title)}
                                        className="absolute inset-0 w-full h-full"
                                    ></iframe>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-brand-dark-primary/20">
                                        <div className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center mb-4">
                                            <span className="material-symbols-outlined text-brand-green animate-pulse" style={{ fontSize: '40px' }}>
                                                {/* @ts-ignore */} <T> play_circle </T> </span>
                                        </div>
                                        <p className="text-white font-medium text-lg">{/* @ts-ignore */} <T>Video coming soon</T> </p>
                                    </div>
                                )}
                            </div>

                            <div className="p-5 md:p-6 lg:p-8 text-center relative border-t border-gray-100 dark:border-white/5 bg-white dark:bg-brand-dark-secondary min-h-[160px] flex flex-col justify-center pb-20 md:pb-6">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-brand-green rounded-full"></div>

                                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 mb-2 md:mb-0">
                                    <h3 className="text-xl md:text-2xl font-bold text-brand-dark-primary dark:text-white mb-1">
                                        <T>{currentExpert.name}</T>
                                    </h3>
                                    <p className="text-sm md:text-base text-brand-green font-semibold mb-1">
                                        <T>{currentExpert.role}</T>
                                    </p>
                                    <p className="text-[11px] md:text-sm text-gray-600 dark:text-gray-400 font-medium px-2">
                                        <T>{currentExpert.organization}</T>
                                    </p>
                                </div>

                                {/* Language Toggle */}
                                {currentExpert.videoVariants && (
                                    <div className="absolute bottom-12 md:bottom-4 left-1/2 -translate-x-1/2 md:-translate-x-0 md:left-6 p-1 bg-gray-100 dark:bg-brand-dark-primary/50 rounded-lg flex items-center z-10">
                                        <button
                                            onClick={() => setSelectedLanguage("tamil")}
                                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all duration-300 ${selectedLanguage === "tamil" ? "bg-white dark:bg-brand-dark-secondary text-brand-green shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
                                        >
                                            தமிழ்
                                        </button>
                                        <button
                                            onClick={() => setSelectedLanguage("english")}
                                            className={`px-3 py-1 rounded-md text-xs font-bold transition-all duration-300 ${selectedLanguage === "english" ? "bg-white dark:bg-brand-dark-secondary text-brand-green shadow-sm" : "text-gray-500 dark:text-gray-400"}`}
                                        >
                                            {/* @ts-ignore */} <T> English </T> </button>
                                    </div>
                                )}

                                {/* Indicator Dots */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6 flex justify-center gap-2">
                                    {experts.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => triggerAnimation(() => setCurrentIndex(idx))}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "bg-brand-green w-6" : "bg-gray-300 dark:bg-gray-700 hover:bg-brand-green/50"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Buttons for Mobile (Below the Card) */}
                    <div className="flex justify-center items-center gap-6 mt-8 sm:hidden">
                        <button
                            onClick={prevSlide}
                            className="p-3 rounded-full bg-brand-green text-white shadow-lg focus:outline-none hover:scale-105 active:scale-95 transition-all"
                            aria-label="Previous expert"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <span className="text-sm font-semibold text-brand-dark-primary dark:text-white/60">
                            {currentIndex + 1} / {experts.length}
                        </span>

                        <button
                            onClick={nextSlide}
                            className="p-3 rounded-full bg-brand-green text-white shadow-lg focus:outline-none hover:scale-105 active:scale-95 transition-all"
                            aria-label="Next expert"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IndustryExperts;
