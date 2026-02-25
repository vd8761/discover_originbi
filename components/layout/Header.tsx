"use client";

import React, { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { LightModeIcon, DarkModeIcon } from "@/components/icons";

interface HeaderProps {
  horizontalPadding?: string;
  showRegisterButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  horizontalPadding = "px-6 lg:px-12 2xl:px-[clamp(24px,8.33vw,160px)]",
  showRegisterButton = true,
}) => {
  const { theme, toggleTheme, isInitialized } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isWhiteHeader = isScrolled && theme === "light";
  const linkColorClass =
    theme === "light"
      ? isScrolled
        ? "text-gray-700 hover:text-brand-green"
        : "text-gray-900 hover:text-brand-green"
      : isScrolled
        ? "text-white hover:text-white/80"
        : "text-white hover:text-white/80";

  const renderThemeToggle = () => {
    if (!isInitialized) return <div className="w-12 lg:w-16 h-7 lg:h-8" />;

    return (
      <button
        onClick={toggleTheme}
        className="relative flex items-center w-12 lg:w-16 h-7 lg:h-8 rounded-full bg-brand-light-tertiary dark:bg-brand-dark-tertiary cursor-pointer border border-[#19211C]/10 dark:border-white/10 shadow-[inset_1px_2px_4px_0px_rgba(25,33,28,0.15)] dark:shadow-[inset_1px_2px_4px_0px_rgba(25,33,28,0.5)] transition-all duration-300"
        aria-label="Toggle theme"
      >
        {/* Background icons */}
        <div className="flex justify-between w-full px-1.5 lg:px-2 text-gray-500 dark:text-gray-400">
          <LightModeIcon className="w-3 lg:w-4 h-3 lg:h-4" />
          <DarkModeIcon className="w-3 lg:w-4 h-3 lg:h-4 text-[#150089] dark:text-gray-400" />
        </div>

        {/* Switch thumb */}
        <div
          className={`absolute top-1 left-1 flex items-center justify-center w-5 lg:w-6 h-5 lg:h-6 bg-brand-green rounded-full transform transition-transform duration-300 ease-in-out ${theme === "dark" ? "translate-x-5 lg:translate-x-8" : "translate-x-0"} shadow-[0_1px_3px_rgba(25,33,28,0.2)] dark:shadow-[0_2px_4px_rgba(25,33,28,0.5)]`}
        >
          <DarkModeIcon
            className={`w-3 lg:w-3.5 h-3 lg:h-3.5 text-white ${theme === "dark" ? "block" : "hidden"}`}
          />
          <LightModeIcon
            className={`w-3.5 lg:w-4 h-3.5 lg:h-4 text-white ${theme === "dark" ? "hidden" : "block"}`}
          />
        </div>
      </button>
    );
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-400 ${isScrolled || isMenuOpen
        ? "bg-white dark:bg-brand-dark-primary py-2.5"
        : "bg-transparent py-4"
        }`}
    >
      <div
        className={`max-w-[1920px] mx-auto flex items-center justify-between ${horizontalPadding}`}
      >
        <div className="flex items-center gap-4 lg:gap-12">
          <a href="/" className="hover:opacity-90 transition-opacity">
            <Logo
              className="h-6 sm:h-7 lg:h-6 w-auto"
              forceWhite={theme === "dark"}
              forceDark={isScrolled || (isMenuOpen && theme === "light")}
            />
          </a>
          <div className="hidden xl:flex items-center gap-8">
            <a
              href="/#product"
              className={`font-sans font-semibold text-[13px] 2xl:text-sm transition-colors uppercase tracking-[0.15em] ${linkColorClass}`}
            >
              The Journey
            </a>
            <a
              href="/#impact"
              className={`font-sans font-semibold text-[13px] 2xl:text-sm transition-colors uppercase tracking-[0.15em] ${linkColorClass}`}
            >
              Why Us?
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-5">
          {/* Desktop Theme Toggle */}
          <div className="hidden xl:block">{renderThemeToggle()}</div>

          <div className="flex items-center gap-2 lg:gap-5">
            {/* Login button - Only visible on desktop (xl and above) */}
            <div className="hidden xl:block">
              <Button
                href="https://mind.originbi.com/student/login"
                variant="outline"
                size="sm"
                className="text-[13px] sm:text-[14px] lg:text-[13px] px-5 sm:px-6 py-2.5 sm:py-3 lg:py-2.5 min-w-[100px] sm:min-w-[120px] lg:min-w-[100px]"
              >
                Login
              </Button>
            </div>
            {showRegisterButton && (
              <Button
                href="/register"
                size="sm"
                className="shadow-lg shadow-brand-green/20 text-[13px] sm:text-[14px] lg:text-[13px] px-5 sm:px-6 py-2.5 sm:py-3 lg:py-2.5 min-w-[100px] sm:min-w-[120px] lg:min-w-[100px] border-none"
              >
                Register now
              </Button>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            className="xl:hidden p-2 -mr-2 text-gray-900 dark:text-white outline-none focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-white dark:bg-brand-dark-primary border-t border-gray-100 dark:border-white/5 shadow-xl py-4 flex flex-col transition-all duration-300 animate-slide-down">
          <div className={`flex flex-col gap-4 ${horizontalPadding}`}>
            <a
              href="/#product"
              onClick={() => setIsMenuOpen(false)}
              className="font-sans font-semibold text-sm uppercase tracking-[0.15em] text-gray-900 transition-colors hover:text-brand-green dark:text-white"
            >
              The Journey
            </a>
            <a
              href="/#impact"
              onClick={() => setIsMenuOpen(false)}
              className="font-sans font-semibold text-sm uppercase tracking-[0.15em] text-gray-900 transition-colors hover:text-brand-green dark:text-white"
            >
              Why Us?
            </a>

            <div className="h-px bg-gray-200 dark:bg-white/10 w-full my-2" />

            <div className="flex items-center justify-between">
              <span className="font-sans font-semibold text-sm uppercase tracking-[0.15em] text-gray-900 dark:text-white">
                Theme
              </span>
              {renderThemeToggle()}
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <Button
                href="https://mind.originbi.com/student/login"
                variant="outline"
                className="w-full justify-center text-sm py-3"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Button>
              {showRegisterButton && (
                <Button
                  href="/register"
                  className="w-full justify-center shadow-lg shadow-brand-green/20 border-none text-sm py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register now
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
