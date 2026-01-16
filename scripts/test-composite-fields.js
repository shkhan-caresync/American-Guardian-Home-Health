/**
 * Test composite field formats (fullname, address)
 * 
 * Usage: node scripts/test-composite-fields.js FORM_ID API_KEY
 */

const JOTFORM_API_URL = 'https://api.jotform.com';

async function testCompositeFields(formId, apiKey) {
  console.log(`\n🔍 Testing composite field formats for form: ${formId}\n`);
  
  // Test 1: Fullname as single string
  console.log('Test 1: Fullname as single string "3": "John Doe"');
  let response = await fetch(
    `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission: { "3": "John Doe" }
      }),
    }
  );
  let result = await response.json();
  console.log(`  Result: ${result.responseCode === 200 ? '✅' : '❌'} ${result.message}`);
  if (result.responseCode === 200) {
    console.log(`  Submission ID: ${result.content.submissionID}`);
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 2: Fullname with bracket notation
  console.log('\nTest 2: Fullname with bracket notation "3[first]": "John", "3[last]": "Doe"');
  response = await fetch(
    `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission: {
          "3[first]": "John",
          "3[last]": "Doe"
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
  
  // Test 3: Address with bracket notation (current format)
  console.log('\nTest 3: Address with bracket notation "6[addr_line1]": "123 Main St"');
  response = await fetch(
    `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission: {
          "3": "Test Address",
          "6[addr_line1]": "123 Main Street",
          "6[city]": "San Francisco",
          "6[state]": "CA",
          "6[postal]": "94102"
        }
      }),
    }
  );
  result = await response.json();
  console.log(`  Result: ${result.responseCode === 200 ? '✅' : '❌'} ${result.message}`);
  if (result.responseCode === 200) {
    console.log(`  Submission ID: ${result.content.submissionID}`);
    console.log(`  Check this submission in Jotform to see if address data appears`);
  }
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 4: Address with underscore notation
  console.log('\nTest 4: Address with underscore notation "6_addr_line1": "456 Oak Ave"');
  response = await fetch(
    `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submission: {
          "3": "Test Address 2",
          "6_addr_line1": "456 Oak Avenue",
          "6_city": "Los Angeles",
          "6_state": "CA",
          "6_postal": "90001"
        }
      }),
    }
  );
  result = await response.json();
  console.log(`  Result: ${result.responseCode === 200 ? '✅' : '❌'} ${result.message}`);
  if (result.responseCode === 200) {
    console.log(`  Submission ID: ${result.content.submissionID}`);
    console.log(`  Check this submission in Jotform to see if address data appears`);
  }
  
  console.log('\n✅ All tests completed. Check Jotform submissions to see which format worked.');
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/test-composite-fields.js FORM_ID API_KEY');
  process.exit(1);
}

testCompositeFields(args[0], args[1]).catch(console.error);


