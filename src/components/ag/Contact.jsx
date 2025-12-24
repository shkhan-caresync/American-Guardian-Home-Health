import React from "react";
import { ArrowRight, Clock, PhoneCall, Shield } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";
import MagneticButton from "./ui/MagneticButton";
import { LOGO_SRC } from "../../config/brand";

function Contact() {
  return (
    <section id="contact" className="relative bg-gradient-to-b from-orange-50/30 via-white to-amber-50/30 pt-12 sm:pt-16 lg:pt-20 pb-0 scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.08),rgba(251,191,36,0.06),rgba(255,255,255,0)_60%)]" />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <SectionTitle
          kicker="Contact"
          title="Request home health services"
          desc="Share a few details and our intake team will call you back to review eligibility, benefits, and next steps."
        />

        <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-6 lg:grid-cols-12">
          <GlassCard className="lg:col-span-7">
            <div className="p-5 sm:p-7 md:p-9">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-base font-medium text-slate-700">Full name</span>
                  <input
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Full name of patient or contact person"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-base font-medium text-slate-700">Phone</span>
                  <input
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Best phone number for follow-up"
                  />
                </label>
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-base font-medium text-slate-700">Email</span>
                  <input
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Email for visit confirmations (optional)"
                  />
                </label>
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-base font-medium text-slate-700">How can we help?</span>
                  <textarea
                    rows={4}
                    className="rounded-2xl border border-slate-200 bg-white p-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Who is the patient, what support do they need, and what city are they located in?"
                  />
                </label>
              </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-slate-600 leading-relaxed">
                  By submitting, you agree to be contacted about services. For emergencies, call 911.
                </div>
                <MagneticButton className="whitespace-nowrap min-h-[44px] w-full sm:w-auto">
                  Submit request
                </MagneticButton>
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-5">
            <div className="grid gap-6">
              <GlassCard className="p-0 overflow-hidden">
                <div className="relative h-56 sm:h-64 w-full">
                  <img
                    src="/images/contact-intake.png"
                    alt="Contact intake"
                    className="w-full h-full object-cover object-[center_35%]"
                  />
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/70 via-white/40 to-transparent" />
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Speak with intake</div>
                      <div className="mt-1 text-sm text-slate-600">Fast scheduling and coverage verification</div>
                    </div>
                    <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3">
                      <PhoneCall className="h-6 w-6 text-cyan-500" />
                    </div>
                  </div>

                <div className="mt-5 space-y-3">
                  <a
                    href="tel:+19165733231"
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 hover:border-cyan-200 transition"
                  >
                    <span>+1 (916) 573-3231</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <span>Fax</span>
                    <span>+1 (916) 415-2574</span>
                  </div>
                  <a
                    href="mailto:intake@americanguardianhomehealth.com"
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 hover:border-cyan-200 transition min-h-[44px]"
                  >
                    <span className="break-all pr-2">intake@americanguardianhomehealth.com</span>
                    <ArrowRight className="h-4 w-4 flex-shrink-0" />
                  </a>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Shield className="h-4 w-4 text-cyan-500" />
                    Premium standards
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Modern documentation, reliable follow-through, and a family experience that feels calm and professional.
                  </p>
                </div>
                </div>
              </GlassCard>

              <GlassCard className="p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Hours</div>
                    <div className="mt-1 text-sm text-slate-600">Mon–Fri 8am–6pm • After-hours triage</div>
                  </div>
                  <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3">
                    <Clock className="h-6 w-6 text-cyan-500" />
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

      </div>
      {/* Global footer */}
      <footer className="relative w-full mt-8 sm:mt-10 lg:mt-12">
        {/* Full-bleed background band (edge-to-edge) */}
        <div className="absolute inset-0 -z-10 w-full">
          <div className="h-full w-full border-t border-white/30 bg-white/20 backdrop-blur-[1px]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(51,211,213,0.14),rgba(255,255,255,0)_60%)]" />
        </div>

        {/* Constrained content padding only (card is full-width) */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 sm:py-10">
          <div className="w-full rounded-2xl sm:rounded-3xl border border-white/60 bg-white/70 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.40)] backdrop-blur-2xl">
            {/* Signature accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent opacity-80" />

            {/* Top grid area */}
            <div className="px-4 py-7 sm:px-6 sm:py-8 lg:px-8">
              <div className="grid gap-y-7 gap-x-8 text-sm text-slate-600 md:grid-cols-2 lg:grid-cols-12 lg:items-start">
                {/* Brand column */}
                <div className="lg:col-span-5 space-y-3 min-w-0">
                    <div className="flex items-start gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-cyan-100 bg-cyan-50">
                        <img
                          src={LOGO_SRC}
                          alt="American Guardian Home Health"
                          className="h-9 w-9 object-contain"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="text-lg font-semibold tracking-tight text-slate-900">
                          American Guardian Home Health
                        </div>
                        <div className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Serving Sacramento • Elk Grove • Roseville • Folsom • Surrounding communities
                        </div>
                      </div>
                    </div>

                    <p className="max-w-[34ch] text-xs sm:text-sm lg:text-[13px] lg:leading-6 leading-relaxed text-slate-600">
                      9343 Tech Center Dr, Suite 140, Sacramento, CA 95826-2579
                    </p>
                  </div>

                  {/* Services */}
                  <div className="lg:col-span-2">
                    <div className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-500">Services</div>
                    <ul className="mt-3 space-y-2 text-sm lg:text-[13px]">
                      <li>
                        <a
                          href="#services"
                          className="relative inline-flex items-center text-slate-600 transition-colors transition-transform hover:text-slate-900 hover:translate-x-[2px] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400/0 after:via-cyan-400/70 after:to-cyan-400/0 after:transition-all hover:after:w-full"
                        >
                          Core services
                        </a>
                      </li>
                      <li>
                        <a
                          href="#services"
                          className="relative inline-flex items-center text-slate-600 transition-colors transition-transform hover:text-slate-900 hover:translate-x-[2px] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400/0 after:via-cyan-400/70 after:to-cyan-400/0 after:transition-all hover:after:w-full"
                        >
                          Specialty focus areas
                        </a>
                      </li>
                      <li>
                        <a
                          href="#how"
                          className="relative inline-flex items-center text-slate-600 transition-colors transition-transform hover:text-slate-900 hover:translate-x-[2px] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400/0 after:via-cyan-400/70 after:to-cyan-400/0 after:transition-all hover:after:w-full"
                        >
                          How home health works
                        </a>
                      </li>
                      <li>
                        <a
                          href="#coverage"
                          className="relative inline-flex items-center text-slate-600 transition-colors transition-transform hover:text-slate-900 hover:translate-x-[2px] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400/0 after:via-cyan-400/70 after:to-cyan-400/0 after:transition-all hover:after:w-full"
                        >
                          Coverage &amp; service areas
                        </a>
                      </li>
                    </ul>
                  </div>

                {/* Care Team & Guides */}
                <div className="lg:col-span-2">
                  <div className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-500">Care Team &amp; Guides</div>
                  <ul className="mt-3 space-y-2 text-sm lg:text-[13px]">
                    <li>
                      <a
                        href="#team"
                        className="relative inline-flex items-center text-slate-600 transition-colors transition-transform hover:text-slate-900 hover:translate-x-[2px] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400/0 after:via-cyan-400/70 after:to-cyan-400/0 after:transition-all hover:after:w-full"
                      >
                        Meet the care team
                      </a>
                    </li>
                    <li>
                      <a
                        href="#patients"
                        className="relative inline-flex items-center text-slate-600 transition-colors transition-transform hover:text-slate-900 hover:translate-x-[2px] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400/0 after:via-cyan-400/70 after:to-cyan-400/0 after:transition-all hover:after:w-full"
                      >
                        For patients &amp; families
                      </a>
                    </li>
                    <li>
                      <a
                        href="#providers"
                        className="relative inline-flex items-center text-slate-600 transition-colors transition-transform hover:text-slate-900 hover:translate-x-[2px] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400/0 after:via-cyan-400/70 after:to-cyan-400/0 after:transition-all hover:after:w-full"
                      >
                        For referring providers
                      </a>
                    </li>
                    <li>
                      <a
                        href="#stories"
                        className="relative inline-flex items-center text-slate-600 transition-colors transition-transform hover:text-slate-900 hover:translate-x-[2px] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400/0 after:via-cyan-400/70 after:to-cyan-400/0 after:transition-all hover:after:w-full"
                      >
                        Patient stories
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact */}
                <div className="lg:col-span-3">
                  <div className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-500">Contact</div>

                  <div className="mt-3 space-y-2 text-sm lg:text-[13px] leading-relaxed text-slate-600">
                    <p>
                      Phone:{" "}
                      <a
                        href="tel:+19165733231"
                        className="relative inline-flex items-center font-medium text-slate-700 hover:text-slate-900 transition-colors transition-transform hover:translate-x-[2px] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400/0 after:via-cyan-400/70 after:to-cyan-400/0 after:transition-all hover:after:w-full"
                      >
                        +1 (916) 573-3231
                      </a>
                    </p>

                    <p className="min-w-0">
                      Email:{" "}
                      <a
                        href="mailto:intake@americanguardianhomehealth.com"
                        className="relative inline-flex items-center font-medium text-slate-700 hover:text-slate-900 break-words transition-colors transition-transform hover:translate-x-[2px] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400/0 after:via-cyan-400/70 after:to-cyan-400/0 after:transition-all hover:after:w-full"
                      >
                        intake@americanguardianhomehealth.com
                      </a>
                    </p>

                    <p>Hours: Mon–Fri 8:00am–6:00pm</p>
                    <p>After-hours triage available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom legal bar */}
            <div className="px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/80 to-transparent mb-3" />
              <div className="flex flex-col gap-2 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div>© {new Date().getFullYear()} American Guardian Home Health.</div>
                  <div className="text-[11px] text-slate-500/90">
                    HIPAA-aware communications • After-hours triage
                  </div>
                </div>
                <div className="text-[11px] text-slate-500/90">Not for emergency use—call 911 in an emergency.</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Contact;

