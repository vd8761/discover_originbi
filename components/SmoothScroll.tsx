"use client";

import React, { useEffect } from "react";

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    let scrollInstance: any;

    const initScroll = async () => {
      if (window.innerWidth < 1024) return;
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        scrollInstance = new LocomotiveScroll({
          lenisOptions: {
            wrapper: window,
            content: document.documentElement,
            lerp: 0.1,
            duration: 1.2,
            orientation: "vertical",
            smoothWheel: true,
          }
        });
      } catch (error) {
        console.error("Locomotive scroll initialization failed:", error);
      }
    };

    initScroll();

    return () => {
      if (scrollInstance && typeof scrollInstance.destroy === "function") {
        scrollInstance.destroy();
      }
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
