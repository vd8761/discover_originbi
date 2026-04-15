"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSearchParams } from "next/navigation";

interface ReferralContextType {
    referralCode: string | null;
    getRegisterUrl: () => string;
    wrapUrl: (url: string) => string;
    clearReferral: () => void;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const ReferralProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [referralCode, setReferralCode] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const urlRef = searchParams.get("ref");
        const storedRef = typeof window !== 'undefined' ? sessionStorage.getItem("originbi_referral_code") : null;

        if (searchParams.has("ref")) {
            if (urlRef && urlRef.trim() !== "") {
                const cleanRef = urlRef.trim();
                setReferralCode(cleanRef);
                sessionStorage.setItem("originbi_referral_code", cleanRef);
            } else {
                setReferralCode(null);
                sessionStorage.removeItem("originbi_referral_code");
            }
        } else {
            // Restore from session storage if available to handle the initial load
            // but keep the URL as the source of truth for "active" referrals.
            // However, to satisfy "remove and refresh = gone", we clear it if the URL is bare.
            setReferralCode(null);
            sessionStorage.removeItem("originbi_referral_code");
        }
    }, [searchParams]);

    const clearReferral = () => {
        setReferralCode(null);
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem("originbi_referral_code");
        }
    };

    const wrapUrl = (url: string) => {
        if (!referralCode) return url;
        const [path, hash] = url.split('#');
        const separator = path.includes('?') ? '&' : '?';
        const newUrl = `${path}${separator}ref=${referralCode}${hash ? '#' + hash : ''}`;
        return newUrl;
    };

    const getRegisterUrl = () => {
        return referralCode ? `/register?ref=${referralCode}` : "/register";
    };

    return (
        <ReferralContext.Provider value={{ referralCode, getRegisterUrl, wrapUrl, clearReferral }}>
            {children}
        </ReferralContext.Provider>
    );
};

export const useReferral = () => {
    const context = useContext(ReferralContext);
    if (context === undefined) {
        throw new Error("useReferral must be used within a ReferralProvider");
    }
    return context;
};
