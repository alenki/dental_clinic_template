import type { Variants } from "motion/react";

/**
 * Motion tokens. Every animation on the site resolves to one of these. The
 * design brief spends its boldness on the hero tracking release and the Enamel
 * Scale, so everything else stays quiet and consistent.
 *
 * Everything exported here is used. An earlier version also shipped `easeInOut`,
 * a `duration` map, a `transition` map and `staggerParent`, none of which any
 * component ever imported — a second, parallel vocabulary for the same job.
 */

export const ease = [0.22, 1, 0.36, 1] as const;

/** Standard scroll reveal: a short rise plus a fade. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease },
  },
};

/** Reduced-motion equivalent: same states, no movement, no delay. */
export const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

/** Shared viewport trigger so reveals fire at the same point everywhere. */
export const viewport = { once: true, margin: "-12% 0px" } as const;

/** A hairline rule that draws in from the left. */
export const ruleVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease },
  },
};
