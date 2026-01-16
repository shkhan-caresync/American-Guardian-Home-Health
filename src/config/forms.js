/**
 * Jotform HIPAA Form Configuration
 * 
 * IMPORTANT: Replace the placeholder URLs below with your actual Jotform HIPAA form URLs
 * after creating the forms in your Jotform HIPAA account.
 * 
 * To get your form URLs:
 * 1. Log into your Jotform HIPAA account
 * 2. Go to Forms > Your Form
 * 3. Click "Embed" or "Share"
 * 4. Copy the form URL (should look like: https://form.jotform.com/XXXXXXXXXXXXX)
 * 
 * Stage 1: Clinician Application (NO PHI)
 * - Public access at /apply
 * - Collects: name, email, phone, address, role, licenses, availability, work authorization, etc.
 * 
 * Stage 2: Conditional Offer Onboarding (NO PHI)
 * - Token-protected at /onboarding?t=TOKEN
 * - Collects: license copies, degrees, driver's license, auto insurance, policy acknowledgements
 * 
 * Stage 3: Confidential Medical (CONTAINS PHI)
 * - Token-protected at /medical?t=TOKEN
 * - Collects: TB questionnaire/results, Hep B choice/proof, communicable disease attestations
 */

// Form URLs (for iframe embeds - not used in hybrid approach)
export const FORM_URL_STAGE1 = import.meta.env.VITE_FORM_URL_STAGE1 || "https://form.jotform.com/YOUR_STAGE1_FORM_ID";
export const FORM_URL_STAGE2 = import.meta.env.VITE_FORM_URL_STAGE2 || "https://form.jotform.com/YOUR_STAGE2_FORM_ID";
export const FORM_URL_STAGE3 = import.meta.env.VITE_FORM_URL_STAGE3 || "https://form.jotform.com/YOUR_STAGE3_FORM_ID";

// Form IDs (for API submissions - extract from form URL)
export const FORM_ID_STAGE1 = import.meta.env.VITE_FORM_ID_STAGE1 || "YOUR_STAGE1_FORM_ID";
export const FORM_ID_STAGE2 = import.meta.env.VITE_FORM_ID_STAGE2 || "YOUR_STAGE2_FORM_ID";
export const FORM_ID_STAGE3 = import.meta.env.VITE_FORM_ID_STAGE3 || "YOUR_STAGE3_FORM_ID";

// Optional: Jotform embed script URL (usually not needed for iframe embeds)
export const JOTFORM_EMBED_SCRIPT_URL = "https://cdn.jotform.com/jsform/embed.js";

// Form metadata for display
export const FORM_METADATA = {
  stage1: {
    title: "Clinician Application",
    description: "Start your application to join the American Guardian team",
    estimatedTime: "5-8 minutes",
    containsPHI: false,
  },
  stage2: {
    title: "Onboarding & Verification",
    description: "Complete your onboarding documentation",
    estimatedTime: "10-15 minutes",
    containsPHI: false,
  },
  stage3: {
    title: "Confidential Medical Information",
    description: "Complete your medical clearance documentation",
    estimatedTime: "10-15 minutes",
    containsPHI: true,
  },
};

