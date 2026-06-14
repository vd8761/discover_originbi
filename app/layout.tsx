import type { Metadata } from "next";
import { Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ReferralProvider } from "@/contexts/ReferralContext";
import { Suspense } from "react";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OriginBI Rolefitment - Career Readiness for Students",
  description: "A behavioral assessment platform designed for students to discover their personality and career readiness with OriginBI Rolefitment.",
  openGraph: {
    title: "OriginBI Rolefitment - Career Readiness for Students",
    description: "A behavioral assessment platform designed for students to discover their personality and career readiness with OriginBI Rolefitment.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSansTamil.variable}`}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24..48,100..700,0..1,-50..200" />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <Suspense fallback={null}>
              <ReferralProvider>
                <SmoothScroll>
                  {children}
                </SmoothScroll>
              </ReferralProvider>
            </Suspense>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
