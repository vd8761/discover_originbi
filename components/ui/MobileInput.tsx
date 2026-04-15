"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import ReactCountryFlag from "react-country-flag";
import { ChevronDownIcon } from '../icons';
import { COUNTRY_CODES } from '../../lib/countryCodes';
import { T, useTranslation } from "@/contexts/LanguageContext";

interface MobileInputProps {
    countryCode: string;
    phoneNumber: string;
    onCountryChange: (code: string) => void;
    onPhoneChange: (number: string) => void;
    error?: string;
    label?: string;
    required?: boolean;
    className?: string; // Input class override
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const MobileInput: React.FC<MobileInputProps> = ({
    countryCode,
    phoneNumber,
    onCountryChange,
    onPhoneChange,
    error,
    label,
    required,
    className = "",
    onBlur,
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    const selectedCountry =
        COUNTRY_CODES.find((c) => c.dial_code === countryCode) ||
        COUNTRY_CODES.find((c) => c.code === "IN") ||
        COUNTRY_CODES[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isDropdownOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        } else {
            setSearchTerm("");
        }
    }, [isDropdownOpen]);

    const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        const max = selectedCountry.maxLength || 10;
        if (val.length <= max) {
            onPhoneChange(val);
        }
    };

    const filteredCountries = useMemo(() => {
        const lowerSearch = searchTerm.toLowerCase();
        return COUNTRY_CODES.filter(
            (country) =>
                country.name.toLowerCase().includes(lowerSearch) ||
                country.dial_code.includes(lowerSearch) ||
                country.code.toLowerCase().includes(lowerSearch)
        );
    }, [searchTerm]);

    const maxLen = selectedCountry.maxLength || 10;

    return (
        <div className={`space-y-2 w-full ${isDropdownOpen ? "relative z-50" : "relative z-0"}`}>
            {label && (
                <label className="block text-[12px] font-bold tracking-[0.05em] text-black dark:text-white ml-1">
                    {t(label)} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <div className="flex gap-2 h-12">
                {/* Country Dropdown */}
                <div className="relative w-[100px] shrink-0 h-full" ref={dropdownRef}>
                    <button
                        type="button"
                        onClick={() => setIsDropdownOpen((p) => !p)}
                        className={`w-full h-full flex items-center justify-between bg-white dark:bg-brand-dark-tertiary border ${error ? 'border-red-300 ring-1 ring-red-200' : 'border-brand-light-tertiary dark:border-white/5'} rounded-full px-4 text-sm text-brand-dark-primary dark:text-white transition-all shadow-sm hover:border-brand-green/50 ${className} ${error ? 'border-red-300 ring-1 ring-red-200' : ''}`}
                    >
                        <span className="flex items-center gap-1.5 truncate">
                            <ReactCountryFlag
                                countryCode={selectedCountry.code}
                                svg
                                style={{
                                    width: "20px",
                                    height: "14px",
                                    borderRadius: "2px",
                                    objectFit: "cover",
                                }}
                            />
                            <span className="text-brand-dark-primary/60 dark:text-brand-text-secondary/70 font-medium text-[11px]">
                                {selectedCountry.dial_code}
                            </span>
                        </span>
                        <ChevronDownIcon className={`w-3.5 h-3.5 text-brand-dark-primary/30 dark:text-white/30 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-[calc(100%+8px)] left-0 w-72 bg-white dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-64 animate-in fade-in zoom-in duration-200">
                            <div className="p-3 border-b border-brand-light-tertiary/20 dark:border-white/5 sticky top-0 bg-white dark:bg-brand-dark-tertiary z-10">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search country..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-brand-light-secondary dark:bg-brand-dark-primary text-brand-dark-primary dark:text-white text-xs rounded-lg px-3 py-2 focus:outline-none border border-transparent focus:border-brand-green/30 placeholder-brand-dark-primary/30 dark:placeholder-brand-text-secondary/30"
                                />
                            </div>

                            <div className="overflow-y-auto custom-scrollbar flex-1">
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((country) => (
                                        <button
                                            key={`${country.code}-${country.dial_code}`}
                                            type="button"
                                            onClick={() => {
                                                onCountryChange(country.dial_code);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-5 py-3 text-sm flex items-center gap-3 hover:bg-brand-green/10 transition-colors ${countryCode === country.dial_code ? "bg-brand-green text-white" : "text-brand-dark-primary dark:text-brand-text-secondary"}`}
                                        >
                                            <ReactCountryFlag
                                                countryCode={country.code}
                                                svg
                                                style={{ width: '20px', height: '14px', borderRadius: '2px', objectFit: 'cover' }}
                                            />
                                            <span className="flex-1 font-medium truncate text-xs">
                                                {country.name}
                                            </span>
                                            <span className="text-[10px] opacity-70 whitespace-nowrap ml-auto font-mono">
                                                {country.dial_code}
                                            </span>
                                        </button>
                                    ))
                                ) : (
                                    <div className="p-4 text-center text-xs text-brand-text-secondary italic">{/* @ts-ignore */} <T>No results found</T> </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Phone Input */}
                <div className="relative flex-1 h-full min-w-0">
                    <input
                        type="text"
                        value={phoneNumber}
                        onChange={handlePhoneInput}
                        onBlur={onBlur}
                        placeholder={"0".repeat(maxLen)}
                        className={`w-full h-full bg-white dark:bg-brand-dark-tertiary border border-brand-light-tertiary dark:border-white/5 rounded-full pl-7 pr-14 text-[clamp(14px,0.83vw,16px)] text-brand-dark-primary dark:text-brand-text-primary placeholder:text-brand-dark-primary/30 dark:placeholder:text-brand-text-secondary/30 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20 transition-all shadow-sm ${className} ${error ? "border-red-300 ring-1 ring-red-200" : ""}`}
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] text-brand-dark-primary/30 dark:text-brand-text-secondary/30 pointer-events-none font-mono">
                        {phoneNumber.length}/{maxLen}
                    </div>
                </div>
            </div>

            {error && (
                <p className="text-red-500 text-xs ml-1 mt-1">{error}</p>
            )}
        </div>
    );
};

export default MobileInput;
