# Admin Notes: Jotform HIPAA Forms Integration

This guide describes how to set up and manage the clinician application and onboarding forms using Jotform HIPAA.

## 📋 Table of Contents

1. [HIPAA Compliance Requirements](#hipaa-compliance-requirements)
2. [Creating Forms in Jotform HIPAA](#creating-forms-in-jotform-hipaa)
3. [Configuring Form URLs](#configuring-form-urls)
4. [BAA (Business Associate Agreement)](#baa-business-associate-agreement)
5. [Reviewing Submissions](#reviewing-submissions)
6. [Downloading PDFs](#downloading-pdfs)
7. [Access Control & Security](#access-control--security)
8. [Email Notifications](#email-notifications)

---

## HIPAA Compliance Requirements

### Before Collecting PHI

1. **Execute BAA with Jotform**: You must have a signed Business Associate Agreement (BAA) with Jotform before collecting any Protected Health Information (PHI).

2. **HIPAA-Enabled Account**: Ensure you're using a Jotform HIPAA account (Gold plan or higher).

3. **No PHI in Email Notifications**: Configure all forms to NOT include submission data in email alerts (see [Email Notifications](#email-notifications) below).

---

## Creating Forms in Jotform HIPAA

### Stage 1: Clinician Application (NO PHI)

**Purpose**: Initial application - collects basic information only, no medical data.

**Required Fields** (based on `application-spec.json`):
- Full name
- Email
- Phone
- Address
- Role applied for
- Licenses (type, state, number, expiry)
- Availability
- Work authorized in US
- Reliable transportation
- Employment history summary
- References (minimum 2)
- Attestation signature

**Optional Uploads**:
- Resume

**HIPAA Settings**:
- ✅ This form does NOT contain PHI
- ✅ Can be public (no token required)
- ✅ Email notifications can include basic info (name, email, phone)

**Steps**:
1. Log into Jotform HIPAA account
2. Create new form: "Clinician Application - Stage 1"
3. Add all required fields
4. Configure file upload for resume (optional)
5. Set up email notifications (see [Email Notifications](#email-notifications))
6. Copy the form URL (e.g., `https://form.jotform.com/XXXXXXXXXXXXX`)
7. Paste URL into `src/config/forms.ts` as `FORM_URL_STAGE1`

---

### Stage 2: Conditional Offer Onboarding (NO PHI)

**Purpose**: Post-offer document verification - non-medical documents only.

**Required Fields**:
- License copy upload
- Degree or certificate upload
- Driver's license upload
- Auto insurance upload (if driving)
- Policy acknowledgements:
  - HIPAA/Confidentiality
  - Compliance policies
  - Procedures
  - PPE requirements
- Background check consent

**Optional Uploads**:
- CPR card

**HIPAA Settings**:
- ✅ This form does NOT contain PHI
- ✅ Requires token access (not public)
- ✅ Email notifications can include basic info

**Steps**:
1. Create new form: "Conditional Offer Onboarding - Stage 2"
2. Add file upload fields for all required documents
3. Add checkbox/acknowledgement fields for policies
4. Configure email notifications
5. Copy the form URL
6. Paste URL into `src/config/forms.ts` as `FORM_URL_STAGE2`

**Access Control**:
- This form is protected by token validation
- Only applicants with valid tokens (sent via email after conditional offer) can access
- Token format: `/onboarding?t=TOKEN_VALUE`

---

### Stage 3: Confidential Medical (CONTAINS PHI)

**Purpose**: Medical clearance documentation - contains Protected Health Information.

**Required Fields**:
- TB questionnaire
- TB results upload (if applicable)
- Hep B choice (vaccinated/decline/previous immunity)
- Hep B proof upload (if applicable)
- Communicable disease attestation

**Optional Uploads**:
- Immunization records
- Additional medical documentation

**HIPAA Settings**:
- ⚠️ **THIS FORM CONTAINS PHI**
- ⚠️ Requires token access (not public)
- ⚠️ Email notifications must NOT include submission data
- ⚠️ Restrict access to authorized admins only

**Steps**:
1. Create new form: "Confidential Medical - Stage 3"
2. Add TB questionnaire fields
3. Add file upload for TB results
4. Add Hep B choice (radio buttons or dropdown)
5. Add conditional file upload for Hep B proof
6. Add communicable disease attestation checkbox
7. **CRITICAL**: Configure email notifications to exclude submission data (see below)
8. Copy the form URL
9. Paste URL into `src/config/forms.ts` as `FORM_URL_STAGE3`

**Access Control**:
- This form is protected by token validation
- Only applicants with valid tokens (sent via email after onboarding completion) can access
- Token format: `/medical?t=TOKEN_VALUE`

---

## Configuring Form URLs

After creating all three forms in Jotform, update the form URLs in the codebase:

**File**: `src/config/forms.ts`

```typescript
export const FORM_URL_STAGE1 = "https://form.jotform.com/YOUR_STAGE1_FORM_ID";
export const FORM_URL_STAGE2 = "https://form.jotform.com/YOUR_STAGE2_FORM_ID";
export const FORM_URL_STAGE3 = "https://form.jotform.com/YOUR_STAGE3_FORM_ID";
```

**Alternative**: Use environment variables for production:

1. Create `.env` file:
```
VITE_FORM_URL_STAGE1=https://form.jotform.com/YOUR_STAGE1_FORM_ID
VITE_FORM_URL_STAGE2=https://form.jotform.com/YOUR_STAGE2_FORM_ID
VITE_FORM_URL_STAGE3=https://form.jotform.com/YOUR_STAGE3_FORM_ID
```

2. The config file will automatically use these values.

---

## BAA (Business Associate Agreement)

### How to Obtain BAA

1. **Log into Jotform HIPAA Account**
2. Navigate to **Account Settings** or **HIPAA Settings**
3. Look for **"Business Associate Agreement"** or **"BAA"** section
4. Review and execute the BAA electronically
5. **Download and store** a copy of the signed BAA

### Where to Store BAA

- Store in secure document management system
- Keep with other vendor agreements
- Ensure it's accessible for compliance audits
- Recommended: Store in encrypted cloud storage with access logs

### BAA Requirements

- Must be executed **before** collecting any PHI
- Review annually or when terms change
- Ensure Jotform is listed as a Business Associate
- Verify BAA covers all HIPAA requirements (safeguards, breach notification, etc.)

---

## Reviewing Submissions

### Accessing Submissions in Jotform

1. **Log into Jotform HIPAA Account**
2. Navigate to **"Forms"** in the main menu
3. Click on the form you want to review (e.g., "Clinician Application - Stage 1")
4. Click **"Submissions"** tab
5. View all submissions in a table format

### Submission Details

Each submission shows:
- Submission date/time
- Applicant name (if not PHI form)
- Email address
- All form field responses
- Uploaded files (downloadable)

### Filtering & Searching

- Use search bar to find specific submissions
- Filter by date range
- Export to CSV/Excel (for non-PHI forms only)

---

## Downloading PDFs

### Individual Submission PDFs

1. Open the submission you want to download
2. Click **"PDF"** button (usually in top-right corner)
3. PDF will include:
   - All form responses
   - Uploaded files (as links or embedded)
   - Submission metadata (date, time, IP address - if enabled)

### Bulk PDF Export

1. Go to **Submissions** page for the form
2. Select multiple submissions (checkboxes)
3. Click **"Actions"** dropdown
4. Select **"Download PDFs"**
5. PDFs will be downloaded as a ZIP file

### Important Notes

- **Stage 3 (Medical) PDFs contain PHI** - handle with extra care
- Only download PDFs on secure, encrypted devices
- Do not email PDFs containing PHI
- Store PDFs in HIPAA-compliant storage system

---

## Access Control & Security

### Token-Based Access

**Stage 2 and Stage 3** forms require a token in the URL:
- Format: `/onboarding?t=TOKEN_VALUE` or `/medical?t=TOKEN_VALUE`
- Tokens should be:
  - Unique per applicant
  - Time-limited (optional, requires serverless function)
  - Sent via secure email after conditional offer

### Generating Tokens

**Current Implementation**: Basic client-side validation
- Tokens are validated for format only
- No database lookup (can be added with serverless function)

**Recommended Enhancement**: Add serverless token validation
1. Create tokens in database when sending conditional offer
2. Validate tokens server-side before allowing form access
3. Expire tokens after 30 days or after form submission

### Restricting Access to Medical Form Submissions

**In Jotform**:
1. Go to form settings for Stage 3 (Medical form)
2. Navigate to **"Settings"** > **"Permissions"**
3. Restrict form access to specific users/roles
4. Enable **"Require login to view submissions"**

**Internal Access Control**:
- Only authorized HR/Clinical staff should access medical form submissions
- Use Jotform's user roles to limit access
- Log all access to medical form submissions
- Review access logs quarterly

---

## Email Notifications

### Critical HIPAA Requirement

**DO NOT include submission data in email notifications for forms containing PHI.**

### Configuring Email Notifications

#### Stage 1 (Application) - Can Include Basic Info

1. Go to form settings
2. Navigate to **"Emails"** or **"Notifications"**
3. Set up email to admin/HR
4. **Can include**: Name, email, phone, role applied for
5. **Should NOT include**: Full address, detailed employment history (if sensitive)

#### Stage 2 (Onboarding) - Can Include Basic Info

1. Similar to Stage 1
2. **Can include**: Name, email, notification that documents were submitted
3. **Should NOT include**: License numbers, document details

#### Stage 3 (Medical) - NO Submission Data

1. Go to form settings for Medical form
2. Navigate to **"Emails"** or **"Notifications"**
3. **CRITICAL**: Use **"Simple Notification"** or **"Custom Email"**
4. Email template should say:
   ```
   Subject: New Medical Form Submission Received
   
   A new submission has been received for the Confidential Medical form.
   
   Please log into Jotform to review the submission.
   
   DO NOT include any submission data in this email.
   ```
5. **DO NOT** use auto-include submission data feature
6. **DO NOT** include any PHI in email body

### Testing Email Notifications

1. Submit a test form
2. Verify email received
3. **Verify NO PHI is included** (especially for Stage 3)
4. If PHI appears, reconfigure email settings immediately

---

## Workflow Summary

### Applicant Journey

1. **Stage 1**: Applicant visits `/apply` (public)
   - Completes application form
   - Submits resume (optional)

2. **Review & Offer**: HR reviews Stage 1 submission
   - If approved, send conditional offer email with Stage 2 token

3. **Stage 2**: Applicant visits `/onboarding?t=TOKEN`
   - Uploads required documents
   - Acknowledges policies

4. **Review & Clearance**: HR reviews Stage 2 submission
   - If approved, send medical clearance email with Stage 3 token

5. **Stage 3**: Applicant visits `/medical?t=TOKEN`
   - Completes TB questionnaire
   - Uploads medical documents
   - Submits health attestations

6. **Final Review**: HR/Clinical reviews Stage 3 submission
   - If approved, applicant is cleared for onboarding

### Admin Workflow

1. **Daily**: Check Jotform for new submissions
2. **Review**: Open each submission, review responses
3. **Download**: Download PDFs for applicant files
4. **Decision**: Approve/reject and send next stage token
5. **Archive**: Store PDFs in secure document management system

---

## Troubleshooting

### Form Not Loading

- Check form URL in `src/config/forms.ts`
- Verify form is published in Jotform
- Check browser console for errors
- Ensure Jotform account is active

### Token Not Working

- Verify token format (should be alphanumeric, 20+ characters)
- Check URL parameter: `?t=TOKEN_VALUE`
- If using serverless validation, check function logs

### Email Notifications Include PHI

- **STOP** collecting PHI immediately
- Review email notification settings
- Update email template to exclude submission data
- Test with new submission

---

## Compliance Checklist

- [ ] BAA executed with Jotform
- [ ] All forms created in Jotform HIPAA account
- [ ] Email notifications configured (no PHI for Stage 3)
- [ ] Form URLs added to `src/config/forms.ts`
- [ ] Token system tested
- [ ] Access controls configured in Jotform
- [ ] Staff trained on HIPAA requirements
- [ ] Document storage system configured
- [ ] Access logs enabled
- [ ] Regular compliance review scheduled

---

## Support

For Jotform-specific questions:
- Jotform Support: https://www.jotform.com/support
- Jotform HIPAA Documentation: https://www.jotform.com/help/

For technical issues with the website integration:
- Check browser console for errors
- Review `src/config/forms.ts` for correct URLs
- Verify React Router is working correctly

---

**Last Updated**: [Date]
**Version**: 1.0

