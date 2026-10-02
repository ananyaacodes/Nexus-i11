import React, { useEffect, useRef, useState } from 'react';

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  index: number;
}

const CountUpStat: React.FC<StatProps> = ({
  value,
  suffix = '',
  label,
  index,
}) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [started, value]);

  return (
    <div
      ref={ref}
      className="group relative p-6 sm:p-8 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#ff1f8f] group-hover:w-full transition-all duration-500" />

      <div className="font-impact text-5xl sm:text-6xl md:text-7xl text-white leading-none tracking-tight">
        {count}
        {suffix}
      </div>

      <div className="mt-3 text-xs sm:text-sm font-mono-code font-bold uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </div>
    </div>
  );
};

export const WhySection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#090214] text-white py-20 sm:py-24 lg:py-32 border-y border-white/10"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#ff1f8f]/10 blur-[120px] rounded-full" />

        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00f2fe]/5 blur-[140px] rounded-full" />

        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Label */}
        <div className="mb-10 sm:mb-14">
          <span className="inline-flex items-center gap-3 font-mono-code text-xs sm:text-sm uppercase tracking-[0.2em] text-[#ffbe3b]">
            <span className="w-8 h-px bg-[#ffbe3b]" />
            02 · ABOUT
          </span>
        </div>

        {/* Main About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <div className="lg:col-span-7">

            <h2 className="font-impact text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.9]">
  <span className="block text-[#f7f1e8]">
    A HACKATHON
  </span>

  <span className="block">
    <span className="text-[#ff7657]">ROOTED</span>
    <span className="text-[#ffbf69]"> IN</span>
  </span>

  <span className="block text-[#f7f1e8]">
    PEOPLE.
  </span>

  <span className="block mt-5 w-48 sm:w-64 h-1 bg-white" />
</h2>
            <p className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-zinc-300 font-body leading-relaxed">
              Hack for Good brings together students, innovators and NGOs
              to solve real-world challenges using technology, creativity
              and collaboration.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-12 bg-[#ff1f8f]" />

              <span className="font-mono-code text-[10px] sm:text-xs uppercase tracking-[0.2em] text-zinc-500">
                OUR STORY
              </span>
            </div>
          </div>

          {/* Right — Illustration */}
          <div className="lg:col-span-5">
            <div className="relative aspect-square max-w-md mx-auto">

              {/* Outer frame */}
              <div className="absolute inset-0 border border-white/10 rotate-3" />

              <div className="absolute inset-4 border border-[#ff1f8f]/20 -rotate-3" />

              {/* Main illustration block */}
              <div className="absolute inset-8 bg-gradient-to-br from-[#160228] via-[#2d054f] to-[#090214] border border-white/10 overflow-hidden">

                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,31,143,0.8),transparent_55%)]" />

                {/* Decorative circles */}
                <div className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full border border-[#ff1f8f]/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                <div className="absolute w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-[#00f2fe]/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                {/* Center symbol */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="font-impact text-5xl sm:text-6xl text-white">
                    HFG
                  </div>

                  <div className="mt-2 font-mono-code text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#ffbe3b]">
                    ABOUT ILLUSTRATION
                  </div>
                </div>

                {/* Corner labels */}
                <span className="absolute top-4 left-4 font-mono-code text-[8px] text-zinc-500">
                  PEOPLE
                </span>

                <span className="absolute top-4 right-4 font-mono-code text-[8px] text-zinc-500">
                  PURPOSE
                </span>

                <span className="absolute bottom-4 left-4 font-mono-code text-[8px] text-zinc-500">
                  TECH
                </span>

                <span className="absolute bottom-4 right-4 font-mono-code text-[8px] text-zinc-500">
                  IMPACT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 sm:mt-20 lg:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">

          <CountUpStat
            value={72}
            suffix="H"
            label="Hackathon"
            index={0}
          />

          <CountUpStat
            value={5}
            suffix="+"
            label="Theme Areas"
            index={1}
          />

          <div className="group relative p-6 sm:p-8 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300">
            <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#ff6838] group-hover:w-full transition-all duration-500" />

            <div className="font-impact text-5xl sm:text-6xl md:text-7xl text-white leading-none">
              NGO
            </div>

            <div className="mt-3 text-xs sm:text-sm font-mono-code font-bold uppercase tracking-[0.18em] text-zinc-400">
              Partners
            </div>
          </div>

          <div className="group relative p-6 sm:p-8 border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300">
            <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#ffbe3b] group-hover:w-full transition-all duration-500" />

            <div className="font-impact text-5xl sm:text-6xl md:text-7xl text-white leading-none">
              REAL
            </div>

            <div className="mt-3 text-xs sm:text-sm font-mono-code font-bold uppercase tracking-[0.18em] text-zinc-400">
              Impact
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};