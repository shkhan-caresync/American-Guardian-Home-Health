# Debugging Empty Submission Issue

## Problem
Form submits successfully but Jotform shows empty submission (only date/time, no field data).

## Likely Causes

1. **Field IDs don't match** - The field IDs in the mapping function don't match your actual Jotform form
2. **Address field format** - Composite address fields might need different format
3. **Submission format** - Jotform API might expect different structure

## Debugging Steps

### Step 1: Check Browser Console
When you submit the form, check the browser console (F12) for:
- `📤 Submitting to Jotform:` - Shows what data is being mapped
- `📦 Submission payload:` - Shows exact JSON being sent
- `✅ Jotform submission response:` - Shows Jotform's response

### Step 2: Verify Field IDs
Run the mapping generator again to verify field IDs:
```bash
npm run generate-mapping 260071806751050 YOUR_API_KEY
```

### Step 3: Test with Simple Data
Try submitting with just one field (like name) to see if it appears.

### Step 4: Check Jotform Form Structure
1. Go to your Jotform form
2. Click "Edit Form"
3. Check each field's ID
4. Compare with the mapping in `src/services/jotformApi.js`

## Common Issues

### Issue 1: Address Field Format
Jotform address fields might need format: `"6[addr_line1]"` instead of `"6_addr_line1"`

### Issue 2: Field IDs Changed
If you edited the form in Jotform, field IDs might have changed.

### Issue 3: API Format
Jotform might expect different submission format.

## Quick Fix to Test

Try submitting with just basic fields first:
- Name (field 3)
- Email (field 4)
- Phone (field 5)

If these work, the issue is with other field mappings.

## Next Steps

1. Check browser console output
2. Verify field IDs match
3. Test with minimal fields
4. Check Jotform API response for errors

