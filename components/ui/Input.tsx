import React from 'react';
import { useTranslation } from '@/contexts/LanguageContext';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    suffix?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, error, suffix, className = '', ...props }) => {
    const isInvalid = !!error;
    const { t } = useTranslation();

    return (
        <div className="w-full space-y-2">
            {label && (
                <label className="block text-[12px] font-bold tracking-[0.05em] text-black dark:text-white ml-1">
                    {t(label)} {props.required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <input
                    className={`bg-white dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-white/5 text-brand-dark-primary dark:text-brand-text-primary placeholder:text-brand-dark-primary/30 dark:placeholder:text-brand-text-secondary/30 font-sans text-[clamp(14px,0.83vw,16px)] rounded-full block w-full px-7 py-[clamp(14px,1vw,18px)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green/20 ${suffix ? 'pr-14' : ''} ${isInvalid
                        ? "focus:border-brand-green shadow-sm"
                        : "focus:border-brand-green shadow-sm"
                        } ${className} ${isInvalid ? "border-red-300 ring-1 ring-red-200" : ""}`}
                    {...props}
                    placeholder={props.placeholder ? t(props.placeholder) : undefined}
                />
                {suffix && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center">
                        {suffix}
                    </div>
                )}
            </div>
            {error && (
                <p className="text-red-500 text-xs ml-1 mt-1">{error}</p>
            )}
        </div>
    );
};

export default Input;
