import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import GlassInput from "../ag/ui/GlassInput";
import GlassSelect from "../ag/ui/GlassSelect";
import MagneticButton from "../ag/ui/MagneticButton";
import FileUpload from "./FileUpload";
import { submitToJotform } from "../../services/jotformApi";
import { FORM_ID_STAGE1 } from "../../config/forms";
import { US_STATES } from "../../utils/usStates";

const ROLE_OPTIONS = [
  { value: "", label: "Select a role..." },
  { value: "RN – Registered Nurse (CA)", label: "RN – Registered Nurse (CA)" },
  { value: "LVN – Licensed Vocational Nurse (CA)", label: "LVN – Licensed Vocational Nurse (CA)" },
  { value: "PT – Physical Therapist (CA)", label: "PT – Physical Therapist (CA)" },
  { value: "PTA – Physical Therapist Assistant (CA)", label: "PTA – Physical Therapist Assistant (CA)" },
  { value: "OT – Occupational Therapist (CA)", label: "OT – Occupational Therapist (CA)" },
  { value: "OTA – Occupational Therapy Assistant (CA)", label: "OTA – Occupational Therapy Assistant (CA)" },
  { value: "SLP – Speech-Language Pathologist (CA)", label: "SLP – Speech-Language Pathologist (CA)" },
  { value: "MSW / LCSW – Medical Social Worker", label: "MSW / LCSW – Medical Social Worker" },
  { value: "ASW – Associate Clinical Social Worker", label: "ASW – Associate Clinical Social Worker" },
  { value: "HHA – Home Health Aide (CDPH)", label: "HHA – Home Health Aide (CDPH)" },
  { value: "CNA – Certified Nursing Assistant (CDPH)", label: "CNA – Certified Nursing Assistant (CDPH)" },
  { value: "Other (Specify)", label: "Other (Specify)" },
];

const AVAILABILITY_OPTIONS = [
  { value: "", label: "Select availability..." },
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Per diem", label: "Per diem" },
];

export default function Stage1Form({ onComplete }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    roleAppliedFor: "",
    licenseState: "",
    licenseNumber: "",
    licenseExpiry: "",
    availability: "",
    workAuthorizedUS: "",
    reliableTransportation: "",
    employmentHistory: "",
    reference1FirstName: "",
    reference1LastName: "",
    reference1Phone: "",
    reference1Email: "",
    reference2FirstName: "",
    reference2LastName: "",
    reference2Phone: "",
    reference2Email: "",
    attestation: false,
  });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    
    // Email validation with regex
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    // Phone validation with regex (US format)
    if (!formData.phone.trim()) {
      newErrors.phone = "Required";
    } else {
      const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = "Invalid phone number format";
      }
    }
    
    if (!formData.address.trim()) newErrors.address = "Required";
    if (!formData.roleAppliedFor.trim()) newErrors.roleAppliedFor = "Required";
    if (!formData.licenseState.trim()) newErrors.licenseState = "Required";
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = "Required";
    if (!formData.workAuthorizedUS) newErrors.workAuthorizedUS = "Required";
    if (!formData.reliableTransportation) newErrors.reliableTransportation = "Required";
    if (!formData.reference1FirstName.trim()) newErrors.reference1FirstName = "Required";
    if (!formData.reference1LastName.trim()) newErrors.reference1LastName = "Required";
    if (!formData.reference2FirstName.trim()) newErrors.reference2FirstName = "Required";
    if (!formData.reference2LastName.trim()) newErrors.reference2LastName = "Required";
    if (!formData.attestation && formData.attestation !== true) newErrors.attestation = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      // Prepare files array
      const files = resume ? [resume] : [];
      
      // Submit to Jotform
      const result = await submitToJotform(FORM_ID_STAGE1, formData, files);
      
      // Check if any files were skipped
      if (result.skippedFiles && result.skippedFiles.length > 0) {
        const fileNames = result.skippedFiles.map(f => f.name).join(', ');
        alert(`Application submitted successfully!\n\nNote: The following file(s) were too large to upload (max 2MB): ${fileNames}\n\nPlease email your resume separately to intake@americanguardianhomehealth.com`);
      }
      
      setSubmitted(true);
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Submission error:", error);
      
      // Show more detailed error message
      let errorMessage = "Failed to submit application. ";
      
      if (error.message) {
        if (error.message.includes("API key not configured")) {
          errorMessage += "Configuration error: API key missing. Please contact support.";
        } else if (error.message.includes("Form ID")) {
          errorMessage += "Configuration error: Form ID missing. Please contact support.";
        } else if (error.message.includes("401") || error.message.includes("403")) {
          errorMessage += "Authentication error. Please check API configuration.";
        } else if (error.message.includes("404")) {
          errorMessage += "Form not found. Please check form ID.";
        } else if (error.message.includes("too large") || error.message.includes("URI")) {
          errorMessage += "The resume file is too large. Please use a file smaller than 2MB or email it separately to intake@americanguardianhomehealth.com";
        } else {
          errorMessage += error.message;
        }
      } else {
        errorMessage += "Please try again or contact support at +1 (916) 573-3231";
      }
      
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 p-8 sm:p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500 mb-6"
        >
          <CheckCircle2 className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
          Application Submitted!
        </h2>
        <p className="text-base sm:text-lg text-slate-600">
          Thank you for your interest. Our team will review your application and contact you soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Personal Information</h3>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <GlassInput
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              placeholder="John"
              required
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <GlassInput
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              placeholder="Doe"
              required
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <GlassInput
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="john@example.com"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <GlassInput
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="(916) 555-1234"
              required
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Address <span className="text-red-500">*</span>
          </label>
          <GlassInput
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            placeholder="123 Main St"
            required
            className="w-full"
          />
          {errors.address && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.address}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
            <GlassInput
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              placeholder="Sacramento"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
            <GlassSelect
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
            >
              <option value="">Select state...</option>
              {US_STATES.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </GlassSelect>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">ZIP Code</label>
            <GlassInput
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
              placeholder="95826"
            />
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Professional Information</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Role Applied For <span className="text-red-500">*</span>
          </label>
          <GlassSelect
            value={formData.roleAppliedFor}
            onChange={(e) => setFormData({...formData, roleAppliedFor: e.target.value})}
            required
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </GlassSelect>
          {errors.roleAppliedFor && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.roleAppliedFor}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              License State <span className="text-red-500">*</span>
            </label>
            <GlassSelect
              value={formData.licenseState}
              onChange={(e) => setFormData({...formData, licenseState: e.target.value})}
              required
            >
              <option value="">Select state...</option>
              {US_STATES.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </GlassSelect>
            {errors.licenseState && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.licenseState}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              License Number <span className="text-red-500">*</span>
            </label>
            <GlassInput
              value={formData.licenseNumber}
              onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
              placeholder="123456"
              required
            />
            {errors.licenseNumber && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.licenseNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">License Expiry</label>
            <GlassInput
              type="date"
              value={formData.licenseExpiry}
              onChange={(e) => setFormData({...formData, licenseExpiry: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Availability & Qualifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">Availability & Qualifications</h3>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Availability</label>
          <GlassSelect
            value={formData.availability}
            onChange={(e) => setFormData({...formData, availability: e.target.value})}
          >
            {AVAILABILITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </GlassSelect>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Work Authorized in US <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="workAuthorizedUS"
                value="yes"
                checked={formData.workAuthorizedUS === "yes"}
                onChange={(e) => setFormData({...formData, workAuthorizedUS: e.target.value})}
                className="w-4 h-4 text-cyan-600"
              />
              <span className="text-sm text-slate-700">Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="workAuthorizedUS"
                value="no"
                checked={formData.workAuthorizedUS === "no"}
                onChange={(e) => setFormData({...formData, workAuthorizedUS: e.target.value})}
                className="w-4 h-4 text-cyan-600"
              />
              <span className="text-sm text-slate-700">No</span>
            </label>
          </div>
          {errors.workAuthorizedUS && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.workAuthorizedUS}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Reliable Transportation <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="reliableTransportation"
                value="yes"
                checked={formData.reliableTransportation === "yes"}
                onChange={(e) => setFormData({...formData, reliableTransportation: e.target.value})}
                className="w-4 h-4 text-cyan-600"
              />
              <span className="text-sm text-slate-700">Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="reliableTransportation"
                value="no"
                checked={formData.reliableTransportation === "no"}
                onChange={(e) => setFormData({...formData, reliableTransportation: e.target.value})}
                className="w-4 h-4 text-cyan-600"
              />
              <span className="text-sm text-slate-700">No</span>
            </label>
          </div>
          {errors.reliableTransportation && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.reliableTransportation}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Employment History Summary</label>
          <textarea
            value={formData.employmentHistory}
            onChange={(e) => setFormData({...formData, employmentHistory: e.target.value})}
            rows={4}
            className="w-full rounded-2xl border border-white/60 bg-white/40 backdrop-blur-lg px-4 py-3 text-base text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-200/50 transition-all"
            placeholder="Brief summary of your employment history..."
          />
        </div>
      </div>

      {/* References */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">References (Minimum 2)</h3>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Reference 1 First Name <span className="text-red-500">*</span>
            </label>
            <GlassInput
              value={formData.reference1FirstName}
              onChange={(e) => setFormData({...formData, reference1FirstName: e.target.value})}
              placeholder="Jane"
              required
            />
            {errors.reference1FirstName && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.reference1FirstName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Reference 1 Last Name <span className="text-red-500">*</span>
            </label>
            <GlassInput
              value={formData.reference1LastName}
              onChange={(e) => setFormData({...formData, reference1LastName: e.target.value})}
              placeholder="Smith"
              required
            />
            {errors.reference1LastName && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.reference1LastName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Reference 1 Phone</label>
            <GlassInput
              type="tel"
              value={formData.reference1Phone}
              onChange={(e) => setFormData({...formData, reference1Phone: e.target.value})}
              placeholder="(916) 555-1234"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Reference 1 Email</label>
            <GlassInput
              type="email"
              value={formData.reference1Email}
              onChange={(e) => setFormData({...formData, reference1Email: e.target.value})}
              placeholder="jane@example.com"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Reference 2 First Name <span className="text-red-500">*</span>
            </label>
            <GlassInput
              value={formData.reference2FirstName}
              onChange={(e) => setFormData({...formData, reference2FirstName: e.target.value})}
              placeholder="John"
              required
            />
            {errors.reference2FirstName && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.reference2FirstName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Reference 2 Last Name <span className="text-red-500">*</span>
            </label>
            <GlassInput
              value={formData.reference2LastName}
              onChange={(e) => setFormData({...formData, reference2LastName: e.target.value})}
              placeholder="Doe"
              required
            />
            {errors.reference2LastName && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> {errors.reference2LastName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Reference 2 Phone</label>
            <GlassInput
              type="tel"
              value={formData.reference2Phone}
              onChange={(e) => setFormData({...formData, reference2Phone: e.target.value})}
              placeholder="(916) 555-5678"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Reference 2 Email</label>
            <GlassInput
              type="email"
              value={formData.reference2Email}
              onChange={(e) => setFormData({...formData, reference2Email: e.target.value})}
              placeholder="john@example.com"
            />
          </div>
        </div>
      </div>

      {/* Resume Upload */}
      <div>
        <FileUpload
          label="Resume (Optional)"
          accept=".pdf,.doc,.docx"
          maxSize={2 * 1024 * 1024} // 2MB (base64 encoding increases size, so we limit to 2MB)
          value={resume}
          onChange={setResume}
        />
      </div>

      {/* Attestation */}
      <div>
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={formData.attestation === true || formData.attestation === "Yes"}
            onChange={(e) => setFormData({...formData, attestation: e.target.checked ? "Yes" : ""})}
            className="mt-1 w-4 h-4 text-cyan-600 rounded"
            required
          />
          <span className="text-sm text-slate-700">
            I attest that the information provided is true and accurate. <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.attestation && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" /> {errors.attestation}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <MagneticButton
          type="submit"
          disabled={submitting}
          className="w-full sm:w-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </MagneticButton>
      </div>
    </form>
  );
}

