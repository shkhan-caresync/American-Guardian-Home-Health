import React from "react";
import { Sparkles } from "lucide-react";

function SectionTitle({ kicker, title, desc }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/60 bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 px-3 py-1 text-xs font-medium text-cyan-700 backdrop-blur shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
          {kicker}
        </div>
      ) : null}
      <h2 className="mt-5 text-3xl font-semibold tracking-tight leading-tight bg-gradient-to-r from-slate-900 via-cyan-800 to-indigo-900 bg-clip-text text-transparent md:text-5xl pb-1">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg px-2">{desc}</p>
      ) : null}
    </div>
  );
}

export default SectionTitle;

