'use client';

import React from 'react';
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface HeaderProps {
    horizontalPadding?: string;
}

const Header: React.FC<HeaderProps> = ({
    horizontalPadding = "px-[clamp(24px,8.33vw,160px)]"
}) => {
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
                    <ThemeToggle />
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
