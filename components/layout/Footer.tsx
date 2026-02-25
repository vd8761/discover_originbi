"use client";

import React from 'react';
import Logo from "@/components/ui/Logo";
import { LinkedInIcon, InstagramIcon, XIcon } from "@/components/icons";

const Footer: React.FC = () => {
    const horizontalPadding = "px-6 lg:px-[clamp(24px,8.33vw,160px)]";

    return (
        <footer className="relative z-10 w-full border-t border-brand-dark-primary/5 dark:border-white/5 bg-white dark:bg-brand-dark-primary transition-all duration-500">
            <div className={`max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center ${horizontalPadding} py-14 gap-8`}>
                <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                    <a href="/" className="hover:opacity-80 transition-opacity">
                        <Logo className="h-6 2xl:h-7 w-auto mb-2" />
                    </a>
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-[13px] 2xl:text-sm font-medium">
                        <span className="text-brand-text-light-primary dark:text-brand-text-primary transition-colors duration-300">&copy; {new Date().getFullYear()} OriginBI mindworks</span>
                        <a href="#" className="text-brand-text-light-secondary dark:text-brand-text-secondary hover:text-brand-green transition-colors duration-300">Privacy Policy</a>
                        <a href="#" className="text-brand-text-light-secondary dark:text-brand-text-secondary hover:text-brand-green transition-colors duration-300">Terms and Conditions</a>
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <a href="https://x.com/originbimindwrk" target="_blank" rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-brand-light-primary dark:bg-brand-dark-secondary border border-brand-dark-primary/5 dark:border-white/10 text-brand-green hover:scale-110 hover:shadow-[0_10px_20px_-5px_rgba(30,211,106,0.3)] transition-all duration-300 shadow-sm">
                        <XIcon className="w-5 h-5" />
                    </a>
                    <a href="https://www.instagram.com/originbimindworks/" target="_blank" rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-brand-light-primary dark:bg-brand-dark-secondary border border-brand-dark-primary/5 dark:border-white/10 text-brand-green hover:scale-110 hover:shadow-[0_10px_20px_-5px_rgba(30,211,106,0.3)] transition-all duration-300 shadow-sm">
                        <InstagramIcon className="w-5 h-5" />
                    </a>
                    <a href="https://www.linkedin.com/company/originbimindworks/" target="_blank" rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-brand-light-primary dark:bg-brand-dark-secondary border border-brand-dark-primary/5 dark:border-white/10 text-brand-green hover:scale-110 hover:shadow-[0_10px_20px_-5px_rgba(30,211,106,0.3)] transition-all duration-300 shadow-sm">
                        <LinkedInIcon className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
