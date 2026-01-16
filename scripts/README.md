# Field Mapping Generator Script

## Quick Start

Generate the field mapping function automatically:

```bash
# Option 1: Provide API key as argument
npm run generate-mapping YOUR_FORM_ID YOUR_API_KEY

# Option 2: Use environment variable
JOTFORM_API_KEY=your_key npm run generate-mapping YOUR_FORM_ID

# Option 3: Direct node command
node scripts/generate-field-mapping.js YOUR_FORM_ID YOUR_API_KEY
```

## What It Does

1. ✅ Fetches your Jotform form structure via API
2. ✅ Matches field labels to our form field names
3. ✅ Generates the `mapFormDataToJotform` function with correct field IDs
4. ✅ Saves output to `scripts/generated-mapping.js`

## Example

```bash
npm run generate-mapping 123456789012345 abc123xyz789
```

Output:
- Prints generated function to console
- Saves to `scripts/generated-mapping.js`
- Shows which fields were matched/unmatched

## After Running

1. Copy the generated function
2. Replace `mapFormDataToJotform` in `src/services/jotformApi.js`
3. Test your form!

## Troubleshooting

**"API key not found"**
- Make sure you provide API key as argument or environment variable

**"Form structure not found"**
- Verify form ID is correct
- Check API key has access to the form

**Fields not matching**
- The script uses smart matching, but some field labels might not match
- Check the "Unmatched fields" section
- Manually add those fields to the mapping function

