"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';

const JourneySteps: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

    const steps = [
        {
            step: 1,
            title: "Finding Your Natural Blueprint",
            feeling: "Finally, someone understands how I actually think, not just how many marks I score.",
            whatHappens: (
                <>
                    Your child takes our <span className="text-brand-green font-bold">Proprietary Behavioral Intelligence Assessment</span>. It is not a pass/fail school exam, but a discovery of their natural brain wiring.
                </>
            ),
            result: (
                <>
                    We identify their core strengths and decision-making style, showing you exactly what they are <span className="text-brand-green font-bold">"built"</span> for before you spend a rupee on college fees.
                </>
            ),
        },
        {
            step: 2,
            title: "Connecting the Dots",
            feeling: "Now we see the link between their personality and the right degree.",
            whatHappens: "We take the assessment data and match it against thousands of real-world professional roles and industry requirements.",
            result: (
                <>
                    You see the perfect <span className="text-brand-green font-bold">"fit"</span> between your child's personality and the modern career landscape. We show you the <span className="text-brand-green font-bold">Role</span> they are meant for, which makes choosing the <span className="text-brand-green font-bold">Course</span> easy.
                </>
            ),
        },
        {
            step: 3,
            title: "Following Your Personalized Roadmap",
            feeling: "We finally have a plan we can trust. No more confusion about which college or branch to pick.",
            whatHappens: "We provide a Step-by-Step Action Plan designed specifically for the transition from school to college.",
            result: (
                <>
                    You get a clear list of the degrees and specializations that will lead to long-term success, removing the stress and risk of a <span className="text-brand-green font-bold">"wrong-fit"</span> choice.
                </>
            ),
        }
    ];

    const handleScroll = useCallback(() => {
        if (!sectionRef.current) return;
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const sectionHeight = sectionRef.current.offsetHeight;
        const viewportH = window.innerHeight;

        // Overall progress through the section (0 to 1)
        const totalScroll = sectionHeight - viewportH;
        if (totalScroll <= 0) return;

        const scrolled = -sectionRect.top;
        const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
        setScrollProgress(progress);

        // Determine active step based on pure scroll progress
        // 0.0 - 0.33 -> Step 1
        // 0.33 - 0.66 -> Step 2
        // 0.66 - 1.0 -> Step 3 (stays active & pinned until the very end)
        let newActive = 0;
        if (progress < 0.33) {
            newActive = 0;
        } else if (progress < 0.66) {
            newActive = 1;
        } else {
            newActive = 2; // Step 3
        }

        setActiveStep(newActive);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // Calculate progress line height based on scrollProgress
    const getLineProgress = () => {
        // Map scroll progress tightly to the line height.
        // It should reach 100% exactly when Step 3 is fully engaged at 0.66 progress.
        const progressScale = Math.min(1, scrollProgress / 0.66);
        return progressScale * 100;
    };

    return (
        <section
            id="journey"
            ref={sectionRef}
            className="relative w-full bg-brand-light-primary dark:bg-brand-dark-primary transition-colors duration-500"
        >
            {/* MOBILE LAYOUT */}
            <div className="lg:hidden py-16 px-6">
                {/* Mobile Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-[clamp(28px,6vw,42px)] font-sans font-extrabold text-brand-dark-primary dark:text-white leading-[1.1] tracking-tight mb-4">
                        Your Journey to <br />
                        <span className="text-brand-green">Career Certainty</span>
                    </h2>
                    <p className="text-base text-brand-text-light-secondary dark:text-white/60 font-medium">
                        3 Simple Steps to Stop Guessing and Start Growing
                    </p>
                </div>

                {/* Mobile Steps */}
                <div className="flex flex-col gap-10">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative">
                            {/* Step Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-brand-green text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                                    {step.step}
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-green block">Step {step.step}</span>
                                    <h3 className="text-xl font-extrabold text-brand-dark-primary dark:text-white leading-tight">{step.title}</h3>
                                </div>
                            </div>

                            {/* Card */}
                            <div className="rounded-2xl bg-white dark:bg-brand-dark-secondary border border-gray-100 dark:border-white/5 p-6 shadow-sm">
                                {/* Quote */}
                                <p className="text-lg italic text-brand-dark-primary dark:text-white/90 font-medium leading-relaxed mb-6 pl-4 border-l-[3px] border-brand-green">
                                    &ldquo;{step.feeling}&rdquo;
                                </p>

                                {/* What Happens + Result */}
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <h5 className="text-[10px] font-black uppercase tracking-[0.15em] text-brand-green mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-brand-green" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>psychology</span>
                                            What Happens
                                        </h5>
                                        <p className="text-sm text-brand-text-light-secondary dark:text-white/70 leading-relaxed font-medium">{step.whatHappens}</p>
                                    </div>
                                    <div className="w-full h-px bg-gray-200 dark:bg-white/10"></div>
                                    <div>
                                        <h5 className="text-[10px] font-black uppercase tracking-[0.15em] text-brand-green mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-brand-green" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>insights</span>
                                            The Result
                                        </h5>
                                        <p className="text-sm text-brand-text-light-secondary dark:text-white/70 leading-relaxed font-medium">{step.result}</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                                    <span className="text-xs font-bold text-brand-text-light-secondary dark:text-white/40 tracking-wide">Step {step.step} of 3</span>
                                    <div className="w-24 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                                        <div className="h-full rounded-full bg-brand-green transition-all" style={{ width: `${(step.step / 3) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Callout */}
                <div className="mt-16 rounded-2xl bg-brand-light-secondary dark:bg-brand-dark-secondary p-8 border border-brand-green/10 dark:border-white/5">
                    <div className="flex items-start gap-4 mb-4">
                        <span className="material-symbols-outlined text-brand-green flex-shrink-0" style={{ fontSize: '2rem', fontVariationSettings: "'FILL' 1" }}>science</span>
                        <h3 className="text-xl font-extrabold text-brand-dark-primary dark:text-white">
                            Why <span className="text-brand-green">Behavioral Intelligence</span>?
                        </h3>
                    </div>
                    <p className="text-sm text-brand-text-light-secondary dark:text-white/70 leading-relaxed font-medium mb-4">
                        Traditional counseling asks a student what they <span className="text-brand-green font-bold">LIKE</span>. We show you what they are <span className="text-brand-green font-bold">BUILT</span> for.
                    </p>
                    <div className="inline-block bg-brand-green/10 px-4 py-2 rounded-full">
                        <p className="text-sm font-bold text-brand-dark-primary dark:text-white">
                            Interest is temporary; <span className="text-brand-green">potential is permanent</span>.
                        </p>
                    </div>
                </div>
            </div>


            {/* DESKTOP LAYOUT — Scrollytelling */}
            <div className="hidden lg:block" style={{ minHeight: `${(steps.length + 1) * 100}vh` }}>
                <div className="sticky top-0 h-screen flex items-stretch overflow-hidden">
                    <div className="w-full flex px-[clamp(24px,6vw,120px)]">

                        {/* ─── LEFT COLUMN: Sticky Sidebar ─── */}
                        <div className="w-[42%] flex flex-col justify-center pr-16 relative">
                            {/* Header */}
                            <div className="mb-16">
                                <h2 className="text-[clamp(36px,4vw,56px)] font-sans font-extrabold text-brand-dark-primary dark:text-white leading-[1.05] tracking-tight mb-5">
                                    Your Journey to <br />
                                    <span className="text-brand-green">Career Certainty</span>
                                </h2>
                                <p className="text-lg text-brand-text-light-secondary dark:text-white/60 font-medium">
                                    3 Simple Steps to Stop Guessing and Start Growing
                                </p>
                            </div>

                            {/* Step Tracker with Connector Line */}
                            <div className="relative flex flex-col gap-0">
                                {/* Background Line */}
                                <div className="absolute left-[11px] top-[12px] bottom-[12px] w-[2px] bg-gray-200 dark:bg-white/10 z-0"></div>
                                {/* Active Progress Line */}
                                <div
                                    className="absolute left-[11px] top-[12px] w-[2px] bg-brand-green z-[1] transition-all duration-700 ease-out"
                                    style={{ height: `${getLineProgress()}%` }}
                                ></div>

                                {steps.map((step, idx) => {
                                    const isActive = activeStep === idx;
                                    const isPast = activeStep > idx;
                                    return (
                                        <div key={idx} className="relative z-[2] flex items-start gap-5 py-5">
                                            {/* Dot */}
                                            <div className={`relative flex-shrink-0 w-6 h-6 rounded-full border-[3px] transition-all duration-500 mt-0.5 ${isActive
                                                ? 'bg-brand-green border-brand-green shadow-[0_0_0_6px_rgba(35,197,94,0.2)]'
                                                : isPast
                                                    ? 'bg-brand-green border-brand-green'
                                                    : 'bg-white dark:bg-brand-dark-primary border-gray-300 dark:border-white/20'
                                                }`}></div>

                                            {/* Text */}
                                            <div className={`transition-all duration-500 ${isActive ? 'opacity-100' : isPast ? 'opacity-50' : 'opacity-30'}`}>
                                                <span className={`text-[11px] font-bold tracking-[0.2em] uppercase block mb-1 transition-colors duration-500 ${isActive ? 'text-brand-green' : 'text-gray-400 dark:text-white/30'}`}>
                                                    Step {step.step}
                                                </span>
                                                <h4 className={`font-extrabold leading-tight tracking-tight transition-all duration-500 ${isActive ? 'text-2xl text-brand-dark-primary dark:text-white' : 'text-lg text-gray-400 dark:text-white/40'}`}>
                                                    {step.title}
                                                </h4>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* ─── RIGHT COLUMN: Morphing Card Area ─── */}
                        <div className="w-[58%] relative flex items-center justify-center">
                            {/* Section acts purely on math progression, eliminating DOM collision issues. */}

                            {/* The single static morphing card */}
                            <div className="w-full max-w-2xl rounded-[2rem] bg-white dark:bg-brand-dark-secondary border border-gray-100 dark:border-white/8 shadow-[0px_20px_40px_-10px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.4)] p-10 relative overflow-hidden flex flex-col min-h-[500px]">
                                {/* Ambient corner glow */}
                                <div className="absolute -top-20 -right-20 w-56 h-56 bg-brand-green/8 rounded-full blur-[60px] pointer-events-none"></div>

                                {/* Content Grid (allows stacking without fixed height constraints) */}
                                <div className="grid grid-cols-1 grid-rows-1 flex-1 relative mt-2">
                                    {steps.map((step, idx) => (
                                        <div
                                            key={idx}
                                            className={`col-start-1 row-start-1 flex flex-col h-full transition-all duration-700 ease-in-out ${activeStep === idx
                                                ? 'opacity-100 translate-y-0 pointer-events-auto z-10'
                                                : activeStep > idx
                                                    ? 'opacity-0 -translate-y-8 pointer-events-none z-0'
                                                    : 'opacity-0 translate-y-8 pointer-events-none z-0'
                                                }`}
                                        >
                                            {/* Quote */}
                                            <div className="relative mb-8 shrink-0">
                                                <span className="material-symbols-outlined absolute -top-5 -left-3 text-brand-green/15 select-none pointer-events-none" style={{ fontSize: '4rem' }}>format_quote</span>
                                                <p className="relative z-10 text-[19px] sm:text-[21px] italic text-brand-dark-primary dark:text-white font-medium leading-[1.5] pl-6 border-l-[3px] border-brand-green">
                                                    &ldquo;{step.feeling}&rdquo;
                                                </p>
                                            </div>

                                            {/* Content Columns inside the card */}
                                            <div className="flex-1 grid grid-cols-2 gap-8 bg-gray-50/80 dark:bg-white/[0.03] rounded-2xl p-8 border border-gray-100/50 dark:border-white/5">
                                                <div>
                                                    <h5 className="text-[10px] font-black uppercase tracking-[0.15em] text-brand-green mb-3 flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-brand-green" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>psychology</span>
                                                        What Happens
                                                    </h5>
                                                    <p className="text-[15px] sm:text-base text-brand-text-light-secondary dark:text-white/70 leading-relaxed font-medium">
                                                        {step.whatHappens}
                                                    </p>
                                                </div>

                                                {/* Vertical Divider */}
                                                <div className="relative">
                                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-white/10"></div>
                                                    <div className="pl-8">
                                                        <h5 className="text-[10px] font-black uppercase tracking-[0.15em] text-brand-green mb-3 flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-brand-green" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 1" }}>insights</span>
                                                            The Result
                                                        </h5>
                                                        <p className="text-[15px] sm:text-base text-brand-text-light-secondary dark:text-white/70 leading-relaxed font-medium">
                                                            {step.result}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Shared Progress Bar at bottom */}
                                <div className="mt-8 pt-5 border-t border-gray-100 dark:border-white/5 flex items-center justify-between shrink-0">
                                    <span className="text-xs font-bold text-brand-text-light-secondary dark:text-white/40 tracking-wide uppercase">
                                        Step {activeStep + 1} of {steps.length}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {steps.map((_, dotIdx) => (
                                            <div
                                                key={dotIdx}
                                                className={`rounded-full transition-all duration-500 ${dotIdx <= activeStep ? 'bg-brand-green' : 'bg-gray-200 dark:bg-white/10'} ${dotIdx === activeStep ? 'w-8 h-2' : 'w-2 h-2'}`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* WHY SCIENCE CALLOUT — Outside the sticky container */}
            <div className="hidden lg:block w-full py-20 lg:py-28">
                <div className="container mx-auto px-6 lg:px-[clamp(24px,6vw,120px)]">
                    <div className="max-w-5xl mx-auto rounded-[2rem] bg-brand-light-secondary dark:bg-brand-dark-secondary p-10 sm:p-14 lg:p-16 border border-brand-green/10 dark:border-white/5 transition-colors">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-14">
                            <div className="flex-shrink-0 w-20 h-20 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                                <span className="material-symbols-outlined" style={{ fontSize: '2.5rem', fontVariationSettings: "'FILL' 1" }}>science</span>
                            </div>
                            <div className="flex-1 lg:border-l border-gray-200 dark:border-white/10 lg:pl-14">
                                <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-dark-primary dark:text-white mb-4 tracking-tight">
                                    Why <span className="text-brand-green">Behavioral Intelligence</span>?
                                </h3>
                                <p className="text-base sm:text-lg text-brand-text-light-secondary dark:text-white/70 leading-relaxed font-medium mb-6">
                                    Traditional counseling asks a student what they <span className="text-brand-green font-bold">LIKE</span> (which changes every year). We show you what they are <span className="text-brand-green font-bold">BUILT</span> for (which is their lifelong advantage).
                                </p>
                                <div className="inline-block bg-brand-green/10 dark:bg-brand-green/15 px-6 py-3 rounded-full">
                                    <p className="text-lg sm:text-xl font-bold text-brand-dark-primary dark:text-white tracking-tight">
                                        Interest is temporary; <span className="text-brand-green">potential is permanent</span>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JourneySteps;
