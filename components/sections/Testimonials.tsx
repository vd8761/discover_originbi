"use client";

import React from "react";
import { QuoteIcon } from "@/components/icons";

type Testimonial = {
    name: string;
    text: string;
};

const rowOne: Testimonial[] = [
    {
        name: "Sangeetha R",
        text: "The report helped me understand my natural strengths clearly. It gave me confidence to choose a direction that fits me instead of following pressure.",
    },
    {
        name: "Srikrishna R",
        text: "I thought being detail-focused was a weakness, but now I know it is one of my biggest strengths in projects and team settings.",
    },
    {
        name: "Mahalakshmi M",
        text: "The session gave me real clarity. I now have a path I can explain to my family and move forward with confidence.",
    },
    {
        name: "Ananya P",
        text: "This assessment made career planning feel practical. I can now connect my interests with options that make sense for my future.",
    },
];

const rowTwo: Testimonial[] = [
    {
        name: "Dilip Kumar S",
        text: "I could finally see where my personality and strengths align. It helped me make better choices for college and internships.",
    },
    {
        name: "Manoj",
        text: "I used to stay quiet in groups. After understanding my profile, I started contributing more and I feel more involved in team work.",
    },
    {
        name: "Dheeraj A P",
        text: "The clarity from this process is useful for both home and school decisions. I now have a focused plan, not confusion.",
    },
    {
        name: "Pavithra N",
        text: "As a parent, this gave us a shared language to support our child without forcing a path based only on marks.",
    },
];

const TestimonialCard: React.FC<Testimonial> = ({ name, text }) => (
    <article className="w-[300px] lg:w-[360px] shrink-0 rounded-2xl border border-brand-light-tertiary dark:border-white/10 bg-brand-light-primary dark:bg-brand-dark-secondary/90 overflow-hidden transition-colors duration-300">
        <div className="py-5 lg:py-6 min-h-[220px]">
            <QuoteIcon className="w-8 h-auto text-brand-green mb-4" />
            <p className="text-sm lg:text-[15px] leading-relaxed text-brand-text-light-primary dark:text-brand-text-primary">
                {text}
            </p>
        </div>
        <div className="border-t border-brand-light-tertiary dark:border-white/10 py-4 text-sm lg:text-base font-semibold text-brand-dark-primary dark:text-white bg-brand-light-secondary/70 dark:bg-brand-dark-primary/40">
            {name}
        </div>
    </article>
);

const TestimonialRow: React.FC<{ items: Testimonial[]; direction: "left" | "right" }> = ({ items, direction }) => {
    const loopItems = [...items, ...items];
    const motionClass = direction === "right" ? "testimonial-track-right" : "testimonial-track-left";

    return (
        <div className="testimonial-row relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 lg:w-14 bg-gradient-to-r from-brand-light-secondary/70 to-transparent dark:from-brand-dark-primary/70 backdrop-blur-[1px]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 lg:w-14 bg-gradient-to-l from-brand-light-secondary/70 to-transparent dark:from-brand-dark-primary/70 backdrop-blur-[1px]" />
            <div className={`testimonial-track ${motionClass} flex w-max gap-4 lg:gap-6 py-2`}>
                {loopItems.map((item, index) => (
                    <TestimonialCard key={`${item.name}-${index}`} name={item.name} text={item.text} />
                ))}
            </div>
        </div>
    );
};

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="relative z-10 w-full py-20 lg:py-28">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">
                <div className="[border-radius:2rem_0_2rem_0] lg:[border-radius:2.8rem_0_2.8rem_0] border border-brand-light-tertiary dark:border-white/10 bg-brand-light-secondary/90 dark:bg-brand-dark-primary/85 p-6 lg:p-10 xl:p-12 transition-colors duration-300">
                    <div className="text-center mb-8 lg:mb-10">
                        <p className="text-xs lg:text-sm font-bold tracking-[0.2em] uppercase text-brand-green mb-3">
                            Testimonials
                        </p>
                        <h2 className="text-[clamp(30px,3.2vw,52px)] font-bold leading-[1.15] text-brand-dark-primary dark:text-white">
                            Words of trust from students
                            <br className="hidden md:block" />
                            and families
                        </h2>
                    </div>

                    <div className="space-y-5 lg:space-y-6">
                        <TestimonialRow items={rowOne} direction="right" />
                        <TestimonialRow items={rowTwo} direction="left" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
