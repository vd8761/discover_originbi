"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import WhyThisMatters from "@/components/sections/WhyThisMatters";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden flex flex-col min-h-screen bg-mesh transition-colors duration-500">
      {/* Background Glows Concept */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-brand-green/15 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[140px]" />
      </div>

      <Header />

      <Hero />
      <Problem />
      <WhyThisMatters />
      <Testimonials />

      <Footer />
    </div>
  );
}
