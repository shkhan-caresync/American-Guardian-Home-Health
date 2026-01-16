/**
 * Test different API submission formats
 * 
 * Usage: node scripts/test-api-format.js FORM_ID API_KEY
 */

const JOTFORM_API_URL = 'https://api.jotform.com';

async function testAPIFormat(formId, apiKey) {
  console.log(`\n🔍 Testing API submission formats for form: ${formId}\n`);
  
  // Test 1: Current format (what we're using)
  console.log('Test 1: Current format { submission: { "3": "value" } }');
  let response = await fetch(
    `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission: { "3": "Test Current Format", "4": "test@test.com" }
      }),
    }
  );
  let result = await response.json();
  console.log(`  Result: ${result.responseCode === 200 ? '✅' : '❌'} ${result.message}`);
  if (result.responseCode === 200) {
    console.log(`  Submission ID: ${result.content.submissionID}`);
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 2: Direct format (without "submission" wrapper)
  console.log('\nTest 2: Direct format { "3": "value" } (no submission wrapper)');
  response = await fetch(
    `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "3": "Test Direct Format",
        "4": "direct@test.com"
      }),
    }
  );
  result = await response.json();
  console.log(`  Result: ${result.responseCode === 200 ? '✅' : '❌'} ${result.message}`);
  if (result.responseCode === 200) {
    console.log(`  Submission ID: ${result.content.submissionID}`);
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 3: Using field names instead of IDs
  console.log('\nTest 3: Using field names { "name": "value" }');
  response = await fetch(
    `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission: {
          "name": "Test Field Name",
          "email": "name@test.com"
        }
      }),
    }
  );
  result = await response.json();
  console.log(`  Result: ${result.responseCode === 200 ? '✅' : '❌'} ${result.message}`);
  if (result.responseCode === 200) {
    console.log(`  Submission ID: ${result.content.submissionID}`);
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 4: Form data format (URL encoded)
  console.log('\nTest 4: URL-encoded form data format');
  const formData = new URLSearchParams();
  formData.append('submission[3]', 'Test Form Data');
  formData.append('submission[4]', 'formdata@test.com');
  
  response = await fetch(
    `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    }
  );
  result = await response.json();
  console.log(`  Result: ${result.responseCode === 200 ? '✅' : '❌'} ${result.message}`);
  if (result.responseCode === 200) {
    console.log(`  Submission ID: ${result.content.submissionID}`);
  }
  
  console.log('\n✅ All tests completed. Check Jotform submissions to see which format stored data.');
  console.log('\n⚠️  IMPORTANT: Wait 5-10 seconds after submission, then check Jotform dashboard.');
  console.log('   Sometimes there is a delay before data appears.');
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/test-api-format.js FORM_ID API_KEY');
  process.exit(1);
}

testAPIFormat(args[0], args[1]).catch(console.error);


