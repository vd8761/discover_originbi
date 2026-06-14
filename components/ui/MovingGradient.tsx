"use client";

import React from "react";

const MovingGradient: React.FC = () => {
  return (
    <div className="absolute left-0 right-0 bottom-0 h-[10px] bg-[linear-gradient(to_right,#ED2F34,#EF5921,#FDC00C,#1ED36A)] blur-[10px] opacity-75 animate-aura-pulse pointer-events-none z-20" />
  );
};

export default MovingGradient;
