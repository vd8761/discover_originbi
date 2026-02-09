"use client";

import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isInitialized: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<Theme>("light");
    const [isInitialized, setIsInitialized] = useState(false);

    // Initial theme setup
    useEffect(() => {
        const root = window.document.documentElement;
        const savedTheme = localStorage.getItem("theme") as Theme | null;

        let initialTheme: Theme = "light";

        if (savedTheme) {
            initialTheme = savedTheme;
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            initialTheme = "dark";
        }

        setTheme(initialTheme);
        if (initialTheme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        setIsInitialized(true);
    }, []);

    // Theme change effect
    useEffect(() => {
        if (!isInitialized) return;

        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [theme, isInitialized]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isInitialized }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
