"use client";
import { I18nToggle } from "@/contexts/LanguageContext";

import React, { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { T, useTranslation } from "@/contexts/LanguageContext";
import { useReferral } from "@/contexts/ReferralContext";
import MobileMenu from "./MobileMenu";

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
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[10000] w-full bg-[var(--bg-color)] py-4 lg:py-6 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className={`max-w-[1920px] mx-auto flex items-center justify-between ${horizontalPadding}`}>
          {/* Left Side: Logo */}
          <div className="flex-shrink-0">
            <a href={wrapUrl("/")} className="hover:opacity-90 transition-opacity">
              <Logo className="h-6 sm:h-7 lg:h-6 w-auto" forceWhite={true} />
            </a>
          </div>

          <div className="hidden xl:flex items-center gap-6 2xl:gap-8 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={wrapUrl(link.href)}
                className="text-xs font-semibold text-white hover:text-[#1ed36a] transition-colors duration-200"
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
              className="xl:hidden relative w-10 h-10 -mr-2 flex items-center justify-center outline-none focus:outline-none cursor-pointer z-[10001]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {/* Custom Closed Icon (menu.svg) */}
              <div className={`absolute transition-all duration-300 transform ${isMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}>
                <img src="/assets/icons/menu.svg" alt="Menu" className="w-[29px] h-[20px]" />
              </div>
              {/* Open Icon (X) */}
              <div className={`absolute flex items-center justify-center transition-all duration-300 transform ${isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}>
                <svg className="w-[26px] h-[26px] text-[#1ed36a]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay Menu Component */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
