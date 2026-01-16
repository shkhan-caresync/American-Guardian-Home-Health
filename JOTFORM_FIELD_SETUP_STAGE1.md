# Jotform Field Setup Guide - Stage 1

## 📋 Field Mapping Reference

When you add fields to your Jotform form, note the **Field ID** for each field. Then update the numbers in `src/services/jotformApi.js` in the `mapFormDataToJotform` function.

---

## 🎯 Fields to Add in Jotform (In Order)

### Section 1: Personal Information

| Field Label | Field Type | Field ID (You'll get this) | Notes |
|------------|------------|----------------------------|-------|
| Full Name | Single Line Text | `"3"` | Required |
| Email | Email | `"4"` | Required |
| Phone | Phone Number | `"5"` | Required |
| Address | Single Line Text | `"6"` | Required |
| City | Single Line Text | `"7"` | Optional |
| State | Single Line Text | `"8"` | Optional |
| ZIP Code | Single Line Text | `"9"` | Optional |

### Section 2: Professional Information

| Field Label | Field Type | Field ID (You'll get this) | Notes |
|------------|------------|----------------------------|-------|
| Role Applied For | Single Line Text or Dropdown | `"10"` | Required |
| License Type | Single Line Text or Dropdown | `"11"` | Required (RN, LVN, PT, OT, etc.) |
| License State | Single Line Text or Dropdown | `"12"` | Required |
| License Number | Single Line Text | `"13"` | Required |
| License Expiry | Date Picker | `"14"` | Optional |

### Section 3: Availability & Qualifications

| Field Label | Field Type | Field ID (You'll get this) | Notes |
|------------|------------|----------------------------|-------|
| Availability | Single Line Text or Dropdown | `"15"` | Optional (Full-time, Part-time, Per diem) |
| Work Authorized in US | Radio Buttons | `"16"` | Required (Yes/No) |
| Reliable Transportation | Radio Buttons | `"17"` | Required (Yes/No) |
| Employment History Summary | Paragraph Text | `"18"` | Optional |

### Section 4: References

| Field Label | Field Type | Field ID (You'll get this) | Notes |
|------------|------------|----------------------------|-------|
| Reference 1 Name | Single Line Text | `"19"` | Required |
| Reference 1 Phone | Phone Number | `"20"` | Optional |
| Reference 1 Email | Email | `"21"` | Optional |
| Reference 2 Name | Single Line Text | `"22"` | Required |
| Reference 2 Phone | Phone Number | `"23"` | Optional |
| Reference 2 Email | Email | `"24"` | Optional |

### Section 5: Attestation & Resume

| Field Label | Field Type | Field ID (You'll get this) | Notes |
|------------|------------|----------------------------|-------|
| Attestation | Checkbox or Radio | `"25"` | Required (I attest that information is true) |
| Resume | File Upload | `"26"` | Optional (PDF, DOC, DOCX, max 5MB) |

---

## 🔧 How to Get Field IDs in Jotform

### Method 1: From Form Editor
1. Go to your Jotform form
2. Click **"Edit Form"**
3. Click on a field
4. Look at the URL - it will contain the field ID (e.g., `.../field/3/...`)
5. Or check the field settings - field ID is usually shown

### Method 2: Using Auto-Generation Script ⚡ **RECOMMENDED**

**This is the easiest way!** Run the script and it will automatically generate the mapping function:

```bash
# Get your Jotform API key from Account Settings > API
# Then run:
npm run generate-mapping YOUR_FORM_ID YOUR_API_KEY

# Or use environment variable:
JOTFORM_API_KEY=your_key npm run generate-mapping YOUR_FORM_ID
```

The script will:
1. ✅ Fetch all fields from your Jotform form
2. ✅ Match field labels to our form field names
3. ✅ Generate the complete `mapFormDataToJotform` function
4. ✅ Save it to `scripts/generated-mapping.js`

Then just copy the generated function and replace it in `src/services/jotformApi.js`!

**Example:**
```bash
npm run generate-mapping 123456789012345 abc123xyz789def456
```

### Method 3: Using API Function
1. Use the `getFormStructure` function in `jotformApi.js`
2. Call it with your form ID in browser console
3. It will return all fields with their IDs

### Method 3: From Submission Data
1. Submit a test form manually
2. View the submission in Jotform
3. Check the raw submission data - it shows field IDs

---

## 📝 Step-by-Step Setup

### Step 1: Create Form in Jotform
1. Log into Jotform HIPAA account
2. Create new form: "Clinician Application - Stage 1"
3. Make sure form is HIPAA-enabled

### Step 2: Add Fields
1. Add each field from the table above
2. Use the exact field types specified
3. Set required fields as "Required" in Jotform
4. For Radio Buttons (Work Authorized, Transportation):
   - Add options: "Yes" and "No"
   - Set as required

### Step 3: Get Field IDs
1. For each field, note the Field ID
2. Create a mapping like this:
   ```
   Full Name → Field ID: 3
   Email → Field ID: 4
   Phone → Field ID: 5
   ...
   ```

### Step 4: Update Code
1. Open `src/services/jotformApi.js`
2. Find the `mapFormDataToJotform` function
3. Replace the placeholder field IDs (e.g., `"3"`, `"4"`) with your actual field IDs
4. Example:
   ```javascript
   // If your Full Name field ID is actually 123, change:
   if (formData.fullName) mapped["3"] = formData.fullName;
   // To:
   if (formData.fullName) mapped["123"] = formData.fullName;
   ```

### Step 5: Test
1. Start dev server: `npm run dev`
2. Go to `/apply`
3. Fill out the form
4. Submit
5. Check Jotform dashboard for submission
6. Verify all fields are populated correctly

---

## ⚠️ Important Notes

1. **Field IDs are unique per form** - Each form has its own field IDs
2. **Field order doesn't matter** - IDs are what matter
3. **File uploads** - Make sure file upload field accepts: PDF, DOC, DOCX
4. **Radio buttons** - Values should match exactly: "Yes" or "No"
5. **Date format** - Jotform handles date formatting automatically

---

## 🐛 Troubleshooting

**Fields not submitting:**
- Check field IDs are correct
- Verify field types match
- Check if fields are required in Jotform

**File uploads not working:**
- Verify file upload field ID is correct
- Check file size limits in Jotform
- Ensure file types are allowed

**Radio button values not matching:**
- Make sure values in code match Jotform options exactly
- Case-sensitive: "Yes" vs "yes" matters

---

## 📋 Quick Reference: Field ID Mapping Template

Copy this and fill in your actual field IDs:

```javascript
// Personal Information
Full Name: Field ID = ___
Email: Field ID = ___
Phone: Field ID = ___
Address: Field ID = ___
City: Field ID = ___
State: Field ID = ___
ZIP Code: Field ID = ___

// Professional Information
Role Applied For: Field ID = ___
License Type: Field ID = ___
License State: Field ID = ___
License Number: Field ID = ___
License Expiry: Field ID = ___

// Availability & Qualifications
Availability: Field ID = ___
Work Authorized in US: Field ID = ___
Reliable Transportation: Field ID = ___
Employment History: Field ID = ___

// References
Reference 1 Name: Field ID = ___
Reference 1 Phone: Field ID = ___
Reference 1 Email: Field ID = ___
Reference 2 Name: Field ID = ___
Reference 2 Phone: Field ID = ___
Reference 2 Email: Field ID = ___

// Attestation & Resume
Attestation: Field ID = ___
Resume: Field ID = ___
```

---

**Once you have all field IDs, update `mapFormDataToJotform` function in `src/services/jotformApi.js`!**

