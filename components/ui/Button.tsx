import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-sans font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed leading-none";

    const variants = {
        primary: "bg-brand-green text-white hover:bg-brand-green/90 shadow-lg shadow-brand-green/20",
        secondary: "bg-brand-dark-secondary text-white hover:bg-brand-dark-tertiary",
        outline: "border-2 border-brand-green text-brand-green hover:bg-brand-green/10"
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
            style={{
                paddingTop: 'clamp(12px, 1vw, 18px)',
                paddingBottom: 'clamp(12px, 1vw, 18px)',
                paddingLeft: 'clamp(24px, 2vw, 40px)',
                paddingRight: 'clamp(24px, 2vw, 40px)'
            }}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
