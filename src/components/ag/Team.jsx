import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Shield } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

function Team() {
  const people = [
    {
      name: "Clinical Director (RN, DPCS)",
      role: "Director of Patient Care Services",
      tag: "Leadership",
      image: "/images/team-director.png",
      bio: "Oversees all nursing and therapy services, signs off on plans of care, audits documentation, and ensures every visit meets quality, safety, and regulatory standards.",
    },
    {
      name: "Skilled Nurse (RN/LVN)",
      role: "In-home nursing visits",
      tag: "Nursing",
      image: "/images/team-nurse.png",
      bio: "Provides in‑home skilled nursing: assessments, vitals, wound care, medication management, and clear teaching so families know what to watch for between visits.",
    },
    {
      name: "Therapy Team",
      role: "PT / OT / ST coordination",
      tag: "Therapy",
      image: "/images/team-therapy.png",
      bio: "Delivers physical, occupational, and speech therapy focused on strength, balance, safe transfers, and independence in everyday home activities.",
    },
    {
      name: "Care Coordinator",
      role: "Scheduling & family updates",
      tag: "Operations",
      image: "/images/team-coordinator.png",
      bio: "Handles scheduling, intake paperwork, authorizations, and proactive phone updates so families know who is coming, when, and what happens next.",
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

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {people.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: idx * 0.06, duration: 0.7, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br from-white/90 via-purple-50/50 to-pink-50/40 p-6 shadow-lg ring-1 ring-purple-100/50 hover:shadow-xl transition-all backdrop-blur-sm"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {idx === 0 && <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/50 blur-3xl" />}
                {idx === 1 && <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-300/50 blur-3xl" />}
                {idx === 2 && <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-purple-300/50 blur-3xl" />}
                {idx === 3 && <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-pink-300/50 blur-3xl" />}
              </div>
              <div className="relative">
                {/* Team Member Image */}
                {p.image && (
                  <div className="relative mb-4 rounded-xl overflow-hidden h-32 w-32 mx-auto">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
                  </div>
                )}
                
                <div className={`inline-flex items-center gap-2 rounded-full border ${idx === 0 ? 'border-cyan-200 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700' : idx === 1 ? 'border-blue-200 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700' : idx === 2 ? 'border-purple-200 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' : 'border-pink-200 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700'} px-3 py-1 text-[11px] font-medium shadow-sm`}>
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
                  <CheckCircle2 className={`h-4 w-4 ${idx === 0 ? 'text-cyan-500' : idx === 1 ? 'text-blue-500' : idx === 2 ? 'text-purple-500' : 'text-pink-500'}`} />
                  Background checks • Training • Documentation
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;

