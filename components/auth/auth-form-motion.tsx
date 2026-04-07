import type { Easing, Transition, Variants } from "framer-motion";

export const authEase: Easing = [0.22, 1, 0.36, 1];

export const authItemTransition: Transition = {
  duration: 0.42,
  ease: authEase,
};

export const authContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const authItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: authItemTransition,
  },
};

export const authFeedbackVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.985,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.28,
      ease: authEase,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.985,
    transition: {
      duration: 0.18,
      ease: "easeIn",
    },
  },
};

export const authPageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};