import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    const isInvalid = !!error;

    return (
        <div className="w-full">
            {label && (
                <label className="block font-sans text-[clamp(13px,0.9vw,16px)] font-semibold text-brand-text-light-secondary dark:text-white mb-2 ml-1">
                    {label}
                </label>
            )}
            <input
                className={`bg-brand-light-secondary dark:bg-brand-dark-tertiary border text-brand-text-light-primary dark:text-brand-text-primary placeholder:text-brand-text-light-secondary dark:placeholder:text-brand-text-secondary font-sans text-[clamp(14px,0.83vw,16px)] font-normal rounded-full block w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${isInvalid
                        ? "border-red-500 focus:border-red-500"
                        : "border-brand-light-tertiary dark:border-brand-dark-tertiary focus:border-brand-green"
                    } ${className}`}
                style={{ padding: 'clamp(12px,1vw,18px)' }}
                {...props}
            />
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
