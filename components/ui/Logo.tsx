'use client';

import React from 'react';

const Logo: React.FC<{ className?: string, forceWhite?: boolean, forceDark?: boolean }> = ({
    className = "h-9",
    forceWhite = false,
    forceDark = false
}) => {
    const showWhite = forceWhite || (!forceDark && typeof window !== 'undefined' && document.documentElement.classList.contains('dark'));

    return (
        <div className="relative flex items-center">
            {/* Dark text logo (for light backgrounds) */}
            <img
                src="/Origin-BI-Logo-01.png"
                alt="OriginBI Logo"
                className={`select-none ${showWhite ? 'hidden' : 'block'} transition-opacity duration-500 ${className}`}
                draggable={false}
            />
            {/* White text logo (for dark/green backgrounds) */}
            <img
                src="/Origin-BI-white-logo.png"
                alt="OriginBI Logo"
                className={`select-none ${showWhite ? 'block' : 'hidden'} transition-opacity duration-500 ${className}`}
                draggable={false}
            />
        </div>
    );
};

export default Logo;
