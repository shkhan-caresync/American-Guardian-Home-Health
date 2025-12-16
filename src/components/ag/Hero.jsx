import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BadgeCheck, CheckCircle2, Clock, HeartPulse, MapPin, Shield, Sparkles } from "lucide-react";
import ParticleField from "./ui/ParticleField";
import GlowBlob from "./ui/GlowBlob";
import GlassCard from "./ui/GlassCard";
import MagneticButton from "./ui/MagneticButton";
import CountUp from "./ui/CountUp";
import ScrollHint from "./ui/ScrollHint";
import { LOGO_SRC } from "../../config/brand";

function AnimatedUnderline() {
  return (
    <span className="relative">
      <span className="relative z-10">American Guardian</span>
      <span className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full rounded-full bg-cyan-400/30 blur-[1px]" />
    </span>
  );
}

function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-200, 200], [8, -8]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);
  const rx = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const ry = useSpring(rotateY, { stiffness: 120, damping: 18 });

  const onMove = (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  };

  return (
    <section
      onMouseMove={onMove}
      className="relative overflow-hidden bg-gradient-to-b from-cyan-50/50 via-white via-indigo-50/30 to-white pt-32 sm:pt-36"
    >
      <ParticleField className="opacity-50" />
      <GlowBlob className="-left-28 top-32 h-[520px] w-[520px]" delay={0.2} />
      <GlowBlob className="-right-28 top-10 h-[560px] w-[560px]" delay={0.6} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.10),rgba(168,85,247,0.06),rgba(255,255,255,0)_60%)]" />

      <div className="relative mx-auto w-full px-4 pb-16 sm:px-6 lg:px-10 xl:px-16 2xl:px-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/50 bg-gradient-to-r from-cyan-100 via-blue-100 to-indigo-100 px-3 py-1 text-xs font-medium text-cyan-700 backdrop-blur shadow-sm"
            >
              <Shield className="h-3.5 w-3.5 text-cyan-600" />
              Licensed • Compassionate • Outcomes-focused
              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-2 py-0.5 text-[11px] text-purple-700 border border-purple-200/50">
                <Sparkles className="h-3 w-3 text-purple-600" />
                Modern care experience
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.9, ease: "easeOut" }}
              className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight bg-gradient-to-r from-slate-900 via-cyan-800 to-indigo-900 bg-clip-text text-transparent sm:text-6xl"
            >
              Home health that feels
              <span className="block">
                premium, protected, and personal.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.9, ease: "easeOut" }}
              className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600"
            >
              <AnimatedUnderline /> delivers coordinated nursing, therapy, and support—
              designed around your loved one’s goals, schedule, and safety.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.9, ease: "easeOut" }}
              className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <MagneticButton className="px-6 py-3.5 text-base" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Request a care plan
              </MagneticButton>
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-cyan-200"
              >
                Explore services
                <span className="h-6 w-6 rounded-full bg-cyan-50 grid place-items-center border border-cyan-200">
                  <ArrowRight className="h-4 w-4 text-cyan-600 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: "easeOut" }}
              className="mt-10 grid grid-cols-3 gap-3 max-w-xl"
            >
              {[{
                label: "Patients served",
                value: 1200,
                suffix: "+",
              },
              {
                label: "Avg. response",
                value: 24,
                suffix: "h",
              },
              {
                label: "Care satisfaction",
                value: 98,
                suffix: "%",
              }].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-cyan-200/50 bg-gradient-to-br from-white via-cyan-50/50 to-blue-50/50 px-4 py-3 shadow-md ring-1 ring-cyan-100/50"
                >
                  <div className="text-lg font-semibold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-slate-600">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <ScrollHint />
          </div>

          <div className="lg:col-span-6">
            <motion.div
              style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
              className="relative"
            >
              <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_0%,rgba(51,211,213,0.22),rgba(0,0,0,0)_60%)] blur-2xl" />

              <GlassCard className="p-0 overflow-hidden">
                {/* Hero image only - no dashboard content */}
                <div className="relative h-64 sm:h-80 lg:h-[460px] w-full">
                  <img
                    src="/images/hero-main.png"
                    alt="Nurse providing home health care during a visit"
                    className="h-full w-full object-cover object-center"
                  />
                  {/* Soft overlay to blend with background */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />

                  {/* Small floating label on image */}
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm">
                    <Shield className="h-3.5 w-3.5 text-cyan-500" />
                    Licensed home health visit
                  </div>
                </div>
              </GlassCard>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -left-6 top-14 hidden w-48 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg lg:block"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <HeartPulse className="h-4 w-4 text-cyan-500" />
                  Outcomes
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">Care you can measure</div>
                <div className="mt-1 text-xs text-slate-600">Progress tracking and clear next steps</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                className="absolute -right-6 bottom-14 hidden w-52 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg lg:block"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Shield className="h-4 w-4 text-cyan-500" />
                  Safety
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">Guardian-level oversight</div>
                <div className="mt-1 text-xs text-slate-600">Clinician-led plan adjustments</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}

export default Hero;

