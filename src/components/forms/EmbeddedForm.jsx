import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

/**
 * EmbeddedForm Component
 * 
 * Renders a responsive Jotform iframe embed with:
 * - Loading skeleton
 * - Error handling
 * - Completion message support (via Jotform Thank You redirect)
 * - Mobile-friendly height
 * 
 * @param {string} url - Jotform form URL
 * @param {string} title - Form title for accessibility
 * @param {function} onComplete - Optional callback when form is submitted
 * @param {boolean} showCompletionMessage - Whether to show completion message
 */
export default function EmbeddedForm({ 
  url, 
  title = "Form", 
  onComplete,
  showCompletionMessage = true 
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);
  const iframeRef = useRef(null);
  const checkIntervalRef = useRef(null);

  // Check if form submission completed (via URL hash or iframe message)
  useEffect(() => {
    // Check for completion in URL hash (Jotform can redirect with hash)
    const checkHash = () => {
      if (window.location.hash === "#thankyou" || window.location.hash.includes("submissionID")) {
        setCompleted(true);
        setLoading(false);
        if (onComplete) onComplete();
      }
    };

    checkHash();
    const hashInterval = setInterval(checkHash, 500);

    // Listen for postMessage from Jotform iframe
    const handleMessage = (event) => {
      // Jotform sends messages when form is submitted
      if (event.data && typeof event.data === "string") {
        if (event.data.includes("formSubmitted") || event.data.includes("submissionID")) {
          setCompleted(true);
          setLoading(false);
          if (onComplete) onComplete();
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      clearInterval(hashInterval);
      window.removeEventListener("message", handleMessage);
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [onComplete]);

  const handleIframeLoad = () => {
    setLoading(false);
    setError(null);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError("Failed to load form. Please refresh the page or contact support.");
  };

  // If form is completed, show success message
  if (completed && showCompletionMessage) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 p-8 sm:p-12 text-center shadow-lg">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 mb-6"
          >
            <CheckCircle2 className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
            Thank You!
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-6">
            Your submission has been received. Our team will review it and contact you soon.
          </p>
          <p className="text-sm text-slate-500">
            Need immediate assistance? Call{" "}
            <a href="tel:+19165733231" className="text-cyan-600 hover:text-cyan-700 font-medium">
              +1 (916) 573-3231
            </a>
          </p>
        </div>
      </motion.div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-rose-50 p-8 sm:p-12 text-center shadow-lg">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
            Unable to Load Form
          </h2>
          <p className="text-base text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Loading skeleton */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative w-full rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden"
          style={{ minHeight: "600px" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-cyan-600 animate-spin mx-auto mb-4" />
              <p className="text-sm text-slate-600">Loading form...</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Jotform iframe */}
      <div className={`relative w-full ${loading ? "opacity-0 absolute inset-0 pointer-events-none" : "opacity-100"}`}>
        <iframe
          ref={iframeRef}
          src={url}
          title={title}
          frameBorder="0"
          scrolling="auto"
          className="w-full rounded-2xl border border-slate-200 bg-white shadow-lg"
          style={{
            minHeight: "600px",
            height: "auto",
          }}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          allow="geolocation; microphone; camera"
        />
      </div>
    </div>
  );
}

