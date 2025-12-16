import React from "react";
import { cn } from "../../../utils/cn";

function GlassCard({ children, className }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-br from-white/75 via-white/65 to-cyan-50/40",
        "shadow-[0_28px_80px_-40px_rgba(14,116,144,0.35)] ring-1 ring-cyan-200/60 backdrop-blur-2xl",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        {/* top highlight */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/90 via-cyan-50/40 to-transparent" />
        {/* subtle inner glow */}
        <div className="absolute inset-6 rounded-[26px] border border-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]" />
        {/* vibrant color blooms */}
        <div className="absolute -top-24 left-8 h-72 w-72 rounded-full bg-cyan-300/50 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-blue-300/45 blur-3xl" />
        <div className="absolute top-16 right-1/3 h-32 w-32 rounded-full bg-purple-300/40 blur-2xl" />
        <div className="absolute bottom-12 left-1/4 h-24 w-24 rounded-full bg-pink-300/35 blur-2xl" />
        <div className="absolute top-1/2 left-1/2 h-20 w-20 rounded-full bg-emerald-300/30 blur-xl" />
        {/* diagonal sheen */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.20) 0%,rgba(200,230,255,0.08) 25%,rgba(255,255,255,0.0) 45%,rgba(255,200,230,0.08) 75%,rgba(255,255,255,0.20) 100%)] opacity-80" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

export default GlassCard;

