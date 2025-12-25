import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, PhoneCall, Shield, Award, CheckCircle2, BadgeCheck } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";
import MagneticButton from "./ui/MagneticButton";
import { LOGO_SRC } from "../../config/brand";
import { useReducedMotionFlag, fadeUp, staggerContainer, viewportConfig, buttonPress } from "../../lib/motion";

function Contact() {
  const reducedMotion = useReducedMotionFlag();
  const containerVariants = staggerContainer(reducedMotion);
  const buttonVariants = buttonPress(reducedMotion);

  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={containerVariants}
      className="relative bg-gradient-to-b from-orange-50/30 via-white to-amber-50/30 pt-12 sm:pt-16 lg:pt-20 pb-0 scroll-mt-24 sm:scroll-mt-28 lg:scroll-mt-32"
    >
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
                  <motion.input
                    whileFocus={{ scale: reducedMotion ? 1 : 1.01 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Full name of patient or contact person"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-base font-medium text-slate-700">Phone</span>
                  <motion.input
                    whileFocus={{ scale: reducedMotion ? 1 : 1.01 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Best phone number for follow-up"
                  />
                </label>
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-base font-medium text-slate-700">Email</span>
                  <motion.input
                    whileFocus={{ scale: reducedMotion ? 1 : 1.01 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="Email for visit confirmations (optional)"
                  />
                </label>
                <label className="grid gap-2 sm:col-span-2">
                  <span className="text-base font-medium text-slate-700">How can we help?</span>
                  <motion.textarea
                    whileFocus={{ scale: reducedMotion ? 1 : 1.01 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 hover:border-cyan-200 transition min-h-[44px] min-w-0"
                  >
                    <span className="break-all pr-2 min-w-0 flex-1">intake@americanguardianhomehealth.com</span>
                    <ArrowRight className="h-4 w-4 flex-shrink-0 ml-2" />
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
              <div className="grid gap-y-7 gap-x-8 text-sm text-slate-600 grid-cols-1 md:grid-cols-2 xl:grid-cols-12 xl:items-start">
                {/* Brand column */}
                <div className="xl:col-span-5 space-y-3 min-w-0">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className={[
                        "relative grid h-12 w-12 place-items-center overflow-hidden rounded-xl shadow-sm transition-all sm:h-14 sm:w-14 backdrop-blur-sm",
                        "bg-white/50"
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
                          className="text-2xl sm:text-3xl md:text-4xl tracking-tight bg-clip-text text-transparent drop-shadow-sm"
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
                          className="text-base sm:text-lg tracking-wide bg-clip-text text-transparent"
                          style={{ 
                            fontFamily: '"new-astro", sans-serif',
                            fontWeight: 600,
                            backgroundImage: 'linear-gradient(to right, #364f6b, #3fc1c9)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}>
                          Home Health
                        </div>
                        <div className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed break-words">
                          Serving Sacramento County • Placer County • Contra Costa County • Stanislaus County • and surrounding counties
                        </div>
                        <p className="mt-1 text-xs sm:text-sm lg:text-[13px] lg:leading-6 leading-relaxed text-slate-600">
                          9343 Tech Center Dr, Suite 140, Sacramento, CA 95826-2579
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="xl:col-span-2 min-w-0">
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
                <div className="xl:col-span-2 min-w-0">
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
                <div className="xl:col-span-3 min-w-0">
                  <div className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-500">Contact</div>

                  <div className="mt-3 space-y-2 text-sm lg:text-[13px] leading-relaxed text-slate-600">
                    <p className="min-w-0">
                      Phone:{" "}
                      <a
                        href="tel:+19165733231"
                        className="relative inline-flex items-center font-medium text-slate-700 hover:text-slate-900 break-words transition-colors transition-transform hover:translate-x-[2px] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400/0 after:via-cyan-400/70 after:to-cyan-400/0 after:transition-all hover:after:w-full"
                      >
                        +1 (916) 573-3231
                      </a>
                    </p>

                    <p className="min-w-0 break-words">
                      Email:{" "}
                      <a
                        href="mailto:intake@americanguardianhomehealth.com"
                        className="relative inline-flex items-center font-medium text-slate-700 hover:text-slate-900 break-all transition-colors transition-transform hover:translate-x-[2px] after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-gradient-to-r after:from-cyan-400/0 after:via-cyan-400/70 after:to-cyan-400/0 after:transition-all hover:after:w-full"
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

            {/* Certifications */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportConfig}
              variants={staggerContainer(reducedMotion)}
              className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 border-t border-slate-200/50"
            >
              <motion.div
                variants={fadeUp(reducedMotion)}
                className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-500 mb-4 text-center"
              >
                Accreditations & Certifications
              </motion.div>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
                <motion.div
                  variants={fadeUp(reducedMotion)}
                  className="flex items-center gap-2 rounded-xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <Award className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-900">ACHC</div>
                    <div className="text-[10px] text-slate-600">Accredited</div>
                  </div>
                </motion.div>
                <motion.div
                  variants={fadeUp(reducedMotion)}
                  className="flex items-center gap-2 rounded-xl border border-blue-200/60 bg-gradient-to-br from-blue-50/80 to-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-900">Medicare</div>
                    <div className="text-[10px] text-slate-600">Certified</div>
                  </div>
                </motion.div>
                <motion.div
                  variants={fadeUp(reducedMotion)}
                  className="flex items-center gap-2 rounded-xl border border-cyan-200/60 bg-gradient-to-br from-cyan-50/80 to-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
                >
                  <BadgeCheck className="h-5 w-5 text-cyan-600 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-slate-900">State Licensed</div>
                    <div className="text-[10px] text-slate-600">California</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

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
    </motion.section>
  );
}

export default Contact;

