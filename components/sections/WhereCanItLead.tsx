"use client";

import React from 'react';

const WhereCanItLead: React.FC = () => {
    const items = [
        "To Top Universities - Aligning strengths with future paths",
        "To Leadership Roles - Understanding how to lead and influence",
        "To Self-Confidence - Owning your unique personality style",
        "To Better Relationships - Connecting with peers and mentors",
        "To Inner Peace - Managing stress and expectations"
    ];

    return (
        <section className="py-24 bg-brand-dark-primary relative overflow-hidden">
            {/* Background Pattern */}
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-dark-primary/50 to-brand-dark-primary" />
            </div>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-start relative z-10 text-white">

                <div className="space-y-6">
                    <h2 className="text-4xl lg:text-5xl font-sans font-light">
                        Where can it <span className="font-bold text-brand-green">lead?</span>
                    </h2>
                    <div className="text-lg text-gray-300 leading-relaxed font-light space-y-6">
                        <p>
                            Everyone receives a unique and in-depth Origin BI Personal Profile, which is the core of a host of different learning experiences - from individual coaching sessions, to e-learning to group workshops.
                        </p>
                        <p>
                            Using the profiles as a springboard, we work with your people, teams and leaders to tackle the challenges that are standing between them and peak performance, such as effective communication, management styles, sales performance and finding an environment that inspires them to do their best work.
                        </p>
                    </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10">
                    <h3 className="text-2xl font-bold mb-8">
                        Key chapters of the Origin BI Personal Profile can include:
                    </h3>
                    <ul className="space-y-6">
                        {items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-4 group cursor-default transition-all duration-300 hover:translate-x-2">
                                <div className="w-6 h-6 mt-1 flex-shrink-0 rounded-full border-2 border-brand-green flex items-center justify-center group-hover:bg-brand-green/20 transition-colors">
                                    <div className="w-2.5 h-2.5 bg-brand-green rounded-full group-hover:scale-125 transition-transform" />
                                </div>
                                <span className="text-lg font-light text-white/90 group-hover:text-white transition-colors">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    );
};

export default WhereCanItLead;
