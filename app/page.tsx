"use client";

import Header from "@/components/layout/Header";
import Hero from "@/components/Hero";
import LogoLoop from "@/components/LogoLoop";
import { T } from "@/contexts/LanguageContext";
import SituationSection from "@/components/SituationSection";
import WhyOriginBI from "@/components/WhyOriginBI";
import JourneySection from "@/components/JourneySection";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/layout/Footer";

const PARTNER_LOGOS = [
  { name: "Stanford", imgSrc: "/assets/logos/stanford.svg" },
  { name: "MIT", imgSrc: "/assets/logos/mit.svg" },
  { name: "Harvard", imgSrc: "/assets/logos/harvard.svg" },
  { name: "Oxford", imgSrc: "/assets/logos/oxford.svg" },
  { name: "Cambridge", imgSrc: "/assets/logos/cambridge.svg" },
  { name: "Yale", imgSrc: "/assets/logos/yale.svg" },
  { name: "Duke", imgSrc: "/assets/logos/duke.svg" },
  { name: "IIT", imgSrc: "/assets/logos/iit.svg" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] relative">
      <Header showRegisterButton={true} />
      <main>
        <Hero />
        <section className="w-full bg-[#19211c] border-t border-white/5 pt-10 pb-16 relative z-30 overflow-hidden">
          {/* Background Noise Texture */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 opacity-[0.02] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)] mb-8">
              <p className="text-white text-[18px] tracking-[0.2em] font-medium">
                <T>Our Partners</T>
              </p>
            </div>
            <LogoLoop items={PARTNER_LOGOS} speed={35} direction="left" />
          </div>

          {/* Bottom Gradient Bar (Awwwards Style Aura Glow) */}
          <div className="absolute bottom-0 left-0 right-0 h-[10px] bg-[linear-gradient(to_right,#ED2F34,#EF5921,#FDC00C,#1ED36A)] blur-[10px] opacity-75 animate-aura-pulse pointer-events-none z-20" />
        </section>
        <SituationSection />
        <JourneySection />
        <WhyOriginBI />
        <Testimonials />
        <FAQ />
        <Footer />
      </main>
    </div>
  );
}

