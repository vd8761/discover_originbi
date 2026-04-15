"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import { T, useLanguage } from "@/contexts/LanguageContext";
import { useReferral } from "@/contexts/ReferralContext";

type FAQ = {
    target: "Students" | "Both";
    question: React.ReactNode;
    answer: React.ReactNode;
};

const faqs: FAQ[] = [
    {
        target: "Students",
        question: <>{/* @ts-ignore */} <T> I am already in college. Can this still help me? </T></>,
        answer: <>{/* @ts-ignore */} <T> Yes. This is built for students who want clarity during college. It helps you align strengths with roles, then choose better specializations, projects, and internships. </T></>
    },
    {
        target: "Students",
        question: <>{/* @ts-ignore */} <T> Is this like another exam where marks decide everything? </T></>,
        answer: <>{/* @ts-ignore */} <T> Not at all. There are no pass or fail grades. This assessment helps you understand how you think, decide, and work best. </T></>
    },
    {
        target: "Students",
        question: <>{/* @ts-ignore */} <T> I already picked a major. Is it too late to use this? </T></>,
        answer: <>{/* @ts-ignore */} <T> Not late at all. You can still use your profile to choose the right track, electives, projects, and internship roles within your major. </T></>
    },
    {
        target: "Students",
        question: <>{/* @ts-ignore */} <T> Can this help me choose internships and projects? </T></>,
        answer: <>{/* @ts-ignore */} <T> Yes. Your roadmap links your strengths to practical next steps, so you can choose internships, projects, and certifications that improve role readiness. </T></>
    },
    {
        target: "Both",
        question: <>{/* @ts-ignore */} <T> Can I use this report in resumes and interviews? </T></>,
        answer: <>{/* @ts-ignore */} <T> Absolutely. It gives you a clear way to explain your strengths in resumes, internship interviews, and placement conversations. </T></>
    },
    {
        target: "Both",
        question: <>{/* @ts-ignore */} <T> What if the results suggest a path I never considered? </T></>,
        answer: <>{/* @ts-ignore */} <T> That is often the biggest breakthrough. Many students discover hidden strengths for roles they had never explored before. </T></>
    },
    {
        target: "Both",
        question: <>{/* @ts-ignore */} <T> How long is this roadmap valid? </T></>,
        answer: <>{/* @ts-ignore */} <T> Behavioral patterns stay stable. Your roadmap remains useful through college and your early career transition. </T></>
    }
];

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; toggle: () => void; mounted: boolean; language: string }> = ({ faq, isOpen, toggle, mounted, language }) => {
    return (
        <div className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? 'border-brand-green bg-brand-green/5 dark:bg-brand-green/[0.05] shadow-md' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-dark-primary hover:border-brand-green/30'}`}>
            <button
                onClick={toggle}
                className="w-full text-left px-6 py-5 lg:px-8 lg:py-6 flex items-center justify-between gap-4 focus:outline-none"
            >
                <div className="flex flex-col gap-2 md:gap-3 pr-4">
                    <h3 className={`font-semibold transition-colors duration-300 ${isOpen ? 'text-brand-green' : 'text-brand-dark-primary dark:text-gray-100'} ${mounted && language === 'ta' ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'}`}>
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
                    <p className={`text-gray-600 dark:text-gray-300 leading-relaxed ${mounted && language === 'ta' ? 'text-sm' : 'text-[1.05rem]'}`}>
                        {faq.answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

const FAQSection: React.FC = () => {
    const { language } = useLanguage();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const { getRegisterUrl } = useReferral();
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            id="faq"
            className="relative w-full py-16 lg:py-24 bg-white dark:bg-brand-dark-primary transition-colors duration-300"
        >
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]">

                <div className="text-center mb-12 lg:mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 dark:bg-brand-green/20 text-brand-green font-bold text-xs tracking-widest uppercase mb-6">
                        {/* @ts-ignore */} <T> Support Center </T> </div>
                    <h2 className={`font-sans font-semibold text-brand-dark-primary dark:text-white leading-tight mb-4 transition-colors duration-300 ${mounted && language === 'ta' ? 'text-[clamp(24px,3vw,42px)]' : 'text-[clamp(28px,3.4vw,54px)]'}`}>
                        {/* @ts-ignore */} <T> Frequently Asked </T> <span className="text-brand-green">{/* @ts-ignore */} <T>Questions</T> </span>
                    </h2>
                    <p className={`text-gray-600 dark:text-gray-300 ${mounted && language === 'ta' ? 'text-[clamp(16px,1.3vw,20px)]' : 'text-[clamp(18px,1.5vw,24px)]'}`}>
                        {/* @ts-ignore */} <T> Clear answers for college students </T> </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            toggle={() => setOpenIndex(openIndex === index ? null : index)}
                            mounted={mounted}
                            language={language}
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
                            <h3 className={`font-semibold text-white mb-8 px-4 lg:px-0 leading-relaxed max-w-3xl ${mounted && language === 'ta' ? 'text-base lg:text-xl' : 'text-lg lg:text-3xl'}`}>
                                {/* @ts-ignore */} <T> "In college, the wrong direction costs time, confidence, and opportunities." </T> </h3>
                            <Button
                                href={getRegisterUrl()}
                                className={`inline-block bg-white !text-brand-green hover:bg-brand-dark-green hover:!text-white rounded-full font-bold tracking-wide shadow-lg border-none cursor-pointer ${mounted && language === 'ta' ? 'px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-lg' : 'px-5 py-2.5 lg:px-8 lg:py-3.5 text-sm lg:text-xl'}`}
                            >
                                {/* @ts-ignore */} <T> Invest ₹749 today to make your college years focused and career-ready. </T> </Button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FAQSection;
