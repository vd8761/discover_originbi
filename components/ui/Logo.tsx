'use client';

import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Logo: React.FC<{ className?: string, forceWhite?: boolean, forceDark?: boolean }> = ({
    className = "h-9",
    forceWhite = false,
    forceDark = false
}) => {
    const { theme, isInitialized } = useTheme();
    const showWhite = forceWhite || (!forceDark && isInitialized && theme === 'dark');

    const outlineStyle = {};

    return (
        <div className="relative flex items-center">
            {/* Primary Blue Logo */}
            <img
                src="/Origin-BI-Logo-01.png"
                alt="OriginBI Logo"
                className={`select-none ${showWhite ? 'hidden' : 'block'} transition-opacity duration-500 ${className}`}
                style={outlineStyle}
                draggable={false}
            />
            {/* White variant only for dark mode if strictly needed, but defaulted to blue */}
            <img
                src="/Origin-BI-white-logo.png"
                alt="OriginBI Logo"
                className={`select-none ${showWhite ? 'block' : 'hidden'} transition-opacity duration-500 ${className}`}
                style={outlineStyle}
                draggable={false}
            />
        </div>
    );
};

export default Logo;
