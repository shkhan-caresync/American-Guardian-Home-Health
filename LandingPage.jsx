import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Shield,
  HeartPulse,
  Home,
  Stethoscope,
  ClipboardCheck,
  PhoneCall,
  Sparkles,
  Stars,
  CheckCircle2,
  MapPin,
  Clock,
  BadgeCheck,
} from "lucide-react";

/**
 * American Guardian Home Health — Cutting-edge, animation-rich landing UI
 *
 * How to use
 * 1) Ensure you have: framer-motion, lucide-react, tailwindcss installed.
 * 2) Replace LOGO_SRC with your local logo path or URL.
 *    - Example: import logo from "./assets/american-guardian.png"; then set LOGO_SRC = logo
 * 3) Drop this component into your app.
 */

// Replace with your actual logo asset.
const LOGO_SRC = "/american-guardian-logo.png";

// Brand palette (derived from your logo): deep slate/steel + aqua/teal.
const BRAND = {
  ink: "#0B1220",
  steel: "#2F435B",
  aqua: "#33D3D5",
  aqua2: "#13BDBF",
  mist: "#B8C6D6",
  glow: "rgba(51, 211, 213, 0.45)",
};

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Lightweight animated particle field (no external libs)
 * - Uses requestAnimationFrame; respects reduced motion.
 */
function ParticleField({ className }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq?.matches);
    update();
    mq?.addEventListener?.("change", update);
    return () => mq?.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let w = 0,
      h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (reduced) {
      // Static subtle dots for reduced motion.
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < 80; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 0.7 + Math.random() * 1.2;
        ctx.fillStyle = `rgba(184, 198, 214, ${0.06 + Math.random() * 0.07})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      return () => ro.disconnect();
    }

    const count = 110;
    const pts = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: 0.8 + Math.random() * 1.8,
      a: 0.05 + Math.random() * 0.08,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Soft vignette
      const grd = ctx.createRadialGradient(w * 0.5, h * 0.35, 10, w * 0.5, h * 0.35, Math.max(w, h) * 0.8);
      grd.addColorStop(0, "rgba(51, 211, 213, 0.08)");
      grd.addColorStop(1, "rgba(11, 18, 32, 0.0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // Particles
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.fillStyle = `rgba(184, 198, 214, ${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Lines between nearby particles
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          const max = 160 * 160;
          if (d2 < max) {
            const t = 1 - d2 / max;
            ctx.strokeStyle = `rgba(51, 211, 213, ${0.08 * t})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  return (
    <div className={cn("absolute inset-0", className)} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

function GlowBlob({ className, delay = 0 }) {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-3xl",
        "bg-[radial-gradient(circle_at_30%_30%,rgba(51,211,213,0.55),rgba(51,211,213,0.0)_60%)]",
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: [0.35, 0.55, 0.35],
        scale: [0.95, 1.08, 0.95],
        x: [0, 18, -10, 0],
        y: [0, -10, 12, 0],
      }}
      transition={{
        delay,
        duration: 12,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      aria-hidden="true"
    />
  );
}

function Badge({ icon: Icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-2xl" />
        <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-2xl" />
      </div>

      <div className="relative flex items-start gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 shadow-inner">
          <Icon className="h-6 w-6 text-cyan-300" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold tracking-tight text-white">{title}</h3>
            <span className="h-1 w-1 rounded-full bg-cyan-300/80" />
          </div>
          <p className="mt-1 text-sm leading-relaxed text-white/70">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function SectionTitle({ kicker, title, desc }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {kicker ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-200/90 backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          {kicker}
        </div>
      ) : null}
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-base leading-relaxed text-white/70">{desc}</p>
      ) : null}
    </div>
  );
}

function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 18 });
  const sy = useSpring(my, { stiffness: 260, damping: 18 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - (r.left + r.width / 2);
    const py = e.clientY - (r.top + r.height / 2);
    mx.set(px * 0.14);
    my.set(py * 0.14);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold",
        "bg-cyan-300 text-slate-950 shadow-[0_14px_50px_-18px_rgba(51,211,213,0.9)]",
        "ring-1 ring-white/10 transition-transform",
        className
      )}
    >
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.65),rgba(255,255,255,0)_55%)] opacity-70" />
      <span className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-[linear-gradient(90deg,rgba(51,211,213,0.65),rgba(255,255,255,0.15),rgba(51,211,213,0.55))] opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </motion.button>
  );
}

function GlassCard({ children, className }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5",
        "shadow-[0_24px_80px_-40px_rgba(0,0,0,0.95)] backdrop-blur-xl",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-28 left-12 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute -bottom-28 right-6 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

function AnimatedUnderline() {
  return (
    <span className="relative">
      <span className="relative z-10">American Guardian</span>
      <span className="pointer-events-none absolute -bottom-1 left-0 h-2 w-full rounded-full bg-cyan-300/25 blur-[1px]" />
    </span>
  );
}

function ScrollHint() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="mt-10 flex items-center justify-center"
      aria-hidden="true"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur"
      >
        <Stars className="h-3.5 w-3.5 text-cyan-300/90" />
        Scroll to explore
      </motion.div>
    </motion.div>
  );
}

function CountUp({ value, suffix = "", duration = 1.3 }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <span className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  const nav = [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#how" },
    { label: "Coverage", href: "#coverage" },
    { label: "Care team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
          <a href="#" className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <img src={LOGO_SRC} alt="American Guardian Home Health" className="h-9 w-9 object-contain" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(51,211,213,0.35),rgba(0,0,0,0)_55%)]" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-white">American Guardian</div>
              <div className="text-xs text-white/60">Home Health</div>
            </div>
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {nav.map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {i.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10"
            >
              <PhoneCall className="h-4 w-4 text-cyan-300" />
              +1 (916) 573-3231
            </a>
            <MagneticButton className="px-4 py-2" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Request care
            </MagneticButton>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
          >
            <div className="space-y-1">
              <div className="h-0.5 w-5 bg-white/80" />
              <div className="h-0.5 w-5 bg-white/80" />
              <div className="h-0.5 w-5 bg-white/80" />
            </div>
          </button>
        </div>

        {open ? (
          <div className="mt-3 rounded-2xl border border-white/10 bg-black/55 p-3 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-2">
              {nav.map((i) => (
                <a
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm text-white/75 hover:bg-white/10 hover:text-white"
                >
                  {i.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950"
              >
                Request care <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
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
      className="relative overflow-hidden bg-[#050A14] pt-28"
    >
      {/* Ambient background */}
      <ParticleField className="opacity-90" />
      <GlowBlob className="-left-28 top-32 h-[520px] w-[520px]" delay={0.2} />
      <GlowBlob className="-right-28 top-10 h-[560px] w-[560px]" delay={0.6} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(51,211,213,0.10),rgba(11,18,32,0)_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,10,20,0.0),rgba(5,10,20,0.65)_55%,rgba(5,10,20,1))]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/75 backdrop-blur"
            >
              <Shield className="h-3.5 w-3.5 text-cyan-300" />
              Licensed • Compassionate • Outcomes-focused
              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-cyan-200/90">
                <Sparkles className="h-3 w-3" />
                Modern care experience
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.9, ease: "easeOut" }}
              className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl"
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
              className="mt-4 max-w-xl text-base leading-relaxed text-white/70"
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
              <MagneticButton onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Request a care plan
              </MagneticButton>
              <a
                href="#services"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10"
              >
                Explore services
                <span className="h-6 w-6 rounded-full bg-white/5 grid place-items-center border border-white/10">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
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
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
                >
                  <div className="text-lg font-semibold text-white">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-white/60">{s.label}</div>
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

              <GlassCard className="p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <img src={LOGO_SRC} alt="American Guardian Home Health" className="h-10 w-10 object-contain" />
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(51,211,213,0.35),rgba(0,0,0,0)_55%)]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Care Dashboard</div>
                      <div className="text-xs text-white/60">A premium experience, from first call to recovery</div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    Live
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Clock className="h-4 w-4 text-cyan-300/80" />
                      Next visit
                    </div>
                    <div className="mt-2 text-xl font-semibold text-white">Tomorrow, 10:30 AM</div>
                    <div className="mt-1 text-xs text-white/60">RN — Vital signs, meds review, wound check</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <MapPin className="h-4 w-4 text-cyan-300/80" />
                      Coverage
                    </div>
                    <div className="mt-2 text-xl font-semibold text-white">Sacramento Region</div>
                    <div className="mt-1 text-xs text-white/60">Flexible scheduling • Rapid start of care</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-white">Care plan highlights</div>
                      <div className="inline-flex items-center gap-2 text-xs text-cyan-200/90">
                        <BadgeCheck className="h-4 w-4" />
                        Verified
                      </div>
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {[
                        "Medication management",
                        "Wound care & monitoring",
                        "PT/OT coordination",
                        "Caregiver education",
                      ].map((t) => (
                        <div key={t} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                          <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                          <span className="text-sm text-white/80">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <div className="text-xs text-white/60">Speak with intake</div>
                    <div className="mt-1 text-sm font-semibold text-white">Call now: +1 (916) 573-3231</div>
                  </div>
                  <div className="relative">
                    <motion.div
                      className="absolute -inset-2 rounded-2xl bg-cyan-300/20 blur"
                      animate={{ opacity: [0.25, 0.55, 0.25] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      aria-hidden="true"
                    />
                    <a
                      href="#contact"
                      className="relative inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950"
                    >
                      Get started <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </GlassCard>

              {/* Floating mini-cards */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -left-6 top-14 hidden w-48 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl lg:block"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <HeartPulse className="h-4 w-4 text-cyan-300" />
                  Outcomes
                </div>
                <div className="mt-2 text-sm font-semibold text-white">Care you can measure</div>
                <div className="mt-1 text-xs text-white/60">Progress tracking and clear next steps</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                className="absolute -right-6 bottom-14 hidden w-52 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl lg:block"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Shield className="h-4 w-4 text-cyan-300" />
                  Safety
                </div>
                <div className="mt-2 text-sm font-semibold text-white">Guardian-level oversight</div>
                <div className="mt-1 text-xs text-white/60">Clinician-led plan adjustments</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Soft divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

function Services() {
  const items = [
    {
      icon: Stethoscope,
      title: "Skilled Nursing",
      desc: "Wound care, medication management, chronic disease support, post-op recovery."
    },
    {
      icon: ClipboardCheck,
      title: "Therapy Coordination",
      desc: "PT/OT/ST aligned to practical goals—mobility, safety, and independence."
    },
    {
      icon: Home,
      title: "Home Safety & Education",
      desc: "Fall-risk reduction, caregiver training, and a clear plan everyone understands."
    },
    {
      icon: HeartPulse,
      title: "Care Management",
      desc: "A single, coordinated plan across providers—updates you can trust."
    },
  ];

  return (
    <section id="services" className="relative bg-[#050A14] py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(51,211,213,0.07),rgba(0,0,0,0)_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle
          kicker="Services"
          title="A premium care experience, delivered at home"
          desc="Design-forward, clinician-led, and built around reliability—so families can breathe again."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <Badge key={i.title} icon={i.icon} title={i.title} desc={i.desc} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#how"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/85 backdrop-blur transition hover:bg-white/10"
          >
            See how it works <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/15"
          >
            Verify coverage & availability <Shield className="h-4 w-4 text-cyan-300" />
          </a>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      k: "01",
      title: "Call or submit intake",
      desc: "We collect key details and align next steps with your physician’s orders.",
      icon: PhoneCall,
    },
    {
      k: "02",
      title: "Clinician-led care plan",
      desc: "Nursing and therapy coordination with clear outcomes and frequency.",
      icon: ClipboardCheck,
    },
    {
      k: "03",
      title: "Visits, progress, adjustments",
      desc: "We track progress and adjust the plan quickly as needs change.",
      icon: HeartPulse,
    },
  ];

  return (
    <section id="how" className="relative bg-[#050A14] py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
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
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute inset-0 opacity-70">
                <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
                <div className="absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
              </div>

              <div className="relative flex items-start justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-widest text-cyan-200/80">STEP {s.k}</div>
                  <div className="mt-2 text-lg font-semibold text-white">{s.title}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <s.icon className="h-6 w-6 text-cyan-300" />
                </div>
              </div>

              <p className="relative mt-3 text-sm leading-relaxed text-white/70">{s.desc}</p>

              <div className="relative mt-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-cyan-300/70"
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

function Coverage() {
  return (
    <section id="coverage" className="relative bg-[#050A14] py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(51,211,213,0.10),rgba(0,0,0,0)_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle
          kicker="Coverage"
          title="Service areas, designed for speed"
          desc="Update this section with your actual service counties/cities and payer mix."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <GlassCard className="lg:col-span-7">
            <div className="p-7 sm:p-9">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Primary region</div>
                  <div className="mt-1 text-sm text-white/60">Sacramento • Elk Grove • Roseville • Folsom • Surrounding</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <MapPin className="h-6 w-6 text-cyan-300" />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {["Start of Care within 24–48 hours (when eligible)", "RN-led plan of care", "Family communication protocols", "Therapy coordination"].map((t) => (
                  <div key={t} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-cyan-300" />
                    <span className="text-sm text-white/80">{t}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Shield className="h-4 w-4 text-cyan-300/80" />
                  Insurance & eligibility (placeholder)
                </div>
                <p className="mt-2 text-sm text-white/70">
                  We can verify coverage and confirm service availability quickly. Replace this copy with
                  your exact payer types (Medicare/Commercial/Private Pay) and intake workflow.
                </p>
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
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div className="absolute -top-24 left-10 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
                </div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">Rapid intake</div>
                    <div className="mt-1 text-sm text-white/60">Streamlined documents & scheduling</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <Clock className="h-6 w-6 text-cyan-300" />
                  </div>
                </div>
                <div className="relative mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-cyan-300/70"
                    initial={{ x: "-30%" }}
                    animate={{ x: ["-30%", "120%"] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    aria-hidden="true"
                  />
                </div>
                <p className="relative mt-4 text-sm text-white/70">
                  A high-touch process that feels effortless: clear checklists, fast callbacks, and clinician-led planning.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: 0.08, duration: 0.7, ease: "easeOut" }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
                </div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">Care quality</div>
                    <div className="mt-1 text-sm text-white/60">Consistency, documentation, outcomes</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <BadgeCheck className="h-6 w-6 text-cyan-300" />
                  </div>
                </div>
                <p className="relative mt-4 text-sm text-white/70">
                  Built like a modern product: standardized workflows, reliable follow-through, and a premium family experience.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const people = [
    { name: "Clinical Director (RN)", role: "Care plan oversight", tag: "Leadership" },
    { name: "Skilled Nurse (RN/LVN)", role: "Visits & monitoring", tag: "Nursing" },
    { name: "Therapy Team", role: "PT/OT/ST coordination", tag: "Therapy" },
    { name: "Care Coordinator", role: "Scheduling & family updates", tag: "Operations" },
  ];

  return (
    <section id="team" className="relative bg-[#050A14] py-20">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle
          kicker="Care Team"
          title="Professional, calm, and coordinated"
          desc="Replace titles and bios with your real leadership/team highlights."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {people.map((p, idx) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: idx * 0.06, duration: 0.7, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
              </div>
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-cyan-200/90">
                  <Shield className="h-3.5 w-3.5" />
                  {p.tag}
                </div>
                <div className="mt-4 text-base font-semibold text-white">{p.name}</div>
                <div className="mt-1 text-sm text-white/65">{p.role}</div>

                <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="mt-5 flex items-center gap-2 text-xs text-white/60">
                  <CheckCircle2 className="h-4 w-4 text-cyan-300" />
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

function Contact() {
  return (
    <section id="contact" className="relative bg-[#050A14] py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(51,211,213,0.12),rgba(0,0,0,0)_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionTitle
          kicker="Contact"
          title="Request care in minutes"
          desc="Drop in your real phone/email and wire this form to your CRM (HubSpot, Salesforce, etc.)."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <GlassCard className="lg:col-span-7">
            <div className="p-7 sm:p-9">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-white/80">Full name</span>
                  <input
                    className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white/90 outline-none placeholder:text-white/30 focus:border-cyan-300/40"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-white/80">Phone</span>
                  <input
                    className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white/90 outline-none placeholder:text-white/30 focus:border-cyan-300/40"
                    placeholder="(xxx) xxx-xxxx"
                  />
                </label>
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-sm font-medium text-white/80">Email</span>
                  <input
                    className="h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white/90 outline-none placeholder:text-white/30 focus:border-cyan-300/40"
                    placeholder="you@email.com"
                  />
                </label>
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-sm font-medium text-white/80">How can we help?</span>
                  <textarea
                    rows={4}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/90 outline-none placeholder:text-white/30 focus:border-cyan-300/40"
                    placeholder="Tell us about your loved one's situation, timeline, and location."
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-white/60">
                  By submitting, you agree to be contacted about services. For emergencies, call 911.
                </div>
                <MagneticButton className="whitespace-nowrap">
                  Submit request
                </MagneticButton>
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-5">
            <div className="grid gap-6">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
                </div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">Speak with intake</div>
                    <div className="mt-1 text-sm text-white/60">Fast scheduling and coverage verification</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <PhoneCall className="h-6 w-6 text-cyan-300" />
                  </div>
                </div>

                <div className="relative mt-5 space-y-3">
                  <a
                    href="tel:+19165550123"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10"
                  >
                    <span>+1 (916) 573-3231</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:intake@americanguardianhomehealth.com"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 hover:bg-white/10"
                  >
                    <span>intake@americanguardianhomehealth.com</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="relative mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <Shield className="h-4 w-4 text-cyan-300/80" />
                    Premium standards
                  </div>
                  <p className="mt-2 text-sm text-white/70">
                    Modern documentation, reliable follow-through, and a family experience that feels calm and professional.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">Hours</div>
                    <div className="mt-1 text-sm text-white/60">Mon–Fri 8am–6pm • After-hours triage</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <Clock className="h-6 w-6 text-cyan-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <footer className="mt-10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <img src={LOGO_SRC} alt="American Guardian Home Health" className="h-9 w-9 object-contain" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">American Guardian Home Health</div>
              <div className="text-xs text-white/60">Premium home health services</div>
            </div>
          </div>

          <div className="text-xs text-white/50">© {new Date().getFullYear()} American Guardian Home Health. All rights reserved.</div>
        </footer>
      </div>
    </section>
  );
}

export default function AmericanGuardianLanding() {
  return (
    <div className="min-h-screen bg-[#050A14]">
      {/* Global background texture */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.55]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 10%, rgba(51,211,213,0.16), transparent 45%), radial-gradient(circle at 90% 20%, rgba(88,153,255,0.10), transparent 50%), radial-gradient(circle at 50% 90%, rgba(51,211,213,0.12), transparent 45%)",
        }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(5,10,20,0.0),rgba(5,10,20,0.35),rgba(5,10,20,0.85))]" />

      <Nav />
      <Hero />
      <Services />
      <HowItWorks />
      <Coverage />
      <Team />
      <Contact />
    </div>
  );
}
