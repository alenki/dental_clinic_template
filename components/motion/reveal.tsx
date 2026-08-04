"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ease, revealVariants, ruleVariants, staticVariants, viewport } from "@/lib/motion";
import { useReducedMotionSafe } from "@/components/motion/use-reduced-motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Use sparingly and prefer <Stagger> for groups. */
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
};

/**
 * The single scroll-reveal primitive. Every fade-in on the site goes through
 * here so timing stays identical across routes.
 */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotionSafe();
  const Component = motion[as];

  return (
    <Component
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reduced ? staticVariants : revealVariants}
      transition={reduced ? undefined : { duration: 0.7, ease, delay }}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  as?: "div" | "ul" | "ol" | "section" | "dl";
};

/** Parent for a group of <StaggerItem> children. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  as = "div",
}: StaggerProps) {
  const reduced = useReducedMotionSafe();
  const Component = motion[as];

  return (
    <Component
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: {
          transition: reduced
            ? {}
            : { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "dt" | "dd";
}) {
  const reduced = useReducedMotionSafe();
  const Component = motion[as];

  return (
    <Component
      data-reveal=""
      className={className}
      variants={reduced ? staticVariants : revealVariants}
    >
      {children}
    </Component>
  );
}

/** A hairline that draws in from the left. Used to open sections. */
export function DrawRule({ className }: { className?: string }) {
  const reduced = useReducedMotionSafe();

  return (
    <motion.div
      data-reveal=""
      className={className ?? "h-px w-full bg-ink/12 origin-left"}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={reduced ? { hidden: { scaleX: 1 }, visible: { scaleX: 1 } } : ruleVariants}
    />
  );
}
