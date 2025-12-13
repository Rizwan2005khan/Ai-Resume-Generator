import React from "react";
import { X, Sparkles } from "lucide-react";

const Banner = () => {
  return (
    <div className="w-full py-3 bg-gradient-to-r from-purple-600 via-purple-500 to-emerald-500 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 animate-pulse"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-center gap-3">
        <Sparkles className="w-4 h-4 text-white animate-bounce" />
        <p className="font-medium text-sm text-white">
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold mr-2">
            NEW
          </span>
          AI Resume Enhancement Just Got Smarter - Create Professional Resumes in 3 Minutes!
        </p>
        <Sparkles className="w-4 h-4 text-white animate-bounce" />
      </div>
    </div>
  );
};

export default Banner;