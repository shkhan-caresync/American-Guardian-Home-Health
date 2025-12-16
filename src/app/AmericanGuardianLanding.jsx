import React from "react";
import Nav from "../components/ag/Nav";
import Hero from "../components/ag/Hero";
import WhyAmericanGuardian from "../components/ag/WhyAmericanGuardian";
import Services from "../components/ag/Services";
import HowItWorks from "../components/ag/HowItWorks";
import Coverage from "../components/ag/Coverage";
import PatientsProviders from "../components/ag/PatientsProviders";
import Team from "../components/ag/Team";
import PatientStories from "../components/ag/PatientStories";
import Contact from "../components/ag/Contact";

export default function AmericanGuardianLanding() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-cyan-50/40 via-white via-indigo-50/30 to-teal-50/40">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-80"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 12%, rgba(59,130,246,0.12), transparent 46%), radial-gradient(circle at 88% 18%, rgba(168,85,247,0.10), transparent 50%), radial-gradient(circle at 48% 88%, rgba(34,211,238,0.12), transparent 45%), radial-gradient(circle at 20% 80%, rgba(236,72,153,0.08), transparent 40%)",
        }}
      />

      <Nav />
      <Hero />
      <WhyAmericanGuardian />
      <Services />
      <HowItWorks />
      <Coverage />
      <PatientsProviders />
      <Team />
      <PatientStories />
      <Contact />
    </div>
  );
}

