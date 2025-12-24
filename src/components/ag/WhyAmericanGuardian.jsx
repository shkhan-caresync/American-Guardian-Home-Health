import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";
import GlowBlob from "./ui/GlowBlob";

function WhyAmericanGuardian() {
  return (
    <section id="why" className="relative bg-transparent py-12 sm:py-16 lg:py-20">
      <GlowBlob className="-left-32 top-10 h-80 w-80 opacity-70" delay={0.1} />
      <GlowBlob className="right-0 bottom-0 h-80 w-80 opacity-60" delay={0.4} />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <SectionTitle
          kicker="Why American Guardian"
          title="Everyone deserves confident care at home."
          desc="American Guardian Home Health delivers clinician-led care plans designed around safety, clarity, and reliability. Our focus is helping patients recover and manage conditions at home with confidence."
        />

        <div className="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <GlassCard className="h-full p-0 overflow-hidden">
              <div className="relative h-64 sm:h-80 w-full">
                <img
                  src="/images/why-coordination.png"
                  alt="Care coordination"
                  className="w-full h-full object-cover object-[center_30%]"
                />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/70 via-white/40 to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-base leading-relaxed text-slate-700">
                  We prioritize coordination between nursing, therapy, physicians, and families—so expectations are clear and care
                  feels calm, professional, and predictable.
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-700">
                  From the first call through discharge from home health, our team stays focused on timely communication, safe
                  visits, and documentation that supports your broader care plan.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
          >
            <GlassCard className="h-full p-0 overflow-hidden">
              <div className="relative h-56 sm:h-72 w-full">
                <img
                  src="/images/why-availibility.png"
                  alt="Availability and support"
                  className="w-full h-full object-cover object-top"
                />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent to-white/40" />
              </div>
              <div className="p-5 sm:p-6">
                <div className="grid gap-4 text-sm text-slate-700">
                  <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm border border-white/60">
                    <div className="text-base font-semibold text-slate-900">Availability</div>
                    <p className="mt-1">
                      Mon–Fri 8am–6pm with after-hours triage support, so urgent questions aren&apos;t left until the next business day.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm border border-white/60">
                    <div className="text-base font-semibold text-slate-900">Single coordinated plan</div>
                    <p className="mt-1">
                      Nursing and therapy work from the same plan of care, aligned with your physician&apos;s orders and goals.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/70 px-4 py-3 shadow-sm border border-white/60">
                    <div className="text-base font-semibold text-slate-900">Progress updates</div>
                    <p className="mt-1">
                      Visit notes and status updates are shared with families and providers per consent, so everyone stays on the
                      same page.
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default WhyAmericanGuardian;


