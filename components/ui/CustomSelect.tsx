"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '../icons';
import { T, useTranslation } from "@/contexts/LanguageContext";

interface Option {
    value: string;
    label: string;
    description?: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
    required?: boolean;
    className?: string; // Container class
    buttonClassName?: string; // Button class
    error?: string; // Error message
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select",
    label,
    required,
    className = "",
    buttonClassName = "",
    error
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val: string) => {
        onChange(val);
        setIsOpen(false);
    };

    return (
        <div className={`space-y-2 w-full ${className} ${isOpen ? 'relative z-[500]' : ''}`} ref={containerRef}>
            {label && (
                <label className="block text-[12px] font-bold tracking-[0.05em] text-black dark:text-white ml-1">
                    {t(label)} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex items-center justify-between bg-white dark:bg-brand-dark-tertiary border ${error ? 'border-red-300 ring-1 ring-red-200' : 'border-brand-light-tertiary dark:border-white/5'} rounded-full px-7 py-[clamp(14px,1vw,18px)] text-[clamp(14px,0.83vw,16px)] transition-all duration-200 focus:outline-none shadow-sm ${isOpen ? 'border-brand-green ring-2 ring-brand-green/20' : ''} ${buttonClassName} ${error ? 'border-red-300 ring-1 ring-red-200' : ''}`}
                >
                    <span className={selectedOption ? "text-brand-dark-primary dark:text-white font-medium" : "text-brand-dark-primary/30 dark:text-brand-text-secondary/30"}>
                        {selectedOption ? t(selectedOption.label) : t(placeholder)}
                    </span>
                    <ChevronDownIcon className={`w-5 h-5 text-brand-dark-primary dark:text-white opacity-30 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute top-[calc(100%+8px)] left-0 min-w-full w-max max-w-[calc(100vw-2rem)] md:max-w-[450px] bg-white dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-white/10 rounded-2xl shadow-2xl z-[500] overflow-visible animate-in fade-in zoom-in duration-200 max-h-60 overflow-y-auto custom-scrollbar">
                        {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full text-left px-6 py-4 transition-colors border-b border-brand-light-tertiary/20 dark:border-white/5 last:border-0 flex flex-col gap-0.5 ${value === option.value
                                        ? 'bg-brand-green text-white'
                                        : 'text-brand-dark-primary dark:text-brand-text-secondary hover:bg-brand-green/10 dark:hover:bg-brand-green/10 hover:text-brand-green'
                                        }`}
                                >
                                    <span className="text-[14px] lg:text-[15px] font-bold">{t(option.label)}</span>
                                    {option.description && (
                                        <span className={`text-[11px] leading-tight ${value === option.value ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {t(option.description)}
                                        </span>
                                    )}
                                </button>
                        ))}
                        {options.length === 0 && (
                            <div className="px-6 py-4 text-sm text-brand-text-secondary text-center italic">{/* @ts-ignore */} <T>No options available</T> </div>
                        )}
                    </div>
                )}
            </div>
            {error && <p className="text-red-500 text-xs ml-1 mt-1">{error}</p>}
        </div>
    );
};

export default CustomSelect;
