'use client';

import React from 'react';

const Logo: React.FC<{ className?: string, forceWhite?: boolean, forceDark?: boolean }> = ({
    className = "h-9",
    forceWhite = false,
    forceDark = false
}) => {
    const showWhite = forceWhite || (!forceDark && typeof window !== 'undefined' && document.documentElement.classList.contains('dark'));

    const outlineStyle = showWhite
        ? { filter: 'drop-shadow(1px 1px 0px rgba(255,255,255,0.1) drop-shadow(-1px -1px 0px rgba(255,255,255,0.)) drop-shadow(1px -1px 0px rgba(255,255,255,0.1)) drop-shadow(-1px 1px 0px rgba(255,255,255,0.1))' }
        : { filter: 'drop-shadow(1px 1px 0px rgba(0,0,0,0.1)) drop-shadow(-1px -1px 0px rgba(0,0,0,0.1)) drop-shadow(1px -1px 0px rgba(0,0,0,0.1)) drop-shadow(-1px 1px 0px rgba(0,0,0,0.1))' };

    return (
        <div className="relative flex items-center">
            {/* Dark text logo (for light backgrounds) */}
            <img
                src="/Origin-BI-Logo-01.png"
                alt="OriginBI Logo"
                className={`select-none ${showWhite ? 'hidden' : 'block'} transition-opacity duration-500 ${className}`}
                style={outlineStyle}
                draggable={false}
            />
            {/* White text logo (for dark/green backgrounds) */}
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
