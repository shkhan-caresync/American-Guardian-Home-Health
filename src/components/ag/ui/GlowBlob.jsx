import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

function GlowBlob({ className, delay = 0 }) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-2xl",
        "bg-[radial-gradient(circle_at_30%_30%,rgba(51,211,213,0.55),rgba(51,211,213,0.0)_60%)]",
        "[will-change:transform,opacity,filter]",
        "[transform:translateZ(0)]",
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: [0.35, 0.55, 0.35],
        scale: [0.95, 1.08, 0.95],
        x: [0, 18, -10, 0],
        y: [0, -10, 12, 0],
      }}
      transition={{
        delay,
        duration: 12,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      aria-hidden="true"
    />
  );
}

export default GlowBlob;

