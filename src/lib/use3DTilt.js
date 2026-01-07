import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotionFlag } from "./motion";

/**
 * Custom hook for 3D tilt effect on cards
 * Returns motion values and handlers for mouse-based 3D rotation
 */
export function use3DTilt(options = {}) {
  const reducedMotion = useReducedMotionFlag();
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const {
    maxRotateX = 8,
    maxRotateY = 10,
    springConfig = { stiffness: 120, damping: 18 },
  } = options;

  const rotateX = useTransform(mouseY, [-200, 200], [maxRotateX, -maxRotateX]);
  const rotateY = useTransform(mouseX, [-200, 200], [-maxRotateY, maxRotateY]);
  const rx = useSpring(rotateX, springConfig);
  const ry = useSpring(rotateY, springConfig);

  // Throttle mouse move for better performance
  let rafId = null;
  const handleMouseMove = (e) => {
    if (reducedMotion || !cardRef.current) return;
    
    // Cancel previous frame if pending
    if (rafId) cancelAnimationFrame(rafId);
    
    rafId = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
      rafId = null;
    });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return {
    cardRef,
    rotateX: reducedMotion ? 0 : rx,
    rotateY: reducedMotion ? 0 : ry,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
}

