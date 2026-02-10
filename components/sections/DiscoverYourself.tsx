"use client";

import React from 'react';
import Button from "@/components/ui/Button";
import Link from 'next/link';

const DiscoverYourself: React.FC = () => {
    const [videoOpen, setVideoOpen] = React.useState(false);
    const [currentVideoId, setCurrentVideoId] = React.useState("");

    const openVideo = (id: string) => {
        setCurrentVideoId(id);
        setVideoOpen(true);
    };

    const energies = [
        {
            title: "The Science of You",
            icon: "🧬",
            description: "Unlock the data behind your daily decisions."
        },
        {
            title: "Beyond Academics",
            icon: "🌱",
            description: "Success is more than just grades."
        },
        {
            title: "Future Ready",
            icon: "🚀",
            description: "Prepare for careers that don't exist yet."
        },
        {
            title: "Relationship Dynamics",
            icon: "🤝",
            description: "Master the art of connecting with others."
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-brand-dark-secondary relative overflow-hidden transition-colors duration-500">
            {/* Soft Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-50 via-white to-white dark:from-brand-dark-primary dark:via-brand-dark-secondary dark:to-brand-dark-secondary -z-10" />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10 flex flex-col items-center text-center">

                {/* Header */}
                <div className="max-w-3xl mx-auto mb-16 space-y-6">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 dark:bg-brand-green/20 text-brand-green font-bold text-xs tracking-widest uppercase">
                        Self Discovery
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-sans font-medium text-brand-dark-primary dark:text-white leading-[1.1] tracking-tight">
                        Discover your <span className="font-bold text-brand-green">true potential</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                        Curious about what drives you? Take a deeper look.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mb-16">
                    {energies.map((item, index) => (
                        <div key={index} className="relative group p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 bg-white dark:bg-brand-dark-tertiary shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0">{item.icon}</div>
                            <h3 className="text-xl font-bold text-brand-dark-primary dark:text-white mb-2">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col items-center gap-8">
                    <Button href="/register" size="lg" className="!bg-brand-green !text-white hover:!bg-brand-dark-primary transition-all duration-300 shadow-xl shadow-brand-green/30 rounded-full px-12 py-5 text-lg font-bold">
                        Start Assessment
                    </Button>

                    <div className="flex flex-col items-center gap-4">
                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => openVideo('Z2ZkryASFi0')}
                                className="group flex items-center gap-3 bg-white dark:bg-brand-dark-tertiary border border-gray-200 dark:border-gray-700 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md transition-all"
                            >
                                <span className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span className="text-brand-dark-primary dark:text-white font-medium text-sm">Watch (English)</span>
                            </button>

                            <button
                                onClick={() => openVideo('4luQSZLsZUk')}
                                className="group flex items-center gap-3 bg-white dark:bg-brand-dark-tertiary border border-gray-200 dark:border-gray-700 rounded-full px-5 py-2.5 shadow-sm hover:shadow-md transition-all"
                            >
                                <span className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <span className="text-brand-dark-primary dark:text-white font-medium text-sm">Watch (Tamil)</span>
                            </button>
                        </div>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                            Takes less than 90 minutes • Instant results
                        </p>
                    </div>
                </div>

            </div>

            {/* Video Modal */}
            {videoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setVideoOpen(false)}>
                    <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setVideoOpen(false)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default DiscoverYourself;
