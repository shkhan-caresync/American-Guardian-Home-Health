import React from "react";
import { ArrowRight, ClipboardCheck, HeartPulse, Home, Shield, Stethoscope } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import Badge from "./ui/Badge";

function Services() {
  const items = [
    {
      icon: Stethoscope,
      title: "Skilled Nursing",
      desc: "Wound care, medication management, chronic disease support, post-op recovery.",
      image: "/images/service-nursing.png",
    },
    {
      icon: ClipboardCheck,
      title: "Therapy Coordination",
      desc: "PT/OT/ST aligned to practical goals—mobility, safety, and independence.",
      image: "/images/service-therapy.png",
    },
    {
      icon: Home,
      title: "Home Safety & Education",
      desc: "Fall-risk reduction, caregiver training, and a clear plan everyone understands.",
      image: "/images/service-safety.png",
      imageClass: "object-[center_40%] scale-110",
    },
    {
      icon: HeartPulse,
      title: "Care Management",
      desc: "A single, coordinated plan across providers—updates you can trust.",
      image: "/images/service-management.png",
    },
  ];

  return (
    <section id="services" className="relative bg-gradient-to-b from-indigo-50/40 via-white to-purple-50/30 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08),rgba(59,130,246,0.06),rgba(255,255,255,0)_60%)]" />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <SectionTitle
          kicker="Services"
          title="A premium care experience, delivered at home"
          desc="Design-forward, clinician-led, and built around reliability—so families can breathe again."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((i, idx) => {
            const colorSchemes = ["cyan", "purple", "emerald", "orange"];
            return (
              <Badge
                key={i.title}
                icon={i.icon}
                title={i.title}
                desc={i.desc}
                colorScheme={colorSchemes[idx % 4]}
                image={i.image}
                imageClass={i.imageClass}
              />
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 px-5 py-3 text-sm font-semibold text-purple-700 shadow-sm transition hover:from-purple-100 hover:to-pink-100 hover:border-purple-300"
          >
            See how it works <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 shadow-lg shadow-cyan-500/30"
          >
            Verify coverage & availability <Shield className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Services;

