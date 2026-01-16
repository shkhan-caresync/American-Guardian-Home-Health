import React from "react";
import { motion } from "framer-motion";
import { Clock, Shield, FileText, PhoneCall, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Stage1Form from "../components/forms/Stage1Form";
import { FORM_METADATA } from "../config/forms";
import Nav from "../components/ag/Nav";

export default function Apply() {
  const metadata = FORM_METADATA.stage1;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-cyan-50/40 via-white to-indigo-50/30">
      <Nav />
      
      <div className="pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 scroll-mt-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Intro Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
            id="apply-title"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Join the American Guardian Team
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto mb-6">
              {metadata.description}
            </p>
            
            {/* Time Estimate */}
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm text-cyan-700">
              <Clock className="w-4 h-4" />
              <span>Estimated time: {metadata.estimatedTime}</span>
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-3 mb-12"
          >
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-center">
              <FileText className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-900">No PHI Collected</div>
              <div className="text-xs text-slate-600 mt-1">Basic information only</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-center">
              <Shield className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-900">Secure Submission</div>
              <div className="text-xs text-slate-600 mt-1">HIPAA-compliant platform</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/80 p-4 text-center">
              <Clock className="w-6 h-6 text-cyan-600 mx-auto mb-2" />
              <div className="text-sm font-semibold text-slate-900">Quick Process</div>
              <div className="text-xs text-slate-600 mt-1">Fast review & response</div>
            </div>
          </motion.div>

          {/* Custom Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-slate-200 bg-white/80 p-6 sm:p-8 lg:p-10 shadow-lg"
          >
            <Stage1Form />
          </motion.div>

          {/* Help Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
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

