import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, ArrowRight } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";

function Team() {
  const people = [
    {
      name: "Clinical Director (RN, DPCS)",
      role: "Director of Patient Care Services",
      tag: "Leadership",
      image: "/images/team-director.png",
      bio: "Oversees all nursing and therapy services, signs off on plans of care, audits documentation, and ensures every visit meets quality, safety, and regulatory standards.",
      color: "cyan",
    },
    {
      name: "Skilled Nurse (RN/LVN)",
      role: "In-home nursing visits",
      tag: "Nursing",
      image: "/images/team-nurse.png",
      bio: "Provides in‑home skilled nursing: assessments, vitals, wound care, medication management, and clear teaching so families know what to watch for between visits.",
      color: "blue",
    },
    {
      name: "Therapy Team",
      role: "PT / OT / ST coordination",
      tag: "Therapy",
      image: "/images/team-therapy.png",
      bio: "Delivers physical, occupational, and speech therapy focused on strength, balance, safe transfers, and independence in everyday home activities.",
      color: "purple",
    },
    {
      name: "Care Coordinator",
      role: "Scheduling & family updates",
      tag: "Operations",
      image: "/images/team-coordinator.png",
      bio: "Handles scheduling, intake paperwork, authorizations, and proactive phone updates so families know who is coming, when, and what happens next.",
      color: "pink",
    },
    {
      name: "Medical Social Worker (MSW)",
      role: "Psychosocial support & resources",
      tag: "Support",
      image: "/images/team-msw.png",
      bio: "Provides psychosocial assessments, connects families with community resources, assists with advance directives, and supports emotional well-being during recovery.",
      color: "emerald",
    },
    {
      name: "Home Health Aides (HHA)",
      role: "Personal care & daily assistance",
      tag: "Care",
      image: "/images/team-hha.png",
      bio: "Assists with personal care, activities of daily living, light housekeeping, and companionship—supporting independence and safety in the home.",
      color: "orange",
    },
  ];

  return (
    <section id="team" className="relative bg-gradient-to-b from-white via-purple-50/30 to-pink-50/30 py-20">
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <SectionTitle
          kicker="Care Team"
          title="The clinicians behind American Guardian"
          desc="A small, coordinated team of nurses, therapists, and care coordinators focused on safe, timely, in‑home care."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {people.map((p, idx) => {
            const colorClasses = {
              cyan: { border: 'border-cyan-200', bg: 'from-cyan-100 to-blue-100', text: 'text-cyan-700', icon: 'text-cyan-500', check: 'text-cyan-500' },
              blue: { border: 'border-blue-200', bg: 'from-blue-100 to-indigo-100', text: 'text-blue-700', icon: 'text-blue-500', check: 'text-blue-500' },
              purple: { border: 'border-purple-200', bg: 'from-purple-100 to-pink-100', text: 'text-purple-700', icon: 'text-purple-500', check: 'text-purple-500' },
              pink: { border: 'border-pink-200', bg: 'from-pink-100 to-rose-100', text: 'text-pink-700', icon: 'text-pink-500', check: 'text-pink-500' },
              emerald: { border: 'border-emerald-200', bg: 'from-emerald-100 to-teal-100', text: 'text-emerald-700', icon: 'text-emerald-500', check: 'text-emerald-500' },
              orange: { border: 'border-orange-200', bg: 'from-orange-100 to-amber-100', text: 'text-orange-700', icon: 'text-orange-500', check: 'text-orange-500' },
            };
            const colors = colorClasses[p.color] || colorClasses.cyan;
            const IconComponent = p.icon;

            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: idx * 0.06, duration: 0.7, ease: "easeOut" }}
              >
                <GlassCard className="h-full p-6">
                  <div className="relative">
                    {/* Team Member Image or Icon */}
                    {p.image ? (
                      <div className="relative mb-4 rounded-xl overflow-hidden h-32 w-32 mx-auto">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover object-center"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
                      </div>
                    ) : IconComponent ? (
                      <div className={`relative mb-4 rounded-xl overflow-hidden h-32 w-32 mx-auto bg-gradient-to-br ${colors.bg} flex items-center justify-center border ${colors.border}`}>
                        <IconComponent className={`h-12 w-12 ${colors.icon}`} />
                      </div>
                    ) : null}
                    
                    <div className={`inline-flex items-center gap-2 rounded-full border ${colors.border} bg-gradient-to-r ${colors.bg} ${colors.text} px-3 py-1 text-[11px] font-medium shadow-sm`}>
                      <Shield className="h-3.5 w-3.5" />
                      {p.tag}
                    </div>
                    <div className="mt-4 text-base font-semibold text-slate-900">{p.name}</div>
                    <div className="mt-1 text-sm text-slate-600">{p.role}</div>
                    {p.bio && (
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        {p.bio}
                      </p>
                    )}

                    <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    <div className="mt-5 flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className={`h-4 w-4 ${colors.check}`} />
                      Background checks • Training • Documentation
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* CTA to Patient Stories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
          className="mt-12 text-center"
        >
          <a
            href="#stories"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("stories")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-3 text-sm font-semibold text-purple-700 shadow-sm transition hover:from-purple-100 hover:to-pink-100 hover:border-purple-300 min-h-[44px]"
          >
            Read patient stories
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default Team;

