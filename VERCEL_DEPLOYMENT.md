# Deploying American Guardian Home Health to Vercel (Free Tier)

This guide will walk you through deploying your Vite + React application to Vercel's free tier.

## Prerequisites

- A GitHub, GitLab, or Bitbucket account
- Your code pushed to a repository
- A Vercel account (free to sign up)

## Step 1: Prepare Your Repository

1. **Ensure your code is committed and pushed to your repository:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Verify your `package.json` has the correct build script:**
   ```json
   {
     "scripts": {
       "build": "vite build"
     }
   }
   ```
   ✅ This is already configured in your project.

3. **Check that `vercel.json` exists:**
   ✅ Your project already has a `vercel.json` file configured correctly.

## Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (top right)
3. Choose to sign up with:
   - **GitHub** (recommended - easiest integration)
   - GitLab
   - Bitbucket
   - Email

## Step 3: Deploy Your Project

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **After signing in, click "Add New..." → "Project"**

2. **Import your repository:**
   - If your repository isn't listed, click "Adjust GitHub App Permissions" and grant access
   - Find and select your `AmericanGuardian` repository
   - Click **"Import"**

3. **Configure Project Settings:**
   - **Framework Preset:** Vite (should auto-detect)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `dist` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)

4. **Environment Variables (if needed):**
   - If you have any environment variables, add them here
   - For this project, you likely don't need any

5. **Click "Deploy"**

6. **Wait for deployment:**
   - Vercel will install dependencies, build your project, and deploy
   - This usually takes 1-3 minutes
   - You'll see build logs in real-time

7. **Success!**
   - Vercel will provide you with a deployment URL like: `https://american-guardian-xyz.vercel.app`
   - Your site is now live!

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory:**
   ```bash
   cd /Users/shahbazkhan/AmericanGuardian
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N** (first time)
   - Project name? (press Enter for default)
   - Directory? `./` (press Enter)
   - Override settings? **N**

5. **Production deployment:**
   ```bash
   vercel --prod
   ```

## Step 4: Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project
   - Click **"Settings"** → **"Domains"**
   - Enter your domain (e.g., `americanguardianhomehealth.com`)
   - Follow DNS configuration instructions

2. **Vercel will provide DNS records to add:**
   - Usually an A record or CNAME
   - Add these to your domain registrar (GoDaddy, Namecheap, etc.)

## Step 5: Automatic Deployments

✅ **Already configured!** Your `vercel.json` includes:
- Build configuration
- SPA routing (all routes → `index.html`)
- Asset caching headers

**Every time you push to your main branch:**
- Vercel automatically builds and deploys
- You get a preview URL for each commit
- Production updates automatically

## Vercel Free Tier Limits

✅ **What you get for FREE:**
- **100GB bandwidth/month** (plenty for most sites)
- **Unlimited deployments**
- **Automatic HTTPS**
- **Global CDN**
- **Preview deployments** for every commit
- **Custom domains** (unlimited)
- **Team collaboration**

⚠️ **Limits:**
- **100GB bandwidth/month** (should be more than enough)
- **Serverless function execution time:** 100 hours/month
- **Build time:** 6,000 minutes/month

## Troubleshooting

### Build Fails

1. **Check build logs in Vercel dashboard**
2. **Common issues:**
   - Missing dependencies → Check `package.json`
   - Build errors → Check console output
   - Environment variables → Add in project settings

### Images Not Loading

1. **Ensure images are in `public/images/` folder**
2. **Use absolute paths:** `/images/hero-main.png` (not `./images/`)
3. **Check file names match exactly** (case-sensitive)

### Routing Issues

✅ **Already fixed!** Your `vercel.json` includes SPA routing:
```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

### Performance Issues

1. **Check Vercel Analytics** (available in dashboard)
2. **Optimize images** (already using optimized formats)
3. **Check bundle size** (Vite handles this automatically)

## Useful Vercel Features

### Preview Deployments
- Every commit gets its own preview URL
- Share with team before merging
- Test changes safely

### Analytics
- Enable in project settings
- Track page views, performance
- Free tier includes basic analytics

### Environment Variables
- Add in project settings
- Different values for production/preview
- Secure storage

## Next Steps

1. ✅ **Deploy to Vercel** (follow steps above)
2. **Test on mobile devices** (use preview URL)
3. **Set up custom domain** (optional)
4. **Enable analytics** (optional)
5. **Share your live site!**

## Quick Reference

**Vercel Dashboard:** [vercel.com/dashboard](https://vercel.com/dashboard)

**Deployment URL Format:**
- Production: `https://your-project-name.vercel.app`
- Preview: `https://your-project-name-git-branch-username.vercel.app`

**Support:**
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

**Your project is ready to deploy!** 🚀

