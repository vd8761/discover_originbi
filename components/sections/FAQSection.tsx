"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import Button from "@/components/ui/Button";

type FAQ = {
    target: "Parents" | "Students" | "Both";
    question: string;
    answer: string;
};

const faqs: FAQ[] = [
    {
        target: "Parents",
        question: "My child is already focused on NEET/JEE. Why do we need this?",
        answer: "Competitive exams are about getting in; Behavioral Mapping is about getting out with a successful career. Even with a top degree, if the professional \"Role\" doesn't match their personality, they will face burnout. We ensure the goal they are working for is actually the right one for their DNA."
    },
    {
        target: "Students",
        question: "Is this going to be like another school exam where I'm judged on marks?",
        answer: "Not at all. There are no \"pass\" or \"fail\" grades here. This is a discovery of how your brain naturally likes to solve problems and lead. It is the one test where the only right answer is the one that describes the real you."
    },
    {
        target: "Parents",
        question: "Is this just another counseling session that suggests Engineering or Medicine?",
        answer: "No. We go much deeper. We don't just say \"Engineering\"—we identify if they are a Natural Researcher, a Project Leader, or a Technical Specialist. We provide specific role fitment so you can choose the right specialization from day one."
    },
    {
        target: "Students",
        question: "My parents want me to do one thing, but I’m not sure. Will this help?",
        answer: "Yes. Instead of an argument, we provide data. Showing your parents your 10x Advantage helps them understand your natural strengths. It turns a \"What I want\" conversation into a \"What I'm built for\" strategy."
    },
    {
        target: "Both",
        question: "Can we use this report for college applications or interviews?",
        answer: "Absolutely. The Behavioral Profile gives a student a clear, professional way to explain their strengths during admissions and interviews, making them stand out from thousands of other applicants."
    },
    {
        target: "Both",
        question: "What if the results suggest a path we haven't considered?",
        answer: "This is the most valuable part. Many families find the student has a \"hidden\" edge in high-growth, emerging sectors. We show you the data so you can make a safe, informed decision together."
    },
    {
        target: "Both",
        question: "How long is this roadmap valid?",
        answer: "Behavioral DNA stays consistent. The Success Blueprint we provide serves as a foundational roadmap for the next 4–5 years of college and their eventual entry into the professional world."
    }
];

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; toggle: () => void }> = ({ faq, isOpen, toggle }) => {
    return (
        <div className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'border-brand-green bg-brand-green/5 dark:bg-brand-green/[0.05] shadow-md' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-dark-primary hover:border-brand-green/30'}`}>
            <button
                onClick={toggle}
                className="w-full text-left px-6 py-5 lg:px-8 lg:py-6 flex items-center justify-between gap-4 focus:outline-none"
            >
                <div className="flex flex-col gap-2 md:gap-3 pr-4">
                    <h3 className={`text-lg lg:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-brand-green' : 'text-brand-dark-primary dark:text-gray-100'}`}>
                        {faq.question}
                    </h3>
                </div>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-brand-green text-white rotate-180' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'}`}>
                    <ChevronDownIcon className="w-5 h-5" />
                </div>
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6 lg:pb-8' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden px-6 lg:px-8">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[1.05rem]">
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            id="faq"
            className="relative w-full py-16 lg:py-24 bg-white dark:bg-brand-dark-primary transition-colors duration-300"
        >
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">

                <div className="text-center mb-12 lg:mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 dark:bg-brand-green/20 text-brand-green font-bold text-xs tracking-widest uppercase mb-6">
                        Support Center
                    </div>
                    <h2 className="text-[clamp(28px,3.4vw,54px)] font-sans font-semibold text-brand-dark-primary dark:text-white leading-tight mb-4 transition-colors duration-300">
                        Frequently Asked <span className="text-brand-green">Questions</span>
                    </h2>
                    <p className="text-[clamp(18px,1.5vw,24px)] text-gray-600 dark:text-gray-300">
                        Clearing the Path for Students & Parents
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            toggle={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>

                <div className="mt-16 lg:mt-24 text-center max-w-4xl mx-auto">
                    <div className="relative [border-radius:1.8rem_0_1.8rem_0] bg-brand-green shadow-2xl overflow-hidden px-6 py-12 lg:px-14 lg:py-16">

                        {/* Background Elements */}
                        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

                        {/* Quote Symbols */}
                        <img
                            src="/quote-symbol.svg"
                            alt=""
                            aria-hidden="true"
                            className="absolute top-4 left-4 lg:top-8 lg:left-8 w-8 lg:w-12 h-auto opacity-70 pointer-events-none select-none brightness-0 invert"
                        />
                        <img
                            src="/quote-symbol.svg"
                            alt=""
                            aria-hidden="true"
                            className="absolute bottom-4 right-6 lg:bottom-8 lg:right-10 w-8 lg:w-12 h-auto rotate-180 opacity-70 pointer-events-none select-none brightness-0 invert"
                        />

                        <div className="relative z-10 flex flex-col items-center">
                            <h3 className="text-lg lg:text-3xl font-semibold text-white mb-8 px-4 lg:px-0 leading-relaxed max-w-3xl">
                                "At +2, a wrong choice isn't just a loss of time; it's a loss of confidence."
                            </h3>
                            <Button
                                href="/register"
                                className="inline-block bg-white !text-brand-green hover:bg-brand-dark-green hover:!text-white px-5 py-2.5 lg:px-8 lg:py-3.5 rounded-full text-sm lg:text-xl font-bold tracking-wide shadow-lg border-none cursor-pointer"
                            >
                                Spend ₹749 today to ensure they walk into college with a clear purpose.
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
