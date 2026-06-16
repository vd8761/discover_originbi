"use client";

import React, { useEffect } from "react";

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    let scrollInstance: any;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Match anchors targeting a hash like "#problem" or "/#problem"
      const hashMatch = href.match(/^(?:\/|#|(?:\/[^#]*))?#(.+)$/);
      if (!hashMatch) return;

      const targetId = hashMatch[1];
      
      // If we are not on the homepage, let standard navigation to "/" with hash happen
      if (window.location.pathname !== "/") {
        return;
      }

      if (targetId === "" || targetId === "top") {
        e.preventDefault();
        window.history.pushState(null, "", " ");
        if (scrollInstance && typeof scrollInstance.scrollTo === "function") {
          scrollInstance.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();
      window.history.pushState(null, "", `#${targetId}`);

      if (scrollInstance && typeof scrollInstance.scrollTo === "function") {
        scrollInstance.scrollTo(targetElement, {
          offset: -80,
          duration: 1.2,
        });
      } else {
        // Fallback for mobile / no Locomotive scroll
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const targetId = hash.replace("#", "");
      if (targetId === "" || targetId === "top") return;

      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      setTimeout(() => {
        if (scrollInstance && typeof scrollInstance.scrollTo === "function") {
          scrollInstance.scrollTo(targetElement, {
            offset: -80,
            duration: 1.2,
          });
        } else {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 600); // Wait slightly for page components to render and stabilize
    };

    const initScroll = async () => {
      if (window.innerWidth < 1024) {
        handleInitialHash();
        return;
      }
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
        
        handleInitialHash();
      } catch (error) {
        console.error("Locomotive scroll initialization failed:", error);
      }
    };

    initScroll();
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      if (scrollInstance && typeof scrollInstance.destroy === "function") {
        scrollInstance.destroy();
      }
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
