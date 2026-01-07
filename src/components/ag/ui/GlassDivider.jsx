import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { useReducedMotionFlag } from "../../../lib/motion";

/**
 * Glass-style divider component
 * Features glassmorphism with animated gradient
 */
function GlassDivider({ 
  className,
  animated = true,
  variant = "default" // "default" | "thick" | "subtle"
}) {
  const reducedMotion = useReducedMotionFlag();

  const variants = {
    default: "h-px",
    thick: "h-[2px]",
    subtle: "h-[0.5px]",
  };

  return (
    <motion.div
      className={cn(
        "relative w-full overflow-hidden rounded-full",
        variants[variant],
        className
      )}
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      {animated && !reducedMotion && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </motion.div>
  );
}

export default GlassDivider;



