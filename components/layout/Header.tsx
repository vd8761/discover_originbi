"use client";
import { I18nToggle } from "@/contexts/LanguageContext";

import React, { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { T, useTranslation } from "@/contexts/LanguageContext";
import { useReferral } from "@/contexts/ReferralContext";

interface HeaderProps {
  horizontalPadding?: string;
  showRegisterButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  horizontalPadding = "px-6 lg:px-10 2xl:px-[clamp(24px,2.5vw,48px)]",
  showRegisterButton = true,
}) => {
  const { getRegisterUrl, wrapUrl } = useReferral();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showRegisterOnScroll, setShowRegisterOnScroll] = useState(false);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return;
      const currentScrollY = window.scrollY;

      // Update register button visibility based on scroll position
      if (currentScrollY > 300) {
        setShowRegisterOnScroll(true);
      } else {
        setShowRegisterOnScroll(false);
      }

      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Problem", href: "#problem" },
    { label: "Journey", href: "#journey" },
    { label: "Why OriginBi", href: "#why-originbi" },
    { label: "Experts", href: "#experts" },
    { label: "AI Counsellor", href: "#ai-counsellor" },
    { label: "Career Package", href: "#career-package" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full bg-[var(--bg-color)] py-4 lg:py-6 transition-all duration-300 ${
      isVisible ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className={`max-w-[1920px] mx-auto flex items-center justify-between ${horizontalPadding}`}>
        {/* Left Side: Logo */}
        <div className="flex-shrink-0">
          <a href={wrapUrl("/")} className="hover:opacity-90 transition-opacity">
            <Logo className="h-6 sm:h-7 lg:h-6 w-auto" forceWhite={true} />
          </a>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden xl:flex items-center gap-6 2xl:gap-8 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold text-white/70 hover:text-[#1ed36a] transition-colors duration-200"
            >
              <T>{link.label}</T>
            </a>
          ))}
        </div>

        {/* Right Side: Actions (Desktop) */}
        <div className="flex items-center gap-3 lg:gap-5">
          {/* Language Selector & buttons */}
          <div className="hidden xl:flex items-center gap-4 lg:gap-5">
            <I18nToggle />
            <Button
              href="https://mind.originbi.com/student/login"
              variant="primary"
              noDefaultSize={true}
              className="text-[13px] px-5 py-2.5 min-w-[85px] hover:scale-105 active:scale-95 transition-transform"
            >
              <T> Login </T>
            </Button>
            {showRegisterButton && (
              <div className={`transition-all duration-500 ease-out origin-right flex items-center ${
                showRegisterOnScroll
                  ? "max-w-[200px] opacity-100 scale-100 ml-0 pointer-events-auto overflow-visible"
                  : "max-w-0 opacity-0 scale-75 -ml-4 lg:-ml-5 pointer-events-none overflow-hidden"
              }`}>
                <Button
                  href={getRegisterUrl()}
                  variant="outline"
                  noDefaultSize={true}
                  className="text-[13px] px-6 py-2.5 min-w-[100px] hover:scale-105 active:scale-95 transition-transform"
                >
                  <T> Register </T>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            className="xl:hidden p-2 -mr-2 text-white outline-none focus:outline-none cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-[#19211c] border-b border-white/10 shadow-2xl py-6 flex flex-col gap-6 animate-slide-down z-50">
          <div className={`flex flex-col gap-4 ${horizontalPadding}`}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-base font-semibold text-white/80 hover:text-[#1ed36a] py-2.5 border-b border-white/5 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <T>{link.label}</T>
              </a>
            ))}

            <div className="flex items-center justify-between pt-4 mt-2">
              <span className="font-sans font-semibold text-sm uppercase tracking-[0.15em] text-white/60">
                <T> Language </T>
              </span>
              <I18nToggle />
            </div>

            <div className="flex flex-col gap-3 mt-6">
              <Button
                href="https://mind.originbi.com/student/login"
                variant="primary"
                noDefaultSize={true}
                className="w-full text-sm py-3.5 rounded-full"
                onClick={() => setIsMenuOpen(false)}
              >
                <T> Login </T>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
