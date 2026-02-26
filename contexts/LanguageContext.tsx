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

// Wrapper Component for JSX texts
export const T: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { t } = useLanguage();
    if (typeof children === "string") {
        const trimmed = children.trim();
        const translated = t(trimmed);
        if (translated !== trimmed) {
            const preSpace = children.match(/^\s*/)?.[0] || "";
            const postSpace = children.match(/\s*$/)?.[0] || "";
            return <>{preSpace}{translated}{postSpace}</>;
        }
        return <>{translated}</>;
    }
    return <>{children}</>;
};

// Language Toggle Component
export const I18nToggle: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="text-brand-dark-primary dark:text-white bg-transparent font-sans text-[13px] font-semibold px-3 py-1.5 border border-brand-green/30 rounded-full outline-none cursor-pointer flex items-center transition-all duration-300 hover:border-brand-green hover:shadow-[0_0_10px_rgba(30,211,106,0.1)] dark:border-white/15"
        >
            <option value="en" className="text-brand-dark-primary bg-background dark:text-white dark:bg-brand-dark-primary">English</option>
            <option value="ta" className="text-brand-dark-primary bg-background dark:text-white dark:bg-brand-dark-primary">தமிழ்</option>
        </select>
    );
};
