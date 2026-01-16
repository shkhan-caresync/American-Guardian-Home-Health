/**
 * Test different submission formats to find what Jotform accepts
 * 
 * Usage: node scripts/test-submission-format.js FORM_ID API_KEY
 */

const JOTFORM_API_URL = 'https://api.jotform.com';

async function testFormat(formId, apiKey, testName, submissionData) {
  console.log(`\n🧪 Test: ${testName}`);
  console.log('Payload:', JSON.stringify(submissionData, null, 2));
  
  const response = await fetch(
    `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
    }
  );
  
  const result = await response.json();
  console.log('Response:', result.responseCode === 200 ? '✅ Success' : '❌ Failed');
  if (result.responseCode === 200) {
    console.log(`Submission ID: ${result.content.submissionID}`);
    console.log(`Check Jotform: ${result.content.URL}`);
  } else {
    console.log('Error:', result);
  }
  return result;
}

async function runTests(formId, apiKey) {
  console.log(`\n🔍 Testing submission formats for form: ${formId}\n`);
  
  // Test 1: Simple text field
  await testFormat(formId, apiKey, 'Simple text field (Name)', {
    submission: { "3": "Test Name Format 1" }
  });
  
  await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
  
  // Test 2: Address with bracket notation
  await testFormat(formId, apiKey, 'Address with bracket notation', {
    submission: {
      "3": "Test Address Format",
      "6[addr_line1]": "123 Test St",
      "6[city]": "Test City",
      "6[state]": "CA",
      "6[postal]": "12345"
    }
  });
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 3: Address with underscore notation
  await testFormat(formId, apiKey, 'Address with underscore notation', {
    submission: {
      "3": "Test Address Format 2",
      "6_addr_line1": "456 Test Ave",
      "6_city": "Test City 2",
      "6_state": "NY",
      "6_postal": "67890"
    }
  });
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 4: Checkbox with "1"
  await testFormat(formId, apiKey, 'Checkbox with "1"', {
    submission: {
      "3": "Test Checkbox",
      "20": "1"
    }
  });
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 5: Checkbox with "yes"
  await testFormat(formId, apiKey, 'Checkbox with "yes"', {
    submission: {
      "3": "Test Checkbox 2",
      "21": "yes"
    }
  });
  
  console.log('\n✅ All tests completed. Check Jotform submissions to see which format worked.');
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/test-submission-format.js FORM_ID API_KEY');
  process.exit(1);
}

runTests(args[0], args[1]).catch(console.error);

