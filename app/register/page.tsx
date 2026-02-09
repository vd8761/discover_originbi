"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";

export default function RegisterPage() {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    email: "",
    mobile: "",
    password: "",
    schoolLevel: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const genderOptions = ["male", "female", "other"];
  const activeIndex = genderOptions.indexOf(formData.gender);

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-brand-dark-primary transition-colors duration-500 font-sans">
      {/* GLOBAL BACKGROUND LAYERS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-brand-green/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal" />
        <div className="absolute bottom-[0%] right-[-5%] w-[35%] h-[35%] bg-emerald-400/5 rounded-full blur-[80px] mix-blend-multiply dark:mix-blend-normal" />
      </div>

      <Header />

      <main className="relative z-10 w-full flex-1">
        {/* Top Section: Form & Visual */}
        <div className="min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center pt-24 lg:pt-32 pb-12">
          <div className="max-w-[1920px] mx-auto px-4 lg:px-[clamp(24px,8.33vw,160px)] grid xl:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-stretch w-full">

            {/* Left Column: Form Section */}
            <div className="flex flex-col relative z-10 min-h-full">
              <div className="text-left w-full mb-8 lg:mb-10">
                <p className="text-[11px] lg:text-[12px] tracking-[0.2em] text-brand-green font-bold mb-3 flex items-center gap-2">
                  Student Registration
                </p>
                <h1 className="font-sans font-semibold text-black dark:text-white tracking-tight leading-[1.1] mb-3 text-[clamp(24px,2.5vw,40px)]">
                  Create your student profile
                </h1>
                <p className="font-sans text-brand-text-light-secondary dark:text-brand-text-secondary font-normal text-[clamp(13px,1vw,16px)] leading-relaxed max-w-[480px]">
                  Join thousands of students discovering their path to success. Fill in the details below to unlock your assessment.
                </p>
              </div>

              <form className="flex flex-col gap-5 lg:gap-6 max-w-[580px]">
                <div className="grid sm:grid-cols-[1.2fr_1fr] gap-5">
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold tracking-widest text-black dark:text-white ml-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="E.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-white/5 text-brand-dark-primary dark:text-brand-text-primary placeholder:text-brand-dark-primary/30 dark:placeholder:text-brand-text-secondary/30 font-sans text-[clamp(14px,0.83vw,16px)] rounded-full block w-full px-7 py-[clamp(14px,1vw,18px)] focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold tracking-widest text-black dark:text-white ml-1">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="relative w-full bg-white dark:bg-brand-dark-tertiary rounded-full p-1.5 border border-brand-light-tertiary dark:border-white/5 h-[clamp(54px,3.5vw,62px)] flex items-center shadow-sm">
                      {/* Sliding Indicator */}
                      <div
                        className="absolute top-1.5 bottom-1.5 bg-brand-green rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-lg shadow-brand-green/20"
                        style={{
                          left: `calc(6px + (${activeIndex} * (100% - 12px) / 3))`,
                          width: `calc((100% - 12px) / 3)`
                        }}
                      />

                      {genderOptions.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, gender: g }))}
                          className={`relative z-10 flex-1 text-[11px] tracking-widest transition-colors duration-300 font-bold ${formData.gender === g ? "text-white" : "text-brand-text-light-secondary dark:text-brand-text-secondary hover:text-black dark:hover:text-white"}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[12px] font-bold tracking-widest text-black dark:text-white ml-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-white dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-white/5 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 font-sans text-[clamp(14px,0.83vw,16px)] rounded-full block w-full px-7 py-[clamp(14px,1vw,18px)] focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all shadow-sm"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold tracking-widest text-black dark:text-white ml-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      placeholder="+91 98765-43210"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="bg-white dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-white/5 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 font-sans text-[clamp(14px,0.83vw,16px)] rounded-full block w-full px-7 py-[clamp(14px,1vw,18px)] focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[12px] font-bold tracking-widest text-black dark:text-white ml-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        placeholder="Minimum 8 characters"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-white dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-white/5 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 font-sans text-[clamp(14px,0.83vw,16px)] rounded-full block w-full px-7 py-[clamp(14px,1vw,18px)] pr-12 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 hover:text-brand-green transition-colors"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[12px] font-bold tracking-widest text-black dark:text-white ml-1">
                    School Level <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="schoolLevel"
                      required
                      value={formData.schoolLevel}
                      onChange={handleChange}
                      className="appearance-none bg-white dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-white/5 text-black dark:text-white font-sans text-[clamp(14px,0.83vw,16px)] rounded-full block w-full px-7 py-[clamp(14px,1vw,18px)] pr-12 focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green transition-all shadow-sm"
                    >
                      <option value="" disabled>Select your current grade</option>
                      <option value="sslc">SSLC (Class 10)</option>
                      <option value="hsc">HSC (Class 12)</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
                      <svg className="w-5 h-5 text-brand-dark-primary dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    fullWidth
                    className="shadow-xl shadow-brand-green/20 h-[clamp(54px,3.5vw,64px)] text-[16px] font-bold tracking-wide"
                  >
                    Proceed to Secure Payment
                  </Button>

                  <p className="text-center font-sans text-[14px] text-brand-text-light-secondary dark:text-brand-text-secondary">
                    Already registered?{" "}
                    <a href="https://mind.originbi.com/student/login" className="text-brand-green font-bold hover:underline underline-offset-4 decoration-2">
                      Log in to your account
                    </a>
                  </p>
                </div>
              </form>
            </div>

            {/* Right Column: Visual Section */}
            <div className="hidden xl:flex flex-col items-stretch justify-stretch h-full">
              <div className="w-full h-full relative rounded-[48px] overflow-hidden flex flex-col items-center justify-center p-12 text-center group">
                {/* Full-bleed Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src="/Slider.png"
                    alt="Student Dashboard"
                    className="absolute inset-0 w-full h-full object-cover object-top select-none pointer-events-none transition-all duration-[3s] group-hover:scale-105"
                  />
                  {/* Darker overlay to ensure card legibility */}
                  <div className="absolute inset-0 bg-brand-dark-primary/10 dark:bg-brand-dark-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-y-12 gap-x-8">
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
      </main>

      <Footer />
    </div>
  );
}




