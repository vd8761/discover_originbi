"use client";

import Header from "@/components/layout/Header";
import Hero from "@/components/Hero";
import LogoLoop from "@/components/LogoLoop";
import { T } from "@/contexts/LanguageContext";

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
    <div className="min-h-screen bg-[var(--bg-color)] overflow-x-hidden relative">
      <Header showRegisterButton={true} />
      <main>
        <Hero />
        <section className="w-full bg-[#19211c] border-t border-white/5 py-8 relative z-30 overflow-hidden">
          {/* Background Noise Texture */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="relative z-10">
            <div className="max-w-[1920px] mx-auto px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)] mb-3">
              <p className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-medium">
                <T>Our Partners</T>
              </p>
            </div>
            <LogoLoop items={PARTNER_LOGOS} speed={35} direction="left" />
          </div>
        </section>
      </main>
    </div>
  );
}

