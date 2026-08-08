"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export const SPRING = { type: "spring", stiffness: 260, damping: 24, mass: 0.9 } as const;

const OFFSETS: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 42 },
  down: { x: 0, y: -42 },
  left: { x: 56, y: 0 },
  right: { x: -56, y: 0 },
  zoom: { x: 0, y: 0 },
};

export type Direction = "up" | "down" | "left" | "right" | "zoom";

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  blur = true,
  spring = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  blur?: boolean;
  spring?: boolean;
}) {
  const from = OFFSETS[direction];
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: from.x,
        y: from.y,
        scale: direction === "zoom" ? 0.9 : 1,
        filter: blur ? "blur(10px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-70px" }}
      transition={
        spring
          ? { ...SPRING, delay }
          : { duration: 0.8, delay, ease: EASE }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.96, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 230, damping: 22 },
  },
};

export function Stagger({
  children,
  className,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

export { EASE };
