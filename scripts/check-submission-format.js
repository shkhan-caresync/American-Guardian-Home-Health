/**
 * Fetch an actual submission from Jotform to see the format
 * 
 * Usage: node scripts/check-submission-format.js FORM_ID API_KEY SUBMISSION_ID
 */

const JOTFORM_API_URL = 'https://api.jotform.com';

async function checkSubmission(formId, apiKey, submissionId) {
  console.log(`\n🔍 Fetching submission: ${submissionId}\n`);
  
  // Get the submission
  const response = await fetch(
    `${JOTFORM_API_URL}/submission/${submissionId}?apiKey=${apiKey}`
  );
  
  const result = await response.json();
  
  if (result.responseCode === 200) {
    const submission = result.content;
    console.log('✅ Submission data:');
    console.log('Submission ID:', submission.id);
    console.log('Status:', submission.status);
    console.log('\n📝 Answers (actual values):');
    
    // Check if answers have answer property
    Object.keys(submission.answers || {}).forEach(fieldId => {
      const answer = submission.answers[fieldId];
      if (answer.answer !== undefined) {
        console.log(`  Field ${fieldId} (${answer.text || answer.name}):`, answer.answer);
      } else {
        console.log(`  Field ${fieldId} (${answer.text || answer.name}): [NO ANSWER VALUE]`);
        console.log(`    Full answer object:`, JSON.stringify(answer, null, 4));
      }
    });
    
    // Also check raw data format
    console.log('\n🔍 Full submission structure:');
    console.log(JSON.stringify(submission, null, 2));
  } else {
    console.error('❌ Error:', result);
  }
}

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('Usage: node scripts/check-submission-format.js FORM_ID API_KEY SUBMISSION_ID');
  console.error('\nExample: node scripts/check-submission-format.js 260071806751050 YOUR_API_KEY 6436729821027982257');
  process.exit(1);
}

checkSubmission(args[0], args[1], args[2]).catch(console.error);

