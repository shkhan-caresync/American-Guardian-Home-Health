/**
 * Jotform API Service
 * 
 * Handles form submissions to Jotform HIPAA via API
 * 
 * Setup:
 * 1. Get API key from Jotform: Account Settings > API
 * 2. Add to .env: VITE_JOTFORM_API_KEY=your_api_key
 * 3. Get form IDs from your Jotform forms
 */

const JOTFORM_API_KEY = import.meta.env.VITE_JOTFORM_API_KEY;
const JOTFORM_API_URL = 'https://api.jotform.com';

/**
 * Submit form data to Jotform
 * 
 * @param {string} formId - Jotform form ID
 * @param {Object} formData - Form field data (key-value pairs)
 * @param {Array<File>} files - Optional array of files to upload
 * @returns {Promise<Object>} Submission response
 */
export async function submitToJotform(formId, formData, files = []) {
  if (!JOTFORM_API_KEY) {
    throw new Error('Jotform API key not configured. Add VITE_JOTFORM_API_KEY to .env');
  }

  if (!formId) {
    throw new Error('Form ID is required');
  }

  // Step 1: Prepare files for submission
  // Jotform API doesn't support direct file uploads via /files endpoint
  // Note: Large files (>2MB) can't be included in URL-encoded submissions due to size limits
  // We'll only include files that are small enough, otherwise skip them
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB limit (base64 increases size by ~33%)
  const fileUploads = [];
  const skippedFiles = [];
  
  try {
    
    if (files && files.length > 0) {
      for (const file of files) {
        if (file.size > MAX_FILE_SIZE) {
          console.warn(`⚠️ File ${file.name} is too large (${Math.round(file.size / 1024)}KB). Maximum size is 2MB. Skipping file upload.`);
          skippedFiles.push({
            name: file.name,
            size: file.size,
            reason: 'File too large (max 2MB)',
          });
          continue;
        }
        
        try {
          // Convert file to base64 for inclusion in submission
          const base64File = await fileToBase64(file);
          const base64Size = base64File.length; // Base64 string length
          
          // Check if base64 encoded size is still reasonable (< 3MB)
          if (base64Size > 3 * 1024 * 1024) {
            console.warn(`⚠️ Base64 encoded file ${file.name} is too large (${Math.round(base64Size / 1024)}KB). Skipping file upload.`);
            skippedFiles.push({
              name: file.name,
              size: file.size,
              reason: 'Base64 encoded size too large',
            });
            continue;
          }
          
          fileUploads.push({
            name: file.name,
            type: file.type,
            data: base64File, // Base64 string without data: prefix
            size: file.size,
            isBase64: true,
          });
          console.log(`✅ Converted ${file.name} to base64 (${Math.round(file.size / 1024)}KB → ${Math.round(base64Size / 1024)}KB base64)`);
        } catch (base64Error) {
          console.error(`❌ Failed to convert file ${file.name} to base64:`, base64Error);
          skippedFiles.push({
            name: file.name,
            size: file.size,
            reason: 'Failed to convert to base64',
          });
        }
      }
    }
    
    // Store skipped files info for later use
    if (skippedFiles.length > 0) {
      console.warn('⚠️ Some files were skipped:', skippedFiles);
    }

    // Step 2: Prepare submission data
    // Map formData to Jotform's expected format
    // Jotform API expects: { submission: { "field_id": "value", ... } }
    const mappedData = mapFormDataToJotform(formData, fileUploads);
    
    // Debug: Log what we're sending
    console.log('📤 Submitting to Jotform:', {
      formId,
      mappedFields: Object.keys(mappedData).length,
      allMappedData: mappedData, // Full mapping for debugging
      sampleFormData: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      }
    });
    
    // Jotform API format: Always use URL-encoded format (we know this works)
    // Include base64 files as data URL strings in the submission
    const urlEncodedData = new URLSearchParams();
    
    // Convert mapped data to URL-encoded format
    Object.keys(mappedData).forEach(key => {
      const value = mappedData[key];
      if (value !== undefined && value !== null && value !== '') {
        // Handle composite fields with bracket notation (e.g., "6[addr_line1]", "3[first]", "16[day]")
        if (key.includes('[') && key.includes(']')) {
          // Composite field: submission[6][addr_line1]=value or submission[3][first]=value
          const match = key.match(/^(\d+)\[(.+)\]$/);
          if (match) {
            const fieldId = match[1];
            const subfield = match[2];
            urlEncodedData.append(`submission[${fieldId}][${subfield}]`, String(value));
          } else {
            urlEncodedData.append(`submission[${key}]`, String(value));
          }
        } else if (key.includes('_')) {
          // Radio button fields like "37_0": submission[37][0]=value
          const match = key.match(/^(\d+)_(\d+)$/);
          if (match) {
            const fieldId = match[1];
            const optionIndex = match[2];
            urlEncodedData.append(`submission[${fieldId}][${optionIndex}]`, String(value));
          } else {
            urlEncodedData.append(`submission[${key}]`, String(value));
          }
        } else {
          // Regular field: submission[3]=value
          // For file fields with base64, the value is already a data URL string
          urlEncodedData.append(`submission[${key}]`, String(value));
        }
      }
    });
    
    // Log payload (truncate base64 data for readability)
    const payloadPreview = urlEncodedData.toString();
    const fileFieldMatch = payloadPreview.match(/submission\[38\]=([^&]+)/);
    const logPayload = fileFieldMatch 
      ? payloadPreview.replace(fileFieldMatch[0], `submission[38]=[Base64 file data - ${fileUploads[0]?.name || 'file'}]`)
      : payloadPreview;
    
    console.log('📦 Submission payload (URL-encoded):', logPayload);
    console.log('📋 Mapped data keys:', Object.keys(mappedData));
    console.log('📋 Sample mapped values:', {
      field3: mappedData["3[first]"] || mappedData["3"],
      field4: mappedData["4"],
      field6: Object.keys(mappedData).filter(k => k.startsWith("6")),
      hasFile: !!mappedData["38"],
    });

    // Step 3: Submit to Jotform
    // Always use URL-encoded format (we know this works from testing)
    const response = await fetch(
      `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${JOTFORM_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData.toString(),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      let errorMessage = `Jotform API error: ${response.status}`;
      try {
        const errorJson = JSON.parse(errorData);
        if (errorJson.message) {
          errorMessage += ` - ${errorJson.message}`;
        } else {
          errorMessage += ` - ${errorData}`;
        }
      } catch {
        errorMessage += ` - ${errorData}`;
      }
      console.error('❌ Jotform API Error:', errorMessage);
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('✅ Jotform submission response:', result);
    
    // Add info about skipped files to the result
    if (skippedFiles.length > 0) {
      result.skippedFiles = skippedFiles;
      console.warn('⚠️ Form submitted but some files were skipped due to size limits:', skippedFiles);
    } else if (files && files.length > 0 && fileUploads.length === 0) {
      console.warn('Form submitted but file uploads failed. User may need to upload files separately.');
    }
    
    return result;
  } catch (error) {
    console.error('Jotform submission error:', error);
    throw error;
  }
}

/**
 * Convert file to base64 string
 * 
 * @param {File} file - File to convert
 * @returns {Promise<string>} Base64 encoded file
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Remove data:type;base64, prefix
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Note: Jotform API doesn't support direct file uploads via /files endpoint
// Files are included in the submission as base64 data URLs

/**
 * Map form data to Jotform submission format
 * 
 * IMPORTANT: Replace the field IDs (numbers in quotes) with your actual Jotform field IDs
 * 
 * To get field IDs:
 * 1. Go to your Jotform form
 * 2. Click "Edit Form"
 * 3. Click on each field - the field ID appears in the URL or field settings
 * 4. Replace the placeholder IDs below with your actual field IDs
 * 
 * @param {Object} formData - Your form data (key-value pairs)
 * @param {Array} fileUploads - Uploaded file responses
 * @returns {Object} Jotform submission format
 */
function mapFormDataToJotform(formData, fileUploads = []) {
  // Auto-generated mapping - Regenerate using: npm run generate-mapping
  const mapped = {};

  // Personal Information
  // Fullname field: Jotform control_fullname needs first and last name separately
  if (formData.firstName) mapped["3[first]"] = formData.firstName; // First Name
  if (formData.lastName) mapped["3[last]"] = formData.lastName; // Last Name
  if (formData.email) mapped["4"] = formData.email; // Email (control_email)
  if (formData.phone) mapped["5"] = formData.phone; // Phone Number (control_phone)
  
  // Address field (6) is composite with sub-fields
  // Based on Jotform API docs, address fields use bracket notation
  // Format: "6[addr_line1]", "6[city]", "6[state]", "6[postal]"
  if (formData.address) {
    mapped["6[addr_line1]"] = formData.address; // Address Line 1
  }
  if (formData.city) {
    mapped["6[city]"] = formData.city; // City
  }
  if (formData.state) {
    mapped["6[state]"] = formData.state; // State
  }
  if (formData.zipCode) {
    mapped["6[postal]"] = formData.zipCode; // Postal/ZIP Code
  }

  // Professional Information
  if (formData.roleAppliedFor) mapped["11"] = formData.roleAppliedFor; // Role Applying for (control_dropdown)
  // Note: licenseType removed - assumed from role applied for
  if (formData.licenseState) mapped["14"] = formData.licenseState; // License State (control_textbox)
  if (formData.licenseNumber) mapped["15"] = formData.licenseNumber; // License Number (control_textbox)
  // License Expiry Date - Jotform datetime fields need day, month, year subfields
  if (formData.licenseExpiry) {
    const date = new Date(formData.licenseExpiry);
    if (!isNaN(date.getTime())) {
      mapped["16[day]"] = String(date.getDate()).padStart(2, '0');
      mapped["16[month]"] = String(date.getMonth() + 1).padStart(2, '0');
      mapped["16[year]"] = String(date.getFullYear());
    }
  }

  // Availability & Qualifications
  if (formData.availability) mapped["19"] = formData.availability; // Availibilty (control_dropdown)
  // Checkboxes: Keep "yes" value as-is (user wants "yes" not "1")
  if (formData.workAuthorizedUS) {
    mapped["20"] = formData.workAuthorizedUS;
  }
  if (formData.reliableTransportation) {
    mapped["21"] = formData.reliableTransportation;
  }
  if (formData.employmentHistory) mapped["22"] = formData.employmentHistory; // Employment History Summary (control_textarea)

  // References
  // Fullname fields need separate first/last
  if (formData.reference1FirstName) mapped["29[first]"] = formData.reference1FirstName; // Reference 1 First Name
  if (formData.reference1LastName) mapped["29[last]"] = formData.reference1LastName; // Reference 1 Last Name
  if (formData.reference1Phone) mapped["31"] = formData.reference1Phone; // Reference 1 Phone Number (control_phone)
  if (formData.reference1Email) mapped["30"] = formData.reference1Email; // Reference 1 Email (control_email)
  if (formData.reference2FirstName) mapped["32[first]"] = formData.reference2FirstName; // Reference 2 First Name
  if (formData.reference2LastName) mapped["32[last]"] = formData.reference2LastName; // Reference 2 Last Name
  if (formData.reference2Phone) mapped["34"] = formData.reference2Phone; // Phone Number (control_phone) - Reference 2
  if (formData.reference2Email) mapped["33"] = formData.reference2Email; // Email (control_email) - Reference 2

  // Attestation & Resume
  // Attestation is a checkbox - use field ID 37
  if (formData.attestation === true || formData.attestation === "Yes") {
    mapped["37"] = "Yes";
  }
  // File upload: Resume (control_fileupload)
  // Jotform accepts files as base64 data URLs in the submission
  if (fileUploads.length > 0 && fileUploads[0]) {
    const resumeFile = fileUploads[0];
    if (resumeFile.isBase64 && resumeFile.data) {
      // Format: data:type;base64,base64string
      mapped["38"] = `data:${resumeFile.type || 'application/pdf'};base64,${resumeFile.data}`;
      console.log('✅ Including file as base64 data URL');
    } else {
      console.warn('⚠️ File data not available');
    }
  } else {
    console.log('ℹ️ No file uploaded');
  }

  return mapped;
}

/**
 * Get form structure from Jotform (useful for field mapping)
 * 
 * Use this to get all field IDs for your form!
 * 
 * Example usage:
 * ```javascript
 * const structure = await getFormStructure('YOUR_FORM_ID');
 * console.log(structure.content); // Shows all fields with IDs
 * ```
 * 
 * @param {string} formId - Jotform form ID
 * @returns {Promise<Object>} Form structure with fields
 */
export async function getFormStructure(formId) {
  if (!JOTFORM_API_KEY) {
    throw new Error('Jotform API key not configured');
  }

  const response = await fetch(
    `${JOTFORM_API_URL}/form/${formId}?apiKey=${JOTFORM_API_KEY}`,
    {
      // No headers needed - API key in query string
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get form structure: ${response.status}`);
  }

  const result = await response.json();
  
  // Helper: Log field IDs for easy mapping
  if (result.content) {
    console.log('=== Jotform Field IDs ===');
    Object.keys(result.content).forEach(fieldId => {
      const field = result.content[fieldId];
      console.log(`Field ID ${fieldId}: ${field.text || field.name || 'Unnamed'} (${field.type})`);
    });
    console.log('========================');
  }
  
  return result;
}

/**
 * Helper function to print field mapping for Stage 1
 * Call this in browser console after setting up your form
 * 
 * Usage:
 * ```javascript
 * import { printFieldMapping } from './services/jotformApi';
 * await printFieldMapping('YOUR_FORM_ID');
 * ```
 */
export async function printFieldMapping(formId) {
  try {
    const structure = await getFormStructure(formId);
    console.log('\n📋 Copy this mapping to mapFormDataToJotform function:\n');
    
    const fieldMap = {
      'Full Name': 'fullName',
      'Email': 'email',
      'Phone': 'phone',
      'Address': 'address',
      'City': 'city',
      'State': 'state',
      'ZIP Code': 'zipCode',
      'Role Applied For': 'roleAppliedFor',
      'License Type': 'licenseType',
      'License State': 'licenseState',
      'License Number': 'licenseNumber',
      'License Expiry': 'licenseExpiry',
      'Availability': 'availability',
      'Work Authorized in US': 'workAuthorizedUS',
      'Reliable Transportation': 'reliableTransportation',
      'Employment History Summary': 'employmentHistory',
      'Reference 1 Name': 'reference1Name',
      'Reference 1 Phone': 'reference1Phone',
      'Reference 1 Email': 'reference1Email',
      'Reference 2 Name': 'reference2Name',
      'Reference 2 Phone': 'reference2Phone',
      'Reference 2 Email': 'reference2Email',
      'Attestation': 'attestation',
      'Resume': 'resume',
    };
    
    if (structure.content) {
      Object.keys(structure.content).forEach(fieldId => {
        const field = structure.content[fieldId];
        const fieldLabel = field.text || field.name || 'Unnamed';
        const formFieldName = Object.keys(fieldMap).find(key => 
          fieldLabel.toLowerCase().includes(key.toLowerCase())
        );
        
        if (formFieldName) {
          console.log(`mapped["${fieldId}"] = formData.${fieldMap[formFieldName]}; // ${fieldLabel}`);
        }
      });
    }
  } catch (error) {
    console.error('Error getting field mapping:', error);
  }
}

