import React, { useState } from "react";
import { ArrowRight, PhoneCall } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import { LOGO_SRC } from "../../config/brand";

function Nav() {
  const [open, setOpen] = useState(false);

  const nav = [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#how" },
    { label: "Coverage", href: "#coverage" },
    { label: "Care team", href: "#team" },
    { label: "Contact", href: "#contact" },
  ];

  const careTeamSubnav = [
    { label: "For Patients", href: "#patients" },
    { label: "For Providers", href: "#providers" },
    { label: "Patient Stories", href: "#stories" },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 w-full bg-gradient-to-b from-white/95 via-white to-cyan-50/70 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)] backdrop-blur-xl">
      {/* Utility strip */}
      <div className="hidden border-b border-white/80 bg-gradient-to-r from-cyan-50 via-white to-indigo-50 text-[11px] text-slate-600 sm:block">
        <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-6 py-1.5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center gap-3">
            <span className="font-medium text-slate-800">American Guardian Home Health</span>
            <span className="hidden md:inline text-slate-500">Licensed home health agency • Sacramento, CA</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#coverage" className="hidden md:inline text-[11px] text-slate-600 hover:text-cyan-700 transition-colors">
              Locations
            </a>
            <a
              href="tel:+19165733231"
              className="inline-flex items-center gap-1.5 font-medium text-slate-800 hover:text-cyan-700 transition-colors"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>+1 (916) 573-3231</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1920px] px-6 py-3 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between gap-4">
          {/* Logo Section - Left */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md shadow-slate-300/40 sm:h-13 sm:w-13">
              <img src={LOGO_SRC} alt="American Guardian Home Health" className="h-9 w-9 object-contain sm:h-11 sm:w-11" />
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                American Guardian
              </div>
              <div className="text-sm font-medium text-slate-600 sm:text-base">Home Health</div>
            </div>
          </a>

          {/* Navigation Links - Center */}
          <div className="hidden items-center gap-8 lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {nav.map((i) => {
              if (i.label === "Care team") {
                return (
                  <div key={i.href} className="relative group">
                    <a
                      href={i.href}
                      className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors py-2 tracking-tight"
                    >
                      {i.label}
                    </a>
                    <div className="pointer-events-none absolute left-0 top-full mt-1 hidden min-w-[220px] rounded-2xl border border-slate-200 bg-white/95 p-2 text-sm text-slate-700 shadow-lg backdrop-blur group-hover:pointer-events-auto group-hover:block">
                      {careTeamSubnav.map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          className="block rounded-xl px-3 py-1.5 hover:bg-slate-50"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }
                  return (
                    <a
                      key={i.href}
                      href={i.href}
                      className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors py-2 tracking-tight"
                    >
                      {i.label}
                    </a>
                  );
            })}
          </div>

          {/* CTA Buttons - Right */}
          <div className="hidden items-center gap-5 lg:flex">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors py-2"
            >
              <PhoneCall className="h-5 w-5 text-cyan-600" />
              <span className="hidden xl:inline">+1 (916) 573-3231</span>
            </a>
            <MagneticButton
              className="px-6 py-3 text-sm font-semibold shadow-[0_14px_40px_-18px_rgba(59,130,246,0.55)]"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Request care
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center p-2.5 text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors lg:hidden"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <div className="h-0.5 w-5 bg-slate-800 rounded-full" />
              <div className="h-0.5 w-5 bg-slate-800 rounded-full" />
              <div className="h-0.5 w-5 bg-slate-800 rounded-full" />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {open ? (
          <div className="mt-4 pb-4 border-t border-gray-200 lg:hidden">
            <div className="flex flex-col gap-1 pt-4">
              {nav.map((i) => (
                <div key={i.href}>
                  <a
                    href={i.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                  >
                    {i.label}
                  </a>
                  {i.label === "Care team" && (
                    <div className="mt-1 pl-4 space-y-0.5">
                      {careTeamSubnav.map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          onClick={() => setOpen(false)}
                          className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-200">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3.5 text-base font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors min-h-[44px]"
                >
                  <PhoneCall className="h-5 w-5" />
                  +1 (916) 573-3231
                </a>
                <MagneticButton className="w-full mt-2 px-4 py-3.5 text-base font-bold min-h-[44px]" onClick={() => { setOpen(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
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

