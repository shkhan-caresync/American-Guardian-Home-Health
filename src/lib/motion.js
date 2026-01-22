import { useEffect, useState } from "react";

/**
 * Premium easing curve for boutique animations
 */
export const premiumEase = [0.16, 1, 0.3, 1];

/**
 * Shared viewport configuration
 */
export const viewportConfig = {
  once: true,
  amount: 0.25,
  margin: "0px 0px -100px 0px",
};

/**
 * Hook to detect reduced motion preference
 */
export function useReducedMotionFlag() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Base animation variants
 */
export const fadeUp = (reducedMotion = false) => ({
  hidden: {
    opacity: reducedMotion ? 1 : 0,
    y: reducedMotion ? 0 : 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0 : 0.6,
      ease: premiumEase,
    },
  },
});

export const fadeIn = (reducedMotion = false) => ({
  hidden: {
    opacity: reducedMotion ? 1 : 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: reducedMotion ? 0 : 0.5,
      ease: premiumEase,
    },
  },
});

export const scaleIn = (reducedMotion = false) => ({
  hidden: {
    opacity: reducedMotion ? 1 : 0,
    scale: reducedMotion ? 1 : 0.98,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: reducedMotion ? 0 : 0.6,
      ease: premiumEase,
    },
  },
});

export const slideInLeft = (reducedMotion = false) => ({
  hidden: {
    opacity: reducedMotion ? 1 : 0,
    x: reducedMotion ? 0 : -16,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: reducedMotion ? 0 : 0.6,
      ease: premiumEase,
    },
  },
});

export const slideInRight = (reducedMotion = false) => ({
  hidden: {
    opacity: reducedMotion ? 1 : 0,
    x: reducedMotion ? 0 : 16,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: reducedMotion ? 0 : 0.6,
      ease: premiumEase,
    },
  },
});

/**
 * Stagger container variant
 */
export const staggerContainer = (reducedMotion = false) => ({
  hidden: { opacity: reducedMotion ? 1 : 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: reducedMotion ? 0 : 0.06, // Reduced from 0.08 for faster feel
      delayChildren: reducedMotion ? 0 : 0.08, // Reduced from 0.1
      ease: premiumEase,
    },
  },
});

/**
 * Card hover variants
 */
export const cardHover = (reducedMotion = false) => ({
  rest: {
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: premiumEase,
    },
  },
  hover: {
    y: reducedMotion ? 0 : -4,
    scale: reducedMotion ? 1 : 1.01,
    transition: {
      duration: 0.3,
      ease: premiumEase,
    },
  },
});

/**
 * Button press variant
 */
export const buttonPress = (reducedMotion = false) => ({
  rest: {
    scale: 1,
  },
  hover: {
    scale: reducedMotion ? 1 : 1.02,
  },
  tap: {
    scale: reducedMotion ? 1 : 0.98,
  },
});

/**
 * Directional slide-in variants for card reveals
 */
export const slideInFromLeft = (reducedMotion = false) => ({
  hidden: {
    opacity: reducedMotion ? 1 : 0,
    x: reducedMotion ? 0 : -40,
    y: reducedMotion ? 0 : 20,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: reducedMotion ? 0 : 0.7,
      ease: premiumEase,
    },
  },
});export const slideInFromRight = (reducedMotion = false) => ({
  hidden: {
    opacity: reducedMotion ? 1 : 0,
    x: reducedMotion ? 0 : 40,
    y: reducedMotion ? 0 : 20,
  },
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: reducedMotion ? 0 : 0.7,
      ease: premiumEase,
    },
  },
});

export const slideInFromBottom = (reducedMotion = false) => ({
  hidden: {
    opacity: reducedMotion ? 1 : 0,
    y: reducedMotion ? 0 : 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0 : 0.7,
      ease: premiumEase,
    },
  },
});/**
 * Icon hover animation variant
 */
export const iconHover = (reducedMotion = false) => ({
  rest: {
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: premiumEase,
    },
  },
  hover: {
    rotate: reducedMotion ? 0 : [0, -10, 10, 0],
    scale: reducedMotion ? 1 : 1.1,
    transition: {
      duration: 0.4,
      ease: premiumEase,
    },
  },
});

/**
 * Floating animation variant (for badges, cards, etc.)
 */
export const floatAnimation = (reducedMotion = false) => ({
  animate: reducedMotion
    ? {}
    : {
        y: [0, -8, 0],
      },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
});

/**
 * Glow pulse animation variant
 */
export const glowPulse = (reducedMotion = false) => ({
  animate: reducedMotion
    ? {}
    : {
        opacity: [0.4, 0.7, 0.4],
        scale: [1, 1.05, 1],
      },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
});

/**
 * Text reveal animation (word by word)
 */
export const textReveal = (reducedMotion = false) => ({
  hidden: {
    opacity: reducedMotion ? 1 : 0,
    y: reducedMotion ? 0 : 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0 : 0.6,
      ease: premiumEase,
      staggerChildren: reducedMotion ? 0 : 0.03,
    },
  },
});
