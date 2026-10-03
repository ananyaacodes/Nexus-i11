"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";

export interface IdeaBoxIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface IdeaBoxIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  isHovered?: boolean;
}

const BULB_VARIANTS: Variants = {
  normal: {
    y: 18,
    scale: 0.55,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  animate: {
    y: -8,
    scale: 1.1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 240,
      damping: 14,
      mass: 0.8,
    },
  },
};

const RAYS_VARIANTS: Variants = {
  normal: {
    scale: 0.3,
    opacity: 0,
    transition: { duration: 0.2 },
  },
  animate: {
    scale: [0.6, 1.25, 1],
    opacity: [0, 1, 0.95],
    transition: {
      delay: 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const GLOW_VARIANTS: Variants = {
  normal: {
    opacity: 0,
    scale: 0.4,
    transition: { duration: 0.2 },
  },
  animate: {
    opacity: [0.3, 0.95, 0.75],
    scale: [0.8, 1.3, 1.15],
    transition: {
      delay: 0.1,
      duration: 1.2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const LEFT_FLAP_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    originX: "26px",
    originY: "60px",
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  animate: {
    rotate: -48,
    y: -3,
    originX: "26px",
    originY: "60px",
    transition: { type: "spring", stiffness: 220, damping: 14 },
  },
};

const RIGHT_FLAP_VARIANTS: Variants = {
  normal: {
    rotate: 0,
    y: 0,
    originX: "74px",
    originY: "60px",
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
  animate: {
    rotate: 48,
    y: -3,
    originX: "74px",
    originY: "60px",
    transition: { type: "spring", stiffness: 220, damping: 14 },
  },
};

const SEAM_VARIANTS: Variants = {
  normal: {
    opacity: 0.9,
    transition: { duration: 0.2 },
  },
  animate: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const IdeaBoxIcon = forwardRef<IdeaBoxIconHandle, IdeaBoxIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 32, isHovered, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useEffect(() => {
      if (isHovered !== undefined) {
        if (isHovered) {
          controls.start("animate");
        } else {
          controls.start("normal");
        }
      }
    }, [isHovered, controls]);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn("inline-flex items-center justify-center select-none", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          viewBox="0 0 100 100"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <defs>
            <radialGradient id="bulb_halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE047" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="box_front_left" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A1578" />
              <stop offset="100%" stopColor="#2D0B4C" />
            </linearGradient>
            <linearGradient id="box_front_right" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B0F61" />
              <stop offset="100%" stopColor="#1E0533" />
            </linearGradient>
            <linearGradient id="flap_left_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7E22CE" />
              <stop offset="100%" stopColor="#581C87" />
            </linearGradient>
            <linearGradient id="flap_right_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6B21A8" />
              <stop offset="100%" stopColor="#4C1D95" />
            </linearGradient>
          </defs>

          {/* ─── EMERGING BULB & GLOW ─────────────────── */}
          <motion.g animate={controls} initial="normal" variants={BULB_VARIANTS}>
            {/* Glow Aura */}
            <motion.circle
              cx="50"
              cy="34"
              r="24"
              fill="url(#bulb_halo)"
              variants={GLOW_VARIANTS}
            />

            {/* Glowing Light Rays */}
            <motion.g variants={RAYS_VARIANTS}>
              <line x1="50" y1="10" x2="50" y2="4" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
              <line x1="68" y1="18" x2="74" y2="13" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
              <line x1="32" y1="18" x2="26" y2="13" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
              <line x1="75" y1="34" x2="82" y2="34" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
              <line x1="25" y1="34" x2="18" y2="34" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" />
            </motion.g>

            {/* Glass Bulb Body */}
            <path
              d="M 39 42 C 34 38, 33 29, 38 23 C 43 16, 57 16, 62 23 C 67 29, 66 38, 61 42 C 59.5 44.5, 58.5 47, 58.5 49 L 41.5 49 C 41.5 47, 40.5 44.5, 39 42 Z"
              fill="#FEF08A"
              stroke="#FACC15"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Filament */}
            <path
              d="M 46 38 L 47 30 L 50 33 L 53 30 L 54 38"
              stroke="#EA580C"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Screw Base */}
            <line x1="43" y1="52" x2="57" y2="52" stroke="#E9D5FF" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="44.5" y1="55" x2="55.5" y2="55" stroke="#E9D5FF" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 47 55 L 50 58.5 L 53 55" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#A855F7" />
          </motion.g>

          {/* ─── ISOMETRIC BOX ──────────────────────────── */}
          {/* Interior cavity when open */}
          <path
            d="M 26 60 L 50 72 L 74 60 L 50 48 Z"
            fill="#130421"
            stroke="#581C87"
            strokeWidth="1.5"
          />

          {/* Left Side Wall */}
          <path
            d="M 26 60 L 50 72 L 50 92 L 26 80 Z"
            fill="url(#box_front_left)"
            stroke="#C084FC"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Right Side Wall */}
          <path
            d="M 74 60 L 50 72 L 50 92 L 74 80 Z"
            fill="url(#box_front_right)"
            stroke="#A855F7"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Front Center Crease Line */}
          <line
            x1="50"
            y1="72"
            x2="50"
            y2="92"
            stroke="#E9D5FF"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Left Flap / Lid (Hinged at left edge (26,60) - completely covers left half of top when closed) */}
          <motion.path
            animate={controls}
            initial="normal"
            variants={LEFT_FLAP_VARIANTS}
            d="M 26 60 L 50 48 L 50 72 Z"
            fill="url(#flap_left_grad)"
            stroke="#C084FC"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Right Flap / Lid (Hinged at right edge (74,60) - completely covers right half of top when closed) */}
          <motion.path
            animate={controls}
            initial="normal"
            variants={RIGHT_FLAP_VARIANTS}
            d="M 74 60 L 50 48 L 50 72 Z"
            fill="url(#flap_right_grad)"
            stroke="#A855F7"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Top Seam Line (visible when closed) */}
          <motion.line
            animate={controls}
            initial="normal"
            variants={SEAM_VARIANTS}
            x1="50"
            y1="48"
            x2="50"
            y2="72"
            stroke="#E9D5FF"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }
);

IdeaBoxIcon.displayName = "IdeaBoxIcon";

export { IdeaBoxIcon };
