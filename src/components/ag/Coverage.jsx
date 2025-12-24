import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, CheckCircle2, Clock, MapPin, Shield } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";

function Coverage() {
  return (
    <section id="coverage" className="relative bg-gradient-to-b from-emerald-50/40 via-white to-teal-50/40 py-12 sm:py-16 lg:py-20 scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.08),rgba(34,211,238,0.06),rgba(255,255,255,0)_60%)]" />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <SectionTitle
          kicker="Coverage"
          title="Service areas we serve today"
          desc="Licensed home health services across the Sacramento region with rapid start of care for eligible patients."
        />

        <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-6 lg:grid-cols-12">
          <GlassCard className="lg:col-span-7">
            <div className="p-0 overflow-hidden">
              {/* Coverage Map Image */}
              <div className="relative h-56 sm:h-72 md:h-80 lg:h-96 w-full">
                <img
                  src="/images/coverage-map.png"
                  alt="Service coverage area map"
                  className="w-full h-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/40" />
              </div>
              
              <div className="p-5 sm:p-7 md:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-semibold text-slate-900">Agency location</div>
                    <div className="mt-1 text-base text-slate-600 leading-relaxed">
                      9343 Tech Center Dr, Suite 140
                      <br />
                      Sacramento, CA 95826-2579
                    </div>
                    <div className="mt-4 text-base font-semibold text-slate-900">Primary region</div>
                    <div className="mt-1 text-base text-slate-600 leading-relaxed">Sacramento • Elk Grove • Roseville • Folsom</div>
                  </div>
                  <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-cyan-500" />
                  </div>
                </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Start of Care within 24–48 hours (when eligible)", "RN-led plan of care", "Family communication protocols", "Therapy coordination"].map((t) => (
                  <div key={t} className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span className="text-base text-slate-700 leading-relaxed">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Shield className="h-4 w-4 text-cyan-500" />
                  Insurance & eligibility
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  We currently accept traditional Medicare and select Medicare Advantage and commercial plans in the Sacramento area.
                  During intake we verify benefits, confirm homebound status when required, and walk families through any out‑of‑pocket costs.
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
              >
                <GlassCard className="p-7">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Rapid intake</div>
                      <div className="mt-1 text-sm text-slate-600">Streamlined documents & scheduling</div>
                    </div>
                    <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3">
                      <Clock className="h-6 w-6 text-cyan-500" />
                    </div>
                  </div>
                  <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      className="h-full rounded-full bg-cyan-500"
                      initial={{ x: "-30%" }}
                      animate={{ x: ["-30%", "120%"] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-4 text-sm text-slate-600">
                    A high-touch process that feels effortless: clear checklists, fast callbacks, and clinician-led planning.
                  </p>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: 0.08, duration: 0.7, ease: "easeOut" }}
              >
                <GlassCard className="p-7">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Care quality</div>
                      <div className="mt-1 text-sm text-slate-600">Consistency, documentation, outcomes</div>
                    </div>
                    <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3">
                      <BadgeCheck className="h-6 w-6 text-cyan-500" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600">
                    Built like a modern product: standardized workflows, reliable follow-through, and a premium family experience.
                  </p>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Service areas and CTAs */}
        <div className="mt-8 sm:mt-10 grid gap-6 border-t border-slate-200 pt-6 sm:pt-8 lg:grid-cols-3 text-sm text-slate-700">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Service Areas</div>
            <div className="mt-2 text-sm font-semibold text-slate-900">Primary hubs</div>
            <p className="mt-1 text-sm text-slate-600">
              Sacramento metro, including Sacramento, Elk Grove, Roseville, and Folsom.
            </p>
            <div className="mt-3 text-sm font-semibold text-slate-900">Approved California counties</div>
            <p className="mt-1 text-sm text-slate-600">
              Alpine, Amador, Butte, Calaveras, Colusa, Contra Costa, El Dorado, Glenn, Lake, Napa, Nevada, Placer, Sacramento,
              San Joaquin, Sierra, Solano, Sonoma, Stanislaus, Sutter, Tuolumne, Yolo, and Yuba.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Coverage varies by clinical need and staffing availability.
            </p>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-2xl border border-cyan-200 bg-white px-5 py-3 text-sm font-semibold text-cyan-700 shadow-sm transition hover:bg-cyan-50 hover:border-cyan-300 min-h-[44px]"
            >
              Check availability
            </a>
            <a
              href="tel:+19165733231"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 transition min-h-[44px]"
            >
              Call +1 (916) 573-3231
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Coverage;

