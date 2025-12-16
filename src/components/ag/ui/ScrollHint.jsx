import React from "react";
import { motion } from "framer-motion";
import { Stars } from "lucide-react";

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="mt-10 flex items-center justify-center"
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur"
      >
        <Stars className="h-3.5 w-3.5 text-cyan-300/90" />
        Scroll to explore
      </motion.div>
    </motion.div>
  );
}

export default ScrollHint;

