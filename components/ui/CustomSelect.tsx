"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '../icons';

interface Option {
    value: string;
    label: string;
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
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
    placeholder = "Select",
    label,
    required,
    className = "",
    buttonClassName = ""
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

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
        <div className={`space-y-2 w-full ${className} ${isOpen ? 'relative z-[60]' : ''}`} ref={containerRef}>
            {label && (
                <label className="block text-[12px] font-bold tracking-[0.05em] text-black dark:text-white ml-1">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full flex items-center justify-between bg-white dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-white/5 rounded-full px-7 py-[clamp(14px,1vw,18px)] text-[clamp(14px,0.83vw,16px)] transition-all duration-200 focus:outline-none shadow-sm ${isOpen ? 'border-brand-green ring-2 ring-brand-green/20' : ''} ${buttonClassName}`}
                >
                    <span className={selectedOption ? "text-brand-dark-primary dark:text-white font-medium" : "text-brand-dark-primary/30 dark:text-brand-text-secondary/30"}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronDownIcon className={`w-5 h-5 text-brand-dark-primary dark:text-white opacity-30 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200 max-h-60 overflow-y-auto custom-scrollbar">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`w-full text-left px-6 py-4 text-[14px] lg:text-[15px] transition-colors font-medium border-b border-brand-light-tertiary/20 dark:border-white/5 last:border-0 ${value === option.value
                                    ? 'bg-brand-green text-white'
                                    : 'text-brand-dark-primary dark:text-brand-text-secondary hover:bg-brand-green/10 dark:hover:bg-brand-green/10 hover:text-brand-green'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                        {options.length === 0 && (
                            <div className="px-6 py-4 text-sm text-brand-text-secondary text-center italic">No options available</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomSelect;
