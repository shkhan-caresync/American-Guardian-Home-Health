import React from "react";
import { motion } from "framer-motion";
import SectionTitle from "./ui/SectionTitle";
import MagneticButton from "./ui/MagneticButton";
import GlassCard from "./ui/GlassCard";
import GlowBlob from "./ui/GlowBlob";
import { useReducedMotionFlag, fadeUp, staggerContainer, viewportConfig } from "../../lib/motion";

function PatientsProviders() {
  const reducedMotion = useReducedMotionFlag();
  const containerVariants = staggerContainer(reducedMotion);

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={containerVariants}
      className="relative bg-transparent py-12 sm:py-16 lg:py-20"
    >
      <GlowBlob className="-right-32 top-10 h-80 w-80 opacity-70" delay={0.2} />
      <GlowBlob className="-left-24 bottom-0 h-72 w-72 opacity-60" delay={0.5} />

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <SectionTitle
          kicker="Who We Work With"
          title="Support for both patients and providers."
          desc="Whether you&apos;re a family member exploring home health or a clinician planning a referral, we aim to make the next steps clear."
        />

        <motion.div
          variants={staggerContainer(reducedMotion)}
          className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 lg:grid-cols-2"
        >
          {/* For Patients */}
          <motion.div
            id="patients"
            variants={fadeUp(reducedMotion)}
            viewport={viewportConfig}
          >
            <GlassCard className="h-full p-0 overflow-hidden">
              <div className="relative h-60 sm:h-72 w-full">
                <img
                  src="/images/patients-families.png"
                  alt="For patients and families"
                  className="w-full h-full object-cover object-[center_40%]"
                />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/70 via-white/40 to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
              <h3 className="text-lg font-semibold text-slate-900">For Patients & Families</h3>
              <div className="mt-4 text-base text-slate-700 space-y-3">
                <div>
                  <div className="text-base font-semibold text-slate-900">What to expect</div>
                  <ul className="mt-2 space-y-1 list-disc pl-4">
                    <li>Referral or physician orders may be required depending on your situation.</li>
                    <li>Visit frequency is based on the clinician-led plan of care and how your needs change over time.</li>
                    <li>Caregiver education is part of every plan so support continues safely between visits.</li>
                    <li>Clear communication on next steps, who is coming next, and how to reach our team.</li>
                  </ul>
                </div>
                <div>
                  <div className="mt-4 text-base font-semibold text-slate-900">What to prepare</div>
                  <ul className="mt-2 space-y-1 list-disc pl-4">
                    <li>Insurance card</li>
                    <li>Current medication list</li>
                    <li>Recent discharge paperwork (if applicable)</li>
                    <li>Primary physician contact information</li>
                  </ul>
                </div>
              </div>
              <div className="mt-5">
                <MagneticButton
                  className="px-5 py-2.5 text-sm font-semibold min-h-[44px] w-full sm:w-auto"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Request care
                </MagneticButton>
              </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* For Providers */}
          <motion.div
            id="providers"
            variants={fadeUp(reducedMotion)}
            viewport={viewportConfig}
          >
            <GlassCard className="h-full p-0 overflow-hidden">
              <div className="relative h-60 sm:h-72 w-full">
                <img
                  src="/images/providers-referral.png"
                  alt="For referring providers"
                  className="w-full h-full object-cover object-[center_40%]"
                />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/70 via-white/40 to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
              <h3 className="text-lg font-semibold text-slate-900">For Referring Providers</h3>
              <div className="mt-4 text-base text-slate-700 space-y-3">
                <div>
                  <div className="text-base font-semibold text-slate-900">Referral checklist</div>
                  <ul className="mt-2 space-y-1 list-disc pl-4">
                    <li>Patient demographics and contact information</li>
                    <li>Orders and recent clinical notes, as applicable</li>
                    <li>Primary diagnosis and relevant history</li>
                    <li>Insurance information and caregiver contact</li>
                  </ul>
                </div>
                <div>
                  <div className="mt-4 text-base font-semibold text-slate-900">How we communicate</div>
                  <p className="mt-2">
                    We align around your orders, confirm start of care, and provide ongoing updates on progress and concerns per
                    patient consent.
                  </p>
                </div>
              </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default PatientsProviders;


