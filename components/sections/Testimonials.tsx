"use client";

import React from "react";

interface Testimonial {
    name: string;
    grade: string;
    location: string;
    quote: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Aditi R.",
        grade: "Class 12",
        location: "Chennai",
        quote: "I was confused between engineering and design. My behavioral profile showed I'm a natural creative problem solver — now I'm pursuing UX Design with zero doubts."
    },
    {
        name: "Karthik M.",
        grade: "Class 11",
        location: "Bangalore",
        quote: "My parents wanted me to do medicine, but my report clearly showed I'm built for leadership roles. It helped my whole family align on my future."
    },
    {
        name: "Sneha P.",
        grade: "Class 12",
        location: "Hyderabad",
        quote: "The 14-dimension mapping was eye-opening. I discovered strengths I never knew I had. It gave me the confidence to choose Data Science."
    },
    {
        name: "Rohan V.",
        grade: "Class 11",
        location: "Mumbai",
        quote: "Instead of following the crowd into JEE coaching, I found out I'm a natural strategist. Now I'm focused on business analytics and loving every second."
    },
    {
        name: "Priya S.",
        grade: "Class 12",
        location: "Delhi",
        quote: "Every career counselor just said 'do what you love.' OriginBI actually showed me WHAT I love and WHY — backed by real behavioral data."
    },
    {
        name: "Arjun K.",
        grade: "Class 11",
        location: "Pune",
        quote: "The roadmap didn't just say 'engineering.' It told me exactly which role fits my personality — Systems Architect. That specificity changed everything."
    },
    {
        name: "Meera D.",
        grade: "Class 12",
        location: "Kolkata",
        quote: "I spent a year stressed about stream selection. 60 minutes with OriginBI gave me more clarity than 12 months of anxiety."
    },
    {
        name: "Vikram T.",
        grade: "Class 11",
        location: "Coimbatore",
        quote: "My behavioral DNA report was like reading a manual about myself. Turns out I'm wired for research — something I'd never considered before."
    },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="flex-shrink-0 w-[320px] sm:w-[380px] rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-brand-dark-secondary p-6 sm:p-7 transition-colors duration-300 select-none">
        {/* Quote Icon */}
        <div className="mb-4">
            <svg className="w-7 h-7 text-brand-green opacity-60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
            </svg>
        </div>

        {/* Quote Text */}
        <p className="text-[15px] sm:text-base leading-relaxed text-gray-700 dark:text-gray-300 font-medium mb-6">
            &ldquo;{testimonial.quote}&rdquo;
        </p>

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
    const firstRow = testimonials.slice(0, 4);
    const secondRow = testimonials.slice(4, 8);

    return (
        <section className="relative w-full py-16 lg:py-24 bg-brand-light-secondary dark:bg-brand-dark-primary transition-colors duration-300 overflow-hidden">
            {/* Section Header */}
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] mb-12 lg:mb-16">
                <div className="text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 dark:bg-brand-green/20 text-brand-green font-bold text-xs tracking-widest uppercase mb-6">
                        Student Voices
                    </div>
                    <h2 className="text-[clamp(28px,3.4vw,54px)] font-sans font-semibold text-brand-dark-primary dark:text-white leading-tight mb-4 transition-colors duration-300">
                        What Our <span className="text-brand-green">Students</span> Say
                    </h2>
                    <p className="text-[clamp(16px,1.3vw,22px)] text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Real experiences from students who discovered their perfect career path.
                    </p>
                </div>
            </div>

            {/* Scrolling Row 1 — Left to Right */}
            <div className="testimonial-row mb-6">
                <div className="flex gap-5 testimonial-track testimonial-track-left" style={{ width: 'max-content' }}>
                    {[...firstRow, ...firstRow].map((t, i) => (
                        <TestimonialCard key={`row1-${i}`} testimonial={t} />
                    ))}
                </div>
            </div>

            {/* Scrolling Row 2 — Right to Left */}
            <div className="testimonial-row">
                <div className="flex gap-5 testimonial-track testimonial-track-right" style={{ width: 'max-content' }}>
                    {[...secondRow, ...secondRow].map((t, i) => (
                        <TestimonialCard key={`row2-${i}`} testimonial={t} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
