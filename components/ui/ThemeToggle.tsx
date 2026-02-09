'use client';

import React from 'react';
import { LightModeIcon, DarkModeIcon } from '../icons';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme, isInitialized } = useTheme();

    if (!isInitialized) return <div className="w-16 h-8" />; // Prevent flash

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center w-16 h-8 rounded-full bg-brand-light-tertiary dark:bg-brand-dark-tertiary cursor-pointer border border-[#19211C]/10 dark:border-white/10 shadow-[inset_1px_2px_4px_0px_rgba(25,33,28,0.15)] dark:shadow-[inset_1px_2px_4px_0px_rgba(25,33,28,0.5)]"
            aria-label="Toggle theme"
        >
            {/* Background icons */}
            <div className="flex justify-between w-full px-2 text-brand-text-light-secondary dark:text-brand-text-secondary transition-colors duration-300">
                <LightModeIcon className="w-4 h-4" />
                <DarkModeIcon className="w-4 h-4" />
            </div>

            {/* Switch thumb */}
            <div
                className={`absolute top-1 left-1 flex items-center justify-center w-6 h-6 bg-brand-green rounded-full transform transition-transform duration-300 ease-in-out will-change-transform ${theme === 'dark' ? 'translate-x-8' : 'translate-x-0'} shadow-[0_1px_3px_rgba(25,33,28,0.2)] dark:shadow-[0_2px_4px_rgba(25,33,28,0.5)]`}
            >
                <DarkModeIcon className="w-3.5 h-3.5 text-white hidden dark:block" />
                <LightModeIcon className="w-4 h-4 text-white block dark:hidden" />
            </div>
        </button>
    );
};

export default ThemeToggle;
