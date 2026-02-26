"use client";

import React from 'react';
import { T } from "@/contexts/LanguageContext";

const ProgramSteps: React.FC = () => {
    const steps = [
        {
            id: 1,
            title: "Improving team productivity",
            desc: "Used in conjunction with our teamwork programmes, Origin BI tackles collaboration, communication and working relationships."
        },
        {
            id: 2,
            title: "Increasing personal effectiveness",
            desc: "Used as part of a one-to-one coaching programme, Origin BI can help people create a tailor-made development plan."
        },
        {
            id: 3,
            title: "Boosting academic performance",
            desc: "By looking at the effectiveness of your study habits at each stage of the cycle, we create strategies to improve grades and understanding."
        },
        {
            id: 4,
            title: "Introducing a common language",
            desc: "The language of colour spreads quickly throughout schools - it's memorable, simple to understand and means that the learning isn't forgotten."
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-brand-dark-secondary">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
                <div className="mb-20 max-w-4xl">
                    <h2 className="text-4xl lg:text-5xl font-sans font-light text-brand-dark-primary dark:text-white mb-6">
                        {/* @ts-ignore */} <T> Using Origin BI as part of a </T> <span className="font-bold">{/* @ts-ignore */} <T>wider programme</T> </span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
                        {/* @ts-ignore */} <T> Origin BI is at the heart of what we do. By applying the four colour model to a variety of academic challenges, we focus on your most important asset - your students. </T> </p>
                </div>

                <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[28px] left-[30px] right-[30px] h-[2px] bg-gray-200 dark:bg-gray-700 -z-10" />

                    {steps.map((step) => (
                        <div key={step.id} className="relative group bg-white dark:bg-brand-dark-tertiary p-6 rounded-2xl hover:shadow-xl transition-shadow border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                            <div className="w-14 h-14 rounded-full bg-brand-green text-white flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-brand-green/30 relative z-10 mx-auto lg:mx-0">
                                {step.id}
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark-primary dark:text-white mb-4 min-h-[56px] flex items-end text-center lg:text-left">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-[15px] text-center lg:text-left">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProgramSteps;
