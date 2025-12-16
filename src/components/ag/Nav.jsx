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

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 w-full bg-gradient-to-b from-white/95 via-white to-slate-50/95 border-b border-white/70 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.4)] backdrop-blur-xl">
      <div className="mx-auto w-full max-w-[1920px] px-6 py-6 sm:px-8 lg:px-12 xl:px-16">
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
          <div className="hidden items-center gap-10 lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            {nav.map((i) => (
              <a
                key={i.href}
                href={i.href}
                className="text-base font-semibold text-slate-700 hover:text-slate-900 transition-colors py-2 tracking-tight"
              >
                {i.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons - Right */}
          <div className="hidden items-center gap-5 lg:flex">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 text-base font-semibold text-slate-700 hover:text-slate-900 transition-colors py-2"
            >
              <PhoneCall className="h-5 w-5 text-cyan-600" />
              <span className="hidden xl:inline">+1 (916) 573-3231</span>
            </a>
            <MagneticButton className="px-7 py-3.5 text-base font-bold shadow-[0_14px_40px_-18px_rgba(59,130,246,0.55)]" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
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
                <a
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3.5 text-lg font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {i.label}
                </a>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-200">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3.5 text-lg font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <PhoneCall className="h-5 w-5" />
                  +1 (916) 573-3231
                </a>
                <MagneticButton className="w-full mt-2 px-4 py-3.5 text-lg font-bold" onClick={() => { setOpen(false); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
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

