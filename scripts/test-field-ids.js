/**
 * Test script to verify field IDs and submission format
 * 
 * Usage: node scripts/test-field-ids.js FORM_ID API_KEY
 */

const JOTFORM_API_URL = 'https://api.jotform.com';

async function testSubmission(formId, apiKey) {
  console.log(`\n🔍 Testing form: ${formId}\n`);
  
  // Get form structure
  const questionsResponse = await fetch(
    `${JOTFORM_API_URL}/form/${formId}/questions?apiKey=${apiKey}`
  );
  const questions = await questionsResponse.json();
  
  console.log('📋 Form Fields:');
  Object.keys(questions.content).forEach(fieldId => {
    const field = questions.content[fieldId];
    if (field.type !== 'control_head' && field.type !== 'control_pagebreak') {
      console.log(`  Field ID ${fieldId}: "${field.text || field.name || field.label || 'Unnamed'}" (${field.type})`);
    }
  });
  
  // Test submission with minimal data
  console.log('\n🧪 Testing submission with Field ID 3 (Name):\n');
  
  const testSubmission = {
    submission: {
      "3": "Test Name"
    }
  };
  
  const submitResponse = await fetch(
    `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testSubmission),
    }
  );
  
  const result = await submitResponse.json();
  console.log('Response:', result);
  
  if (result.responseCode === 200) {
    console.log('\n✅ Test submission created. Check Jotform to see if "Test Name" appears in Field 3.');
  }
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/test-field-ids.js FORM_ID API_KEY');
  process.exit(1);
}

testSubmission(args[0], args[1]).catch(console.error);

