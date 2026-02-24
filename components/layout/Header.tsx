'use client';

import React, { useState, useEffect } from 'react';
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { LightModeIcon, DarkModeIcon } from "@/components/icons";

interface HeaderProps {
    horizontalPadding?: string;
    showRegisterButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    horizontalPadding = "px-4 lg:px-[clamp(24px,8.33vw,160px)]",
    showRegisterButton = true
}) => {
    const { theme, toggleTheme, isInitialized } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isWhiteHeader = isScrolled && theme === 'light';
    const linkColorClass = isWhiteHeader
        ? 'text-gray-700 hover:text-brand-green'
        : 'text-white hover:text-white/80';

    const loginButtonClass = isWhiteHeader
        ? 'text-gray-700 border-gray-200 hover:bg-gray-50'
        : 'text-white border-white/40 hover:bg-white/10';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled
            ? 'bg-white dark:bg-brand-dark-primary shadow-[0_8px_32px_rgba(0,0,0,0.1)] py-3 border-b border-gray-100 dark:border-white/5'
            : 'bg-transparent py-4 sm:py-5 lg:py-6'
            }`}>
            <div className={`max-w-[1920px] mx-auto flex items-center justify-between ${horizontalPadding}`}>
                <div className="flex items-center gap-4 lg:gap-12">
                    <a href="/" className="hover:opacity-90 transition-opacity">
                        <Logo
                            className="h-6 sm:h-7 lg:h-6 w-auto"
                            forceWhite={!isScrolled || theme === 'dark'}
                            forceDark={isWhiteHeader}
                        />
                    </a>
                    <div className="hidden xl:flex items-center gap-8">
                        <a href="#problem" className={`font-sans font-semibold text-[11px] 2xl:text-xs transition-colors uppercase tracking-[0.15em] ${linkColorClass}`}>Problem</a>
                        <a href="#why-this-matters" className={`font-sans font-semibold text-[11px] 2xl:text-xs transition-colors uppercase tracking-[0.15em] ${linkColorClass}`}>Why This Matters</a>
                    </div>
                </div>
                <div className="flex items-center gap-3 lg:gap-5">
                    {!isInitialized ? (
                        <div className="w-12 lg:w-16 h-7 lg:h-8" />
                    ) : (
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
                                className={`absolute top-1 left-1 flex items-center justify-center w-5 lg:w-6 h-5 lg:h-6 bg-brand-green rounded-full transform transition-transform duration-300 ease-in-out ${theme === 'dark' ? 'translate-x-5 lg:translate-x-8' : 'translate-x-0'} shadow-[0_1px_3px_rgba(25,33,28,0.2)] dark:shadow-[0_2px_4px_rgba(25,33,28,0.5)]`}
                            >
                                <DarkModeIcon className={`w-3 lg:w-3.5 h-3 lg:h-3.5 text-white ${theme === 'dark' ? 'block' : 'hidden'}`} />
                                <LightModeIcon className={`w-3.5 lg:w-4 h-3.5 lg:h-4 text-white ${theme === 'dark' ? 'hidden' : 'block'}`} />
                            </div>
                        </button>
                    )}
                    <div className="flex items-center gap-2 lg:gap-5">
                        <a href="https://mind.originbi.com/student/login" className={`hidden xl:inline-block font-sans font-bold text-[11px] 2xl:text-xs transition-all uppercase tracking-[0.15em] px-5 py-2.5 rounded-full border ${loginButtonClass}`}>Login</a>
                        {showRegisterButton && (
                            <Button href="/register" size="sm" className="shadow-lg shadow-brand-green/20 text-[12px] sm:text-[13px] lg:text-[11px] px-5 sm:px-6 py-2.5 sm:py-3 lg:py-2.5 min-w-[100px] sm:min-w-[120px] lg:min-w-[100px] !bg-white !text-brand-dark-primary hover:!bg-brand-dark-primary hover:!text-white border-none">
                                Register now
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
