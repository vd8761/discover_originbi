"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Expert {
    id: number;
    name: string;
    role: string;
    organization: string;
    videoUrl: string;
    title: string;
}

const experts: Expert[] = [
    {
        id: 1,
        name: "Dr Shree Pratap",
        role: "Advisory Board Member - OriginBI",
        organization: "Medical Director, Shadithya Psychiatric Hospital, Chennai",
        videoUrl: "https://originbi-my.sharepoint.com/:v:/p/info/IQDSdt-p-3ttRIxd5Y3XNYKiARmGz0l_cGpX7YJx7e8vTAw?e=sCO2jx",
        title: "Dr Shree Pratap - Advisory Board Member",
    },
    {
        id: 2,
        name: "Mr. Bharathiraja Thangappalam",
        role: "Chief Consultant, OriginBI",
        organization: "Expert in Behavioral Analytics & Career Strategy",
        videoUrl: "", // Need video link for Mr. Bharathiraja
        title: "Mr. Bharathiraja Thangappalam - Chief Consultant",
    }
];

const IndustryExperts: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % experts.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + experts.length) % experts.length);
    };

    const currentExpert = experts[currentIndex];

    return (
        <section className="relative z-10 w-full py-16 lg:py-24 bg-gray-50/50 dark:bg-brand-dark-primary/50 transition-colors duration-300">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="text-[clamp(32px,4vw,56px)] font-sans font-extrabold text-brand-dark-primary dark:text-white leading-tight mb-4 transition-colors duration-300">
                        Industry <span className="text-brand-green">Experts</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-brand-text-light-secondary dark:text-white/60 font-medium max-w-3xl mx-auto">
                        Insights from leaders who understand the true value of behavioral mapping in professional success.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto relative group">
                    {/* External Navigation Buttons */}
                    <div className="absolute top-1/2 -left-4 lg:-left-16 -translate-y-1/2 z-20">
                        <button
                            onClick={prevSlide}
                            className="p-3 rounded-full bg-white dark:bg-brand-dark-secondary border border-gray-200 dark:border-white/10 text-brand-dark-primary dark:text-white shadow-lg hover:bg-brand-green hover:text-white dark:hover:bg-brand-green transition-all duration-300 group/btn"
                            aria-label="Previous expert"
                        >
                            <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="absolute top-1/2 -right-4 lg:-right-16 -translate-y-1/2 z-20">
                        <button
                            onClick={nextSlide}
                            className="p-3 rounded-full bg-white dark:bg-brand-dark-secondary border border-gray-200 dark:border-white/10 text-brand-dark-primary dark:text-white shadow-lg hover:bg-brand-green hover:text-white dark:hover:bg-brand-green transition-all duration-300 group/btn"
                            aria-label="Next expert"
                        >
                            <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="bg-white dark:bg-brand-dark-secondary rounded-[2rem] border border-gray-200 dark:border-white/5 shadow-xl overflow-hidden transition-all duration-500">
                        <div className="aspect-video w-full relative bg-gray-900 overflow-hidden">
                            {currentExpert.videoUrl ? (
                                <iframe
                                    key={currentExpert.id}
                                    src={currentExpert.videoUrl}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    allowFullScreen
                                    title={currentExpert.title}
                                    className="absolute inset-0 w-full h-full"
                                ></iframe>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-brand-dark-primary/20">
                                    <div className="w-20 h-20 rounded-full bg-brand-green/20 flex items-center justify-center mb-4">
                                        <span className="material-symbols-outlined text-brand-green animate-pulse" style={{ fontSize: '40px' }}>
                                            play_circle
                                        </span>
                                    </div>
                                    <p className="text-white font-medium text-lg">Video coming soon</p>
                                    <p className="text-white/60 text-sm mt-2">We are uploading the insights for {currentExpert.name}</p>
                                </div>
                            )}
                        </div>

                        <div className="p-6 lg:p-8 text-center relative border-t border-gray-100 dark:border-white/5 bg-white dark:bg-brand-dark-secondary">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-brand-green rounded-full"></div>

                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                                <h3 className="text-xl lg:text-2xl font-bold text-brand-dark-primary dark:text-white mb-1">
                                    {currentExpert.name}
                                </h3>
                                <p className="text-sm lg:text-base text-brand-green font-semibold mb-1">
                                    {currentExpert.role}
                                </p>
                                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 font-medium">
                                    {currentExpert.organization}
                                </p>
                            </div>

                            {/* Indicator Dots */}
                            <div className="flex justify-center gap-2 mt-6">
                                {experts.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "bg-brand-green w-6" : "bg-gray-300 dark:bg-gray-700 hover:bg-brand-green/50"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IndustryExperts;
