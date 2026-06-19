"use client";

import React from "react";
import { T, useLanguage } from "@/contexts/LanguageContext";
import { useReferral } from "@/contexts/ReferralContext";
import Button from "@/components/ui/Button";
import MovingGradient from "@/components/ui/MovingGradient";

export const FooterTop: React.FC = () => {
  const { getRegisterUrl, wrapUrl } = useReferral();

  const quickLinks = [
    { label: "Problem", href: "/#problem" },
    { label: "Journey", href: "/#journey" },
    { label: "Why OriginBi", href: "/#why-originbi" },
    { label: "Experts", href: "/#experts" },
    { label: "AI Counsellor", href: "/#ai-counsellor" },
    { label: "Career Package", href: "/#career-package" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <div className="w-full py-20 px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)] border-t border-white/5 relative z-20 bg-[#19211c] overflow-hidden">
      {/* Reusable moving gradient line at the boundary */}
      <MovingGradient />

      {/* Background Noise Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 relative z-10">
        
        {/* Left Block: Clarity Starts Here & CTA */}
        <div className="lg:col-span-4 lg:border-r lg:border-white/10 lg:pr-12 flex flex-col justify-start items-start">
          <h3 className="text-white text-3xl md:text-[40px] font-sans font-medium mb-4 tracking-tight leading-tight">
            <T>Clarity Starts Here</T>
          </h3>
          <p className="text-white text-sm md:text-base font-sans font-normal mb-8 max-w-sm leading-relaxed">
            <T>Behavioral intelligence designed to help students make smarter career decisions.</T>
          </p>
          
          {/* Start Assessment CTA using standard Button */}
          <Button
            href={getRegisterUrl()}
            showArrow={true}
            variant="primary"
            noDefaultSize={true}
            className="pl-6 pr-2 py-2 text-sm md:text-base !font-normal"
          >
            <T>Start Assessment</T>
          </Button>
        </div>

        {/* Middle Block: Quick Links */}
        <div className="lg:col-span-5 lg:px-12 flex flex-col">
          <span className="text-[#1ed36a] text-[11px] font-sans font-medium tracking-[0.2em] uppercase mb-6 block">
            <T>Quick Links</T>
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={wrapUrl(link.href)}
                className="rounded-full border border-white px-4 py-2.5 text-white hover:border-[#1ed36a] hover:text-[#1ed36a] text-center text-[12px] font-sans font-normal transition-all whitespace-nowrap block"
              >
                <T>{link.label}</T>
              </a>
            ))}
          </div>
        </div>

        {/* Right Block: Contact & Socials */}
        <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-12 flex flex-col justify-start">
          {/* Contact */}
          <span className="text-[#1ed36a] text-[11px] font-sans font-medium tracking-[0.2em] uppercase mb-4 block">
            <T>Contact</T>
          </span>
          <div className="flex flex-col gap-2.5 mb-6">
            <p className="text-white text-sm font-sans font-normal tracking-wide">
              +91-9985462542 <span className="text-[#1ed36a] mx-1.5">•</span> +91-7985424445
            </p>
            <a 
              href="mailto:contact@originbi.com" 
              className="text-white text-sm font-sans font-normal hover:text-[#1ed36a] transition-colors w-fit border-b border-white/10 pb-6 w-full"
            >
              contact@originbi.com
            </a>
          </div>

          {/* Social */}
          <span className="text-[#1ed36a] text-[11px] font-sans font-medium tracking-[0.2em] uppercase mb-4 block">
            <T>Social</T>
          </span>
          <div className="flex items-center gap-3">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/originbimindworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-[16px] h-[16px] fill-[#19211c]" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/originbimindworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              aria-label="Instagram"
            >
              <svg className="w-[16px] h-[16px] fill-none stroke-[#19211c] stroke-[2.5]" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@OriginBIMindworks"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              aria-label="YouTube"
            >
              <svg className="w-[16px] h-[16px] fill-[#19211c]" viewBox="0 0 24 24">
                <path d="M23.498 6.163c-.272-1.016-1.074-1.819-2.09-2.09C19.56 3.5 12 3.5 12 3.5s-7.56 0-9.408.573c-1.016.271-1.819 1.074-2.09 2.09C0 8.01 0 12 0 12s0 3.99.573 5.837c.272 1.016 1.074 1.819 2.09 2.09C4.44 20.5 12 20.5 12 20.5s7.56 0 9.408-.573c1.016-.271 1.819-1.074 2.09-2.09C24 15.99 24 12 24 12s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com/originbimindwrk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              aria-label="X"
            >
              <svg className="w-[14px] h-[14px] fill-[#19211c]" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export const FooterBottom: React.FC = () => {
  return (
    <div className="w-full bg-[#f4f4f4] py-12 px-6 flex flex-col items-center justify-center lg:sticky lg:bottom-0 z-10 overflow-hidden">
      
      {/* Background Noise Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturation' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' fill='%23E3E4E3'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      {/* Copyright & Links */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[#19211c] text-xs sm:text-sm font-sans font-normal mb-12 tracking-wide text-center">
        <span>© 2026 <T>OriginBI mindworks</T></span>
        <span className="hidden sm:inline w-2.5 h-2.5 rounded-full bg-[#1ed36a]" />
        <a href="#privacy" className="hover:text-[#1ed36a] transition-colors">
          <T>Privacy Policy</T>
        </a>
        <span className="text-[#19211c]/30">|</span>
        <a href="#terms" className="hover:text-[#1ed36a] transition-colors">
          <T>Terms and Conditions</T>
        </a>
      </div>

      {/* Giant Logo (Right Aligned on desktop, centered on mobile) */}
      <div className="w-full max-w-[1920px] px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)] flex justify-center lg:justify-end">
        <img
          src="/footer_logo.svg"
          alt="OriginBI Beyond Intelligence"
          className="w-full max-w-[1200px] md:max-w-[1400px] lg:max-w-[1600px] xl:max-w-[1750px] 2xl:max-w-[1850px] h-auto select-none pointer-events-none"
          draggable={false}
        />
      </div>

    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-transparent relative flex flex-col">
      <FooterTop />
      <FooterBottom />
    </footer>
  );
};

export default Footer;
