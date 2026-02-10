"use client";

import React from 'react';

const Outcomes: React.FC = () => {
    const outcomes = [
        {
            id: 1,
            title: "Better Communication with Parents",
            desc: "Bridging the gap between generations with shared understanding."
        },
        {
            id: 2,
            title: "Stress-Free Study Habits",
            desc: "Learning strategies that match your natural cognitive style."
        },
        {
            id: 3,
            title: "Confident Career Choices",
            desc: "Choosing paths that energize rather than drain you."
        },
        {
            id: 4,
            title: "Harmonious Friendships",
            desc: "Navigating peer dynamics with empathy and insight."
        }
    ];

    return (
        <section className="py-24 bg-white dark:bg-brand-dark-primary">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
                <div className="mb-16">
                    <h2 className="text-4xl lg:text-5xl font-sans font-light text-[#19211C] dark:text-white mb-6">
                        Outcomes
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl font-light">
                        Origin BI helps people understand themselves and their colleagues so that they can have more respectful, productive and positive working relationships.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {outcomes.map((item) => (
                        <div key={item.id} className="group p-6 rounded-3xl transition-all duration-300 hover:bg-white hover:shadow-xl dark:hover:bg-brand-dark-secondary border border-transparent hover:border-gray-100 dark:hover:border-white/5">
                            <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center text-xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-brand-red/30">
                                {item.id}
                            </div>
                            <h3 className="text-xl font-bold text-[#19211C] dark:text-white mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Outcomes;
