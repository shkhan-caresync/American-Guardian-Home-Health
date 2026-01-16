import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { useReducedMotionFlag } from "../../../lib/motion";

/**
 * Glass-style select dropdown component
 * Features glassmorphism with focus animations
 */
function GlassSelect({ 
  className,
  children,
  ...props 
}) {
  const reducedMotion = useReducedMotionFlag();

  return (
    <motion.select
      whileFocus={{ 
        scale: reducedMotion ? 1 : 1.01,
        borderColor: "rgb(6, 182, 212)",
      }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "h-12 rounded-2xl border border-white/60 bg-white/40 backdrop-blur-lg",
        "px-4 text-base text-slate-900 outline-none",
        "focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-200/50",
        "shadow-[0_4px_16px_-8px_rgba(14,116,144,0.15)]",
        "transition-all duration-200",
        "[will-change:transform,backdrop-filter]",
        "[transform:translateZ(0)]",
        "appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23334155%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E')] bg-[length:20px] bg-[right_12px_center] bg-no-repeat pr-10",
        className
      )}
      {...props}
    >
      {children}
    </motion.select>
  );
}

export default GlassSelect;


