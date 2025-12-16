import React from "react";
import { ArrowRight, Clock, PhoneCall, Shield } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";
import MagneticButton from "./ui/MagneticButton";
import { LOGO_SRC } from "../../config/brand";

function Contact() {
  return (
    <section id="contact" className="relative bg-gradient-to-b from-orange-50/30 via-white to-amber-50/30 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.08),rgba(251,191,36,0.06),rgba(255,255,255,0)_60%)]" />
      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <SectionTitle
          kicker="Contact"
          title="Request home health services"
          desc="Share a few details and our intake team will call you back to review eligibility, benefits, and next steps."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-1 lg:grid-cols-12">
          <GlassCard className="lg:col-span-7">
            <div className="p-7 sm:p-9">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">Full name</span>
                  <input
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Full name of patient or contact person"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">Phone</span>
                  <input
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Best phone number for follow-up"
                  />
                </label>
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Email</span>
                  <input
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Email for visit confirmations (optional)"
                  />
                </label>
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">How can we help?</span>
                  <textarea
                    rows={4}
                    className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
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
      <div className="mt-16 border-t border-white/40 bg-gradient-to-t from-white/80 via-white/60 to-transparent backdrop-blur-2xl">
        <footer className="mx-auto w-full max-w-[1920px] px-6 py-8 sm:px-8 lg:px-12 xl:px-16">
          <div className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.55)] backdrop-blur-2xl">
            <div className="grid gap-y-8 gap-x-10 text-xs text-slate-600 sm:grid-cols-2 lg:grid-cols-4 items-start">
              {/* Column 1: Brand */}
              <div>
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-cyan-100 bg-cyan-50">
                    <img src={LOGO_SRC} alt="American Guardian Home Health" className="h-9 w-9 object-contain" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">American Guardian Home Health</div>
                    <div className="text-xs text-slate-600 leading-relaxed">
                      <span className="block sm:inline">Serving Sacramento • Elk Grove • Roseville • Folsom</span>
                      <span className="block sm:inline sm:ml-1">Surrounding communities</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  Clinician-led home health focused on safe transitions home, clear expectations, and coordinated nursing and
                  therapy from our Sacramento office at 9343 Tech Center Dr, Suite 140.
                </p>
              </div>

              {/* Column 2: Services */}
              <div>
                <div className="font-semibold text-slate-900">Services</div>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a href="#services" className="hover:text-cyan-700">
                      Core services
                    </a>
                  </li>
                  <li>
                    <a href="#services" className="hover:text-cyan-700">
                      Specialty focus areas
                    </a>
                  </li>
                  <li>
                    <a href="#how" className="hover:text-cyan-700">
                      How home health works
                    </a>
                  </li>
                  <li>
                    <a href="#coverage" className="hover:text-cyan-700">
                      Coverage & service areas
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Care team & guides */}
              <div>
                <div className="font-semibold text-slate-900">Care Team & Guides</div>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a href="#team" className="hover:text-cyan-700">
                      Meet the care team
                    </a>
                  </li>
                  <li>
                    <a href="#patients" className="hover:text-cyan-700">
                      For patients & families
                    </a>
                  </li>
                  <li>
                    <a href="#providers" className="hover:text-cyan-700">
                      For referring providers
                    </a>
                  </li>
                  <li>
                    <a href="#stories" className="hover:text-cyan-700">
                      Patient stories
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 4: Contact */}
              <div className="sm:text-left lg:text-right">
                <div className="font-semibold text-slate-900">Contact</div>
                <ul className="mt-2 space-y-1 break-words">
                  <li>Phone: <a href="tel:+19165733231" className="hover:text-cyan-700">+1 (916) 573-3231</a></li>
                  <li>Email: <a href="mailto:intake@americanguardianhomehealth.com" className="hover:text-cyan-700 break-all">intake@americanguardianhomehealth.com</a></li>
                  <li>Hours: Mon–Fri 8:00am–6:00pm</li>
                  <li>After-hours triage available</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-3 text-[11px] text-slate-500 sm:flex-row">
              <div>© {new Date().getFullYear()} American Guardian Home Health.</div>
              <div>Not for emergency use—call 911 in an emergency.</div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default Contact;

