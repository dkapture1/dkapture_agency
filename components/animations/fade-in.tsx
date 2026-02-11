"use client";

import { type ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  delay?: number;
  blur?: boolean;
  once?: boolean;
  margin?: string;
};

const directionMap = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

export function FadeIn({
  children,
  className = "",
  direction = "up",
  distance = 40,
  duration = 0.6,
  delay = 0,
  blur = false,
  once = true,
  margin = "-100px",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as "-100px" });
  const dir = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: dir.x * distance,
        y: dir.y * distance,
        filter: blur ? "blur(10px)" : "blur(0px)",
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
