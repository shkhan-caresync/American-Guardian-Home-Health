import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { useReducedMotionFlag, cardHover, premiumEase } from "../../../lib/motion";
import { use3DTilt } from "../../../lib/use3DTilt";

function GlassCard({ children, className, disable3DTilt = false }) {
  const reducedMotion = useReducedMotionFlag();
  const hoverVariants = cardHover(reducedMotion);
  const tiltProps = disable3DTilt 
    ? { cardRef: null, rotateX: 0, rotateY: 0, onMouseMove: undefined, onMouseLeave: undefined }
    : use3DTilt({
        maxRotateX: 6,
        maxRotateY: 8,
      });
  
  const { cardRef, rotateX, rotateY, onMouseMove, onMouseLeave } = tiltProps;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      variants={hoverVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      style={{
        rotateX: disable3DTilt ? undefined : rotateX,
        rotateY: disable3DTilt ? undefined : rotateY,
        transformStyle: disable3DTilt ? undefined : "preserve-3d",
        willChange: disable3DTilt ? "transform" : "transform, opacity",
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-white/75 via-white/65 to-cyan-50/40",
        "shadow-[0_28px_80px_-40px_rgba(14,116,144,0.35)] ring-1 ring-cyan-200/60 backdrop-blur-xl",
        "group",
        "will-change-transform",
        "[transform:translateZ(0)]",
        "[contain:layout_style_paint]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        {/* top highlight */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/90 via-cyan-50/40 to-transparent" />
        {/* subtle inner glow */}
        <div className="absolute inset-6 rounded-[26px] border border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]" />
        {/* vibrant color blooms - reduced blur for performance */}
        <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-cyan-300/50 blur-2xl [will-change:filter] [transform:translateZ(0)]" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-blue-300/45 blur-2xl [will-change:filter] [transform:translateZ(0)]" />
        <div className="absolute top-16 right-1/3 h-32 w-32 rounded-full bg-purple-300/40 blur-xl [will-change:filter] [transform:translateZ(0)]" />
        <div className="absolute bottom-12 left-1/4 h-24 w-24 rounded-full bg-pink-300/35 blur-lg [will-change:filter] [transform:translateZ(0)]" />
        <div className="absolute top-1/2 left-1/2 h-20 w-20 rounded-full bg-emerald-300/30 blur-md [will-change:filter] [transform:translateZ(0)]" />
        {/* diagonal sheen */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.20) 0%,rgba(200,230,255,0.08) 25%,rgba(255,255,255,0.0) 45%,rgba(255,200,230,0.08) 75%,rgba(255,255,255,0.20) 100%)] opacity-80" />
        {/* subtle shine on hover */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_100%)]"
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{
            x: reducedMotion ? "-100%" : "100%",
            opacity: reducedMotion ? 0 : [0, 0.3, 0],
          }}
          transition={{
            duration: reducedMotion ? 0 : 0.6,
            ease: premiumEase,
          }}
        />
      </div>
      <div className="relative">{children}</div>
    </motion.div>
  );
}

export default GlassCard;

