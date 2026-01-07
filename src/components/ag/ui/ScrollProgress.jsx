import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotionFlag } from "../../../lib/motion";

/**
 * Scroll progress indicator - shows scroll position at top of page
 */
function ScrollProgress() {
  const reducedMotion = useReducedMotionFlag();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 origin-left z-[100] [will-change:transform] [transform:translateZ(0)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

export default ScrollProgress;

