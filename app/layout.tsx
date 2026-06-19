import type { Metadata } from "next";
import { Mukta_Malar, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ReferralProvider } from "@/contexts/ReferralContext";
import { Suspense } from "react";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const muktaMalar = Mukta_Malar({
  subsets: ["tamil"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-tamil",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-caveat",
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
    <html lang="en" className={`${muktaMalar.variable} ${caveat.variable}`}>
      <head>
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
                <CustomCursor />
              </ReferralProvider>
            </Suspense>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
