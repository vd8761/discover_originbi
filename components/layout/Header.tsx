'use client';

import React from 'react';
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { useTheme } from "@/contexts/ThemeContext";
import { LightModeIcon, DarkModeIcon } from "@/components/icons";

interface HeaderProps {
    horizontalPadding?: string;
}

const Header: React.FC<HeaderProps> = ({
    horizontalPadding = "px-[clamp(24px,8.33vw,160px)]"
}) => {
    const { theme, toggleTheme, isInitialized } = useTheme();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-xl bg-white/70 dark:bg-brand-dark-primary/70 border-b border-brand-dark-primary/5 dark:border-white/5 transition-all duration-300">
            <div className={`max-w-[1920px] mx-auto flex items-center justify-between ${horizontalPadding} py-4`}>
                <div className="flex items-center gap-12">
                    <Logo className="h-5 lg:h-6 w-auto" />
                    <div className="hidden xl:flex items-center gap-8">
                        <a href="#problem" className="font-sans font-medium text-[11px] 2xl:text-xs text-brand-text-light-primary dark:text-brand-text-primary hover:text-brand-green dark:hover:text-brand-green transition-colors uppercase tracking-wider">Problem</a>
                        <a href="#solution" className="font-sans font-medium text-[11px] 2xl:text-xs text-brand-text-light-primary dark:text-brand-text-primary hover:text-brand-green dark:hover:text-brand-green transition-colors uppercase tracking-wider">Solution</a>
                        <a href="#how-it-works" className="font-sans font-medium text-[11px] 2xl:text-xs text-brand-text-light-primary dark:text-brand-text-primary hover:text-brand-green dark:hover:text-brand-green transition-colors uppercase tracking-wider">How it Works</a>
                        <a href="#why-this-matters" className="font-sans font-medium text-[11px] 2xl:text-xs text-brand-text-light-primary dark:text-brand-text-primary hover:text-brand-green dark:hover:text-brand-green transition-colors uppercase tracking-wider">Why This Matters</a>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    {!isInitialized ? (
                        <div className="w-16 h-8" />
                    ) : (
                        <button
                            onClick={toggleTheme}
                            className="relative flex items-center w-16 h-8 rounded-full bg-brand-light-tertiary dark:bg-brand-dark-tertiary cursor-pointer border border-[#19211C]/10 dark:border-white/10 shadow-[inset_1px_2px_4px_0px_rgba(25,33,28,0.15)] dark:shadow-[inset_1px_2px_4px_0px_rgba(25,33,28,0.5)]"
                            aria-label="Toggle theme"
                        >
                            {/* Background icons */}
                            <div className="flex justify-between w-full px-2 text-gray-500 dark:text-gray-400">
                                <LightModeIcon className="w-4 h-4" />
                                <DarkModeIcon className="w-4 h-4 text-[#150089] dark:text-gray-400" />
                            </div>

                            {/* Switch thumb */}
                            <div
                                className={`absolute top-1 left-1 flex items-center justify-center w-6 h-6 bg-brand-green rounded-full transform transition-transform duration-300 ease-in-out ${theme === 'dark' ? 'translate-x-8' : 'translate-x-0'} shadow-[0_1px_3px_rgba(25,33,28,0.2)] dark:shadow-[0_2px_4px_rgba(25,33,28,0.5)]`}
                            >
                                <DarkModeIcon className={`w-3.5 h-3.5 text-white ${theme === 'dark' ? 'block' : 'hidden'}`} />
                                <LightModeIcon className={`w-4 h-4 text-white ${theme === 'dark' ? 'hidden' : 'block'}`} />
                            </div>
                        </button>
                    )}
                    <div className="flex items-center gap-4">
                        <a href="/login" className="hidden lg:block font-sans font-medium text-[11px] 2xl:text-xs text-brand-text-light-primary dark:text-brand-text-primary hover:text-brand-green dark:hover:text-brand-green transition-colors uppercase tracking-wider mr-2">Login</a>
                        <Button className="px-6 py-2 2xl:px-8 2xl:py-3 text-[10px] 2xl:text-[11px] uppercase tracking-widest shadow-xl shadow-brand-green/20">Register now</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
