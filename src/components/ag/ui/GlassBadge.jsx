import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { useReducedMotionFlag, iconHover } from "../../../lib/motion";

/**
 * Glass-style badge component for certifications and tags
 * Features glassmorphism with subtle animations
 */
function GlassBadge({ 
  icon: Icon, 
  title, 
  subtitle, 
  className,
  colorScheme = "cyan",
  floating = false 
}) {
  const reducedMotion = useReducedMotionFlag();
  const iconVariants = iconHover(reducedMotion);

  const colorSchemes = {
    cyan: {
      border: "border-cyan-200/60",
      bg: "from-cyan-50/80 via-white/60 to-blue-50/80",
      iconBg: "from-cyan-100/90 to-blue-100/90",
      iconColor: "text-cyan-600",
      text: "text-slate-900",
      subtitle: "text-slate-600",
    },
    emerald: {
      border: "border-emerald-200/60",
      bg: "from-emerald-50/80 via-white/60 to-teal-50/80",
      iconBg: "from-emerald-100/90 to-teal-100/90",
      iconColor: "text-emerald-600",
      text: "text-slate-900",
      subtitle: "text-slate-600",
    },
    purple: {
      border: "border-purple-200/60",
      bg: "from-purple-50/80 via-white/60 to-pink-50/80",
      iconBg: "from-purple-100/90 to-pink-100/90",
      iconColor: "text-purple-600",
      text: "text-slate-900",
      subtitle: "text-slate-600",
    },
    blue: {
      border: "border-blue-200/60",
      bg: "from-blue-50/80 via-white/60 to-indigo-50/80",
      iconBg: "from-blue-100/90 to-indigo-100/90",
      iconColor: "text-blue-600",
      text: "text-slate-900",
      subtitle: "text-slate-600",
    },
  };

  const colors = colorSchemes[colorScheme] || colorSchemes.cyan;

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border backdrop-blur-lg",
        "bg-gradient-to-br shadow-[0_8px_32px_-12px_rgba(14,116,144,0.25)]",
        "ring-1 ring-white/50",
        colors.border,
        colors.bg,
        floating && !reducedMotion && "animate-[float_6s_ease-in-out_infinite]",
        "[will-change:transform,backdrop-filter]",
        "[transform:translateZ(0)]",
        "[contain:layout_style_paint]",
        className
      )}
      whileHover={{ scale: reducedMotion ? 1 : 1.02, y: reducedMotion ? 0 : -2 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glass effects */}
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/80 via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.0)_50%,rgba(255,255,255,0.15)_100%)]" />
      </div>

      <div className="relative p-4 flex items-center gap-3">
        {Icon && (
          <motion.div
            className={cn(
              "rounded-xl border bg-gradient-to-br p-2.5 shadow-sm flex-shrink-0",
              colors.iconBg,
              colors.border
            )}
            variants={iconVariants}
            initial="rest"
            whileHover="hover"
          >
            <Icon className={cn("h-5 w-5", colors.iconColor)} />
          </motion.div>
        )}
        <div className="min-w-0 flex-1">
          <div className={cn("text-sm font-semibold", colors.text)}>{title}</div>
          {subtitle && (
            <div className={cn("mt-0.5 text-xs", colors.subtitle)}>{subtitle}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default GlassBadge;

