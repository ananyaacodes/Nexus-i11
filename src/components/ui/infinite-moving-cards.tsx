"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    date?: string;
    stage?: string;
    image?: string;
    status?: string;
    accent?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  const duplicatedRef = React.useRef(false);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current && !duplicatedRef.current) {
      duplicatedRef.current = true;
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-5 sm:gap-6 py-3 w-max flex-nowrap will-change-transform transform-gpu",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[280px] sm:w-[320px] md:w-[350px] max-w-full relative rounded-2xl flex-shrink-0 p-4 sm:p-5 backdrop-blur-md border border-white/[0.08] hover:border-white/[0.22] shadow-[0_8px_28px_rgba(0,0,0,0.4)] transition-all duration-300 group hover:-translate-y-1 overflow-hidden will-change-transform"
            style={{
              background:
                "linear-gradient(180deg, rgba(22,25,30,0.72) 0%, rgba(14,16,20,0.80) 100%)",
            }}
            key={`${item.name}-${idx}`}
          >
            {/* Subtle glow highlight on card top border */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            {/* Subtle accent colored backlight glow on hover */}
            <div
              className="absolute -top-20 -right-20 w-36 h-36 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: item.accent || '#FF2A85' }}
            />

            {item.image && (
              <div className="w-full aspect-[16/10] mb-3.5 rounded-xl overflow-hidden relative flex items-center justify-center bg-black/15 border border-white/[0.05]">
                {/* Full illustration floating cleanly without heavy opaque background */}
                <img
                  src={item.image}
                  alt={item.title || item.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-1.5 group-hover:scale-105 transition-transform duration-500 block"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Floating Date & Stage Chips (Seamless frosted pills) */}
                {item.date && (
                  <span className="absolute top-2.5 right-2.5 font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/60 text-[#FF2A85] border border-[#FF2A85]/20 backdrop-blur-md shadow-md">
                    {item.date}
                  </span>
                )}
                {item.stage && (
                  <span className="absolute top-2.5 left-2.5 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/60 text-[#F1EEE7]/90 border border-white/10 backdrop-blur-md shadow-md">
                    {item.stage}
                  </span>
                )}
              </div>
            )}

            <blockquote>
              <div className="relative z-20 flex flex-col gap-1 mb-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-base sm:text-lg font-black font-display uppercase tracking-tight text-[#F1EEE7] group-hover:text-[#FF2A85] transition-colors drop-shadow-sm leading-snug">
                    {item.title}
                  </span>
                  {item.status && (
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#28C840]/15 text-[#28C840] border border-[#28C840]/20 shrink-0">
                      ● {item.status}
                    </span>
                  )}
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-[#D97745] font-mono uppercase tracking-wide leading-tight">
                  {item.name}
                </span>
              </div>
              <span className="relative z-20 text-xs sm:text-[13px] leading-relaxed text-[#C5C6C0] font-normal block text-pretty">
                {item.quote}
              </span>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
