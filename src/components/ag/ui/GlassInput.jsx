import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { useReducedMotionFlag } from "../../../lib/motion";

/**
 * Glass-style input field component
 * Features glassmorphism with focus animations
 */
function GlassInput({ 
  className,
  ...props 
}) {
  const reducedMotion = useReducedMotionFlag();

  return (
    <motion.input
      whileFocus={{ 
        scale: reducedMotion ? 1 : 1.01,
        borderColor: "rgb(6, 182, 212)",
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "h-12 rounded-2xl border border-white/60 bg-white/40 backdrop-blur-lg",
        "px-4 text-base text-slate-900 outline-none",
        "placeholder:text-slate-400",
        "focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-200/50",
        "shadow-[0_4px_16px_-8px_rgba(14,116,144,0.15)]",
        "transition-all duration-200",
        "[will-change:transform,backdrop-filter]",
        "[transform:translateZ(0)]",
        className
      )}
      {...props}
    />
  );
}

export default GlassInput;

