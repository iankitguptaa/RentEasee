import React from 'react';
import { useApp } from '../../context/AppContext';

export const Logo = ({ size = 'normal', showTagline = true }) => {
  const { theme } = useApp();

  return (
    <div className="flex items-center gap-2.5 select-none group">
      {/* Icon Mark from uploaded image */}
      <img
        src="/icon.jpg"
        alt="RentEasee Icon Mark"
        className={`rounded-xl object-contain shadow-xs border border-[#16a34a]/30 group-hover:scale-105 transition-transform duration-300 ${size === 'small' ? 'w-7 h-7' : size === 'large' ? 'w-11 h-11' : 'w-9 h-9'
          }`}
      />

      {/* Dynamic Text Wordmark */}
      <div className="flex flex-col">
        <div className={`font-bold tracking-tight leading-none flex items-center ${size === 'small' ? 'text-base' : size === 'large' ? 'text-2xl' : 'text-xl'
          }`}>
          {/* 'Rent' - Dark in Light Mode / Crisp White in Dark Mode */}
          <span className="text-[#064e3b] dark:text-white transition-colors">
            Rent
          </span>
          {/* 'Easee' - Vibrant Emerald Green */}
          <span className="text-[#16a34a] font-extrabold">
            Easee
          </span>
        </div>

        {/* Tagline */}
        {showTagline && (
          <span className="text-[9px] sm:text-[10px] tracking-wider text-[#16a34a] dark:text-[#22c55e] font-semibold -mt-0.5 font-sans">
            Rent Better. Live Easier.
          </span>
        )}
      </div>
    </div>
  );
};
