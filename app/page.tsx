"use client";

import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const horizontalPadding = "px-[clamp(24px,8.33vw,160px)]";

  return (
    <div className="relative w-full overflow-x-hidden flex flex-col min-h-screen bg-mesh transition-colors duration-500">
      {/* Background Glows Concept */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-green/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[140px]" />
      </div>

      <Header horizontalPadding={horizontalPadding} />

      {/* Hero Section - Full Screen Fold */}
      <main className="relative z-10 w-full flex flex-col items-center justify-center min-h-[calc(100svh-80px)] pt-20">
        <div className="max-w-[1920px] w-full mx-auto flex flex-col items-center flex-1 justify-center py-10 lg:py-12">
          <div className="text-center px-6 max-w-4xl mx-auto animate-fade-in mb-12 lg:mb-16">
            <h1 className="text-[clamp(40px,5.5vw,90px)] font-sans font-bold leading-[1.05] mb-8 tracking-tight text-brand-dark-primary dark:text-white transition-colors duration-300">
              What should I do <span className="text-brand-green">Next?</span>
            </h1>
            <p className="text-[clamp(18px,1.6vw,30px)] text-brand-text-light-secondary dark:text-brand-text-secondary font-sans font-medium mb-12 leading-relaxed max-w-2xl mx-auto transition-colors duration-300">
              Let your strengths answer that. Discover the path that fits you, not what others expect.
            </p>
            <Button className="px-10 py-4 2xl:px-14 2xl:py-6 text-base 2xl:text-xl rounded-2xl shadow-[0_20px_40px_-10px_rgba(30,211,106,0.3)] hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(30,211,106,0.4)] transition-all duration-300">
              Take the First Step
            </Button>
          </div>

          {/* Hero Illustration Container */}
          <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center mt-4">
            <div className="relative z-10 w-full flex justify-center translate-y-6 lg:translate-y-12">
              <img
                src="/images/hero.png"
                alt="Student Illustration"
                className="w-full max-w-[450px] lg:max-w-[600px] 2xl:max-w-[700px] h-auto object-contain mask-gradient select-none pointer-events-none drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Visual Seperator/Glow */}
        <div className="w-full h-16 bg-gradient-to-t from-white/10 dark:from-brand-dark-primary/10 to-transparent pointer-events-none" />
      </main>

      <Footer />
    </div>
  );
}
