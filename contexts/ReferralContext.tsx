"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSearchParams } from "next/navigation";

interface ReferralContextType {
    referralCode: string | null;
    getRegisterUrl: () => string;
    clearReferral: () => void;
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined);

export const ReferralProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [referralCode, setReferralCode] = useState<string | null>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const urlRef = searchParams.get("ref");
        const storedRef = typeof window !== 'undefined' ? localStorage.getItem("originbi_referral_code") : null;

        if (searchParams.has("ref")) {
            if (urlRef && urlRef.trim() !== "") {
                const cleanRef = urlRef.trim();
                setReferralCode(cleanRef);
                localStorage.setItem("originbi_referral_code", cleanRef);
            } else {
                setReferralCode(null);
                localStorage.removeItem("originbi_referral_code");
            }
        } else {
            // Explicitly sync with storedRef (which could be null)
            setReferralCode(storedRef);
        }
    }, [searchParams]);

    const clearReferral = () => {
        setReferralCode(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem("originbi_referral_code");
        }
    };

    const getRegisterUrl = () => {
        return referralCode ? `/register?ref=${referralCode}` : "/register";
    };

    return (
        <ReferralContext.Provider value={{ referralCode, getRegisterUrl, clearReferral }}>
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
