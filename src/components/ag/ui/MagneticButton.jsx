import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "../../../utils/cn";
import { useReducedMotionFlag, buttonPress } from "../../../lib/motion";

function MagneticButton({ children, className, onClick }) {
  const reducedMotion = useReducedMotionFlag();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 18 });
  const sy = useSpring(my, { stiffness: 260, damping: 18 });
  const buttonVariants = buttonPress(reducedMotion);

  const handleMove = (e) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - (r.left + r.width / 2);
    const py = e.clientY - (r.top + r.height / 2);
    mx.set(px * 0.14);
    my.set(py * 0.14);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: reducedMotion ? 0 : sx, y: reducedMotion ? 0 : sy }}
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold",
        "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-600",
        "ring-1 ring-cyan-200 transition-all min-h-[44px]",
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.65),rgba(255,255,255,0)_55%)] opacity-70" />
      <span className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-[linear-gradient(90deg,rgba(51,211,213,0.65),rgba(255,255,255,0.15),rgba(51,211,213,0.55))] opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </motion.button>
  );
}

export default MagneticButton;

