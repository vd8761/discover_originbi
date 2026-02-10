"use client";

import React from 'react';

const WhoIsItFor: React.FC = () => {
    const items = [
        "It's suitable for students who want to understand their learning styles better.",
        "It's great for schools looking to improve student engagement and performance.",
        "Perfect for educators seeking personalized teaching strategies."
    ];

    return (
        <section className="py-24 bg-[#FAFAFA] dark:bg-brand-dark-secondary">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-center">

                <div>
                    <h2 className="text-4xl lg:text-5xl font-sans font-light text-[#19211C] dark:text-white mb-8">
                        Who's it <span className="font-bold">for?</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light mb-8">
                        Our Origin BI product is suitable for all levels and gives learners the foundation of self-awareness they’ll need to be successful at whatever they do; whether that’s developing themselves, working as part of an effective team, or leading others with authenticity.
                    </p>
                </div>

                <div className="space-y-6">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-4 group">
                            <div className="w-6 h-6 mt-1 flex-shrink-0 text-brand-green group-hover:scale-110 transition-transform duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-xl font-medium text-brand-dark-primary dark:text-gray-200">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhoIsItFor;
