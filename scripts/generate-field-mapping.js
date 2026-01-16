/**
 * Auto-generate Jotform Field Mapping
 * 
 * This script fetches field IDs from your Jotform form and generates
 * the mapFormDataToJotform function with correct field IDs.
 * 
 * Usage:
 *   node scripts/generate-field-mapping.js YOUR_FORM_ID YOUR_API_KEY
 * 
 * Or set environment variables:
 *   JOTFORM_API_KEY=your_key node scripts/generate-field-mapping.js YOUR_FORM_ID
 */

const JOTFORM_API_URL = 'https://api.jotform.com';

// Field name mapping: Jotform field label → Our form field name
const FIELD_MAPPING = {
  // Personal Information
  'full name': 'fullName',
  'name': 'fullName',
  'email': 'email',
  'phone': 'phone',
  'phone number': 'phone',
  'address': 'address',
  'city': 'city',
  'state': 'state',
  'zip': 'zipCode',
  'zip code': 'zipCode',
  'postal code': 'zipCode',
  
  // Professional Information
  'role': 'roleAppliedFor',
  'role applied for': 'roleAppliedFor',
  'position': 'roleAppliedFor',
  'license type': 'licenseType',
  'license state': 'licenseState',
  'license number': 'licenseNumber',
  'license expiry': 'licenseExpiry',
  'license expiration': 'licenseExpiry',
  'expiry': 'licenseExpiry',
  'expiration': 'licenseExpiry',
  
  // Availability & Qualifications
  'availability': 'availability',
  'work authorized': 'workAuthorizedUS',
  'work authorized in us': 'workAuthorizedUS',
  'authorized to work': 'workAuthorizedUS',
  'reliable transportation': 'reliableTransportation',
  'transportation': 'reliableTransportation',
  'employment history': 'employmentHistory',
  'work history': 'employmentHistory',
  
  // References
  'reference 1 name': 'reference1Name',
  'reference1 name': 'reference1Name',
  'ref 1 name': 'reference1Name',
  'reference 1 phone': 'reference1Phone',
  'reference1 phone': 'reference1Phone',
  'ref 1 phone': 'reference1Phone',
  'reference 1 email': 'reference1Email',
  'reference1 email': 'reference1Email',
  'ref 1 email': 'reference1Email',
  'reference 2 name': 'reference2Name',
  'reference2 name': 'reference2Name',
  'ref 2 name': 'reference2Name',
  'reference 2 phone': 'reference2Phone',
  'reference2 phone': 'reference2Phone',
  'ref 2 phone': 'reference2Phone',
  'reference 2 email': 'reference2Email',
  'reference2 email': 'reference2Email',
  'ref 2 email': 'reference2Email',
  
  // Attestation & Resume
  'attestation': 'attestation',
  'i attest': 'attestation',
  'agree': 'attestation',
  'resume': 'resume',
  'cv': 'resume',
  'file': 'resume',
};

// Order of fields for better output
const FIELD_ORDER = [
  'fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode',
  'roleAppliedFor', 'licenseType', 'licenseState', 'licenseNumber', 'licenseExpiry',
  'availability', 'workAuthorizedUS', 'reliableTransportation', 'employmentHistory',
  'reference1Name', 'reference1Phone', 'reference1Email',
  'reference2Name', 'reference2Phone', 'reference2Email',
  'attestation', 'resume'
];

async function getFormStructure(formId, apiKey) {
  // Use the /questions endpoint to get form fields
  const response = await fetch(
    `${JOTFORM_API_URL}/form/${formId}/questions`,
    {
      headers: {
        'APIKEY': apiKey,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to get form questions: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  
  // Debug: log the structure to understand the format
  if (process.env.DEBUG) {
    console.log('\n🔍 API Response Structure:');
    console.log(JSON.stringify(data, null, 2));
  }
  
  // Jotform questions API returns: { responseCode, message, content: { fieldId: { ... }, ... } }
  let questions = null;
  
  if (data.content && typeof data.content === 'object') {
    questions = data.content;
  } else if (data.responseCode === 200 && data.content) {
    questions = data.content;
  } else {
    console.error('\n⚠️  Could not find form fields in API response.');
    console.error('Response structure:', Object.keys(data));
    if (data.content) {
      console.error('Content type:', typeof data.content);
      if (typeof data.content === 'object') {
        console.error('Content keys:', Object.keys(data.content));
      }
    }
    throw new Error('No form fields found. The form might be empty or the API response format is different.');
  }
  
  if (!questions || Object.keys(questions).length === 0) {
    throw new Error('Form has no fields. Please add fields to your Jotform form first.');
  }
  
  return { content: questions };
}

function findMatchingField(fieldLabel, fieldType, fieldId, existingMappings) {
  const normalizedLabel = fieldLabel.toLowerCase().trim();
  
  // Skip section headers
  if (fieldType === 'control_head' || fieldType === 'control_pagebreak') {
    return null;
  }
  
  // Direct match
  if (FIELD_MAPPING[normalizedLabel]) {
    const mappedField = FIELD_MAPPING[normalizedLabel];
    // Don't remap if already mapped (avoid duplicates)
    if (existingMappings[mappedField]) {
      return null;
    }
    return mappedField;
  }
  
  // Smart matching with priority
  const matchScores = [];
  
  for (const [key, value] of Object.entries(FIELD_MAPPING)) {
    // Skip if already mapped
    if (existingMappings[value]) {
      continue;
    }
    
    // Exact match gets highest score
    if (normalizedLabel === key) {
      matchScores.push({ field: value, score: 100, key });
      continue;
    }
    
    // Check if label contains key or vice versa
    if (normalizedLabel.includes(key) || key.includes(normalizedLabel)) {
      const score = Math.min(normalizedLabel.length, key.length) / Math.max(normalizedLabel.length, key.length) * 80;
      matchScores.push({ field: value, score, key });
    }
    
    // Check for common variations
    if (normalizedLabel.includes('reference 1') && value.includes('reference1')) {
      if (normalizedLabel.includes('name') && value.includes('Name')) {
        matchScores.push({ field: value, score: 90, key });
      } else if (normalizedLabel.includes('phone') && value.includes('Phone')) {
        matchScores.push({ field: value, score: 90, key });
      } else if (normalizedLabel.includes('email') && value.includes('Email')) {
        matchScores.push({ field: value, score: 90, key });
      }
    }
    
    if (normalizedLabel.includes('reference 2') && value.includes('reference2')) {
      if (normalizedLabel.includes('name') && value.includes('Name')) {
        matchScores.push({ field: value, score: 90, key });
      } else if (normalizedLabel.includes('phone') && value.includes('Phone')) {
        matchScores.push({ field: value, score: 90, key });
      } else if (normalizedLabel.includes('email') && value.includes('Email')) {
        matchScores.push({ field: value, score: 90, key });
      }
    }
    
    // Handle Reference 2 fields that come after Reference 1 fields
    // If we already have reference1Email/Phone and this is just "Email"/"Phone" after Reference 2 Name
    if (normalizedLabel === 'email' && existingMappings.reference2Name && !existingMappings.reference2Email) {
      matchScores.push({ field: 'reference2Email', score: 95, key: 'reference 2 email' });
    }
    if (normalizedLabel === 'phone' && existingMappings.reference2Name && !existingMappings.reference2Phone) {
      matchScores.push({ field: 'reference2Phone', score: 95, key: 'reference 2 phone' });
    }
  }
  
  // Handle special cases
  if (normalizedLabel.includes('avail') && !existingMappings.availability) {
    matchScores.push({ field: 'availability', score: 85, key: 'availability' });
  }
  
  if ((normalizedLabel.includes('attest') || normalizedLabel.includes('iattest')) && 
      (fieldType === 'control_radio' || fieldType === 'control_checkbox') &&
      !existingMappings.attestation) {
    matchScores.push({ field: 'attestation', score: 90, key: 'attestation' });
  }
  
  // Check if it's a file upload
  if ((fieldType === 'control_fileupload' || fieldType === 'fileupload' || fieldType === 'file') &&
      (normalizedLabel.includes('resume') || normalizedLabel.includes('cv') || normalizedLabel.includes('file')) &&
      !existingMappings.resume) {
    return 'resume';
  }
  
  // Return best match
  if (matchScores.length > 0) {
    matchScores.sort((a, b) => b.score - a.score);
    return matchScores[0].field;
  }
  
  return null;
}

function generateMappingFunction(mappings) {
  const lines = [];
  lines.push('function mapFormDataToJotform(formData, fileUploads = []) {');
  lines.push('  // Auto-generated mapping - DO NOT EDIT MANUALLY');
  lines.push('  // Regenerate using: node scripts/generate-field-mapping.js');
  lines.push('  const mapped = {};');
  lines.push('');
  
  // Group by section
  const sections = {
    'Personal Information': ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'],
    'Professional Information': ['roleAppliedFor', 'licenseType', 'licenseState', 'licenseNumber', 'licenseExpiry'],
    'Availability & Qualifications': ['availability', 'workAuthorizedUS', 'reliableTransportation', 'employmentHistory'],
    'References': ['reference1Name', 'reference1Phone', 'reference1Email', 'reference2Name', 'reference2Phone', 'reference2Email'],
    'Attestation & Resume': ['attestation', 'resume'],
  };
  
  for (const [sectionName, fields] of Object.entries(sections)) {
    lines.push(`  // ${sectionName}`);
    for (const fieldName of fields) {
      const mapping = mappings[fieldName];
      if (mapping) {
        const { fieldId, jotformLabel, fieldType } = mapping;
        if (fieldName === 'attestation') {
          lines.push(`  if (formData.${fieldName}) mapped["${fieldId}"] = formData.${fieldName} ? "Yes" : "No"; // ${jotformLabel} (${fieldType})`);
        } else if (fieldName === 'resume') {
          lines.push(`  // File upload: ${jotformLabel} (${fieldType})`);
          lines.push(`  if (fileUploads.length > 0 && fileUploads[0]) {`);
          lines.push(`    const resumeFile = fileUploads[0];`);
          lines.push(`    if (resumeFile.url) mapped["${fieldId}"] = resumeFile.url;`);
          lines.push(`    else if (resumeFile.id) mapped["${fieldId}"] = resumeFile.id;`);
          lines.push(`  }`);
        } else {
          lines.push(`  if (formData.${fieldName}) mapped["${fieldId}"] = formData.${fieldName}; // ${jotformLabel} (${fieldType})`);
        }
      } else {
        lines.push(`  // ${fieldName}: NOT FOUND in Jotform form`);
      }
    }
    lines.push('');
  }
  
  lines.push('  return mapped;');
  lines.push('}');
  
  return lines.join('\n');
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node scripts/generate-field-mapping.js <FORM_ID> [API_KEY]');
    console.error('');
    console.error('Or set JOTFORM_API_KEY environment variable:');
    console.error('  JOTFORM_API_KEY=your_key node scripts/generate-field-mapping.js <FORM_ID>');
    process.exit(1);
  }
  
  const formId = args[0];
  const apiKey = args[1] || process.env.JOTFORM_API_KEY;
  
  if (!apiKey) {
    console.error('Error: API key required');
    console.error('Provide as argument or set JOTFORM_API_KEY environment variable');
    process.exit(1);
  }
  
  console.log(`\n🔍 Fetching form structure for form ID: ${formId}...\n`);
  
  try {
    const formStructure = await getFormStructure(formId, apiKey);
    
    if (!formStructure.content) {
      console.error('Error: Form structure not found or form is empty');
      process.exit(1);
    }
    
    console.log('📋 Found fields in Jotform form:\n');
    
    const mappings = {};
    const unmatchedFields = [];
    let inReference2Section = false;
    
    // Process each field
    // Filter out metadata fields (id, username, title, height, status, created_at, updated_at)
    const metadataFields = ['id', 'username', 'title', 'height', 'status', 'created_at', 'updated_at', 'formID', 'count'];
    
    // Sort field IDs numerically to process in order
    const sortedFieldIds = Object.keys(formStructure.content).sort((a, b) => {
      const numA = parseInt(a) || 0;
      const numB = parseInt(b) || 0;
      return numA - numB;
    });
    
    sortedFieldIds.forEach(fieldId => {
      // Skip metadata fields
      if (metadataFields.includes(fieldId)) {
        return;
      }
      
      const field = formStructure.content[fieldId];
      
      // Skip if field is null or not an object
      if (!field || typeof field !== 'object') {
        return;
      }
      
      // Get field label - try multiple properties
      const fieldLabel = field.text || field.name || field.label || field.question || field.title || 'Unnamed';
      const fieldType = field.type || field.inputType || 'unknown';
      
      // Skip if it's still "Unnamed" and looks like metadata
      if (fieldLabel === 'Unnamed' && metadataFields.some(m => fieldId.toLowerCase().includes(m))) {
        return;
      }
      
      const normalizedLabel = fieldLabel.toLowerCase().trim();
      
      console.log(`  Field ID ${fieldId}: "${fieldLabel}" (${fieldType})`);
      
      // Track if we're in Reference 2 section
      if (normalizedLabel.includes('reference 2') || 
          (mappings.reference2Name && !mappings.reference2Email && !mappings.reference2Phone)) {
        inReference2Section = true;
      }
      
      // Special handling for Reference 2 email/phone that come after Reference 2 Name
      let matchedField = null;
      if (inReference2Section && normalizedLabel === 'email' && !mappings.reference2Email && mappings.reference2Name) {
        matchedField = 'reference2Email';
      } else if (inReference2Section && (normalizedLabel === 'phone' || normalizedLabel.includes('phone')) && !mappings.reference2Phone && mappings.reference2Name) {
        matchedField = 'reference2Phone';
      } else {
        matchedField = findMatchingField(fieldLabel, fieldType, fieldId, mappings);
      }
      
      if (matchedField) {
        mappings[matchedField] = {
          fieldId,
          jotformLabel: fieldLabel,
          fieldType,
        };
        console.log(`    ✅ Mapped to: ${matchedField}`);
      } else {
        // Only show unmatched if it's not a section header
        if (fieldType !== 'control_head' && fieldType !== 'control_pagebreak') {
          unmatchedFields.push({ fieldId, label: fieldLabel, type: fieldType });
          console.log(`    ⚠️  No match found`);
        } else {
          console.log(`    ℹ️  Section header (skipped)`);
        }
      }
    });
    
    console.log('\n\n📝 Generated mapping function:\n');
    console.log('='.repeat(80));
    const generatedCode = generateMappingFunction(mappings);
    console.log(generatedCode);
    console.log('='.repeat(80));
    
    if (unmatchedFields.length > 0) {
      console.log('\n⚠️  Unmatched fields (you may need to map manually):');
      unmatchedFields.forEach(field => {
        console.log(`  - Field ID ${field.fieldId}: "${field.label}" (${field.type})`);
      });
    }
    
    console.log('\n\n📋 Next steps:');
    console.log('1. Copy the generated function above');
    console.log('2. Replace the mapFormDataToJotform function in src/services/jotformApi.js');
    console.log('3. Test the form submission');
    
    // Also save to file (using ES modules)
    try {
      const fs = await import('fs');
      const outputPath = 'scripts/generated-mapping.js';
      fs.writeFileSync(outputPath, generatedCode);
      console.log(`\n💾 Also saved to: ${outputPath}`);
    } catch (err) {
      console.log('\n⚠️  Could not save to file (this is okay, copy from above)');
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main();

