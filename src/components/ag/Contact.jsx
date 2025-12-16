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
          title="Request care in minutes"
          desc="Drop in your real phone/email and wire this form to your CRM (HubSpot, Salesforce, etc.)."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <GlassCard className="lg:col-span-7">
            <div className="p-7 sm:p-9">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">Full name</span>
                  <input
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Your name"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">Phone</span>
                  <input
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="(xxx) xxx-xxxx"
                  />
                </label>
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Email</span>
                  <input
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="you@email.com"
                  />
                </label>
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">How can we help?</span>
                  <textarea
                    rows={4}
                    className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Tell us about your loved one's situation, timeline, and location."
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-slate-600">
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
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="pointer-events-none absolute inset-0 opacity-50">
                  <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-100/40 blur-3xl" />
                </div>
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Speak with intake</div>
                    <div className="mt-1 text-sm text-slate-600">Fast scheduling and coverage verification</div>
                  </div>
                  <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3">
                    <PhoneCall className="h-6 w-6 text-cyan-500" />
                  </div>
                </div>

                <div className="relative mt-5 space-y-3">
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
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 hover:border-cyan-200 transition"
                  >
                    <span>intake@americanguardianhomehealth.com</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="relative mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Shield className="h-4 w-4 text-cyan-500" />
                    Premium standards
                  </div>
                  <p className="mt-2 text-sm text-slate-600">
                    Modern documentation, reliable follow-through, and a family experience that feels calm and professional.
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="pointer-events-none absolute inset-0 opacity-50">
                  <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-sky-100/40 blur-3xl" />
                </div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">Hours</div>
                    <div className="mt-1 text-sm text-slate-600">Mon–Fri 8am–6pm • After-hours triage</div>
                  </div>
                  <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-3">
                    <Clock className="h-6 w-6 text-cyan-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <footer className="mt-10 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-cyan-100 bg-cyan-50">
              <img src={LOGO_SRC} alt="American Guardian Home Health" className="h-9 w-9 object-contain" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">American Guardian Home Health</div>
              <div className="text-xs text-slate-600">Premium home health services</div>
            </div>
          </div>

          <div className="text-xs text-slate-500">© {new Date().getFullYear()} American Guardian Home Health. All rights reserved.</div>
        </footer>
      </div>
    </section>
  );
}

export default Contact;

