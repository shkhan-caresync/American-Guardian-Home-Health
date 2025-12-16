import React from "react";
import { motion } from "framer-motion";
import { ClipboardCheck, HeartPulse, PhoneCall } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";

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
    {
      k: "04",
      title: "Discharge planning & transition support",
      desc: "We help plan for a safe discharge from home health, including handoffs to community and outpatient resources.",
      icon: ClipboardCheck,
      image: "/images/how-step4.png",
    },
    {
      k: "05",
      title: "Next-step resources and coordination",
      desc: "We point families to appropriate next-step care options and share visit summaries with providers, per consent.",
      icon: ClipboardCheck,
      image: "/images/how-step5.png",
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
              className="h-full"
            >
              <GlassCard className="h-full p-6 flex flex-col">
                {/* Step Image */}
                {s.image && (
                  <div className="relative mb-6 rounded-xl overflow-hidden h-48 sm:h-56 -mx-2 flex-shrink-0">
                    <img
                      src={s.image}
                      alt={s.title}
                      className={`w-full h-full object-cover ${idx === 2 ? 'object-[25%_55%] scale-110' : 'object-center'}`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
                  </div>
                )}

                <div className="flex items-start justify-between flex-shrink-0 gap-3">
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold tracking-widest ${idx === 0 ? 'text-cyan-600' : idx === 1 ? 'text-purple-600' : idx === 2 ? 'text-emerald-600' : idx === 3 ? 'text-orange-600' : 'text-pink-600'}`}>STEP {s.k}</div>
                    <div className="mt-2 text-base sm:text-lg font-semibold text-slate-900 leading-tight">{s.title}</div>
                  </div>
                  <div className={`rounded-2xl border ${idx === 0 ? 'border-cyan-200 bg-gradient-to-br from-cyan-100 to-blue-100' : idx === 1 ? 'border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100' : idx === 2 ? 'border-emerald-200 bg-gradient-to-br from-emerald-100 to-teal-100' : idx === 3 ? 'border-orange-200 bg-gradient-to-br from-orange-100 to-amber-100' : 'border-pink-200 bg-gradient-to-br from-pink-100 to-rose-100'} p-3 shadow-sm flex-shrink-0`}>
                    <s.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${idx === 0 ? 'text-cyan-600' : idx === 1 ? 'text-purple-600' : idx === 2 ? 'text-emerald-600' : idx === 3 ? 'text-orange-600' : 'text-pink-600'}`} />
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 flex-grow">{s.desc}</p>

                <div className="mt-auto pt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 flex-shrink-0 relative">
                  <motion.div
                    className={`absolute left-0 top-0 h-full rounded-full ${idx === 0 ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : idx === 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : idx === 2 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : idx === 3 ? 'bg-gradient-to-r from-orange-500 to-amber-500' : 'bg-gradient-to-r from-pink-500 to-rose-500'}`}
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${Math.min((idx + 1) * 20, 100)}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-xs text-slate-600">
          Providers receive timely start-of-care and progress updates per patient consent.
        </p>
      </div>
    </section>
  );
}

export default HowItWorks;

