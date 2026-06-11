"use client";

import React from "react";

interface LogoItem {
  name: string;
  imgSrc: string;
}

interface LogoLoopProps {
  items: LogoItem[];
  speed?: number; // seconds for one full cycle
  direction?: "left" | "right";
}

const LogoLoop: React.FC<LogoLoopProps> = ({
  items,
  speed = 30,
  direction = "left",
}) => {
  const animationDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div className="w-full overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-[#19211c] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-[#19211c] to-transparent pointer-events-none" />

      <div
        className="flex"
        style={{
          animation: `logoloop-scroll ${speed}s linear infinite`,
          animationDirection,
          width: "max-content",
        }}
      >
        {/* Original set */}
        {items.map((item, i) => (
          <div
            key={`a-${i}`}
            className="flex items-center justify-center px-8 md:px-12 shrink-0"
          >
            <img
              src={item.imgSrc}
              alt={item.name}
              className="h-6 md:h-7 w-auto object-contain opacity-50 brightness-0 invert hover:opacity-80 transition-all duration-500"
              draggable={false}
            />
          </div>
        ))}
        {/* Duplicated set for seamless loop */}
        {items.map((item, i) => (
          <div
            key={`b-${i}`}
            className="flex items-center justify-center px-8 md:px-12 shrink-0"
          >
            <img
              src={item.imgSrc}
              alt={item.name}
              className="h-6 md:h-7 w-auto object-contain opacity-50 brightness-0 invert hover:opacity-80 transition-all duration-500"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
