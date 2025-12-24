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

  // Handle smooth scroll with nav offset
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const navElement = document.querySelector("nav");
      const navHeight = navElement ? navElement.offsetHeight : 120; // fallback to ~120px
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - navHeight + 24; // Reduced offset - section appears lower

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActive(href);
    }
  };

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
      {/* Combined nav container for seamless blend */}
      <div className={[
        "backdrop-blur-xl transition-all duration-300",
        scrolled
          ? "bg-gradient-to-b from-cyan-50/40 via-white/35 to-indigo-50/30 shadow-[0_8px_30px_-15px_rgba(15,23,42,0.15)]"
          : "bg-gradient-to-b from-cyan-50/50 via-white via-indigo-50/30 shadow-none",
      ].join(" ")}>
        {/* Announcement strip - seamless blend */}
        <div className="hidden sm:block">
          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <div className="flex w-full items-center justify-center py-2 sm:py-2.5">
              <p className="truncate text-[11px] sm:text-xs text-slate-700/75">
                Licensed home health agency • Serving Sacramento, Elk Grove, Roseville & Folsom
              </p>
            </div>
          </div>
        </div>

        {/* Main nav bar - seamless continuation */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="relative flex w-full items-center justify-between py-4 sm:py-5 lg:py-6">
            {/* Left: Brand */}
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-2 sm:gap-3">
                <div className={[
                  "relative grid h-12 w-12 place-items-center overflow-hidden rounded-xl shadow-sm transition-all sm:h-14 sm:w-14 backdrop-blur-sm",
                  scrolled
                    ? "bg-white/60"
                    : "bg-white/50",
                ].join(" ")}>
                  <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 1200 1200" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 sm:h-10 sm:w-10"
                    fill="currentColor"
                  >
                    <g transform="scale(10.799934906398192) translate(3.055194218953451, 3.0558923085530623)">
                      <g fill="#3fc1c9">
                        <g xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.898,46.434"/>
                          <path d="M92.544,39.92c0,3.119-0.937,6.005-2.482,8.504h10.884c0.96-2.67,1.555-5.509,1.555-8.504   c0-14.716-12.22-26.684-27.239-26.684c-8.168,0-15.424,3.613-20.421,9.215c-5.273-5.602-12.938-9.215-21.563-9.215   c-10.964,0-20.407,5.794-25.252,14.193l8.501,5.049c3.086-5.486,9.391-9.291,16.751-9.291c6.975,0,13.317,2.753,17.578,7.404   c1.093,1.193,4.407,5.172,4.407,5.172s3.533-3.806,4.569-5.172c3.485-4.613,9.081-7.404,15.429-7.404   C84.804,23.188,92.544,30.677,92.544,39.92z"/>
                          <path d="M74.505,56.925c-0.552-2.489,0-5.251,0-5.251c-7.674,2.885-10.508,15.205-10.508,15.205l-8.572,16.037   c-3.595-20.74-13.698-29.008-17.883-34.492c-3.224-4.229-8.996-11.469-8.111-8.918c0.86,2.478,0,5.529,0,5.529   C28.047,42.273,18.096,38.4,18.096,38.4C4.825,33.422,5.187,24.485,5.187,24.485c-4.465,9.18-2.881,19.396,1.218,29.263   c5.044,12.142,29.968,23.317,36.297,26.957c7.369,4.236,10.465,11.059,10.465,11.059h1.707l1.184-1.549   c3.595-5.533,11.202-10.879,16.047-13.338c9.628-4.893,18.805-15.485,18.805-15.485c3.79-3.958,10.741-9.114,10.741-9.114   C87.675,47.104,74.505,56.925,74.505,56.925z M27.634,60.165c-8.578-4.228-13.827-14.088-13.827-14.088s4.688,6.732,15.016,12.317   c2.425,1.312,4.755,3.068,6.933,5.051c0.1-1.944-0.238-3.937-0.837-5.334c-2.178-5.064-3.105-8.117-3.105-8.117   s2.021,3.553,4.304,8.117c1.141,2.287,1.412,4.793,1.412,7.022l-0.034-0.017c8.383,8.361,14.179,19.425,14.179,19.425   S39.701,66.115,27.634,60.165z M73.592,70.566C66.099,73.487,58.03,83.846,58.03,83.846s4.018-6.288,9.433-10.838l-0.019,0.009   c0.114-1.326,0.404-2.806,1.203-4.108c1.593-2.6,2.976-4.611,2.976-4.611s-0.708,1.769-2.263,4.674   c-0.428,0.799-0.732,1.969-0.771,3.133c1.397-1.069,2.872-1.996,4.384-2.652c6.434-2.796,9.571-6.564,9.571-6.564   S78.912,68.49,73.592,70.566z"/>
                          <path d="M42.002,68.139"/>
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>
                <div className="leading-tight">
                  <div 
                    className="text-xl sm:text-2xl md:text-3xl tracking-tight bg-clip-text text-transparent drop-shadow-sm"
                    style={{ 
                      fontFamily: '"new-astro", sans-serif',
                      fontWeight: 700,
                      backgroundImage: 'linear-gradient(to right, #364f6b, #3fc1c9, #364f6b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                    American Guardian
                  </div>
                  <div 
                    className="text-sm sm:text-base tracking-wide bg-clip-text text-transparent"
                    style={{ 
                      fontFamily: '"new-astro", sans-serif',
                      fontWeight: 600,
                      backgroundImage: 'linear-gradient(to right, #364f6b, #3fc1c9)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
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
                        onClick={(e) => handleNavClick(e, item.href)}
                        onMouseEnter={() => setHoverHref(item.href)}
                        onMouseLeave={() => setHoverHref(null)}
                        className={[
                          "relative py-2 text-sm font-medium tracking-[0.01em] transition-colors",
                          scrolled
                            ? (isActive ? "text-slate-900" : "text-slate-600 hover:text-slate-900")
                            : (isActive ? "text-slate-800" : "text-slate-700/90 hover:text-slate-900"),
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
                      backgroundColor: scrolled ? "rgb(6, 182, 212)" : "rgb(8, 145, 178)",
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
                  className={[
                    "inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-all backdrop-blur-sm",
                    scrolled
                      ? "bg-white/50 text-slate-800 hover:bg-white/70"
                      : "bg-white/40 text-slate-800 hover:bg-white/60",
                  ].join(" ")}
                >
                  <PhoneCall className="h-4 w-4 text-cyan-600" />
                  <span>+1 (916) 573-3231</span>
                </a>
                <MagneticButton
                  className="h-12 px-6 text-sm font-semibold"
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
                className={[
                  "inline-flex items-center justify-center rounded-xl p-2.5 backdrop-blur transition-all",
                  scrolled
                    ? "bg-white/50 text-slate-800 hover:bg-white/70"
                    : "bg-white/40 text-slate-800 hover:bg-white/60",
                ].join(" ")}
                aria-label="Toggle navigation"
              >
                <div className="space-y-1.5">
                  <span className="block h-0.5 w-6 rounded-full bg-slate-900" />
                  <span className="block h-0.5 w-6 rounded-full bg-slate-900" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open ? (
          <div className={[
            "lg:hidden backdrop-blur-xl transition-all",
            scrolled
              ? "bg-white/50"
              : "bg-white/40",
          ].join(" ")}>
            <div className="flex w-full flex-col gap-1 px-4 pb-4 pt-2 sm:px-6">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    handleNavClick(e, item.href);
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
              <div className="mt-2 flex flex-col gap-2 border-t border-slate-200/50 pt-3">
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

