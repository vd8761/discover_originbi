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
        if (!mounted || language === "en") return key;
        return (taTranslations as Record<string, string>)[key] || key;
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

    const safeT = (key: string) => mounted ? t(key) : key;

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
            return <>{children}</>;
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
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 lg:py-1.5 rounded-full border-2 border-brand-green/30 dark:border-white/10 bg-white/5 dark:bg-brand-dark-tertiary/50 hover:border-brand-green transition-all duration-300 group shadow-sm backdrop-blur-md"
            >
                <span className="material-symbols-outlined text-[11px] text-brand-green group-hover:scale-110 transition-transform">translate</span>
                <span className="text-[10px] font-bold text-brand-dark-primary dark:text-white uppercase tracking-wider leading-none mt-[1px]">{displayShort}</span>
                <span className={`material-symbols-outlined text-[11px] text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 w-28 bg-white dark:bg-brand-dark-secondary rounded-xl shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="py-0.5">
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setLanguage(lang.code as Language);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-[12px] font-bold transition-all flex items-center justify-between ${language === lang.code
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
