import type { Easing, Transition, Variants } from "framer-motion";

export const easeBezier: Easing = [0.22, 1, 0.36, 1];

export const springSmooth: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 22,
  mass: 0.9,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 20,
  mass: 0.8,
};

export const easeSoft: Transition = {
  duration: 0.6,
  ease: easeBezier,
};

export const pageReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: easeBezier,
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const sectionReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springSmooth,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    rotateX: 8,
    transformPerspective: 1200,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transformPerspective: 1200,
    transition: {
      type: "spring",
      stiffness: 170,
      damping: 20,
      mass: 0.95,
    },
  },
};

export const floatingOrb: Variants = {
  initial: {
    y: 0,
    x: 0,
    scale: 1,
  },
  animate: {
    y: [-10, 12, -8],
    x: [0, 10, -6],
    scale: [1, 1.05, 0.98],
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

export const pulseGlow: Variants = {
  initial: {
    opacity: 0.35,
    scale: 0.96,
  },
  animate: {
    opacity: [0.35, 0.6, 0.4],
    scale: [0.96, 1.03, 0.99],
    transition: {
      duration: 4.8,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

export const panelSlideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -18,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: easeBezier,
    },
  },
};

export const panelSlideRight: Variants = {
  hidden: {
    opacity: 0,
    x: 18,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: easeBezier,
    },
  },
};

export const panelSlideUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.42,
      ease: easeBezier,
    },
  },
};

export const subtlePulse: Variants = {
  initial: {
    opacity: 0.82,
    scale: 1,
  },
  animate: {
    opacity: [0.82, 1, 0.88],
    scale: [1, 1.015, 1],
    transition: {
      duration: 2.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};