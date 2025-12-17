import React, { useEffect, useMemo, useRef, useState } from "react";
import { PhoneCall } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import { LOGO_SRC } from "../../config/brand";

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#services");
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const [hoverHref, setHoverHref] = useState(null);
  const [indicatorReady, setIndicatorReady] = useState(false);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#how" },
    { label: "Coverage", href: "#coverage" },
    { label: "Care team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = nav.map((item) => item.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => (typeof document !== "undefined" ? document.getElementById(id) : null))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [nav]);

  // Position and size shared indicator based on active / hover
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;

    const targetHref = hoverHref || active;
    const targetLink = navRef.current.querySelector(
      `[data-href="${targetHref}"]`
    );

    if (!targetLink) return;

    const linkRect = targetLink.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();

    const left = linkRect.left - navRect.left;
    const width = linkRect.width;

    const indicator = indicatorRef.current;
    indicator.style.width = `${width}px`;
    indicator.style.transform = `translateX(${left}px)`;

    if (!indicatorReady) setIndicatorReady(true);
  }, [active, hoverHref, indicatorReady]);

  // Hover color shift for indicator
  useEffect(() => {
    if (!indicatorRef.current) return;

    const ACTIVE = "rgb(6, 182, 212)"; // cyan-500
    const HOVER = "rgb(34, 211, 238)"; // cyan-400-ish

    indicatorRef.current.style.backgroundColor = hoverHref ? HOVER : ACTIVE;
  }, [hoverHref]);

  // Respond to reduced-motion preference changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      // minimal no-op state update to keep hook dependencies aware
      setIndicatorReady((v) => v);
    };

    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 w-full">
      {/* Announcement strip */}
      <div className="hidden border-b border-white/70 bg-gradient-to-r from-cyan-50 via-white to-indigo-50 text-[11px] text-slate-600 sm:block">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="flex w-full items-center justify-center py-1 sm:py-1.5">
            <p className="truncate">
              Licensed home health agency • Serving Sacramento, Elk Grove, Roseville & Folsom
            </p>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div
        className={[
          "border-b backdrop-blur-xl transition-all",
          scrolled
            ? "border-slate-200 bg-white/90 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.28)]"
            : "border-slate-200 bg-gradient-to-b from-white/95 via-white to-cyan-50/70 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.20)]",
        ].join(" ")}
      >
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="relative flex w-full items-center justify-between py-3.5 sm:py-4 lg:py-5">
            {/* Left: Brand */}
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-2 sm:gap-3">
                <div className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:h-11 sm:w-11">
                  <img
                    src={LOGO_SRC}
                    alt="American Guardian Home Health"
                    className="h-7 w-7 object-contain sm:h-8 sm:w-8"
                  />
                </div>
                <div className="leading-tight">
                  <div className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
                    American Guardian
                  </div>
                  <div className="text-[11px] sm:text-xs md:text-[13px] text-slate-500">
                    Home Health
                  </div>
                </div>
              </a>
            </div>

            {/* Center: Desktop nav (absolutely centered) */}
            <div className="pointer-events-none absolute inset-x-0 flex justify-center">
              <div className="hidden lg:flex lg:flex-1 lg:justify-center pointer-events-auto">
                <div ref={navRef} className="relative flex items-center gap-8">
                  {nav.map((item) => {
                    const isActive = active === item.href;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        data-href={item.href}
                        onClick={() => setActive(item.href)}
                        onMouseEnter={() => setHoverHref(item.href)}
                        onMouseLeave={() => setHoverHref(null)}
                        className={[
                          "relative py-2 text-sm font-medium tracking-[0.01em] transition-colors",
                          isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900",
                        ].join(" ")}
                      >
                        {item.label}
                      </a>
                    );
                  })}

                  {/* Shared sliding indicator */}
                  <span
                    ref={indicatorRef}
                    className={[
                      "pointer-events-none absolute -bottom-1 h-[2px] rounded-full",
                      indicatorReady ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                    style={{
                      width: 0,
                      transform: "translateX(0px)",
                      transitionProperty: "transform,width,background-color,opacity",
                      transitionDuration: prefersReducedMotion ? "0ms" : "360ms",
                      transitionTimingFunction: prefersReducedMotion
                        ? "linear"
                        : "cubic-bezier(0.16, 1, 0.3, 1)",
                      backgroundColor: "rgb(6, 182, 212)",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right: Desktop actions + mobile button */}
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-4 lg:flex">
                <a
                  href="tel:+19165733231"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-white/40 px-4 text-sm font-semibold text-slate-800 ring-1 ring-slate-200/60 transition-all hover:bg-white/60 hover:ring-slate-200/80"
                >
                  <PhoneCall className="h-4 w-4 text-cyan-600" />
                  <span>+1 (916) 573-3231</span>
                </a>
                <MagneticButton
                  className="h-10 px-5 text-sm font-semibold"
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Request care
                </MagneticButton>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/60 p-2 text-slate-800 backdrop-blur hover:bg-white/80 lg:hidden"
                aria-label="Toggle navigation"
              >
                <div className="space-y-1">
                  <span className="block h-0.5 w-5 rounded-full bg-slate-900" />
                  <span className="block h-0.5 w-5 rounded-full bg-slate-900" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open ? (
          <div className="border-t border-slate-200 bg-white/95 lg:hidden">
            <div className="flex w-full flex-col gap-1 px-4 pb-4 pt-2 sm:px-6">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    setActive(item.href);
                    setOpen(false);
                  }}
                  className={[
                    "flex items-center rounded-lg px-3 py-3 text-sm font-medium transition",
                    active === item.href
                      ? "bg-slate-50 text-slate-900 ring-1 ring-slate-200"
                      : "text-slate-800 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-slate-200 pt-3">
                <a
                  href="tel:+19165733231"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  <PhoneCall className="h-4 w-4 text-cyan-600" />
                  +1 (916) 573-3231
                </a>
                <MagneticButton
                  className="w-full px-3 py-3 text-sm font-semibold"
                  onClick={() => {
                    setOpen(false);
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Request care
                </MagneticButton>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}

export default Nav;

