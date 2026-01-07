import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, HeartPulse, Home, Shield, Stethoscope } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import Badge from "./ui/Badge";
import GlassCard from "./ui/GlassCard";
import { useReducedMotionFlag, fadeUp, staggerContainer, viewportConfig, premiumEase, slideInFromLeft, slideInFromRight, slideInFromBottom } from "../../lib/motion";
import { scrollToSection } from "../../lib/scroll";

function Services() {
  const reducedMotion = useReducedMotionFlag();
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

  const containerVariants = staggerContainer(reducedMotion);

  return (
    <motion.section
      id="services"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={containerVariants}
      className="relative bg-gradient-to-b from-indigo-50/40 via-white to-purple-50/30 py-12 sm:py-16 lg:py-20 scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08),rgba(59,130,246,0.06),rgba(255,255,255,0)_60%)]" />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <SectionTitle
          kicker="Services"
          title="A premium care experience, delivered at home"
          desc="Design-forward, clinician-led, and built around reliability—so families can breathe again."
        />

        <motion.div
          variants={staggerContainer(reducedMotion)}
          className="mt-8 sm:mt-10 lg:mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((i, idx) => {
            const colorSchemes = ["cyan", "purple", "emerald", "orange"];
            // Alternate directions for visual interest
            const directionVariants = [
              slideInFromLeft(reducedMotion),
              slideInFromRight(reducedMotion),
              slideInFromBottom(reducedMotion),
              slideInFromLeft(reducedMotion),
            ];
            return (
              <motion.div
                key={i.title}
                variants={directionVariants[idx % 4]}
                initial="hidden"
                whileInView="show"
                viewport={viewportConfig}
              >
                <Badge
                  icon={i.icon}
                  title={i.title}
                  desc={i.desc}
                  colorScheme={colorSchemes[idx % 4]}
                  image={i.image}
                  imageClass={i.imageClass}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Specialty Focus Areas - Centered */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="text-center">
            <h3 className="text-base font-semibold text-slate-900 tracking-tight">
              Specialty Focus Areas
            </h3>
            <p className="mt-2 text-base text-slate-600">
              Within skilled home health, we pay particular attention to common higher‑risk needs.
            </p>
          </div>
          <div className="mt-6 sm:mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Wound Care", desc: "Assessment, monitoring, and coordinated healing support.", color: "cyan", image: "/images/specialty-wound-care.png", position: "object-[center_45%]", scale: "" },
              { title: "Cardiac / CHF Support", desc: "Symptom awareness, safety education, and plan adherence.", color: "blue", image: "/images/specialty-cardiac.png", position: "object-[center_15%]", scale: "" },
              { title: "Diabetes Management", desc: "Routine oversight and education to reduce complications.", color: "purple", image: "/images/specialty-diabetes.png", position: "object-[center_30%]", scale: "" },
              { title: "COPD / Pulmonary Support", desc: "Breathing support education and consistent routines.", color: "emerald", image: "/images/specialty-copd.png", position: "object-[center_15%]", scale: "" },
              { title: "Stroke Recovery", desc: "Therapy-aligned support for safe daily function.", color: "orange", image: "/images/specialty-stroke.png", position: "object-[center_35%]", scale: "scale-105" },
              { title: "Post-Surgical Rehab", desc: "Recovery support after discharge to reduce setbacks.", color: "pink", image: "/images/specialty-post-surgical.png", position: "object-[center_35%]", scale: "scale-105" },
            ].map((item, idx) => {
              // Alternate directions for specialty cards
              const directionVariants = [
                slideInFromLeft(reducedMotion),
                slideInFromRight(reducedMotion),
                slideInFromBottom(reducedMotion),
                slideInFromLeft(reducedMotion),
                slideInFromRight(reducedMotion),
                slideInFromBottom(reducedMotion),
              ];
              return (
              <motion.div
                key={item.title}
                variants={directionVariants[idx % 6]}
                initial="hidden"
                whileInView="show"
                viewport={viewportConfig}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-[1px] hover:border-slate-300">
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full object-cover ${item.position || "object-center"}`}
                      style={{ filter: "saturate(0.9)" }}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white/85 to-transparent" />
                  </div>
                  <div className="px-4 pt-3.5 pb-4 sm:px-5 sm:pb-5">
                    <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-500">
                      Specialty care
                    </div>
                    <div className="mt-1 text-base font-semibold text-slate-900 group-hover:text-slate-950 transition-colors">
                      {item.title}
                    </div>
                    <p className="mt-2 text-sm lg:text-base leading-relaxed text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          variants={fadeUp(reducedMotion)}
          className="mt-8 sm:mt-10 lg:mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <motion.a
            href="#how"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("how");
            }}
            whileHover={{ scale: reducedMotion ? 1 : 1.02, y: reducedMotion ? 0 : -1 }}
            whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
            transition={{ duration: 0.2, ease: premiumEase }}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 px-5 py-3 text-sm font-semibold text-purple-700 shadow-sm transition hover:from-purple-100 hover:to-pink-100 hover:border-purple-300 min-h-[44px] w-full sm:w-auto"
          >
            See how it works <motion.span whileHover={{ x: reducedMotion ? 0 : 2 }} transition={{ duration: 0.2 }}><ArrowRight className="h-4 w-4" /></motion.span>
          </motion.a>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            whileHover={{ scale: reducedMotion ? 1 : 1.02, y: reducedMotion ? 0 : -1 }}
            whileTap={{ scale: reducedMotion ? 1 : 0.98 }}
            transition={{ duration: 0.2, ease: premiumEase }}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 shadow-lg shadow-cyan-500/30 min-h-[44px] w-full sm:w-auto"
          >
            Verify coverage & availability <motion.span whileHover={{ rotate: reducedMotion ? 0 : 5 }} transition={{ duration: 0.2 }}><Shield className="h-4 w-4" /></motion.span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Services;

