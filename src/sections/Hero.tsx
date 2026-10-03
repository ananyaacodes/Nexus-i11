import React, { useState } from 'react';
import { ArrowRight, Crown, Calendar, MapPin, Clock, Trophy, Users } from 'lucide-react';
import { HeroCinemagraph } from '../components/HeroCinemagraph';
import { RippleDistortion } from '../components/RippleDistortion';

export const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative min-h-[90vh] lg:min-h-[96vh] flex flex-col justify-between border-b border-[rgba(241,238,231,0.12)] overflow-hidden bg-[#111315]">
      {/* 1. Interactive Ripple Artwork Layer: Liquid ripples specifically distort ONLY the sunset & skyscraper skyline */}
      {!imgError && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <RippleDistortion
            src="/hero/newhero.png"
            maskSrc="/hero/ripple-mask.png"
            brushSize={90}
            strength={0.04}
            swirl={0.05}
            rings={3}
            spread={3.5}
            fade={2.4}
            spacing={14}
            dispersion={0.003}
            glint={0.18}
            tint="#FF2A85"
            tintAmount={0.02}
            grayscale={false}
            highlightColor="#FFF2E0"
            trigger="both"
            clickStrength={1.5}
            align={[0.95, 0.9]}
            className="w-full h-full opacity-95"
          />
        </div>
      )}

      {/* Fallback CSS atmosphere if image fails */}
      {imgError && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#111315] via-[#171A1D] to-[#25131C] z-0 pointer-events-none" />
      )}

      {/* 2. Living Illustration Cinemagraph Micro-Motion Layer */}
      {!imgError && <HeroCinemagraph />}

      {/* 3. Directional Gradient Scrim: Deep dark on the left for crisp text contrast, smoothly revealing art on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#111315] via-[#111315]/90 sm:via-[#111315]/80 md:via-[#111315]/55 to-transparent z-[3] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#111315] to-transparent z-[3] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#111315] via-[#111315]/95 to-transparent z-[3] pointer-events-none" />

      {/* Top Header Spacing / Metadata Line */}
      <div className="relative z-10 pt-24 sm:pt-28 px-6 lg:px-12 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#FF2A85] uppercase font-mono select-none drop-shadow-[0_0_12px_rgba(255,42,133,0.3)]">
          <Crown size={16} className="text-[#FF2A85] animate-pulse" />
          <span className="text-[#F1EEE7]">IDEAS TODAY.</span>
          <span className="text-[#FF2A85]">A BRIGHTER TOMORROW.</span>
        </div>
      </div>

      {/* Main Hero Body: Left-Aligned Stacked Typography */}
      <div className="relative z-10 my-auto py-8 sm:py-12 px-6 lg:px-12 max-w-7xl w-full mx-auto flex flex-col items-start gap-6 sm:gap-8">
        <div className="flex flex-col items-start">
          {/* Stacked Display Title in Brush / Bold Style with Vibrant Pink Glow */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8.5rem] font-extrabold tracking-tighter text-[#F1EEE7] font-display uppercase leading-[0.88] select-none flex flex-col drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            <span className="hover:text-white transition-colors">HACK</span>
            <span className="text-[#F1EEE7]">FOR</span>
            <div className="relative inline-block">
              <span className="text-[#FF2A85] drop-shadow-[0_0_35px_rgba(255,42,133,0.55)] font-['Permanent_Marker',sans-serif] tracking-normal">
                GOOD
              </span>
              {/* Brush Underline Graphic */}
              <svg
                className="w-full h-3 sm:h-4 text-[#FF2A85] mt-1 -mb-2 drop-shadow-[0_0_10px_rgba(255,42,133,0.6)]"
                viewBox="0 0 250 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 10.5C45.5 4.5 135 2 247 7.5C189.5 9 86 11 23 12"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </h1>
        </div>

        {/* Subtitle & Description */}
        <div className="space-y-2 max-w-xl sm:max-w-2xl">
          <p className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-[#F1EEE7] font-display uppercase">
            A HACKATHON FOR BOLDER IDEAS AND A BRIGHTER TOMORROW.
          </p>
          <p className="text-sm sm:text-base text-[#A9AAA5] font-normal leading-relaxed text-pretty">
            A student hackathon focused on building technology for meaningful real-world problems.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Primary Pink Glow Button */}
          <a
            href="#cta"
            className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#FF2A85] hover:bg-[#ff4294] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xs transition-all duration-200 shadow-[0_0_25px_rgba(255,42,133,0.4)] hover:shadow-[0_0_35px_rgba(255,42,133,0.65)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Register Now</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>

          {/* Secondary Translucent Button */}
          <a
            href="#about"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-[#171A1D]/70 hover:bg-[#1D2125] text-[#F1EEE7] hover:text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xs border border-[rgba(241,238,231,0.2)] hover:border-[#FF2A85]/60 transition-all duration-200 backdrop-blur-sm cursor-pointer"
          >
            Know More
          </a>
        </div>
      </div>

      {/* Bottom Metadata Bar: Date & Venue + Event Stats */}
      <div className="relative z-10 w-full border-t border-[rgba(241,238,231,0.12)] bg-[#111315]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 sm:py-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8 text-xs sm:text-sm">
          {/* Date & Venue */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[#F1EEE7]">
            <div className="flex items-center gap-2 font-mono font-semibold text-[#FF2A85]">
              <Calendar size={15} />
              <span>28 & 29 FEB 2026</span>
            </div>
            <span className="hidden sm:inline text-[rgba(241,238,231,0.2)]">/</span>
            <div className="flex items-center gap-2 text-[#A9AAA5]">
              <MapPin size={15} className="text-[#70736F] shrink-0" />
              <span className="text-pretty">Christ College of Engineering, Irinjalakuda, Thrissur, Kerala</span>
            </div>
          </div>

          {/* Event Stats */}
          <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm tracking-wider uppercase text-[#F1EEE7] select-none border-t lg:border-t-0 pt-2 lg:pt-0 border-[rgba(241,238,231,0.06)] w-full lg:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#FF2A85]" />
              <span className="font-bold tabular-nums">12 HOURS</span>
            </div>
            <span className="text-[rgba(241,238,231,0.2)]">·</span>
            <div className="flex items-center gap-1.5">
              <Trophy size={14} className="text-[#FF2A85]" />
              <span className="font-bold tabular-nums">20K PRIZEPOOL</span>
            </div>
            <span className="text-[rgba(241,238,231,0.2)]">·</span>
            <div className="flex items-center gap-1.5">
              <Users size={14} className="text-[#FF2A85]" />
              <span className="font-bold tabular-nums">500+ HACKERS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
