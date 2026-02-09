import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-sans font-bold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed leading-none uppercase tracking-[0.05em]";

    const variants = {
        primary: "bg-brand-green text-white hover:bg-brand-green/90 shadow-lg shadow-brand-green/20",
        secondary: "bg-brand-dark-secondary text-white hover:bg-brand-dark-tertiary",
        outline: "border-2 border-brand-green text-brand-green hover:bg-brand-green/10"
    };

    const sizes = {
        sm: "px-4 py-2 text-[clamp(9px,0.7vw,11px)]",
        md: "px-6 py-3 text-[clamp(11px,0.8vw,14px)]",
        lg: "px-8 py-4 text-[clamp(14px,1.1vw,18px)]",
        xl: "px-10 py-5 text-[clamp(16px,1.3vw,22px)]"
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
