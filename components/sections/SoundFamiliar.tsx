"use client";

import React from 'react';
import { MessageSquare, Users, Fingerprint } from 'lucide-react';

const SoundFamiliar: React.FC = () => {
    const statements = [
        {
            text: "So what’s the plan after school?",
            side: "left",
            icon: MessageSquare
        },
        {
            text: "I honestly don’t know. I’m just following what others think is best.",
            side: "right",
            icon: Users
        },
        {
            text: "That’s understandable. But your future shouldn’t be built on someone else’s assumptions. It should start with who you are.",
            side: "left",
            icon: Fingerprint
        }
    ];

    return (
        <section id="sound-familiar" className="relative w-full min-h-screen flex items-center py-24 lg:py-32 bg-white dark:bg-brand-dark-primary overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col justify-center">
                {/* Headline */}
                <div className="mb-20 text-center">
                    <h2 className="text-[clamp(32px,4vw,64px)] font-sans font-extrabold text-brand-dark-primary dark:text-white leading-tight tracking-tight">
                        Sound <span className="text-brand-green italic font-serif decoration-brand-green/30 underline-offset-8">familiar?</span>
                    </h2>
                </div>

                {/* Statements Container */}
                <div className="relative flex flex-col gap-16 lg:gap-24 w-full">
                    {statements.map((item, index) => {
                        const Icon = item.icon;
                        const isRight = item.side === 'right';

                        return (
                            <div
                                key={index}
                                className={`flex flex-col ${isRight ? 'lg:flex-row-reverse self-end text-left lg:text-right' : 'lg:flex-row self-start text-left'} items-start lg:items-center gap-6 lg:gap-10 w-full max-w-3xl lg:max-w-4xl`}
                            >
                                <div className={`flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center ${isRight ? 'bg-brand-green/10 border-brand-green/20 text-brand-green' : 'bg-brand-light-secondary dark:bg-brand-dark-secondary border-gray-200 dark:border-white/10 text-brand-dark-primary dark:text-white/80'} border-2`}>
                                    <Icon className="w-8 h-8 lg:w-10 lg:h-10" />
                                </div>
                                <div className="flex-1">
                                    <p className={`text-[clamp(20px,2.2vw,38px)] font-bold leading-[1.3] text-brand-dark-primary dark:text-white`}>
                                        <span className={`${isRight ? 'text-brand-green' : 'text-brand-green/60'} opacity-75 font-serif mr-2`}>"</span>
                                        {item.text}
                                        <span className={`${isRight ? 'text-brand-green' : 'text-brand-green/60'} opacity-75 font-serif ml-1`}>"</span>
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SoundFamiliar;
