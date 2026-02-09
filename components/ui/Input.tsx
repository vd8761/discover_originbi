import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    suffix?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, error, suffix, className = '', ...props }) => {
    const isInvalid = !!error;

    return (
        <div className="w-full space-y-2">
            {label && (
                <label className="block text-[12px] font-bold tracking-[0.05em] text-black dark:text-white ml-1">
                    {label} {props.required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <input
                    className={`bg-white dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-white/5 text-brand-dark-primary dark:text-brand-text-primary placeholder:text-brand-dark-primary/30 dark:placeholder:text-brand-text-secondary/30 font-sans text-[clamp(14px,0.83vw,16px)] rounded-full block w-full px-7 py-[clamp(14px,1vw,18px)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${suffix ? 'pr-14' : ''} ${isInvalid
                        ? "border-red-500 focus:border-red-500 shadow-sm shadow-red-500/10"
                        : "focus:border-brand-green shadow-sm"
                        } ${className}`}
                    {...props}
                />
                {suffix && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center">
                        {suffix}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1.5 ml-1 text-xs font-medium text-red-500 animate-fade-in flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
