"use client";

import React from "react";
import { T, useLanguage } from "@/contexts/LanguageContext";

interface Testimonial {
    name: string;
    grade: string;
    location: string;
    quote: React.ReactNode;
}

const testimonials: Testimonial[] = [
    {
        name: "Aditi R.",
        grade: "B.Des - 2nd Year",
        location: "Chennai",
        quote: <>{/* @ts-ignore */} <T> I was confused between UX design and product roles. My profile showed I am a natural creative systems thinker, and now I have a clear direction. </T></>
    },
    {
        name: "Karthik M.",
        grade: "B.E. Mechanical - 3rd Year",
        location: "Bangalore",
        quote: <>{/* @ts-ignore */} <T> I did not know whether to stay in core engineering or switch tracks. The report showed strong leadership and operations fit, and my decisions became easier. </T></>
    },
    {
        name: "Sneha P.",
        grade: "B.Sc Data Science - 1st Year",
        location: "Hyderabad",
        quote: <>{/* @ts-ignore */} <T> The 14-dimension mapping was eye-opening. I discovered strengths I had never articulated, and it gave me confidence in my data science path. </T></>
    },
    {
        name: "Rohan V.",
        grade: "BBA - 2nd Year",
        location: "Mumbai",
        quote: <>{/* @ts-ignore */} <T> I was drifting through college without direction. I found I am a natural strategist, and now I am focused on business analytics with intent. </T></>
    },
    {
        name: "Priya S.",
        grade: "B.Tech IT - 4th Year",
        location: "Delhi",
        quote: <>{/* @ts-ignore */} <T> Generic advice said "follow your passion." OriginBI showed me what actually fits me and why, backed by behavioral data. </T></>
    },
    {
        name: "Arjun K.",
        grade: "B.Com - 3rd Year",
        location: "Pune",
        quote: <>{/* @ts-ignore */} <T> The roadmap did not give broad labels. It gave role-level clarity, and that changed how I prepared for internships. </T></>
    },
    {
        name: "Meera D.",
        grade: "Integrated MBA - 1st Year",
        location: "Kolkata",
        quote: <>{/* @ts-ignore */} <T> I spent months overthinking specialization choices. One session gave me more clarity than a year of anxiety. </T></>
    },
    {
        name: "Vikram T.",
        grade: "B.Tech CSE - 2nd Year",
        location: "Coimbatore",
        quote: <>{/* @ts-ignore */} <T> My behavioral profile felt like reading a manual about myself. It revealed a research orientation I had never considered seriously. </T></>
    },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; onClick: () => void; mounted: boolean; language: string }> = ({ testimonial, onClick, mounted, language }) => (
    <div
        onClick={onClick}
        className="flex-shrink-0 w-[320px] sm:w-[380px] rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-dark-secondary p-6 sm:p-7 transition-all duration-300 select-none cursor-pointer hover:border-brand-green/30 hover:shadow-lg"
    >
        {/* Quote Icon */}
        <div className="mb-4">
            <svg
                width="32"
                height="21"
                viewBox="0 0 59 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-brand-green opacity-80"
            >
                <path d="M45.8674 37.1955C53.102 37.1955 58.9998 31.2388 58.9998 23.9255C58.9998 18.9517 56.3065 14.489 52.0404 12.2086C52.2566 9.88875 53.2199 4.95426 57.1715 3.873C58.1151 3.61743 58.7245 2.7131 58.6066 1.7498C58.4886 0.786491 57.7023 0.0394363 56.7193 0.0197754H56.4244C54.4978 0.0197754 43.9211 0.452282 37.0796 9.63318C32.6366 15.59 31.3195 22.0579 33.3444 27.7591C35.0351 33.4013 40.0679 37.1955 45.8674 37.1955Z" fill="currentColor" />
                <path d="M0.926245 27.7395C2.61695 33.3818 7.64973 37.176 13.4492 37.176C20.6839 37.176 26.5817 31.2192 26.5817 23.906C26.5817 18.9322 23.8883 14.4695 19.6223 12.189C19.8385 9.86922 20.8018 4.93473 24.7533 3.85347C25.697 3.5979 26.3064 2.69357 26.1885 1.73027C26.0705 0.76696 25.2841 0.0199051 24.3012 0.000244141H24.0063C22.0797 0.000244141 11.503 0.432751 4.66152 9.61365C0.218513 15.5704 -1.09867 22.0383 0.926245 27.7395Z" fill="currentColor" />
            </svg>
        </div>

        {/* Quote Text */}
        <p className="text-[15px] sm:text-base leading-relaxed text-gray-700 dark:text-gray-300 font-medium mb-6 line-clamp-4">
            {/* @ts-ignore */} <T> &ldquo;</T> {testimonial.quote}{/* @ts-ignore */} <T>&rdquo; </T> </p>

        {/* Student Info */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
            <div className="w-10 h-10 rounded-full bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center">
                <span className="text-brand-green font-bold text-sm">{testimonial.name.charAt(0)}</span>
            </div>
            <div>
                <p className="font-semibold text-sm text-brand-dark-primary dark:text-white">{testimonial.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.grade} • {testimonial.location}</p>
            </div>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
    const { language } = useLanguage();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);
    const [selectedTestimonial, setSelectedTestimonial] = React.useState<Testimonial | null>(null);
    const firstRow = testimonials.slice(0, 4);
    const secondRow = testimonials.slice(4, 8);

    const closeModal = () => setSelectedTestimonial(null);

    // Prevent scrolling when modal is open
    React.useEffect(() => {
        if (selectedTestimonial) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedTestimonial]);

    return (
        <section className="relative w-full py-16 lg:py-24 bg-brand-light-secondary dark:bg-brand-dark-primary transition-colors duration-300 overflow-hidden">
            {/* Section Header */}
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] mb-12 lg:mb-16">
                <div className="text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 dark:bg-brand-green/20 text-brand-green font-bold text-xs tracking-widest uppercase mb-6">
                        {/* @ts-ignore */} <T> Student Voices </T> </div>
                    <h2 className={`font-sans font-semibold text-brand-dark-primary dark:text-white leading-tight mb-4 transition-colors duration-300 ${mounted && language === 'ta' ? 'text-[clamp(24px,3vw,42px)]' : 'text-[clamp(28px,3.4vw,54px)]'}`}>
                        {/* @ts-ignore */} <T> What Our </T> <span className="text-brand-green">{/* @ts-ignore */} <T>Students</T> </span> {/* @ts-ignore */} <T> Say </T> </h2>
                    <p className={`max-w-2xl mx-auto ${mounted && language === 'ta' ? 'text-[clamp(14px,1.2vw,18px)] text-gray-600 dark:text-gray-300/80' : 'text-[clamp(16px,1.3vw,22px)] text-gray-600 dark:text-gray-300'}`}>
                        {/* @ts-ignore */} <T> Real experiences from students who found clarity in majors and careers. </T> </p>
                </div>
            </div>

            {/* Testimonial Rows Container with Edge Blurs */}
            <div className="relative">
                {/* Edge Blur Overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-40 z-10 pointer-events-none bg-gradient-to-r from-brand-light-secondary dark:from-brand-dark-primary to-transparent" />
                <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-40 z-10 pointer-events-none bg-gradient-to-l from-brand-light-secondary dark:from-brand-dark-primary to-transparent" />

                {/* Scrolling Row 1 — Left to Right */}
                <div className="testimonial-row mb-6">
                    <div
                        className="flex gap-5 testimonial-track testimonial-track-left"
                        style={{
                            width: 'max-content',
                            animationPlayState: selectedTestimonial ? 'paused' : 'running'
                        }}
                    >
                        {[...firstRow, ...firstRow].map((t, i) => (
                            <TestimonialCard
                                key={`row1-${i}`}
                                testimonial={t}
                                onClick={() => setSelectedTestimonial(t)}
                                mounted={mounted}
                                language={language}
                            />
                        ))}
                    </div>
                </div>

                {/* Scrolling Row 2 — Right to Left */}
                <div className="testimonial-row">
                    <div
                        className="flex gap-5 testimonial-track testimonial-track-right"
                        style={{
                            width: 'max-content',
                            animationPlayState: selectedTestimonial ? 'paused' : 'running'
                        }}
                    >
                        {[...secondRow, ...secondRow].map((t, i) => (
                            <TestimonialCard
                                key={`row2-${i}`}
                                testimonial={t}
                                onClick={() => setSelectedTestimonial(t)}
                                mounted={mounted}
                                language={language}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Popup */}
            {selectedTestimonial && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
                    onClick={closeModal}
                >
                    <div className="absolute inset-0 bg-brand-dark-primary/60 backdrop-blur-sm transition-opacity" />

                    <div
                        className="relative w-full max-w-2xl bg-white dark:bg-brand-dark-secondary rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:text-brand-green transition-colors z-10"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="p-8 sm:p-12">
                            <div className="mb-8">
                                <svg
                                    width="48"
                                    height="31"
                                    viewBox="0 0 59 38"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-brand-green mb-6 opacity-80"
                                >
                                    <path d="M45.8674 37.1955C53.102 37.1955 58.9998 31.2388 58.9998 23.9255C58.9998 18.9517 56.3065 14.489 52.0404 12.2086C52.2566 9.88875 53.2199 4.95426 57.1715 3.873C58.1151 3.61743 58.7245 2.7131 58.6066 1.7498C58.4886 0.786491 57.7023 0.0394363 56.7193 0.0197754H56.4244C54.4978 0.0197754 43.9211 0.452282 37.0796 9.63318C32.6366 15.59 31.3195 22.0579 33.3444 27.7591C35.0351 33.4013 40.0679 37.1955 45.8674 37.1955Z" fill="currentColor" />
                                    <path d="M0.926245 27.7395C2.61695 33.3818 7.64973 37.176 13.4492 37.176C20.6839 37.176 26.5817 31.2192 26.5817 23.906C26.5817 18.9322 23.8883 14.4695 19.6223 12.189C19.8385 9.86922 20.8018 4.93473 24.7533 3.85347C25.697 3.5979 26.3064 2.69357 26.1885 1.73027C26.0705 0.76696 25.2841 0.0199051 24.3012 0.000244141H24.0063C22.0797 0.000244141 11.503 0.432751 4.66152 9.61365C0.218513 15.5704 -1.09867 22.0383 0.926245 27.7395Z" fill="currentColor" />
                                </svg>
                                <p className={`leading-relaxed text-brand-dark-primary dark:text-white font-semibold italic ${mounted && language === 'ta' ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>
                                    {/* @ts-ignore */} <T> &ldquo;</T> {selectedTestimonial.quote}{/* @ts-ignore */} <T>&rdquo; </T> </p>
                            </div>

                            <div className="flex items-center gap-4 pt-8 border-t border-gray-100 dark:border-white/5">
                                <div className="w-14 h-14 rounded-full bg-brand-green/10 dark:bg-brand-green/20 flex items-center justify-center">
                                    <span className="text-brand-green font-bold text-xl">{selectedTestimonial.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <p className="font-extrabold text-lg text-brand-dark-primary dark:text-white">{selectedTestimonial.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-brand-green font-bold tracking-wider uppercase">{selectedTestimonial.grade} • {selectedTestimonial.location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Testimonials;
