"use client";

import React from "react";
import { T } from "@/contexts/LanguageContext";

interface AvatarCirclesProps {
  className?: string;
  avatarUrls?: string[];
  numPeople?: string;
  text?: string;
}

const AvatarCircles: React.FC<AvatarCirclesProps> = ({
  className = "",
  avatarUrls = [
    "/assets/testimonials/karthik.png",
    "/assets/experts/pratap.png",
    "/assets/testimonials/student_female.png",
    "/assets/experts/bharathiraja.png"
  ],
  numPeople = "10k+",
  text = "Students Guided"
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Overlapping Avatars Stack */}
      <div className="flex -space-x-[14px] rtl:space-x-reverse select-none">
        {avatarUrls.map((url, index) => (
          <div
            key={index}
            className="w-[42px] h-[42px] rounded-full border-2 border-[#F4F4F4] overflow-hidden bg-white shrink-0 relative transition-transform duration-300 hover:-translate-y-1 hover:z-30"
            style={{ zIndex: 10 + index }}
          >
            <img
              className="w-full h-full object-cover rounded-full"
              src={url}
              alt={`Avatar ${index + 1}`}
              draggable={false}
            />
          </div>
        ))}
        {/* Numeric Badge (Green Circle) */}
        <div
          className="w-[42px] h-[42px] rounded-full border-2 border-[#F4F4F4] bg-[#1ed36a] text-white flex items-center justify-center text-[13px] font-sans font-bold select-none shrink-0 relative hover:-translate-y-1 hover:z-30 transition-transform duration-300"
          style={{ zIndex: 10 + avatarUrls.length }}
        >
          {numPeople}
        </div>
      </div>

      {/* Label Text */}
      {text && (
        <div className="flex flex-col text-[14px] leading-[1.2] font-sans font-semibold text-[#19211c] select-none">
          <T>{text}</T>
        </div>
      )}
    </div>
  );
};

export default AvatarCircles;
