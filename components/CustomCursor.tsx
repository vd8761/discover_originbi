"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor: React.FC = () => {
  const cursorCircleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable custom cursor on touch/mobile devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const circle = cursorCircleRef.current;
    if (!circle) return;

    // Reveal cursor elements on desktop
    gsap.set(circle, { opacity: 1 });

    let isHovering = false;

    // Mouse Move: Updates coordinates with smooth lag on the outer circle
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(circle, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    // Click press: Shrink circle for feedback
    const handleMouseDown = () => {
      gsap.to(circle, {
        scale: isHovering ? 1.4 : 0.6,
        duration: 0.15,
        ease: "power2.out",
      });
    };

    // Click release: Restore size
    const handleMouseUp = () => {
      gsap.to(circle, {
        scale: isHovering ? 2.0 : 1.0,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    // Hover detection: Scale up outer circle when over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("[role='button']") ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest("textarea") ||
          target.closest(".cursor-pointer") ||
          target.classList.contains("cursor-pointer"))
      ) {
        isHovering = true;
        gsap.to(circle, {
          scale: 2.0,
          duration: 0.25,
          ease: "power2.out",
        });
      } else {
        isHovering = false;
        gsap.to(circle, {
          scale: 1.0,
          duration: 0.25,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    // Fade cursor out/in when exiting/entering screen
    const handleMouseLeaveWindow = () => {
      gsap.to(circle, { opacity: 0, duration: 0.2 });
    };
    const handleMouseEnterWindow = () => {
      gsap.to(circle, { opacity: 1, duration: 0.2 });
    };

    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, []);

  return (
    <>
      {/* Global stylesheet to disable default browser cursor on hoverable screens */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (hover: hover) and (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
      `}} />

      {/* Outer Inverting Circle Mask (Reduced to w-6 h-6, 24px) */}
      <div
        ref={cursorCircleRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference opacity-0"
        style={{
          transform: "translate(-50%, -50%)",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default CustomCursor;
