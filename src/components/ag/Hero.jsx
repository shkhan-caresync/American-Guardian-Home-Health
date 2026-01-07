import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowRight, Shield, Award, CheckCircle2, BadgeCheck } from "lucide-react";
import ParticleField from "./ui/ParticleField";
import GlowBlob from "./ui/GlowBlob";
import GlassCard from "./ui/GlassCard";
import MagneticButton from "./ui/MagneticButton";
import ScrollHint from "./ui/ScrollHint";
import CountUp from "./ui/CountUp";
import { useReducedMotionFlag, fadeUp, scaleIn, staggerContainer, premiumEase } from "../../lib/motion";
import { scrollToSection } from "../../lib/scroll";

function AnimatedUnderline() {
  return (
    <span className="relative">
      <span className="relative z-10">American Guardian</span>
      <span className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full rounded-full bg-cyan-400/30 blur-[1px]" />
    </span>
  );
}

function Hero() {
  const reducedMotion = useReducedMotionFlag();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const imageRef = useRef(null);
  const { scrollY } = useScroll();

  const rotateX = useTransform(mouseY, [-200, 200], [8, -8]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);
  const rx = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const ry = useSpring(rotateY, { stiffness: 120, damping: 18 });

  // Subtle parallax for image (only if reduced motion is false)
  const imageY = useTransform(
    scrollY,
    [0, 500],
    [0, reducedMotion ? 0 : 12]
  );

  const onMove = (e) => {
    if (reducedMotion) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  };

  const containerVariants = staggerContainer(reducedMotion);

  return (
    <section
      id="hero"
      onMouseMove={onMove}
      className="relative overflow-hidden bg-gradient-to-b from-cyan-50/50 via-white via-indigo-50/30 to-white pt-16 sm:pt-18 md:pt-20 lg:pt-24 xl:pt-28 w-full min-h-screen flex flex-col [contain:layout_style_paint]"
    >
      <ParticleField className="opacity-50" />
      <GlowBlob className="-left-28 top-32 h-[520px] w-[520px]" delay={0.2} />
      <GlowBlob className="-right-28 top-10 h-[560px] w-[560px]" delay={0.6} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.10),rgba(168,85,247,0.06),rgba(255,255,255,0)_60%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative w-full flex-1 flex flex-col justify-center pb-8 sm:pb-10 lg:pb-12"
      >
        <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-5 md:gap-6 xl:grid-cols-12 xl:gap-6">
          <div className="w-full xl:col-span-7 px-4 sm:px-6 md:px-8 xl:pl-10 xl:pr-3">
            <motion.div
              variants={fadeUp(reducedMotion)}
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/40 bg-cyan-50/40 px-3 py-1 text-[11px] font-normal text-slate-600 backdrop-blur"
            >
              <Shield className="h-3 w-3 text-cyan-500" />
              <span>Licensed home health agency</span>
            </motion.div>

            <motion.h1
              variants={fadeUp(reducedMotion)}
              className="mt-3 sm:mt-4 md:mt-5 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight bg-clip-text text-transparent relative"
            >
              <motion.span
                className="block bg-gradient-to-r from-slate-900 via-cyan-800 to-indigo-900 bg-clip-text text-transparent"
                animate={
                  reducedMotion
                    ? {}
                    : {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Home health that feels
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-slate-900 via-cyan-800 to-indigo-900 bg-clip-text text-transparent"
                animate={
                  reducedMotion
                    ? {}
                    : {
                        backgroundPosition: ["100% 50%", "0% 50%", "100% 50%"],
                      }
                }
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5,
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                premium, protected, and personal.
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeUp(reducedMotion)}
              className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-slate-500"
            >
              <AnimatedUnderline /> delivers coordinated nursing, therapy, and support—
              designed around your loved one's goals, schedule, and safety.
            </motion.p>

            <motion.div
              variants={fadeUp(reducedMotion)}
              className="mt-5 sm:mt-6 md:mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <MagneticButton className="px-6 py-3.5 text-sm sm:text-base min-h-[44px]" onClick={() => scrollToSection("contact")}>
                Request a care plan
              </MagneticButton>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("services");
                }}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:border-cyan-200 min-h-[44px]"
              >
                Explore services
                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            {/* Trust cues - compact and quiet */}
            <motion.div
              variants={fadeUp(reducedMotion)}
              className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500"
            >
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
                <span>
                  <CountUp value={1200} suffix="+ patients served" />
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
                <span>
                  <CountUp value={98} suffix="% satisfaction" />
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
                <span className="hidden sm:inline">Sacramento County • Placer County • Contra Costa County • Stanislaus County • and surrounding counties</span>
                <span className="sm:hidden">Serving Sacramento, Placer, Contra Costa & Stanislaus Counties and surrounding counties</span>
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              variants={fadeUp(reducedMotion)}
              className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
            >
              <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200/50 bg-emerald-50/50 px-2.5 py-1.5">
                <Award className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-[10px] font-medium text-slate-700">ACHC Accredited</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-blue-200/50 bg-blue-50/50 px-2.5 py-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600" />
                <span className="text-[10px] font-medium text-slate-700">Medicare Certified</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-cyan-200/50 bg-cyan-50/50 px-2.5 py-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-cyan-600" />
                <span className="text-[10px] font-medium text-slate-700">State Licensed</span>
              </div>
            </motion.div>

            <ScrollHint />
          </div>

          <motion.div
            variants={scaleIn(reducedMotion)}
            className="w-full xl:col-span-5 px-4 sm:px-6 md:px-8 xl:pl-3 xl:pr-10 flex"
          >
            <motion.div
              ref={imageRef}
              style={{
                rotateX: reducedMotion ? 0 : rx,
                rotateY: reducedMotion ? 0 : ry,
                y: imageY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full flex-1"
            >
              <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_0%,rgba(51,211,213,0.22),rgba(0,0,0,0)_60%)] blur-2xl" />

              <GlassCard className="p-0 overflow-hidden w-full h-full" disable3DTilt={true}>
                {/* Hero image only - no dashboard content */}
                <div className="relative w-full min-h-[400px] sm:min-h-[450px] md:min-h-[480px] lg:min-h-[600px] xl:min-h-[650px]">
                  <img
                    src="/images/hero-main.png"
                    alt="Nurse providing home health care during a visit"
                    className="absolute inset-0 h-full w-full object-cover object-[75%_40%]"
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

            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mt-auto" />
    </section>
  );
}

export default Hero;

