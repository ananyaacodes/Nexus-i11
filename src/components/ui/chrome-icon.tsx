"use client";

import type { Variants } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";

export interface ChromeIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChromeIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  isHovered?: boolean;
}

const VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  animate: (custom: number) => ({
    pathLength: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 0.5,
      delay: 0.08 * custom,
      ease: "easeInOut",
    },
  }),
};

const ChromeIcon = forwardRef<ChromeIconHandle, ChromeIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, isHovered, ...props }, ref) => {
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
        <motion.svg
          animate={controls}
          variants={{
            normal: {
              rotate: 0,
              scale: 1,
              transition: { duration: 0.3, ease: "easeOut" },
            },
            animate: {
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              transition: {
                duration: 0.75,
                ease: "easeInOut",
              },
            },
          }}
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            animate={controls}
            custom={0}
            variants={VARIANTS}
          />
          <motion.circle
            animate={controls}
            custom={1}
            cx="12"
            cy="12"
            r="4"
            variants={VARIANTS}
          />
          <motion.line
            animate={controls}
            custom={2}
            variants={VARIANTS}
            x1="21.17"
            x2="12"
            y1="8"
            y2="8"
          />
          <motion.line
            animate={controls}
            custom={3}
            variants={VARIANTS}
            x1="3.95"
            x2="8.54"
            y1="6.06"
            y2="14"
          />
          <motion.line
            animate={controls}
            custom={4}
            variants={VARIANTS}
            x1="10.88"
            x2="15.46"
            y1="21.94"
            y2="14"
          />
        </motion.svg>
      </div>
    );
  }
);

ChromeIcon.displayName = "ChromeIcon";

export { ChromeIcon };
