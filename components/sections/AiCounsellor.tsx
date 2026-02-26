"use client";

import React from "react";
import { T } from "@/contexts/LanguageContext";
import Button from "@/components/ui/Button";

const AiCounsellor: React.FC = () => {
    return (
        <section className="relative z-10 w-full py-16 lg:py-32 bg-white dark:bg-brand-dark-primary transition-colors duration-300 overflow-hidden">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Content Side */}
                    <div className="order-1 lg:order-1 flex flex-col space-y-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 mb-2 w-fit">
                                <span className="material-symbols-outlined text-[14px]">bolt</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    {/* @ts-ignore */} <T>Get Started for Free</T>
                                </span>
                            </div>
                            <h2 className="text-[clamp(36px,4vw,56px)] font-sans font-extrabold text-brand-dark-primary dark:text-white leading-[1.1] transition-colors duration-300">
                                {/* @ts-ignore */} <T>Meet Your Personal</T> <br />
                                <span className="text-brand-green">
                                    {/* @ts-ignore */} <T>AI Counsellor</T>
                                </span>
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300/90 leading-relaxed max-w-xl">
                                {/* @ts-ignore */} <T>Ask personalized questions, make wise choices, and discover who you truly are. Our AI analyzes your unique behavioral data to provide deeply personal guidance on your path forward.</T>
                            </p>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    icon: "psychology",
                                    title: "Discover Who You Are",
                                    desc: "Learn about your natural strengths and behavioral profile.",
                                    color: "text-brand-green",
                                    bg: "bg-brand-green/10",
                                },
                                {
                                    icon: "insights",
                                    title: "Data-Driven Choices",
                                    desc: "Make confident decisions backed by your personalized metrics.",
                                    color: "text-brand-green",
                                    bg: "bg-brand-green/10",
                                },
                                {
                                    icon: "forum",
                                    title: "Always Available",
                                    desc: "Ask anything, anytime. Your counselor is ready to help.",
                                    color: "text-emerald-500",
                                    bg: "bg-emerald-500/10",
                                }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5">
                                    <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center shrink-0 shadow-sm`}>
                                        <span className={`material-symbols-outlined ${item.color}`} style={{ fontSize: "28px" }}>
                                            {item.icon}
                                        </span>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                            {/* @ts-ignore */} <T>{item.title}</T>
                                        </h4>
                                        <p className="text-gray-600 dark:text-gray-400 text-base">
                                            {/* @ts-ignore */} <T>{item.desc}</T>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-2">
                            <Button variant="primary" size="lg" className="group">
                                {/* @ts-ignore */} <T>Start Your Free Session</T>
                                <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1" style={{ fontSize: "20px" }}>
                                    arrow_forward
                                </span>
                            </Button>
                        </div>
                    </div>

                    {/* Visual Side (Mockup Chat) */}
                    <div className="order-2 lg:order-2 relative lg:ml-auto w-full max-w-lg lg:max-w-none">
                        <div className="relative bg-white dark:bg-brand-dark-secondary border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 backdrop-blur-sm">
                            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-brand-dark-tertiary bg-gray-50/80 dark:bg-brand-dark-tertiary/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center shadow-lg">
                                        <span className="material-symbols-outlined text-white" style={{ fontSize: "20px" }}>psychology_alt</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white leading-tight">
                                            {/* @ts-ignore */} <T>OriginBI AI</T>
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs text-brand-green font-medium flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                                                {/* @ts-ignore */} <T>Online</T>
                                            </p>
                                            <span className="text-[9px] bg-brand-green/20 text-brand-green px-1.5 py-0.5 rounded font-black uppercase tracking-wider border border-brand-green/10 leading-none">FREE</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                    <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                </div>
                            </div>

                            <div className="p-5 space-y-4 min-h-[300px] flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent to-gray-50/50 dark:to-transparent">

                                {/* AI Message */}
                                <div className="flex gap-4 max-w-[85%]">
                                    <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 mt-1">
                                        <span className="material-symbols-outlined text-brand-green text-sm">psychology_alt</span>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-brand-dark-tertiary px-5 py-3.5 rounded-2xl rounded-tl-sm text-[15px] text-gray-800 dark:text-gray-200 shadow-sm border border-gray-200/50 dark:border-white/5">
                                        {/* @ts-ignore */} <p><T>Hello! I've finished processing your behavioral assessment. Would you like to know what careers naturally align with your profile?</T></p>
                                    </div>
                                </div>

                                {/* User Message */}
                                <div className="flex gap-4 max-w-[85%] self-end">
                                    <div className="bg-brand-green text-white px-5 py-3.5 rounded-2xl rounded-tr-sm text-[15px] shadow-md shadow-brand-green/20">
                                        {/* @ts-ignore */} <p><T>Yes! What am I naturally good at?</T></p>
                                    </div>
                                </div>

                                {/* AI Message */}
                                <div className="flex gap-4 max-w-[90%]">
                                    <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center shrink-0 mt-1">
                                        <span className="material-symbols-outlined text-brand-green text-sm">psychology_alt</span>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-brand-dark-tertiary px-5 py-4 rounded-2xl rounded-tl-sm text-[15px] text-gray-800 dark:text-gray-200 shadow-sm border border-gray-200/50 dark:border-white/5">
                                        {/* @ts-ignore */} <p className="mb-3"><T>Based on your data, you are a strong</T> <strong className="text-brand-green font-bold">Strategic Thinker</strong>. <T>You excel at complex problem solving.</T></p>

                                        <div className="mt-4 space-y-2.5">
                                            <div className="bg-white dark:bg-brand-dark-secondary p-3 rounded-xl border border-gray-100 dark:border-white/5 flex items-center justify-between shadow-sm transform hover:scale-[1.02] transition-transform cursor-default">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-brand-green text-[18px]">psychology</span>
                                                    </div>
                                                    <span className="text-[12px] font-bold text-gray-700 dark:text-gray-200">Logical Reasoning</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1 w-12 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-brand-green w-[92%]"></div>
                                                    </div>
                                                    <span className="text-[10px] font-black text-brand-green">92%</span>
                                                </div>
                                            </div>

                                            <div className="bg-white dark:bg-brand-dark-secondary p-3 rounded-xl border border-gray-100 dark:border-white/5 flex items-center justify-between shadow-sm transform hover:scale-[1.02] transition-transform cursor-default">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-brand-blue text-[18px]">auto_fix_high</span>
                                                    </div>
                                                    <span className="text-[12px] font-bold text-gray-700 dark:text-gray-200">Strategic Focus</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1 w-12 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-brand-blue w-[85%]"></div>
                                                    </div>
                                                    <span className="text-[10px] font-black text-brand-blue">85%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Chat Input Placeholder */}
                            <div className="px-6 py-3 bg-gray-50 dark:bg-brand-dark-tertiary/50 border-t border-gray-100 dark:border-brand-dark-tertiary">
                                <div className="flex items-center bg-white dark:bg-brand-dark-secondary rounded-full px-4 py-2 border border-gray-200 dark:border-white/10 shadow-sm focus-within:ring-2 focus-within:ring-brand-green/50 transition-all">
                                    <span className="material-symbols-outlined text-gray-400 mr-2" style={{ fontSize: "20px" }}>sentiment_satisfied</span>
                                    <input
                                        type="text"
                                        placeholder="Ask about your ideal career..."
                                        className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 dark:text-gray-300 py-2 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                                        disabled
                                    />
                                    <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center ml-2 shadow-md cursor-pointer hover:scale-105 transition-transform">
                                        <span className="material-symbols-outlined text-white" style={{ fontSize: "16px" }}>send</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default AiCounsellor;
