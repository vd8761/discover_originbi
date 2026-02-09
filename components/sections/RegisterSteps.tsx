"use client";

import React from "react";

const RegisterSteps: React.FC = () => {
    return (
        <section className="w-full bg-white dark:bg-brand-dark-secondary transition-colors duration-500 py-24 lg:py-32 border-y border-brand-dark-primary/5 dark:border-white/5">
            <div className="max-w-[1920px] mx-auto px-4 lg:px-[clamp(24px,8.33vw,160px)]">
                <div className="text-center max-w-[800px] mx-auto mb-20 lg:mb-24">
                    <h2 className="text-[clamp(28px,3vw,48px)] font-bold text-brand-dark-primary dark:text-white mb-6">How it works</h2>
                    <p className="text-[clamp(15px,1vw,18px)] text-brand-text-light-secondary dark:text-brand-text-secondary leading-relaxed">
                        Your journey to career clarity is simple, digital, and designed for results. Follow these six steps to unlock your potential.
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[40px] left-[5%] right-[5%] h-[2px] bg-brand-green/10 dark:bg-white/5 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-green to-transparent opacity-30 animate-pulse" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-y-12 gap-x-8">
                        {[
                            { title: "Fill the Registration Form", desc: "Name, Email, Age, Education, etc.", step: "1" },
                            { title: "Make Payment", desc: "via UPI, Card, or NetBanking", step: "2" },
                            { title: "Receive Confirmation Email", desc: "with WhatsApp number & instructions", step: "3" },
                            { title: "Login and Start Assessment", desc: "Access your dashboard to begin the test", step: "4" },
                            { title: "Finish Test & Receive Report", desc: "Instant digital results", step: "5" },
                            { title: "Choose the right path in your career", desc: "Get expert guidance and clarity", step: "6" },
                        ].map((item, index) => (
                            <div key={index} className="relative group flex flex-col items-center lg:items-center text-center">
                                {/* Circle Indicator */}
                                <div className="relative z-10 w-20 h-20 rounded-full bg-brand-light-primary dark:bg-brand-dark-tertiary flex items-center justify-center border-2 border-brand-green mb-8 transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-green group-hover:shadow-[0_0_30px_rgba(30,211,106,0.3)]">
                                    <span className="text-2xl font-bold text-brand-green group-hover:text-white transition-colors duration-500">{item.step}</span>

                                    {/* Mobile Connector (Below circle) */}
                                    <div className="lg:hidden absolute top-full left-1/2 w-[2px] h-12 bg-brand-green/20 -translate-x-1/2 last:hidden" />
                                </div>

                                <div className="space-y-3 px-2">
                                    <h4 className="text-[15px] lg:text-[16px] font-bold text-black dark:text-white leading-tight tracking-tight group-hover:text-brand-green transition-colors duration-300">
                                        {item.title}
                                    </h4>
                                    <p className="text-[13px] text-brand-text-light-secondary dark:text-brand-text-secondary leading-normal opacity-80">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterSteps;
