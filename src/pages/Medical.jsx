import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Lock, Shield, PhoneCall, Mail } from "lucide-react";
import EmbeddedForm from "../components/forms/EmbeddedForm";
import { FORM_URL_STAGE3, FORM_METADATA } from "../config/forms";
import { hasValidToken, getTokenFromURL } from "../utils/tokenValidation";
import Nav from "../components/ag/Nav";

export default function Medical() {
  const token = getTokenFromURL();
  const isValid = hasValidToken();
  const metadata = FORM_METADATA.stage3;

  // Progress indicator
  const progressSteps = [
    { label: "Application", completed: true },
    { label: "Onboarding", completed: true },
    { label: "Medical", completed: false, active: true },
  ];

  if (!isValid) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-cyan-50/40 via-white to-indigo-50/30">
        <Nav />
        
        <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-8 sm:p-12 text-center shadow-lg"
            >
              <Lock className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Access Required
              </h2>
              <p className="text-base text-slate-600 mb-6">
                This page contains confidential medical information and requires a valid access token. 
                Please use the link provided in your onboarding email.
              </p>
              <div className="rounded-xl border border-slate-200 bg-white p-6 mb-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Need access?</h3>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="tel:+19165733231"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                    Call Intake
                  </a>
                  <a
                    href="mailto:intake@americanguardianhomehealth.com"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email Intake
                  </a>
                </div>
              </div>
              <a
                href="/apply"
                className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
              >
                ← Return to application
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-cyan-50/40 via-white to-indigo-50/30">
      <Nav />
      
      <div className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
              {progressSteps.map((step, index) => (
                <React.Fragment key={step.label}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                        step.completed
                          ? "bg-emerald-500 text-white"
                          : step.active
                          ? "bg-cyan-600 text-white ring-4 ring-cyan-200"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium ${
                        step.active ? "text-cyan-600" : "text-slate-600"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < progressSteps.length - 1 && (
                    <div
                      className={`h-0.5 w-8 sm:w-12 ${
                        step.completed ? "bg-emerald-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Confidential Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-6"
          >
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  Confidential Medical Information
                </h3>
                <p className="text-sm text-slate-600">
                  This form collects protected health information (PHI) including TB test results, 
                  immunization records, and health attestations. All information is stored securely 
                  in our HIPAA-compliant system and is accessible only to authorized personnel.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {metadata.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
              {metadata.description}
            </p>
          </motion.div>

          {/* Embedded Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <EmbeddedForm 
              url={FORM_URL_STAGE3} 
              title={metadata.title}
              showCompletionMessage={true}
            />
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-8"
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Need help?</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+19165733231"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <PhoneCall className="w-5 h-5 text-cyan-600" />
                <span>+1 (916) 573-3231</span>
              </a>
              <a
                href="mailto:intake@americanguardianhomehealth.com"
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Mail className="w-5 h-5 text-cyan-600" />
                <span>intake@americanguardianhomehealth.com</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

