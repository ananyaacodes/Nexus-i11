import React, { useState } from 'react';

export const About: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      className="relative min-h-[680px] lg:min-h-[820px] w-full border-b border-[rgba(241,238,231,0.12)] overflow-hidden bg-[#111315] flex items-center"
    >
      {/* Full-Bleed Exact Background Artwork Layer */}
      {!imgError && (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-right lg:bg-center z-0"
          style={{ backgroundImage: "url('/hero/abtf.png')" }}
        >
          {/* Hidden image to gracefully detect load failure */}
          <img
            src="/hero/abtf.png"
            alt="About Hack for Good Artwork"
            className="hidden"
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {/* Fallback styling if image fails */}
      {imgError && (
        <div className="absolute inset-0 bg-[#111315] z-0" />
      )}

      {/* Mobile Backdrop Tint to ensure text contrast on narrow screens without obstructing desktop art */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111315]/95 via-[#111315]/85 to-[#111315]/60 lg:hidden z-[1] pointer-events-none" />

      {/* Content Container: Strict 52/48 Split on Desktop to keep all text in the black textured negative space */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:pl-8 lg:pr-12 xl:pl-10 xl:pr-14 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (52% on Desktop): Sits cleanly within the textured black paper zone, positioned comfortably to the left */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start gap-6 sm:gap-8 max-w-xl lg:-translate-x-2 xl:-translate-x-4">
            {/* Small Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-[#FF2A85]" />
              <span className="text-xs sm:text-sm font-mono tracking-widest text-[#FF2A85] uppercase font-bold">
                ABOUT
              </span>
            </div>

            {/* Main Stacked Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#F1EEE7] font-display uppercase leading-[0.92] text-balance">
              WHAT IS<br />
              <span className="text-[#FF2A85] drop-shadow-[0_0_25px_rgba(255,42,133,0.35)]">
                HACK FOR GOOD?
              </span>
            </h2>

            {/* Body Text */}
            <p className="text-base sm:text-lg text-[#D1CECA] font-normal leading-relaxed text-pretty">
              Hack for Good is a student-led hackathon where bold minds come together to build real solutions for real-world problems. It is a space for creativity, collaboration, technology, and ideas that can create meaningful impact.
            </p>

            {/* Primary Emphasis: IDEAS. PEOPLE. IMPACT. */}
            <div className="pt-2 sm:pt-4 flex flex-col gap-2.5 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 font-display font-black text-xl sm:text-2xl tracking-wider uppercase text-[#F1EEE7]">
                <div className="flex items-center gap-2">
                  <span className="text-[#FF2A85]">01.</span>
                  <span className="hover:text-[#FF2A85] transition-colors">IDEAS.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF2A85]">02.</span>
                  <span className="hover:text-[#FF2A85] transition-colors">PEOPLE.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#FF2A85]">03.</span>
                  <span className="hover:text-[#FF2A85] transition-colors">IMPACT.</span>
                </div>
              </div>
              <div className="h-[2px] w-full max-w-xs bg-gradient-to-r from-[#FF2A85] via-[rgba(241,238,231,0.2)] to-transparent mt-1" />
            </div>
          </div>

          {/* Right Column (48% on Desktop): Intentionally left clear to show the illustrated characters, city, and scrapbook textures */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-6 min-h-[500px]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
