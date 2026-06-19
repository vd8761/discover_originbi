"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { T, I18nToggle } from "@/contexts/LanguageContext";
import { useReferral } from "@/contexts/ReferralContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { getRegisterUrl, wrapUrl } = useReferral();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const rowLinks = [
    [
      { label: "Problem", href: "/#problem" },
      { label: "Journey", href: "/#journey" },
    ],
    [
      { label: "Why OriginBi", href: "/#why-originbi" },
      { label: "Experts", href: "/#experts" },
    ],
    [
      { label: "AI Counsellor", href: "/#ai-counsellor" },
      { label: "Career Package", href: "/#career-package" },
    ],
    [
      { label: "Testimonials", href: "/#testimonials" },
      { label: "FAQ", href: "/#faq" },
    ],
  ];

  return (
    <div 
      className={`xl:hidden fixed inset-0 bg-[#19211c] z-[9999] transition-transform duration-500 flex flex-col w-full h-full ${
        isOpen ? "translate-x-0 pointer-events-auto" : "translate-x-full pointer-events-none"
      }`}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
      }}
    >

      {/* Content Scrollable Container */}
      <div className="relative z-10 flex flex-col h-full overflow-y-auto px-6 pt-[76px] pb-6 w-full">
        {/* Quick Links */}
        <div className="mt-4 w-full">
          <span className="text-[#1ed36a] text-[11px] font-sans font-medium tracking-[0.2em] uppercase mb-3 block">
            <T>Quick Links</T>
          </span>
          <div className="flex flex-col w-full">
            {rowLinks.map((row, idx) => (
              <div key={idx} className="grid grid-cols-2 py-3.5 border-b border-white/5 text-[15px] font-sans w-full">
                {row.map((link) => (
                  <a
                    key={link.label}
                    href={wrapUrl(link.href)}
                    onClick={onClose}
                    className="text-white/90 hover:text-[#1ed36a] transition-colors py-1 font-medium block w-full"
                  >
                    <T>{link.label}</T>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-6 w-full">
          <span className="text-[#1ed36a] text-[11px] font-sans font-medium tracking-[0.2em] uppercase mb-3 block">
            <T>Contact</T>
          </span>
          <p className="text-white text-[15px] font-sans font-normal tracking-wide flex items-center mb-2 w-full">
            +91-9985462542 <span className="w-1.5 h-1.5 rounded-full bg-[#1ed36a] mx-2" /> +91-7985424445
          </p>
          <a
            href="mailto:contact@originbi.com"
            className="text-white/90 hover:text-[#1ed36a] transition-colors text-[15px] font-sans font-normal border-b border-white/5 pb-5 block w-full"
          >
            contact@originbi.com
          </a>
        </div>

        {/* Social */}
        <div className="mt-6 w-full">
          <span className="text-[#1ed36a] text-[11px] font-sans font-medium tracking-[0.2em] uppercase mb-4 block">
            <T>Social</T>
          </span>
          <div className="flex items-center gap-3 w-full">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/originbimindworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-[18px] h-[18px] fill-[#19211c]" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/originbimindworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              aria-label="Instagram"
            >
              <svg className="w-[18px] h-[18px] fill-none stroke-[#19211c] stroke-[2.5]" viewBox="0 0 24 24">
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
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              aria-label="YouTube"
            >
              <svg className="w-[18px] h-[18px] fill-[#19211c]" viewBox="0 0 24 24">
                <path d="M23.498 6.163c-.272-1.016-1.074-1.819-2.09-2.09C19.56 3.5 12 3.5 12 3.5s-7.56 0-9.408.573c-1.016.271-1.819 1.074-2.09 2.09C0 8.01 0 12 0 12s0 3.99.573 5.837c.272 1.016 1.074 1.819 2.09 2.09C4.44 20.5 12 20.5 12 20.5s7.56 0 9.408-.573c1.016-.271 1.819-1.074 2.09-2.09C24 15.99 24 12 24 12s0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* X */}
            <a
              href="https://x.com/originbimindwrk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
              aria-label="X"
            >
              <svg className="w-[16px] h-[16px] fill-[#19211c]" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Login & Language Row */}
        <div className="flex items-center justify-between gap-4 mt-8 pb-4 w-full">
          <div className="flex-1 w-full">
            <Button
              href="https://mind.originbi.com/student/login"
              variant="primary"
              noDefaultSize={true}
              className="w-full text-base py-3 rounded-full font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex items-center justify-center h-[46px]"
              onClick={onClose}
            >
              <T>Login</T>
            </Button>
          </div>
          <div className="flex-shrink-0">
            <I18nToggle buttonClassName="h-[46px]" />
          </div>
        </div>

        {/* CTA Full Width Button */}
        <div className="w-full pb-8">
          <Link
            href={getRegisterUrl()}
            onClick={onClose}
            className="w-full bg-[#1ed36a] font-bold text-base pl-6 pr-3 rounded-full flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all h-[56px]"
          >
            <span className="text-white font-bold text-base font-sans"><T>Find My Career Match</T> | ₹999</span>
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 stroke-[#1ed36a] stroke-[2.5] fill-none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
