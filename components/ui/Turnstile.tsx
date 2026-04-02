"use client";

import React, { useEffect, useRef } from "react";

interface TurnstileProps {
  onVerify: (token: string) => void;
  options?: {
    theme?: "light" | "dark" | "auto";
    size?: "normal" | "flexible" | "compact";
  };
}

declare global {
  interface Window {
    turnstile: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: (error: string) => void;
          theme?: string;
          size?: string;
        }
      ) => string;
      reset: (id: string) => void;
      remove: (id: string) => void;
    };
    onloadTurnstileCallback: () => void;
  }
}

const Turnstile: React.FC<TurnstileProps> = ({ onVerify, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);

  // Update the ref whenever onVerify changes, but don't trigger effects
  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);

  useEffect(() => {
    let siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    
    // Automatically use testing keys on localhost/127.0.0.1
    const isLocalhost = 
      window.location.hostname === "localhost" || 
      window.location.hostname === "127.0.0.1";

    if (isLocalhost) {
      siteKey = "1x00000000000000000000AA";
    }

    if (!siteKey) {
      console.warn("Cloudflare Turnstile Site Key is missing.");
      return;
    }

    const scriptId = "cloudflare-turnstile-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    const renderWidget = () => {
      if (containerRef.current && window.turnstile && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onVerifyRef.current(token);
          },
          "error-callback": (error: string) => {
            console.error("Cloudflare Turnstile Error:", error);
          },
          theme: options?.theme || "auto",
          size: "flexible",
        });
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
      script.async = true;
      script.defer = true;
      
      window.onloadTurnstileCallback = () => {
        renderWidget();
      };
      
      document.body.appendChild(script);
    } else if (window.turnstile) {
      renderWidget();
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onVerify, options]);

  return <div ref={containerRef} className="cf-turnstile" />;
};

export default Turnstile;
