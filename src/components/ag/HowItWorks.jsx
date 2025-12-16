import React from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, HeartPulse, PhoneCall } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

function HowItWorks() {
  const steps = [
    {
      k: "01",
      title: "Call or submit intake",
      desc: "We collect key details and align next steps with your physician's orders.",
      icon: PhoneCall,
      image: "/images/how-step1.png",
    },
    {
      k: "02",
      title: "Clinician-led care plan",
      desc: "Nursing and therapy coordination with clear outcomes and frequency.",
      icon: ClipboardCheck,
      image: "/images/how-step2.png",
    },
    {
      k: "03",
      title: "Visits, progress, adjustments",
      desc: "We track progress and adjust the plan quickly as needs change.",
      icon: HeartPulse,
      image: "/images/how-step3.png",
    },
  ];

  return (
    <section id="how" className="relative bg-gradient-to-b from-white via-blue-50/30 to-cyan-50/40 py-20">
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <SectionTitle
          kicker="Process"
          title="Simple steps. Exceptional follow-through."
          desc="A smooth, professional intake—then consistent, coordinated care."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {steps.map((s, idx) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: idx * 0.08, duration: 0.7, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white/90 via-blue-50/60 to-purple-50/50 p-6 shadow-lg ring-1 ring-blue-100/50 backdrop-blur-sm"
            >
              <div className="pointer-events-none absolute inset-0 opacity-70">
                {idx === 0 && (
                  <>
                    <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-cyan-300/50 blur-3xl" />
                    <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-blue-300/45 blur-3xl" />
                  </>
                )}
                {idx === 1 && (
                  <>
                    <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-purple-300/50 blur-3xl" />
                    <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-pink-300/45 blur-3xl" />
                  </>
                )}
                {idx === 2 && (
                  <>
                    <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-emerald-300/50 blur-3xl" />
                    <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-teal-300/45 blur-3xl" />
                  </>
                )}
              </div>

              {/* Step Image */}
              {s.image && (
                <div className="relative mb-6 rounded-xl overflow-hidden h-48 sm:h-56 -mx-2">
                  <img
                    src={s.image}
                    alt={s.title}
                    className={`w-full h-full object-cover ${idx === 2 ? 'object-[25%_55%] scale-110' : 'object-center'}`}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
                </div>
              )}

              <div className="relative flex items-start justify-between">
                <div>
                  <div className={`text-xs font-semibold tracking-widest ${idx === 0 ? 'text-cyan-600' : idx === 1 ? 'text-purple-600' : 'text-emerald-600'}`}>STEP {s.k}</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">{s.title}</div>
                </div>
                <div className={`rounded-2xl border ${idx === 0 ? 'border-cyan-200 bg-gradient-to-br from-cyan-100 to-blue-100' : idx === 1 ? 'border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100' : 'border-emerald-200 bg-gradient-to-br from-emerald-100 to-teal-100'} p-3 shadow-sm`}>
                  <s.icon className={`h-6 w-6 ${idx === 0 ? 'text-cyan-600' : idx === 1 ? 'text-purple-600' : 'text-emerald-600'}`} />
                </div>
              </div>

              <p className="relative mt-3 text-sm leading-relaxed text-slate-600">{s.desc}</p>

              <div className="relative mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  className={`h-full rounded-full ${idx === 0 ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : idx === 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${(idx + 1) * 33.3}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

