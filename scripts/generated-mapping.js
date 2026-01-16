function mapFormDataToJotform(formData, fileUploads = []) {
  // Auto-generated mapping - DO NOT EDIT MANUALLY
  // Regenerate using: node scripts/generate-field-mapping.js
  const mapped = {};

  // Personal Information
  if (formData.fullName) mapped["3"] = formData.fullName; // Name (control_fullname)
  if (formData.email) mapped["4"] = formData.email; // Email (control_email)
  if (formData.phone) mapped["5"] = formData.phone; // Phone Number (control_phone)
  if (formData.address) mapped["6"] = formData.address; // Address (control_address)
  // city: NOT FOUND in Jotform form
  // state: NOT FOUND in Jotform form
  // zipCode: NOT FOUND in Jotform form

  // Professional Information
  if (formData.roleAppliedFor) mapped["11"] = formData.roleAppliedFor; // Role Applying for (control_dropdown)
  // licenseType: NOT FOUND in Jotform form
  if (formData.licenseState) mapped["14"] = formData.licenseState; // License State (control_textbox)
  if (formData.licenseNumber) mapped["15"] = formData.licenseNumber; // License Number (control_textbox)
  if (formData.licenseExpiry) mapped["16"] = formData.licenseExpiry; // License Expiry Date (control_datetime)

  // Availability & Qualifications
  if (formData.availability) mapped["19"] = formData.availability; // Availibilty (control_dropdown)
  if (formData.workAuthorizedUS) mapped["20"] = formData.workAuthorizedUS; // Work Authorized in the US (control_checkbox)
  if (formData.reliableTransportation) mapped["21"] = formData.reliableTransportation; // Reliable Transportation (control_checkbox)
  if (formData.employmentHistory) mapped["22"] = formData.employmentHistory; // Employment History Summary (control_textarea)

  // References
  if (formData.reference1Name) mapped["29"] = formData.reference1Name; // Reference 1 Name (control_fullname)
  if (formData.reference1Phone) mapped["31"] = formData.reference1Phone; // Reference 1 Phone Number (control_phone)
  if (formData.reference1Email) mapped["30"] = formData.reference1Email; // Reference 1 Email (control_email)
  if (formData.reference2Name) mapped["32"] = formData.reference2Name; // Reference 2 Name (control_fullname)
  if (formData.reference2Phone) mapped["34"] = formData.reference2Phone; // Phone Number (control_phone)
  if (formData.reference2Email) mapped["33"] = formData.reference2Email; // Email (control_email)

  // Attestation & Resume
  if (formData.attestation) mapped["37"] = formData.attestation ? "Yes" : "No"; // iAttest (control_radio)
  // File upload: Resume (control_fileupload)
  if (fileUploads.length > 0 && fileUploads[0]) {
    const resumeFile = fileUploads[0];
    if (resumeFile.url) mapped["38"] = resumeFile.url;
    else if (resumeFile.id) mapped["38"] = resumeFile.id;
  }

  return mapped;
}