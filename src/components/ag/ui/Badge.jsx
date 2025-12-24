import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";
import { useReducedMotionFlag, cardHover, fadeUp, viewportConfig } from "../../../lib/motion";

function Badge({ icon: Icon, title, desc, colorScheme = "cyan", image, imageClass }) {
  const reducedMotion = useReducedMotionFlag();
  const hoverVariants = cardHover(reducedMotion);
  const colorSchemes = {
    cyan: {
      border: "border-cyan-300/60",
      bg: "bg-gradient-to-br from-cyan-50/90 via-white/80 to-blue-50/90",
      ring: "ring-cyan-200/60",
      iconBg: "bg-gradient-to-br from-cyan-100 to-blue-100",
      iconBorder: "border-cyan-300/50",
      iconColor: "text-cyan-600",
      dotColor: "bg-cyan-500",
      dotGlow: "rgba(59,201,219,0.25)",
      glow1: "bg-cyan-300/50",
      glow2: "bg-blue-300/45",
      glow3: "bg-indigo-200/35",
    },
    purple: {
      border: "border-purple-300/60",
      bg: "bg-gradient-to-br from-purple-50/90 via-white/80 to-pink-50/90",
      ring: "ring-purple-200/60",
      iconBg: "bg-gradient-to-br from-purple-100 to-pink-100",
      iconBorder: "border-purple-300/50",
      iconColor: "text-purple-600",
      dotColor: "bg-purple-500",
      dotGlow: "rgba(168,85,247,0.25)",
      glow1: "bg-purple-300/50",
      glow2: "bg-pink-300/45",
      glow3: "bg-rose-200/35",
    },
    emerald: {
      border: "border-emerald-300/60",
      bg: "bg-gradient-to-br from-emerald-50/90 via-white/80 to-teal-50/90",
      ring: "ring-emerald-200/60",
      iconBg: "bg-gradient-to-br from-emerald-100 to-teal-100",
      iconBorder: "border-emerald-300/50",
      iconColor: "text-emerald-600",
      dotColor: "bg-emerald-500",
      dotGlow: "rgba(16,185,129,0.25)",
      glow1: "bg-emerald-300/50",
      glow2: "bg-teal-300/45",
      glow3: "bg-cyan-200/35",
    },
    orange: {
      border: "border-orange-300/60",
      bg: "bg-gradient-to-br from-orange-50/90 via-white/80 to-amber-50/90",
      ring: "ring-orange-200/60",
      iconBg: "bg-gradient-to-br from-orange-100 to-amber-100",
      iconBorder: "border-orange-300/50",
      iconColor: "text-orange-600",
      dotColor: "bg-orange-500",
      dotGlow: "rgba(249,115,22,0.25)",
      glow1: "bg-orange-300/50",
      glow2: "bg-amber-300/45",
      glow3: "bg-yellow-200/35",
    },
  };

  const colors = colorSchemes[colorScheme] || colorSchemes.cyan;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={hoverVariants}
      viewport={viewportConfig}
      className={`group relative overflow-hidden rounded-2xl border ${colors.border} ${colors.bg} p-5 shadow-[0_18px_50px_-30px_rgba(14,116,144,0.28)] ring-1 ${colors.ring} backdrop-blur-2xl transition-shadow hover:shadow-[0_22px_60px_-28px_rgba(14,116,144,0.38)]`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/80 via-white/30 to-transparent" />
        <div className={`absolute -left-16 -top-20 h-56 w-56 rounded-full ${colors.glow1} blur-3xl`} />
        <div className={`absolute -right-16 -bottom-20 h-56 w-56 rounded-full ${colors.glow2} blur-3xl`} />
        <div className={`absolute right-6 top-10 h-14 w-14 rounded-full ${colors.glow3} blur-2xl`} />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16) 0%,rgba(255,255,255,0.0) 45%,rgba(255,255,255,0.16) 100%)]" />
      </div>

      <div className="relative">
        {/* Service Image */}
        {image && (
          <div className="relative mb-4 rounded-xl overflow-hidden h-40 -mx-1">
            <img
              src={image}
              alt={title}
              className={cn("w-full h-full object-cover", imageClass || "object-[center_30%]")}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent" />
          </div>
        )}

        <div className="flex items-start gap-4">
          <div className={`rounded-2xl border ${colors.iconBorder} ${colors.iconBg} p-3 shadow-inner flex-shrink-0`}>
            <Icon className={`h-6 w-6 ${colors.iconColor}`} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
              <span className={`h-1 w-1 rounded-full ${colors.dotColor}`} style={{ boxShadow: `0 0 0 4px ${colors.dotGlow}` }} />
            </div>
            <p className="mt-1 text-base leading-relaxed text-slate-600">{desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Badge;

