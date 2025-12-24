import React from "react";
import { motion } from "framer-motion";
import { useReducedMotionFlag, fadeUp, staggerContainer, viewportConfig } from "../../lib/motion";

// Uses the same values already displayed in the Hero stats.
const stats = [
  { label: "Patients served", value: "1,200+", detail: "Supported with in‑home nursing and therapy" },
  { label: "Avg. response", value: "24h", detail: "From first contact to initial follow-up" },
  { label: "Care satisfaction", value: "98%", detail: "Families reporting they would recommend us" },
];

function StatsBand() {
  const reducedMotion = useReducedMotionFlag();
  const containerVariants = staggerContainer(reducedMotion);

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={containerVariants}
      className="relative bg-gradient-to-r from-cyan-50 via-white to-indigo-50 py-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(59,130,246,0.10),transparent_55%),radial-gradient(circle_at_right,rgba(34,211,238,0.10),transparent_55%)]" />
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 xl:px-12">
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp(reducedMotion)} className="flex flex-col">
            <div className="text-3xl font-semibold tracking-tight text-slate-900">{s.value}</div>
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-500 mt-0.5">{s.label}</div>
            <div className="mt-1 text-sm text-slate-600">{s.detail}</div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default StatsBand;


