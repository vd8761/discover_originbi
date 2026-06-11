"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import taTranslations from "../locales/ta.json";

type Language = "en" | "ta";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>("en");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language | null;
        if (savedLang) {
            setLanguageState(savedLang);
            if (savedLang === "ta") {
                document.documentElement.classList.add("lang-ta");
                document.documentElement.lang = "ta";
            } else {
                document.documentElement.classList.remove("lang-ta");
                document.documentElement.lang = "en";
            }
        }
        setMounted(true);
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
        if (lang === "ta") {
            document.documentElement.classList.add("lang-ta");
            document.documentElement.lang = "ta";
        } else {
            document.documentElement.classList.remove("lang-ta");
            document.documentElement.lang = "en";
        }
    };

    const t = (key: string): string => {
        const COST = process.env.NEXT_PUBLIC_REGISTRATION_COST || '999';
        const legacyPrices = ['749', '499', '500'];
        
        const applyReplacement = (str: string) => {
            let result = str;
            legacyPrices.forEach(price => {
                if (result.includes(price)) {
                    result = result.split(price).join(COST);
                }
            });
            return result;
        };

        if (!mounted) return applyReplacement(key);
        
        // Get the translated text (or use the key as default for English)
        let text = language === "en" ? key : (taTranslations as Record<string, string>)[key] || key;
        
        return applyReplacement(text);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

/**
 * A hydration-safe translation hook.
 * It ensures that translations are only applied after the component has mounted on the client,
 * preventing hydration mismatches between server and client HTML.
 */
export const useTranslation = () => {
    const { t, language, setLanguage } = useLanguage();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const safeT = (key: string) => t(key);

    return { t: safeT, language, setLanguage, mounted };
};

// Wrapper Component for JSX texts
export const T: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { t } = useLanguage();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (typeof children === "string") {
        if (!mounted) {
            return <>{t(children)}</>;
        }

        const trimmed = children.trim();
        const translated = t(trimmed);
        const preSpace = children.match(/^\s*/)?.[0] || "";
        const postSpace = children.match(/\s*$/)?.[0] || "";
        return <>{preSpace}{translated}{postSpace}</>;
    }
    return <>{children}</>;
};

// Language Toggle Component
export const I18nToggle: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages = [
        { code: 'en', label: 'English', short: 'ENG' },
        { code: 'ta', label: 'தமிழ்', short: 'தமிழ்' }
    ];

    const currentLang = languages.find(l => l.code === language);
    const displayShort = mounted ? currentLang?.short : 'ENG';

    return (
        <div className="relative inline-block" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#1ed36a]/40 bg-transparent hover:border-[#1ed36a]/80 hover:bg-white/5 transition-all duration-300 cursor-pointer focus:outline-none"
            >
                <span className="text-[13px] font-medium text-white tracking-wide uppercase leading-none mt-[1px]">{displayShort}</span>
                <svg className={`w-3 h-3 text-white/80 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 w-28 bg-[#19211c] rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="py-0.5">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code as Language);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-[12px] font-bold transition-all flex items-center justify-between cursor-pointer ${language === lang.code
                                    ? 'bg-brand-green text-white'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-brand-green/10 hover:text-brand-green dark:hover:bg-brand-green/20'
                                    }`}
                            >
                                <span className="flex items-center gap-3">
                                    {lang.label}
                                </span>
                                {language === lang.code && (
                                    <span className="material-symbols-outlined text-[14px]">check</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
