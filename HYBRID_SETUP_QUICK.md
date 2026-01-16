# Quick Setup: Custom Forms with Jotform API

## ✅ What's Built

- ✅ Custom React form components (beautiful UI matching your design)
- ✅ Jotform API integration service
- ✅ File upload component with drag & drop
- ✅ Form validation
- ✅ Stage 1 form complete

## 🚀 Setup Steps (5 minutes)

### 1. Get Jotform API Key

1. Log into your Jotform HIPAA account
2. Go to **Account Settings** > **API**
3. Click **"Create API Key"** or copy existing key
4. Save it somewhere safe

### 2. Get Form IDs

For each form (Stage 1, 2, 3):
1. Go to your form in Jotform
2. Copy the form URL (e.g., `https://form.jotform.com/123456789012345`)
3. Extract the form ID (the number at the end: `123456789012345`)

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_JOTFORM_API_KEY=your_api_key_here
VITE_FORM_ID_STAGE1=123456789012345
VITE_FORM_ID_STAGE2=234567890123456
VITE_FORM_ID_STAGE3=345678901234567
```

### 4. Map Form Fields (Important!)

Jotform uses field IDs, not field names. You need to:

1. **Get field IDs from Jotform:**
   - Go to your form
   - Click "Edit Form"
   - Each field has an ID (like `3`, `4`, `5`)
   - Note down which field ID corresponds to which field

2. **Update the form mapping:**
   - Edit `src/services/jotformApi.js`
   - In the `mapFormDataToJotform` function, map your field names to Jotform field IDs
   - Example:
   ```javascript
   function mapFormDataToJotform(formData) {
     return {
       "3": formData.fullName,      // Field ID 3 = Full Name
       "4": formData.email,         // Field ID 4 = Email
       "5": formData.phone,         // Field ID 5 = Phone
       // ... etc
     };
   }
   ```

### 5. Test It!

1. Start dev server: `npm run dev`
2. Go to `/apply`
3. Fill out the form
4. Submit and check Jotform dashboard for submission

## 📝 Next Steps

- [ ] Create Stage 2 form component (similar to Stage 1)
- [ ] Create Stage 3 form component (similar to Stage 1)
- [ ] Test all three forms
- [ ] Map all field IDs correctly

## ⚠️ Important Notes

1. **Field Mapping**: The form won't work until you map field IDs correctly
2. **API Key Security**: Never commit `.env` to git (it's in `.gitignore`)
3. **File Uploads**: File uploads go through Jotform's file upload API
4. **HIPAA Compliance**: Still maintained - data goes to Jotform HIPAA

## 🆘 Troubleshooting

**"Jotform API key not configured"**
- Check `.env` file exists
- Restart dev server after adding `.env`

**"Failed to submit form"**
- Check field ID mapping
- Verify form ID is correct
- Check Jotform API key is valid

**Files not uploading**
- Check file size limits
- Verify Jotform form has file upload fields
- Check file field IDs are mapped correctly

---

**Time to complete**: ~5 minutes for setup, then test!

