"use client";

import React from "react";
import { T } from "@/contexts/LanguageContext";

const RegisterSteps: React.FC = () => {
    const steps = [
        { title: "Fill the Registration Form", desc: "Name, Email, Age, Education, etc." },
        { title: "Make Payment", desc: "via UPI, Card, or NetBanking" },
        { title: "Receive Confirmation Email", desc: "with instructions" },
        { title: "Login and Start Assessment", desc: "Access your dashboard to begin the test" },
        { title: "Finish Test & Receive Report", desc: "Instant digital results" },
        { title: "Choose the right path in your career", desc: "Get expert guidance and clarity" },
    ];

    return (
        <section className="py-20 bg-white dark:bg-brand-dark-primary relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-[1440px] mx-auto px-6 relative z-10 text-center">
                <h2 className="text-3xl lg:text-4xl font-sans font-bold text-brand-dark-primary dark:text-white mb-4">
                    {/* @ts-ignore */} <T> How it works </T> </h2>
                <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg font-light">
                    {/* @ts-ignore */} <T> Your journey to career clarity is simple, digital, and designed for results. Follow these six steps to unlock your potential. </T> </p>

                <div className="flex flex-wrap justify-center gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-[2px] bg-brand-green/20 -z-10" />

                    {steps.map((step, index) => (
                        <div key={index} className="flex-1 min-w-[150px] max-w-[200px] flex flex-col items-center group relative">
                            <div className="w-20 h-20 bg-brand-green lg:bg-white lg:dark:bg-brand-dark-secondary border-2 border-brand-green rounded-full flex items-center justify-center text-2xl font-bold text-white lg:text-brand-green mb-6 z-10 transition-all duration-300 group-hover:scale-110 shadow-lg shadow-brand-green/20 group-hover:bg-brand-green group-hover:text-white">
                                {index + 1}
                            </div>
                            <h3 className="text-lg font-bold text-brand-dark-primary dark:text-white mb-2 leading-tight min-h-[44px]">
                                {step.title}
                            </h3>
                            <p className="text-brand-text-light-secondary dark:text-brand-text-secondary text-sm">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RegisterSteps;
