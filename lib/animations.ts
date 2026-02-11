/* ================================================================== */
/*  Dkapture – Framer Motion Animation Variants & Utilities           */
/*  Cinematic, smooth transitions inspired by film title sequences    */
/* ================================================================== */

/* ------------------------------------------------------------------ */
/*  PAGE TRANSITIONS                                                  */
/* ------------------------------------------------------------------ */
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

/* ------------------------------------------------------------------ */
/*  SCROLL-TRIGGERED ANIMATIONS                                       */
/* ------------------------------------------------------------------ */

/** Fade in + rise 40px */
export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Fade in + blur reveal  */
export const fadeInBlur = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Scale from 0.9 → 1 + fade */
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Slide in from left 60px + fade */
export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/** Slide in from right 60px + fade */
export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  STAGGER CONTAINERS                                                */
/* ------------------------------------------------------------------ */

/** Parent stagger – use with children that have their own variants */
export const staggerContainer = (
  staggerDelay = 0.1,
  delayChildren = 0.2
) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/** Standard child for stagger groups */
export const staggerChild = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ------------------------------------------------------------------ */
/*  HOVER EFFECTS (use with whileHover on motion components)          */
/* ------------------------------------------------------------------ */

/** Card lift – translateY -8px + shadow */
export const liftCard = {
  y: -8,
  transition: { duration: 0.3, ease: "easeOut" },
};

/** Button scale 1.05 */
export const scaleButton = {
  scale: 1.05,
  transition: { duration: 0.2, ease: "easeOut" },
};

/** Glow shadow for orange buttons */
export const glowOnHover = {
  boxShadow: "0 0 30px rgba(255,69,0,0.3)",
  transition: { duration: 0.3, ease: "easeOut" },
};

/* ------------------------------------------------------------------ */
/*  BACKGROUND EFFECTS                                                */
/* ------------------------------------------------------------------ */

/** Breathing radial glow */
export const gradientPulse = {
  scale: [1, 1.08, 1],
  opacity: [0.7, 1, 0.7],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/** Secondary warm glow with offset timing */
export const gradientPulseSecondary = {
  scale: [1.1, 1, 1.1],
  opacity: [0.5, 0.8, 0.5],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay: 1,
  },
};

/* ------------------------------------------------------------------ */
/*  TEXT REVEAL VARIANTS (word-by-word or letter-by-letter)           */
/* ------------------------------------------------------------------ */

export const textRevealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3,
    },
  },
};

export const textRevealWord = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/* ------------------------------------------------------------------ */
/*  VIEWPORT / INTERSECTION OPTIONS                                   */
/* ------------------------------------------------------------------ */

/** 20% visible, trigger once */
export const viewportOnce = { once: true, margin: "-20%" as const };

/** 10% visible, trigger once – for earlier reveal */
export const viewportEarly = { once: true, margin: "-10%" as const };

/** 100px inset – used in most sections */
export const viewport100 = { once: true, margin: "-100px" as const };
