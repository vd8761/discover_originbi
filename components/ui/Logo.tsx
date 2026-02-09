'use client';

import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "h-9" }) => {
    return (
        <div className="relative flex items-center">
            <img
                src="/Origin-BI-Logo-01.png"
                alt="OriginBI Logo"
                className={`select-none dark:hidden block transition-opacity duration-500 ${className}`}
                draggable={false}
            />
            <img
                src="/Origin-BI-white-logo.png"
                alt="OriginBI Logo"
                className={`select-none hidden dark:block transition-opacity duration-500 ${className}`}
                draggable={false}
            />
        </div>
    );
};

export default Logo;
