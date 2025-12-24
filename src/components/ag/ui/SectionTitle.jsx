import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useReducedMotionFlag, fadeUp, staggerContainer, viewportConfig } from "../../../lib/motion";

function SectionTitle({ kicker, title, desc }) {
  const reducedMotion = useReducedMotionFlag();
  const containerVariants = staggerContainer(reducedMotion);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      className="mx-auto max-w-2xl text-center"
    >
      {kicker ? (
        <motion.div
          variants={fadeUp(reducedMotion)}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-300/60 bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 px-3 py-1 text-xs font-medium text-cyan-700 backdrop-blur shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
          {kicker}
        </motion.div>
      ) : null}
      <motion.h2
        variants={fadeUp(reducedMotion)}
        className="mt-4 sm:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight bg-gradient-to-r from-slate-900 via-cyan-800 to-indigo-900 bg-clip-text text-transparent pb-1"
      >
        {title}
      </motion.h2>
      {desc ? (
        <motion.p
          variants={fadeUp(reducedMotion)}
          className="mt-2 sm:mt-3 text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 px-2"
        >
          {desc}
        </motion.p>
      ) : null}
    </motion.div>
  );
}

export default SectionTitle;

