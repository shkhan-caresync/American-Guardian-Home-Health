import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, CheckCircle2, Clock, MapPin, Shield } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";

function Coverage() {
  return (
    <section id="coverage" className="relative bg-gradient-to-b from-emerald-50/40 via-white to-teal-50/40 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.08),rgba(34,211,238,0.06),rgba(255,255,255,0)_60%)]" />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <SectionTitle
          kicker="Coverage"
          title="Service areas, designed for speed"
          desc="Update this section with your actual service counties/cities and payer mix."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <GlassCard className="lg:col-span-7">
            <div className="p-0 overflow-hidden">
              {/* Coverage Map Image */}
              <div className="relative h-64 sm:h-80 lg:h-96 w-full">
                <img
                  src="/images/coverage-map.png"
                  alt="Service coverage area map"
                  className="w-full h-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40" />
              </div>
              
              <div className="p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Primary region</div>
                    <div className="mt-1 text-sm text-slate-600">Sacramento • Elk Grove • Roseville • Folsom • Surrounding</div>
                  </div>
                  <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3">
                    <MapPin className="h-6 w-6 text-cyan-500" />
                  </div>
                </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Start of Care within 24–48 hours (when eligible)", "RN-led plan of care", "Family communication protocols", "Therapy coordination"].map((t) => (
                  <div key={t} className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm text-slate-700">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Shield className="h-4 w-4 text-cyan-500" />
                  Insurance & eligibility (placeholder)
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  We can verify coverage and confirm service availability quickly. Replace this copy with
                  your exact payer types (Medicare/Commercial/Private Pay) and intake workflow.
                </p>
              </div>
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-5">
            <div className="grid gap-6">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="pointer-events-none absolute inset-0 opacity-50">
                  <div className="absolute -top-24 left-10 h-64 w-64 rounded-full bg-cyan-100/40 blur-3xl" />
                </div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Rapid intake</div>
                    <div className="mt-1 text-sm text-slate-600">Streamlined documents & scheduling</div>
                  </div>
                  <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3">
                    <Clock className="h-6 w-6 text-cyan-500" />
                  </div>
                </div>
                <div className="relative mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <motion.div
                    className="h-full rounded-full bg-cyan-500"
                    initial={{ x: "-30%" }}
                    animate={{ x: ["-30%", "120%"] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  />
                </div>
                <p className="relative mt-4 text-sm text-slate-600">
                  A high-touch process that feels effortless: clear checklists, fast callbacks, and clinician-led planning.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: 0.08, duration: 0.7, ease: "easeOut" }}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="pointer-events-none absolute inset-0 opacity-50">
                  <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-sky-100/40 blur-3xl" />
                </div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Care quality</div>
                    <div className="mt-1 text-sm text-slate-600">Consistency, documentation, outcomes</div>
                  </div>
                  <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3">
                    <BadgeCheck className="h-6 w-6 text-cyan-500" />
                  </div>
                </div>
                <p className="relative mt-4 text-sm text-slate-600">
                  Built like a modern product: standardized workflows, reliable follow-through, and a premium family experience.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Coverage;

