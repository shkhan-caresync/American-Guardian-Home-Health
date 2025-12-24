import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";
import GlassCard from "./ui/GlassCard";
import GlowBlob from "./ui/GlowBlob";

function PatientStories() {
  const stories = [
    {
      quote: "After my father's hip surgery, we were worried about managing his recovery at home. The team from American Guardian made everything so much easier. The nurse came regularly to check his wound, and the physical therapist helped him regain his strength safely. We felt supported every step of the way.",
      author: "Sarah M.",
      context: "Family member • Post-surgical recovery",
      color: "cyan",
    },
    {
      quote: "My mother has diabetes and COPD, and keeping track of everything was overwhelming. The nurses from American Guardian taught us what to watch for and how to manage her medications properly. They were patient, clear, and always available when we had questions. It gave us peace of mind.",
      author: "Robert T.",
      context: "Family member • Chronic disease management",
      color: "blue",
    },
    {
      quote: "When my husband had a stroke, we didn't know what to expect. The therapy team worked with him on speech and mobility, and they included me in every session so I could help him practice at home. The progress he made was remarkable, and the communication from the team was excellent.",
      author: "Linda K.",
      context: "Family member • Stroke recovery",
      color: "purple",
    },
    {
      quote: "As a referring physician, I appreciate how quickly American Guardian responds to referrals and how thorough their documentation is. They keep me updated on my patients' progress, and I can see the care plans are well-coordinated. It makes my job easier knowing my patients are in good hands.",
      author: "Dr. James P.",
      context: "Referring provider • Sacramento area",
      color: "emerald",
    },
    {
      quote: "The wound care my father received was exceptional. The nurse came twice a week, and the wound healed much faster than we expected. She also taught us how to change the dressing properly, which was really helpful. The whole experience was professional and caring.",
      author: "Maria G.",
      context: "Family member • Wound care",
      color: "orange",
    },
    {
      quote: "After my heart surgery, I needed help managing my medications and understanding what I could and couldn't do. The nurses from American Guardian explained everything clearly and made sure I felt confident before they discharged me. I'm grateful for their support during my recovery.",
      author: "David L.",
      context: "Patient • Cardiac recovery",
      color: "pink",
    },
  ];

  const colorClasses = {
    cyan: { quote: "text-cyan-600", bg: "from-cyan-50 to-blue-50", border: "border-cyan-200" },
    blue: { quote: "text-blue-600", bg: "from-blue-50 to-indigo-50", border: "border-blue-200" },
    purple: { quote: "text-purple-600", bg: "from-purple-50 to-pink-50", border: "border-purple-200" },
    emerald: { quote: "text-emerald-600", bg: "from-emerald-50 to-teal-50", border: "border-emerald-200" },
    orange: { quote: "text-orange-600", bg: "from-orange-50 to-amber-50", border: "border-orange-200" },
    pink: { quote: "text-pink-600", bg: "from-pink-50 to-rose-50", border: "border-pink-200" },
  };

  return (
    <section id="stories" className="relative bg-transparent py-12 sm:py-16 lg:py-20">
      <GlowBlob className="-left-24 top-10 h-72 w-72 opacity-70" delay={0.15} />
      <GlowBlob className="right-0 bottom-0 h-80 w-80 opacity-60" delay={0.5} />
      
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <img
          src="/images/stories-background.png"
          alt=""
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <SectionTitle
          kicker="Patient Stories"
          title="Experiences from families we support."
          desc="We regularly hear from families and providers about how home health has supported recovery and confidence at home."
        />

        <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-4 sm:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, idx) => {
            const colors = colorClasses[story.color] || colorClasses.cyan;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: idx * 0.08, duration: 0.7, ease: "easeOut" }}
              >
                <GlassCard className="h-full p-6 sm:p-7">
                  <div className={`inline-flex items-center justify-center rounded-full border ${colors.border} bg-gradient-to-br ${colors.bg} p-2 mb-4`}>
                    <Quote className={`h-5 w-5 ${colors.quote}`} />
                  </div>
                  <p className="text-base leading-relaxed text-slate-700 italic">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <div className="mt-5 pt-4 border-t border-slate-200">
                    <div className="text-sm font-semibold text-slate-900">{story.author}</div>
                    <div className="mt-1 text-sm text-slate-600">{story.context}</div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PatientStories;


