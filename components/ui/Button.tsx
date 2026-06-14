"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

interface BaseButtonProps {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg" | "xl";
    fullWidth?: boolean;
    className?: string;
    children?: React.ReactNode;
    showArrow?: boolean;
    noDefaultSize?: boolean;
}

type ButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
};

type LinkProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
};

const Button: React.FC<ButtonProps | LinkProps> = (props) => {
    const {
        children,
        variant = "primary",
        size = "md",
        fullWidth = false,
        className = "",
        showArrow = false,
        noDefaultSize = false,
        ...rest
    } = props;

    const [mounted, setMounted] = useState(false);
    const circleRef = useRef<HTMLDivElement>(null);
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setMounted(true);
        return () => {
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        };
    }, []);

    const handleMouseEnter = () => {
        if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        if (circleRef.current) {
            gsap.killTweensOf(circleRef.current);
            gsap.fromTo(circleRef.current,
                { top: "100%", width: "150%" },
                { top: "-25%", width: "150%", duration: 0.4, ease: "power3.out" }
            );
        }
    };

    const handleMouseLeave = () => {
        if (circleRef.current) {
            gsap.killTweensOf(circleRef.current);
            gsap.to(circleRef.current, {
                top: "-150%",
                width: "125%",
                duration: 0.35,
                ease: "power3.in",
                onComplete: () => {
                    gsap.set(circleRef.current, { top: "100%", width: "150%" });
                }
            });
        }
    };

    // Color definitions
    // primary: green bg -> dark-gray hover (white text)
    // secondary: dark-gray bg -> green hover (dark-green text)
    // outline: transparent bg, green border -> green hover (white text)
    const baseColors = {
        primary: {
            bg: "bg-brand-green border-brand-green",
            text: "text-white group-hover:text-white",
            hoverBg: "#19211c", // Dark gray bubble color
            circleBg: "bg-white",
            arrowColor: "stroke-[#1ed36a]",
        },
        secondary: {
            bg: "bg-brand-dark-secondary border-[#24272b]",
            text: "text-white group-hover:text-brand-dark-primary",
            hoverBg: "#1ed36a", // Green bubble color
            circleBg: "bg-white",
            arrowColor: "stroke-[#19211c]",
        },
        outline: {
            bg: "bg-transparent border-brand-green",
            text: "text-brand-green group-hover:text-white",
            hoverBg: "#1ed36a", // Green bubble color
            circleBg: "bg-brand-green group-hover:bg-white",
            arrowColor: "stroke-white group-hover:stroke-[#1ed36a]",
        }
    };

    const sizes = {
        sm: "px-4 py-2 text-[clamp(9px,0.7vw,11px)]",
        md: "px-6 py-3 text-[clamp(11px,0.8vw,14px)]",
        lg: "px-8 py-4 text-[clamp(14px,1.1vw,18px)]",
        xl: "px-10 py-5 text-[clamp(16px,1.3vw,22px)]"
    };

    const selectedColors = baseColors[variant] || baseColors.primary;
    const sizeStyle = noDefaultSize ? "" : (sizes[size] || sizes.md);
    const widthStyle = fullWidth ? "w-full" : "w-fit";

    // Composed classes
    const composedClass = `group relative rounded-full overflow-hidden flex items-center ${
        showArrow ? "justify-between gap-[25px] sm:gap-[40px]" : "justify-center"
    } font-sans font-bold leading-none tracking-[0.05em] border-2 cursor-pointer transition-all duration-300 ${selectedColors.bg} ${sizeStyle} ${widthStyle} ${className}`;

    const arrowIcon = showArrow && (
        <div className={`w-[26px] h-[26px] sm:w-[32px] sm:h-[32px] ${selectedColors.circleBg} rounded-full flex items-center justify-center relative z-10 transition-all duration-300 group-hover:scale-110 overflow-hidden`}>
            <div className="relative w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] overflow-hidden flex items-center justify-center">
                {/* Arrow 1: Active, slides out to top-right on hover */}
                <svg className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] transition-transform duration-300 ease-in-out group-hover:translate-x-[150%] group-hover:-translate-y-[150%] absolute" viewBox="0 0 10 10">
                    <path d="M1 9L9 1M9 1H2M9 1V8" className={`${selectedColors.arrowColor} transition-colors duration-300`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                {/* Arrow 2: Hidden at bottom-left, slides in on hover */}
                <svg className="w-[10px] h-[10px] sm:w-[12px] sm:h-[12px] transition-transform duration-300 ease-in-out -translate-x-[150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0 absolute" viewBox="0 0 10 10">
                    <path d="M1 9L9 1M9 1H2M9 1V8" className={`${selectedColors.arrowColor} transition-colors duration-300`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
            </div>
        </div>
    );

    const innerContent = (
        <>
            <span className={`relative z-10 select-none transition-colors duration-300 ${selectedColors.text}`}>
                {children}
            </span>
            {arrowIcon}
            <div
                ref={circleRef}
                style={{ backgroundColor: selectedColors.hoverBg }}
                className="w-full h-[150%] absolute rounded-[50%] top-full left-1/2 -translate-x-1/2 z-0 pointer-events-none"
            />
        </>
    );

    if (props.href !== undefined) {
        const linkProps = props as LinkProps;
        const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
        return (
            <Link 
                href={linkProps.href} 
                className={composedClass}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                {...anchorProps}
            >
                {innerContent}
            </Link>
        );
    }

    const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
    return (
        <button 
            type={buttonProps.type || "button"}
            className={composedClass}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...buttonProps}
        >
            {innerContent}
        </button>
    );
};

export default Button;
